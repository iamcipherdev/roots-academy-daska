"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_COURSES } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { ICONS, BookOpen } from "./icons";
import { Button } from "@/components/ui/button";

/** Homepage course preview — 8 highlighted cards linking to /courses. */
export function CoursePreview() {
  return (
    <section id="programs" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Programs"
          title="Academic & Professional"
          highlight="Courses"
          description="From board preparation to modern technology skills, explore learning opportunities at Roots Academy."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {FEATURED_COURSES.map((course, i) => {
            const Icon = ICONS[course.icon] ?? BookOpen;
            return (
              <Reveal key={course.slug} delay={(i % 4) * 0.07}>
                <Link
                  href={`/courses/${course.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[17px] font-extrabold leading-snug tracking-tight text-foreground">
                    {course.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-bold text-primary">
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

        <Reveal delay={0.15} className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="h-13 rounded-2xl bg-primary px-8 text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-brand-deep"
          >
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-4.5 w-4.5" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
