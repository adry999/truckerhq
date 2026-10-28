# Project status: where we continue

_Last updated: 2026-10-28._

## Decisions

- **Domain:** `truckerhq.us` is the primary and canonical domain (apex, no www). `truckerhq.com` is taken (parked at Namecheap).
- **Redirect domain:** `truckerhqusa.com` (or `thetruckerhq.com`) redirects 301 to `.us`.
  - The `.us` registrant must be the client's US company.
- **Audience:** the US only, for dispatch and hire-drivers services, in EN and RU.
- **Future subdomains:** tools may become separate apps on subdomains later.
  - `/dispatch` stays a subfolder, for SEO.
- **Hosting:** Hostinger Business/Cloud "Node.js Web App" (Node 24, built from GitHub `main`) behind Cloudflare (proxied DNS, SSL Full strict).
  - Fully off Vercel.
- **Email:**
  - mailboxes on Hostinger Email (`@truckerhq.us`);
  - transactional mail through Resend (apex verified, bounce records on `send.`).

## Done (merged to `main`)

| PR | What |
|---|---|
| #16 | See the list below. |
| #17 | The default email sender is derived from `SITE_HOST`. |
| #18 | See the list below. |

PR #16:
- `next` 16.4.3, fixing the critical self-hosting advisories.
- `CF-Connecting-IP`, `CF_ORIGIN_SECRET`, and Origin required on POST.
- Non-US NANP numbers blocked.
- `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_INDEXABLE`.
- Lead email alerts.
- Sample and thin pages noindexed.
- JSON-LD graph, keyword H1s, `/llms.txt` and AI bots in robots.
- Local hero images and a streamed carrier lookup.
- Accessibility pass.
- Carrier score and profit calculator fixes.
- RU SMS plumbing (gated).

PR #18:
- Turnstile on all 6 forms.
- SMS consent evidence (TCPA). SMS is sent only with consent.
- Supabase secret key.
- RLS migration (`supabase/migrations`), validated on Postgres 17.
- CSP update.
- `docs/launch-runbook.md`.

Audit reports and the original plan are in `docs/audit/2026-10-28/`.

## Blocked on the client (launch blockers)

1. Buy `truckerhq.us` (+ the redirect `.com`) under the US company.
2. Cloudflare account. Hostinger Business/Cloud plan (US datacenter).
3. Real values to replace the placeholders:
   - phone, dispatch fee, hire-drivers prices;
   - USDOT/MC, legal entity, address;
   - founder/team, guide author.
4. Lawyer-reviewed Privacy (cookies, CPRA, SMS no-share), Terms and SMS Terms.
5. Supabase prod project (Pro, us-east) plus access. Then apply the migration. **Order matters:**
   1. Set `SUPABASE_SECRET_KEY` and deploy.
   2. Apply the migration.
6. Turnstile keys (Cloudflare dashboard).
7. Native-speaker review of RU copy:
   - home H1 "Диспетчер для траков…";
   - dispatch H1 "…за фикс в неделю";
   - SMS templates (`RU_SMS_APPROVED=false`);
   - consent text.
8. Twilio A2P 10DLC. Happens after launch, because it needs the privacy/terms URLs live.

Go-live steps: follow `docs/launch-runbook.md` top to bottom.

## Remaining code work (not blocked)

### P1: before or at launch

- [x] Visual check of the home hero on mobile (iPhone 13 viewport, no horizontal overflow).
- [x] Durable SMS throttle: Supabase `sms_sends` table (migration `20261028010000`), with an in-memory fallback.
- [x] Startup integration log (`src/instrumentation.ts`) and `GET /api/health`, which returns `{ ok, leads }` so it doesn't reveal which integrations are set.
- [x] RU dispatch wizard at `/ru/dispatch/start` and an RU footer. **The RU strings need native review** (`src/features/dispatch/data/start-wizard-copy.ts`, `src/shared/i18n/footer-copy.ts`).
- [x] HomeDispatch image is local, with honest alt text. It's still a stock placeholder (a gaming desk), so swap it for a real photo of the team. `remotePatterns` stays only as a fallback for the state hero map.
- [ ] **Placeholder gate.** Once real values exist, switch CI to `check:placeholders --strict`.

### P2: soon after launch

- [ ] Enforce CSP: move from Report-Only to enforcing, after a clean week of reports. Reports are logged by `POST /api/csp-report` as `[csp-report]` lines.
- [x] Carrier lookup landing is static. Searches go to `/tools/carrier-lookup/search` (noindex), and old `?q=` links 307-redirect there.
- [x] Field-level API errors (`{ error, fields }`) shown inline. Wizards jump back to the step that has the error.
- [x] Lead `language` normalized to EN/RU (driver_language EN/RU/ANY), with migration `20261028020000`. **Deploy the app before applying it.**
- [x] The dispatch wizard requires at least one lane.
- [x] Dropped the unused `count` / `jobs` fields from the jobs data.
- [ ] Error monitoring (Sentry) and an uptime monitor.

### SEO / content (highest growth impact, needs client input)

- [ ] Write the 10 stub guides, answer-first. Flip `hasGuideBody` per guide.
- [ ] Real per-state FMCSA census stats. Then set `STATE_DATA_IS_SAMPLE = false` to index the 50 state pages.
- [ ] Real job listings. City pages index automatically once there are enough non-sample jobs.
- [x] Prose, formula, worked example and FAQPage on profit-per-mile and the carrier lookup. The numbers come from the model code.
- [ ] New pages: `/pricing`, `/dispatch/new-authority`, `/dispatch/{dry-van,reefer,flatbed,…}`, `/jobs/russian-speaking`, `/tools/broker-check`.
- [ ] RU versions of tools and guides. Author pages (E-E-A-T).
- [ ] Organization `sameAs` once social and Google Business Profile URLs exist.

## Verification recipe

```bash
npm run lint && npm run typecheck && npx vitest run
NEXT_PUBLIC_SITE_URL=https://truckerhq.us NEXT_PUBLIC_INDEXABLE=true npm run build
npx playwright test
```

Migration check:
1. `docker run postgres:17-alpine`.
2. Create the roles `anon`, `authenticated` and `service_role`.
3. Give `service_role` `bypassrls`.
4. Run the SQL twice.
