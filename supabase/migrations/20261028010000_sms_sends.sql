-- Durable SMS throttle log: one row per SMS sent (see src/server/messaging/sms-throttle.ts).
create table if not exists public.sms_sends (
  id bigint generated always as identity primary key,
  phone text not null,
  sent_at timestamptz not null default now()
);

create index if not exists sms_sends_phone_sent_at_idx on public.sms_sends (phone, sent_at desc);
create index if not exists sms_sends_sent_at_idx on public.sms_sends (sent_at desc);

alter table public.sms_sends enable row level security;
revoke all on table public.sms_sends from anon, authenticated;
grant select, insert on table public.sms_sends to service_role;
grant usage on sequence public.sms_sends_id_seq to service_role;
