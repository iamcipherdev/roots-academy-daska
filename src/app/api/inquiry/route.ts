import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const inquirySchema = z.object({
  studentName: z.string().trim().min(2, "Please enter the student name").max(80),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Phone number can only contain digits and + - ( )"),
  currentClass: z.string().trim().max(60).optional().or(z.literal("")),
  program: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Invalid form data" },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.create({
      data: {
        studentName: parsed.data.studentName,
        phone: parsed.data.phone,
        currentClass: parsed.data.currentClass || null,
        program: parsed.data.program || null,
        message: parsed.data.message || null,
      },
    });

    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (err) {
    console.error("[inquiry] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit your inquiry right now. Please try WhatsApp or call us." },
      { status: 500 }
    );
  }
}
