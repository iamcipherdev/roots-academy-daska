import { NextResponse } from "next/server";
import { isPortalConfigured, supabaseAdmin } from "@/lib/portal/supabase";

export async function GET() {
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, hint: "env vars missing" });
  }
  try {
    const { error } = await supabaseAdmin().from("academies").select("id").limit(1);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[health] db ping failed:", err);
    return NextResponse.json({ ok: false, hint: "database unreachable" });
  }
}
