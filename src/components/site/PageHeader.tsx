import { Reveal } from "./Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}

/** Consistent hero band for sub-pages (Courses, Founder, About). */
export function PageHeader({ eyebrow, title, highlight, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_90%_0%,#fce8e9_0%,transparent_60%),radial-gradient(40%_45%_at_0%_100%,#fdf0f0_0%,transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-[3.2rem]">
            {title}
            {highlight ? <span className="text-primary"> {highlight}</span> : null}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
