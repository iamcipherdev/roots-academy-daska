"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, CONTACT } from "@/lib/site-data";
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
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active-section highlighting
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
        <a href="#home" className="flex min-w-0 items-center gap-2.5" aria-label="Roots Academy home">
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
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-[14.5px] font-semibold transition-colors",
                  active === id
                    ? "text-primary"
                    : "text-foreground/70 hover:bg-secondary/60 hover:text-primary"
                )}
              >
                {link.label}
                {active === id && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" aria-hidden />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:+92${CONTACT.primaryPhone.replace(/-/g, "").slice(1)}`}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-border text-primary transition-colors hover:bg-secondary xl:flex"
            aria-label={`Call ${CONTACT.primaryPhone}`}
          >
            <Phone className="h-4.5 w-4.5" aria-hidden />
          </a>

          <Button
            asChild
            className="hidden h-10 rounded-xl bg-primary px-5 text-[14.5px] font-bold shadow-sm hover:bg-brand-deep sm:inline-flex"
          >
            <a href="#admissions">Admission Inquiry</a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-border lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[340px] p-0">
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
                    <a
                      href={link.href}
                      className="rounded-xl px-4 py-3 text-[15px] font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
                <div className="mt-3 space-y-2 border-t border-border pt-4">
                  <SheetClose asChild>
                    <Button asChild className="h-12 w-full rounded-xl bg-primary text-[15px] font-bold hover:bg-brand-deep">
                      <a href="#admissions">Admission Inquiry</a>
                    </Button>
                  </SheetClose>
                  <Button asChild variant="outline" className="h-12 w-full rounded-xl border-border text-[15px] font-bold">
                    <a href={`tel:+92${CONTACT.primaryPhone.replace(/-/g, "").slice(1)}`}>
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
