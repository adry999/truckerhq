# TruckerHQ: Production Launch Plan (Hostinger Node.js + Cloudflare)

- Date: 2026-10-28. Repo `main` @ 1fcb0b3. Next.js 16.3.6, React 19.2.8, CI on Node 24.
- Scope: read-only review. No project files were changed.
- Client inputs so far:
  - Hosting is Hostinger **Business or Cloud web hosting**, using the managed Node.js Web App feature. A VPS is out, so it appears below only as a fallback.
  - DNS will be on Cloudflare, proxied.
  - The domain has **not been bought yet**. `truckerhq.com` is hardcoded but may not be available, so the final domain is TBD and is written `<domain>` below.
  - There is no existing site, so no 301 migration is needed.
  - Email will be Hostinger Email or Cloudflare Email Routing (both compared below).
- Next 16 docs read locally: `node_modules/next/dist/docs/01-app/02-guides/self-hosting.md`, `.../static-exports.md`, `.../03-api-reference/05-config/01-next-config-js/output.md`.

---

## 0. Domain: registration and the hardcoded domain

### 0.1 Registration: recommendation
| Option | Pros | Cons |
|---|---|---|
| **Hostinger** (free first year with Business, Cloud Startup/Professional/Enterprise on a 12-month or longer plan) | $0 for year 1. Same account as hosting. | Renewal is at retail price (third parties say about $20/yr for .com). You must switch the nameservers to Cloudflare by hand (simple). Hostinger auto-DNS for email/hosting then no longer applies, so every record is entered in Cloudflare. |
| **Cloudflare Registrar** | At-cost renewals (about $10.4/yr for .com; the registry fee reportedly rises to $10.97 on 2026-11-01). Nameservers are Cloudflare from day 1. Free DNSSEC. | Domain must use Cloudflare nameservers (fine, since that is the plan). Hosting and email DNS records are all manual (same as above anyway). Costs money in year 1. |

**Recommendation:** register at **Cloudflare Registrar**. DNS is going to Cloudflare regardless, so it saves the nameserver-change step and avoids retail renewals.
- If the client wants the free year, buy at Hostinger, then change nameservers to Cloudflare on day 1. Optionally transfer the registration to Cloudflare after 60 days, because ICANN locks transfers for 60 days after registration.
- **Prefer .com.** The audience is US owner-operators and small fleets. They type and trust .com, and phone and SMS readability matters ("truckerhq dot com"). Avoid .io/.co/.net unless .com is unobtainable.
- Also register the closest typo or alternative if cheap, and redirect it.
- Sources:
  - Hostinger free domain: https://www.hostinger.com/support/?p=631
  - Cloudflare Registrar at-cost / CF nameservers: https://www.cloudflare.com/products/registrar/
  - Pricing: https://costgoat.com/pricing/cloudflare-domains

### 0.2 Every place the domain is hardcoded (non-test `src/`)
| File:line | What |
|---|---|
| `src/shared/config/site.ts:3` | `process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "truckerhq.com"` gives `SITE_URL` and `INDEXABLE`. This is **the** central value, but it keys off a Vercel-only env var. |
| `src/server/http/api-guard.ts:17-21` | Origin allow-list hardcodes `https://truckerhq.com` and `https://www.truckerhq.com`, plus `VERCEL_URL` and `VERCEL_BRANCH_URL`. |
| `src/server/env.ts:17` | `RESEND_FROM` default `Trucker HQ <hello@truckerhq.com>` |
| `src/features/contact/data/about.ts:3` | `CONTACT_EMAIL = "hello@truckerhq.com"`. Line 52 has the social handle `@truckerhq`. |
| `src/components/SiteFooter.tsx:29` | `hello@truckerhq.com` literal (duplicates `CONTACT_EMAIL`) |
| `src/components/LegalDocLayout.tsx:68` | `hello@truckerhq.com` plus the placeholder address |
| `src/shared/seo/og.tsx:239` | `truckerhq.com` text drawn into every OG image |

These consume `SITE_URL` and are correct once it is right: `metadata.ts:53` (metadataBase), `global-not-found.tsx:7`, `robots.ts:14`, `sitemap.ts:8`, `RootDocument.tsx:38` (Organization JSON-LD), `structured-data.ts:67` (breadcrumbs), `i18n/alternates.ts:28` (hreflang), `about/page.tsx:20`, and `guides/page.tsx:20`.

Tests also hardcode it: `api-guard.test.ts`, `env.test.ts`, `create-lead-handler.test.ts`, `structured-data.test.ts`, and `api/*/route.test.ts`.

**Recommendation [dev, P0]:** add one source of truth.
- `NEXT_PUBLIC_SITE_URL=https://<domain>` is inlined at build. It is safe for client and OG code.
- `site.ts` derives `SITE_HOST`, `SITE_URL`, and `CONTACT_EMAIL = hello@${SITE_HOST}`.
- `INDEXABLE` becomes `process.env.NEXT_PUBLIC_INDEXABLE === "true"`, set only on the production app.
- `api-guard` builds its allow-list from `SITE_URL`, its `www.` variant, and `ALLOWED_ORIGINS` (comma list, for Hostinger's temporary/preview domain).
- Drop `VERCEL_*`.
- The footer, legal layout, OG image and `RESEND_FROM` default all read from config.
- Add a `check:placeholders` pattern or test that fails if the literal `truckerhq.com` appears outside `site.ts`.
- Swapping the domain then means changing one env var and rebuilding.

**Why this is P0, not cosmetic:** off Vercel, `VERCEL_URL` and `VERCEL_BRANCH_URL` are unset.
- On Hostinger's temporary domain and PR previews, the browser sends `Origin: https://<temp>.hostingersite.com`, which is not in the allow-list. **Every form returns 403.**
- Previews also become `INDEXABLE`, because the host falls back to `truckerhq.com`, which is not `.vercel.app`.

---

## 1. Hostinger hosting

### 1.1 What can run this app
The app needs a Node.js server:
- 6 POST route handlers in `src/app/api/*`.
- `after()` for SMS.
- Dynamic SSR at `/tools/carrier-lookup?q=`, which calls FMCSA live using `searchParams`.
- `next.config` `headers()` (CSP and HSTS).
- `next/image` optimization (Unsplash remote).

| Hostinger product | Viable? | Notes |
|---|---|---|
| Single / Premium web hosting (PHP shared) | **No** | No Node process, so only a static `out/` upload is possible. See 1.2. |
| **Business web hosting** | **Yes** | Node.js Web Apps: 5 apps, NPROC 120, 60 entry processes. RAM is plan-wide; 3 GB is shown on some regional pages, and the figure varies by plan version. |
| **Cloud Startup / Professional / Enterprise / Enterprise Plus** | **Yes (preferred)** | 10 apps, NPROC 200/400/600/800, entry processes 100/200/300/400. Cloud Startup is listed at about 4 GB RAM and 4 cores. Dedicated resources, so more headroom for `next build`. |
| Agency hosting | No | Static front-ends only. |
| VPS | Fallback only (client ruled it out) | See 1.6. |

Hostinger Node.js Web App facts (verified 2026-10-28):
- **Node versions:** 18.x, 20.x, 22.x, 24.x.
  - **Pick 24.x** to match CI (`.github/workflows/ci.yml` uses node 24).
  - Hostinger's Next page requires Node 20 or newer; Next 16 requires 20.9 or newer.
- **Deploy:** GitHub (authorize, choose repo/branch; auto-build on every push; PR previews) or zip upload.
  - One GitHub account per hosting plan.
  - A *private* repo needs the account connection; a URL-only deploy works only for public repos.
- **Builds run on Hostinger** using the build settings you pick. "npm commands ... cannot be run through SSH."
- **Next.js preset:** application type `next`, build script `build`, output directory `.next`, entry file ignored.
  - **Hostinger injects `output: "standalone"` itself.** It wraps your `next.config.(js|mjs|ts|mts)` with a generated config and starts the bundled standalone server.
  - Config must **export an object, not a function.** Ours (`next.config.ts`, object export, Next 16) is compatible.
  - `next.config.cjs` would be ignored silently.
  - `output: 'export'` is overridden, so static mode is not supported on the Node app.
  - ISR and image optimization work without config.
- **Env vars:** set in hPanel (single or bulk `.env` import). They are injected into **both build and runtime** and persist across deploys.
  - `NEXT_PUBLIC_*` values are inlined at build time, so set them before the first build and redeploy after changing them.
- **Limits:**
  - Each request is killed after **120 s**.
  - No inbound WebSockets.
  - Always-on background workers or timers stop on deploy or restart; use cron instead.
  - One long-running process per site, sharing the plan's NPROC and RAM.
  - When NPROC or RAM is exhausted, visitors get 503.
- **Ops:**
  - Runtime logs are in the dashboard: crashes, unhandled errors, missing env vars, EADDRINUSE.
  - Restart: click the "Running" badge, then Restart.
  - CPU/RAM/I/O graphs are on Resource Usage; "Stop running processes" is the fix for 503s.
  - Log retention and auto-restart-on-OOM policy are **not documented**. Ask Hostinger support.
- Sources:
  - https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger
  - https://www.hostinger.com/support/1583661-is-node-js-supported-at-hostinger/
  - https://docs.hostinger.com/node.js/overview-1/next
  - https://docs.hostinger.com/node.js/build-settings
  - https://docs.hostinger.com/node.js/environment-variables
  - https://www.hostinger.com/support/?p=21141 (limits table)
  - https://www.hostinger.com/support/?p=8362 (runtime logs)
  - https://www.hostinger.com/support/6976044-parameters-and-limits-for-hosting-plans

### 1.2 Why plain shared (static export) is NOT viable: what breaks
Per `static-exports.md` ("Unsupported Features"), `output: "export"` would break all of the following:
- **All 6 lead APIs** (`/api/apply`, `/api/claim`, `/api/compliance-alerts`, `/api/contact`, `/api/dispatch-start`, `/api/hire-drivers`). These are "Route Handlers that rely on Request", so **no leads are saved and no SMS is sent.**
- **Carrier Lookup live search.** The page awaits `searchParams` and calls FMCSA server-side with the secret `FMCSA_WEBKEY`. It could only be static sample data, and the webKey cannot be used client-side.
- **`headers()` in `next.config.ts`:** CSP-Report-Only, HSTS, X-Frame-Options and others are dropped. They could be partly recreated in Cloudflare Transform Rules.
- **`next/image` default loader:** the build errors unless every image is `unoptimized` or uses a custom loader.
- **`after()`**, **Proxy**, redirects/rewrites, and **dynamic routes without `generateStaticParams`**.
- Supabase, Twilio and FMCSA secrets would have nowhere safe to live.

### 1.3 Hostinger Node app: recommended configuration
1. **[client]** Buy Business or (preferred) **Cloud Startup**, 12 months or longer.
   - Cloud has dedicated RAM, which matters for `next build` (Turbopack; expect 1-2 GB peak) running on the same plan as the live app.
2. **[dev]** hPanel → Websites → Add → **Node.js Web App** → Connect GitHub `adry999/<repo>`, branch `main`.
   - Framework `next`, Node **24.x**, build `npm run build` (install `npm ci`), output `.next`.
3. **[dev]** Leave our config as is; do not add `output: "standalone"` ourselves, since Hostinger injects it.
   - Optional: adding `output: "standalone"` locally is harmless and lets us reproduce Hostinger's artifact (`node .next/standalone/server.js`, honors `PORT`/`HOSTNAME`). Do it only if we also want the VPS/Docker fallback.
4. **[dev]** Set all env vars (section 5.1) in hPanel **before** the first deploy, then deploy.
5. **[dev]** Use Hostinger's temporary domain for smoke tests.
   - This requires the `ALLOWED_ORIGINS` fix from 0.2; otherwise forms 403.
   - Set `NEXT_PUBLIC_INDEXABLE` unset or false there.
6. **[dev]** Attach the custom domain.
   - Hostinger's flow: the domain must be added to this Web App website. Subdomains are separate websites, not folders.
7. **[dev]** **Disable Hostinger CDN** for the site if it is offered, to avoid a double CDN with Cloudflare. Rely on Cloudflare.
8. **Deploy safety.** Hostinger restarts the single process on deploy, and Hostinger documents no zero-downtime guarantee, so expect a brief blip of 503 or slow responses.
   - Mitigations:
     - Deploy from `main` only after CI is green. Use branch protection, and optionally a `production` branch that Hostinger watches, fast-forwarded by a GitHub Action after CI passes.
     - Deploy at low-traffic hours.
     - Cloudflare "Always Online" does not cover POSTs.
   - `after()` callbacks are drained on SIGTERM per the Next docs, so SMS from in-flight requests should complete. Whether Hostinger's restart sends SIGTERM and waits is undocumented; ask.
9. **Memory/process hygiene:**
   - The in-memory rate limiter (`api-guard.ts`, capped at 1000 keys) and SMS throttle (`sms-throttle.ts`) are small.
   - Watch `next/image` (sharp) memory on glibc, per the self-hosting doc.
   - With a single process, the in-memory limits behave *better* than on Vercel, though they reset on every deploy or restart.
10. **Build-on-server risk:** if builds OOM on Business, upgrade to Cloud.
    - Zip upload still builds on Hostinger, so it is not a workaround.

### 1.4 Real client IP behind Cloudflare and Hostinger: P0 code fix
`getClientIp()` (`api-guard.ts:47-57`) checks `x-vercel-forwarded-for`, then `x-real-ip`, then the first `x-forwarded-for` entry.
- Off Vercel, behind Cloudflare and Hostinger's front proxy, `x-real-ip` is most likely the **Cloudflare edge IP**. All visitors routed through the same PoP then share one 5-requests-per-minute bucket per route, giving **false 429s on lead forms** at modest traffic.
- The first `x-forwarded-for` entry is client-spoofable.

**[dev, P0]** Prefer `cf-connecting-ip`, then fall back. This header is trustworthy only if traffic must come through Cloudflare. Hostinger shared/cloud plans cannot firewall to Cloudflare IP ranges, so add an **origin lock**:
- A Cloudflare **Transform Rule** (Modify Request Header) adds `x-origin-auth: <secret>` to all requests.
- The app checks it in `guardLeadRoute`, or in a `proxy.ts` for all routes.
- The secret is set as `ORIGIN_AUTH_SECRET` in hPanel.
- Effect: requests that hit the origin IP or the Hostinger temp domain directly are refused for `/api/*`, or the gate covers everything after launch.

Docs:
- https://developers.cloudflare.com/fundamentals/reference/http-headers/
- https://developers.cloudflare.com/rules/transform/request-header-modification/

### 1.5 GitHub Actions (managed Hostinger)
Hostinger builds from GitHub itself, so our Actions only gate.
- Keep `ci.yml` (lint, typecheck, test, placeholders, build) as required checks on `main`.
- Add `check:placeholders -- --strict` to CI once client values arrive.
- Optional `release.yml`, triggered by a push to `main` with CI succeeded: fast-forward the `production` branch. Hostinger watches `production`.
```yaml
on: { workflow_run: { workflows: [CI], types: [completed], branches: [main] } }
jobs:
  promote:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    permissions: { contents: write }
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0, ref: main }
      - run: git push origin HEAD:production
      - run: sleep 240 && curl -fsS https://<domain>/api/health   # smoke after Hostinger rebuild
```
- Remove `.vercel/` (holds `project.json`; already gitignored?) and delete the Vercel project after cutover, so previews stop being public.

### 1.6 VPS fallback (only if Hostinger limits bite)
- Use Ubuntu 24.04 with Node 24 (nodesource) and the app built with `output: "standalone"`.
- `cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/`, run with `PORT=3000 HOSTNAME=127.0.0.1 node server.js` under **systemd**, or PM2 cluster 1.
- nginx in front:
  - `proxy_pass http://127.0.0.1:3000`.
  - `proxy_buffering off` for streaming, per the Next self-hosting doc.
  - `real_ip_header CF-Connecting-IP` with the Cloudflare `set_real_ip_from` ranges.
  - Firewall 443 to Cloudflare IPs only.
- Zero-downtime: release dirs `/srv/app/releases/<sha>`, `current` symlink, two systemd instances on :3000/:3001 with an nginx upstream switch, or `pm2 reload`.
  - Graceful SIGTERM drains `after()`.
  - Set `deploymentId` for version-skew protection.
- GitHub Actions: build on runner, rsync the artifact, swap the symlink, restart, curl health.
- Docker is equally fine: `node:24-alpine` with the standalone image.
- Hostinger's documented VPS route is the CloudPanel template.

---

## 2. Cloudflare

### 2.1 Zone setup
1. **[client/dev]** Add the site to Cloudflare (Free plan is sufficient at launch).
   - If the domain was registered at Hostinger: hPanel → Domains → Nameservers, set the 2 Cloudflare nameservers.
   - If registered at Cloudflare: nothing to do.
   - Enable **DNSSEC** in Cloudflare. If the registrar is Hostinger, add the DS record there.
2. **DNS records for web (proxied):**
   - `A @ → <Hostinger web app IP from hPanel>` Proxied.
   - `CNAME www → <domain>` Proxied.
   - **No AAAA** unless Hostinger gives an IPv6 for the app. A stray AAAA causes split routing; a Hostinger/Cloudflare thread shows this.
   - One A record per name.
   - Hostinger: https://www.hostinger.com/support/5613445-how-to-fix-a-failed-lifetime-ssl-installation-in-hostinger/
3. **SSL/TLS:**
   - Mode **Full (strict)**: the origin must present a publicly trusted or Cloudflare Origin CA certificate matching the hostname.
   - Hostinger's free SSL is issued while the record is **DNS-only**. Issue it grey-clouded, wait until it shows "Active", then turn the proxy on, per Hostinger's own guidance.
   - **Risk:** auto-renewal behind the proxy may fail.
     - Preferred: if hPanel allows a custom SSL on the Node app site, install a **Cloudflare Origin CA** cert (15 years, RSA PEM, covers `<domain>` and `*.<domain>`).
     - Otherwise keep Hostinger SSL and monitor expiry. Cloudflare does not send Origin CA expiry notices either.
   - Docs:
     - https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/
     - https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/
   - Edge settings: **Always Use HTTPS** on, **Automatic HTTPS Rewrites** on, **Min TLS 1.2**, TLS 1.3 on.
4. **HSTS:** the app already sends `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` from `next.config.ts`, and Cloudflare passes it through.
   - Leave Cloudflare's own HSTS toggle **off** to avoid a duplicate or conflicting header.
   - `includeSubDomains` means **every** subdomain (`send.`, `mail.`, future `app.`) must be HTTPS-only forever in browsers that saw the header. Mail-only records (MX/TXT) are unaffected.
   - Do **not** submit to hstspreload.org until the domain has been stable for weeks; removal takes months.
   - Consider shipping `max-age=31536000; includeSubDomains` without `preload` for the first month, then adding it.
   - Never test on the bare temporary domain with HSTS from a different apex.
5. **www → apex redirect:** Rules → Redirect Rules → "Redirect from WWW to root" template.
   - `http.host eq "www.<domain>"` → 301 to `concat("https://<domain>", http.request.uri.path)`, preserve query string.
   - https://developers.cloudflare.com/rules/url-forwarding/single-redirects/
6. **Cache Rules** (Cloudflare does not cache HTML by default):
   - `starts_with(http.request.uri.path, "/api/")` → **Bypass cache**.
   - `starts_with(http.request.uri.path, "/_next/static/")` → Eligible for cache, Edge TTL "respect origin". Next sends `public, max-age=31536000, immutable`. Browser TTL respect origin.
   - `/_next/image` → eligible, respect origin (honors `minimumCacheTTL`).
   - Do **not** "cache everything" on HTML. Dynamic pages send `private, no-store`, and `/tools/carrier-lookup?q=` must not be cached.
   - https://developers.cloudflare.com/cache/how-to/cache-rules/
7. **WAF / rate limiting:**
   - Free plan: 1 rate-limiting rule, 10 s period, keyed per IP (third-party summaries; confirm in dash).
   - Rule: `http.request.method eq "POST" and starts_with(http.request.uri.path, "/api/")`, more than 10 requests per 10 s per IP → Block 60 s or Managed Challenge.
   - Add a custom WAF rule: block `/api/*` non-POST methods except OPTIONS.
   - Optional country rule on `/api/*`: the audience is the US plus a Russian-speaking US diaspora, so challenge only, not block. Ask the client.
   - Free Managed Ruleset is on by default.
   - https://developers.cloudflare.com/waf/rate-limiting-rules/
8. **Turnstile (forms, P0 from audit Q4):**
   - Create a widget for `<domain>`, plus the temp domain for testing → site key and secret.
   - Not yet in code. **[dev]** Add the widget to the 6 forms and verify server-side (`https://challenges.cloudflare.com/turnstile/v0/siteverify`) in `guardLeadRoute`, before the insert and SMS.
   - Extend CSP with `https://challenges.cloudflare.com` in `script-src`, `frame-src` and `connect-src`.
   - Keys are pending from the client, or dev can create them in the client's Cloudflare account.
   - https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
9. **Bots and crawlers:**
   - Free **Bot Fight Mode** challenges automation without a verified-bot exemption. **Keep it OFF**; it reportedly 403s legitimate crawlers and has hurt Google rankings.
   - Check Security → Bots → "**Block AI bots**" / AI Crawl Control. Leave it **off** (or "Allow") if the client wants visibility in ChatGPT, Perplexity or Google AI Overviews.
   - Do not enable Cloudflare's managed robots.txt "disallow AI training", unless the client chooses to opt out of training only.
   - The app's own `robots.ts` allows `/`.
   - Search-engine verified bots are not part of the AI-bots rule.
   - Sources:
     - https://developers.cloudflare.com/bots/concepts/bot/
     - https://developers.cloudflare.com/bots/reference/verified-bot-categories/
10. **Real client IP:** use `CF-Connecting-IP` plus the origin-lock Transform Rule (1.4). Do not enable "Add visitor location headers" unless needed.
11. **Other settings:**
    - Brotli is automatic.
    - **Rocket Loader OFF**: it breaks React hydration and inline consent/gtag ordering.
    - Auto Minify is deprecated.
    - Early Hints optional.
    - Email Address Obfuscation **OFF**: it rewrites HTML and causes hydration mismatches on `hello@` links.
    - Web Analytics is optional (cookieless; no consent needed).

---

## 3. Email

### 3.1 What the code does today with leads
- Every form posts to `/api/*`, which runs `insertRow()` into Supabase (insert-only RLS: "can write leads but can never read them back").
- Then `after()` sends an **SMS to the lead** (dispatch-start, apply, compliance-alerts only).
- **No one on the team is notified.**
  - Leads are visible only by opening the Supabase dashboard.
  - `sendEmail()` (Resend) exists in `src/server/messaging/email.ts` but has **no caller**.
- For a "dispatcher calls you within 15 min" promise (SMS copy in `notifications.ts:18`), this is a launch blocker.

**Recommendation [dev, P0]:** in `createLeadHandler`, add a `notifyTeam` step to `after()`.
- Send a Resend email to `LEADS_NOTIFY_TO` (e.g. `leads@<domain>`, a group or distribution in the mailbox), with subject `[Lead] Dispatch – 3 trucks – Dallas, TX`, a plain table of fields, and a `reply-to` unset.
- Optional extra: a Twilio SMS to an internal on-call number for dispatch-start, or a Slack/Telegram webhook.
- Keep PII out of logs, which the existing redaction already does.
- Consider a nightly Supabase-to-CSV export or Supabase Studio read role for the client.

### 3.2 Mailbox options for people (hello@, leads@, dispatch@)
| | **Hostinger Email** (included with Business/Cloud; check mailbox count and whether free beyond year 1 in hPanel) | **Cloudflare Email Routing** (free) |
|---|---|---|
| Receive at @domain | Yes (IMAP mailboxes, webmail) | Yes, **forward-only** to Gmail or other existing inboxes |
| **Send as @domain** | **Yes** (SMTP, webmail, phone apps) | **No.** Replies come from the personal Gmail address. Gmail "Send mail as" needs an SMTP server for the domain, which Routing does not provide (sending needs Cloudflare's separate paid Email Service, or another SMTP). |
| MX at apex | `mx1.hostinger.com` (5), `mx2.hostinger.com` (10) | Cloudflare's `route1/2/3.mx.cloudflare.net` (added automatically) |
| Coexist with each other? | **No.** Both need the apex MX, and only one inbound provider can own `@<domain>` MX. Mixed MX loses mail. | Same. You could use Routing on a *subdomain* only, which is pointless here. |
| Coexist with Resend on `send.`? | Yes (separate subdomain MX/SPF) | Yes |
| Trust/compliance fit | A real business mailbox helps with Twilio 10DLC brand vetting (business email on the domain), Google Business Profile, carrier/broker credibility, and DMARC reports. | Fine for a solo founder at $0, but looks unprofessional when replying to carriers. |

**Recommendation: Hostinger Email.**
- It is already paid for in the plan.
- The team must *send* from @domain to reply to carriers and drivers.
- Forward-only Routing cannot do this.
- If they outgrow it, move to Google Workspace later (MX/SPF swap only).

Sources:
- https://www.hostinger.com/support/8671319-set-up-a-domain-for-hostinger-email-manually/
- https://support.hostinger.com/en/collections/2944645-email-dns-records
- https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/
- https://developers.cloudflare.com/email-routing/postmaster/
- https://developers.cloudflare.com/email-service/configuration/domains/

### 3.3 Exact DNS (Cloudflare zone). **All mail records are DNS-only (grey cloud)**; MX/TXT cannot be proxied, and DKIM CNAMEs **must** be DNS-only.
| Type | Name | Value | Notes |
|---|---|---|---|
| MX | `@` | `mx1.hostinger.com` prio 5 | Hostinger Email |
| MX | `@` | `mx2.hostinger.com` prio 10 | |
| TXT | `@` | `v=spf1 include:_spf.mail.hostinger.com ~all` | **The only apex SPF.** Resend does not go here: its envelope sender is `send.<domain>`. Copy the exact include from hPanel, since a third party lists a different value. |
| CNAME ×3 | `hostingermail-a._domainkey`, `-b`, `-c` | values shown in hPanel → Emails → DNS records | Hostinger DKIM (CNAME type). Grey cloud. |
| MX | `send` | `feedback-smtp.<region>.amazonses.com` prio 10 | Resend return-path (copy from Resend dashboard) |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | Resend SPF (subdomain) |
| TXT | `resend._domainkey` | `p=<key from Resend>` | Resend DKIM, d=`<domain>`, which aligns with DMARC |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@<domain>; fo=1; adkim=r; aspf=r` | Start at p=none for 2-4 weeks. Then `p=quarantine; pct=100`, later `p=reject`. Free rua parsers: Cloudflare DMARC Management (dash → Email → DMARC), Postmark, EasyDMARC. |
| TXT | `@` | `google-site-verification=...` | Search Console (domain property) |
| CNAME | per Bing | Bing verification (or import from GSC) | |

- No Twilio SendGrid is used, so no extra SPF include is needed.
- If Google Workspace replaced Hostinger, the apex SPF becomes `include:_spf.google.com` (still one record).
- Resend:
  - Domain: `<domain>`, with default return-path subdomain `send`.
  - `RESEND_FROM="Trucker HQ <notifications@<domain>>"`.
  - Resend region: us-east-1.
  - Sources:
    - https://resend.com/docs/dashboard/domains/introduction
    - https://resend.com/docs/knowledge-base/cloudflare
- Optional: an MTA-STS/TLS-RPT pair later. BIMI is not needed.

---

## 4. Twilio SMS compliance

### 4.1 What is in code
- **Outbound only.** Twilio REST is called with `From: TWILIO_FROM` (`sms.ts`), with no inbound webhook.
- SMS is sent for:
  - dispatch-start: confirmation plus call-back.
  - apply: application received.
  - compliance-alerts: alerts opt-in confirmation, with ongoing alerts implied.
- **Opt-in disclosure on forms:**
  - Present on `dispatch/.../CallStep.tsx:59`, `jobs/ApplyForm.tsx:91`, and `ComplianceAlertsForm`, with links to `/sms-terms`.
  - compliance-alerts requires `smsConsent: true` (`route.ts:21`).
- **Consent is not stored.** The `compliance_alert_signups` row has no consent field; dispatch and apply rows have none either.
  - **[dev, P1]** Store `sms_consent_at`, `consent_text_version`, IP (CF-Connecting-IP), UA and page URL per lead. This is your TCPA/10DLC audit trail. The FCC 1:1 consent rule is effective 2026-01-27 (per secondary source).
- **Message copy:**
  - Every message starts with "Trucker HQ:" and includes "Reply STOP to opt out" (good).
  - The dispatch SMS omits "from <phone>" while the phone is a placeholder (`PHONE_IS_PLACEHOLDER`).
  - **RU copy is pending approval.** The code is EN-only.
- **Throttle:** per-phone 10 min and global 30/hour, in memory (`sms-throttle.ts`). Plus the 5/min/IP route limit.
- **No Turnstile yet** (audit Q4 P0). SMS pumping risk remains until Turnstile is added.
- **`/sms-terms` page exists** but is "Outline only". For carrier review it should add:
  - Program name(s) and description per program (dispatch call-back texts, job application updates, compliance alerts).
  - Message frequency per program.
  - "Msg & data rates may apply".
  - STOP/HELP keywords.
  - **HELP contact (phone + email)**.
  - "Carriers are not liable for delayed or undelivered messages".
  - A link to the privacy policy.
- **Privacy policy must add:** "Mobile information will not be shared with third parties/affiliates for marketing or promotional purposes; text messaging originator opt-in data and consent will not be shared with any third parties." Carriers reject campaigns without it.
  - The current privacy page only says "We do not sell personal information."

### 4.2 Registration path
- **A2P 10DLC is required** to send to US numbers from a local 10-digit long code. This is the recommended path.
  - Brand: Standard, or Low-Volume Standard (EIN, legal name and address must match IRS). Sole-Proprietor brand only if no EIN.
  - Campaign use case: "Mixed" or "Customer Care" plus "Account Notification".
  - Campaign inputs: sample messages (copy from `notifications.ts`), opt-in flow description with a screenshot of the form disclosure, and the opt-in URL.
  - **Privacy Policy URL and Terms URL are required fields from 2026-06-30.** The pages must be live, final (not "Outline only") and on the real domain **before** submitting.
  - Put the number in a **Messaging Service** linked to the campaign. Either keep `From=<number>` or switch the code to `MessagingServiceSid` (recommended; one-line change).
  - Approval takes days to weeks; start as soon as the domain and legal pages are live.
  - TCR fees: brand about $4.50, vetting about $41.50, plus a monthly campaign fee (check Twilio pricing).
  - Sources:
    - https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-
    - https://www.twilio.com/docs/trust-hub/registrations
- **Alternative: Toll-Free number plus Toll-Free Verification.**
  - Messages are blocked until verified.
  - A business registration number (EIN) is now required.
  - Good if volume is low and the 10DLC brand is hard.
  - The STOP handling sits with the carrier and cannot be disabled.
  - Sources:
    - https://www.twilio.com/docs/messaging/compliance/toll-free/console-onboarding
    - https://www.twilio.com/en-us/blog/toll-free-verification-policy
- **STOP/HELP handling:**
  - Twilio's default opt-out handling auto-processes STOP/UNSTOP/HELP on long codes and blocks further sends (error 21610), so no inbound webhook is needed for compliance.
  - Configure a custom HELP reply in the Messaging Service, using Advanced Opt-Out (long code only, not toll-free): "Trucker HQ: help at <phone> or hello@<domain>. Reply STOP to cancel."
  - Mirror opt-outs to Supabase later via a status callback (P2).
  - Sources:
    - https://support.twilio.com/hc/en-us/articles/223134027-Twilio-Support-for-Opt-out-Keywords-SMS-STOP-Filtering
    - https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out
- **Quiet hours:** the auto-confirmation is immediate and user-initiated, so it is fine. Future compliance alerts should be sent 8am-9pm recipient local time.

---

## 5. Everything else for launch

### 5.1 Production env vars (hPanel → Environment Variables; build and runtime)
| Var | Req | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **new, P0** | `https://<domain>`. Replaces the `VERCEL_PROJECT_PRODUCTION_URL` logic. |
| `NEXT_PUBLIC_INDEXABLE` | **new, P0** | `true` only on prod |
| `ALLOWED_ORIGINS` | new, P1 | Hostinger temp/preview origins, comma-separated |
| `ORIGIN_AUTH_SECRET` | new, P1 | Matches the Cloudflare Transform Rule header |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | **P0** | Without them, every form returns 502 "Could not save" |
| `FMCSA_WEBKEY` | P1 | Otherwise Carrier Lookup uses sample data. That data is a defamation risk per audit Q2, so live data or a clear "sample" label is needed. |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` (or `TWILIO_MESSAGING_SERVICE_SID`) | P0 for SMS | Only after 10DLC/TFV approval; leave unset until then (code no-ops and logs) |
| `RESEND_API_KEY`, `RESEND_FROM` | **P0 (team lead alerts)** | Domain verified first |
| `LEADS_NOTIFY_TO` | new, P0 | e.g. `leads@<domain>` |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | new, P0 | |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | P1 | Build-time inlined |
| `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN` (build, sourcemaps) | P1 | |
| `NODE_ENV=production` | | Hostinger sets this; verify |
| remove `VERCEL_URL`, `VERCEL_BRANCH_URL` | | Drop from `env.ts` schema |

- `.env.local` exists locally. Never commit it; it is gitignored.
- Update `.env.example`: it mentions `vercel integration add resend`.

### 5.2 Supabase
- `.env.example` points at project `wjpdghtxhmqnvbpobtjn`. Confirm whether this is the dev or the prod project.
- **[dev/client, P0]** Use a **separate prod project** in region **us-east-1** (close to US users and Hostinger US datacenter; pick a Hostinger US DC too). Apply the same schema via migrations.
- RLS: the tables are insert-only for `anon` (good). Run Supabase Security Advisor and confirm:
  - no SELECT/UPDATE/DELETE policies for anon;
  - column-size CHECKs;
  - `phone` E.164 check.
- Consider moving off the anon key to a server-only **secret key**/service role on a dedicated insert function. That is optional, since the key is server-side only today.
- **Backups:** the Free plan pauses inactive projects and has no downloadable daily backups. Use **Pro** for daily backups (+PITR add-on if desired). Verify current plan terms.
- Also: a weekly CSV export to the client, and grant the client a dashboard seat with read access.
- Generate types (`supabase gen types`), per the TODO in `insert-row.ts:5`.

### 5.3 FMCSA
- Register a webKey under the **client's** login.gov (not a dev's).
- QCMobile has rate limits. The lookup is server-side with a 5 s timeout and is `disallow`ed in robots (good).
- Add caching for identical `q` (e.g. `revalidate`/`unstable_cache` 1 h) to limit calls (P2).

### 5.4 Analytics, consent, legal
- **GA4 + Meta Pixel:** wired via `Analytics.tsx` with Consent Mode default `denied`, honoring GPC (`consent.ts`).
  - Events: `dispatch_start_request`, `job_application`, `contact_message`, `hire_driver_post` (Meta `Lead`), `compliance_alert_signup`, `carrier_profile_claimed`.
  - DOT, MC, phone and name are blocked from Meta (good).
- **[dev]** In GA4, mark the 4 lead events plus `compliance_alert_signup` as **Key events**. Link Google Ads if used.
  - Meta: verify the domain via DNS TXT (Business Settings → Brand safety → Domains) and configure Aggregated Event Measurement.
  - Consider the server-side Meta CAPI later (P2).
- **Consent banner:**
  - Exists, with Accept/Decline. It loads nothing until accepted, and GPC means denied.
  - For **CCPA/CPRA**, Meta Pixel counts as "sharing" for cross-context behavioral ads.
    - Add a footer link "**Your Privacy Choices / Do Not Sell or Share**" that sets consent=denied.
    - Update the privacy policy, which currently says only "We do not sell personal information".
  - **RU audience:**
    - The `/ru` banner text appears to be EN only. Check `ConsentBanner` localization; the copy is hardcoded EN.
    - If the client targets residents *in Russia*, 152-FZ data localization applies (personal data of RU citizens must first be stored in RU), which this stack does not satisfy. Confirm the audience is the US-based Russian-speaking diaspora.
- **Legal pages:**
  - `/privacy`, `/terms`, `/sms-terms` all render the "Outline only ... lawyer" banner.
  - `LegalDocLayout.tsx:68` has the placeholder address "Street address, City, ST 00000".
  - These must be replaced with lawyer-reviewed text and the real legal entity and address. This is P0 and a prerequisite for 10DLC.
  - There are no RU legal pages; link RU users to the EN versions or translate.
  - Dispatch services may need a "not a broker" disclosure plus MC/USDOT (`about.ts:7-8` has `XXXXXXX`).

### 5.5 `npm run check:placeholders`: result (ran 2026-10-28): 25 hits, warn-only
- **Real placeholders (P0, client values):**
  - Phone: `src/shared/config/contact.ts:2-4` (`PHONE_DISPLAY/HREF/SCHEMA`). This also feeds JSON-LD and SMS copy.
  - Price **$XXX**:
    - `features/dispatch/ui/landing/DispatchHero.tsx:49`
    - `DispatchPricing.tsx:43`
    - `GrossComparison.tsx:74,77` (`$XX,XXX`)
    - `start-wizard/SummaryAside.tsx:22`
    - `features/home/ui/HomePricing.tsx:17,49`
    - `features/hire-drivers/ui/HireDriversPlans.tsx:16,41` (hire-drivers price is a separate value)
    - `features/profit/ui/ProfitCalculator.tsx:65` (fee note *and* the calculator default)
    - OG images `app/(en)/dispatch/opengraph-image.tsx:12-13` and `app/ru/dispatch/opengraph-image.tsx:15-16`
  - USDOT/MC: `features/contact/data/about.ts:7-8` (`XXXXXXX`).
  - Address: `features/contact/ui/AboutContact.tsx:40` (`City, ST 00000`) and `components/LegalDocLayout.tsx:69`.
  - Legal: `components/LegalDocLayout.tsx:40` ("Outline only").
- **False positives:** input `placeholder="(XXX) XXX-XXXX"` in `claim-wizard/DetailsStep.tsx:28`, `ComplianceAlertsForm.tsx:136` and `AboutContactForm.tsx:80`.
  - **[dev, P1]** Change these to `(555) 555-0100`-style hints, or make the script ignore `placeholder=` attributes, then switch CI to `--strict`.
- **The script misses:** "Street address, City" text (only `00000` matched), and the `@truckerhq` social handle (`about.ts:52`; is the handle registered?).

### 5.6 Monitoring, logs, backups
- **Health endpoint [dev, P1]:** add `src/app/api/health/route.ts` returning 200 plus the build SHA. Exclude it from the origin-auth gate or allow the monitor to pass it.
- **Uptime:** Better Stack or UptimeRobot (free). Monitor:
  - `https://<domain>/` (keyword check);
  - `/api/health`;
  - SSL expiry for both edge and origin. The origin cert is monitored by hitting the Hostinger temp domain or the origin directly.
  - Alerts to email and SMS.
- **Errors:** Sentry `@sentry/nextjs` with `instrumentation.ts` (Node runtime supported), sourcemaps upload at build (`SENTRY_AUTH_TOKEN` in hPanel). Use `beforeSend` to scrub phone numbers.
  - Alert on `[supabase]`/`[sms]`/`[email]` failure logs. These are console-only today; send them as Sentry messages.
- **Logs:** Hostinger runtime logs only, with unknown retention.
  - Lead failures must not depend on them: alert via Sentry.
  - Optional: Better Stack Logs via HTTP from a small logger wrapper.
- **Backups:**
  - Supabase Pro daily backups plus a weekly CSV export.
  - Code is in GitHub.
  - Export the Cloudflare zone file after setup (DNS → Export).
  - Hostinger Email: confirm the backup policy.

### 5.7 UX/SEO completeness
- 404/500 pages are present: `(en)/not-found.tsx`, `ru/not-found.tsx`, `(en)/error.tsx`, `ru/error.tsx`, `global-error.tsx`, `global-not-found.tsx` (`experimental.globalNotFound`).
  - Known gap: the RU 404 `<title>` comes from the layout.
- Favicon: `app/icon.svg` and `apple-icon.tsx` are present.
  - **No `manifest.ts`.** Add one (name, theme color, icons; P2).
  - `public/` still holds create-next-app leftovers (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`); delete them (P2).
- `sitemap.ts`, `robots.ts`, OG images and JSON-LD are all driven by `SITE_URL`, so fix 0.2 first.
- Audit P0s still to confirm:
  - **Q1** sample jobs indexed with JobPosting and build-time `datePosted`.
  - **Q2** invented carriers with "WARNING/INACTIVE" labels.
  - **Q3** fake "Verified owner" in claim / fake lookup match.
  - Check whether these were fixed in the merged P0 PR (#5). If not, they block launch.
- **Search Console:** add a Domain property via DNS TXT in Cloudflare and submit `/sitemap.xml`.
  - **Bing Webmaster:** import from GSC.
  - Request indexing of the key pages.
- **Performance:** CSP is still `Report-Only`. Watch the console for violations for a week after launch, then flip it to enforcing. Add the Turnstile and Sentry domains first.

---

## LAUNCH CHECKLIST (ordered)

**Phase A: decisions and accounts**
1. [client] P0. Choose and **buy the domain**. Prefer .com; Cloudflare Registrar recommended.
2. [client] P0. Buy Hostinger **Cloud Startup** (or Business), 12 months or longer, in a US datacenter.
3. [client] P0. Create a Cloudflare account and add the zone. If the domain is at Hostinger, change its nameservers to Cloudflare. Enable DNSSEC.
4. [client] P0. Provide real values: dispatch phone, dispatch fee per truck per week, hire-drivers plan prices, profit-calc example gross (`$XX,XXX`), USDOT/MC, legal entity name and street address.
5. [client] P0. Get lawyer-reviewed Privacy (with CPRA "sharing" and the SMS no-share clause), Terms, and SMS Terms.
6. [client] P0. Create a Supabase **prod** project (us-east-1, Pro plan) and invite dev.
7. [client] P1. Get an FMCSA webKey on the client's login.gov.
8. [client] P1. Create the GA4 property and Meta Pixel (client-owned).

**Phase B: code (before first prod deploy)**
9. [dev] P0. Centralize the domain: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_INDEXABLE`, `ALLOWED_ORIGINS`. Remove `VERCEL_*` (`site.ts`, `api-guard.ts`, `env.ts`, footer, legal layout, OG, tests).
10. [dev] P0. `getClientIp`: use `cf-connecting-ip` first, plus the origin-auth header check.
11. [dev] P0. Integrate Turnstile on 6 forms with server verify, and update CSP.
12. [dev] P0. Team lead notification email via Resend (`LEADS_NOTIFY_TO`) on every lead.
13. [dev] P0. Fill the placeholders once the client supplies them, make `check:placeholders` ignore input hints, and run it with `--strict` in CI.
14. [dev] P0. Confirm audit Q1-Q3 (sample jobs, fake carriers, fake verification) are resolved or labelled and noindexed.
15. [dev] P1. Store SMS consent evidence per lead (timestamp, text version, IP, UA). Supabase migration.
16. [dev] P1. Add the `/api/health` route; Sentry `instrumentation.ts`; a "Your Privacy Choices" footer link; localize the consent banner for `/ru`.
17. [dev] P1. Optionally switch Twilio to `MessagingServiceSid`. Update `.env.example` (drop Vercel references).
18. [dev] P2. Add `manifest.ts`, remove `public/` boilerplate SVGs, cache FMCSA lookups, optional CAPI.

**Phase C: infrastructure**
19. [dev] P0. Hostinger: create the Node.js Web App from GitHub (`main` or `production`), Node 24.x, preset `next`, output `.next`.
20. [dev] P0. hPanel env vars (5.1), set before the first build. Deploy and smoke-test on the temp domain (forms save to Supabase, lookup works, headers present).
21. [dev] P0. Cloudflare DNS: `A @` → Hostinger IP, `CNAME www`, created **DNS-only** first. Attach the domain in hPanel, wait for Hostinger SSL "Active", then turn on the **Proxy**. Remove any stray AAAA.
22. [dev] P0. SSL mode **Full (strict)**, Always Use HTTPS, Min TLS 1.2. Install a Cloudflare Origin CA cert in hPanel if supported, else monitor Hostinger SSL renewal.
23. [dev] P0. Redirect rule www → apex (301). Cache rules: bypass `/api/*`, cache `/_next/static/*` and `/_next/image`.
24. [dev] P0. WAF rate-limit rule on `POST /api/*`; Transform Rule `x-origin-auth`; Bot Fight Mode **off**; AI crawlers allowed per client; Rocket Loader and Email Obfuscation **off**; Cloudflare HSTS **off** (app sends it).
25. [dev] P1. Disable Hostinger CDN for the site. Branch protection on `main` with CI required. Optional `production` promote workflow.
26. [dev] P1. Delete or pause the Vercel project and remove the `.vercel/` folder locally.

**Phase D: email**
27. [client] P0. Activate Hostinger Email; create `hello@`, `leads@` (or an alias) and `dmarc@`.
28. [dev] P0. DNS (grey cloud): Hostinger MX ×2, a single apex SPF, Hostinger DKIM CNAMEs ×3, `_dmarc` with p=none and rua. Test with mail-tester.com.
29. [dev] P0. Resend: add the domain, then `send` MX and TXT plus `resend._domainkey`. Verify, set `RESEND_FROM` and `RESEND_API_KEY`, and send a test lead email.
30. [dev] P1. After 2-4 clean weeks of DMARC reports, move to `p=quarantine`, later `p=reject`.

**Phase E: SMS**
31. [client] P0 (before SMS is enabled). Twilio account in the client's name with EIN. A2P 10DLC brand and campaign, which needs the live final privacy and terms URLs on the domain. Alternatively a toll-free number with verification.
32. [client] P0. Approve the RU SMS copy, or confirm EN-only SMS at launch.
33. [dev] P0. After approval: Messaging Service, custom HELP reply, then set the Twilio env and test STOP/HELP on a real handset. Until then leave Twilio env **unset** (code no-ops).

**Phase F: go-live and post-launch**
34. [dev] P0. Final smoke test on `https://<domain>`:
    - all 6 forms with Turnstile;
    - the Supabase row and team email arrive;
    - SMS if enabled;
    - 404/500 pages, robots and sitemap (absolute URLs on the new domain, no noindex);
    - JSON-LD and OG images show the new domain;
    - security headers, `curl -I` showing `cf-cache-status` for static and `DYNAMIC`/`BYPASS` for `/api`;
    - a rate-limit test.
35. [dev] P1. Search Console and Bing via DNS TXT; submit the sitemap. GA4 key events; Meta domain verification.
36. [dev] P1. Uptime monitors (home, health, SSL) and Sentry alerts live.
37. [dev] P1. After 1 week clean: flip CSP from Report-Only to enforcing.
38. [dev] P2. After stable for weeks: decide on the HSTS preload submission.

---

## QUESTIONS FOR CLIENT
1. Final domain name? Is `truckerhq.com` available, and is a backup name ready? Register at Cloudflare (recommended) or take Hostinger's free first year?
2. Which exact Hostinger plan: Business or Cloud Startup or higher? Which datacenter (US preferred)? Is there an existing Cloudflare account?
3. Real values:
   - dispatch phone (also the SMS "from" number? Same number for calls and texts is ideal; 10DLC allows voice on the same number);
   - dispatch fee per truck per week;
   - hire-drivers plan prices;
   - profit-calculator example gross;
   - USDOT and MC numbers;
   - legal entity name, EIN and street address;
   - social handles (`@truckerhq`?).
4. Who writes or reviews Privacy, Terms and SMS Terms (lawyer)? Any timeline?
5. Who should get new-lead alerts (emails, phones)? Is a Slack or Telegram channel wanted? What response-time SLA ("within 15 min" is in the SMS copy)?
6. Mailboxes needed: hello@, leads@, dispatch@, jobs@? Is the Hostinger Email included count enough? Is Google Workspace preferred later?
7. Twilio: existing account? 10DLC (EIN available?) or toll-free? Expected monthly SMS volume? Will future compliance-alert texts (ongoing) be sent, which is a separate campaign use case?
8. Is the RU SMS copy approved? Should Russian-language users get RU SMS at launch, or EN only?
9. Is the RU audience US-based Russian speakers only, or residents of Russia/CIS? The latter brings 152-FZ issues.
10. Should AI crawlers (ChatGPT, Perplexity, Google AI) be allowed, or should AI *training* be opted out of? Should `/api` be geo-restricted to the US?
11. Turnstile: can dev create the keys in the client's Cloudflare account?
12. Supabase: is `wjpdghtxhmqnvbpobtjn` dev or prod? Will the client pay for Pro (backups)? Who on the client side needs dashboard access to view leads?
13. GA4, Meta Pixel and Google Ads: are the accounts client-owned? Which conversions matter most (dispatch-start presumably)?
14. Sample data: are the jobs and carrier profiles real at launch, or will they stay labelled samples and noindexed (audit Q1-Q3)?
15. Is it OK to take a brief (seconds to about a minute) downtime on each deploy? Hostinger managed Node has no documented zero-downtime deploys.

### Sources (Hostinger / Cloudflare / vendors)
- Hostinger:
  - Node.js Web App: https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger
  - Node.js support: https://www.hostinger.com/support/1583661-is-node-js-supported-at-hostinger/
  - Next.js preset and standalone: https://docs.hostinger.com/node.js/overview-1/next
  - Build settings: https://docs.hostinger.com/node.js/build-settings
  - Creating an app: https://docs.hostinger.com/node.js/creating-an-app
  - Environment variables: https://docs.hostinger.com/node.js/environment-variables
  - Node.js limits: https://www.hostinger.com/support/?p=21141
  - Runtime logs: https://www.hostinger.com/support/?p=8362
  - Plan limits: https://www.hostinger.com/support/6976044-parameters-and-limits-for-hosting-plans
  - SSL with Cloudflare: https://www.hostinger.com/support/5613445-how-to-fix-a-failed-lifetime-ssl-installation-in-hostinger/
  - Email DNS: https://www.hostinger.com/support/8671319-set-up-a-domain-for-hostinger-email-manually/ and https://support.hostinger.com/en/collections/2944645-email-dns-records
  - Free domain: https://www.hostinger.com/support/?p=631
- Cloudflare:
  - Full (strict): https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/
  - Origin CA: https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/
  - Rate limiting rules: https://developers.cloudflare.com/waf/rate-limiting-rules/
  - Bots: https://developers.cloudflare.com/bots/concepts/bot/
  - Verified bot categories: https://developers.cloudflare.com/bots/reference/verified-bot-categories/
  - Enable Email Routing: https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/
  - Email Routing postmaster: https://developers.cloudflare.com/email-routing/postmaster/
  - Email Service domains: https://developers.cloudflare.com/email-service/configuration/domains/
  - Registrar: https://www.cloudflare.com/products/registrar/
  - Single redirects: https://developers.cloudflare.com/rules/url-forwarding/single-redirects/
  - Cache rules: https://developers.cloudflare.com/cache/how-to/cache-rules/
  - Turnstile server-side validation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
  - HTTP headers: https://developers.cloudflare.com/fundamentals/reference/http-headers/
  - Request header modification: https://developers.cloudflare.com/rules/transform/request-header-modification/
- Resend:
  - Domains: https://resend.com/docs/dashboard/domains/introduction
  - Cloudflare guide: https://resend.com/docs/knowledge-base/cloudflare
- Twilio:
  - 10DLC privacy and terms URLs required: https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-
  - Trust Hub registrations: https://www.twilio.com/docs/trust-hub/registrations
  - Toll-free onboarding: https://www.twilio.com/docs/messaging/compliance/toll-free/console-onboarding
  - Toll-free BRN policy: https://www.twilio.com/en-us/blog/toll-free-verification-policy
  - Opt-out keywords: https://support.twilio.com/hc/en-us/articles/223134027-Twilio-Support-for-Opt-out-Keywords-SMS-STOP-Filtering
  - Advanced Opt-Out: https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out
- Next.js 16 (local): `node_modules/next/dist/docs/01-app/02-guides/self-hosting.md`, `.../static-exports.md`, `.../05-config/01-next-config-js/output.md`

Unverified, so confirm before relying on these:
- Hostinger per-app RAM and OOM-restart policy, log retention, whether restart sends SIGTERM and waits, and custom SSL upload on Node web app sites.
- Exact Cloudflare Free rate-limit parameters.
- Hostinger Email mailbox count and duration on the purchased plan.
- Supabase Free backup and pausing terms.
