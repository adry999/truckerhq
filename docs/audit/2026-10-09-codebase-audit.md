# TruckerHQ — Codebase Audit

- **Date:** 2026-10-09
- **Commit:** `74719f4` (main, clean tree)
- **Scope:** `src/` in full (app routes, API routes, components, lib, tests) plus `next.config.ts`, `vitest.config.ts` and `eslint.config.mjs`. The `docs/design/` prototypes are excluded.
- **Method:** a read-only review split by layer (components, lib, app/API, tests), plus automated checks and grep metrics. I re-checked every P0 and most P1 findings against the source by hand. Severity runs from P0 (fix before launch) to P2 (cleanup).

---

## 1. Executive Summary

**Overall architectural health: 58 / 100**

| Dimension | Score | Note |
|---|---|---|
| Tooling and checks | 9/10 | Typecheck, lint, tests and build are all green (see baseline below). |
| Security hygiene | 6/10 | Headers, origin and size guards, honeypot and no error leaks are good. SMS abuse, the rate limiter and the size check have holes. |
| Module structure | 4/10 | `lib/` is a flat mix of five concerns. There are no feature boundaries, and `lib` depends on `components`. |
| Component reuse | 4/10 | Only one UI primitive exists. Six copied submit handlers, five chip copies, about 100 raw hex colours. |
| Views vs logic | 5/10 | Copy is pulled out for the big pages. Wizards and the calculator hold domain logic and maths. |
| Data and content | 3/10 | About 3,200 lines of templated TS content. Sample data is presented as real. |
| Tests | 3/10 | 38 tests over about 5% of the logic. No route, I/O, component or E2E tests, and no CI. |
| "AI-code" signature | 6/10 | Low overall: no `any`, no eslint-disable, mostly *why* comments. There are clear leaks: agent remarks, history comments, and throw-then-catch. |

### Baseline (untouched code)

| Check | Result |
|---|---|
| `tsc --noEmit` | 0 errors |
| `eslint .` | 0 errors, 0 warnings (174 files) |
| `vitest run` | 5 files, 38/38 passed, 8.5 s |
| `next build` | success, 131/131 static pages |
| CI | **none** (`.github/workflows` does not exist) |

The baseline is green, so step 0 of the roadmap is only *add CI*.

### Top 3 critical risks

1. **Fake data and fake flows are presented to real users as real (product, legal and SEO risk).**
   - Sample job postings are in the sitemap and emit `JobPosting` JSON-LD with a `datePosted` recomputed from `new Date()` on every build (`src/lib/seo.ts:19-22`). The apply form collects real phone numbers for jobs that don't exist.
   - Invented carriers with real-format DOT numbers carry `WARNING`/`INACTIVE` labels under copy that says "from public FMCSA data" (`src/lib/state-content.ts:75`, `src/lib/carriers-*.ts`, `src/lib/data.ts:34-44`).
   - The claim wizard never checks the code. Any six digits mark the user "Verified owner" (`src/components/ClaimProfileWizard.tsx:73-81`).
   - The compliance form "finds" Carpathian Freight for any DOT number with six or more digits (`src/components/ComplianceAlertsForm.tsx:54,127`).
2. **Unprotected outbound SMS pipeline.**
   - Three public endpoints text any submitted phone number. There is no E.164 validation and no consent check, and the only limit is an in-memory, per-instance, IP-spoofable 5/min (`src/lib/api-guard.ts:19-34`). That allows SMS pumping (cost) and creates TCPA exposure.
   - The SMS copy sends the placeholder number `(XXX) XXX-XXXX` (`src/lib/contact.ts:2`, `src/lib/notifications.ts:22`).
   - Twilio and Supabase calls have no timeout, and they are awaited inline on the response path.
3. **No module boundaries, and large templated content files.**
   - `lib/` mixes content, static data, domain rules, infrastructure and SEO. `lib/city-content.ts:1` imports a type from `components/`.
   - `state-content.ts` (2,026 lines) and `city-content.ts` (1,163 lines) are about 70% the same sentences with the name swapped. "Every for-hire interstate carrier based in" appears 98 times.
   - 49 `carriers-*.ts` files are data wrapped as code, and Texas lives in `data.ts` instead.
   - Every new feature lands in the same flat folders.

---

## 2. Architecture & Modularity Violations

### 2.1 Current layout

```
src/
  app/          routes; (en)/ route group + ru/ prefix; api/* (6 lead routes)
  components/   38 flat files, 1 primitive (ui/Segmented.tsx)
  lib/          26 modules + 49 carriers-*.ts — content, data, domain, infra, SEO mixed
```

### 2.2 Violations

| # | Location | Sev | Problem | Fix |
|---|---|---|---|---|
| A1 | `lib/city-content.ts:1` | P1 | `lib` imports the `CityJob` type from `@/components/CityJobsPage`, which inverts the layering. | Move the type to the jobs feature's `*.types.ts`. |
| A2 | `lib/` (whole) | P1 | A flat folder with five concerns and a generic `data.ts`, which mixes types, `CARRIERS`, `JOBS`, `TEXAS_CARRIERS`, colour helpers and lookups. | Use the feature-driven tree in 2.3. |
| A3 | `lib/state-content.ts` (2,026 lines) | P1 | 51 object literals of identical shape. About 6 of 18 fields per state are pure `${stateName}` substitution. Every state's carrier list is imported eagerly, so the directory page loads all 50. | Put the unique fields in `data/states/<slug>.json`, generate the rest with template functions (about 2,000 lines down to about 600), and load per page. |
| A4 | `lib/city-content.ts` (1,163 lines) | P1 | Same pattern. Job counts ("225 Openings") are hardcoded in titles, descriptions and intros, so they drift from `jobs.length`. | Use JSON plus templates, and derive the counts. |
| A5 | `lib/carriers-*.ts` ×49 + `data.ts:106` | P2 | Pure data stored as TS modules, with Texas split off into `data.ts`. | Use `data/states/<slug>.json` with one loader. |
| A6 | `lib/city-slugs.ts`, `lib/home-copy.ts:72` (`RU_JOB_TITLES`) | P2 | Hand-maintained maps that must stay in sync with `CITY_CONTENT` and `JOBS`. | Derive them from the source data, or co-locate with it and add an integrity test. |
| A7 | `app/(en)/jobs/[slug]/` (page, metadata and OG) | P1 | One dynamic segment serves two unrelated page types (city landing and single job). The branching is repeated in three files. | A shared `resolveJobsSlug(slug)` returning a discriminated union, with the page rendering `<CityJobsView/>` or `<JobDetail/>`. |
| A8 | `app/(en)/tools/carrier-lookup/page.tsx` (365) | P1 | Two pages in one: the landing state (`:76`) and the results state, plus constants and URL helpers. | `features/carriers/ui/{LookupLanding,LookupResults,CarrierResultRow,HealthFactors}`, with helpers moved to the model layer. |
| A9 | `tools/carrier-lookup/[slug]` (348), `new-mc-checklist` (272), `hire-drivers` (264), `about`, `tools` | P1/P2 | Copy arrays, magic numbers (`nat = { v: 22.3, d: 6.7 }`) and a hardcoded Unsplash URL inline in pages. | Content modules per feature and section components. Pages become composition only. |
| A10 | i18n | P1 | Three different patterns: a `HomeCopy` object, a `Record<"EN"\|"RU">` with functions inside the copy, and inline `ru ? … : …` in `GrossComparison.tsx`. `state-content`, `city-content` and the SMS are EN-only. The RU error and 404 pages re-export the EN ones (`app/ru/error.tsx:3`, `app/ru/not-found.tsx:1`), so Russian users see English. Hreflang pairs are hand-written in `sitemap.ts:12-30`. | One `Locale` type, a `getCopy(locale)` helper, an `i18n/` module and a generated hreflang. Use a `[locale]` segment once a third locale or more RU pages are planned. |
| A11 | Env access, 13 reads in 7 files | P1 | No validated env module. Missing config degrades silently: `insertRow` returns `false`, so every lead gets a 502 with no startup failure. | `server/env.ts` that validates once at first use and fails fast in production. |
| A12 | `lib/email.ts`, `sms.ts`, `supabase.ts` | P1 | Three near-identical fetch wrappers with no timeout and errors reduced to `boolean`/`void`. `fmcsa.ts` returns `null` for both "not found" and "API down". | One `server/http/fetch-json.ts` with a timeout, a typed `Result` and redaction. |
| A13 | Client bundle | P1 | `ClaimProfileWizard.tsx` (client) imports `healthColor` from `lib/data`, which risks pulling `CARRIERS`, `JOBS` and `TEXAS_CARRIERS` into the client chunk. The four `*FromUrl` client wrappers serialise full datasets across the client boundary. | Move the health helpers into their own module. Filter on the server, or use one generic URL-param island. |

No circular dependencies were found. The server-only boundary is applied correctly to all infra modules.

### 2.3 Target tree

```
src/
  app/                                 # composition only: routes, layouts, metadata wiring
  features/
    carriers/
      data/states/<slug>.json          # <- carriers-*.ts ×49 + TEXAS_CARRIERS
      model/health.ts (+test)          # <- data.ts healthColor/TextColor/Label, STATUS_COLORS, healthOnColor
      model/state-content.ts (+test)   # <- state-content.ts as loader + templates
      server/fmcsa.ts (+test)
      ui/ LookupLanding, LookupResults, CarrierProfile*, StateCarriersPage, StateCarriersList
      carriers.types.ts
      index.ts
    jobs/
      data/{jobs,cities}.json          # <- data.ts JOBS, city-content.ts unique fields
      model/{city-content,filter-jobs,job-posting-schema}.ts (+tests)
      ui/ JobCard, JobsList, CityJobsView, JobDetail, ApplyForm
      index.ts
    dispatch/      model/{pricing,dispatch-start}.ts, ui/start-wizard/{steps/*,useDispatchWizard,SummaryAside}
    claim/         ui/claim-wizard/*, model/claim.ts
    compliance/    model/compliance.ts, ui/ComplianceAlertsForm/*
    profit/        model/profit.ts (+test), ui/{ProfitCalculator,ProfitResults,NumberField}
    guides/        guides.ts, ui/GuidesList
    leads/         server/{create-lead-handler,lead-schemas,notifications}.ts (+tests)
  shared/
    ui/            Button, Field, Select, Textarea, ChoiceChip, RadioCard, CheckRow, Segmented,
                   Section, SectionTitle, Card, Badge, HealthBadge, FilterChips, icons
    hooks/         useFormSubmit
    i18n/          locales.ts, getCopy.ts
    seo/           metadata.ts, structured-data.ts (<- seo.ts), og/{card.tsx, fonts-ru.ts}
    config/        site.ts, contact.ts
    client/        analytics.ts, consent.ts, api-client.ts (postJson)
  server/
    env.ts
    http/          fetch-json.ts, api-guard.ts
    db/            insert-row.ts (typed by generated Supabase types)
    messaging/     sms.ts, email.ts
```

Dependency rule: `app → features → shared/server`. A feature never imports another feature. Add the alias `@features/*`, `@shared/*`, `@server/*` and enforce it with `eslint-plugin-boundaries` or `no-restricted-imports`, one module at a time as each one migrates.

---

## 3. Code Quality & Anti-Pattern Report

### 3.1 "AI-code" signatures

**AI-Score: 4/10.** The code is mixed but mostly human-shaped. It has no `any`, no `eslint-disable` and no TODO/FIXME, and most comments explain *why*. The leaks below are what give it away.

| Location | Pattern | Fix |
|---|---|---|
| `lib/fmcsa.ts:5-16` | **Leaked agent remark** in production code: "Claude cannot register one on your behalf". The JSDoc also narrates. | Rewrite as two lines: required env var and where to get the key. |
| `lib/notifications.ts:5-13` | Project-history comment: "per the fixes brief", "la traducere", design-doc ticket IDs. | Delete it. That history belongs in commits or issues. |
| `lib/home-copy.ts:68-72` | History comment: "RU homepage previously showed… Now it pulls…". | Delete it. |
| `components/ConsentBanner.tsx:10-18` | A wrong narrating comment, plus a duplicate `localStorage` write that `lib/consent.ts:setConsent` already does. | Call `setConsent` and drop `onChoice`. |
| `components/HomePageContent.tsx:21` | The comment says lazy, the code sets `fetchPriority="high"`, and the hero image is rendered twice (`:23`, `:86`). | Use one image with `priority`. |
| `lib/api-guard.ts:56-61,72-74`, `Segmented.tsx:13` | JSDoc that restates the function name. | Delete it. |
| All 6 forms | `throw new Error("request failed")` caught immediately and discarded (`catch {}`), i.e. control flow by exception. | `if (!res.ok) return setStatus("error")` inside `useFormSubmit`. |
| `app/api/compliance-alerts/route.ts:11` | `typeof key === "string"` on `Object.entries` keys is always true. | Delete it. |
| `lib/fmcsa.ts:60,76-80` | `num()` guards undefined, null and NaN on fields that are already optional. `as FmcsaEnvelope` on unvalidated JSON (`:62`). | Validate the envelope once with a schema, and drop the per-field defence. |
| `supabase.ts:25-33`, `sms.ts:25-33` | `.text().catch(() => "")` inside an outer try/catch, i.e. double wrapping. | Use the shared HTTP helper (A12). |
| `GrossComparison.tsx:11` | `useDeferredValue` on a four-format synchronous calculation. | Remove it. |
| `GuidesList.tsx:13-15`, `CityJobsList.tsx:23-26` | `if (x) return false; return true;`. | Return the boolean expression. |
| `DispatchStartWizard.tsx:127` | `Math.min(4, s + 1)` guards a state that can't happen. | Remove it. |
| `SiteHeaderLangSwitcher.tsx:62-64` | `flex` plus `${open ? "flex" : "hidden"}`. | Use the conditional only. |
| Content tuples | Single-letter keys and positional tuples: `{t, d}`, `[Key, string, string, string, number, string?]` (`ProfitCalculator.tsx:66`), `["PAY", job.pay, "text-green"]`. | Use named object fields. |
| Generic names | `data.ts`, `str()`, `num()`, `c` used for both copy and carrier in one file, `pc`, `sc`, `n(k)`. | Use domain names: `sample-carriers.ts`, `trimmedField()`, and so on. |
| Dead code | `lib/email.ts` (no callers). The `Logo` `mark`/`sub`/`className`/`theme="light"` branch (about 30 lines). `export type { CityJob }` and `{ StateCarrierRow }` re-exports. `rejectResponse`, `getClientIp`, `isRateLimited`, `isAllowedOrigin` and `isTooLarge` are exported but used only internally (and in tests). | Delete, or un-export. |
| Formatting | Empty or single-child fragments and mis-indented JSX (`CityJobsList`, `StateCarriersList`, `StateEquipmentChips`, `JobsResults`, `GuidesList`). | Add Prettier plus a format check in CI. |

### 3.2 Correctness, security and production-readiness

| # | Location | Sev | Finding |
|---|---|---|---|
| Q1 | `lib/seo.ts:19-22` + `sitemap.ts:43` + `jobs/[slug]/page.tsx:134` | **P0** | Sample jobs are indexed with `JobPosting` schema whose `datePosted` is set to build time, so the postings look perpetually fresh. That breaks Google's job-posting policy. Noindex them and drop the schema until the jobs are real, and use stored posting dates. |
| Q2 | `lib/carriers-*.ts`, `state-content.ts:75`, `data.ts:34-44`, `carrier-lookup/[slug]` | **P0** | Invented carriers with DOT-format numbers and `WARNING`/`INACTIVE` or "Lapsed" insurance labels, under "from public FMCSA data" copy. The profile page has no sample-data label. That is a defamation and misrepresentation risk if a number collides with a real carrier. |
| Q3 | `ClaimProfileWizard.tsx:73-81`, `ComplianceAlertsForm.tsx:54,127` | **P0** | Fake verification ("Verified owner" after any six digits) and a fake lookup match. Wire them up for real, or label them as a demo and disable submit. |
| Q4 | `api/{apply,compliance-alerts,dispatch-start}` + `notifications.ts` | **P0** | Outbound SMS to an arbitrary number. Needs: E.164 validation, a per-phone and global cap, a CAPTCHA (Turnstile), and RU copy for RU users. |
| Q5 | `lib/contact.ts:2-4` → `notifications.ts:22`, JSON-LD | **P0** | `(XXX) XXX-XXXX` goes out in live SMS and schema. There are also 14 `$XXX`/`$XX,XXX` price placeholders in 5 components, and "Outline only… lawyer" legal text (`LegalDocLayout.tsx:39-42`). Add a build-time guard that fails on `XXX` in production. |
| Q6 | `sms.ts:20`, `email.ts:17`, `supabase.ts:13` | P1 | No fetch timeout. A hung Twilio or Supabase call blocks the lead response. Use `AbortSignal.timeout(5000)`. |
| Q7 | `apply:30`, `compliance-alerts:37`, `dispatch-start:43` | P1 | Post-save SMS is awaited inline. Use `after()` from `next/server`. |
| Q8 | `api-guard.ts:19-34` | P1 | Rate limiter: the `hits` Map never evicts keys (memory grows with unique IPs), it trusts the first `x-forwarded-for` entry, and it is per-instance. Move to a shared store (Upstash or the Vercel Firewall rate limit) and read the platform's trusted IP header. |
| Q9 | `api-guard.ts:42-47` | P1 | The size cap trusts `Content-Length`: a chunked body or a non-numeric value (`NaN`) bypasses it, and `req.json()` then buffers without a limit. Read the body as text with a cap, then `JSON.parse`. |
| Q10 | `sms.ts:13,33`, `email.ts:11,30` | P1 | PII in logs: recipient phone numbers and email addresses, and provider error bodies. Redact them. |
| Q11 | All 6 routes | P1 | Hand-rolled validation via `str()` and three near-identical `sanitize*List` helpers. Use a zod or valibot schema per route. |
| Q12 | `supabase.ts:10` | P1 | `insertRow(table: string, row: Record<string, unknown>)` is untyped. Generate Supabase types and constrain the table and row types. |
| Q13 | `api-guard.ts:38` | P2 | A missing `Origin` header is allowed, so the origin check only blocks cross-site browsers. That's acceptable with JSON and no cookies, but don't count it as protection. |
| Q14 | `next.config.ts:9` | P2 | The CSP is still Report-Only and includes `script-src 'unsafe-inline'`. Plan nonces, then switch to enforcing. |
| Q15 | DB failure status | P2 | Own-DB failure returns 502. Use 500 with a server log; 502 is for a failed upstream. |
| Q16 | `apply/route.ts:15` | P2 | `jobSlug` is never checked against `findJob`, so garbage slugs are stored. |
| Q17 | `og-ru.ts` | P2 | Top-level `await` on six file reads at import, with no `server-only` marker. |
| Q18 | Build warning | P2 | `metadataBase` is missing for some routes. It is set in `lib/metadata.ts:53`, but the build still reports that OG URLs resolve to localhost. Set it in the root layouts and in `global-not-found`. |
| Q19 | `vitest.config.ts` | P2 | ESM syntax in a CJS package causes a Vite warning. Rename the file to `.mts`. |

---

## 4. View & Component Breakdown

### 4.1 Monolithic components

| Component | Lines | Responsibilities mixed | Split |
|---|---|---|---|
| `DispatchStartWizard.tsx` | 532 | 12 `useState`s, navigation, fetch, 4 step views, success screen, price aside, option data, `TIME_PHRASES` copy rules | `useDispatchWizard` (reducer `{step, data}`), `options.ts`, `steps/{Truck,Lanes,Authority,Call}Step`, `SuccessPanel`, `SummaryAside`, `Stepper`. The shell drops to about 60 lines. |
| `ClaimProfileWizard.tsx` | 482 | Fake OTP, hardcoded `CARRIER` mock, 3 steps, preview aside, footer | `claim/{VerifyStep,DetailsStep,DoneStep,PreviewAside}` + `useClaimWizard`. Mock data goes to the feature's sample data. |
| `HomePageContent.tsx` | 385 | 10–12 sections of inline markup (the copy is already external, which is good) | `Section`, `FaqList`, `StepsRow`, `PricingExampleCard`, `JobRow`, `ToolCard`. |
| `ComplianceAlertsForm.tsx` | 266 | Form, success view, inline EN/RU SMS preview, fake "found" check | `WatchItemToggle`, `AlertPreview`, `features/compliance/model`. |
| `StateCarriersPage.tsx` / `CityJobsPage.tsx` | 250 / 191 | The same hero, stats, CTA and Suspense layout written twice | `PageHero`, `StatsStrip`, `CtaCard`, `EquipmentBar`, `FilteredSection`. |
| `DispatchPageContent.tsx` | 249 | A 60-line package card, plus FAQ and steps that duplicate Home | `PackageCard`, plus the `FaqList` and `StepsRow` shared with Home. |
| `ProfitCalculator.tsx` | 233 | All the profit maths and verdict thresholds in the view, with a config array rebuilt every render | `features/profit/model/profit.ts` (tested), `ProfitResults`, `NumberField`. |

### 4.2 Duplication → reusable units

| Duplicated | Where | Extract |
|---|---|---|
| Submit pipeline (try/fetch/throw/track/catch/finally) | 6 forms (`fetch("/api/` at About:30, Apply:22, Claim:86, Compliance:39, Dispatch:134, Hire:44) | `useFormSubmit({endpoint, event})` → `{status: idle\|submitting\|sent\|error, submit}`, plus `postJson()` |
| Honeypot `name="website"` block | 6 | `<Honeypot/>` |
| "Something went wrong" error (2 wordings, `<p>` vs `<span>`) | 6 | `<SubmitError/>` |
| Input class string (height drifts across 48/52/54/56 px, `focus:` sometimes missing) and label pair | ~6 inputs, ~12 labels | `ui/Field`, `ui/Select`, `ui/Textarea` |
| Hand-rolled radio and checkbox cards (mixed `aria-pressed` vs `role=radio`, no arrow keys) | Dispatch ×2, Claim ×4, Compliance ×2 (one re-implements `Segmented`) | `ui/ChoiceChip`, `ui/RadioCard`, `ui/CheckRow`, built on native inputs |
| `chipHref` + chip classes | CityTypeChips, StateEquipmentChips, JobsResults, GuidesList, JobsPageContent | `<FilterChips param options basePath current/>` + `buildFilterHref()` |
| `*FromUrl` client wrappers | 4 files / 7 wrappers | One `<UrlParam name fallback>` island, or server-side `searchParams` |
| Health bubble colour ternary | StateCarriersList:82, CityJobsPage:502, JobsResults:114 | `healthOnColor()` + `<HealthBadge score/>` |
| Type and equipment badge | 7 instances | `<Badge variant/>` |
| Check-mark SVG | 9 | `ui/icons.tsx` |
| `toggleInArray` / `toggleLane` | Claim:40, Dispatch:120 | `shared/lib/array.ts` |
| Section wrapper and heading classes | 12 + 12 | `<Section>`, `<SectionTitle>` |

**Design tokens.** The arbitrary colours are scattered: about 101 hex text colours, `border-[#9CA0A8]` ×29, `text-[#4B5058]` ×27, `text-[#3F444B]` ×22 and `text-[13px]` ×31. The amber CTA appears 15 times across 5 heights. Extend the `@theme` in `globals.css` with ink-2, ink-3, input-border and green-tint, and add `ui/Button` with `primary | outline | outlineLight | ghost` variants, `md | lg` sizes and a polymorphic `href`.

### 4.3 State management

- **Good:** `useSyncExternalStore` for consent with an SSR-safe snapshot and GPC respected. No `setTimeout` hacks or effect-syncs-state. Pages are server components by default (20 of 84 `.tsx` files are client). Suspense fallbacks render real content with defaults.
- `ProfitCalculator.tsx:36`: `Number("")` becomes 0, so clearing a field snaps it to 0 while typing. Keep strings in state and parse once.
- `ClaimProfileWizard` and `ComplianceAlertsForm`: `Record<string, boolean>` selection maps sit next to `string[]` in the same file. Use one convention and a reducer.
- `ComplianceAlertsForm.tsx:43-46`: "Watch another carrier" doesn't reset `phone`, `consent` or `watch`. A minor bug.
- `Analytics.tsx:15-38`: one effect depends on both navigation and consent, so granting consent fires a duplicate pageview. Split the effects.
- `SiteHeaderMobileMenu.tsx:10-21`: a context and provider wrap one boolean. The menu doesn't close on route change or Escape.

### 4.4 Accessibility (forms and wizards)

| Sev | Finding |
|---|---|
| P1 | Wizards don't move focus or announce a step change. The success screen replaces the form and focus is lost. Fix: focus a `tabIndex={-1}` step heading on step change, and add a polite live region. |
| P1 | Custom `role=radio`/`checkbox` buttons with no radiogroup arrow-key contract and no `aria-labelledby`. Use native inputs inside labels. |
| P1 | No `aria-invalid` or `aria-describedby`. The `role="alert"` node is inserted already populated, which some screen readers miss. Use a persistent container. |
| P1 | `ComplianceAlertsForm.tsx:128-137`: the phone input has only an `aria-label`, no visible label. |
| P2 | `SiteHeaderLangSwitcher` uses `role="menu"` without menu keyboard handling. Use a disclosure with links. |
| P2 | `ConsentBanner` combines `role="dialog"` with `aria-live`; it should be `role="region"`. `text-[#7D8189]` on asphalt (`ClaimProfileWizard.tsx:122`) probably fails AA at 14px. |

---

## 5. Test Suite & Coverage Assessment

### 5.1 Existing tests (5 files, 38 tests, all passing)

| File | Quality | Issues |
|---|---|---|
| `api-guard.test.ts` | Good: behaviour-focused | `guardLeadRoute` (the function routes actually call) is untested. No window-expiry test (needs fake timers). The module-level `hits` Map is shared state with no reset, and the tests work around it with random keys. No test for a 16000/16001 boundary or a `NaN` content-length. |
| `seo.test.ts` | Good | **Flaky:** compares two `new Date()` calls (`:36-43`) and can fail across midnight. Use `vi.setSystemTime`. No malformed inputs (no comma in `loc`, "1 day ago"). |
| `data.test.ts` | Mixed | The colour test restates hex constants (`:20-27`) and branches inside the test. `findCarrier(CARRIERS[0].slug)` is circular. |
| `city-content.test.ts` | Weak | **Dead assertion** `expect(entry.jobs.length).toBeGreaterThanOrEqual(0)` (`:20`). Hardcoded counts (11, 50). Index-coupled `stats[0]`. |
| `state-content.test.ts` | Data-shape loop | Hardcoded 50. The alphabetical-sort test and the slug-labelled messages are good. |

### 5.2 Coverage gap map

| Module | Logic risk | Tested |
|---|---|---|
| `app/api/*/route.ts` ×6 | **High**: validation, honeypot, 400/502, clamps, SMS trigger | ✗ |
| `lib/supabase.ts`, `sms.ts`, `email.ts` | High: env missing, non-2xx, throw, encoding | ✗ |
| `lib/fmcsa.ts` | High: timeout, 4xx/5xx, bad JSON, shape mapping | ✗ |
| `lib/consent.ts` | High (legal): GPC denial, storage throws, listeners | ✗ |
| `lib/notifications.ts` | Medium: copy, fallbacks | ✗ |
| `lib/api-guard.ts` | High | partial |
| `ProfitCalculator` maths | Medium: negatives, zero rate, NaN | ✗ (and not extractable today) |
| Wizards and forms ×6 | Medium: step logic, validation, payload | ✗ |
| `lib/metadata.ts` (hreflang, canonical) | Medium | ✗ |
| `lib/seo.ts`, `data.ts` | Low | partial |
| `state-content`, `city-content` | Low (data) | shape only |

### 5.3 Infrastructure gaps

- **No CI.** Typecheck, lint, test and build run only by hand.
- No DOM environment (`jsdom`/`happy-dom`) and no Testing Library. The Vitest environment is `node` only.
- No coverage tooling or thresholds (`@vitest/coverage-v8`).
- No E2E (Playwright) and no `tests/` folder.
- No ports or fakes. Infra functions read `process.env` at import, so route tests need `vi.mock` plus `vi.resetModules` plus `vi.stubEnv`. That is workable today: `POST(new Request(...))` runs fine in the node environment and `server-only` is already aliased.

### 5.4 Missing edge cases

- Bodies that are valid JSON but not objects (`null`, `[]`, `"x"`, `42`).
- `trucks` values of `"abc"`, `Infinity`, `0`, `-5`, `501` and `"3.7"`.
- More than 10 lanes, or lanes that aren't strings.
- A `Content-Length` header that lies.
- A spoofed `x-forwarded-for`.
- DB 4xx vs 5xx.
- SMS failure after a successful insert.
- An FMCSA hang hitting the 8s abort.
- Safari private mode, where storage throws.
- Rate-limit window expiry.

### 5.5 Target strategy

- **Pyramid:** about 70% unit (pure model and infra with `fetch` stubbed), about 20% route-handler (`POST(Request)` with injected fakes), about 8% component (jsdom plus RTL for the wizards and forms), plus 3–5 Playwright smoke tests (home, dispatch-wizard submit with the API intercepted, jobs filter, consent banner, carrier lookup).
- **Conventions:** co-locate `x.test.ts` next to `x.ts`. Put E2E in `tests/e2e/` and shared helpers (`makeRequest`, `resetEnv`) in `tests/support/`. Use a per-file `// @vitest-environment jsdom` so the default stays fast.
- **Make it testable:** build routes with `createLeadHandler({ schema, table, map, notify, deps })` so tests inject a fake `insertRow` and `notify` instead of mocking modules. Read env lazily via `server/env.ts`. Export a `resetRateLimit()` for tests.
- **First 10 tests, by risk:**
  1. `dispatch-start` route.
  2. `describe.each` over the other 5 routes.
  3. `guardLeadRoute` status codes and window expiry.
  4. `insertRow`.
  5. The `fmcsa` failure matrix and `toCarrier`.
  6. `consent`, including GPC.
  7. `sendSms` and `sendEmail`.
  8. `profit.ts`.
  9. `isTooLarge` edge cases.
  10. `DispatchStartWizard` component flow.

---

## 6. Actionable Refactoring Roadmap

Each step leaves the app shippable: lint, typecheck, test and build stay green. File moves and behaviour changes go in separate commits.

### P0 — before launch or more traffic (≈ 3–5 days)

| # | Action | Verify |
|---|---|---|
| 0 | Add `.github/workflows/ci.yml` running lint, typecheck, test and build. | A PR shows the four checks. |
| 1 | **Honesty pass on sample data.** Remove `JOBS` from the sitemap, drop the `JobPosting` JSON-LD (or set `noindex`) until postings are real, and use stored dates. Put a visible "Sample data" banner on carrier profiles and state lists. Change the "from public FMCSA data" copy until it is true. | Rich Results test shows no JobPosting. Sitemap diff. |
| 2 | **Claim and compliance flows.** Either wire real OTP and lookup, or label them as demo and disable "Verified"/"Published". | Manual run and a component test. |
| 3 | **SMS protection:** E.164 validation, a per-phone and global daily cap, Turnstile on the 3 SMS routes, `AbortSignal.timeout`, and moving `notify` into `after()`. | Route tests for an invalid phone (400), cap reached (429), and SMS failure still returning `ok`. |
| 4 | **Placeholder guard.** A build or CI step that fails if `XXX` appears in `src/` outside tests. Fill in the phone, prices and address. Legal text reviewed. | CI goes red on a planted `XXX`. |
| 5 | Delete the leaked agent and history comments (`fmcsa.ts:5-16`, `notifications.ts:5-13`, `home-copy.ts:68-72`). | grep. |

### P1 — structural (≈ 2–3 weeks, incremental)

| # | Action | Verify |
|---|---|---|
| 6 | `server/env.ts` (validated, read lazily) plus `server/http/fetch-json.ts` (timeout, `Result`, redaction). Migrate `supabase`, `sms`, `email` and `fmcsa`, and redact PII in logs. | Unit tests with stubbed `fetch` and env. |
| 7 | `createLeadHandler` plus a zod schema per route, to collapse the 6 routes. Fix the rate limiter (shared store, trusted IP, eviction) and read the body with a size cap. Generate the Supabase types. | Route test suite from §5.5, items 1–3. |
| 8 | Add test infrastructure: jsdom, RTL, coverage-v8 with an initial threshold of 40% on `lib/` and `features/`, and Playwright smoke tests. Fix the flaky date test and the dead assertion. | CI coverage report. |
| 9 | **UI primitives:** `Button`, `Field`, `Select`, `ChoiceChip`, `RadioCard`, `CheckRow`, `Section`, `Card`, `Badge`, `HealthBadge`, `FilterChips` and `icons`, plus theme tokens for the repeated hex colours. Migrate form by form. | Visual check per page. The grep count of `border-[#9CA0A8]` falls to 0. |
| 10 | `useFormSubmit` + `postJson` + `<Honeypot/>` + `<SubmitError/>`. Replace the 6 handlers. | Component tests for the error and success states. |
| 11 | **Feature skeleton and aliases** (`@features`, `@shared`, `@server`) with a boundary lint rule. Migrate one feature at a time: start with `profit`, which is independent; then `leads`; then `carriers` (JSON data plus templates, which kills 2,000+ lines); then `jobs` (split `jobs/[slug]` into `resolveJobsSlug`, `JobDetail` and `CityJobsView`); then `dispatch` and `claim` (split the wizards into reducer, steps and aside). | Each migration commit adds its module to the lint boundary list, and a planted cross-feature import fails lint. |
| 12 | Wizard accessibility: focus management, native inputs, `aria-invalid`/`aria-describedby`, and a visible label on the compliance phone input. | Axe run in Playwright. |
| 13 | **i18n:** one `Locale` type and `getCopy()`. Localise `ErrorView` and `NotFound` for RU and the RU SMS copy, generate hreflang, and move the inline `ru ? :` copy out of `GrossComparison`. | `/ru/<bad-path>` shows a Russian 404. |
| 14 | Move inline page content (`new-mc-checklist`, `hire-drivers`, `about`, `tools`, the carrier-lookup factors) into feature content modules, with named fields instead of `t/d/w/n` tuples. | Pages are composition only. No page over about 150 lines. |

### P2 — polish (ongoing)

15. Prettier and a format check. Remove empty fragments, dead `Logo` branches, unused re-exports and `sendEmail` (or wire it with an escaping template). Un-export the internal `api-guard` helpers.
16. `ProfitCalculator`: string-backed inputs and a module-level config. Remove `useDeferredValue` in `GrossComparison`.
17. Split the analytics effects (no duplicate pageview). `ConsentBanner` calls `setConsent` and uses `role="region"`. The mobile menu closes on route change and Escape.
18. CSP: nonces, remove `'unsafe-inline'`, and switch from Report-Only to enforcing.
19. An `og` factory such as `defineOg({alt, …})`, so EN OG images get `alt` text. `metadataBase` in every root layout. Set `dynamicParams = false` on closed sets.
20. Rename `seo.ts` → `structured-data.ts`, `og-ru.ts` → `og-fonts-ru.ts`, and `data.ts` → feature sample modules. Mark `og-ru.ts` server-only. Use a `StateSlug` union type instead of `Record<string, …>`.
21. Rename `vitest.config.ts` → `.mts`. Return 500 rather than 502 for own-DB failures. Validate `jobSlug` against known jobs.

---

## Appendix — What is done well

- Typecheck, lint, tests and build are all green. No `any` and no `eslint-disable`.
- `server-only` is on every infra module. Secrets never reach the client. Raw DB and provider errors never reach the response.
- Security headers include HSTS preload, frame-deny, nosniff and a Permissions-Policy. There is also an origin check, a body cap, a honeypot and per-field length caps.
- `buildMetadata` and `renderOgImage` factories. The RU OG font injection is a clean dependency-injection design. `generateStaticParams` is on all dynamic routes, and thin city pages are noindexed and kept out of the sitemap.
- Locale pages are thin shells over shared `*PageContent` components with a typed `lang`. The copy for the big pages is pulled out into separate modules.
- The privacy-aware analytics: consent store, GPC honoured, query-param allowlist, and PII stripped from Meta events.
- Recent commits show deliberate WCAG AA contrast work.
