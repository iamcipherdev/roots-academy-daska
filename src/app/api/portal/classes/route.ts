import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";

/** GET /api/portal/classes — classes with their students (staff only). */
export async function GET() {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database connect nahi hui." }, { status: 503 });
  }
  try {
    const { session } = guard;
    const sb = supabaseAdmin();
    const { data: classes, error } = await sb
      .from("classes")
      .select("id, name, students(id, name, roll_no, parent_phone)")
      .eq("academy_id", session.academy_id)
      .order("name");
    if (error) throw error;
    const out = (classes ?? []).map((c) => ({
      id: c.id as string,
      name: c.name as string,
      students: ((c.students ?? []) as { id: string; name: string; roll_no: string; parent_phone: string | null }[])
        .sort((a, b) => a.roll_no.localeCompare(b.roll_no, undefined, { numeric: true })),
    }));
    return NextResponse.json({ ok: true, classes: out });
  } catch (err) {
    console.error("[classes] failed:", err);
    return NextResponse.json({ ok: false, error: "Classes load nahi ho sakin." }, { status: 500 });
  }
}
