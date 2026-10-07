import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin } from "@/lib/portal/supabase";

export async function GET() {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  const { session } = guard;

  const { data: staff } = await supabaseAdmin()
    .from("staff")
    .select("name, role")
    .eq("id", session.staff_id)
    .maybeSingle();

  if (!staff) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, staff: { name: staff.name, role: staff.role } });
}
