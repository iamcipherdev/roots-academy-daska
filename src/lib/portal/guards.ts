import { NextResponse } from "next/server";
import { getStaffSession, type StaffSession } from "./auth";

type GuardOk = { session: StaffSession };
type GuardErr = { response: NextResponse };

/**
 * Require a signed-in staff member.
 * role = "admin" → admin only. Omitted → any staff (admin or teacher).
 */
export async function requireStaff(role?: "admin"): Promise<GuardOk | GuardErr> {
  const session = await getStaffSession();
  if (!session) {
    return {
      response: NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 }),
    };
  }
  if (role === "admin" && session.role !== "admin") {
    return {
      response: NextResponse.json({ ok: false, error: "Not allowed" }, { status: 403 }),
    };
  }
  return { session };
}
