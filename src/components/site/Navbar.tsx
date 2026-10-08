"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, Phone } from "lucide-react";
import { NAV_LINKS, CONTACT, telHref } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active-section highlighting (homepage anchor sections only)
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_LINKS.filter((l) => l.href.startsWith("/#")).map((l) =>
      l.href.slice(2)
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return isHome && activeSection === href.slice(2);
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85"
          : "bg-white"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label="Roots Academy home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <GraduationCap className="h-5.5 w-5.5" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[17px] font-extrabold tracking-tight text-foreground">
              Roots <span className="text-primary">Academy</span>
            </span>
            <span className="block whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              of Sciences &amp; Computer College
            </span>
          </span>
        </Link>

        {/* Desktop nav (xl+: 8 links fit comfortably) */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-2.5 py-2 text-[14px] font-semibold transition-colors",
                isActive(link.href)
                  ? "text-primary"
                  : "text-foreground/70 hover:bg-secondary/60 hover:text-primary"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  aria-hidden
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(CONTACT.primaryPhone)}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-border text-primary transition-colors hover:bg-secondary xl:flex"
            aria-label={`Call ${CONTACT.primaryPhone}`}
          >
            <Phone className="h-4.5 w-4.5" aria-hidden />
          </a>

          <Button
            asChild
            className="hidden h-10 rounded-xl bg-primary px-5 text-[14.5px] font-bold shadow-sm hover:bg-brand-deep sm:inline-flex"
          >
            <Link href="/#admissions">Apply Now</Link>
          </Button>

          {/* Mobile / tablet menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-border xl:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              aria-describedby={undefined}
              className="w-[85vw] max-w-[340px] p-0"
            >
              <SheetHeader className="border-b border-border px-5 py-4 text-left">
                <SheetTitle className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                    <GraduationCap className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-base font-extrabold">
                    Roots <span className="text-primary">Academy</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors hover:bg-secondary hover:text-primary",
                        isActive(link.href)
                          ? "bg-secondary text-primary"
                          : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-3 space-y-2 border-t border-border pt-4">
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="h-12 w-full rounded-xl bg-primary text-[15px] font-bold hover:bg-brand-deep"
                    >
                      <Link href="/#admissions">Apply Now</Link>
                    </Button>
                  </SheetClose>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 w-full rounded-xl border-border text-[15px] font-bold"
                  >
                    <a href={telHref(CONTACT.primaryPhone)}>
                      <Phone className="mr-2 h-4 w-4" /> {CONTACT.primaryPhone}
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
