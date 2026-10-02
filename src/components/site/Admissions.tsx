"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MessageCircle, Phone, Loader2, CheckCircle2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { CONTACT, COURSES, COURSE_CATEGORIES, waHref } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  studentName: z.string().trim().min(2, "Please enter the student's name"),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Digits and + - ( ) only"),
  currentClass: z.string().optional(),
  program: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CLASS_OPTIONS = [
  "Class 6–8 (Middle)",
  "Matric (9th–10th)",
  "FSc / ICS (11th–12th)",
  "Graduate / Other",
];

export function Admissions() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { studentName: "", phone: "", currentClass: "", program: "", message: "" },
  });

  const program = watch("program");

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed");
      }
      setDone(true);
      reset();
      toast.success("Inquiry received!", {
        description:
          "JazakAllah! Our team will contact you shortly. For an instant response, message us on WhatsApp.",
      });
    } catch (err) {
      toast.error("Could not send inquiry", {
        description:
          err instanceof Error ? err.message : "Please try again or contact us on WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="admissions" className="relative overflow-hidden bg-brand-gradient">
      {/* decorative circles */}
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border-[28px] border-white/5" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full border-[36px] border-white/5" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-8">
        {/* copy + direct contacts */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Admissions Now Open
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-[2.7rem] md:leading-[1.12]">
              Ready to Join
              <br />
              Roots Academy?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              Send an admission inquiry and our team will call you back with fee structure,
              timings and campus details for Model Town Daska and Jamke Cheema.
              </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                  "Assalam-o-Alaikum! I want to ask about admission at Roots Academy of Sciences, Daska."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#1da851]">
                  <MessageCircle className="h-5.5 w-5.5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[15px] font-extrabold text-foreground">WhatsApp</span>
                  <span className="block text-[12.5px] font-semibold text-muted-foreground">
                    Instant reply
                  </span>
                </span>
              </a>

              <a
                href={`tel:+92${CONTACT.primaryPhone.replace(/-/g, "").slice(1)}`}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Phone className="h-5.5 w-5.5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[15px] font-extrabold text-foreground">Call Now</span>
                  <span className="block text-[12.5px] font-semibold text-muted-foreground">
                    {CONTACT.primaryPhone}
                  </span>
                </span>
              </a>
            </div>

            <ul className="mt-6 space-y-1.5 text-[13.5px] font-semibold text-white/70">
              {CONTACT.phones.slice(1).map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-white/50" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* form card */}
        <Reveal delay={0.12}>
          <div className="rounded-[1.6rem] bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
            {done ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground">
                  Inquiry sent successfully
                </h3>
                <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-muted-foreground">
                  Thank you for choosing Roots Academy. Our admissions team will contact you
                  soon, In sha Allah.
                </p>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <Button
                    asChild
                    className="h-11 rounded-xl bg-primary px-6 text-[14px] font-bold hover:bg-brand-deep"
                  >
                    <a
                      href={waHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
                      Continue on WhatsApp
                    </a>
                  </Button>
                  <Button
                    onClick={() => setDone(false)}
                    variant="outline"
                    className="h-11 rounded-xl border-border px-6 text-[14px] font-bold"
                  >
                    Send another inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                  Admission Inquiry Form
                </h3>
                <p className="mt-1 text-[13.5px] text-muted-foreground">
                  Fill the form — we will contact you back.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="studentName" className="text-[13px] font-bold text-foreground">
                        Student Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="studentName"
                        placeholder="e.g. Ahmed Raza"
                        autoComplete="name"
                        className="h-11 rounded-xl border-input bg-[#fafafa] focus-visible:ring-primary"
                        aria-invalid={!!errors.studentName}
                        {...register("studentName")}
                      />
                      {errors.studentName && (
                        <p className="text-[12px] font-semibold text-destructive">
                          {errors.studentName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-[13px] font-bold text-foreground">
                        Phone / WhatsApp <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="03xx-xxxxxxx"
                        autoComplete="tel"
                        className="h-11 rounded-xl border-input bg-[#fafafa] focus-visible:ring-primary"
                        aria-invalid={!!errors.phone}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-[12px] font-semibold text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="currentClass" className="text-[13px] font-bold text-foreground">
                        Current Class
                      </Label>
                      <Select onValueChange={(v) => setValue("currentClass", v)}>
                        <SelectTrigger
                          id="currentClass"
                          className="h-11 w-full rounded-xl border-input bg-[#fafafa] focus:ring-primary"
                        >
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASS_OPTIONS.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="program" className="text-[13px] font-bold text-foreground">
                        Interested Program
                      </Label>
                      <Select value={program} onValueChange={(v) => setValue("program", v)}>
                        <SelectTrigger
                          id="program"
                          className="h-11 w-full rounded-xl border-input bg-[#fafafa] focus:ring-primary"
                        >
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                        {COURSE_CATEGORIES.map((cat) => (
                          <div key={cat}>
                            <div className="bg-[#fafafa] px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                              {cat}
                            </div>
                            {COURSES.filter((c) => c.category === cat).map((c) => (
                              <SelectItem key={c.slug} value={c.name}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                        <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                      </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-[13px] font-bold text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Any question about fees, timings or subjects…"
                      rows={3}
                      className="resize-none rounded-xl border-input bg-[#fafafa] focus-visible:ring-primary"
                      {...register("message")}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-13 w-full rounded-xl bg-primary text-[15.5px] font-bold shadow-lg shadow-primary/25 hover:bg-brand-deep"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4.5 w-4.5" aria-hidden />
                        Send Admission Inquiry
                      </>
                    )}
                  </Button>

                  <p className="text-center text-[12px] leading-relaxed text-muted-foreground">
                    By submitting, you agree to be contacted by Roots Academy regarding
                    admissions. Your details are never shared.
                  </p>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
