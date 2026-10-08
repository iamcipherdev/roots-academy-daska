import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { todayPKT } from "@/lib/portal/dates";
import type { AttendanceStatus } from "@/lib/portal/grading";

const itemSchema = z.object({
  student_id: z.string().uuid(),
  status: z.enum(["present", "absent", "late"]),
});

const saveSchema = z.object({
  class_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  items: z.array(itemSchema).min(1).max(500),
});

/** GET /api/portal/attendance?class_id=&date= — existing marks for a class+date. */
export async function GET(req: NextRequest) {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const class_id = searchParams.get("class_id");
    const date = searchParams.get("date") || todayPKT();
    if (!class_id) return NextResponse.json({ ok: false, error: "class_id is required." }, { status: 400 });

    const sb = supabaseAdmin();
    const { data: students } = await sb
      .from("students")
      .select("id")
      .eq("class_id", class_id)
      .eq("academy_id", guard.session.academy_id);
    const ids = (students ?? []).map((s) => s.id as string);

    let marked: Record<string, AttendanceStatus> = {};
    if (ids.length > 0) {
      const { data: rows } = await sb
        .from("attendance")
        .select("student_id, status")
        .eq("date", date)
        .in("student_id", ids);
      for (const r of rows ?? []) marked[r.student_id as string] = r.status as AttendanceStatus;
    }
    return NextResponse.json({ ok: true, date, marked });
  } catch (err) {
    console.error("[attendance GET] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not load attendance." }, { status: 500 });
  }
}

/** POST /api/portal/attendance — upsert attendance for a class+date. */
export async function POST(req: NextRequest) {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = saveSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid data." }, { status: 400 });
    }
    const { session } = guard;
    const date = parsed.data.date || todayPKT();
    const sb = supabaseAdmin();

    // Ensure all students belong to this academy+class (never trust the client).
    const { data: students } = await sb
      .from("students")
      .select("id")
      .eq("class_id", parsed.data.class_id)
      .eq("academy_id", session.academy_id);
    const validIds = new Set((students ?? []).map((s) => s.id as string));
    const rows = parsed.data.items
      .filter((i) => validIds.has(i.student_id))
      .map((i) => ({
        student_id: i.student_id,
        date,
        status: i.status,
        marked_by: session.staff_id,
      }));
    if (rows.length === 0) {
      return NextResponse.json({ ok: false, error: "No valid student found." }, { status: 400 });
    }

    const { error } = await sb
      .from("attendance")
      .upsert(rows, { onConflict: "student_id,date" });
    if (error) throw error;

    const present = rows.filter((r) => r.status === "present").length;
    const absent = rows.filter((r) => r.status === "absent").length;
    const late = rows.filter((r) => r.status === "late").length;
    return NextResponse.json({ ok: true, date, present, absent, late, total: rows.length });
  } catch (err) {
    console.error("[attendance POST] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not save attendance." }, { status: 500 });
  }
}
