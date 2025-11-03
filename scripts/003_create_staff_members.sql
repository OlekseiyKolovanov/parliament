-- Create staff members table (Verkhovna Rada employees)
create table if not exists public.staff_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  photo_url text,
  bio text,
  telegram text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.staff_members enable row level security;

-- Allow everyone to view staff members
create policy "staff_members_select_all"
  on public.staff_members for select
  using (true);

-- Only admins can insert staff members
create policy "staff_members_insert_admin"
  on public.staff_members for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update staff members
create policy "staff_members_update_admin"
  on public.staff_members for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can delete staff members
create policy "staff_members_delete_admin"
  on public.staff_members for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
