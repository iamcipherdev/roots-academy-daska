"use client";

import { useState } from "react";
import { BookOpenCheck, MessageCircle, Clock3, ChevronDown, Monitor, FlaskConical, Languages, type LucideIcon } from "lucide-react";
import { CONTACT, PROGRAMS, type Program } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<Program["category"], LucideIcon> = {
  "Science Academy": FlaskConical,
  "Computer College": Monitor,
  "Language & Skills": Languages,
};

function inquiryLink(program: Program) {
  const text = `Assalam-o-Alaikum! I am interested in the "${program.name}" program at Roots Academy of Sciences, Daska. Please share fee and timing details.`;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function Programs() {
  const [expanded, setExpanded] = useState<string | null>(PROGRAMS[0]?.name ?? null);

  return (
    <section id="programs" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Programs"
          title="Courses offered at"
          highlight="Roots Academy"
          description="These programs are taken from the academy's own official admission posters — science academy coaching, computer college courses, DIT diploma, IELTS and digital skills."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
          {PROGRAMS.map((program, i) => {
            const Icon = CATEGORY_ICONS[program.category];
            const isOpen = expanded === program.name;
            const shownSubjects = isOpen ? program.subjects : program.subjects.slice(0, 6);
            return (
              <Reveal key={program.name} delay={(i % 2) * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="rounded-full bg-brand-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-deep">
                      {program.category}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-foreground">
                    {program.name}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>

                  {/* Subjects */}
                  <div className="mt-5">
                    <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                      <BookOpenCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                      {program.name.includes("Science") ? "Subjects covered" : "What you'll learn"}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {shownSubjects.map((subject) => (
                        <li
                          key={subject}
                          className="rounded-lg bg-[#fafafa] px-2.5 py-1.5 text-[12.5px] font-semibold text-foreground/75 ring-1 ring-border/70"
                        >
                          {subject}
                        </li>
                      ))}
                      {!isOpen && program.subjects.length > 6 && (
                        <li className="rounded-lg bg-secondary px-2.5 py-1.5 text-[12.5px] font-bold text-brand-deep">
                          +{program.subjects.length - 6} more
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    {program.schedule && (
                      <p className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
                        <Clock3 className="h-4 w-4 text-primary" aria-hidden />
                        {program.schedule}
                      </p>
                    )}
                    <div className="flex items-center gap-2.5">
                      <Button
                        asChild
                        className="h-11 flex-1 rounded-xl bg-primary text-[14px] font-bold hover:bg-brand-deep"
                      >
                        <a
                          href={inquiryLink(program)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
                          Inquire on WhatsApp
                        </a>
                      </Button>
                      {program.subjects.length > 6 && (
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label={isOpen ? "Show fewer subjects" : "Show all subjects"}
                          aria-expanded={isOpen}
                          onClick={() => setExpanded(isOpen ? null : program.name)}
                          className="h-11 w-11 shrink-0 rounded-xl border-border"
                        >
                          <ChevronDown
                            className={cn("h-4.5 w-4.5 transition-transform", isOpen && "rotate-180")}
                            aria-hidden
                          />
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-8">
          <p className="mx-auto max-w-2xl rounded-2xl bg-[#fafafa] px-5 py-4 text-center text-[13px] leading-relaxed text-muted-foreground ring-1 ring-border">
            New courses and batches are announced on the academy&apos;s official social media.
            For the latest fee structure and timetable, please call{" "}
            <a href={`tel:${CONTACT.phones[0].replace(/-/g, "")}`} className="font-bold text-primary hover:underline">
              {CONTACT.phones[0]}
            </a>{" "}
            or send a WhatsApp inquiry.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
