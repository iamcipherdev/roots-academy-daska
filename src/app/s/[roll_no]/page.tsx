"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download, CircleCheck, CircleAlert, CalendarDays, Wallet, Trophy,
  User, Loader2, SearchX,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { monthLabel } from "@/lib/portal/dates";

interface SubjectMark { subject: string; obtained: number; total: number }
interface ExamResult {
  exam_id: string; name: string; subjects: SubjectMark[];
  total_obtained: number; total_max: number; percent: number;
  grade: string; position: number | null; students_count: number;
}
interface DashboardData {
  student: { name: string; roll_no: string; class_name: string; academy_name: string };
  attendance: {
    month: string; percent: number; present: number; absent: number; late: number;
    recent: { date: string; status: string }[];
  };
  fees: {
    current: { status: string; month: string; amount_due?: number; amount_paid?: number; pending?: number };
    history: { month: string; amount_due: number; amount_paid: number; pending: number }[];
  };
  results: ExamResult[];
}

const gradeStyles: Record<string, string> = {
  "A+": "bg-emerald-100 text-emerald-800 border-emerald-200",
  A: "bg-emerald-100 text-emerald-800 border-emerald-200",
  B: "bg-sky-100 text-sky-800 border-sky-200",
  C: "bg-amber-100 text-amber-800 border-amber-200",
  D: "bg-orange-100 text-orange-800 border-orange-200",
  F: "bg-red-100 text-red-800 border-red-200",
};

const statusDot: Record<string, string> = {
  present: "bg-emerald-500",
  absent: "bg-red-500",
  late: "bg-amber-500",
};

const statusLabel: Record<string, string> = {
  present: "Hazir",
  absent: "Ghair-hazir",
  late: "Late",
};

export default function ParentDashboardPage() {
  const params = useParams();
  const rollNo = decodeURIComponent(String(params.roll_no ?? ""));
  const [data, setData] = useState<DashboardData | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "notfound" | "error">("loading");

  useEffect(() => {
    fetch(`/api/portal/parent/${encodeURIComponent(rollNo)}`)
      .then(async (r) => {
        if (r.status === 404) { setState("notfound"); return; }
        const j = await r.json();
        if (j.ok) { setData(j); setState("ready"); }
        else setState("error");
      })
      .catch(() => setState("error"));
  }, [rollNo]);

  const downloadPDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    const s = data.student;
    let y = 18;
    doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text(s.academy_name, 14, y); y += 8;
    doc.setFontSize(11); doc.setFont("helvetica", "normal");
    doc.text("Student Report Card", 14, y); y += 10;
    doc.setFontSize(10);
    doc.text(`Name: ${s.name}`, 14, y); y += 6;
    doc.text(`Roll No: ${s.roll_no}    Class: ${s.class_name}`, 14, y); y += 10;

    const a = data.attendance;
    doc.setFont("helvetica", "bold"); doc.text("Attendance (this month)", 14, y); y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`${a.percent}% — ${a.present} hazir, ${a.absent} ghair-hazir, ${a.late} late`, 14, y); y += 10;

    const f = data.fees.current;
    doc.setFont("helvetica", "bold"); doc.text("Fee", 14, y); y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(
      f.status === "paid" ? `${monthLabel(f.month)}: Paid` :
      f.status === "pending" ? `${monthLabel(f.month)}: Rs ${f.pending} pending` : "No record",
      14, y
    ); y += 10;

    doc.setFont("helvetica", "bold"); doc.text("Results", 14, y); y += 6;
    doc.setFont("helvetica", "normal");
    for (const ex of data.results) {
      if (y > 265) { doc.addPage(); y = 18; }
      doc.setFont("helvetica", "bold");
      doc.text(`${ex.name} — ${ex.percent}% (${ex.grade})${ex.position ? `, Position ${ex.position}` : ""}`, 14, y); y += 6;
      doc.setFont("helvetica", "normal");
      for (const sub of ex.subjects) {
        doc.text(`  ${sub.subject}: ${sub.obtained}/${sub.total}`, 14, y); y += 5;
      }
      y += 3;
    }
    doc.save(`report-card-${s.roll_no}.pdf`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-10">
        {state === "loading" && (
          <div className="space-y-4">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        )}

        {state === "notfound" && (
          <Card className="rounded-2xl text-center">
            <CardContent className="py-14">
              <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
              <h1 className="mt-4 text-xl font-bold">Ye roll number nahi mila</h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Roll number <span className="font-bold text-foreground">“{rollNo}”</span> ka koi record nahi hai.
                Apna roll number dobara check karein ya academy se rabta karein.
              </p>
              <Button className="mt-6" onClick={() => (window.location.href = "/#parent-portal")}>
                Dobara try karein
              </Button>
            </CardContent>
          </Card>
        )}

        {state === "error" && (
          <Card className="rounded-2xl text-center">
            <CardContent className="py-14">
              <CircleAlert className="mx-auto h-12 w-12 text-destructive" />
              <h1 className="mt-4 text-xl font-bold">Kuch ghalat ho gaya</h1>
              <p className="mt-2 text-sm text-muted-foreground">Dobara try karein ya academy se rabta karein.</p>
            </CardContent>
          </Card>
        )}

        {state === "ready" && data && (
          <div className="space-y-5">
            {/* Header */}
            <Card className="overflow-hidden rounded-2xl border-2">
              <div className="bg-primary px-6 py-6 text-primary-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">{data.student.name}</h1>
                    <p className="text-sm text-white/85">
                      Roll {data.student.roll_no} · Class {data.student.class_name}
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
                <p className="text-xs text-muted-foreground">{data.student.academy_name}</p>
                <Button variant="outline" size="sm" onClick={downloadPDF} className="rounded-xl">
                  <Download className="mr-2 h-4 w-4" /> Report Card (PDF)
                </Button>
              </CardContent>
            </Card>

            {/* Attendance */}
            <Card className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarDays className="h-5 w-5 text-primary" /> Hazri · Attendance
                  <span className="ml-auto text-xs font-normal text-muted-foreground">{monthLabel(data.attendance.month)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-extrabold tracking-tight text-foreground">
                    {data.attendance.percent}<span className="text-2xl text-muted-foreground">%</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div><div className="text-xl font-bold text-emerald-600">{data.attendance.present}</div><div className="text-muted-foreground">Hazir</div></div>
                    <div><div className="text-xl font-bold text-red-600">{data.attendance.absent}</div><div className="text-muted-foreground">Ghair-hazir</div></div>
                    <div><div className="text-xl font-bold text-amber-600">{data.attendance.late}</div><div className="text-muted-foreground">Late</div></div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {data.attendance.recent.map((r) => (
                    <span key={r.date} title={`${r.date}: ${statusLabel[r.status] ?? r.status}`}
                      className={`h-6 w-6 rounded-md ${statusDot[r.status] ?? "bg-gray-300"}`} />
                  ))}
                </div>
                {data.attendance.recent.length === 0 && (
                  <p className="mt-2 text-sm text-muted-foreground">Abhi koi hazri record nahi hai.</p>
                )}
              </CardContent>
            </Card>

            {/* Fees */}
            <Card className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wallet className="h-5 w-5 text-primary" /> Fee · {monthLabel(data.fees.current.month)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.fees.current.status === "paid" && (
                  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-800">
                    <CircleCheck className="h-8 w-8 shrink-0" />
                    <div><div className="text-lg font-bold">Paid</div>
                    <div className="text-sm">Is month ki fee jama ho gayi hai.</div></div>
                  </div>
                )}
                {data.fees.current.status === "pending" && (
                  <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-800">
                    <CircleAlert className="h-8 w-8 shrink-0" />
                    <div><div className="text-lg font-bold">Rs {data.fees.current.pending} pending</div>
                    <div className="text-sm">Rs {data.fees.current.amount_paid} jama · Rs {data.fees.current.amount_due} total</div></div>
                  </div>
                )}
                {data.fees.current.status === "no_record" && (
                  <p className="text-sm text-muted-foreground">Is month ka fee record abhi nahi bana.</p>
                )}
                <div className="mt-3 space-y-1.5">
                  {data.fees.history.slice(1).map((h) => (
                    <div key={h.month} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-sm">
                      <span className="text-muted-foreground">{monthLabel(h.month)}</span>
                      {h.amount_due === 0 ? (
                        <span className="text-muted-foreground">—</span>
                      ) : h.pending <= 0 ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Paid</Badge>
                      ) : (
                        <span className="font-semibold text-red-700">Rs {h.pending} pending</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" /> Natija · Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.results.length === 0 && (
                  <p className="text-sm text-muted-foreground">Abhi koi test result nahi hai.</p>
                )}
                {data.results.map((ex) => (
                  <div key={ex.exam_id} className="rounded-xl border p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold">{ex.name}</h3>
                      <Badge className={`ml-auto border ${gradeStyles[ex.grade] ?? "bg-muted"}`}>{ex.grade}</Badge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {ex.percent}% · {ex.total_obtained}/{ex.total_max}
                      {ex.position && ` · Position ${ex.position} / ${ex.students_count}`}
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {ex.subjects.map((s) => (
                        <div key={s.subject} className="flex items-center justify-between text-sm">
                          <span>{s.subject}</span>
                          <span className="font-semibold">{s.obtained}<span className="text-muted-foreground">/{s.total}</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
