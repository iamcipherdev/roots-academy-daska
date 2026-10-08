"use client";

import {
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  FlaskConical,
  MonitorSmartphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { WHY_ROOTS } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  FlaskConical,
  MonitorSmartphone,
  ShieldCheck,
};

/**
 * The single "why choose Roots" section — merged from the old WhyRoots,
 * StudentAssessment and WhyChoose blocks so nothing repeats.
 */
export function WhyRoots() {
  return (
    <section id="why-roots" className="section-pad bg-brand-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Roots Academy"
          title="Built on discipline,"
          highlight="measured by results"
          description="Roots Academy of Sciences & Computer College focuses on what actually improves a student's performance — consistent teaching, continuous testing and honest academic monitoring."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {WHY_ROOTS.map((s, i) => {
            const Icon = ICONS[s.icon] ?? GraduationCap;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.07}>
                <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[17px] font-extrabold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
