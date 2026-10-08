"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Wallet, Trophy, Search, Phone } from "lucide-react";

export default function ParentPortalPage() {
  const router = useRouter();
  const [rollNo, setRollNo] = useState("");
  const [touched, setTouched] = useState(false);

  const go = () => {
    const v = rollNo.trim();
    setTouched(true);
    if (!v) return;
    router.push(`/s/${encodeURIComponent(v)}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:py-16">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Search className="h-8 w-8" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Roots Academy · Daska
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Parent Portal
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Enter your child's <span className="font-semibold text-foreground">roll number</span> to
            instantly see their attendance, fee status and test results.
          </p>
        </div>

        {/* Lookup card */}
        <Card className="mt-8 rounded-3xl border-border/60 shadow-xl shadow-black/5">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <label htmlFor="roll" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Roll Number
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="roll"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && go()}
                placeholder="e.g. 12"
                inputMode="text"
                autoFocus
                className={`h-14 rounded-2xl text-center text-xl font-extrabold tracking-wide ${
                  touched && !rollNo.trim() ? "border-destructive" : ""
                }`}
              />
              <Button onClick={go} className="h-14 rounded-2xl px-8 text-base font-bold shadow-lg shadow-primary/25 sm:w-auto">
                <Search className="mr-2 h-5 w-5" /> View
              </Button>
            </div>
            {touched && !rollNo.trim() && (
              <p className="text-sm font-medium text-destructive">
                Please enter a roll number first.
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Don't know the roll number? Contact the academy —{" "}
              <a href="tel:03431298216" className="font-semibold text-primary underline underline-offset-2">
                0343-1298216
              </a>
            </p>
          </CardContent>
        </Card>

        {/* What you can see */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: CalendarDays, title: "Attendance", desc: "This month's attendance %" },
            { icon: Wallet, title: "Fees", desc: "Paid / pending status" },
            { icon: Trophy, title: "Results", desc: "Test marks & position" },
          ].map((f) => (
            <Card key={f.title} className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Phone className="h-3.5 w-3.5" />
          Facing any issue? Please contact the academy office.
        </p>
      </main>
      <Footer />
    </div>
  );
}
