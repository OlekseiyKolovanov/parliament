-- Create tenders table
create table if not exists public.tenders (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  contact_name text not null,
  telegram text not null,
  description text not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tenders enable row level security;

-- Allow everyone to view tenders
create policy "tenders_select_all"
  on public.tenders for select
  using (true);

-- Allow authenticated users to insert tenders
create policy "tenders_insert_authenticated"
  on public.tenders for insert
  with check (auth.uid() is not null);

-- Only admins can update tenders
create policy "tenders_update_admin"
  on public.tenders for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can delete tenders
create policy "tenders_delete_admin"
  on public.tenders for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
