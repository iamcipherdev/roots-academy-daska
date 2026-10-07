/** Grading + ranking helpers for the portal. Pure functions — safe anywhere. */

export function percentage(obtained: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((obtained / total) * 1000) / 10; // 1 decimal
}

export function gradeFor(pct: number): string {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}

export interface RankedStudent {
  student_id: string;
  total_obtained: number;
}

/**
 * Competition ranking ("1, 2, 2, 4"): ties share a position,
 * the next position skips accordingly.
 */
export function assignPositions(rows: RankedStudent[]): Map<string, number> {
  const sorted = [...rows].sort((a, b) => b.total_obtained - a.total_obtained);
  const positions = new Map<string, number>();
  let lastScore: number | null = null;
  let lastPos = 0;
  sorted.forEach((r, i) => {
    if (lastScore === null || r.total_obtained !== lastScore) {
      lastPos = i + 1;
      lastScore = r.total_obtained;
    }
    positions.set(r.student_id, lastPos);
  });
  return positions;
}

export type AttendanceStatus = "present" | "absent" | "late";

export function attendancePercent(statuses: AttendanceStatus[]): number {
  if (statuses.length === 0) return 0;
  const present = statuses.filter((s) => s === "present").length;
  return Math.round((present / statuses.length) * 1000) / 10;
}
