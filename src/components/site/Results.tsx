"use client";

import { Trophy, Info, Camera } from "lucide-react";
import { RESULT_PLACEHOLDERS } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";

export function Results() {
  return (
    <section id="results" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Student Results"
          title="Results that make"
          highlight="families proud"
          description="This space is reserved for celebrating verified student achievements — positions, board results and test toppers — with the academy's official result announcements."
        />

        {/* placeholder grid — clearly marked until verified results are supplied */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {RESULT_PLACEHOLDERS.map((r, i) => (
            <Reveal key={r.initials} delay={i * 0.08}>
              <article className="placeholder-card flex h-full flex-col items-center rounded-2xl p-7 text-center">
                <span
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-2xl font-extrabold text-brand-deep"
                  aria-hidden
                >
                  {r.initials}
                </span>
                <span className="mt-4 rounded-full bg-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground ring-1 ring-border">
                  {r.class}
                </span>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-foreground/35">
                  {r.marks}
                </p>
                <p className="mt-1 text-[13px] font-semibold text-muted-foreground/70">
                  {r.achievement}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-8">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-primary/25 bg-brand-light/60 px-6 py-5 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Info className="h-5 w-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-[14px] font-extrabold text-foreground">
                Placeholder layout — verified results coming soon
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                We will only publish real, verifiable student results shared by the academy. If
                you are a student or parent with a Roots Academy result to celebrate, contact us
                and it can be featured here.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="h-11 shrink-0 rounded-xl border-primary/40 text-[13.5px] font-bold text-primary hover:bg-secondary"
            >
              <a href="#admissions">Share a result</a>
            </Button>
          </div>
        </Reveal>

        {/* result celebration strip */}
        <Reveal delay={0.2} className="mt-10">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl bg-[#191919] px-6 py-5 text-center">
            {[
              "Weekly test toppers announced in class",
              "Monthly short test records shared with parents",
              "Board exam preparation tracked subject-wise",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-[13.5px] font-semibold text-white/75"
              >
                <Trophy className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {item}
              </p>
            ))}
            <p className="flex items-center gap-2 text-[13.5px] font-semibold text-white/75">
              <Camera className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              Result day photos from the academy gallery
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
