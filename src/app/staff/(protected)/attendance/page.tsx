"use client";

import { useEffect, useState } from "react";
import { Loader2, CircleCheck, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { todayPKT } from "@/lib/portal/dates";
import { PortalHeader } from "@/components/portal/portal-header";

interface Student { id: string; name: string; roll_no: string }
interface ClassInfo { id: string; name: string; students: Student[] }

type Status = "present" | "absent" | "late";
const NEXT: Record<Status, Status> = { present: "absent", absent: "late", late: "present" };

const chipStyles: Record<Status, string> = {
  present: "border-emerald-300 bg-emerald-50 text-emerald-900",
  absent: "border-red-300 bg-red-50 text-red-900",
  late: "border-amber-300 bg-amber-50 text-amber-900",
};
const statusLabel: Record<Status, string> = { present: "Present", absent: "Absent", late: "Late" };

export default function AttendancePage() {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState(todayPKT());
  const [marks, setMarks] = useState<Record<string, Status>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    fetch("/api/portal/classes").then(async (r) => {
      const j = await r.json();
      if (j.ok && j.classes.length > 0) {
        setClasses(j.classes);
        setClassId(j.classes[0].id);
      }
      setLoading(false);
    });
  }, []);

  const cls = classes.find((c) => c.id === classId);

  useEffect(() => {
    if (!classId) return;
    setSaved("");
    fetch(`/api/portal/attendance?class_id=${classId}&date=${date}`)
      .then(async (r) => {
        const j = await r.json();
        setMarks(j.ok ? (j.marked ?? {}) : {});
      });
  }, [classId, date]);

  const toggle = (id: string) => {
    setSaved("");
    setMarks((m) => ({ ...m, [id]: NEXT[m[id] ?? "present"] }));
  };

  const counts = { present: 0, absent: 0, late: 0 };
  for (const s of cls?.students ?? []) counts[marks[s.id] ?? "present"]++;

  const save = async () => {
    if (!cls) return;
    setSaving(true);
    setSaved("");
    try {
      const r = await fetch("/api/portal/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class_id: classId,
          date,
          items: cls.students.map((s) => ({ student_id: s.id, status: marks[s.id] ?? "present" })),
        }),
      });
      const j = await r.json();
      if (j.ok) setSaved(`${j.present} present, ${j.absent} absent${j.late ? `, ${j.late} late` : ""} — saved.`);
      else setSaved(j.error || "Could not save.");
    } catch {
      setSaved("Could not save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }
  if (classes.length === 0) {
    return <Card className="rounded-2xl"><CardContent className="py-12 text-center text-muted-foreground">No classes found. Ask an admin to add students first.</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <PortalHeader
        eyebrow="Daily routine"
        title="Attendance"
        description="Tap a student card to cycle their status: Present → Absent → Late."
      />

      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center">
          <Select value={classId} onValueChange={setClassId}>
            <SelectTrigger className="h-12 rounded-xl sm:w-56"><SelectValue placeholder="Select class" /></SelectTrigger>
            <SelectContent>
              {classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name} ({c.students.length})</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-xl sm:w-48" />
          <div className="flex gap-4 text-sm font-semibold sm:ml-auto">
            <span className="text-emerald-700">{counts.present} present</span>
            <span className="text-red-700">{counts.absent} absent</span>
            {counts.late > 0 && <span className="text-amber-700">{counts.late} late</span>}
          </div>
        </CardContent>
      </Card>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CircleCheck className="h-5 w-5 shrink-0" /> {saved}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {(cls?.students ?? []).map((s) => {
          const st = marks[s.id] ?? "present";
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={cn(
                "rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.98]",
                st === "present" && "border-emerald-200 bg-emerald-50/60",
                st === "absent" && "border-red-200 bg-red-50/60",
                st === "late" && "border-amber-200 bg-amber-50/60",
              )}
            >
              <div className="truncate text-sm font-bold">{s.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Roll {s.roll_no}</div>
              <div className={cn(
                "mt-2.5 inline-block rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wide",
                chipStyles[st]
              )}>
                {statusLabel[st]}
              </div>
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-4">
        <Button onClick={save} disabled={saving} className="h-14 w-full rounded-2xl text-base font-bold shadow-xl shadow-primary/25">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="mr-2 h-5 w-5" /> Save Attendance</>}
        </Button>
      </div>
    </div>
  );
}
