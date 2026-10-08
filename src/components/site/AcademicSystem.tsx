"use client";

import { Repeat } from "lucide-react";
import { SYSTEM_STEPS } from "@/lib/site-data";
import { Reveal } from "./Reveal";

/**
 * The Roots Academic System as a vertical timeline — one system, five steps,
 * presented as an actual cycle the student moves through.
 */
export function AcademicSystem() {
  return (
    <section id="system" className="section-pad relative overflow-hidden bg-[#161616]">
      {/* faint red glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_100%_0%,rgba(193,18,31,0.22)_0%,transparent_60%),radial-gradient(40%_30%_at_0%_100%,rgba(193,18,31,0.16)_0%,transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
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
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                Most academies only teach. At Roots Academy, every student moves through a
                complete cycle — learning, practising and being tested again and again — so
                weak areas are caught early, not on exam day.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <Repeat className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-[14px] leading-relaxed text-white/80">
                  <span className="font-extrabold text-white">The cycle repeats every week.</span>{" "}
                  Students face exam-style conditions dozens of times before the real board
                  exam — so the final paper feels familiar, not frightening.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Vertical timeline */}
          <ol className="relative space-y-2 border-l-2 border-white/10 pl-0">
            {SYSTEM_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06}>
                <li className="relative pb-8 pl-10 last:pb-0 sm:pl-12">
                  {/* node */}
                  <span
                    aria-hidden
                    className="absolute -left-[21px] top-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-mono text-[13px] font-bold text-white shadow-lg shadow-primary/40 ring-4 ring-[#161616] sm:-left-[23px]"
                  >
                    {i + 1}
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-primary/50 hover:bg-white/[0.07] sm:p-7">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                      Step {step.step}
                    </p>
                    <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
