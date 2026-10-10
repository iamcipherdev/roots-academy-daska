-- Admission inquiries from the website form
-- Run this in Supabase Dashboard → SQL Editor → New Query → Run

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  academy_id uuid not null references academies(id) on delete cascade,
  student_name text not null,
  phone text not null,
  current_class text,
  program text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists inquiries_academy_created_idx
  on inquiries(academy_id, created_at desc);

alter table inquiries enable row level security;
-- No public policies: only the service_role key (server API) can read/write.
