import { NextRequest, NextResponse } from "next/server";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { currentMonthKey } from "@/lib/portal/dates";

/** GET /api/portal/admin/students — classes with students + current-month fee chip. */
export async function GET() {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const { session } = guard;
    const sb = supabaseAdmin();
    const month = currentMonthKey();

    const { data: classes, error } = await sb
      .from("classes")
      .select("id, name, students(id, name, roll_no, parent_phone)")
      .eq("academy_id", session.academy_id)
      .order("name");
    if (error) throw error;

    const allIds: string[] = [];
    for (const c of classes ?? []) {
      for (const s of ((c.students ?? []) as { id: string }[])) allIds.push(s.id);
    }
    const feeMap = new Map<string, { amount_due: number; amount_paid: number }>();
    if (allIds.length > 0) {
      const { data: fees } = await sb
        .from("fees")
        .select("student_id, amount_due, amount_paid")
        .eq("month", month)
        .in("student_id", allIds);
      for (const f of fees ?? []) {
        feeMap.set(f.student_id as string, {
          amount_due: f.amount_due as number,
          amount_paid: f.amount_paid as number,
        });
      }
    }

    const out = (classes ?? []).map((c) => ({
      id: c.id as string,
      name: c.name as string,
      students: ((c.students ?? []) as { id: string; name: string; roll_no: string; parent_phone: string | null }[])
        .sort((a, b) => a.roll_no.localeCompare(b.roll_no, undefined, { numeric: true }))
        .map((s) => {
          const f = feeMap.get(s.id);
          const chip = !f ? "no_record" : f.amount_due - f.amount_paid <= 0 ? "paid" : "pending";
          return { ...s, fee_chip: chip };
        }),
    }));
    return NextResponse.json({ ok: true, month, classes: out });
  } catch (err) {
    console.error("[admin students] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not load students." }, { status: 500 });
  }
}

/** POST /api/portal/admin/import — import validated rows (client renders the preview). */
export async function POST(req: NextRequest) {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const rows = body?.rows;
    if (!Array.isArray(rows) || rows.length === 0 || rows.length > 1000) {
      return NextResponse.json({ ok: false, error: "Rows must be between 1 and 1000." }, { status: 400 });
    }
    const { session } = guard;
    const sb = supabaseAdmin();

    // Existing roll numbers in this academy.
    const { data: existing } = await sb
      .from("students")
      .select("roll_no")
      .eq("academy_id", session.academy_id);
    const taken = new Set((existing ?? []).map((s) => String(s.roll_no).trim()));
    const seenInFile = new Set<string>();

    // Resolve/create classes.
    const classNames = [...new Set(rows.map((r) => String(r?.class_name ?? "").trim()).filter(Boolean))];
    const classMap = new Map<string, string>();
    for (const name of classNames) {
      const { data: found } = await sb
        .from("classes")
        .select("id")
        .eq("academy_id", session.academy_id)
        .eq("name", name)
        .maybeSingle();
      if (found) {
        classMap.set(name, found.id as string);
      } else {
        const { data: created, error } = await sb
          .from("classes")
          .insert({ academy_id: session.academy_id, name })
          .select("id")
          .single();
        if (error) throw error;
        classMap.set(name, created.id as string);
      }
    }

    const results: { row: number; ok: boolean; error?: string }[] = [];
    let imported = 0;
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const rowNo = i + 1;
      const name = String(r?.name ?? "").trim();
      const className = String(r?.class_name ?? "").trim();
      const rollNo = String(r?.roll_no ?? "").trim();
      const parentPhone = String(r?.parent_phone ?? "").trim() || null;

      if (!name) { results.push({ row: rowNo, ok: false, error: "Name is required." }); continue; }
      if (!className || !classMap.has(className)) { results.push({ row: rowNo, ok: false, error: "Invalid class name." }); continue; }
      if (!rollNo) { results.push({ row: rowNo, ok: false, error: "Roll number is required." }); continue; }
      if (taken.has(rollNo) || seenInFile.has(rollNo)) {
        results.push({ row: rowNo, ok: false, error: `Roll number ${rollNo} already exists — skipped.` });
        continue;
      }

      const { error } = await sb.from("students").insert({
        academy_id: session.academy_id,
        class_id: classMap.get(className),
        name,
        roll_no: rollNo,
        parent_phone: parentPhone,
      });
      if (error) {
        results.push({ row: rowNo, ok: false, error: "Could not save." });
        continue;
      }
      taken.add(rollNo);
      seenInFile.add(rollNo);
      imported++;
      results.push({ row: rowNo, ok: true });
    }

    return NextResponse.json({ ok: true, imported, skipped: rows.length - imported, results });
  } catch (err) {
    console.error("[admin import] failed:", err);
    return NextResponse.json({ ok: false, error: "Import failed." }, { status: 500 });
  }
}

/** DELETE /api/portal/admin/students?id=... — delete a student and their rows (admin only). */
export async function DELETE(req: NextRequest) {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const id = new URL(req.url).searchParams.get("id")?.trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "Student id missing." }, { status: 400 });
    }
    const { session } = guard;
    const sb = supabaseAdmin();
    const { data: st } = await sb
      .from("students")
      .select("id, name")
      .eq("id", id)
      .eq("academy_id", session.academy_id)
      .maybeSingle();
    if (!st) {
      return NextResponse.json({ ok: false, error: "Student not found." }, { status: 404 });
    }
    for (const table of ["attendance", "fees", "marks"]) {
      const { error } = await sb.from(table).delete().eq("student_id", id);
      if (error) throw error;
    }
    const { error: delErr } = await sb.from("students").delete().eq("id", id);
    if (delErr) throw delErr;
    return NextResponse.json({ ok: true, name: st.name });
  } catch (err) {
    console.error("[admin students DELETE] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not delete." }, { status: 500 });
  }
}
