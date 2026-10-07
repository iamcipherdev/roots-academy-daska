import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { currentMonthKey } from "@/lib/portal/dates";
import { percentage, gradeFor, assignPositions, attendancePercent, type AttendanceStatus } from "@/lib/portal/grading";

/**
 * GET /api/portal/parent/[rollno]
 * Public, read-only. Roll number ONLY — returns just that student's data.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ rollno: string }> }
) {
  try {
    if (!isPortalConfigured()) {
      return NextResponse.json({ ok: false, error: "Database connect nahi hui." }, { status: 503 });
    }
    const { rollno } = await params;
    const rollNo = decodeURIComponent(rollno).trim();
    if (!rollNo) {
      return NextResponse.json({ ok: false, error: "Roll number likhein." }, { status: 400 });
    }

    const sb = supabaseAdmin();

    const { data: matches, error: sErr } = await sb
      .from("students")
      .select("id, name, roll_no, academy_id, class_id, classes(name), academies(name)")
      .eq("roll_no", rollNo);
    if (sErr) throw sErr;
    if (!matches || matches.length === 0) {
      return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
    }
    if (matches.length > 1) {
      return NextResponse.json({ ok: false, error: "MULTIPLE" }, { status: 409 });
    }
    const student = matches[0] as unknown as {
      id: string; name: string; roll_no: string;
      classes: { name: string } | null; academies: { name: string } | null;
      class_id: string;
    };
    const className = student.classes?.name ?? "";
    const academyName = student.academies?.name ?? "";

    // ---- Attendance: this month + last 30 days ----
    const monthKey = currentMonthKey();
    const { data: attRows } = await sb
      .from("attendance")
      .select("date, status")
      .eq("student_id", student.id)
      .order("date", { ascending: false })
      .limit(120);

    const rows = (attRows ?? []) as { date: string; status: AttendanceStatus }[];
    const monthRows = rows.filter((r) => r.date.startsWith(monthKey));
    const present = monthRows.filter((r) => r.status === "present").length;
    const absent = monthRows.filter((r) => r.status === "absent").length;
    const late = monthRows.filter((r) => r.status === "late").length;
    const attendance = {
      month: monthKey,
      percent: attendancePercent(monthRows.map((r) => r.status)),
      present, absent, late,
      recent: rows.slice(0, 30),
    };

    // ---- Fees: current month + last 3 months ----
    const [y, m] = monthKey.split("-").map(Number);
    const last3Keys: string[] = [];
    for (let i = 0; i < 3; i++) {
      const d = new Date(Date.UTC(y, m - 1 - i, 1));
      last3Keys.push(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
    }
    const { data: feeRows } = await sb
      .from("fees")
      .select("month, amount_due, amount_paid")
      .eq("student_id", student.id)
      .in("month", last3Keys);
    const feeMap = new Map((feeRows ?? []).map((f) => [f.month as string, f]));
    const fees = {
      current: (() => {
        const f = feeMap.get(monthKey) as { amount_due: number; amount_paid: number } | undefined;
        if (!f) return { status: "no_record" as const, month: monthKey };
        const pending = f.amount_due - f.amount_paid;
        return pending <= 0
          ? { status: "paid" as const, month: monthKey, amount_due: f.amount_due }
          : { status: "pending" as const, month: monthKey, amount_due: f.amount_due, amount_paid: f.amount_paid, pending };
      })(),
      history: last3Keys.map((k) => {
        const f = feeMap.get(k) as { amount_due: number; amount_paid: number } | undefined;
        return f
          ? { month: k, amount_due: f.amount_due, amount_paid: f.amount_paid, pending: f.amount_due - f.amount_paid }
          : { month: k, amount_due: 0, amount_paid: 0, pending: 0 };
      }),
    };

    // ---- Results: exams for this class ----
    const { data: exams } = await sb
      .from("exams")
      .select("id, name, created_at")
      .eq("class_id", student.class_id)
      .order("created_at", { ascending: false })
      .limit(10);

    const results: {
      exam_id: string; name: string;
      subjects: { subject: string; obtained: number; total: number }[];
      total_obtained: number; total_max: number; percent: number;
      grade: string; position: number | null; students_count: number;
    }[] = [];
    for (const exam of exams ?? []) {
      const { data: allMarks } = await sb
        .from("marks")
        .select("student_id, subject, total, obtained")
        .eq("exam_id", (exam as { id: string }).id);

      const marks = (allMarks ?? []) as { student_id: string; subject: string; total: number; obtained: number }[];
      const mine = marks.filter((x) => x.student_id === student.id);
      if (mine.length === 0) continue;

      const totalObt = mine.reduce((s, x) => s + x.obtained, 0);
      const totalMax = mine.reduce((s, x) => s + x.total, 0);
      const pct = percentage(totalObt, totalMax);

      // position across all students in this exam
      const perStudent = new Map<string, number>();
      for (const x of marks) perStudent.set(x.student_id, (perStudent.get(x.student_id) ?? 0) + x.obtained);
      const positions = assignPositions(
        [...perStudent.entries()].map(([student_id, total_obtained]) => ({ student_id, total_obtained }))
      );

      results.push({
        exam_id: (exam as { id: string }).id,
        name: (exam as { name: string }).name,
        subjects: mine.map((x) => ({ subject: x.subject, obtained: x.obtained, total: x.total })),
        total_obtained: totalObt,
        total_max: totalMax,
        percent: pct,
        grade: gradeFor(pct),
        position: positions.get(student.id) ?? null,
        students_count: perStudent.size,
      });
    }

    return NextResponse.json({
      ok: true,
      student: { name: student.name, roll_no: student.roll_no, class_name: className, academy_name: academyName },
      attendance,
      fees,
      results,
    });
  } catch (err) {
    console.error("[parent] failed:", err);
    return NextResponse.json({ ok: false, error: "Kuch ghalat ho gaya. Dobara try karein." }, { status: 500 });
  }
}
