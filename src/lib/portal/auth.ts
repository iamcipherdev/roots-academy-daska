import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const STAFF_COOKIE = "ra_staff_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export type StaffRole = "admin" | "teacher";

export interface StaffSession {
  staff_id: string;
  role: StaffRole;
  academy_id: string;
  exp: number;
}

/** SHA-256(salt + pin) — matches the seed SQL. */
export function hashPin(salt: string, pin: string): string {
  return createHash("sha256").update(salt + pin).digest("hex");
}

export function newSalt(): string {
  return createHash("sha256")
    .update(Math.random().toString() + Date.now().toString())
    .digest("hex")
    .slice(0, 32);
}

function sessionSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("[portal] missing env var SESSION_SECRET");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("hex");
}

/** Create a signed session token (payload.signature, base64url). */
export function createSessionToken(s: Omit<StaffSession, "exp">): string {
  const payload = Buffer.from(
    JSON.stringify({ ...s, exp: Date.now() + SESSION_TTL_MS })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Verify a session token. Returns null when invalid/expired. */
export function verifySessionToken(token: string): StaffSession | null {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return null;
    const expected = sign(payload);
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as StaffSession;
    if (!data.staff_id || !data.role || !data.academy_id) return null;
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function setStaffSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(STAFF_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60,
  });
}

export async function clearStaffSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(STAFF_COOKIE);
}

export async function getStaffSession(): Promise<StaffSession | null> {
  const store = await cookies();
  const token = store.get(STAFF_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
