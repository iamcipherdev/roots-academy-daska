import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { hashPin, newSalt } from "@/lib/portal/auth";

const addSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(10).max(15).regex(/^[0-9+\-\s()]+$/),
  pin: z.string().trim().min(4).max(12).regex(/^[0-9]+$/, "PIN sirf digits mein ho."),
  role: z.enum(["admin", "teacher"]).default("teacher"),
});

/** GET /api/portal/admin/staff — list staff (never hashes). */
export async function GET() {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const { data, error } = await supabaseAdmin()
      .from("staff")
      .select("id, name, phone, role, created_at")
      .eq("academy_id", guard.session.academy_id)
      .order("created_at");
    if (error) throw error;
    return NextResponse.json({ ok: true, staff: data ?? [] });
  } catch (err) {
    console.error("[admin staff GET] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not load staff." }, { status: 500 });
  }
}

/** POST /api/portal/admin/staff — add a teacher/admin. */
export async function POST(req: NextRequest) {
  const guard = await requireStaff("admin");
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = addSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Enter a valid name, phone and PIN." }, { status: 400 });
    }
    const phone = parsed.data.phone.replace(/[\s\-()]/g, "");
    const salt = newSalt();

    const { data, error } = await supabaseAdmin()
      .from("staff")
      .insert({
        academy_id: guard.session.academy_id,
        name: parsed.data.name,
        phone,
        pin_hash: hashPin(salt, parsed.data.pin),
        salt,
        role: parsed.data.role,
      })
      .select("id, name, phone, role")
      .single();

    if (error) {
      if (String(error.message).includes("duplicate") || (error as { code?: string }).code === "23505") {
        return NextResponse.json({ ok: false, error: "This phone number is already registered." }, { status: 409 });
      }
      throw error;
    }
    return NextResponse.json({ ok: true, staff: data });
  } catch (err) {
    console.error("[admin staff POST] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not add staff." }, { status: 500 });
  }
}
