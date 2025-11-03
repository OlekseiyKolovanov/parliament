-- Create president bio table
create table if not exists public.president_bio (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.president_bio enable row level security;

-- Allow everyone to view president bio
create policy "president_bio_select_all"
  on public.president_bio for select
  using (true);

-- Only admins can insert president bio
create policy "president_bio_insert_admin"
  on public.president_bio for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update president bio
create policy "president_bio_update_admin"
  on public.president_bio for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Insert default president bio
insert into public.president_bio (content)
values ('Біографія президента буде додана адміністратором.')
on conflict do nothing;
