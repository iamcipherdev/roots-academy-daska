import type { Metadata } from "next";
import { COURSES, COURSE_CATEGORIES, type CourseCategory } from "@/lib/site-data";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHeader } from "@/components/site/PageHeader";
import { CourseCard } from "@/components/site/CourseCard";
import { Reveal } from "@/components/site/Reveal";
import { ICONS, BookOpen, Monitor, Languages } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { waHref } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Courses & Programs",
  description:
    "Explore academic, technology and professional learning opportunities at Roots Academy — Matric, Intermediate, computer courses, IELTS and Spoken English in Daska.",
  alternates: { canonical: "/courses" },
};

const CATEGORY_DESCRIPTIONS: Record<CourseCategory, string> = {
  "Academic Programs":
    "Structured academy coaching for school and college students, built around regular testing and board-pattern preparation.",
  "Computer & Technology":
    "Practical computer courses taught in the academy's own computer lab — from foundations to modern technology skills.",
  "Language & Communication":
    "English language programs focused on examination preparation and confident everyday communication.",
};

function catId(cat: string) {
  return cat
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Courses & Programs"
          title="Courses &"
          highlight="Programs"
          description="Explore academic, technology and professional learning opportunities at Roots Academy."
        />

        {/* category quick nav */}
        <div className="sticky top-[72px] z-30 border-b border-border/70 bg-white/95 backdrop-blur">
          <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            {COURSE_CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${catId(cat)}`}
                className="shrink-0 rounded-full bg-[#fafafa] px-4 py-2 text-[13px] font-bold text-foreground/65 ring-1 ring-border transition-colors hover:text-primary hover:ring-primary/40"
              >
                {cat}
                <span className="ml-1.5 text-[11px] font-semibold text-muted-foreground/70">
                  ({COURSES.filter((c) => c.category === cat).length})
                </span>
              </a>
            ))}
          </div>
        </div>

        {COURSE_CATEGORIES.map((cat, ci) => {
          const courses = COURSES.filter((c) => c.category === cat);
          const CatIcon = ICONS[
            cat === "Academic Programs"
              ? "BookOpen"
              : cat === "Computer & Technology"
                ? "Monitor"
                : "Languages"
          ] ?? BookOpen;
          return (
            <section
              key={cat}
              id={catId(cat)}
              className={`section-pad scroll-mt-32 ${
                ci % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
              }`}
              aria-labelledby={`${catId(cat)}-heading`}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
                    <CatIcon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {`0${ci + 1} — ${cat}`}
                  </span>
                  <h2
                    id={`${catId(cat)}-heading`}
                    className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.3rem]"
                  >
                    {cat === "Academic Programs" && (
                      <>
                        Academic <span className="text-primary">Programs</span>
                      </>
                    )}
                    {cat === "Computer & Technology" && (
                      <>
                        Computer &amp; <span className="text-primary">Technology</span>
                      </>
                    )}
                    {cat === "Language & Communication" && (
                      <>
                        Language &amp; <span className="text-primary">Communication</span>
                      </>
                    )}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {CATEGORY_DESCRIPTIONS[cat]}
                  </p>
                </Reveal>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {courses.map((course, i) => (
                    <Reveal key={course.slug} delay={(i % 3) * 0.07}>
                      <CourseCard course={course} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* fee note + CTA band */}
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
                Ready to start learning?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                Fee details, class timings and seat availability are shared on inquiry. Send
                us a message and our team will guide you to the right course.
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
                  <a
                    href={waHref(
                      "Assalam-o-Alaikum! I would like to ask about courses and fee details at Roots Academy."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ask About Fee
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
