import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";

const dueSchema = z.object({
  class_id: z.string().uuid(),
  month: z.string().regex(/^\d{4}-\d{2}$/),
  amount_due: z.number().int().min(0).max(1000000),
});

/** POST /api/portal/admin/fee-due — set amount_due for a whole class+month. */
export async function POST(req: NextRequest) {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database connect nahi hui." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = dueSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Class, month aur amount theek likhein." }, { status: 400 });
    }
    const { session } = guard;
    const sb = supabaseAdmin();

    const { data: students } = await sb
      .from("students")
      .select("id")
      .eq("class_id", parsed.data.class_id)
      .eq("academy_id", session.academy_id);
    const ids = (students ?? []).map((s) => s.id as string);
    if (ids.length === 0) {
      return NextResponse.json({ ok: false, error: "Is class mein koi student nahi." }, { status: 400 });
    }

    const rows = ids.map((student_id) => ({
      student_id,
      month: parsed.data.month,
      amount_due: parsed.data.amount_due,
      updated_by: session.staff_id,
    }));
    // Upsert on (student_id, month): update due, keep paid as-is.
    const { error } = await sb
      .from("fees")
      .upsert(rows, { onConflict: "student_id,month", ignoreDuplicates: false });
    if (error) throw error;

    return NextResponse.json({ ok: true, updated: ids.length });
  } catch (err) {
    console.error("[fee-due] failed:", err);
    return NextResponse.json({ ok: false, error: "Fee set nahi ho saki." }, { status: 500 });
  }
}
