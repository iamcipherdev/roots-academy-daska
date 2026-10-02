import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { waHref, type Course } from "@/lib/site-data";
import { ICONS, BookOpen } from "./icons";

/**
 * Reusable course card — used on the Courses page grid.
 * Fee is rendered from `course.fee`; when null it shows the inquiry line.
 */
export function CourseCard({ course }: { course: Course }) {
  const Icon = ICONS[course.icon] ?? BookOpen;
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <span className="rounded-full bg-brand-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-deep">
          {course.category}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-foreground">
        {course.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        {course.description}
      </p>

      <p className="mt-4 text-[12.5px] font-semibold text-muted-foreground">
        {course.fee ? (
          <>
            <span className="text-foreground">Fee: </span>
            {course.fee}
          </>
        ) : (
          "Fee information available on inquiry"
        )}
      </p>

      <div className="mt-auto flex items-center gap-2 pt-5">
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-primary text-[14px] font-bold text-white transition-colors hover:bg-brand-deep"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
        </Link>
        <a
          href={waHref(
            `Assalam-o-Alaikum! I would like to ask about the fee for the "${course.name}" course at Roots Academy.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-4 text-[13.5px] font-bold text-foreground/75 transition-colors hover:border-primary/50 hover:text-primary"
        >
          Ask About Fee
        </a>
      </div>
    </article>
  );
}
