"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Homepage section: parent roll-number lookup. Matches site brand. */
export function ParentPortalCTA() {
  const [rollNo, setRollNo] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const go = () => {
    const v = rollNo.trim();
    if (!v) return;
    setBusy(true);
    router.push(`/s/${encodeURIComponent(v)}`);
  };

  return (
    <section id="parent-portal" className="bg-accent/60 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Parent Portal
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Apne bache ki <span className="font-semibold text-foreground">attendance</span>,{" "}
          <span className="font-semibold text-foreground">fee</span> aur{" "}
          <span className="font-semibold text-foreground">test results</span> — sirf roll number se.
          <span className="block text-sm">No login. No app. Sirf roll number likhein.</span>
        </p>
        <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && go()}
            placeholder="Roll number likhein…"
            inputMode="numeric"
            className="h-14 rounded-xl border-2 bg-white text-center text-xl font-bold tracking-widest sm:text-left"
            aria-label="Roll number"
          />
          <Button
            onClick={go}
            disabled={busy || !rollNo.trim()}
            className="h-14 shrink-0 rounded-xl px-8 text-base font-bold"
          >
            {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            Dekho
          </Button>
        </div>
      </div>
    </section>
  );
}
