"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FEATURED_COURSES } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { ICONS, BookOpen } from "./icons";
import { Button } from "@/components/ui/button";

/**
 * Homepage programs — board academics (Matric / Intermediate) get featured
 * treatment as the core business; skill courses follow in a compact grid.
 */
export function CoursePreview() {
  const academic = FEATURED_COURSES.filter((c) => c.category === "Academic Programs");
  const skills = FEATURED_COURSES.filter((c) => c.category !== "Academic Programs");

  return (
    <section id="programs" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Programs"
          title="Board-first academics,"
          highlight="modern skills alongside"
          description="Matric and Intermediate coaching is the heart of Roots Academy — with professional computer and language courses under the same roof."
        />

        {/* Core academic programs */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {academic.map((course, i) => {
            const Icon = ICONS[course.icon] ?? BookOpen;
            return (
              <Reveal key={course.slug} delay={i * 0.08}>
                <Link
                  href={`/courses/${course.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-primary/15 bg-gradient-to-b from-red-50/70 to-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary p-3.5 text-white shadow-lg shadow-primary/25">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                      Core Program
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-[1.7rem]">
                    {course.name}
                  </h3>
                  <p className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {course.audience.slice(0, 3).map((a) => (
                      <li key={a} className="flex items-start gap-2 text-[13.5px] font-semibold text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-bold text-primary">
                    View Details
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Skill courses */}
        <div className="mt-10">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Professional & Skill Courses
            </p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
            {skills.map((course, i) => {
              const Icon = ICONS[course.icon] ?? BookOpen;
              return (
                <Reveal key={course.slug} delay={(i % 5) * 0.06}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5.5 w-5.5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-[15.5px] font-extrabold leading-snug tracking-tight text-foreground">
                      {course.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                      {course.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-bold text-primary">
                      Details
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="h-13 rounded-2xl bg-primary px-8 text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-brand-deep"
          >
            <Link href="/courses">
              View All 17 Courses
              <ArrowRight className="ml-2 h-4.5 w-4.5" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
