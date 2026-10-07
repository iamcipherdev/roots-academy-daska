# DECISIONS.md — Roots Academy Portal v1

## What was built
Parent + staff portal INSIDE the existing Roots Academy website
(`iamcipherdev/roots-academy-daska`, Next.js App Router + Tailwind + shadcn),
on branch `portal-v1`. One site, one deploy.

## Key decisions
1. **Portal lives in the same Next.js app** — routes under `src/app/s/[roll_no]`
   (parent) and `src/app/staff/*` (staff). No separate product, no separate deploy.
2. **Supabase is the portal's data layer** (project "mracademy",
   ref `pciuuyqgzyuilsthhnul`, ap-south-1). The existing Prisma/SQLite setup
   stays untouched — it only serves the Inquiry contact form. Portal tables were
   NOT re-modeled in Prisma; all portal data access goes through
   `src/lib/portal/supabase.ts` (service-role, server-only).
3. **Custom PIN auth, no Supabase Auth.** Staff PINs are salted SHA-256
   (`SHA-256(salt + PIN)`), verified server-side with timing-safe compare.
   Session = HMAC-signed httpOnly cookie (12h). All staff writes go through
   Route Handlers guarded by `requireStaff()`.
4. **Parent access = roll number only**, public read-only API
   (`/api/portal/parent/[rollno]`) that returns ONLY that student's rows.
   Invalid roll → friendly 404 page, no data leak.
5. **Timezone:** all "today"/"current month" logic uses Asia/Karachi
   (`src/lib/portal/dates.ts`).
6. **Fee reminders:** `wa.me/<parent-intl-number>?text=...` deep link opened in
   a new tab — the teacher sends from their own WhatsApp. Zero API cost.
   `NEXT_PUBLIC_APP_URL` (fallback: `window.location.origin`) builds the
   `/s/[roll_no]` deep link in the message.
7. **Grading:** A+ ≥90, A ≥80, B ≥70, C ≥60, D ≥50, F <50; competition ranking
   (1,2,2,4) per exam computed server-side in the parent API.
8. **Report card PDF:** generated client-side with jsPDF (no server cost).
9. **Design:** portal reuses the site's brand — crimson `#c1121f` primary,
   charcoal text, Plus Jakarta Sans, shadcn components, rounded-2xl cards.
   Parent pages include the site's Navbar/Footer so parents never feel they
   "left" the site. Staff gets a compact branded header + tab nav.
10. **Bilingual UI:** English + Roman Urdu labels throughout.

## Env vars required on the host
`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`SESSION_SECRET`, `NEXT_PUBLIC_APP_URL`.

## Deployment
Followed the existing setup: `npm run build` → standalone output, served on
port 3000 behind the existing Caddy reverse proxy. No host migration.

## Not built (v1 scope)
Timetable, multi-branch, AI features, push notifications, parent chat, online
payment, parent PIN/OTP, "MrAcademy" white-labeling. Academy name comes from
the database (not hardcoded) so a future split stays possible.

## Seed data (in Supabase)
Academy "Roots Academy of Sciences & Computer College", 1 admin
(phone `03000000000`, PIN `1234`), class "8-A", 5 demo students, 20 days of
attendance, current-month fees (2 paid / 2 partial / 1 unpaid), 1 exam with marks.
