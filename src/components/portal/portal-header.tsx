import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Consistent editorial page header used across the staff + parent portals. */
export function PortalHeader({ eyebrow, title, description, action }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1.5">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {description && (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="flex flex-wrap items-center gap-2">{action}</div>}
    </div>
  );
}
