# Project status: where we continue

_Last updated: 2026-10-28 (state pages on FMCSA census data)._

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
| #19 | This status file and the README refresh. |
| #20 | Durable SMS throttle (`sms_sends`), startup integration log, `/api/health`, RU dispatch wizard and RU footer. |
| #21 | Field-level form errors, static carrier lookup (+ `/search`), tool guides with FAQPage, CSP report endpoint, language normalization. |
| #22 | Cleanup: dead exports and files, build artifacts, docs refresh. |
| #23 | Real FMCSA census stats on the 50 state pages (now indexable). |
| #24 | Draft bodies for the 10 stub guides behind a review gate. ESLint ignores `.claude/worktrees`. |
| #26 | RU tools hub + 3 RU tools, six `/dispatch/<service>` pages, protest period fix. |

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

## Deploy order (migrations)

1. Set `SUPABASE_SECRET_KEY` and deploy the current `main`.
2. Apply, in order:
   1. `20261028000000_leads`
   2. `20261028010000_sms_sends`
   3. `20261028020000_normalize_language`

The migrations revoke anon access and add CHECKs that reject values an older build would write. See `supabase/README.md`.

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
   - consent text;
   - RU tools (PR #26): `src/features/profit/data/profit-copy.ts`, `src/features/compliance/data/new-mc-checklist.ts`, `src/features/compliance/data/compliance-alerts-copy.ts`, `src/app/_tools/tools-hub-copy.ts`. Unsure terms: "Ставка безубыточности", "Толлы и весовые", "страховая подача (filing)", "Узнайте раньше брокера".
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
- [ ] Error monitoring (Sentry): needs a DSN. Uptime monitor: point it at `GET /api/health`.
- [ ] Disconnect the Vercel GitHub integration. Hosting moved to Hostinger, and the Vercel preview check fails with a rate limit on PRs.

### SEO / content (highest growth impact, needs client input)

- [~] 10 guide drafts are written (PR #24) in `src/features/guides/data/bodies/`. **Client review needed:**
  1. Preview each draft on `npm run dev`. Drafts show a banner.
  2. Resolve the `// REVIEW:` comments.
  3. Set `reviewStatus: "approved"` per guide. The guide is then indexed and added to the sitemap automatically.
- [x] Real per-state FMCSA census stats (`src/features/carriers/data/states/census.json`, dataset `az4n-8mr2`). The 50 state pages are indexable and in the sitemap. Refresh with `npm run data:census` (about 1 minute, optional `SOCRATA_APP_TOKEN`), ideally quarterly, and commit the JSON.
- [ ] Real job listings. City pages index automatically once there are enough non-sample jobs.
- [x] Prose, formula, worked example and FAQPage on profit-per-mile and the carrier lookup. The numbers come from the model code.
- [x] Six service pages (PR #26): `/dispatch/{dry-van,reefer,flatbed,step-deck,power-only,new-authority}`, indexable, in the sitemap and llms.txt, linked from `/dispatch`. Content in `src/features/dispatch/data/service-pages.ts`. **Client review:** resolve the 9 `// REVIEW:` comments (equipment experience the team really has, oversize/permit loads out of scope, brokers that accept new MCs, Starter MC pricing after 6 months).
- [x] Protest period fixed to 10 days from FMCSA Register publication (49 CFR 365.203) in the New MC checklist; it said 4 days.
- [ ] New pages: `/pricing`, `/jobs/russian-speaking`, `/tools/broker-check`. RU versions of the service pages.
- [x] RU tools (PR #26): `/ru/tools`, `/ru/tools/profit-per-mile`, `/ru/tools/new-mc-checklist`, `/ru/tools/compliance-alerts`, with hreflang pairs. Carrier lookup stays EN.
- [ ] RU versions of guides. Author pages (E-E-A-T).
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
