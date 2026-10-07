/** Asia/Karachi date helpers. All "today" / "current month" logic uses PKT. */

const TZ = "Asia/Karachi";

function parts(d: Date): { y: number; m: number; day: number } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [y, m, day] = fmt.format(d).split("-").map(Number);
  return { y, m, day };
}

/** "YYYY-MM-DD" in PKT. */
export function todayPKT(d = new Date()): string {
  const { y, m, day } = parts(d);
  return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** "YYYY-MM" in PKT — matches the fees.month format. */
export function currentMonthKey(d = new Date()): string {
  const { y, m } = parts(d);
  return `${y}-${String(m).padStart(2, "0")}`;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-10" -> "October 2026" */
export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  if (!y || !m || m < 1 || m > 12) return key;
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

/** Normalize "03XXXXXXXXX" -> "923XXXXXXXXX" for wa.me links. Returns null when unusable. */
export function toIntlPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  let p = phone.replace(/[\s\-()]/g, "");
  if (p.startsWith("+")) p = p.slice(1);
  if (p.startsWith("03") && p.length === 11) p = "92" + p.slice(1);
  if (!/^92\d{10}$/.test(p)) return null;
  return p;
}
