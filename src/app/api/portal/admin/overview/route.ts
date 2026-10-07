import { NextRequest, NextResponse } from "next/server";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { currentMonthKey } from "@/lib/portal/dates";

/** GET /api/portal/admin/overview?month= — "kis ne fee nahi di" + total pending. */
export async function GET(req: NextRequest) {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database connect nahi hui." }, { status: 503 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month") || currentMonthKey();
    const { session } = guard;
    const sb = supabaseAdmin();

    const { data: students } = await sb
      .from("students")
      .select("id, name, roll_no, classes(name)")
      .eq("academy_id", session.academy_id)
      .order("roll_no");
    const ids = (students ?? []).map((s) => s.id as string);

    const feeMap = new Map<string, { amount_due: number; amount_paid: number }>();
    if (ids.length > 0) {
      const { data: fees } = await sb
        .from("fees")
        .select("student_id, amount_due, amount_paid")
        .eq("month", month)
        .in("student_id", ids);
      for (const f of fees ?? []) {
        feeMap.set(f.student_id as string, {
          amount_due: f.amount_due as number,
          amount_paid: f.amount_paid as number,
        });
      }
    }

    const pending = (students ?? [])
      .map((s) => {
        const f = feeMap.get(s.id as string);
        const due = f?.amount_due ?? 0;
        const paid = f?.amount_paid ?? 0;
        return {
          student_id: s.id as string,
          name: s.name as string,
          roll_no: s.roll_no as string,
          class_name: (s.classes as unknown as { name: string } | null)?.name ?? "",
          amount_due: due,
          amount_paid: paid,
          pending: due - paid,
        };
      })
      .filter((x) => x.pending > 0)
      .sort((a, b) => b.pending - a.pending);

    const total_pending = pending.reduce((sum, x) => sum + x.pending, 0);
    return NextResponse.json({ ok: true, month, pending, total_pending, count: pending.length });
  } catch (err) {
    console.error("[overview] failed:", err);
    return NextResponse.json({ ok: false, error: "Overview load nahi ho saka." }, { status: 500 });
  }
}
