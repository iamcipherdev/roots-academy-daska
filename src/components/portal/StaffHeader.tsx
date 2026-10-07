"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function StaffHeader({ name, role }: { name: string; role: string }) {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    router.push("/staff");
    router.refresh();
  };
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-extrabold">Roots Academy</div>
          <div className="text-[11px] text-muted-foreground">Staff Portal</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden text-sm font-medium sm:block">{name}</span>
          <Badge variant="secondary" className="capitalize">{role}</Badge>
          <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout" className="rounded-xl">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
