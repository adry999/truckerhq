-- Normalize language columns to a closed set: language in (EN, RU), driver_language in (EN, RU, ANY).
-- The API now normalizes at the boundary (src/server/leads/fields.ts); this fixes rows written before.
-- Idempotent: the UPDATEs only touch rows that are not normalized yet, constraints are added once.

update public.job_applications
set language = case when language ~* '^(ru|russian|рус)' then 'RU' else 'EN' end
where language not in ('EN', 'RU');

update public.compliance_alert_signups
set language = case when language ~* '^(ru|russian|рус)' then 'RU' else 'EN' end
where language not in ('EN', 'RU');

update public.contact_messages
set language = case when language ~* '^(ru|russian|рус)' then 'RU' else 'EN' end
where language not in ('EN', 'RU');

update public.dispatch_requests
set language = case when language ~* '^(ru|russian|рус)' then 'RU' else 'EN' end
where language not in ('EN', 'RU');

update public.hire_driver_requests
set driver_language = case
  when driver_language ~* '^(en|english|англ)' then 'EN'
  when driver_language ~* '^(ru|russian|рус)' then 'RU'
  else 'ANY'
end
where driver_language not in ('EN', 'RU', 'ANY');

alter table public.dispatch_requests alter column language set default 'EN';
alter table public.hire_driver_requests alter column driver_language set default 'ANY';

do $$
declare
  c record;
begin
  for c in
    select * from (values
      ('job_applications', 'job_applications_language_check', $c$ language in ('EN', 'RU') $c$),
      ('compliance_alert_signups', 'compliance_alert_signups_language_check', $c$ language in ('EN', 'RU') $c$),
      ('contact_messages', 'contact_messages_language_check', $c$ language in ('EN', 'RU') $c$),
      ('dispatch_requests', 'dispatch_requests_language_check', $c$ language in ('EN', 'RU') $c$),
      ('hire_driver_requests', 'hire_driver_requests_driver_language_check', $c$ driver_language in ('EN', 'RU', 'ANY') $c$)
    ) as t(tbl, name, expr)
  loop
    if not exists (select 1 from pg_constraint where conname = c.name) then
      execute format('alter table public.%I add constraint %I check (%s) not valid', c.tbl, c.name, c.expr);
    end if;
    -- Rows were normalized above, so this passes; it is a no-op when already validated.
    execute format('alter table public.%I validate constraint %I', c.tbl, c.name);
  end loop;
end $$;
