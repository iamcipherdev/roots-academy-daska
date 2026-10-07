"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function StaffLoginPage() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/portal/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, pin }),
      });
      const j = await r.json();
      if (j.ok) {
        router.push(j.staff?.role === "admin" ? "/staff/admin" : "/staff/attendance");
        router.refresh();
      } else {
        setError(j.error || "Login nahi ho saka.");
      }
    } catch {
      setError("Login nahi ho saka. Dobara try karein.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm rounded-2xl border-2">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">Staff Login</CardTitle>
          <CardDescription>Roots Academy · Staff Portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number (03XXXXXXXXX)"
              inputMode="tel" className="h-12 rounded-xl pl-10"
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={pin} onChange={(e) => setPin(e.target.value)}
              placeholder="PIN" type="password" inputMode="numeric"
              className="h-12 rounded-xl pl-10 text-center text-xl tracking-[0.5em]"
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>
          {error && <p className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-700">{error}</p>}
          <Button onClick={submit} disabled={busy || !phone.trim() || !pin.trim()} className="h-12 w-full rounded-xl text-base font-bold">
            {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
