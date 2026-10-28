# Supabase

`migrations/20261028000000_leads.sql` creates the six lead tables, adds the SMS consent columns,
adds length/phone CHECKs, enables RLS and revokes `anon`/`authenticated` access. The Next.js server
writes with `SUPABASE_SECRET_KEY` (the `sb_secret_...` key, which bypasses RLS). Without it the app
falls back to `SUPABASE_ANON_KEY`, which stops working once this migration is applied.

## Apply

- CLI: `supabase link --project-ref <ref>` then `supabase db push`.
- Or paste the file into the dashboard SQL editor and run it.

The live project may already have these tables and policies. The migration is idempotent
(`create table if not exists`, `add column if not exists`, constraints added `NOT VALID` so old rows
don't block it), but it **drops anon/authenticated policies and revokes their grants**.
Set `SUPABASE_SECRET_KEY` in the production env and deploy **before** running it, or lead saving breaks.
To see old rows that break a limit, run `alter table ... validate constraint <name>`.

## After

Regenerate types and replace the hand-written `LeadTables` in `src/server/db/insert-row.ts`:
`supabase gen types typescript --project-id <ref> > src/server/db/database.types.ts`.
