import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "enrolled", "closed"]),
});

/** GET /api/portal/admin/inquiries — list admission inquiries (newest first). */
export async function GET() {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const { data, error } = await supabaseAdmin()
      .from("inquiries")
      .select("id, student_name, phone, current_class, program, message, status, created_at")
      .eq("academy_id", guard.session.academy_id)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    return NextResponse.json({ ok: true, inquiries: data ?? [] });
  } catch (err) {
    console.error("[admin inquiries GET] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not load inquiries." }, { status: 500 });
  }
}

/** PATCH /api/portal/admin/inquiries — update an inquiry's status. */
export async function PATCH(req: NextRequest) {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid status update." }, { status: 400 });
    }
    const { error } = await supabaseAdmin()
      .from("inquiries")
      .update({ status: parsed.data.status })
      .eq("id", parsed.data.id)
      .eq("academy_id", guard.session.academy_id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin inquiries PATCH] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not update inquiry." }, { status: 500 });
  }
}
