-- Run this in the Supabase SQL Editor (project: ugfzarhpjfmvyrnquztg)
-- After running, you can delete this file.

create table if not exists public.contact_messages (
  id         uuid         default gen_random_uuid() primary key,
  name       text         not null,
  email      text         not null,
  message    text         not null,
  created_at timestamptz  default now() not null
);

-- Enable Row Level Security
alter table public.contact_messages enable row level security;

-- Anyone (anon) can INSERT — no SELECT access for anonymous users
create policy "public_insert_contact"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
