import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { z } from "zod";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { hashPin, createSessionToken, setStaffSessionCookie } from "@/lib/portal/auth";

const loginSchema = z.object({
  phone: z.string().trim().min(10).max(15).regex(/^[0-9+\-\s()]+$/),
  pin: z.string().trim().min(4).max(12),
});

const GENERIC_ERROR = "Incorrect phone number or PIN.";

export async function POST(req: NextRequest) {
  try {
    if (!isPortalConfigured()) {
      return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
    }
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });
    }
    const phone = parsed.data.phone.replace(/[\s\-()]/g, "");

    const sb = supabaseAdmin();
    const { data: staff, error } = await sb
      .from("staff")
      .select("id, name, phone, pin_hash, salt, role, academy_id")
      .eq("phone", phone)
      .maybeSingle();

    if (error) throw error;
    if (!staff) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 });
    }

    const candidate = hashPin(staff.salt as string, parsed.data.pin);
    const a = Buffer.from(candidate, "utf8");
    const b = Buffer.from(staff.pin_hash as string, "utf8");
    const match = a.length === b.length && timingSafeEqual(a, b);
    if (!match) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 });
    }

    const token = createSessionToken({
      staff_id: staff.id as string,
      role: staff.role as "admin" | "teacher",
      academy_id: staff.academy_id as string,
    });
    await setStaffSessionCookie(token);

    return NextResponse.json({
      ok: true,
      staff: { name: staff.name, role: staff.role },
    });
  } catch (err) {
    console.error("[portal login] failed:", err);
    return NextResponse.json({ ok: false, error: "Login failed. Please try again." }, { status: 500 });
  }
}
