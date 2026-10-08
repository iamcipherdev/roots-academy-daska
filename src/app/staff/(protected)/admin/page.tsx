"use client";

import { useEffect, useState } from "react";
import { Loader2, Upload, Users, UserPlus, Wallet, CircleCheck, KeyRound, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { currentMonthKey, monthLabel } from "@/lib/portal/dates";

interface Student { id: string; name: string; roll_no: string; parent_phone: string | null; fee_chip: string }
interface ClassInfo { id: string; name: string; students: Student[] }
interface StaffRow { id: string; name: string; phone: string; role: string }
interface PendingRow { student_id: string; name: string; roll_no: string; class_name: string; amount_due: number; amount_paid: number; pending: number }

const chipStyles: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
  pending: "bg-red-100 text-red-800 border-red-200",
  no_record: "bg-muted text-muted-foreground",
};
const chipLabel: Record<string, string> = { paid: "Paid", pending: "Pending", no_record: "No fee" };

export default function AdminPage() {
  const [tab, setTab] = useState("students");
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [month, setMonth] = useState(currentMonthKey());
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  // import
  const [csv, setCsv] = useState("");
  const [preview, setPreview] = useState<{ name: string; class_name: string; roll_no: string; parent_phone: string }[] | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ imported: number; skipped: number; results: { row: number; ok: boolean; error?: string }[] } | null>(null);

  // staff
  const [staff, setStaff] = useState<StaffRow[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [sName, setSName] = useState(""); const [sPhone, setSPhone] = useState("");
  const [sPin, setSPin] = useState(""); const [sRole, setSRole] = useState("teacher");
  const [adding, setAdding] = useState(false);
  const [resetFor, setResetFor] = useState<StaffRow | null>(null);
  const [newPin, setNewPin] = useState("");

  // overview
  const [pending, setPending] = useState<PendingRow[]>([]);
  const [totalPending, setTotalPending] = useState(0);
  const [delStudent, setDelStudent] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [dueClass, setDueClass] = useState("");
  const [dueAmount, setDueAmount] = useState("");

  const loadStudents = () => {
    fetch("/api/portal/admin/students").then(async (r) => {
      const j = await r.json();
      if (j.ok) { setClasses(j.classes); if (j.classes[0] && !dueClass) setDueClass(j.classes[0].id); }
      setLoading(false);
    });
  };
  const loadStaff = () => {
    fetch("/api/portal/admin/staff").then(async (r) => {
      const j = await r.json(); if (j.ok) setStaff(j.staff);
    });
  };
  const loadOverview = (m: string) => {
    fetch(`/api/portal/admin/overview?month=${m}`).then(async (r) => {
      const j = await r.json();
      if (j.ok) { setPending(j.pending); setTotalPending(j.total_pending); }
    });
  };

  useEffect(() => { loadStudents(); loadStaff(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { loadOverview(month); }, [month]);

  const parseCSV = () => {
    const lines = csv.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) { setNotice("CSV must have a header + at least 1 row."); return; }
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const idx = (n: string) => header.indexOf(n);
    if (idx("name") < 0 || idx("roll_no") < 0) { setNotice("Header must contain name, class_name, roll_no, parent_phone."); return; }
    const rows = lines.slice(1).map((l) => {
      const c = l.split(",").map((x) => x.trim());
      return { name: c[idx("name")] ?? "", class_name: c[idx("class_name")] ?? "", roll_no: c[idx("roll_no")] ?? "", parent_phone: c[idx("parent_phone")] ?? "" };
    });
    setPreview(rows); setImportResult(null); setNotice("");
  };

  const doImport = async () => {
    if (!preview) return;
    setImporting(true);
    try {
      const r = await fetch("/api/portal/admin/import", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: preview }),
      });
      const j = await r.json();
      if (j.ok) { setImportResult(j); setPreview(null); setCsv(""); loadStudents(); }
      else setNotice(j.error || "Import failed.");
    } catch { setNotice("Import failed."); }
    finally { setImporting(false); }
  };

  const deleteStudent = async () => {
    if (!delStudent) return;
    setDeleting(true);
    try {
      const r = await fetch(`/api/portal/admin/students?id=${encodeURIComponent(delStudent.id)}`, { method: "DELETE" });
      const j = await r.json();
      if (j.ok) {
        setNotice(`${delStudent.name} has been deleted.`);
        setDelStudent(null); loadStudents();
      } else setNotice(j.error || "Could not delete.");
    } catch { setNotice("Could not delete."); }
    finally { setDeleting(false); }
  };

  const addStaff = async () => {
    setAdding(true);
    try {
      const r = await fetch("/api/portal/admin/staff", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: sName.trim(), phone: sPhone.trim(), pin: sPin.trim(), role: sRole }),
      });
      const j = await r.json();
      if (j.ok) { setShowAdd(false); setSName(""); setSPhone(""); setSPin(""); loadStaff(); setNotice(`${j.staff.name} has been added.`); }
      else setNotice(j.error || "Could not add.");
    } catch { setNotice("Could not add."); }
    finally { setAdding(false); }
  };

  const resetPin = async () => {
    if (!resetFor || newPin.trim().length < 4 || newPin.trim().length > 32) return;
    const r = await fetch(`/api/portal/admin/staff/${resetFor.id}/reset-pin`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: newPin }),
    });
    const j = await r.json();
    if (j.ok) { setNotice(`New password for ${resetFor.name}: ${newPin} (shown only once)`); setResetFor(null); setNewPin(""); }
    else setNotice(j.error || "Could not reset password.");
  };

  const setDues = async () => {
    const amt = parseInt(dueAmount, 10);
    if (!dueClass || !amt || amt < 0) return;
    const r = await fetch("/api/portal/admin/fee-due", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ class_id: dueClass, month, amount_due: amt }),
    });
    const j = await r.json();
    if (j.ok) { setNotice(`Fee of Rs ${amt} set for ${j.updated} students (${monthLabel(month)}).`); loadOverview(month); loadStudents(); }
    else setNotice(j.error || "Could not set fee.");
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-5">
      {notice && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CircleCheck className="h-5 w-5 shrink-0" /> {notice}
        </div>
      )}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-4 rounded-xl">
          <TabsTrigger value="students" className="rounded-lg"><Users className="mr-1 h-4 w-4" />Students</TabsTrigger>
          <TabsTrigger value="import" className="rounded-lg"><Upload className="mr-1 h-4 w-4" />Import</TabsTrigger>
          <TabsTrigger value="staff" className="rounded-lg"><UserPlus className="mr-1 h-4 w-4" />Staff</TabsTrigger>
          <TabsTrigger value="fees" className="rounded-lg"><Wallet className="mr-1 h-4 w-4" />Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AddStudentCard classes={classes} onDone={loadStudents} />
            <AddClassCard onDone={loadStudents} />
          </div>
          {classes.map((c) => (
            <Card key={c.id} className="rounded-2xl">
              <CardHeader className="pb-2"><CardTitle className="text-base">{c.name} <span className="text-sm font-normal text-muted-foreground">({c.students.length})</span></CardTitle></CardHeader>
              <CardContent className="space-y-1.5">
                {c.students.map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                    <span className="min-w-0 flex-1 truncate font-medium">Roll {s.roll_no} · {s.name}</span>
                    <Badge className={`border ${chipStyles[s.fee_chip]}`}>{chipLabel[s.fee_chip]}</Badge>
                    <Button size="icon" variant="ghost" title="Delete student"
                      className="h-8 w-8 shrink-0 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setDelStudent(s)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {c.students.length === 0 && <p className="text-sm text-muted-foreground">No students yet.</p>}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="import" className="mt-5">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle className="text-base">CSV Import</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground">Columns: <code className="rounded bg-muted px-1">name,class_name,roll_no,parent_phone</code> — preview first, then confirm.</p>
              <Textarea value={csv} onChange={(e) => setCsv(e.target.value)} rows={6}
                placeholder={"name,class_name,roll_no,parent_phone\nAhmed Raza,8-A,1,03001234567"} className="rounded-xl font-mono text-xs" />
              <Button onClick={parseCSV} variant="outline" className="rounded-xl font-bold">Preview</Button>

              {preview && (
                <div className="space-y-3">
                  <div className="max-h-64 overflow-auto rounded-xl border">
                    <table className="w-full text-xs">
                      <thead><tr className="bg-muted text-left"><th className="p-2">Name</th><th className="p-2">Class</th><th className="p-2">Roll</th><th className="p-2">Phone</th></tr></thead>
                      <tbody>{preview.map((r, i) => (
                        <tr key={i} className="border-t"><td className="p-2">{r.name}</td><td className="p-2">{r.class_name}</td><td className="p-2">{r.roll_no}</td><td className="p-2">{r.parent_phone}</td></tr>
                      ))}</tbody>
                    </table>
                  </div>
                  <Button onClick={doImport} disabled={importing} className="h-12 w-full rounded-xl font-bold">
                    {importing ? <Loader2 className="h-5 w-5 animate-spin" /> : `Import ${preview.length} Students`}
                  </Button>
                </div>
              )}

              {importResult && (
                <div className="rounded-xl border p-4 text-sm">
                  <div className="font-bold text-emerald-700">{importResult.imported} import ho gaye, {importResult.skipped} skip hue.</div>
                  <div className="mt-2 max-h-48 space-y-1 overflow-auto">
                    {importResult.results.filter((r) => !r.ok).map((r) => (
                      <div key={r.row} className="text-red-700">Row {r.row}: {r.error}</div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="mt-5 space-y-3">
          <Button onClick={() => setShowAdd(true)} className="rounded-xl font-bold"><UserPlus className="mr-2 h-4 w-4" /> Add Teacher</Button>
          {staff.map((s) => (
            <Card key={s.id} className="rounded-2xl">
              <CardContent className="flex items-center gap-3 py-3">
                <div className="flex-1"><div className="text-sm font-bold">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.phone}</div></div>
                <Badge variant="secondary" className="capitalize">{s.role}</Badge>
                <Button size="sm" variant="outline" className="rounded-xl" onClick={() => { setResetFor(s); setNewPin(""); }}>
                  <KeyRound className="mr-1 h-3 w-3" /> PIN Reset
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="fees" className="mt-5 space-y-4">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-base">Set Monthly Fee</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row">
              <Select value={dueClass} onValueChange={setDueClass}>
                <SelectTrigger className="h-12 rounded-xl sm:w-48"><SelectValue placeholder="Class" /></SelectTrigger>
                <SelectContent>{classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
              <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="h-12 rounded-xl sm:w-44" />
              <Input value={dueAmount} onChange={(e) => setDueAmount(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Amount (Rs)" inputMode="numeric" className="h-12 rounded-xl sm:w-44" />
              <Button onClick={setDues} className="h-12 rounded-xl font-bold">Set Fee</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-2 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Unpaid Fees — {monthLabel(month)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 rounded-xl bg-red-50 p-4 text-center">
                <div className="text-3xl font-extrabold text-red-800">Rs {totalPending.toLocaleString()}</div>
                <div className="text-xs text-red-700">total pending ({pending.length} students)</div>
              </div>
              <div className="space-y-1.5">
                {pending.map((p) => (
                  <div key={p.student_id} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                    <span className="font-medium">{p.name} <span className="text-muted-foreground">· {p.class_name} · Roll {p.roll_no}</span></span>
                    <span className="font-extrabold text-red-700">Rs {p.pending.toLocaleString()}</span>
                  </div>
                ))}
                {pending.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">Sab ne fee de di hai. 🎉</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="rounded-2xl sm:max-w-sm">
          <DialogHeader><DialogTitle>Add Teacher</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input value={sName} onChange={(e) => setSName(e.target.value)} placeholder="Name" className="h-12 rounded-xl" />
            <Input value={sPhone} onChange={(e) => setSPhone(e.target.value)} placeholder="Phone (03XXXXXXXXX)" inputMode="tel" className="h-12 rounded-xl" />
            <Input value={sPin} onChange={(e) => setSPin(e.target.value)} placeholder="Password (min 4 characters)" type="password" className="h-12 rounded-xl" />
            <Select value={sRole} onValueChange={setSRole}>
              <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="teacher">Teacher</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent>
            </Select>
            <DialogFooter>
              <Button onClick={addStaff} disabled={adding} className="h-12 w-full rounded-xl font-bold">
                {adding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Add"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!delStudent} onOpenChange={(o) => !o && setDelStudent(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete student?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-bold text-foreground">{delStudent?.name}</span> (Roll {delStudent?.roll_no}) ka
              their attendance, fee and result records will be <span className="font-bold text-destructive">permanently deleted</span>.
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteStudent} disabled={deleting}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!resetFor} onOpenChange={(o) => !o && setResetFor(null)}>
        <DialogContent className="rounded-2xl sm:max-w-sm">
          <DialogHeader><DialogTitle>Reset Password — {resetFor?.name}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input value={newPin} onChange={(e) => setNewPin(e.target.value)}
              placeholder="New password (min 4 characters)" type="password" className="h-12 rounded-xl" />
            <p className="text-xs text-muted-foreground">The new password is shown only once — share it with the teacher right away.</p>
            <DialogFooter>
              <Button onClick={resetPin} disabled={newPin.trim().length < 4 || newPin.trim().length > 32} className="h-12 w-full rounded-xl font-bold">Set Password</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddStudentCard({ classes, onDone }: { classes: ClassInfo[]; onDone: () => void }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async () => {
    const n = name.trim();
    if (!n || !className || !rollNo.trim()) {
      setMsg({ ok: false, text: "Name, class and roll number are required." });
      return;
    }
    setSaving(true); setMsg(null);
    try {
      const r = await fetch("/api/portal/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: [{ name: n, class_name: className, roll_no: rollNo.trim(), parent_phone: phone.trim() || null }] }),
      });
      const j = await r.json();
      const first = j?.results?.[0];
      if (j.ok && first?.ok) {
        setMsg({ ok: true, text: `${n} added.` });
        setName(""); setRollNo(""); setPhone(""); onDone();
      } else {
        setMsg({ ok: false, text: first?.error || j.error || "Could not add." });
      }
    } catch {
      setMsg({ ok: false, text: "Could not add." });
    } finally { setSaving(false); }
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2"><CardTitle className="text-base">Naya Student</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" className="h-12 rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          <Select value={className} onValueChange={setClassName}>
            <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Class" /></SelectTrigger>
            <SelectContent>
              {classes.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll no" className="h-12 rounded-xl" />
        </div>
        <Input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ""))} placeholder="Parent phone (optional)" inputMode="tel" className="h-12 rounded-xl" />
        {msg && (
          <p className={`text-sm font-semibold ${msg.ok ? "text-emerald-700" : "text-red-700"}`}>{msg.text}</p>
        )}
        <Button onClick={submit} disabled={saving} className="h-12 w-full rounded-xl font-bold">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Add Student"}
        </Button>
      </CardContent>
    </Card>
  );
}

function AddClassCard({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async () => {
    const n = name.trim();
    if (!n) { setMsg({ ok: false, text: "Enter the class name." }); return; }
    setSaving(true); setMsg(null);
    try {
      const r = await fetch("/api/portal/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n }),
      });
      const j = await r.json();
      if (j.ok) {
        setMsg({ ok: true, text: `Class "${n}" added.` });
        setName(""); onDone();
      } else {
        setMsg({ ok: false, text: j.error || "Could not add." });
      }
    } catch {
      setMsg({ ok: false, text: "Could not add." });
    } finally { setSaving(false); }
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2"><CardTitle className="text-base">Nayi Class</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="e.g. 9-B" className="h-12 rounded-xl" maxLength={60} />
        {msg && (
          <p className={`text-sm font-semibold ${msg.ok ? "text-emerald-700" : "text-red-700"}`}>{msg.text}</p>
        )}
        <Button onClick={submit} disabled={saving} variant="outline" className="h-12 w-full rounded-xl font-bold">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Add Class"}
        </Button>
        <p className="text-xs text-muted-foreground">To add many students at once, use CSV Import below.</p>
      </CardContent>
    </Card>
  );
}
