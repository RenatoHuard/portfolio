-- =============================================================
-- SUPABASE MIGRATION — renatohuard.com.br portfolio
-- Rodar no SQL Editor do projeto ugfzarhpjfmvyrnquztg
-- Idempotente: pode rodar várias vezes sem erro
-- =============================================================

-- ── TABLES ────────────────────────────────────────────────────
create table if not exists public.projects (
  id            uuid         default gen_random_uuid() primary key,
  slug          text         not null unique,
  title         text         not null,
  tag           text         not null default '',
  status        text         not null default '',
  summary       text         not null default '',
  description   jsonb        not null default '[]',
  stack         jsonb        not null default '[]',
  color         text         not null default 'signal',
  link_demo     text,
  link_repo     text,
  display_order smallint     not null default 0,
  created_at    timestamptz  default now() not null,
  updated_at    timestamptz  default now() not null
);

create table if not exists public.project_screenshots (
  id           uuid      default gen_random_uuid() primary key,
  project_id   uuid      not null references public.projects(id) on delete cascade,
  position     smallint  not null check (position between 1 and 8),
  storage_path text,
  caption      text      not null default '',
  unique (project_id, position)
);

create table if not exists public.contact_messages (
  id         uuid        default gen_random_uuid() primary key,
  name       text        not null,
  email      text        not null,
  message    text        not null,
  created_at timestamptz default now() not null
);

create table if not exists public.site_settings (
  key   text primary key,
  value text not null default ''
);

-- ── ROW LEVEL SECURITY — habilitar ────────────────────────────
alter table public.projects            enable row level security;
alter table public.project_screenshots enable row level security;
alter table public.contact_messages    enable row level security;
alter table public.site_settings       enable row level security;

-- ── RLS POLICIES — DROP antes de criar (idempotente) ──────────
drop policy if exists "projects_public_read"     on public.projects;
drop policy if exists "projects_admin_write"     on public.projects;
drop policy if exists "screenshots_public_read"  on public.project_screenshots;
drop policy if exists "screenshots_admin_write"  on public.project_screenshots;
drop policy if exists "contact_public_insert"    on public.contact_messages;
drop policy if exists "settings_public_read"     on public.site_settings;
drop policy if exists "settings_admin_write"     on public.site_settings;

create policy "projects_public_read"
  on public.projects for select to anon, authenticated using (true);

create policy "projects_admin_write"
  on public.projects for all to authenticated
  using     (auth.email() = 'admin@renatohuard.com.br')
  with check (auth.email() = 'admin@renatohuard.com.br');

create policy "screenshots_public_read"
  on public.project_screenshots for select to anon, authenticated using (true);

create policy "screenshots_admin_write"
  on public.project_screenshots for all to authenticated
  using     (auth.email() = 'admin@renatohuard.com.br')
  with check (auth.email() = 'admin@renatohuard.com.br');

create policy "contact_public_insert"
  on public.contact_messages for insert to anon, authenticated with check (true);

create policy "settings_public_read"
  on public.site_settings for select to anon, authenticated using (true);

create policy "settings_admin_write"
  on public.site_settings for all to authenticated
  using     (auth.email() = 'admin@renatohuard.com.br')
  with check (auth.email() = 'admin@renatohuard.com.br');

-- ── SITE SETTINGS — seed ──────────────────────────────────────
insert into public.site_settings (key, value) values
  ('contact_email',     'renato.jhs@gmail.com'),
  ('whatsapp_number',   '5513982126596'),
  ('whatsapp_message',  'Olá! Vi o seu portfolio e gostaria de conversar.'),
  ('github_url',        'https://github.com/RenatoHuard'),
  ('linkedin_url',      'https://www.linkedin.com/in/renato-huard/'),
  ('instagram_url',     'https://www.instagram.com/renatohuard'),
  ('crushdex_apk_url',  ''),
  ('profile_photo_url', ''),
  ('brand_logo_url',    '')
on conflict (key) do nothing;

-- ── STORAGE RLS (storage.objects) ─────────────────────────────
-- ATENÇÃO: crie os buckets ANTES de rodar esta seção:
-- Dashboard > Storage > New bucket
--   screenshots  — Public: YES
--   releases     — Public: YES
--   media        — Public: YES

drop policy if exists "storage_screenshots_read"   on storage.objects;
drop policy if exists "storage_screenshots_insert" on storage.objects;
drop policy if exists "storage_screenshots_update" on storage.objects;
drop policy if exists "storage_screenshots_delete" on storage.objects;
drop policy if exists "storage_releases_read"      on storage.objects;
drop policy if exists "storage_releases_insert"    on storage.objects;
drop policy if exists "storage_releases_update"    on storage.objects;
drop policy if exists "storage_releases_delete"    on storage.objects;
drop policy if exists "storage_media_read"         on storage.objects;
drop policy if exists "storage_media_insert"       on storage.objects;
drop policy if exists "storage_media_update"       on storage.objects;
drop policy if exists "storage_media_delete"       on storage.objects;

-- screenshots
create policy "storage_screenshots_read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'screenshots');

create policy "storage_screenshots_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'screenshots' and auth.email() = 'admin@renatohuard.com.br');

create policy "storage_screenshots_update"
  on storage.objects for update to authenticated
  using  (bucket_id = 'screenshots' and auth.email() = 'admin@renatohuard.com.br')
  with check (bucket_id = 'screenshots' and auth.email() = 'admin@renatohuard.com.br');

create policy "storage_screenshots_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'screenshots' and auth.email() = 'admin@renatohuard.com.br');

-- releases (APK)
create policy "storage_releases_read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'releases');

create policy "storage_releases_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'releases' and auth.email() = 'admin@renatohuard.com.br');

create policy "storage_releases_update"
  on storage.objects for update to authenticated
  using  (bucket_id = 'releases' and auth.email() = 'admin@renatohuard.com.br')
  with check (bucket_id = 'releases' and auth.email() = 'admin@renatohuard.com.br');

create policy "storage_releases_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'releases' and auth.email() = 'admin@renatohuard.com.br');

-- media (foto de perfil, logo da marca)
create policy "storage_media_read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

create policy "storage_media_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and auth.email() = 'admin@renatohuard.com.br');

create policy "storage_media_update"
  on storage.objects for update to authenticated
  using  (bucket_id = 'media' and auth.email() = 'admin@renatohuard.com.br')
  with check (bucket_id = 'media' and auth.email() = 'admin@renatohuard.com.br');

create policy "storage_media_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media' and auth.email() = 'admin@renatohuard.com.br');
