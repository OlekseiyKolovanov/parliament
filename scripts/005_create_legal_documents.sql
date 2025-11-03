-- Create legal documents table (Advocacy section)
create table if not exists public.legal_documents (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('announcement', 'lecture', 'information')),
  title text not null,
  content text not null,
  document_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.legal_documents enable row level security;

-- Allow everyone to view legal documents
create policy "legal_documents_select_all"
  on public.legal_documents for select
  using (true);

-- Only admins can insert legal documents
create policy "legal_documents_insert_admin"
  on public.legal_documents for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update legal documents
create policy "legal_documents_update_admin"
  on public.legal_documents for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can delete legal documents
create policy "legal_documents_delete_admin"
  on public.legal_documents for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
