-- Create advocates table
create table if not exists public.advocates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  telegram text not null,
  license_number text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.advocates enable row level security;

-- Allow everyone to view advocates
create policy "advocates_select_all"
  on public.advocates for select
  using (true);

-- Only admins can insert advocates
create policy "advocates_insert_admin"
  on public.advocates for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update advocates
create policy "advocates_update_admin"
  on public.advocates for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can delete advocates
create policy "advocates_delete_admin"
  on public.advocates for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
