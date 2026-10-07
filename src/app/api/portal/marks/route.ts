import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";

const saveSchema = z.object({
  exam_id: z.string().uuid(),
  subjects: z.array(z.object({
    subject: z.string().trim().min(1).max(60),
    total: z.number().int().min(1).max(10000),
  })).min(1).max(20),
  rows: z.array(z.object({
    student_id: z.string().uuid(),
    obtained: z.record(z.string(), z.number().int().min(0).max(10000)),
  })).min(1).max(500),
});

/** POST /api/portal/marks — save the marks grid (upsert per exam+student+subject). */
export async function POST(req: NextRequest) {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database connect nahi hui." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = saveSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Marks ka data theek nahi hai." }, { status: 400 });
    }
    const { session } = guard;
    const sb = supabaseAdmin();

    // Exam must belong to this academy.
    const { data: exam } = await sb
      .from("exams")
      .select("id, class_id")
      .eq("id", parsed.data.exam_id)
      .eq("academy_id", session.academy_id)
      .maybeSingle();
    if (!exam) {
      return NextResponse.json({ ok: false, error: "Test nahi mila." }, { status: 404 });
    }

    // Students must belong to the exam's class.
    const { data: students } = await sb
      .from("students")
      .select("id")
      .eq("class_id", exam.class_id as string);
    const validIds = new Set((students ?? []).map((s) => s.id as string));

    const totalBySubject = new Map(parsed.data.subjects.map((s) => [s.subject, s.total]));
    const rows: { exam_id: string; student_id: string; subject: string; total: number; obtained: number }[] = [];
    for (const r of parsed.data.rows) {
      if (!validIds.has(r.student_id)) continue;
      for (const [subject, obtained] of Object.entries(r.obtained)) {
        const total = totalBySubject.get(subject);
        if (total === undefined) continue;
        rows.push({
          exam_id: parsed.data.exam_id,
          student_id: r.student_id,
          subject,
          total,
          obtained: Math.min(obtained, total),
        });
      }
    }
    if (rows.length === 0) {
      return NextResponse.json({ ok: false, error: "Koi valid marks nahi mile." }, { status: 400 });
    }

    const { error } = await sb
      .from("marks")
      .upsert(rows, { onConflict: "exam_id,student_id,subject" });
    if (error) throw error;

    return NextResponse.json({ ok: true, saved: rows.length });
  } catch (err) {
    console.error("[marks POST] failed:", err);
    return NextResponse.json({ ok: false, error: "Marks save nahi ho sake." }, { status: 500 });
  }
}
