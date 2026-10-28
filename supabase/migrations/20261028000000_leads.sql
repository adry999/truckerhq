-- Lead tables written by the Next.js server (src/server/db/insert-row.ts).
-- Writes use the secret key (service_role, bypasses RLS). anon and authenticated
-- get no policies and no grants, so leads can't be read or written from a browser.
-- Idempotent: safe on a project where some of these tables already exist.

create table if not exists public.job_applications (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  job_slug text not null,
  full_name text not null,
  phone text not null,
  cdl_class text not null default '',
  experience text not null default '',
  language text not null default 'EN'
);

create table if not exists public.claims (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  dot text not null,
  carrier_slug text not null default '',
  contact_method text not null default '',
  phone text not null,
  equipment text[] not null default '{}',
  lanes text[] not null default '{}',
  also_show text[] not null default '{}'
);

create table if not exists public.compliance_alert_signups (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  dot text not null,
  phone text not null,
  language text not null default 'EN',
  watch jsonb not null default '{}'::jsonb
);

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  topic text not null default '',
  name text not null,
  phone text not null,
  message text not null default '',
  language text not null default 'EN'
);

create table if not exists public.dispatch_requests (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  trailer_type text not null default '',
  trucks integer not null default 1,
  driver_type text not null default '',
  home_base text not null default '',
  lanes text[] not null default '{}',
  home_time text not null default '',
  authority text not null default '',
  mc_number text not null default '',
  name text not null,
  phone text not null,
  best_time text not null default '',
  language text not null default 'English'
);

create table if not exists public.hire_driver_requests (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  company_name text not null,
  dot_number text not null default '',
  contact_name text not null,
  phone text not null,
  pay text not null default '',
  home_base text not null default '',
  position text not null default '',
  equipment text not null default '',
  driver_language text not null default ''
);

-- TCPA / 10DLC consent evidence on the tables that text the submitted number.
alter table public.job_applications
  add column if not exists sms_consent boolean not null default false,
  add column if not exists sms_consent_version text,
  add column if not exists sms_consent_at timestamptz,
  add column if not exists consent_ip text,
  add column if not exists consent_user_agent text;
alter table public.dispatch_requests
  add column if not exists sms_consent boolean not null default false,
  add column if not exists sms_consent_version text,
  add column if not exists sms_consent_at timestamptz,
  add column if not exists consent_ip text,
  add column if not exists consent_user_agent text;
alter table public.compliance_alert_signups
  add column if not exists sms_consent boolean not null default false,
  add column if not exists sms_consent_version text,
  add column if not exists sms_consent_at timestamptz,
  add column if not exists consent_ip text,
  add column if not exists consent_user_agent text;

-- CHECK constraints (named, so reruns skip them). Added NOT VALID so existing rows
-- that predate the limits don't block the migration; new writes are still checked.
do $$
declare
  c record;
begin
  for c in
    select * from (values
      ('job_applications', 'job_applications_limits',
        $c$ char_length(job_slug) <= 100 and char_length(full_name) <= 100 and phone ~ '^\+1[2-9][0-9]{9}$' and char_length(cdl_class) <= 50 and char_length(experience) <= 50 and char_length(language) <= 20 $c$),
      ('claims', 'claims_limits',
        $c$ char_length(dot) <= 20 and (phone = '' or phone ~ '^\+1[2-9][0-9]{9}$') and char_length(carrier_slug) <= 100 and char_length(contact_method) <= 60 $c$),
      ('compliance_alert_signups', 'compliance_alert_signups_limits',
        $c$ char_length(dot) <= 20 and phone ~ '^\+1[2-9][0-9]{9}$' and char_length(language) <= 20 and jsonb_typeof(watch) = 'object' $c$),
      ('contact_messages', 'contact_messages_limits',
        $c$ char_length(name) <= 100 and phone ~ '^\+1[2-9][0-9]{9}$' and char_length(topic) <= 100 and char_length(message) <= 5000 and char_length(language) <= 20 $c$),
      ('dispatch_requests', 'dispatch_requests_limits',
        $c$ trucks > 0 and trucks <= 500 and char_length(name) <= 100 and phone ~ '^\+1[2-9][0-9]{9}$' and char_length(trailer_type) <= 60 and char_length(driver_type) <= 60 and char_length(home_base) <= 100 and char_length(home_time) <= 60 and char_length(authority) <= 60 and char_length(mc_number) <= 20 and char_length(best_time) <= 60 and char_length(language) <= 20 $c$),
      ('hire_driver_requests', 'hire_driver_requests_limits',
        $c$ char_length(company_name) <= 150 and char_length(contact_name) <= 100 and phone ~ '^\+1[2-9][0-9]{9}$' and char_length(dot_number) <= 20 and char_length(pay) <= 100 and char_length(home_base) <= 100 and char_length(position) <= 100 and char_length(equipment) <= 100 and char_length(driver_language) <= 50 $c$)
    ) as t(tbl, name, expr)
  loop
    if not exists (select 1 from pg_constraint where conname = c.name) then
      execute format('alter table public.%I add constraint %I check (%s) not valid', c.tbl, c.name, c.expr);
    end if;
  end loop;
end $$;

-- Lock the tables: RLS on, no policies for anon/authenticated, no grants.
do $$
declare
  t text;
  p record;
begin
  foreach t in array array[
    'job_applications', 'claims', 'compliance_alert_signups',
    'contact_messages', 'dispatch_requests', 'hire_driver_requests'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    for p in
      select policyname from pg_policies
      where schemaname = 'public' and tablename = t
        and (roles && array['anon', 'authenticated', 'public']::name[])
    loop
      execute format('drop policy %I on public.%I', p.policyname, t);
    end loop;
    execute format('revoke all on table public.%I from anon, authenticated', t);
    -- Explicit, so inserts don't depend on the project's default privileges.
    execute format('grant select, insert on table public.%I to service_role', t);
  end loop;
end $$;

-- The identity sequences must not be reachable either.
revoke all on all sequences in schema public from anon, authenticated;
grant usage on all sequences in schema public to service_role;
