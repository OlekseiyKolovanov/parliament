-- Create enterprises table
create table if not exists public.enterprises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  director text not null,
  participants text,
  type text not null,
  number text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.enterprises enable row level security;

-- Allow everyone to view enterprises
create policy "enterprises_select_all"
  on public.enterprises for select
  using (true);

-- Only admins can insert enterprises
create policy "enterprises_insert_admin"
  on public.enterprises for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update enterprises
create policy "enterprises_update_admin"
  on public.enterprises for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can delete enterprises
create policy "enterprises_delete_admin"
  on public.enterprises for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
