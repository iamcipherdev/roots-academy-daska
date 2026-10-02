"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { FOUNDER } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";

/** Compact homepage founder preview — full story lives on /founder. */
export function FounderPreview() {
  return (
    <section id="founder" className="section-pad bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Leadership"
          title="Meet the"
          highlight="Founder"
        />

        <Reveal className="mt-12">
          <div className="mx-auto grid max-w-5xl items-center gap-8 overflow-hidden rounded-[1.6rem] border border-border bg-white p-6 shadow-card sm:p-9 md:grid-cols-[300px_1fr] md:gap-10">
            {/* portrait */}
            <div className="relative mx-auto w-full max-w-[300px]">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[1.8rem] bg-brand-gradient-soft"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary ring-1 ring-border">
                <Image
                  src={FOUNDER.photo}
                  alt="Dr. Mohsin Ali — Founder and Director of Roots Academy, PhD Physics"
                  fill
                  sizes="(max-width: 768px) 80vw, 300px"
                  className="photo object-cover"
                />
              </div>
            </div>

            {/* copy */}
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-secondary-foreground">
                <Quote className="h-3.5 w-3.5" aria-hidden />
                {FOUNDER.role}
              </span>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                {FOUNDER.name}
              </h3>
              <p className="mt-1.5 text-[15px] font-bold text-primary">
                {FOUNDER.qualification}
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                {FOUNDER.intro[0]}
              </p>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                Under his supervision, the academy combines regular assessment, subject
                specialists and modern computer education for the students of Daska.
              </p>
              <Button
                asChild
                className="mt-6 h-12 rounded-xl bg-primary px-6 text-[14.5px] font-bold shadow-sm hover:bg-brand-deep"
              >
                <Link href="/founder">
                  Meet the Founder
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
