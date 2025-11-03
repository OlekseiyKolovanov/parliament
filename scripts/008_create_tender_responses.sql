-- Create tender responses table
create table if not exists public.tender_responses (
  id uuid primary key default gen_random_uuid(),
  tender_id uuid not null references public.tenders(id) on delete cascade,
  contact_name text not null,
  telegram text not null,
  proposal text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tender_responses enable row level security;

-- Allow everyone to view tender responses
create policy "tender_responses_select_all"
  on public.tender_responses for select
  using (true);

-- Allow authenticated users to insert tender responses
create policy "tender_responses_insert_authenticated"
  on public.tender_responses for insert
  with check (auth.uid() is not null);

-- Only admins can delete tender responses
create policy "tender_responses_delete_admin"
  on public.tender_responses for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
