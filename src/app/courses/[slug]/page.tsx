import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpenCheck, Users, MessageCircle } from "lucide-react";
import { COURSES, getCourse, waHref } from "@/lib/site-data";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { ICONS, BookOpen } from "@/components/site/icons";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.name} — Course Details`,
    description: `${course.description} Learn more about the ${course.name} course at Roots Academy of Sciences, Daska.`,
    alternates: { canonical: `/courses/${course.slug}` },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const Icon = ICONS[course.icon] ?? BookOpen;
  const waMessage = waHref(
    `Assalam-o-Alaikum! I would like to inquire about the "${course.name}" course at Roots Academy of Sciences, Daska. Please share fee and timing details.`
  );
  const feeMessage = waHref(
    `Assalam-o-Alaikum! I would like to ask about the fee for the "${course.name}" course at Roots Academy.`
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* course hero */}
        <section className="relative overflow-hidden bg-white pt-[72px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_90%_0%,#fce8e9_0%,transparent_60%),radial-gradient(40%_45%_at_0%_100%,#fdf0f0_0%,transparent_55%)]"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <Reveal>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All Courses
              </Link>

              <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-start md:gap-9">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25">
                  <Icon className="h-8 w-8" aria-hidden />
                </span>
                <div className="max-w-2xl">
                  <span className="rounded-full bg-brand-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-deep">
                    {course.category}
                  </span>
                  <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground md:text-[2.8rem]">
                    {course.name}
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {course.description}
                  </p>
                  {course.schedule && (
                    <p className="mt-3 text-[14px] font-bold text-foreground">
                      Schedule: <span className="text-primary">{course.schedule}</span>
                    </p>
                  )}

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-xl bg-primary px-6 text-[14.5px] font-bold shadow-lg shadow-primary/25 hover:bg-brand-deep"
                    >
                      <a href={waMessage} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4.5 w-4.5" aria-hidden />
                        Admission Inquiry
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-12 rounded-xl border-[1.5px] border-primary/25 bg-white px-6 text-[14.5px] font-bold text-foreground hover:border-primary/50 hover:bg-secondary"
                    >
                      <Link href="/#contact">Campus Contact</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* body */}
        <section className="section-pad bg-[#fafafa]">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8 lg:px-8">
            <div className="flex flex-col gap-6">
              {/* overview */}
              <Reveal>
                <article className="rounded-2xl border border-border bg-white p-7 shadow-card sm:p-9">
                  <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                    Course Overview
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {course.overview}
                  </p>

                  <h3 className="mt-8 flex items-center gap-2 text-[16px] font-extrabold text-foreground">
                    <BookOpenCheck className="h-5 w-5 text-primary" aria-hidden />
                    What students may learn
                  </h3>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {course.learn.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-[#fafafa] px-4 py-3 text-[13.5px] font-semibold text-foreground/75 ring-1 ring-border/70"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>

              {/* audience */}
              <Reveal delay={0.08}>
                <article className="rounded-2xl border border-border bg-white p-7 shadow-card sm:p-9">
                  <h3 className="flex items-center gap-2 text-[16px] font-extrabold text-foreground">
                    <Users className="h-5 w-5 text-primary" aria-hidden />
                    Who is this course for?
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {course.audience.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[14px] leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </div>

            {/* side panel: fee + inquiry */}
            <div className="flex flex-col gap-6">
              <Reveal delay={0.05}>
                <aside className="rounded-2xl border border-border bg-white p-7 shadow-card">
                  <h3 className="text-[16px] font-extrabold text-foreground">Fee Details</h3>
                  {course.fee ? (
                    <p className="mt-3 text-2xl font-extrabold tracking-tight text-primary">
                      {course.fee}
                    </p>
                  ) : (
                    <>
                      <p className="mt-3 rounded-xl bg-brand-light px-4 py-3 text-[14px] font-bold leading-relaxed text-brand-deep">
                        Fee information available on inquiry
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                        Contact us for the latest fee details and class timings.
                      </p>
                    </>
                  )}
                  <Button
                    asChild
                    className="mt-5 h-12 w-full rounded-xl bg-primary text-[14.5px] font-bold hover:bg-brand-deep"
                  >
                    <a href={feeMessage} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4.5 w-4.5" aria-hidden />
                      Ask About Fee
                    </a>
                  </Button>
                </aside>
              </Reveal>

              <Reveal delay={0.1}>
                <aside className="rounded-2xl bg-[#191919] p-7 shadow-card">
                  <h3 className="text-[16px] font-extrabold text-white">
                    Talk to the Academy
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                    Our team can help you choose the right course, share class timings and
                    answer your questions at both of our campuses.
                  </p>
                  <Button
                    asChild
                    className="mt-5 h-12 w-full rounded-xl bg-primary text-[14.5px] font-bold hover:bg-brand-deep"
                  >
                    <a href={waMessage} target="_blank" rel="noopener noreferrer">
                      WhatsApp Inquiry
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-2.5 h-12 w-full rounded-xl border-white/20 bg-transparent text-[14.5px] font-bold text-white hover:bg-white/10"
                  >
                    <Link href="/#admissions">
                      Admission Form
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        {/* other courses */}
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                Explore other <span className="text-primary">courses</span>
              </h2>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:underline"
              >
                View all courses
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {COURSES.filter((c) => c.slug !== course.slug)
                .slice(0, 8)
                .map((c, i) => {
                  const OtherIcon = ICONS[c.icon] ?? BookOpen;
                  return (
                    <Reveal key={c.slug} delay={(i % 4) * 0.06}>
                      <Link
                        href={`/courses/${c.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                          <OtherIcon className="h-5.5 w-5.5" aria-hidden />
                        </span>
                        <h3 className="mt-4 text-[15.5px] font-extrabold leading-snug tracking-tight text-foreground">
                          {c.name}
                        </h3>
                        <span className="mt-1 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                          {c.category}
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
