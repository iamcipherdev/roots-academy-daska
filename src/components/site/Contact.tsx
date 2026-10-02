"use client";

import { Phone, MessageCircle, MapPin, Clock, Youtube, Music2, Building2, ExternalLink } from "lucide-react";
import { CONTACT, CAMPUSES, telHref } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";

const MAP_EMBED = `https://maps.google.com/maps?q=${CONTACT.mapQuery}&z=15&output=embed`;

export function Contact() {
  return (
    <section id="contact" className="section-pad bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Campus & Contact"
          title="Visit our"
          highlight="campuses"
          description="Meet our teachers, see the computer lab and discuss your academic plan in person. You are always welcome at Roots Academy."
        />

        {/* campus cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {CAMPUSES.map((campus, i) => (
            <Reveal key={campus.name} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Building2 className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="rounded-full bg-brand-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-deep">
                    {campus.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-foreground">
                  {campus.name}
                </h3>
                <address className="mt-2.5 not-italic">
                  {campus.lines.map((line) => (
                    <p key={line} className="text-[14.5px] leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </address>
                {campus.mapsUrl && (
                  <a
                    href={campus.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-bold text-primary hover:underline"
                  >
                    View on Google Maps
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* contact + map */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Phone className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[15px] font-extrabold text-foreground">Call Us</h3>
                  <ul className="mt-2 space-y-1">
                    {CONTACT.phones.map((p) => (
                      <li key={p}>
                        <a
                          href={telHref(p)}
                          className="text-[14px] font-bold text-foreground/75 transition-colors hover:text-primary"
                        >
                          {p}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.09}>
                <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <MessageCircle className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[15px] font-extrabold text-foreground">WhatsApp</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    Fastest response for admissions and course details.
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className="mt-3 h-9 rounded-lg bg-primary px-4 text-[13px] font-bold hover:bg-brand-deep"
                  >
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Message now
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* socials — verified accounts only */}
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Clock className="h-5.5 w-5.5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[15px] font-extrabold text-foreground">
                  Follow the Academy
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  Official channels — announcements, result days and class activities.
                </p>
                <div className="mt-4 flex gap-2.5">
                  <a
                    href={CONTACT.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Roots Academy Daska on YouTube"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground/70 transition-all hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Youtube className="h-5 w-5" aria-hidden />
                  </a>
                  <a
                    href={CONTACT.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Roots Academy Daska on TikTok"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground/70 transition-all hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Music2 className="h-5 w-5" aria-hidden />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* map — main campus listing */}
          <Reveal delay={0.1} className="min-h-[420px]">
            <div className="h-full min-h-[420px] overflow-hidden rounded-2xl border border-border shadow-card">
              <iframe
                title="Roots Academy of Sciences location — Model Town, Daska"
                src={MAP_EMBED}
                className="h-full min-h-[420px] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
