"use client";

import { MessageCircle, Quote } from "lucide-react";
import { waHref } from "@/lib/site-data";
import { Reveal } from "./Reveal";

/**
 * Honest placeholder band for parent/student voices.
 * No testimonials are invented — this invites real ones via WhatsApp,
 * and gives the owner a ready slot to add genuine quotes later.
 */
export function TestimonialBand() {
  return (
    <section className="border-y border-border bg-brand-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Quote className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                Studied at Roots Academy?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
                Parents and students — tell us about your experience. With your permission,
                we would love to feature genuine stories from our classrooms here.
              </p>
            </div>
            <a
              href={waHref("Assalam-o-Alaikum! I studied at Roots Academy and want to share my experience.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#1da851] px-6 text-[14.5px] font-bold text-white shadow-lg shadow-[#1da851]/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Share Your Experience
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
