# Trucker HQ: Launch Runbook

Stack: Next.js 16 on Hostinger Node.js Web App, DNS/CDN/WAF on Cloudflare, Supabase, Resend, Twilio.
Canonical: `https://truckerhq.us` (apex, no www). Secondary: `truckerhqusa.com` (301 to canonical).
Values only the client or hosting can supply are `<PLACEHOLDER>`. Anything not verified is tagged "(verify in dashboard)".
Background and sources: `docs/audit/2026-10-28/launch.md`, `performance.md`, `llm-geo.md`, `seo.md`.

Order matters: 0 -> 1 -> 2 -> 3 (temp domain smoke test) -> 4 -> 5 -> 6/7/8 -> 9 (go live) -> 10 -> 11.

---

## 0. Prerequisites and accounts

- [ ] Client legal entity details: `<LEGAL_NAME>`, `<EIN>`, `<STREET_ADDRESS>`, `<CITY_ST_ZIP>`, `<USDOT>`, `<MC>`, `<DISPATCH_PHONE>`.
- [ ] Accounts created under the **client's** email/entity (dev invited as admin):
  - [ ] Cloudflare (Free plan is enough)
  - [ ] Hostinger: Business or Cloud Startup, 12+ months, US datacenter (Cloud preferred: `next build` needs 1-2 GB RAM)
  - [ ] GitHub repo `adry999/truckerhq`, branch `main`, CI required before merge
  - [ ] Supabase (Pro plan, see section 7)
  - [ ] Resend
  - [ ] Twilio (client name + EIN; used only in section 11)
  - [ ] Google (Search Console, GA4, Business Profile), Bing Webmaster, Yandex Webmaster
  - [ ] FMCSA webKey on the client's login.gov: https://mobile.fmcsa.dot.gov/QCDevsite/docs/getStarted
- [ ] Legal pages final (not "Outline only") and real address/phone in place. Required for 10DLC (section 11): `npm run check:placeholders -- --strict` returns 0 hits.
- [ ] CI green on `main` (lint, typecheck, test, build).
- [ ] Generate secrets now (keep in a password manager):
  ```sh
  openssl rand -hex 32   # -> CF_ORIGIN_SECRET (64 hex chars)
  ```

## 1. Domain purchase

- [ ] Register `truckerhq.us` with the **client's US company as registrant** (.us nexus rule: US entity or resident; fake or privacy-proxy registrant data can get the domain suspended). Use the real legal name and address.
- [ ] Register `truckerhqusa.com` (any registrant).
- [ ] Registrar choice: Cloudflare Registrar if it supports `.us` (verify in dashboard; it may not). Otherwise use Hostinger or another registrar and change nameservers in section 2.
- [ ] Enable registrar lock and auto-renew. Enable WHOIS contact verification (respond to the ICANN email within 15 days).

## 2. Cloudflare zones and nameservers

Repeat for both `truckerhq.us` and `truckerhqusa.com`.

- [ ] Cloudflare -> Add a domain -> Free plan. Let it scan, then delete any imported parking records.
- [ ] At the registrar, set the two nameservers Cloudflare shows (`<NS1>.ns.cloudflare.com`, `<NS2>.ns.cloudflare.com`).
- [ ] Wait until the zone shows "Active" (minutes to hours).
- [ ] `truckerhq.us` only: SSL/TLS -> Overview -> **Full (strict)** (set it after the origin cert is Active, section 4).
- [ ] SSL/TLS -> Edge Certificates: **Always Use HTTPS** on, **Automatic HTTPS Rewrites** on, Minimum TLS **1.2**, TLS 1.3 on, **HSTS OFF** (the app sends it, see 5.7).
- [ ] Enable **DNSSEC** (DNS -> Settings). Copy the DS record to the registrar if the registrar is not Cloudflare.
- [ ] Do not add AAAA records unless Hostinger gives an IPv6 for the app (a stray AAAA causes split routing).

## 3. Hostinger Node.js Web App and environment

Docs: https://docs.hostinger.com/node.js/overview-1/next, https://docs.hostinger.com/node.js/environment-variables

1. [ ] hPanel -> Websites -> Add website -> **Node.js Web App** -> connect GitHub, repo `adry999/truckerhq`, branch `main`.
2. [ ] Build settings: preset **Next.js**, Node **24.x**, install `npm ci`, build `npm run build`, output `.next`. Do not add `output: "standalone"` (Hostinger injects it; `next.config.ts` must stay an object export).
3. [ ] Disable Hostinger CDN for this site if offered (Cloudflare is the only CDN). (verify in dashboard)
4. [ ] **Before the first build**, set environment variables (hPanel -> Environment variables; bulk `.env` import works). They apply to build and runtime. `NEXT_PUBLIC_*` are baked at build, so changing them needs a redeploy.

| Variable | Needed | Value / source |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Required** | `https://truckerhq.us` (no trailing slash) |
| `NEXT_PUBLIC_INDEXABLE` | **Required** | `true` on production. Anything else = site-wide noindex (use that for the temp/staging domain) |
| `SUPABASE_URL` | **Required** | Supabase -> Settings -> API -> Project URL |
| `SUPABASE_SECRET_KEY` | **Required** | `sb_secret_...` (server only). Inserts use it, see section 7 |
| `SUPABASE_ANON_KEY` | Optional | Publishable key. Only needed while `SUPABASE_SECRET_KEY` is unset; leave blank once the secret key is set |
| `CF_ORIGIN_SECRET` | **Required** | The 64-hex secret from step 0. Must equal the Transform Rule header value (step 5.6) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | **Required** | Section 8 |
| `TURNSTILE_SECRET_KEY` | **Required** | Section 8. Without both Turnstile vars, forms work with no CAPTCHA (staging only) |
| `RESEND_API_KEY` | **Required** | Section 6. Without it no lead email goes out |
| `RESEND_FROM` | **Required** | `Trucker HQ <hello@truckerhq.us>` (verify the apex domain in Resend, see section 6) |
| `LEADS_NOTIFY_TO` | **Required** | `leads@truckerhq.us` (comma-separate for several inboxes). Without it leads only land in Supabase |
| `FMCSA_WEBKEY` | Recommended | Without it Carrier Lookup uses sample data |
| `NEXT_PUBLIC_GA_ID` | Recommended | GA4 Measurement ID `G-XXXXXXX` (baked at build) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Numeric Pixel ID (baked at build) |
| `ALLOWED_ORIGINS` | Temp only | Comma list, e.g. `https://<TEMP>.hostingersite.com`. **Remove after cutover** |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` | **Leave unset** until section 11 | Unset = SMS is skipped and logged; forms still succeed |

5. [ ] Deploy. Smoke test on the Hostinger temp domain (set `ALLOWED_ORIGINS` to it and leave `NEXT_PUBLIC_INDEXABLE` unset; a temp-domain build is noindex). Leave `CF_ORIGIN_SECRET` unset for this test because the temp domain does not pass through Cloudflare, then set it before cutover.
   - [ ] Pages render, a form saves a row in Supabase, lead email arrives, `/tools/carrier-lookup?q=...` works.
6. [ ] Build OOM fallback: build in GitHub Actions (`npm ci && npm run build`, Node 24, env vars as repo secrets for `NEXT_PUBLIC_*`), then upload the artifact (`.next/standalone` plus `public` and `.next/static`) to Hostinger. Upgrade to Cloud if it keeps happening.
7. [ ] Ask Hostinger support (unverified items): per-app RAM and OOM restart policy, log retention, whether deploy sends SIGTERM and waits, custom SSL upload on Node apps.

## 4. DNS records (Cloudflare, zone `truckerhq.us`)

**Order:** create web records **DNS-only (grey)**, attach the domain in hPanel, wait until Hostinger SSL shows **Active**, then switch the web records to **Proxied (orange)**. Mail records stay grey forever.

| Type | Name | Value | Proxy | Notes |
|---|---|---|---|---|
| A | `@` | `<HOSTINGER_APP_IP>` | grey -> **orange** after SSL Active | IP from hPanel -> website -> DNS/Details (verify in dashboard) |
| CNAME | `www` | `truckerhq.us` | grey -> **orange** | Needed so the www redirect rule can fire (step 5.1) |
| MX | `@` | `mx1.hostinger.com` prio 5 | DNS only | Hostinger Email |
| MX | `@` | `mx2.hostinger.com` prio 10 | DNS only | |
| TXT | `@` | `v=spf1 include:_spf.mail.hostinger.com ~all` | DNS only | **Only one SPF record at the apex.** Copy the exact include from hPanel -> Emails -> DNS records (verify in dashboard) |
| CNAME | `hostingermail-a._domainkey` | `<from hPanel>` | DNS only | Hostinger DKIM (3 records, `-a`, `-b`, `-c`) |
| CNAME | `hostingermail-b._domainkey` | `<from hPanel>` | DNS only | |
| CNAME | `hostingermail-c._domainkey` | `<from hPanel>` | DNS only | |
| MX | `send` | `feedback-smtp.<region>.amazonses.com` prio 10 | DNS only | Resend return-path. Copy exact value from Resend |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | DNS only | Resend SPF, subdomain only |
| TXT | `resend._domainkey.send` | `p=<KEY_FROM_RESEND>` | DNS only | Resend DKIM. Resend shows the exact name (it may be `resend._domainkey` if the domain is verified at the apex) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@truckerhq.us; fo=1; adkim=r; aspf=r` | DNS only | Start at `p=none` for 2-4 weeks, then `p=quarantine; pct=100`, later `p=reject` |
| TXT | `@` | `google-site-verification=<TOKEN>` | DNS only | Search Console domain property (section 10) |

- [ ] Remove any AAAA on `@`/`www` and any parking A record.
- [ ] `truckerhqusa.com` zone: `A @ 192.0.2.1` **Proxied** and `CNAME www truckerhqusa.com` **Proxied** (dummy origin; the redirect rule answers at the edge before the origin is contacted). It never sends mail, so add a null MX (`MX @ . prio 0`) and `TXT @ "v=spf1 -all"` plus `TXT _dmarc "v=DMARC1; p=reject"` so nobody can spoof it.
- [ ] After setup: DNS -> Export zone file; store it in the password manager or private repo.

## 5. Cloudflare rules (zone `truckerhq.us`)

Set these after the zone is Active and SSL is Active on the origin. Rule order matters where noted.

### 5.1 Hostname redirects
- [ ] Rules -> Redirect Rules -> Create rule "www to apex": 
  - Expression: `(http.host eq "www.truckerhq.us")`
  - Action: Dynamic, `concat("https://truckerhq.us", http.request.uri.path)`, status **301**, **Preserve query string** on.
- [ ] Zone `truckerhqusa.com` -> Redirect Rules "secondary to primary":
  - Expression: `(http.host eq "truckerhqusa.com") or (http.host eq "www.truckerhqusa.com")`
  - Action: Dynamic, `concat("https://truckerhq.us", http.request.uri.path)`, status **301**, **Preserve query string** on. Keeps the path.

### 5.2 Cache Rules (Caching -> Cache Rules; order top to bottom)
- [ ] **1. Bypass dynamic**: Expression `(starts_with(http.request.uri.path, "/api/")) or (starts_with(http.request.uri.path, "/tools/carrier-lookup"))`. Action: Bypass cache.
- [ ] **2. Static assets**: Expression `(starts_with(http.request.uri.path, "/_next/static/")) or (starts_with(http.request.uri.path, "/_next/image")) or (http.request.uri.path in {"/icon.svg"}) or (starts_with(http.request.uri.path, "/apple-icon")) or (http.request.uri.path contains "opengraph-image")`. Action: Eligible for cache; Edge TTL **Ignore cache-control and use 1 year** for `/_next/static/*` (files are content-hashed and immutable); for the others use "Use cache-control header if present". Browser TTL: respect origin.
- [ ] **HTML: do not "Cache Everything".** Prerendered HTML carries `s-maxage=31536000`, so edge-caching it would serve stale pages after a deploy. Decided for launch: no HTML caching rule. Optional later: a rule for HTML with **Edge TTL override 10 min** and a cache purge on every deploy (section 12).
- [ ] Caching -> Configuration: **Development mode off**; keep query string in cache key (default).

### 5.3 Configuration Rule (always-plain-200 files)
- [ ] Rules -> Configuration Rules: Expression `(http.request.uri.path in {"/robots.txt" "/sitemap.xml" "/llms.txt" "/llms-full.txt"})`. Action: Security Level **Essentially Off**, Browser Integrity Check **Off**.

### 5.4 WAF rate limit (Security -> WAF -> Rate limiting rules)
- [ ] Name "Lead API POST". Expression: `(http.request.method eq "POST" and starts_with(http.request.uri.path, "/api/"))`. Characteristics: IP. Limit: **10 requests / 10 seconds** (Free plan allows one rule with a 10 s period; verify in dashboard). Action: Block, duration 60 s (or Managed Challenge). The app also limits 5 per minute per IP per route.
- [ ] Custom rule (Security -> WAF -> Custom rules) "API non-POST": Expression `(starts_with(http.request.uri.path, "/api/") and not http.request.method in {"POST" "OPTIONS"})`. Action: Block.
- Decided: no country challenge on `/api/*` (part of the Russian-speaking audience may be abroad). Revisit only if spam comes from outside the US.
- [ ] Keep the Free Managed Ruleset on.

### 5.5 Bots and AI crawlers (do not skip; defaults silently block AI search bots)
- [ ] Security -> Bots -> **Bot Fight Mode: OFF** (it challenges unverified fetchers such as ChatGPT-User, and cannot be tuned).
- [ ] Security -> Bots / AI Crawl Control -> **Block AI bots: OFF** (it is on by default for new zones; it 403s ClaudeBot, PerplexityBot, GPTBot, CCBot at the edge). If left on, per-crawler **Allow**: OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Googlebot, Bingbot, Applebot, Google-Extended. (verify in dashboard, menu names change)
- [ ] **Pay Per Crawl: off / not enrolled** (enrolled zones return 402 to crawlers).
- [ ] **Managed robots.txt: OFF**. The app serves its own `src/app/robots.ts` (allows `/`, disallows `/tools/carrier-lookup?`, lists AI/search bots and the sitemap).
- [ ] **AI Labyrinth: OFF**.
- [ ] Speed -> Optimization: **Rocket Loader OFF**, **Mirage OFF**, Auto Minify off. Scrape Shield -> **Email Address Obfuscation OFF** (it rewrites `hello@` links and breaks hydration and crawler visibility).
- [ ] Verify with the UA tests in section 9.

### 5.6 Origin lock via Transform Rule
- [ ] Rules -> Transform Rules -> Modify Request Header -> Create "Origin secret". 
  - Expression: `true` (all requests; use `(http.host eq "truckerhq.us")` if you prefer)
  - Action: **Set static** header `x-origin-secret` = `<CF_ORIGIN_SECRET value>`.
- [ ] Same value in hPanel env `CF_ORIGIN_SECRET`, then redeploy/restart.
- Effect (`src/server/http/api-guard.ts`): `/api/*` POSTs without the matching header get 403, so direct-to-origin hits cannot forge `CF-Connecting-IP`. The app takes the client IP only from `cf-connecting-ip` (rate limit key).
- [ ] Note: after this, the Hostinger temp domain cannot POST to `/api/*` (no header). Use it only before cutover, or temporarily unset `CF_ORIGIN_SECRET`.

### 5.7 HSTS
- [ ] The app sends `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` from `next.config.ts`. Keep Cloudflare's HSTS toggle **OFF** to avoid a duplicate header.
- [ ] `includeSubDomains` means every subdomain must serve HTTPS. Do **not** submit to hstspreload.org until the site has been stable for several weeks (removal takes months).

### 5.8 Other
- [ ] Network -> HTTP/2, HTTP/3 on. Brotli automatic. Web Analytics optional.
- [ ] Turn on "Always Online" only if wanted; it does not cover POSTs.

## 6. Email

### 6.1 Hostinger mailboxes
- [ ] hPanel -> Emails -> attach `truckerhq.us`. Create `hello@`, `leads@`, `dmarc@` (and `dispatch@`, `jobs@` if the client wants them). Check the included mailbox count (verify in dashboard).
- [ ] Add the Hostinger MX/SPF/DKIM records from section 4 (grey cloud). Confirm in hPanel that records show as verified.
- [ ] Do not also enable Cloudflare Email Routing (one inbound provider per apex MX).

### 6.2 Resend (transactional, lead notification email)
- [ ] Resend -> Domains -> Add `send.truckerhq.us`, region **us-east-1**. Add the records it shows (section 4 `send` MX, `send` SPF TXT, DKIM TXT). Cloudflare: all **DNS only**. Click Verify.
- [ ] Why a subdomain: the Resend return-path and SPF live on `send.`, so the apex keeps exactly one SPF record (Hostinger) and its reputation stays separate. Verifying the apex instead is possible, but then DKIM sits on `resend._domainkey.truckerhq.us` and the apex SPF must not be duplicated (Resend uses `send.` for its own SPF anyway). Subdomain is the recommended default.
- [ ] Set in hPanel: `RESEND_API_KEY=<re_...>` (sending-access key restricted to this domain), `RESEND_FROM="Trucker HQ <hello@truckerhq.us>"` (verify the apex domain truckerhq.us in Resend; its bounce MX/SPF land on `send.` and DKIM on `resend._domainkey`, so they do not clash with Hostinger mail on the apex). Replies go to Hostinger only if you set a reply-to; keep `hello@truckerhq.us` in the email body.
- [ ] `LEADS_NOTIFY_TO=leads@truckerhq.us`.
- [ ] Redeploy, submit a test lead on the live site, confirm the email arrives (check spam).
- [ ] Test deliverability: send from a mailbox to https://www.mail-tester.com (target 9+/10) and check headers show `spf=pass dkim=pass dmarc=pass`.

### 6.3 DMARC
- [ ] Start `p=none` with `rua=mailto:dmarc@truckerhq.us`. Optionally use Cloudflare DMARC Management (Email -> DMARC Management) to parse reports.
- [ ] After 2-4 weeks of clean reports: `p=quarantine; pct=100`; later `p=reject`.

## 7. Supabase (production)

- [ ] Create a **separate prod project**, region **us-east-1**, **Pro plan** (daily backups; Free pauses inactive projects and has no downloadable backups; verify plan terms).
- [ ] Apply migrations from `supabase/migrations` (the directory is being added; confirm it exists in `main` before running):
  ```sh
  npx supabase login
  npx supabase link --project-ref <PROD_PROJECT_REF>
  npx supabase db push
  ```
- [ ] Confirm `.env.example` project ref (`wjpdghtxhmqnvbpobtjn`) is dev or prod; do not point prod env at the dev project by mistake.
- [ ] Settings -> API Keys: copy the **secret key** (`sb_secret_...`) into hPanel `SUPABASE_SECRET_KEY`; copy Project URL into `SUPABASE_URL`. Never expose the secret key to the browser (no `NEXT_PUBLIC_` prefix).
- [ ] Database -> Security Advisor: no SELECT/UPDATE/DELETE policies for `anon`; RLS enabled on every lead table.
- [ ] Give the client a dashboard member seat to read leads. Schedule a weekly CSV export (dashboard or cron).
- [ ] Verify after deploy: submit each of the six forms once and see rows in the tables.

## 8. Turnstile

- [ ] Cloudflare -> Turnstile -> Add widget. Hostnames: `truckerhq.us` and `localhost` (dev). Mode: Managed.
- [ ] Copy Site Key -> `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; Secret -> `TURNSTILE_SECRET_KEY` (hPanel). Site key is baked at build, so redeploy.
- [ ] If the browser console shows CSP reports for `challenges.cloudflare.com`, allow it in `script-src`, `frame-src`, `connect-src` (CSP is currently Report-Only; flip to enforcing after one clean week).
- [ ] Verify: submit a form on the live site; the widget renders and the lead saves. A POST without a valid token should be rejected (verify in the form handler).

## 9. Go-live and smoke tests

### 9.1 Cutover
- [ ] Section 3 temp-domain test passed.
- [ ] Add `truckerhq.us` as the custom domain in hPanel (DNS records still **grey**). Wait for Hostinger SSL = Active.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://truckerhq.us`, `NEXT_PUBLIC_INDEXABLE=true`, `CF_ORIGIN_SECRET`; remove `ALLOWED_ORIGINS`; redeploy (rebuild is required for `NEXT_PUBLIC_*`).
- [ ] Switch `@` and `www` to **Proxied**. SSL/TLS -> **Full (strict)**.
- [ ] Apply section 5 rules (Transform Rule last, after the env var is live, to avoid locking yourself out; if forms 403, compare both secrets).

### 9.2 curl checks (run from a shell outside the server)
```sh
# Redirects: expect a single 301 to https://truckerhq.us/dispatch?x=1
curl -sI "http://www.truckerhq.us/dispatch?x=1" | head -5
curl -sI "https://truckerhqusa.com/dispatch" | grep -i -E "^(HTTP|location)"

# robots: allows /, lists sitemap on the apex, no Cloudflare managed block
curl -s https://truckerhq.us/robots.txt
# sitemap: absolute https://truckerhq.us/ URLs only
curl -s https://truckerhq.us/sitemap.xml | grep -o "<loc>[^<]*" | head -5
curl -s https://truckerhq.us/sitemap.xml | grep -c "<loc>"
# llms.txt: 200 text/plain
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://truckerhq.us/llms.txt

# canonical + indexability: canonical is the apex, no noindex
curl -s https://truckerhq.us/dispatch | grep -o '<link rel="canonical"[^>]*>'
curl -s https://truckerhq.us/ | grep -i -o '<meta name="robots"[^>]*>' || echo "no robots meta (indexable)"
curl -sI https://truckerhq.us/ | grep -i -E "x-robots-tag|strict-transport|content-security|cf-cache-status"

# Forbidden without Origin (forged request): expect 403
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://truckerhq.us/api/contact \
  -H "content-type: application/json" -d '{}'
# Non-POST on API: expect 405 or Cloudflare 403
curl -s -o /dev/null -w "%{http_code}\n" https://truckerhq.us/api/contact

# Static assets cached at edge: second request should show cf-cache-status: HIT
curl -sI https://truckerhq.us/icon.svg | grep -i cf-cache-status
# /api and carrier lookup must not be cached: expect DYNAMIC or BYPASS
curl -sI "https://truckerhq.us/tools/carrier-lookup?q=1" | grep -i cf-cache-status

# AI and search bots must get 200 text/html (not 403, 402, or a "Just a moment" page)
for ua in "OAI-SearchBot/1.0; +https://openai.com/searchbot" "ChatGPT-User/1.0" "ClaudeBot/1.0" \
  "Claude-SearchBot/1.0" "PerplexityBot/1.0" "Bingbot/2.0" "Googlebot/2.1"; do
  printf '%-48s ' "$ua"; curl -s -o /dev/null -w '%{http_code} %{content_type}\n' -A "$ua" https://truckerhq.us/
done
# Same for the plain files
curl -s -o /dev/null -w "%{http_code}\n" -A "ClaudeBot/1.0" https://truckerhq.us/llms.txt
```
Note: spoofed UAs from your IP may still pass or fail differently from real verified bots. Also check Security -> Events for the last 7 days for "Block"/"Challenge" rows against those user agents.

### 9.3 Browser checks
- [ ] All six forms submit on the live domain (dispatch-start, apply, hire-drivers, contact, claim, compliance-alerts): row in Supabase, lead email arrives, no console errors, Turnstile renders.
- [ ] 404 page (EN and `/ru/nope`), consent banner loads, `/ru` pages OK.
- [ ] View source: JSON-LD, OG image URLs and `<link rel="alternate" hreflang>` all use `https://truckerhq.us`.
- [ ] Rich Results Test on `/`, `/dispatch`, a guide, a city page.

## 10. SEO submission

- [ ] **Search Console** (https://search.google.com/search-console): Add property -> **Domain** `truckerhq.us` -> copy the TXT (`google-site-verification=...`) to Cloudflare (section 4, DNS only) -> Verify.
- [ ] Sitemaps -> submit `https://truckerhq.us/sitemap.xml`. Check the discovered URL count matches the expected indexable set.
- [ ] URL Inspection -> Request indexing: `/`, `/dispatch`, `/ru`, `/ru/dispatch`, `/jobs`, `/hire-drivers`, `/tools/profit-per-mile`.
- [ ] Link Search Console to GA4.
- [ ] **Bing Webmaster Tools**: import from Search Console (one click) and submit the sitemap. Feeds ChatGPT search, DuckDuckGo, Yahoo.
- [ ] **Yandex Webmaster** (RU audience): verify via DNS TXT, submit the sitemap, set region USA.
- [ ] **IndexNow**: generate a key, serve `https://truckerhq.us/<KEY>.txt` containing the key (`public/<KEY>.txt`), then ping on each deploy:
  ```sh
  curl -s -X POST https://api.indexnow.org/indexnow -H "content-type: application/json" \
    -d '{"host":"truckerhq.us","key":"<KEY>","keyLocation":"https://truckerhq.us/<KEY>.txt","urlList":["https://truckerhq.us/"]}'
  ```
- [ ] **GA4**: property + web stream, `NEXT_PUBLIC_GA_ID` set (baked at build). Confirm Consent Mode v2 default is `denied` before `config`. Mark Key events: `dispatch_start_request`, `job_application`, `contact_message`, `hire_driver_post`, `compliance_alert_signup`, `carrier_profile_claimed`. Test with DebugView after accepting the banner.
- [ ] **Google Business Profile**: **service-area business** (address hidden, real registered address, not a PO box/virtual office). Primary category "Transportation service" or "Logistics service" (check offered categories). NAP must match the site exactly (`<LEGAL_NAME>`, `<STREET_ADDRESS>`, `<DISPATCH_PHONE>`). Website `https://truckerhq.us/?utm_source=gbp`. Complete verification (video or postcard). Add the profile URL to Organization `sameAs`.
- [ ] Citations: Bing Places (import from GBP), Apple Business Connect, LinkedIn, Facebook page, BBB.
- [ ] **Monitoring**: uptime monitor (UptimeRobot or Better Stack): `https://truckerhq.us/` keyword check, plus SSL expiry for the edge cert and the origin (check the origin cert expiry via hPanel too). Alerts to email + SMS.
- [ ] **Sentry** (when wired): `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN` (build only) in hPanel; alert on lead-save and email failures.
- [ ] After 7-14 days: Pages report for "Crawled, currently not indexed" and "Duplicate without user-selected canonical"; check hreflang errors. After one clean week flip CSP from Report-Only to enforcing.

## 11. Twilio SMS (A2P 10DLC): post-launch

Do this **after** go-live: the campaign form needs live privacy and terms URLs. Until approved, keep all `TWILIO_*` vars unset in hPanel.

- [ ] Prereqs live on `https://truckerhq.us`: final `/privacy` (must contain: "Mobile information will not be shared with third parties/affiliates for marketing or promotional purposes; text messaging originator opt-in data and consent will not be shared with any third parties."), final `/terms`, final `/sms-terms` (program names, message frequency, "Msg & data rates may apply", STOP/HELP, HELP contact phone + email, carrier liability line, link to privacy).
- [ ] Twilio console: buy a local US number (voice + SMS).
- [ ] Trust Hub -> Customer profile -> A2P brand: Standard or Low-Volume Standard with `<LEGAL_NAME>`, `<EIN>`, `<STREET_ADDRESS>` (must match IRS records).
- [ ] Create a Messaging Service, add the number, register the campaign (use case Mixed, or Customer Care + Account Notification). Inputs: sample messages (copy from `notifications.ts`), opt-in description with a form screenshot, Opt-in URL, Privacy URL `https://truckerhq.us/privacy`, Terms URL `https://truckerhq.us/terms`. Approval takes days to weeks. Fees: brand and vetting one-time plus a monthly campaign fee (verify current Twilio pricing).
- [ ] Console -> Messaging -> Settings -> **Geo permissions: United States only**. **SMS pumping protection: on**.
- [ ] Custom HELP reply (Advanced Opt-Out): `Trucker HQ: help at <DISPATCH_PHONE> or hello@truckerhq.us. Reply STOP to cancel.`
- [ ] After approval set in hPanel: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM=+1<NUMBER>`; restart (no rebuild needed, server-only). Test with a real handset: form -> SMS arrives, STOP then a second submit is blocked (Twilio error 21610), HELP returns the custom reply.
- [ ] Alternative if 10DLC stalls: toll-free number + Toll-Free Verification (needs EIN).

## 12. Rollback and operations

**Deploy**
- [ ] Merge to `main` only with CI green. Hostinger auto-builds on push. Expect a short 503/slow blip while the single process restarts (no documented zero-downtime). Deploy off-peak.
- [ ] After each deploy: purge Cloudflare cache (needed for any cached HTML or assets), run the section 9.2 checks for `/`, `/robots.txt`, and one form.
  ```sh
  # Cloudflare dashboard: Caching -> Configuration -> Purge Everything
  # or, with API token (Zone.Cache Purge):
  curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
    -H "Authorization: Bearer <CF_API_TOKEN>" -H "content-type: application/json" \
    --data '{"purge_everything":true}'
  ```
- [ ] Env var changes: `NEXT_PUBLIC_*` need a **rebuild** (redeploy); server-only vars (`SUPABASE_*`, `RESEND_*`, `TWILIO_*`, `CF_ORIGIN_SECRET`, `TURNSTILE_SECRET_KEY`) need only a **restart**.

**Restart and logs**
- [ ] hPanel -> website -> click the "Running" badge -> Restart.
- [ ] Logs: hPanel -> website -> Runtime logs (crashes, unhandled errors, missing env vars). Retention unknown (verify in dashboard), so do not rely on them for lead audit; Supabase rows and Sentry are the record.
- [ ] Resources: hPanel -> Resource Usage. If visitors get 503, check NPROC/RAM, "Stop running processes", then restart.

**Rollback**
- [ ] Code: in GitHub revert the bad merge (`git revert -m 1 <merge_sha>`; push to `main`), Hostinger rebuilds. Or in hPanel redeploy a previous commit if offered (verify in dashboard).
- [ ] Emergency maintenance: in Cloudflare, add a custom WAF rule that serves a block or redirect, or pause the proxy (grey cloud) only if the origin is healthy (this removes WAF/rate limit protection).
- [ ] Bad indexing: setting `NEXT_PUBLIC_INDEXABLE` to anything but `true` and redeploying makes the whole site noindex.
- [ ] Forms 403 after a change: check (a) `NEXT_PUBLIC_SITE_URL` matches the page origin, (b) `ALLOWED_ORIGINS` is empty or correct, (c) Transform Rule secret equals `CF_ORIGIN_SECRET`, (d) request goes through the proxy (orange cloud).
- [ ] Forms 429 for everyone: confirm `CF-Connecting-IP` is reaching the app (proxy on) and not a shared edge IP.
- [ ] SSL errors 525/526: origin cert expired or not matching; re-issue Hostinger SSL with the record temporarily grey, or temporarily set SSL mode to Full (not strict) while fixing.

**Scheduled**
- [ ] Weekly: Supabase CSV export. Monthly: DMARC reports, Search Console coverage, Hostinger SSL expiry.
- [ ] 2-4 weeks after launch: DMARC `p=quarantine`. Several stable weeks later: decide on HSTS preload.
- [ ] Domain renewals: calendar reminders 60 days before expiry for both domains.
