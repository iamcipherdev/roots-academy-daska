import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { z } from "zod";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";
import { hashPin, createSessionToken, setStaffSessionCookie } from "@/lib/portal/auth";

const loginSchema = z.object({
  pin: z.string().trim().min(4).max(32),
});

const GENERIC_ERROR = "Incorrect PIN.";

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

    const sb = supabaseAdmin();
    const { data: staffList, error } = await sb
      .from("staff")
      .select("id, name, pin_hash, salt, role, academy_id");
    if (error) throw error;

    const matches = (staffList ?? []).filter((s) => {
      const candidate = hashPin(s.salt as string, parsed.data.pin);
      const a = Buffer.from(candidate, "utf8");
      const b = Buffer.from(s.pin_hash as string, "utf8");
      return a.length === b.length && timingSafeEqual(a, b);
    });

    if (matches.length === 0) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 });
    }
    if (matches.length > 1) {
      return NextResponse.json(
        { ok: false, error: "This PIN is shared by multiple staff. Ask the admin to reset PINs." },
        { status: 401 }
      );
    }
    const staff = matches[0];

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
