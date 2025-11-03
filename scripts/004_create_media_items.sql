-- Create media items table (Press Center)
create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('video', 'photo')),
  title text not null,
  description text,
  url text not null,
  thumbnail_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.media_items enable row level security;

-- Allow everyone to view media items
create policy "media_items_select_all"
  on public.media_items for select
  using (true);

-- Only admins can insert media items
create policy "media_items_insert_admin"
  on public.media_items for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update media items
create policy "media_items_update_admin"
  on public.media_items for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can delete media items
create policy "media_items_delete_admin"
  on public.media_items for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
