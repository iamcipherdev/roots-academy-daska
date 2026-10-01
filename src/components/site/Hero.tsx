"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
import { CONTACT, HERO } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

export function Hero() {
  const reduce = useReducedMotion();
  const anim = reduce ? {} : undefined;

  return (
    <section id="home" className="relative overflow-hidden bg-white pt-[72px]">
      {/* soft red wash behind hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_10%,#fce8e9_0%,transparent_60%),radial-gradient(50%_40%_at_0%_100%,#fdf0f0_0%,transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        {/* Copy */}
        <div>
          <motion.div {...(anim ?? fade(0))}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Admissions Open 2025 — Daska &amp; Jamkey Cheema
            </span>
          </motion.div>

          <motion.h1
            {...(anim ?? fade(0.08))}
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem]"
          >
            {HERO.headlineA}
            <br />
            <span className="text-primary">{HERO.headlineB}</span>
          </motion.h1>

          <motion.p
            {...(anim ?? fade(0.16))}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {HERO.sub}
          </motion.p>

          <motion.p
            {...(anim ?? fade(0.22))}
            className="mt-4 flex items-start gap-2 text-[15px] font-bold text-foreground"
          >
            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            {CONTACT.name} — {CONTACT.city}
          </motion.p>

          {/* CTAs */}
          <motion.div {...(anim ?? fade(0.3))} className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-2xl bg-primary px-7 text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-brand-deep"
            >
              <a href="#admissions">
                Apply for Admission
                <ArrowRight className="ml-2 h-4.5 w-4.5" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-2xl border-[1.5px] border-primary/25 bg-white px-6 text-[15px] font-bold text-foreground hover:border-primary/50 hover:bg-secondary"
            >
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                  "Assalam-o-Alaikum! I want to ask about admission at Roots Academy of Sciences, Daska."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4.5 w-4.5 text-primary" aria-hidden />
                WhatsApp Us
              </a>
            </Button>
          </motion.div>

          {/* Verified chips */}
          <motion.ul {...(anim ?? fade(0.38))} className="mt-9 flex flex-wrap gap-2">
            {HERO.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-2 text-[13px] font-bold text-secondary-foreground"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                {chip}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Real photo collage */}
        <motion.div
          {...(anim ?? fade(0.25))}
          className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
        >
          <div className="relative grid h-[420px] grid-cols-12 grid-rows-6 gap-3 sm:h-[500px] sm:gap-4 lg:h-[560px]">
            {/* main lab photo — real Google Maps photo of their computer lab */}
            <div className="col-span-8 row-span-6 relative overflow-hidden rounded-[1.6rem] shadow-card ring-1 ring-border">
              <Image
                src={HERO.images.main}
                alt="Roots Academy computer lab — students working at computers, Model Town Daska campus"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 480px"
                className="photo object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-white">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Computer Lab — Model Town Campus, Daska
                </p>
              </div>
            </div>

            {/* interior photo — real academy video frame */}
            <div className="col-span-4 row-span-3 relative overflow-hidden rounded-[1.4rem] shadow-card ring-1 ring-border">
              <Image
                src={HERO.images.secondary}
                alt="Inside the Roots Academy Daska campus"
                fill
                priority
                sizes="(max-width: 1024px) 30vw, 220px"
                className="photo object-cover"
              />
            </div>

            {/* practical class — real video frame */}
            <div className="col-span-4 row-span-3 relative overflow-hidden rounded-[1.4rem] shadow-card ring-1 ring-border">
              <Image
                src={HERO.images.tertiary}
                alt="Practical class demonstration at Roots Academy"
                fill
                priority
                sizes="(max-width: 1024px) 30vw, 220px"
                className="photo object-cover"
              />
            </div>
          </div>

          {/* floating badge */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.45 }}
            className="absolute -left-3 top-8 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:-left-6"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Supervised by
            </p>
            <p className="text-[14px] font-extrabold text-foreground">
              Dr. Mohsin Ali <span className="text-primary">PhD Physics</span>
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.45 }}
            className="absolute -right-2 bottom-10 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:-right-4"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Google rating
            </p>
            <p className="text-[14px] font-extrabold text-foreground">
              4.2 / 5 <span className="text-primary">★</span> verified listing
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
