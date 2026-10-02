"use client";

import { ArrowRight, Repeat } from "lucide-react";
import { SYSTEM_STEPS } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function AcademicSystem() {
  return (
    <section id="system" className="section-pad relative overflow-hidden bg-[#191919]">
      {/* faint red glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_100%_0%,rgba(193,18,31,0.22)_0%,transparent_60%),radial-gradient(40%_30%_at_0%_100%,rgba(193,18,31,0.16)_0%,transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              The Roots Academic System
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-[2.6rem] md:leading-[1.15]">
              One system. Five steps.
              <br />
              <span className="text-primary">Continuous improvement.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
              Most academies only teach. At Roots Academy, every student moves through a
              complete cycle — learning, practising and being tested again and again — so weak
              areas are caught early, not on exam day.
            </p>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="steps-line relative mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {SYSTEM_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.09}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/50 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-mono text-[15px] font-bold text-white shadow-lg shadow-primary/30">
                    {step.step}
                  </span>
                  {i < SYSTEM_STEPS.length - 1 && (
                    <ArrowRight
                      className="hidden h-4 w-4 text-white/25 transition-colors group-hover:text-primary lg:block"
                      aria-hidden
                    />
                  )}
                </div>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* loop note */}
        <Reveal delay={0.2} className="mt-10">
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-5 sm:flex-row sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Repeat className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-[14.5px] leading-relaxed text-white/80">
              <span className="font-extrabold text-white">The cycle repeats every week.</span>{" "}
              With weekly tests and monthly short tests, students face exam-style conditions
              dozens of times before the real board exam — so the final paper feels familiar,
              not frightening.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
