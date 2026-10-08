"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageCircle, Plus, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { currentMonthKey, monthLabel, toIntlPhone } from "@/lib/portal/dates";
import { PortalHeader } from "@/components/portal/portal-header";

interface FeeRow {
  student_id: string; name: string; roll_no: string; parent_phone: string | null;
  amount_due: number; amount_paid: number; pending: number; has_record: boolean;
}
interface ClassInfo { id: string; name: string; students: { id: string }[] }

export default function FeesPage() {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [classId, setClassId] = useState("");
  const [month, setMonth] = useState(currentMonthKey());
  const [list, setList] = useState<FeeRow[]>([]);
  const [totalPending, setTotalPending] = useState(0);
  const [academyName, setAcademyName] = useState("Roots Academy");
  const [loading, setLoading] = useState(true);
  const [payFor, setPayFor] = useState<FeeRow | null>(null);
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

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

  const load = () => {
    if (!classId) return;
    fetch(`/api/portal/fees?class_id=${classId}&month=${month}`).then(async (r) => {
      const j = await r.json();
      if (j.ok) {
        setList(j.list);
        setTotalPending(j.total_pending);
        setAcademyName(j.academy_name);
      }
    });
  };
  useEffect(load, [classId, month]); // eslint-disable-line react-hooks/exhaustive-deps

  const recordPayment = async () => {
    if (!payFor) return;
    const amt = parseInt(amount, 10);
    if (!amt || amt <= 0) return;
    setSaving(true);
    try {
      const r = await fetch("/api/portal/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: payFor.student_id, month, amount: amt }),
      });
      const j = await r.json();
      if (j.ok) {
        setNotice(`${payFor.name} — Rs ${amt} received. Remaining: Rs ${j.pending}.`);
        setPayFor(null); setAmount(""); load();
      } else setNotice(j.error || "Could not save.");
    } catch { setNotice("Could not save."); }
    finally { setSaving(false); }
  };

  const remindLink = (row: FeeRow) => {
    const intl = toIntlPhone(row.parent_phone);
    if (!intl) return null;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const msg =
      `Assalam-o-Alaikum! ${row.name} (Roll ${row.roll_no}) has a pending fee of ` +
      `Rs ${row.pending} for ${monthLabel(month)}. Details: ${appUrl}/s/${encodeURIComponent(row.roll_no)} — ${academyName}`;
    return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
  };

  const pendingCount = list.filter((r) => r.has_record && r.pending > 0 && toIntlPhone(r.parent_phone)).length;

  const remindAll = () => {
    const targets = list.filter((r) => r.has_record && r.pending > 0 && toIntlPhone(r.parent_phone));
    if (targets.length === 0) return;
    if (!window.confirm(`Open WhatsApp reminders for ${targets.length} parents? If the browser blocks popups, click "Allow".`)) return;
    targets.forEach((row, i) => {
      const link = remindLink(row);
      if (link) setTimeout(() => window.open(link, "_blank", "noopener"), i * 800);
    });
    setNotice(`${targets.length} reminders opened — press Send in each chat.`);
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <PortalHeader
        eyebrow="Finance"
        title="Fee Collection"
        description={`Collect payments and send WhatsApp reminders for ${monthLabel(month)}.`}
      />

      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center">
          <Select value={classId} onValueChange={setClassId}>
            <SelectTrigger className="h-12 rounded-xl sm:w-56"><SelectValue placeholder="Select class" /></SelectTrigger>
            <SelectContent>
              {classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="h-12 rounded-xl sm:w-48" />
          <div className="flex items-center gap-2 sm:ml-auto">
            <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-800">
              Total pending: Rs {totalPending.toLocaleString()}
            </div>
            {pendingCount > 0 && (
              <Button onClick={remindAll} variant="outline" className="h-12 rounded-xl font-bold">
                <MessageCircle className="mr-2 h-4 w-4" /> Remind All ({pendingCount})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {notice && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CircleCheck className="h-5 w-5 shrink-0" /> {notice}
        </div>
      )}

      <div className="space-y-2.5">
        {list.map((row) => (
          <Card key={row.student_id} className="rounded-2xl border-border/60 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold">{row.name} <span className="font-normal text-muted-foreground">· Roll {row.roll_no}</span></div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {row.has_record ? <>Rs {row.amount_paid.toLocaleString()} paid / Rs {row.amount_due.toLocaleString()}</> : "Fee not set for this student"}
                </div>
              </div>
              {row.has_record && row.pending <= 0 ? (
                <Badge className="border border-emerald-200 bg-emerald-100 text-emerald-800">Paid</Badge>
              ) : row.has_record ? (
                <span className="text-sm font-extrabold text-red-700">Rs {row.pending.toLocaleString()}</span>
              ) : null}
              <div className="flex shrink-0 gap-2">
                {row.has_record && row.pending > 0 && (() => {
                  const link = remindLink(row);
                  return link ? (
                    <Button size="sm" variant="outline" className="rounded-xl" asChild>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-1 h-4 w-4" /> Remind
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled className="rounded-xl" title="No parent number on file">
                      <MessageCircle className="mr-1 h-4 w-4" /> Remind
                    </Button>
                  );
                })()}
                <Button size="sm" className="rounded-xl" onClick={() => { setPayFor(row); setAmount(""); setNotice(""); }}>
                  <Plus className="mr-1 h-4 w-4" /> Collect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {list.length === 0 && (
          <Card className="rounded-2xl"><CardContent className="py-12 text-center text-muted-foreground">No students in this class.</CardContent></Card>
        )}
      </div>

      <Dialog open={!!payFor} onOpenChange={(o) => !o && setPayFor(null)}>
        <DialogContent className="rounded-2xl sm:max-w-sm">
          <DialogHeader><DialogTitle>Collect fee</DialogTitle></DialogHeader>
          {payFor && (
            <div className="space-y-4">
              <p className="text-sm"><span className="font-bold">{payFor.name}</span> <span className="text-muted-foreground">(Roll {payFor.roll_no})</span>
                <span className="block text-xs">Remaining: Rs {payFor.pending.toLocaleString()} / Rs {payFor.amount_due.toLocaleString()}</span></p>
              <Input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Amount received (Rs)" inputMode="numeric" className="h-14 rounded-xl text-center text-2xl font-extrabold" autoFocus />
              <DialogFooter>
                <Button onClick={recordPayment} disabled={saving || !parseInt(amount, 10)} className="h-12 w-full rounded-xl font-bold">
                  {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : `Collect Rs ${amount || 0}`}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
