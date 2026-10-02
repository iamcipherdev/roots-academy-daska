"use client";

import { ICONS, BookOpen } from "./icons";
import { WHY_CHOOSE, CONTACT } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { ExternalLink } from "lucide-react";

/** "Why Students Choose Roots" — generic value cards + neutral Google Maps link. */
export function WhyChoose() {
  return (
    <section id="reviews" className="section-pad bg-brand-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Roots Academy"
          title="Why students choose"
          highlight="Roots"
          description="A learning environment built on consistency, guidance and genuine academic care — for the students of Daska and Jamke Cheema."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5">
          {WHY_CHOOSE.map((card, i) => {
            const Icon = ICONS[card.icon] ?? BookOpen;
            return (
              <Reveal key={card.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover sm:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-extrabold tracking-tight text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-10 text-center">
          <a
            href={CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-[14px] font-bold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            View on Google Maps
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
