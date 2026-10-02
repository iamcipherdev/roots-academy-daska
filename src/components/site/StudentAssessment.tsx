"use client";

import { ICONS, BookOpen } from "./icons";
import { ASSESSMENT_CARDS } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

/** Student assessment section — factual cards about the academy's testing system. */
export function StudentAssessment() {
  return (
    <section id="assessment" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Student Assessment"
          title="Progress you can"
          highlight="actually measure"
          description="At Roots Academy, student progress is tracked through a structured testing system — not guesswork. Every student knows where they stand, and every parent is kept in the loop."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 lg:gap-4">
          {ASSESSMENT_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon] ?? BookOpen;
            return (
              <Reveal key={card.title} delay={(i % 5) * 0.07}>
                <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[16.5px] font-extrabold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {card.description}
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
