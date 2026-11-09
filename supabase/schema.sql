-- Tactyqal blog schema — run in Supabase SQL Editor
create extension if not exists pgcrypto;

create table if not exists authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  author_id uuid references authors (id) on delete set null,
  category_id uuid references categories (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  read_time int,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists post_tags (
  post_id uuid not null references posts (id) on delete cascade,
  tag_id uuid not null references tags (id) on delete cascade,
  primary key (post_id, tag_id)
);

create index if not exists posts_status_published_idx on posts (status, published_at desc);
create index if not exists posts_slug_idx on posts (slug);
create index if not exists posts_category_idx on posts (category_id);

alter table authors enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table posts enable row level security;
alter table post_tags enable row level security;

-- Public read-only access; all writes go through the service role (bypasses RLS)
create policy "public read authors" on authors for select using (true);
create policy "public read categories" on categories for select using (true);
create policy "public read tags" on tags for select using (true);
create policy "public read published posts" on posts for select using (status = 'published');
create policy "public read post_tags" on post_tags for select using (true);
