-- Omega Medical Laboratory & Scan Center
-- Supabase PostgreSQL Schema (Demonstration & Production-Ready Architecture)
-- NOTE: Do not store patient test results, diagnoses, or sensitive clinical records in this schema.

create extension if not exists "pgcrypto";

-- 1. PROFILES (Admin / Staff role-based authorisation)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role text not null default 'staff' check (role in ('admin', 'staff', 'viewer')),
  created_at timestamptz not null default now()
);

-- 2. SERVICES
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null check (category in ('Laboratory Investigations', 'Specialised Investigations', 'Diagnostic Imaging')),
  short_description text not null,
  description text not null,
  preparation_instructions text not null default 'To be confirmed upon enquiry.',
  availability_status text not null default 'Proposed — To Be Confirmed',
  indicative_price text,
  image_url text,
  icon_name text not null default 'FlaskConical',
  featured_on_home boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 3. TEST CATALOGUE
create table if not exists public.test_catalogue (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null,
  category text not null check (category in ('Laboratory Investigations', 'Specialised Investigations', 'Diagnostic Imaging')),
  description text not null,
  preparation_instructions text not null,
  availability_status text not null default 'Proposed — To Be Confirmed',
  turnaround_time text,
  turnaround_approved boolean not null default false,
  indicative_price text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4. APPOINTMENTS (Non-clinical enquiry & scheduling requests only)
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique,
  patient_name text not null,
  phone text not null,
  email text not null,
  service_id uuid references public.services(id) on delete set null,
  service_name text not null,
  preferred_date date not null,
  preferred_time text not null,
  message text,
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Cancelled', 'Completed')),
  created_at timestamptz not null default now()
);

-- 5. HEALTH PACKAGES
create table if not exists public.health_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  audience text not null,
  short_description text not null,
  included_tests text[] not null default '{}',
  price_display text not null default 'Request Package Information',
  is_price_approved boolean not null default false,
  featured_on_home boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 6. TEAM MEMBERS
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  job_title text not null,
  biography text not null,
  verified_qualifications text not null default '[VERIFIED QUALIFICATIONS]',
  professional_registration text not null default '[PROFESSIONAL REGISTRATION — IF APPROVED]',
  registration_approved boolean not null default false,
  photo_url text,
  is_placeholder boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 7. BLOG POSTS
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text not null,
  content text not null,
  featured_image text,
  author text not null default 'Omega Editorial Review Team (Placeholder)',
  read_time text not null default '4 min read',
  status text not null default 'Draft' check (status in ('Published', 'Draft', 'Pending Review')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

-- 8. CONTACT ENQUIRIES
create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  status text not null default 'New' check (status in ('New', 'Reviewed', 'Archived')),
  created_at timestamptz not null default now()
);

-- 9. WEBSITE SETTINGS
create table if not exists public.website_settings (
  id uuid primary key default gen_random_uuid(),
  brand_name text not null default 'OMEGA MEDICAL LABORATORY',
  extended_name text not null default 'OMEGA MEDICAL LABORATORY & SCAN CENTER',
  tagline text not null default 'Precision. Care. Confidence.',
  hero_headline text not null default 'Your Health. Our Precision. Your Confidence.',
  logo_url text,
  provisional_address text not null,
  address_verified boolean not null default false,
  provisional_phone text not null,
  phone_verified boolean not null default false,
  official_email text not null default '[OFFICIAL BUSINESS EMAIL]',
  whatsapp_number text not null,
  working_hours text not null default '[CONFIRMED WORKING HOURS]',
  map_directions_url text,
  map_embed_note text,
  developer_credit text not null default 'Website concept by Falcus Media.',
  show_developer_credit boolean not null default true,
  demo_notice_text text not null default 'Website demonstration – Business information, services and operational details are subject to confirmation by Omega Medical Laboratory.',
  updated_at timestamptz not null default now()
);

-- ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.test_catalogue enable row level security;
alter table public.appointments enable row level security;
alter table public.health_packages enable row level security;
alter table public.team_members enable row level security;
alter table public.blog_posts enable row level security;
alter table public.contact_enquiries enable row level security;
alter table public.website_settings enable row level security;

-- Helper function to check admin/staff role server-side
create or replace function public.is_admin_or_staff()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'staff')
  );
$$;

-- Public read access for published/active catalogue content
create policy "Public read active services" on public.services for select using (is_active = true or public.is_admin_or_staff());
create policy "Public read active tests" on public.test_catalogue for select using (is_active = true or public.is_admin_or_staff());
create policy "Public read active packages" on public.health_packages for select using (is_active = true or public.is_admin_or_staff());
create policy "Public read active team" on public.team_members for select using (is_active = true or public.is_admin_or_staff());
create policy "Public read published posts" on public.blog_posts for select using (status = 'Published' or public.is_admin_or_staff());
create policy "Public read website settings" on public.website_settings for select using (true);

-- Public insert-only for appointment requests and contact enquiries (no public SELECT to protect personal data)
create policy "Public insert appointments" on public.appointments for insert with check (true);
create policy "Staff read/update appointments" on public.appointments for all using (public.is_admin_or_staff());

create policy "Public insert contact enquiries" on public.contact_enquiries for insert with check (true);
create policy "Staff read/update contact enquiries" on public.contact_enquiries for all using (public.is_admin_or_staff());

-- Admin/Staff write policies
create policy "Staff manage services" on public.services for all using (public.is_admin_or_staff());
create policy "Staff manage tests" on public.test_catalogue for all using (public.is_admin_or_staff());
create policy "Staff manage packages" on public.health_packages for all using (public.is_admin_or_staff());
create policy "Staff manage team" on public.team_members for all using (public.is_admin_or_staff());
create policy "Staff manage blog" on public.blog_posts for all using (public.is_admin_or_staff());
create policy "Staff manage settings" on public.website_settings for all using (public.is_admin_or_staff());
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id or public.is_admin_or_staff());
