"use client";

import { Phone, MessageCircle, MapPin, Clock, Youtube, Music2, Building2 } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
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
          highlight="Model Town campus"
          description="Meet our teachers, see the computer lab and discuss your academic plan in person. You are always welcome at Roots Academy."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* info cards */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <MapPin className="h-5.5 w-5.5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[17px] font-extrabold tracking-tight text-foreground">
                  {CONTACT.name}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {CONTACT.address}
                </p>
                <p className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  {CONTACT.subCampus}
                </p>
                <a
                  href={CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-primary hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.06}>
                <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Phone className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[15px] font-extrabold text-foreground">Call Us</h3>
                  <ul className="mt-2 space-y-1">
                    {CONTACT.phones.map((p) => (
                      <li key={p}>
                        <a
                          href={`tel:${p.replace(/-/g, "")}`}
                          className="text-[14px] font-bold text-foreground/75 transition-colors hover:text-primary"
                        >
                          {p}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
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

            {/* socials — verified only */}
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
                <p className="mt-3 text-[11.5px] leading-relaxed text-muted-foreground/70">
                  Facebook and Instagram pages will be linked here once the academy confirms its
                  official handles.
                </p>
              </div>
            </Reveal>
          </div>

          {/* map */}
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
