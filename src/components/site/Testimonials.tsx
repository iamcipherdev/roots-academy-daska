"use client";

import { Star, MapPin, ExternalLink, Quote } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

function Stars({ value = 5, muted = false }: { value?: number; muted?: boolean }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${
            n <= value
              ? muted
                ? "fill-muted-foreground/30 text-muted-foreground/30"
                : "fill-primary text-primary"
              : "fill-border text-border"
          }`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="What the community"
          highlight="says about us"
          description="Roots Academy maintains a verified Google Maps listing for its Model Town, Daska campus. We display only genuine, publicly available feedback — never invented reviews."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {/* Google rating card — verified */}
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-card">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <MapPin className="h-5.5 w-5.5" aria-hidden />
                </span>
                <span className="rounded-full bg-brand-light px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-deep">
                  Verified listing
                </span>
              </div>
              <p className="mt-5 text-[13px] font-bold uppercase tracking-wider text-muted-foreground">
                Google Maps rating
              </p>
              <div className="mt-2 flex items-end gap-3">
                <span className="text-5xl font-extrabold tracking-tight text-foreground">
                  {CONTACT.rating}
                </span>
                <span className="pb-1.5">
                  <Stars value={4} />
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                Rated by visitors of{" "}
                <span className="font-bold text-foreground">
                  Roots Academy of Sciences
                </span>{" "}
                — Model Town, Daska on Google Maps.
              </p>
              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-bold text-primary hover:underline"
              >
                Read reviews on Google Maps
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </article>
          </Reveal>

          {/* honest placeholder for future verified reviews */}
          <Reveal delay={0.1}>
            <article className="placeholder-card flex h-full flex-col rounded-2xl p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                <Quote className="h-5.5 w-5.5" aria-hidden />
              </span>
              <p className="mt-5 text-[13px] font-bold uppercase tracking-wider text-muted-foreground">
                More reviews coming soon
              </p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                This space is reserved for genuine written reviews from parents and students.
                Are you a Roots Academy parent or student? Leave a review on Google and your
                feedback may be featured here.
              </p>
              <Stars value={0} muted />
              <p className="mt-auto pt-4 text-[12.5px] font-semibold text-muted-foreground/70">
                We do not fabricate testimonials — only real public reviews appear on this site.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
