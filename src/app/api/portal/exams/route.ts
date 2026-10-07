import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/portal/guards";
import { supabaseAdmin, isPortalConfigured } from "@/lib/portal/supabase";

const subjectSchema = z.object({
  subject: z.string().trim().min(1).max(60),
  total: z.number().int().min(1).max(10000),
});

const createSchema = z.object({
  class_id: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  subjects: z.array(subjectSchema).min(1).max(20),
});

/** GET /api/portal/exams?class_id= — exams with derived subjects. */
export async function GET(req: NextRequest) {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database connect nahi hui." }, { status: 503 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const class_id = searchParams.get("class_id");
    if (!class_id) return NextResponse.json({ ok: false, error: "class_id chahiye." }, { status: 400 });

    const sb = supabaseAdmin();
    const { data: exams, error } = await sb
      .from("exams")
      .select("id, name, created_at")
      .eq("class_id", class_id)
      .eq("academy_id", guard.session.academy_id)
      .order("created_at", { ascending: false });
    if (error) throw error;

    const out: { id: string; name: string; created_at: string; subjects: { subject: string; total: number }[] }[] = [];
    for (const e of exams ?? []) {
      const { data: marks } = await sb
        .from("marks")
        .select("subject, total")
        .eq("exam_id", e.id as string);
      const seen = new Map<string, number>();
      for (const m of marks ?? []) {
        if (!seen.has(m.subject as string)) seen.set(m.subject as string, m.total as number);
      }
      out.push({
        id: e.id as string,
        name: e.name as string,
        created_at: e.created_at as string,
        subjects: [...seen.entries()].map(([subject, total]) => ({ subject, total })),
      });
    }
    return NextResponse.json({ ok: true, exams: out });
  } catch (err) {
    console.error("[exams GET] failed:", err);
    return NextResponse.json({ ok: false, error: "Tests load nahi ho sake." }, { status: 500 });
  }
}

/** POST /api/portal/exams — create an exam (subjects carried by client afterwards). */
export async function POST(req: NextRequest) {
  const guard = await requireStaff();
  if ("response" in guard) return guard.response;
  if (!isPortalConfigured()) {
    return NextResponse.json({ ok: false, error: "Database connect nahi hui." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Test ka naam aur subjects theek likhein." }, { status: 400 });
    }
    const { session } = guard;
    const sb = supabaseAdmin();

    // Class must belong to this academy.
    const { data: cls } = await sb
      .from("classes")
      .select("id")
      .eq("id", parsed.data.class_id)
      .eq("academy_id", session.academy_id)
      .maybeSingle();
    if (!cls) {
      return NextResponse.json({ ok: false, error: "Class nahi mili." }, { status: 404 });
    }

    const { data: exam, error } = await sb
      .from("exams")
      .insert({ academy_id: session.academy_id, class_id: parsed.data.class_id, name: parsed.data.name })
      .select("id, name")
      .single();
    if (error) throw error;

    return NextResponse.json({
      ok: true,
      exam: { id: exam.id as string, name: exam.name as string, subjects: parsed.data.subjects },
    });
  } catch (err) {
    console.error("[exams POST] failed:", err);
    return NextResponse.json({ ok: false, error: "Test create nahi ho saka." }, { status: 500 });
  }
}
