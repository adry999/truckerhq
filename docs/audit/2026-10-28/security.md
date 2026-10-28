# TruckerHQ: Security / Server / API Audit

- Date: 2026-10-28, commit `1fcb0b3` (main)
- Scope: `src/server/**`, `src/app/api/**`, `src/shared/lib`, `src/shared/client/post-json.ts`, `src/shared/hooks/useFormSubmit.ts`, the lead forms, `src/features/carriers/server/*`, `next.config.ts`, `.env.example`, `scripts/`, `.github/workflows/ci.yml`
- Target deployment: self-hosted `next start` on Hostinger (Node.js), behind the Cloudflare proxy. **Not Vercel.**
- Method: read-only code review plus `npm audit --omit=dev`. I did not query the live Supabase project, so the RLS state there is **unverified**. The policies the tables need are listed in finding 9.

---

## Part A: Status of the 2026-10-09 audit items in this sector

| Item | Status | Evidence |
|---|---|---|
| Q4: SMS to an arbitrary number (E.164, caps, Turnstile) | **PARTIAL** | E.164 is done (`fields.ts:21-29`, `phone.ts`). Per-phone and global caps exist but are in-memory (`sms-throttle.ts`). **No Turnstile or CAPTCHA.** NANP numbers outside the US are still accepted (see finding 3). |
| Q5: `(XXX)` placeholder in SMS | **FIXED for SMS** / gate OPEN | `notifications.ts:17` drops the "from" phrase while `PHONE_IS_PLACEHOLDER`. `contact.ts:2-4` still holds the placeholders. CI runs `check:placeholders` without `--strict` (`ci.yml`, `check-placeholders.mjs:11`), so nothing blocks a launch. |
| Q6: no fetch timeout | **FIXED** | `http-request.ts:31` uses `AbortSignal.timeout`: 5 s by default, 8 s for FMCSA. |
| Q7: SMS awaited inline | **FIXED** | `create-lead-handler.ts:54` uses `after()`. The Next 16 self-hosting doc confirms `after` works under `next start` (graceful SIGTERM needed). |
| Q8: rate limiter (eviction, trusted IP, shared store) | **PARTIAL / REGRESSED for Hostinger** | Eviction is done (`api-guard.ts:41-45,61`). The IP source now trusts Vercel headers, which a client can spoof on Hostinger (finding 1). It is still per-process. |
| Q9: size cap trusts Content-Length | **FIXED** | `api-guard.ts:81-115` counts the bytes actually streamed. |
| Q10: PII in logs | **MOSTLY FIXED** | Phone and email are masked (`sms.ts:5`, `email.ts:5`, `notifications.ts:10`). Runs of 7+ digits are redacted in provider bodies (`http-request.ts:10`). One gap remains: names and messages in Supabase error bodies (finding 14). |
| Q11: hand-rolled validation | **FIXED** | zod schemas per route plus `fields.ts`. |
| Q12: untyped `insertRow` | **FIXED (hand-typed)** | `insert-row.ts:6-62`. The types are not generated from the DB, so they can drift. |
| Q13: missing `Origin` allowed | **STILL OPEN (by design)** | `api-guard.ts:70`. A curl client passes. This matters because no CAPTCHA backs it up (finding 2). |
| Q14: CSP Report-Only plus `unsafe-inline` | **STILL OPEN** | `next.config.ts:3-18,50` (finding 10). |
| Q15: own-DB failure returns 502 | **STILL OPEN** | `create-lead-handler.ts:51`. |
| Q16: `jobSlug` not checked | **STILL OPEN** | `apply/route.ts:13,25`. Any string up to 100 chars is stored. `findJob` is only used for the SMS title (`:32`). |
| Q17: `og-ru` has no server-only | **FIXED** | `src/shared/seo/og-fonts-ru.ts` imports `server-only`. |
| A11: validated env, fail fast | **PARTIAL** | `env.ts` validates, but a missing Supabase config still only logs and returns 502 for every lead at runtime (finding 12). |
| A12: shared fetch helper, typed result | **FIXED** | `http-request.ts`. FMCSA still returns `null` for every failure kind. |
| Appendix: "server-only on every infra module" | **STILL TRUE** | All of `src/server/**` and `features/carriers/server/*` import `server-only`. `fields.ts` is pure zod, so that is fine. |

---

## Part B: Findings

### [P0] Rate-limit IP is client-spoofable on Hostinger and Cloudflare (Vercel-header trust)
`src/server/http/api-guard.ts:47-57`, `:124`

**Problem**
- `getClientIp` checks headers in this order: `x-vercel-forwarded-for`, then `x-real-ip`, then the first entry of `x-forwarded-for`. Off Vercel, nothing strips `x-vercel-forwarded-for`, and Cloudflare forwards arbitrary request headers to the origin. An attacker sends `x-vercel-forwarded-for: <random>` on each request and gets a fresh rate-limit bucket every time.
- The first `x-forwarded-for` entry is also attacker-controlled. Cloudflare *appends* the client IP to an existing XFF, so the first entry is whatever the client sent.
- Next's base server only fills in `x-forwarded-for ??= socket.remoteAddress` when the header is absent (`node_modules/next/dist/server/base-server.js:612`).
- The reverse failure also exists: if no header is present, every visitor shares the `"unknown"` bucket. Then 5 requests/min/route is the limit for the entire site.

**Impact:** The only per-client abuse control on all 6 lead routes, including the 3 SMS routes, can be bypassed with a single header.

**Fix:** Trust only `CF-Connecting-IP`, and only when the request really came through Cloudflare (see the next finding). Drop the Vercel branches.
```ts
export function getClientIp(req: Request): string | null {
  // Only valid when the origin is reachable solely via Cloudflare (see origin-lock finding).
  return req.headers.get("cf-connecting-ip")?.trim() || null;
}
// null -> treat as suspicious: apply a strict shared bucket, or reject when NODE_ENV=production
```
Put the primary rate limit at the edge: a Cloudflare WAF rate-limiting rule on `POST /api/*` (for example 5/min per IP, plus a stricter rule on `/api/(apply|dispatch-start|compliance-alerts)`). Keep the in-memory limiter as a second layer.

### [P0] No bot protection on the SMS-sending routes (Turnstile missing), and curl is allowed
`src/server/http/api-guard.ts:68-72`, `src/server/leads/create-lead-handler.ts:29-55`, `src/server/env.ts:8-22` (no `TURNSTILE_*` keys), `.env.example` (no Turnstile entries)

**Problem**
- `/api/apply`, `/api/dispatch-start` and `/api/compliance-alerts` send an SMS to the submitted number.
- The defences are:
  - an Origin check, which passes when Origin is absent;
  - a honeypot field;
  - a spoofable IP limiter.
- Any script can POST JSON without an `Origin` header and trigger texts.

**Impact**
- SMS cost.
- Texts to people who never asked for them, which is TCPA "wrong number" exposure.
- The global cap can be exhausted (finding 4).
- Lead-table spam on all 6 routes.

**Fix:** Add Turnstile server verification inside `createLeadHandler` before `insertRow`. Make it mandatory on the SMS routes and recommended on all of them.
```ts
// server/http/turnstile.ts
export async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const { TURNSTILE_SECRET_KEY } = serverEnv();
  if (!TURNSTILE_SECRET_KEY) return process.env.NODE_ENV !== "production"; // fail closed in prod
  if (typeof token !== "string" || token.length > 2048) return false;
  const res = await httpRequest("turnstile", "https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token, ...(ip ? { remoteip: ip } : {}) }),
    timeoutMs: 5000,
  });
  if (!res.ok) return false;
  const data = JSON.parse(res.text) as { success?: boolean; hostname?: string; action?: string };
  return data.success === true && ["truckerhq.com", "www.truckerhq.com"].includes(data.hostname ?? "");
}
```
Supporting changes:
- Add `TURNSTILE_SECRET_KEY` to `env.ts` and `.env.example`.
- Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` for the widget.
- Update CSP: add `https://challenges.cloudflare.com` to `script-src` and `frame-src`.
- Send the token from `useFormSubmit`, `ClaimProfileWizard` and `DispatchStartWizard`.
- Optionally, require `Origin` (or `Sec-Fetch-Site: same-origin`) in production. Real browsers always send it on a fetch POST.

### [P0] "US phone" validation accepts every NANP country, including SMS-pumping hot spots
`src/shared/lib/phone.ts:2-7`, used by `src/server/leads/fields.ts:21-41`

**Problem**
- `toUsE164` accepts any NANP number with a valid digit shape. That includes Canada and about 20 Caribbean and Pacific countries.
- For example, `876` Jamaica, `809/829/849` Dominican Republic, `242` Bahamas, `284` BVI, `649` Turks and Caicos, `664` Montserrat, `767` Dominica, `868` Trinidad, `473` Grenada and `670/671/684` Pacific territories.
- `+18765551234` passes. Twilio bills these at international rates, and they are classic International Revenue Share Fraud (SMS pumping) targets.

**Impact:** Toll fraud. An attacker gets paid per message sent to number ranges they control. This is the concrete case behind the old audit's Q4.

**Fix**
1. In code, reject non-US NANP area codes. Use a denylist of non-US NANP NPAs, or better an allowlist of US NPAs. A cheaper version is to reject the known non-US list:
   ```ts
   const NON_US_NPA = new Set(["204","226","236","249","250","263","289","306","343","354","365","367","368","382","387","403","416","418","428","431","437","438","450","460","468","474","506","514","519","548","579","581","584","587","600","604","613","622","639","647","672","683","705","709","742","753","778","780","782","807","819","825","867","873","879","902","905","942",
     "242","246","264","268","284","340","345","441","473","649","658","664","670","671","684","721","758","767","784","787","809","829","849","868","869","876","939"]);
   // note: 340 (USVI), 670/671/684 (CNMI/Guam/AS), 787/939 (PR) are US territories; decide per business need.
   ```
2. In Twilio, which is the most important control:
   - In Messaging Geo Permissions, allow the **United States only**.
   - Turn on **SMS Pumping Protection** for Programmable Messaging.
   - Set a usage trigger or alert at a low daily dollar amount.
3. Rename the function to `toNanpE164`, or make it really US-only, so the name stops misleading.

### [P1] SMS throttle is per-process and in-memory; the global cap is also a DoS lever
`src/server/messaging/sms-throttle.ts:3-22`, `src/server/leads/notifications.ts:8-14`

**Problem**
- The throttle allows 1 SMS per phone per 10 min and 30 SMS per hour globally, all in a process-local Map.
- It resets on every restart or deploy, and Hostinger can restart Node apps.
- If Hostinger runs more than one worker, the cap multiplies (unverified for the Hostinger plan).
- With finding 1, an attacker can rotate phone numbers and keep the 30/hr global cap permanently exhausted. That is about 720 texts a day, and real applicants silently stop getting confirmations. The only trace is a `console.warn`.

**Impact:** Bounded but recurring cost. Legitimate confirmation texts are denied.

**Fix:**
- Move the counters to a shared store. Without Vercel KV the options are an Upstash Redis REST call, a Supabase table with a unique `(phone, day)` key, or a `count(*)` over the last hour.
- Add a daily cap and a per-IP SMS cap.
- Alert when the cap is hit, for example by email or Slack via `after()`.
- Edge rate limiting and Turnstile (findings 1 and 2) remove most of the pressure.

### [P1] TCPA consent is not recorded; two SMS routes send with no server-side consent flag
`src/app/api/dispatch-start/route.ts:13-29,48`, `src/app/api/apply/route.ts:9-19,32`, `src/app/api/compliance-alerts/route.ts:21`, `src/server/db/insert-row.ts:6-62`

**Problem**
- `compliance-alerts` requires `smsConsent: true` (`:21`), but the value is **not persisted**. `toRow` drops it (`:31-36`), and `compliance_alert_signups` has no consent columns.
- `dispatch-start` and `apply` text the number based on browse-wrap copy ("By requesting a call, you agree…", `CallStep.tsx:58-61`, `ApplyForm.tsx:91-94`). There is no checkbox, and the server receives no consent flag.
- No row stores the consent text version, timestamp, IP or user agent.
- Compliance alerts are *recurring* texts, which need express written consent with proof. One-time confirmations of a user-initiated request are lower risk. The risk is the number of a third party being entered.

**Impact:** If anyone disputes a text, there is no evidence of consent, and TCPA statutory damages run $500 to $1,500 per text. A2P 10DLC campaign vetting also asks for the consent-capture flow.

**Fix:**
- Add columns to every SMS table: `sms_consent boolean not null`, `consent_text_version text`, `consent_at timestamptz default now()`, `consent_ip inet`, `consent_user_agent text`.
- Require `smsConsent: z.literal(true)` on `apply` and `dispatch-start` too, with an explicit unchecked checkbox. Or send no SMS when it is absent.
- Persist `CF-Connecting-IP` and the user agent alongside the row.

### [P1] Twilio A2P 10DLC registration and opt-out handling not evidenced (unverified)
`src/server/messaging/sms.ts:8-27`, `.env.example:21-26`

**Problem**
- The app sends from a raw `TWILIO_FROM` number with no Messaging Service SID and no `StatusCallback`.
- US carriers block or filter unregistered 10DLC traffic.
- Nothing handles STOP and HELP inbound. Twilio's default handling covers basic STOP, but the app keeps no opt-out list.
- The compliance-alerts product promises future recurring texts ("We text you the same day…").

**Impact:** Messages may never be delivered, and future alert sends could go to opted-out numbers.

**Fix:**
- Register the brand and campaign.
- Send through a Messaging Service (`MessagingServiceSid`) with Advanced Opt-Out.
- Add a `StatusCallback` webhook to record failures and opt-outs, and validate `X-Twilio-Signature` on it.

### [P1] Origin protection can be bypassed by hitting the Hostinger origin directly (unverified)
Deployment. Related code: `api-guard.ts:47-57`.

**Problem:**
- If the Hostinger origin IP or hostname (for example the `*.hostingersite.com` temporary domain) is reachable directly, an attacker skips Cloudflare entirely: no WAF, no edge rate limit, no Turnstile pre-clearance.
- The attacker can also set `CF-Connecting-IP` themselves, which defeats the fix in finding 1.

**Impact:** All edge controls are void.

**Fix:** In order of preference:
1. Use a Cloudflare Tunnel, if Hostinger allows it (VPS only).
2. Firewall the origin to Cloudflare IP ranges.
3. On shared or managed Node hosting, use a Cloudflare Transform Rule that adds a secret header (`X-Origin-Auth: <random>`). Reject requests without it in the app, at least for `/api/*`:
```ts
if (process.env.NODE_ENV === "production" && req.headers.get("x-origin-auth") !== serverEnv().ORIGIN_SHARED_SECRET) return rejectResponse(403, "Forbidden");
```
Also disable or redirect the Hostinger temporary domain.

### [P1] Next.js 16.3.6 has critical advisories relevant to self-hosting; other high-severity deps
`package.json:18` (`"next": "16.3.6"`, pinned exactly), `package.json:22` (`zod ^4.6.5`); `npm audit --omit=dev` reports 4 vulnerabilities (1 critical, 3 high)

**Problem:** `next 16.0.0–16.4.0` advisories include:
- GHSA-4jqv-mc3x-m676: cache poisoning of SSG/ISR in **self-hosted** apps.
- GHSA-mcj8-r9mp-w47p: SSG/ISR cross-user content substitution and persistent DoS.
- GHSA-cjq9-62q9-8jv4: SSRF in Image Optimization.
- GHSA-2464-fhr4-w9xw: RCE in Image Optimization via SVG.
- GHSA-p3m5-59mp-jv5r: Server Actions DoS.
- A metadata-image `dynamicParams` disclosure, plus `use cache` issues. The app does not use `use cache` or Server Actions, which I verified by grep.

The fixed version is `next@16.4.3`. The other advisories:
- `sharp <0.35.5` (librsvg). It is used by `/_next/image` on self-host.
- `zod <4.6.6`: memory exhaustion on oversized collections. The impact is limited because bodies are capped at 16 KB.
- `source-map-js`.

**Impact:** Self-hosting puts this app in the affected configuration: on-disk ISR cache and the image optimizer exposed. This blocks launch until it is patched.

**Fix:**
- Bump `next` and `eslint-config-next` to `16.4.3` or later, then run `npm audit fix` for sharp, zod and source-map-js.
- Add `npm audit --omit=dev --audit-level=high` to `ci.yml`.
- Enable Dependabot or Renovate.

### [P1] Supabase anon key performs the inserts; the RLS state is unverifiable from the repo
`src/server/db/insert-row.ts:64-89`, `.env.example:9-13`

**Problem**
- Inserts go to PostgREST with `SUPABASE_ANON_KEY` as both `apikey` and Bearer. The comment (`:65-67`) claims each table has an insert-only RLS policy, but the repo has no migrations or SQL (no `supabase/` folder, no `*.sql`). This is **unverified**.
- The anon key is meant to be public. The project ref is even printed in `.env.example:10`.
- An insert-only anon policy therefore lets anyone POST straight to `https://<ref>.supabase.co/rest/v1/<table>`. That bypasses zod, the honeypot, rate limits and Turnstile. Only DB constraints apply.
- If RLS is *off* on any of these tables, the anon key can **read every lead (PII: names, phones, messages)** and update or delete them.
- Good: the key is not in the client bundle. It has no `NEXT_PUBLIC_` prefix, and `env.ts` is server-only.

**Impact:** At best, a direct spam channel into the lead tables. At worst, a full PII leak.

**Fix**
1. Use a server-only secret key (`sb_secret_…` or `service_role`) as `SUPABASE_SECRET_KEY`.
2. Enable RLS on all 6 tables with **no anon or authenticated policies**, so only the secret key, which bypasses RLS, can write. If you must keep anon, apply the minimum below.
3. Commit the schema as `supabase/migrations/*.sql`, so this can be reviewed.
```sql
-- for each of: job_applications, claims, compliance_alert_signups,
--              contact_messages, dispatch_requests, hire_driver_requests
alter table public.job_applications enable row level security;
alter table public.job_applications force row level security;
revoke all on public.job_applications from anon, authenticated;
-- Option A (preferred): no policies; server uses the secret key.
-- Option B (anon kept): insert only, no select/update/delete
grant insert on public.job_applications to anon;
create policy "anon insert only" on public.job_applications
  for insert to anon with check (true);
-- DB-side constraints mirroring zod (defence for direct PostgREST writes):
alter table public.job_applications
  add constraint phone_e164 check (phone ~ '^\+1[2-9]\d{2}[2-9]\d{6}$'),
  add constraint name_len check (char_length(full_name) between 1 and 100),
  add constraint slug_len check (char_length(job_slug) <= 100);
-- arrays: check (cardinality(lanes) <= 10); jsonb watch: check (pg_column_size(watch) < 2048)
```
Run the Supabase security advisor (`get_advisors type=security`) to confirm: `rls_disabled_in_public` must be empty.

### [P2] CSP is still Report-Only, has no reporting endpoint, and allows `'unsafe-inline'` scripts
`next.config.ts:3-18,50`

**Problem**
- `Content-Security-Policy-Report-Only` enforces nothing. It has no `report-uri` or `report-to`, so nobody ever sees a violation. That makes "flip once a deploy comes back clean" untestable.
- `script-src 'unsafe-inline'` would make the policy weak even if enforced.
- `connect-src` lacks `https://*.google-analytics.com` (GA4 regional collectors such as `region1.google-analytics.com`) and `https://www.googletagmanager.com`. This is unverified, but it is likely to break analytics once enforced.
- There is no `frame-src`. Turnstile will need `https://challenges.cloudflare.com`.
- Cloudflare features that inject scripts (Web Analytics `static.cloudflareinsights.com`, Rocket Loader, Email Obfuscation, JS challenges `/cdn-cgi/`) will violate it.

**Impact:** No real XSS mitigation today.

**Fix:**
- Add `report-to` with a `Reporting-Endpoints` header, pointing at a small `/api/csp-report` route or a hosted collector.
- For 131 static pages, nonces would force dynamic rendering. The Next 16 docs (`content-security-policy.md` §"Subresource Integrity (Experimental)") offer `experimental.sri` as the static-friendly option.
- Move the two inline `<Script>` bodies in `Analytics.tsx:64-90` to `public/*.js` files, or hash them. Then drop `'unsafe-inline'` from `script-src` and enforce.
- Keep `style-src 'unsafe-inline'`, which Next/Tailwind needs and which is acceptable.

### [P2] HSTS `includeSubDomains; preload` on day one
`next.config.ts:46-49`

**Problem**
- `max-age=63072000; includeSubDomains; preload` commits every current and future subdomain to HTTPS for 2 years. That covers `mail.`, `staging.`, Hostinger-provided subdomains and any vendor CNAME.
- If anyone submits the domain to hstspreload.org, removal takes months.
- The header is also emitted by the origin. With Cloudflare in front, decide on **one** source, either Cloudflare's HSTS setting or the app, to avoid conflicting values.
- If Cloudflare SSL mode is "Flexible", the origin speaks HTTP. That is fine for HSTS, but it creates a cleartext Cloudflare-to-Hostinger leg (unverified mode).

**Impact:** An outage risk on subdomains, and it is hard to roll back.

**Fix:**
- Start with `max-age=86400` and no `preload`.
- Inventory the subdomains, then ramp up, and only then add `preload`.
- Set Cloudflare SSL to **Full (strict)**.

### [P2] Missing Supabase config fails per request instead of at startup; lead loss is silent
`src/server/db/insert-row.ts:73-77`, `src/server/env.ts:31-44`

**Problem:** On Hostinger, env vars are set by hand in hPanel. A typo makes every lead form return 502 "Could not save…", with only a console line as a signal. `env.ts` deliberately swallows invalid values (`:35-39`).

**Impact:** Lost leads after a bad deploy.

**Fix:** Add `instrumentation.ts` with a `register()` hook. In production it should throw if `SUPABASE_URL`, the Supabase key, `TURNSTILE_SECRET_KEY` (and the Twilio vars, if SMS is expected) are missing. Also add a `/api/health` route that checks presence without exposing values.

### [P2] Carrier-lookup search is an unthrottled FMCSA proxy with unbounded cache keys
`src/app/(en)/tools/carrier-lookup/page.tsx:20-23`, `src/features/carriers/server/fmcsa.ts:44-51,159-179`

**Problem**
- Each unique `?q=` value triggers an FMCSA call made with the server's webKey. There is no rate limit and no length cap on `q`.
- Each URL is cached with `revalidate: 3600`. On self-host this goes into the on-disk Next fetch cache (`self-hosting.md:89-109`), so random queries grow `.next/cache` without bound and burn the webKey quota. FMCSA can revoke abusive keys.
- No SSRF: the base URL is fixed, and the path segment is either digit-validated or `encodeURIComponent`-ed. That is good.
- The webKey is kept out of logs (`http-request.ts:12-15`). That is good.

**Impact:** Disk-fill DoS on Hostinger, and loss of the FMCSA key.

**Fix:**
- Clamp `q` to about 80 chars and require at least 3 chars for name search.
- Rate-limit `/tools/carrier-lookup?q=*` in Cloudflare.
- Consider `cache: "no-store"` for name searches, keeping the cache for DOT and MC lookups.
- `fetchFmcsaCarrierByDot` (`fmcsa.ts:182`) has no caller. It is dead code: delete it.

### [P2] Supabase and provider error bodies can still log PII (names, messages)
`src/server/http/http-request.ts:10,22-26`

**Problem:** `redact` strips runs of 7+ digits only. PostgREST constraint errors (`23514`, `23502`) include `Failing row contains (…)` with the full row: name, message text and DOT. Up to 200 chars are logged.

**Impact:** PII ends up in Hostinger logs, which usually have a weak access model.

**Fix:** For the `supabase` service, log only `code` and `message` from the parsed JSON, never `details`. Or log no body for 4xx at all:
```ts
const safe = service === "supabase" ? (() => { try { const j = JSON.parse(body); return `${j.code ?? ""} ${j.message ?? ""}`; } catch { return ""; } })() : redact(body.slice(0, 200));
```

### [P2] Placeholder gate is warn-only in CI
`scripts/check-placeholders.mjs:11`, `.github/workflows/ci.yml` (`npm run check:placeholders` without `--strict`), `src/shared/config/contact.ts:2-4`

**Problem:** `(XXX) XXX-XXXX` and `tel:+1XXXXXXXXXX` still ship in the JSON-LD and the footer. SMS is protected by `PHONE_IS_PLACEHOLDER`, but nothing blocks a production deploy.

**Fix:** Run the check with `--strict` in the production deploy job, or in `prebuild` when `NODE_ENV=production`.

### [P3] Vercel-only assumptions in origin allowlist and SITE_URL
`src/server/http/api-guard.ts:15-21`, `src/server/env.ts:20-21`, `src/shared/config/site.ts:3`

**Problem:**
- The Origin allowlist adds `VERCEL_URL` and `VERCEL_BRANCH_URL`, which are always unset on Hostinger. A staging domain would therefore 403 every form.
- `SITE_URL` falls back to `truckerhq.com`, and `INDEXABLE` is always true off Vercel. A Hostinger staging domain would be indexable, with canonicals pointing at prod (an SEO sector concern).

**Fix:** Replace these with an explicit `SITE_URL` / `ALLOWED_ORIGINS` env var, validated in `env.ts`.

### [P3] DB failure returns 502 (Q15) and `jobSlug` is not validated (Q16), both still open
`src/server/leads/create-lead-handler.ts:51`; `src/app/api/apply/route.ts:13,25,32`

**Fix:**
- Return 500 for DB failures.
- In the apply schema, add `.refine(slug => !!findJob(slug), "Unknown job")`. Today, junk slugs and spam payloads are stored.

### [P3] Repeated `?q=` turns into an array and crashes the lookup page
`src/app/(en)/tools/carrier-lookup/page.tsx:18-23` → `fmcsa.ts:160`

**Problem:** `?q=a&q=b` yields `string[]`, despite the `q?: string` type. `query.trim()` then throws a TypeError and the request returns 500 or the error page. This is cheap error-log noise and a minor DoS.

**Fix:** `const q = Array.isArray(params.q) ? params.q[0] : params.q;`. Do the same for `status` and `mode`.

### [P3] `trucks` accepts fractions and booleans
`src/app/api/dispatch-start/route.ts:8-11`

**Problem:** `"3.7"` becomes 3.7, and `true` becomes 1. If the column is `integer`, PostgREST rejects the row, which surfaces as a 502 and a lost lead.

**Fix:** Use `Math.round`, or `z.coerce.number().int().min(1).max(500).catch(1)`.

### [P3] No CORS headers, by design (informational, OK)
`src/app/api/**`

**Problem:** None. No `Access-Control-Allow-*` headers are set, so cross-origin JSON POSTs fail preflight. Cross-origin `text/plain` simple requests carry an `Origin` header and are rejected by `isAllowedOrigin`.

**Fix:** None needed. Keep it this way, and do not add a wildcard CORS header.

---

## Verified good
- No secrets reach the client:
  - The only `NEXT_PUBLIC_*` variables are the GA and Pixel IDs (`shared/client/analytics.ts:1-2`), which are public by nature.
  - All env reads go through server-only `env.ts`.
  - The build would fail if a client file imported a `server-only` module.
- Responses never include raw provider or DB errors. Only fixed strings and zod custom messages are returned (`create-lead-handler.ts:34-51`). `post-json.ts:5` only surfaces 400, 413 and 429 messages.
- No attacker-controlled text goes into an SMS body. The job title comes from `findJob`, and the DOT is digits only (`notifications.ts:24-35`).
- `JsonLd` escapes `<` (`components/JsonLd.tsx:6`).
- The webKey is never logged. Twilio and Resend credentials are only sent in headers.
- Body size is enforced on the streamed bytes, and non-object JSON is handled.
- No Server Actions, no `use cache`, and no proxy/middleware. That shrinks the Next advisory surface, but the ISR and image advisories still apply.
