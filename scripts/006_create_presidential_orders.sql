-- Create presidential orders table
create table if not exists public.presidential_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  title text not null,
  content text not null,
  document_url text,
  date_issued date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.presidential_orders enable row level security;

-- Allow everyone to view presidential orders
create policy "presidential_orders_select_all"
  on public.presidential_orders for select
  using (true);

-- Only admins can insert presidential orders
create policy "presidential_orders_insert_admin"
  on public.presidential_orders for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update presidential orders
create policy "presidential_orders_update_admin"
  on public.presidential_orders for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can delete presidential orders
create policy "presidential_orders_delete_admin"
  on public.presidential_orders for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
