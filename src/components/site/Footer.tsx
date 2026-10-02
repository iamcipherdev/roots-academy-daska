"use client";

import Link from "next/link";
import { GraduationCap, Phone, MapPin, MessageCircle, Youtube, Music2, ArrowUpRight } from "lucide-react";
import { CONTACT, NAV_LINKS, CAMPUSES, telHref } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-auto bg-[#141414] text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.8fr_1.1fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <GraduationCap className="h-5.5 w-5.5" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-[17px] font-extrabold tracking-tight text-white">
                  Roots <span className="text-primary">Academy</span>
                </span>
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  of Sciences &amp; Computer College
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/55">
              Quality education, regular assessment and dedicated academic guidance for the
              students of Daska — because strong roots grow better results.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[12px] font-bold text-white/60 ring-1 ring-white/10">
              &ldquo;Keys of Success&rdquo; — official academy motto
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={CONTACT.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Roots Academy on YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-primary hover:text-white"
              >
                <Youtube className="h-4.5 w-4.5" aria-hidden />
              </a>
              <a
                href={CONTACT.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Roots Academy on TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-primary hover:text-white"
              >
                <Music2 className="h-4.5 w-4.5" aria-hidden />
              </a>
            </div>
          </div>

          {/* quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] font-semibold text-white/55 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* campuses + contact */}
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-white">
              Campuses
            </h3>
            <ul className="mt-4 space-y-4 text-[13.5px]">
              {CAMPUSES.map((campus) => (
                <li key={campus.name} className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="leading-relaxed">
                    <span className="block font-bold text-white/80">{campus.name}</span>
                    {campus.lines.map((line) => (
                      <span key={line} className="block text-white/50">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={telHref(CONTACT.primaryPhone)}
                  className="transition-colors hover:text-primary"
                >
                  {CONTACT.primaryPhone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  WhatsApp Us
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-[12.5px] text-white/40">
            © {new Date().getFullYear()} {CONTACT.name}, Daska. All rights reserved.
          </p>
          <p className="text-[12.5px] text-white/40">
            Strong Roots. Better Results.
          </p>
        </div>
      </div>
    </footer>
  );
}
