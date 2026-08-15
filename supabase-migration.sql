-- =============================================================
-- SUPABASE MIGRATION — renatohuard.com.br portfolio
-- Rodar no SQL Editor do projeto ugfzarhpjfmvyrnquztg
-- =============================================================

-- ── PROJECTS ──────────────────────────────────────────────────
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

-- ── SCREENSHOTS ───────────────────────────────────────────────
create table if not exists public.project_screenshots (
  id           uuid      default gen_random_uuid() primary key,
  project_id   uuid      not null references public.projects(id) on delete cascade,
  position     smallint  not null check (position between 1 and 8),
  storage_path text,
  caption      text      not null default '',
  unique (project_id, position)
);

-- ── CONTACT MESSAGES ──────────────────────────────────────────
create table if not exists public.contact_messages (
  id         uuid        default gen_random_uuid() primary key,
  name       text        not null,
  email      text        not null,
  message    text        not null,
  created_at timestamptz default now() not null
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
alter table public.projects            enable row level security;
alter table public.project_screenshots enable row level security;
alter table public.contact_messages    enable row level security;

-- Leitura pública
create policy "projects_public_read"
  on public.projects for select to anon, authenticated using (true);

create policy "screenshots_public_read"
  on public.project_screenshots for select to anon, authenticated using (true);

-- Escrita restrita ao e-mail do admin (bloqueia usuários do CrushDex)
create policy "projects_admin_write"
  on public.projects for all to authenticated
  using     (auth.email() = 'admin@renatohuard.com.br')
  with check (auth.email() = 'admin@renatohuard.com.br');

create policy "screenshots_admin_write"
  on public.project_screenshots for all to authenticated
  using     (auth.email() = 'admin@renatohuard.com.br')
  with check (auth.email() = 'admin@renatohuard.com.br');

-- Contato: qualquer um pode inserir, ninguém anônimo pode ler
create policy "contact_public_insert"
  on public.contact_messages for insert to anon, authenticated with check (true);

-- ── STORAGE BUCKET ────────────────────────────────────────────
-- Criar manualmente no Dashboard > Storage > New bucket
--   Nome: screenshots
--   Public: YES  (marcar "Public bucket")
