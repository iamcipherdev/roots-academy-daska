import { redirect } from "next/navigation";
import Link from "next/link";
import { getStaffSession } from "@/lib/portal/auth";
import { supabaseAdmin } from "@/lib/portal/supabase";
import { StaffHeader } from "@/components/portal/StaffHeader";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/staff/attendance", label: "Attendance", adminOnly: false },
  { href: "/staff/fees", label: "Fee", adminOnly: false },
  { href: "/staff/tests", label: "Tests", adminOnly: false },
  { href: "/staff/admin", label: "Admin", adminOnly: true },
];

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getStaffSession();
  if (!session) redirect("/staff");

  const { data: staff } = await supabaseAdmin()
    .from("staff")
    .select("name, role")
    .eq("id", session.staff_id)
    .maybeSingle();
  if (!staff) redirect("/staff");

  const role = staff.role as string;
  const tabs = TABS.filter((t) => !t.adminOnly || role === "admin");

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <StaffHeader name={staff.name as string} role={role} />
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4">
          {tabs.map((t) => (
            <TabLink key={t.href} href={t.href} label={t.label} />
          ))}
        </div>
      </nav>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}

function TabLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-bold text-muted-foreground",
        "hover:border-primary/40 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
