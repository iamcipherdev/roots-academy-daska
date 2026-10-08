"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Plus, Trash2, Save, CircleCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PortalHeader } from "@/components/portal/portal-header";

interface Student { id: string; name: string; roll_no: string }
interface ClassInfo { id: string; name: string; students: Student[] }
interface Subject { subject: string; total: number }
interface Exam { id: string; name: string; subjects: Subject[] }

export default function TestsPage() {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [classId, setClassId] = useState("");
  const [exams, setExams] = useState<Exam[]>([]);
  const [examId, setExamId] = useState("");
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [examName, setExamName] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([{ subject: "", total: 100 }]);
  const [creating, setCreating] = useState(false);

  const [marks, setMarks] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

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

  const loadExams = (cid: string) => {
    fetch(`/api/portal/exams?class_id=${cid}`).then(async (r) => {
      const j = await r.json();
      if (j.ok) {
        setExams(j.exams);
        setExamId(j.exams[0]?.id ?? "");
      }
    });
  };
  useEffect(() => { if (classId) { setMarks({}); setNotice(""); loadExams(classId); } }, [classId]);

  const exam = exams.find((e) => e.id === examId);
  const cls = classes.find((c) => c.id === classId);

  const setMark = (sid: string, subject: string, v: string) => {
    setMarks((m) => ({ ...m, [sid]: { ...(m[sid] ?? {}), [subject]: v.replace(/[^0-9]/g, "") } }));
    setNotice("");
  };

  const focusNext = (sid: string, currentSubject: string) => {
    if (!exam || !cls) return;
    const sIdx = cls.students.findIndex((s) => s.id === sid);
    const next = cls.students[sIdx + 1];
    if (!next) return;
    const el = inputRefs.current.get(`${next.id}:${exam.subjects[0].subject}`);
    el?.focus(); el?.select();
  };

  const createExam = async () => {
    const clean = subjects.map((s) => ({ subject: s.subject.trim(), total: s.total })).filter((s) => s.subject && s.total > 0);
    if (!examName.trim() || clean.length === 0 || !classId) return;
    setCreating(true);
    try {
      const r = await fetch("/api/portal/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_id: classId, name: examName.trim(), subjects: clean }),
      });
      const j = await r.json();
      if (j.ok) {
        setShowCreate(false); setExamName(""); setSubjects([{ subject: "", total: 100 }]);
        loadExams(classId);
        setTimeout(() => setExamId(j.exam.id), 100);
      } else setNotice(j.error || "Could not create test.");
    } catch { setNotice("Could not create test."); }
    finally { setCreating(false); }
  };

  const saveMarks = async () => {
    if (!exam || !cls) return;
    setSaving(true);
    try {
      const rows = cls.students.map((s) => ({
        student_id: s.id,
        obtained: Object.fromEntries(
          exam.subjects.map((sub) => [sub.subject, parseInt(marks[s.id]?.[sub.subject] || "0", 10) || 0])
        ),
      }));
      const r = await fetch("/api/portal/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam_id: exam.id, subjects: exam.subjects, rows }),
      });
      const j = await r.json();
      setNotice(j.ok ? `Marks saved for ${cls.students.length} students.` : (j.error || "Could not save."));
    } catch { setNotice("Could not save."); }
    finally { setSaving(false); }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <PortalHeader
        eyebrow="Assessment"
        title="Tests & Marks"
        description="Create a test, then enter marks per student. Press Enter to jump to the next student."
      />

      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-3 py-5 sm:flex-row">
          <Select value={classId} onValueChange={setClassId}>
            <SelectTrigger className="h-12 rounded-xl sm:w-52"><SelectValue placeholder="Select class" /></SelectTrigger>
            <SelectContent>{classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={examId} onValueChange={setExamId}>
            <SelectTrigger className="h-12 rounded-xl sm:flex-1"><SelectValue placeholder="Select a test" /></SelectTrigger>
            <SelectContent>{exams.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
          </Select>
          <Button variant="outline" className="h-12 rounded-xl font-bold" onClick={() => setShowCreate(true)}>
            <Plus className="mr-1 h-4 w-4" /> New Test
          </Button>
        </CardContent>
      </Card>

      {notice && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CircleCheck className="h-5 w-5 shrink-0" /> {notice}
        </div>
      )}

      {exam && cls && (
        <>
          <div className="space-y-2.5">
            {cls.students.map((s) => (
              <Card key={s.id} className="rounded-2xl border-border/60 shadow-sm">
                <CardContent className="py-4">
                  <div className="mb-2.5 text-sm font-bold">Roll {s.roll_no} · {s.name}</div>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${exam.subjects.length}, minmax(0,1fr))` }}>
                    {exam.subjects.map((sub) => (
                      <div key={sub.subject}>
                        <label className="mb-1 block truncate text-[11px] font-semibold text-muted-foreground">
                          {sub.subject} <span className="font-normal">/{sub.total}</span>
                        </label>
                        <Input
                          ref={(el) => { if (el) inputRefs.current.set(`${s.id}:${sub.subject}`, el); }}
                          value={marks[s.id]?.[sub.subject] ?? ""}
                          onChange={(e) => setMark(s.id, sub.subject, e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); focusNext(s.id, sub.subject); } }}
                          inputMode="numeric" placeholder="—"
                          className="h-12 rounded-xl text-center text-lg font-bold"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="sticky bottom-4">
            <Button onClick={saveMarks} disabled={saving} className="h-14 w-full rounded-2xl text-base font-bold shadow-xl shadow-primary/25">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="mr-2 h-5 w-5" /> Save Marks</>}
            </Button>
          </div>
        </>
      )}
      {classId && exams.length === 0 && (
        <Card className="rounded-2xl"><CardContent className="py-12 text-center text-muted-foreground">
          This class has no tests yet. Create one with “New Test”.
        </CardContent></Card>
      )}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader><DialogTitle>Create a new test</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input value={examName} onChange={(e) => setExamName(e.target.value)}
              placeholder="Test name (e.g. Weekly Test - Maths)" className="h-12 rounded-xl" />
            <div className="space-y-2">
              {subjects.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={s.subject} onChange={(e) => {
                    const c = [...subjects]; c[i] = { ...c[i], subject: e.target.value }; setSubjects(c);
                  }} placeholder="Subject" className="h-11 rounded-xl" />
                  <Input value={String(s.total)} onChange={(e) => {
                    const c = [...subjects]; c[i] = { ...c[i], total: parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0 }; setSubjects(c);
                  }} inputMode="numeric" placeholder="Total" className="h-11 w-24 rounded-xl text-center" />
                  <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setSubjects(subjects.filter((_, j) => j !== i))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setSubjects([...subjects, { subject: "", total: 100 }])}>
                <Plus className="mr-1 h-4 w-4" /> Add subject
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={createExam} disabled={creating || !examName.trim()} className="h-12 w-full rounded-xl font-bold">
                {creating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Test"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
