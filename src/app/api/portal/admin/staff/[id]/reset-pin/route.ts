import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { hashPin, newSalt } from "@/lib/portal/auth";

/** POST /api/portal/admin/staff/[id]/reset-pin — admin sets a new PIN (shown once, never stored). */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = z.object({
      pin: z.string().trim().min(4).max(12).regex(/^[0-9]+$/, "PIN sirf digits mein ho."),
    }).safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "PIN 4–12 digits ka ho." }, { status: 400 });
    }

    const salt = newSalt();
    const { data, error } = await supabaseAdmin()
      .from("staff")
      .update({ pin_hash: hashPin(salt, parsed.data.pin), salt })
      .eq("id", id)
      .eq("academy_id", guard.session.academy_id)
      .select("id, name");
    if (error) throw error;
    if (!data || data.length === 0) {
      return NextResponse.json({ ok: false, error: "Staff not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, name: (data[0] as { name: string }).name });
  } catch (err) {
    console.error("[reset-pin] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not reset PIN." }, { status: 500 });
  }
}
