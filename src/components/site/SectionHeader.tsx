"use client";

import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.6rem] md:leading-[1.15]">
        {title}{" "}
        {highlight ? <span className="text-primary">{highlight}</span> : null}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
