import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ExternalLink,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Monitor,
  Languages,
} from "lucide-react";
import {
  CONTACT,
  CAMPUSES,
  SYSTEM_STEPS,
  FOUNDER,
  COURSES,
  waHref,
} from "@/lib/site-data";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Roots Academy of Sciences & Computer College, Daska — our academic environment, learning approach, programs and campuses in Daska and Jamke Cheema.",
  alternates: { canonical: "/about" },
};

const PROGRAM_AREAS = [
  {
    title: "Academic Programs",
    description:
      "Matric and Intermediate coaching across science and humanities subjects with regular testing.",
    icon: CalendarCheck,
    count: `${COURSES.filter((c) => c.category === "Academic Programs").length} programs`,
  },
  {
    title: "Computer & Technology",
    description:
      "Practical computer courses in the academy's own lab — from office skills to AI and programming.",
    icon: Monitor,
    count: `${COURSES.filter((c) => c.category === "Computer & Technology").length} courses`,
  },
  {
    title: "Language & Communication",
    description:
      "IELTS preparation and Spoken English classes led by an M.Phil. Literature specialist.",
    icon: Languages,
    count: `${COURSES.filter((c) => c.category === "Language & Communication").length} programs`,
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="About Us"
          title="About"
          highlight="Roots Academy"
          description={`${CONTACT.name} — quality education, regular assessment and dedicated academic guidance for the students of Daska and Jamke Cheema.`}
        />

        {/* academy intro */}
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  Our Academy
                </span>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.4rem]">
                  An academy built on <span className="text-primary">strong roots</span>
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Roots Academy of Sciences &amp; Computer College serves the students of
                  Daska and the surrounding areas with a simple belief — students succeed
                  when teaching is clear, testing is regular and guidance is personal. From
                  Matric and Intermediate coaching to computer courses and English language
                  programs, everything is offered under one academy.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  The academy runs across two campuses — the Main Campus in Model Town,
                  Daska and the Jamke Cheema Campus near Shakir Marriage Hall. Academic
                  programs are supervised by Dr. Mohsin Ali (PhD Physics), supported by
                  subject specialists leading each course.
                </p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-[13px] font-bold text-brand-deep">
                  &ldquo;Keys of Success&rdquo; — the academy&apos;s official motto
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card ring-1 ring-border">
                    <Image
                      src="/images/lab-hero.jpg"
                      alt="Roots Academy computer lab — students working at computers"
                      fill
                      priority
                      sizes="(max-width: 1024px) 45vw, 280px"
                      className="photo object-cover"
                    />
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:gap-4">
                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-card ring-1 ring-border">
                      <Image
                        src="/images/practical-class.jpg"
                        alt="Practical class demonstration at Roots Academy"
                        fill
                        sizes="(max-width: 1024px) 45vw, 280px"
                        className="photo object-cover"
                      />
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-card ring-1 ring-border">
                      <Image
                        src="/images/interior.jpg"
                        alt="Inside the Roots Academy campus"
                        fill
                        sizes="(max-width: 1024px) 45vw, 280px"
                        className="photo object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* learning approach */}
        <section className="section-pad bg-[#fafafa]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                Learning Approach
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.4rem]">
                Learn. Practice. Test. <span className="text-primary">Improve.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Every Roots Academy student moves through the same continuous cycle — so
                weak areas are caught early, not on exam day.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {SYSTEM_STEPS.map((step, i) => (
                <Reveal key={step.step} delay={(i % 5) * 0.07}>
                  <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-mono text-[14px] font-bold text-white">
                      {step.step}
                    </span>
                    <h3 className="mt-4 text-[17px] font-extrabold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* what we offer */}
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                What We Offer
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.4rem]">
                Programs under <span className="text-primary">one academy</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {PROGRAM_AREAS.map((area, i) => (
                <Reveal key={area.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                      <area.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[18px] font-extrabold tracking-tight text-foreground">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                      {area.description}
                    </p>
                    <p className="mt-3 text-[12px] font-bold uppercase tracking-wider text-primary">
                      {area.count}
                    </p>
                    <Link
                      href="/courses"
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-bold text-primary hover:underline"
                    >
                      Browse courses
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* campuses */}
        <section className="section-pad bg-[#fafafa]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                Campuses
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.4rem]">
                Two campuses, <span className="text-primary">one standard</span>
              </h2>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
              {CAMPUSES.map((campus, i) => (
                <Reveal key={campus.name} delay={i * 0.08}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
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
                        <p
                          key={line}
                          className="text-[14.5px] leading-relaxed text-muted-foreground"
                        >
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
          </div>
        </section>

        {/* founder block — smaller, links to /founder */}
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-[1.6rem] border border-border bg-[#fafafa] p-6 shadow-card sm:p-9 md:grid-cols-[220px_1fr] md:gap-10">
                <div className="relative mx-auto w-full max-w-[220px]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary ring-1 ring-border">
                    <Image
                      src={FOUNDER.photo}
                      alt="Dr. Mohsin Ali — Founder and Director of Roots Academy, PhD Physics"
                      fill
                      sizes="(max-width: 768px) 60vw, 220px"
                      className="photo object-cover"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-secondary-foreground">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {FOUNDER.role}
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                    {FOUNDER.name}
                  </h2>
                  <p className="mt-1.5 text-[15px] font-bold text-primary">
                    {FOUNDER.qualification}
                  </p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                    {FOUNDER.intro[0]}
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

        {/* CTA */}
        <section className="relative overflow-hidden bg-brand-gradient">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border-[28px] border-white/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full border-[36px] border-white/5"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                Become part of Roots Academy
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                Admissions are open — visit either campus, send an inquiry or message us on
                WhatsApp to get started.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-13 rounded-2xl bg-white px-7 text-[15px] font-bold text-primary shadow-xl hover:bg-brand-light"
                >
                  <Link href="/#admissions">
                    Admission Inquiry
                    <ArrowRight className="ml-2 h-4.5 w-4.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-2xl border-[1.5px] border-white/40 bg-transparent px-6 text-[15px] font-bold text-white hover:border-white hover:bg-white/10"
                >
                  <a href={waHref()} target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
