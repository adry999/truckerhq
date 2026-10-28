# Launch audit — 2026-10-28

Seven parallel audits (Opus: security, SEO, launch; Fable: code quality, LLM/GEO,
UI/UX, performance). Full reports in this folder; this file is the merged plan.

Target: Hostinger Cloud/Business (Node.js Web App) behind Cloudflare DNS/proxy,
Hostinger Email, domain not yet bought (`truckerhq.com` is taken — parked at Namecheap).

## Phase 0 — decisions / inputs from client (blocks everything)

- [ ] Domain choice + purchase (candidates free on 2026-10-28: thetruckerhq.com,
      truckerhqdispatch.com; optional truckerhq.us as 301 alias)
- [ ] Hostinger plan + US datacenter; Cloudflare account
- [ ] Real values: phone, dispatch fee, hire-drivers prices, USDOT/MC, legal entity, address, founder/team
- [ ] Lawyer-reviewed Privacy (cookies + CPRA + SMS no-share), Terms, SMS Terms
- [ ] Supabase prod project (Pro for backups); who views leads
- [ ] Lead notification recipient(s) (`LEADS_NOTIFY_TO`)
- [ ] Twilio A2P 10DLC (needs live privacy/terms URLs → register after launch; SMS off until approved)
- [ ] Turnstile keys; RU SMS copy approval
- [ ] Sample data policy at launch: keep sample jobs/carriers/state stats (noindex) or remove

## Phase 1 — P0 code fixes (before first deploy)

Security
- [ ] Upgrade `next` to 16.4.3 + `npm audit fix` (RCE/SSRF/cache-poisoning advisories), add `npm audit` to CI — security.md
- [ ] `getClientIp`: trust `CF-Connecting-IP` only; reject requests without Cloudflare secret header (Transform Rule) — `src/server/http/api-guard.ts:47`
- [ ] Turnstile on 6 forms + server verify; require `Origin` on POST — `api-guard.ts:68`
- [ ] Block non-US NANP area codes (SMS pumping) — `src/shared/lib/phone.ts`; Twilio Geo Permissions US-only
- [ ] Supabase: server-only secret key, RLS on, no anon policies, migrations committed — security.md (SQL inside)

Hosting
- [ ] Single `NEXT_PUBLIC_SITE_URL` (+ `INDEXABLE`, `ALLOWED_ORIGINS`) replacing Vercel env + hardcoded domain in 7 files — `src/shared/config/site.ts`, launch.md §domain
- [ ] Lead email to team via Resend on every lead — `src/server/messaging/email.ts` (no callers today)
- [ ] Store SMS consent (text version, timestamp, IP, UA) per lead (TCPA)

SEO / content (indexing bad pages early hurts the whole domain)
- [ ] Noindex + remove from sitemap: 10 stub guides, 50 state pages with invented stats, 11 city job pages (until real data)
- [ ] Replace all placeholders; make `check:placeholders --strict` a CI gate
- [ ] Remove fabricated numbers ("48,210 carriers", "225 Openings", "Last checked 2 min ago")

UX
- [ ] Working `tel:` links + `call_click` event

## Phase 2 — P1 (launch week)

- SEO: keyword H1s/titles on money pages; Organization/WebSite/Service/Article JSON-LD graph; robots must not block noindexed `/dispatch/start` `/claim`; 404 titles; RU footer — seo.md
- GEO: robots.ts with explicit AI search bots allowed; `/llms.txt`; answer-first copy + "$N/truck/week" sentence; prose + FAQ around tools — llm-geo.md
- Perf: hero images local + `priority`, render once; carrier-lookup Suspense + static landing; Cloudflare cache rules (bypass /api, immutable /_next/static, short HTML TTL + purge on deploy) — performance.md
- A11y/UX: `<main>` + skip link; `aria-invalid`/`aria-describedby` in `Field`; `inputMode`/`autoComplete`; RU wizard (`/ru/dispatch/start`) or no RU link into EN wizard; consent banner offset + re-open control; sticky mobile CTA — ui-ux.md
- Code: carrier score breakdown must sum to headline; RU SMS language passed through; GA duplicate pageview; vitest jsdom suites not starting locally (`vitest.config.mts`) — code-quality.md
- Durable SMS throttle (Supabase table, not memory); startup env validation + `/api/health`

## Phase 3 — infra go-live (order matters)

1. Buy domain → Cloudflare zone → nameservers at registrar
2. Hostinger Node.js app from GitHub (Node 24, `next` preset); set all env in hPanel **before first build** (`NEXT_PUBLIC_*` baked at build). If build OOMs, build in GitHub Actions and deploy artifact.
3. DNS records grey-cloud → Hostinger SSL active → orange-cloud; SSL Full (strict); www→apex 301; Bot Fight Mode / Rocket Loader off; AI crawl settings allow search bots
4. WAF rate limit POST `/api/*`; Transform Rule secret header
5. Hostinger Email: MX, one SPF, DKIM, DMARC `p=none` + rua (all DNS-only); Resend on `send.` subdomain
6. Search Console (DNS TXT) + sitemap, Bing import, Yandex for RU, IndexNow, GA4 conversions + Consent Mode, Google Business Profile (service-area)
7. Uptime monitor, Sentry, Supabase backups
8. After live: Twilio 10DLC registration → enable SMS env vars
9. HSTS: keep short max-age first weeks; preload only after stable

## Phase 4 — growth (post-launch SEO)

New pages: `/pricing`, `/dispatch/new-authority`, `/dispatch/{dry-van,reefer,flatbed,...}`,
`/jobs/russian-speaking`, `/tools/broker-check`, RU versions of tools + guides, author pages,
real per-state FMCSA census stats (best citeable asset). Write the 10 guides answer-first.
