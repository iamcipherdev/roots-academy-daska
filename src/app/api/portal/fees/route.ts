import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { currentMonthKey } from "@/lib/portal/dates";

/** GET /api/portal/fees?class_id=&month= — students with due/paid/pending. */
export async function GET(req: NextRequest) {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const class_id = searchParams.get("class_id");
    const month = searchParams.get("month") || currentMonthKey();
    if (!class_id) return NextResponse.json({ ok: false, error: "class_id is required." }, { status: 400 });

    const sb = supabaseAdmin();
    const { data: students } = await sb
      .from("students")
      .select("id, name, roll_no, parent_phone")
      .eq("class_id", class_id)
      .eq("academy_id", guard.session.academy_id)
      .order("roll_no");
    const ids = (students ?? []).map((s) => s.id as string);

    let feeMap = new Map<string, { amount_due: number; amount_paid: number }>();
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

    const list = (students ?? []).map((s) => {      const f = feeMap.get(s.id as string);
      const due = f?.amount_due ?? 0;
      const paid = f?.amount_paid ?? 0;
      return {
        student_id: s.id as string,
        name: s.name as string,
        roll_no: s.roll_no as string,
        parent_phone: s.parent_phone as string | null,
        amount_due: due,
        amount_paid: paid,
        pending: due - paid,
        has_record: Boolean(f),
      };
    });
    const totalPending = list.reduce((sum, x) => sum + Math.max(0, x.pending), 0);
    const { data: academy } = await sb
      .from("academies")
      .select("name")
      .eq("id", guard.session.academy_id)
      .maybeSingle();
    return NextResponse.json({
      ok: true, month, list, total_pending: totalPending,
      academy_name: (academy?.name as string) ?? "Roots Academy",
    });
  } catch (err) {
    console.error("[fees GET] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not load fees." }, { status: 500 });
  }
}

const paySchema = z.object({
  student_id: z.string().uuid(),
  month: z.string().regex(/^\d{4}-\d{2}$/),
  amount: z.number().int().min(1).max(1000000),
});

/** POST /api/portal/fees — record a payment (ADDS to amount_paid). */
export async function POST(req: NextRequest) {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = paySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid amount." }, { status: 400 });
    }
    const { session } = guard;
    const sb = supabaseAdmin();

    // Student must belong to this academy.
    const { data: student } = await sb
      .from("students")
      .select("id, name, roll_no")
      .eq("id", parsed.data.student_id)
      .eq("academy_id", session.academy_id)
      .maybeSingle();
    if (!student) {
      return NextResponse.json({ ok: false, error: "Student not found." }, { status: 404 });
    }

    const { data: existing } = await sb
      .from("fees")
      .select("id, amount_due, amount_paid")
      .eq("student_id", parsed.data.student_id)
      .eq("month", parsed.data.month)
      .maybeSingle();

    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Fee for this month is not set. Ask an admin to set the due amount first." },
        { status: 400 }
      );
    }

    const newPaid = (existing.amount_paid as number) + parsed.data.amount;
    const { error } = await sb
      .from("fees")
      .update({ amount_paid: newPaid, updated_by: session.staff_id, updated_at: new Date().toISOString() })
      .eq("id", existing.id as string);
    if (error) throw error;

    const pending = (existing.amount_due as number) - newPaid;
    return NextResponse.json({
      ok: true,
      student_id: parsed.data.student_id,
      amount_due: existing.amount_due,
      amount_paid: newPaid,
      pending,
    });
  } catch (err) {
    console.error("[fees POST] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not save fee." }, { status: 500 });
  }
}
