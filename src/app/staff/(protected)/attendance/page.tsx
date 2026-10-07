"use client";

import { useEffect, useState } from "react";
import { Loader2, CircleCheck, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { todayPKT } from "@/lib/portal/dates";

interface Student { id: string; name: string; roll_no: string }
interface ClassInfo { id: string; name: string; students: Student[] }

type Status = "present" | "absent" | "late";
const NEXT: Record<Status, Status> = { present: "absent", absent: "late", late: "present" };

const chipStyles: Record<Status, string> = {
  present: "border-emerald-300 bg-emerald-50 text-emerald-900",
  absent: "border-red-300 bg-red-50 text-red-900",
  late: "border-amber-300 bg-amber-50 text-amber-900",
};
const statusLabel: Record<Status, string> = { present: "Hazir", absent: "Ghair", late: "Late" };

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
      if (j.ok) setSaved(`${j.present} hazir, ${j.absent} ghair-hazir${j.late ? `, ${j.late} late` : ""} — save ho gaya.`);
      else setSaved(j.error || "Save nahi ho saka.");
    } catch {
      setSaved("Save nahi ho saka.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }
  if (classes.length === 0) {
    return <Card className="rounded-2xl"><CardContent className="py-12 text-center text-muted-foreground">Koi class nahi mili. Pehle admin se students import karwaein.</CardContent></Card>;
  }

  return (
    <div className="space-y-5">
      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Aaj ki Hazri</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={classId} onValueChange={setClassId}>
            <SelectTrigger className="h-12 rounded-xl sm:w-56"><SelectValue placeholder="Class" /></SelectTrigger>
            <SelectContent>
              {classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name} ({c.students.length})</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-xl sm:w-48" />
          <div className="flex gap-3 text-sm font-semibold sm:ml-auto">
            <span className="text-emerald-700">{counts.present} hazir</span>
            <span className="text-red-700">{counts.absent} ghair</span>
            {counts.late > 0 && <span className="text-amber-700">{counts.late} late</span>}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {(cls?.students ?? []).map((s) => {
          const st = marks[s.id] ?? "present";
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={cn(
                "min-h-[64px] rounded-xl border-2 p-3 text-left transition-all active:scale-[0.97]",
                chipStyles[st]
              )}
            >
              <div className="text-xs font-bold opacity-70">Roll {s.roll_no}</div>
              <div className="truncate text-sm font-bold">{s.name}</div>
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide">{statusLabel[st]}</div>
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground">Tap karein: Hazir → Ghair-hazir → Late. Sab pehle se hazir hain.</p>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CircleCheck className="h-5 w-5 shrink-0" /> {saved}
        </div>
      )}

      <div className="sticky bottom-4">
        <Button onClick={save} disabled={saving} className="h-14 w-full rounded-2xl text-base font-bold shadow-xl shadow-primary/25">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="mr-2 h-5 w-5" /> Hazri Save Karein</>}
        </Button>
      </div>
    </div>
  );
}
