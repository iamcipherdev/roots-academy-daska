import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, BadgeCheck, Quote, ArrowRight } from "lucide-react";
import { FOUNDER, waHref } from "@/lib/site-data";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ICONS, BookOpen } from "@/components/site/icons";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: {
    absolute: "Dr. Mohsin Ali | Founder — Roots Academy",
  },
  description:
    "Dr. Mohsin Ali (PhD Physics), Founder and Director of Roots Academy of Sciences & Computer College, Daska — dedicated to building strong academic foundations and focused learning.",
  alternates: { canonical: "/founder" },
};

export default function FounderPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* hero */}
        <PageHeader
          eyebrow="Founder & Director"
          title="Dr. Mohsin"
          highlight="Ali"
          description={FOUNDER.supportingLine}
        />

        <section className="bg-white pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="grid items-center gap-10 rounded-[1.6rem] border border-border bg-white p-6 shadow-card sm:p-9 lg:grid-cols-[360px_1fr] lg:gap-12">
                {/* portrait */}
                <div className="relative mx-auto w-full max-w-[340px]">
                  <div
                    aria-hidden
                    className="absolute -inset-3 rounded-[1.9rem] bg-brand-gradient-soft"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-secondary ring-1 ring-border">
                    <Image
                      src={FOUNDER.photo}
                      alt="Dr. Mohsin Ali — Founder and Director of Roots Academy of Sciences & Computer College, Daska"
                      fill
                      sizes="(max-width: 1024px) 80vw, 360px"
                      className="photo object-cover"
                      priority
                    />
                  </div>
                  <p className="mt-4 text-center text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {FOUNDER.name} — {FOUNDER.qualification}
                  </p>
                </div>

                {/* identity + intro */}
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-secondary-foreground">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {FOUNDER.role}
                  </span>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                    {FOUNDER.name}
                  </h2>
                  <p className="mt-2 flex items-center gap-2 text-[15px] font-bold text-primary">
                    <GraduationCap className="h-4.5 w-4.5" aria-hidden />
                    {FOUNDER.qualification}
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                    {FOUNDER.intro[0]}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {FOUNDER.intro[1]}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="h-12 rounded-xl bg-primary px-6 text-[14.5px] font-bold shadow-sm hover:bg-brand-deep"
                    >
                      <Link href="/courses">
                        Explore Courses
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-xl border-[1.5px] border-primary/25 bg-white px-6 text-[14.5px] font-bold text-foreground hover:border-primary/50 hover:bg-secondary"
                    >
                      <Link href="/#admissions">Admission Inquiry</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* vision */}
        <section className="section-pad bg-[#fafafa]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  Founder&apos;s Vision
                </span>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.5rem]">
                  {FOUNDER.vision.title.split(" for ")[0]} for{" "}
                  <span className="text-primary">Better Learning</span>
                </h2>
                {FOUNDER.vision.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>

            {/* philosophy cards */}
            <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {FOUNDER.philosophy.map((card, i) => {
                const Icon = ICONS[card.icon] ?? BookOpen;
                return (
                  <Reveal key={card.title} delay={(i % 4) * 0.07}>
                    <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <h3 className="mt-5 text-[17px] font-extrabold tracking-tight text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* founder message — visually distinct */}
        <section className="section-pad relative overflow-hidden bg-[#191919]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_100%_0%,rgba(193,18,31,0.22)_0%,transparent_60%),radial-gradient(40%_30%_at_0%_100%,rgba(193,18,31,0.16)_0%,transparent_55%)]"
          />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-12">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                  <Quote className="h-7 w-7" aria-hidden />
                </span>
                <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                  {FOUNDER.message.heading}
                </h2>
                {FOUNDER.message.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-5 text-[15.5px] leading-relaxed text-white/75 md:text-base">
                    {p}
                  </p>
                ))}
                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <span className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-secondary ring-2 ring-primary/40">
                    <Image
                      src={FOUNDER.photo}
                      alt=""
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <div>
                    <p className="text-[15px] font-extrabold text-white">{FOUNDER.name}</p>
                    <p className="text-[13px] font-semibold text-white/55">
                      {FOUNDER.message.attribution.split("— ")[1]}
                    </p>
                    <p className="text-[12.5px] font-semibold text-primary">
                      {FOUNDER.qualification}
                    </p>
                  </div>
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
                Explore Roots Academy
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                Discover the courses, faculty and campuses working together to build strong
                foundations for every student.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-13 rounded-2xl bg-white px-7 text-[15px] font-bold text-primary shadow-xl hover:bg-brand-light"
                >
                  <Link href="/courses">
                    View Courses
                    <ArrowRight className="ml-2 h-4.5 w-4.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-2xl border-[1.5px] border-white/40 bg-transparent px-6 text-[15px] font-bold text-white hover:border-white hover:bg-white/10"
                >
                  <Link href="/#admissions">Admission Inquiry</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-2xl border-[1.5px] border-white/40 bg-transparent px-6 text-[15px] font-bold text-white hover:border-white hover:bg-white/10"
                >
                  <a
                    href={waHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Academy
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
