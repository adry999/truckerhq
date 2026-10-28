# TruckerHQ — Code quality & correctness audit

- Date: 2026-10-28
- Commit: `1fcb0b3` (main)
- Sector: logic bugs, wizard/form state, client/server validation parity, hydration, client boundaries, routes/links, i18n, dead code, duplication, type holes, error/loading boundaries, test gaps. API security is out of scope (other agent).
- Method: read-only review of `src/features/**`, `src/shared/**`, `src/components/**`, `src/app/**`, plus `npm run lint`, `npm run typecheck`, `npm test`. Two delegated sweeps (internal links vs routes; EN/RU i18n). Every finding below was checked against the source; anything not fully confirmed is marked "(unverified)".

## 1. Automated checks

| Check | Result |
|---|---|
| `npm run lint` | exit 0, no errors or warnings |
| `npm run typecheck` (`next typegen && tsc --noEmit`) | exit 0 |
| `npm test` (`vitest run`) | **exit 1**. 36 files / 217 tests passed, but 11 files never ran: `[vitest-pool]: Failed to start forks worker ... Timeout waiting for worker to respond` for every jsdom component test (`DispatchStartWizard`, `ClaimProfileWizard`, `ComplianceAlertsForm`, `HireDriversForm`, `AboutContactForm`, `ApplyForm`, `ProfitCalculator`, `NotFoundContent`, `choices`, `useFormSubmit`, `StepProgress`). Duration 90.8 s, "setup 56%, environment 31%". See finding P1-4. |

No `any`, no `eslint-disable`, no `@ts-ignore`, no `TODO/FIXME`. Only seven `as` casts in non-test code and all are narrow (`as Node`, `as Locale`, `as DispatchAction`, `{} as ProfitInputs`, `as FmcsaEnvelope`, `as ArrayBuffer`, `as Omit<...>`).

## 2. Prior audit (2026-10-09) — status of items in this sector

| Item | Status | Evidence |
|---|---|---|
| A1 `lib` imports `CityJob` type from components | FIXED | `src/features/jobs/model/jobs.types.ts` |
| A2 flat `lib/` | FIXED | `lib/` gone; `features/shared/server` layout, boundary lint in `eslint.config.mjs` |
| A3 `state-content.ts` 2,026 lines | FIXED | 37-line template over `data/states/*.json` with zod schema |
| A4 `city-content.ts` 1,163 lines, hardcoded job counts drift | STILL OPEN | 1,148 lines; hero stat/title/description/OG say e.g. "225 Open jobs" while each city lists 7 sample jobs (see P2-1) |
| A6 hand-maintained `city-slugs` / `RU_JOB_TITLES` maps | STILL OPEN (mitigated) | `city-slugs.ts` now has an integrity test; `RU_JOB_TITLES` (`home-job-rows.ts:27`) covers all 7 jobs today but has no test |
| A7 `jobs/[slug]` branching in three files | FIXED | `resolveJobsSlug()` discriminated union |
| A8 carrier-lookup page split | FIXED | `LookupLanding` / `LookupResults` / `CarrierResultRow` |
| A9 inline copy in pages | MOSTLY FIXED | `new-mc-checklist`, `hire-drivers`, `about` moved to features; `app/(en)/tools/page.tsx` still 142 lines with an inline `TOOLS` array and a hardcoded "86 / Carpathian Freight" card |
| A10 i18n (Locale type, getCopy, RU 404/error, generated hreflang) | MOSTLY FIXED | `shared/i18n/*`, `ru/error.tsx`, `ru/not-found.tsx`, `ru/[...missing]`. Remnants: `JobsResults.tsx:64` inline `lang === "RU" ? … : …`; SMS still EN-only (`notifications.ts:6`) |
| A13 client bundle (`healthColor` from `lib/data`; `*FromUrl` wrappers) | FIXED | `shared/lib/health-score.ts`; `useSearchParam` + `*View` pattern |
| 3.1 leaked agent/history comments (`fmcsa.ts`, `notifications.ts`, `home-copy.ts`) | FIXED | grep clean |
| 3.1 `ConsentBanner` duplicate `localStorage` write + `onChoice` | STILL OPEN | `ConsentBanner.tsx:12` writes, then `Analytics.tsx:93` passes `setConsent` which writes again |
| 3.1 `HomePageContent` hero image rendered twice with `loading="lazy"` + `fetchPriority="high"` | STILL OPEN | `HomeHero.tsx:10-18` and `:73-81` (two `<Image>` of the same URL, first one lazy + high priority) |
| 3.1 throw-then-catch submit handlers | FIXED | `useFormSubmit` + `postJson` |
| 3.1 `typeof key === "string"` always true | FIXED | |
| 3.1 `fmcsa.ts` `num()` null guard on non-null type; `as FmcsaEnvelope` | STILL OPEN | `fmcsa.ts:63`, `:55` |
| 3.1 `GrossComparison` `useDeferredValue` on trivial math | STILL OPEN | `GrossComparison.tsx:13` |
| 3.1 `DispatchStartWizard` `Math.min(4, s+1)` | FIXED | reducer |
| 3.1 `SiteHeaderLangSwitcher` `flex` + `${open ? "flex" : "hidden"}` | STILL OPEN | `SiteHeaderLangSwitcher.tsx:62-63` |
| 3.1 single-letter keys / positional tuples | STILL OPEN | `lookup.ts:10-15` `{t,w,d}`, `profile.ts:16` `PanelRow` tuple, `jobs.ts:37-46` `jobFacts` tuples, `SiteFooter.tsx:5` `{h, links:{t}}`, `carriers.types.ts:43-44` `{t, pct}` |
| 3.1 dead code (`email.ts`, `Logo` `mark/sub/className/light`) | STILL OPEN | `server/messaging/email.ts` has no caller (comment says so); `Logo.tsx:18-61, 87-94` unreachable (only `theme="dark" size` is ever passed) |
| 4.3 `ProfitCalculator` `Number("")` snaps to 0 | FIXED | string-backed state |
| 4.3 `ComplianceAlertsForm` "Watch another" doesn't reset | FIXED | `watchAnother()` |
| 4.3 Analytics duplicate pageview on consent grant | STILL OPEN | `Analytics.tsx:20-38` one effect keyed on `[pathname, searchParams, consent]` |
| 4.3 mobile menu doesn't close on route change / Escape | PARTIAL | closes on link click only (`SiteHeaderMobileMenu.tsx:71`); no Escape, no close on back/forward |
| 4.4 wizard focus / announcements | FIXED | `useStepFocus`, `StepProgress` live region |
| 4.4 custom radio/checkbox buttons | FIXED | native inputs in `shared/ui/choices.tsx` |
| 4.4 no `aria-invalid` / `aria-describedby` on fields | STILL OPEN | `Field.error` prop exists but is never passed; grep for `aria-invalid` in `src/` returns nothing |
| 4.4 compliance phone input without visible label | FIXED | `Field label="Mobile number"` |
| 4.4 `role="menu"` without keyboard handling | STILL OPEN | `SiteHeaderLangSwitcher.tsx:61` |
| 4.4 `ConsentBanner` `role="dialog"` + `aria-live` | STILL OPEN | `ConsentBanner.tsx:22-24` |
| 5.1 flaky `new Date()` seo test; dead `>= 0` assertion | FIXED | `structured-data.test.ts` has no dates; `city-content.test.ts` asserts `> 0` and `>= MIN_JOBS_TO_INDEX` |
| Q1 JobPosting schema / jobs in sitemap | FIXED | no `JobPosting` schema; job pages `noindex`; sitemap excludes jobs |
| Q2 sample carriers labelled | FIXED (UI) | `CarrierProfile` Notice, "sample data" footers, `JobDetail` Notice |
| Q3 fake OTP / fake lookup match | FIXED | claim wizard is a labelled demo with manual verification; compliance form no longer "finds" a carrier |
| Q5 `XXX` placeholders + lawyer outline text; build guard | STILL OPEN | `scripts/check-placeholders.mjs` exists but is warn-only in CI (`ci.yml:250` runs it without `--strict`); see P0-1 |
| Q17 top-level `await` in OG fonts without `server-only` | FIXED | `og-fonts-ru.ts:1` |
| Q18 `metadataBase` | FIXED | `rootMetadata`, `global-not-found.tsx` |
| Q19 `vitest.config.ts` → `.mts` | FIXED | |
| §5.3 no CI, no jsdom/RTL, no coverage, no E2E | FIXED | `ci.yml`, 47 test files, coverage thresholds, 6 Playwright smoke tests |

## 3. New findings

### [P0] Launch placeholders are still rendered, sent by SMS and emitted as structured data; the guard is warn-only
- `src/shared/config/contact.ts:2-4` — `PHONE_DISPLAY="(XXX) XXX-XXXX"`, `PHONE_HREF="tel:+1XXXXXXXXXX"`, `PHONE_SCHEMA="+1-XXX-XXX-XXXX"`. Rendered in `SiteHeader.tsx:87`, `SiteHeaderMobileMenu.tsx:91`, `SiteFooter.tsx:28`, `NotFoundContent.tsx:47`, `home-copy.ts:71,215`, `dispatch-copy.ts:52,142`; emitted as `ContactPoint.telephone` in `app/(en)/about/page.tsx:21`.
- `$XXX` / `$XX,XXX` prices: `HomePricing.tsx:17,49`, `DispatchHero.tsx:49`, `DispatchPricing.tsx:43`, `GrossComparison.tsx:75,78`, `SummaryAside.tsx:22`, `ProfitCalculator.tsx:65`.
- Legal: `LegalDocLayout.tsx:40-41` "Outline only. The final text must be written or reviewed by a lawyer", `:68-69` "Street address, City, ST 00000"; `app/(en)/terms/page.tsx:29` "[To be written by your lawyer.]"; `app/(en)/privacy/page.tsx:29` "[Which analytics and ad tools the site uses, if any.]".
- Identity: `features/contact/data/about.ts:6-8` "20XX", USDOT/MC "XXXXXXX", `:13-28` "Name Surname"/"Dispatcher Name"; same names in `home-copy.ts:158-160, 302-304`.
- Problem: a visitor can call `tel:+1XXXXXXXXXX`, Google reads a bogus telephone in JSON-LD, and the pricing pages advertise "$XXX". `npm run check:placeholders` only warns (`.github/workflows/ci.yml:250`), so nothing stops this shipping.
- Fix: fill the values; then switch CI to `node scripts/check-placeholders.mjs --strict` and add `Name Surname|Dispatcher Name|20XX|\[To be written` to `PATTERNS` in `scripts/check-placeholders.mjs:10`. Until the phone exists, hide the call CTAs behind `PHONE_IS_PLACEHOLDER` (already exported but only used in `notifications.ts:17`).

### [P1] Sample carrier profile: the score breakdown never adds up to the headline score
- `src/features/carriers/model/profile.ts:30-71` vs `src/features/carriers/data/carriers.ts:4-11`.
- Problem: the profile header shows `c.score` (hand-typed) and the "Score breakdown" card shows four factors computed by `scoreBreakdown()`. For all 8 sample carriers the factors sum to a different number: Carpathian 91 vs 93, Moldova 68 vs 62, Volga 84 vs 82, Danube **37 vs 10**, Iron Horse 79 vs 89, Lone Star 88 vs 86, Dniester **72 vs 90**, Red River 58 vs 54. The breakdown also uses a different inspection formula (`30 - v*0.6 - d`) than the live scorer (`fmcsa.ts:90`, capped `min(20, v*0.6) + min(10, d*1.5)`), so sample and live scores are not comparable either.
- Fix: make `score` derived — `score: scoreBreakdown(c).reduce((s, f) => s + f.v, 0)` at data load (or compute both from one `computeHealthScore(carrier)` in `model/`), reuse the same inspection formula as `fmcsa.ts`, and add a test in `profile.test.ts`: `for (const c of CARRIERS) expect(sum(scoreBreakdown(c))).toBe(c.score)`.

### [P1] 398 of 400 state-directory rows link to an empty lookup result (or to a real, unrelated carrier)
- `src/features/carriers/ui/StateCarriersList.tsx:44` — every row links to `/tools/carrier-lookup?q=${c.dot}&mode=DOT`.
- Problem: `searchCarriers()` (`server/lookup.ts:15`) matches sample DOTs only against the 8 entries in `data/carriers.ts`; only 2 of the 400 DOTs in `data/states/*.json` exist there (verified by script), so clicking a row shows "0 carriers for …". With `FMCSA_WEBKEY` set, the invented DOT number is sent to FMCSA and whatever real carrier owns that number is shown under a row that advertised sample equipment, trucks and a "WARNING"/"INACTIVE" status — the misrepresentation risk the prior audit called out (Q2) now has a live link path.
- Fix: render rows as non-links unless `findCarrier` has a profile for that DOT (`CARRIERS.some(c => c.dot === row.dot)`), or point rows at the state page's own anchor. Add a test that every linked DOT resolves to a sample carrier.

### [P1] `npm test` fails locally: jsdom component suites never execute (vitest forks worker timeout)
- `vitest.config.mts:139-143` (`environment: "node"`, default `pool: "forks"`, per-file isolation).
- Problem: on this machine all 11 `// @vitest-environment jsdom` files hit "Failed to start forks worker … Timeout waiting for worker to respond" and are skipped; the run still prints "36 passed" and exits 1. Vitest itself reports "~3.25 s startup each … ~7.4 s faster with `isolate: false`". The 11 skipped suites cover every wizard and form. Whether CI (ubuntu, Node 24) hits the same timeout is unverified; the risk is a green-looking run that silently skipped the UI tests. Re-running `StepProgress.test.tsx` + `ProfitCalculator.test.tsx` alone: 9/9 pass, exit 0, but 68 s for two files with "environment 72%", i.e. ~25 s of jsdom bootstrap per file. The suites are correct; the per-file jsdom environment is what starves the pool.
- Fix: in `vitest.config.mts` set `pool: "threads"` (or keep forks with `isolate: false`), and group jsdom files under a `projects` entry with `environment: "jsdom"` so the heavy environment is created once per worker instead of per file. Make the CI step fail on `Errors` (it already does via exit code) and have CI print the per-file list so a skipped suite is visible.

### [P1] Server field errors never reach the field: no `aria-invalid` / `aria-describedby` anywhere
- `src/shared/ui/Field.tsx:7-34` defines `error`, but no caller passes it (grep `error={` and `aria-invalid` in `src/` → none). All six forms show only the global `<FormError>` (`form-bits.tsx:15`).
- Problem: the server rejects with messages like "Enter a valid US phone number" (`server/leads/fields.ts:21`), but the invalid control is not marked, so screen-reader users get an alert with no association, and sighted users see red text below the submit button, far from the phone input. Carried over from the prior audit (4.4 P1).
- Fix: return `{ error, field }` from `rejectResponse` for schema issues (`issue.path[0]` is available in `create-lead-handler.ts:46`), surface `field` through `postJson`/`useFormSubmit`, and pass `error`/`aria-invalid` into the matching `Field`. Minimal version: treat any 400 as the phone field for the five phone-first forms.

### [P1] Russian users get English SMS even after choosing Russian
- `src/server/leads/notifications.ts:6` "English-only until the Russian SMS copy is approved"; `app/api/compliance-alerts/route.ts:37` and `app/api/apply/route.ts:32` do not pass `language` to `notify`, although both forms collect it (`ComplianceAlertsForm.tsx:54`, `ApplyForm.tsx:16`), and the compliance page promises "in English or Russian" (`tools/compliance-alerts/page.tsx:33`) while the preview shows RU copy (`ComplianceAlertsForm.tsx:40`).
- Fix: add `Record<Locale, string>` SMS bodies next to the EN ones, normalise `language` to `Locale` in the schema (`z.enum(["EN","RU"]).catch("EN")`), and pass it through `notify`.

### [P1] GA pageview double-fires when consent is granted on the first page
- `src/components/Analytics.tsx:20-38` — one effect keyed on `[pathname, searchParams, consent]` calls `gtag("config", …, { page_path })` every time `consent` changes.
- Problem: landing on a page fires a pageview; clicking "Accept" flips `consent` and fires the same pageview again (carried from prior audit 4.3). Analytics counts are inflated for every converting visitor.
- Fix: split into two effects — pageview on `[pathname, searchParams]`; Meta init/`PageView` on `[consent]` with the `fbInitedRef` guard.

### [P2] City landing pages advertise hundreds of openings but list 7 sample jobs
- `src/features/jobs/data/city-content.ts` (per city: `stats[0].big` e.g. "225", `title` "…225 Openings…", `description`), `CityJobsView.tsx:53-63` renders the stat; `app/(en)/jobs/[slug]/opengraph-image.tsx:20` puts "225 Open Jobs" on the OG card; `JobsBoard.tsx:54` and `model/cities.ts:12` show the same count as the city chip.
- Problem: the list under it says "Sample listings" and shows `jobs.length === 7` for every city (verified). Hardcoded counts (prior A4) now contradict the honesty labels added for Q1/Q2.
- Fix: derive `count` from `jobs.length` (or drop the number until real postings exist) and generate `title`/`description` from a template as `state-content.ts` already does.

### [P2] `/guides` promises a checklist feature that doesn't exist
- `src/features/guides/ui/GuidesIndex.tsx:33` "17 steps for your first 6 months, with progress saved."
- Problem: `NewMcChecklist` is a static server component; there is no state, no `localStorage`, no client code in `features/compliance/ui/NewMc*.tsx`. The "17" counts `SHUTDOWN_REASONS` (reasons, not steps) in `data/new-mc-checklist.ts`.
- Fix: change the copy ("Every filing for your first 6 months") or implement persistence.

### [P2] Carrier lookup results block on a synchronous 8 s upstream call with no loading UI
- `src/app/(en)/tools/carrier-lookup/page.tsx:23` awaits `searchCarriers()` (FMCSA `timeoutMs: 8000`, `fmcsa.ts:50`) before rendering anything; no `loading.tsx` exists anywhere under `src/app` and `LookupResults` is not inside `<Suspense>`.
- Fix: keep the header/search box static and stream the results: `<Suspense fallback={<ResultsSkeleton/>}><LookupResults …/></Suspense>` with the fetch moved into an async child, or add `src/app/(en)/tools/carrier-lookup/loading.tsx`.

### [P2] Lead `language` is stored in three incompatible formats
- `dispatch-start` sends `"English" | "Русский"` (`dispatch-start.ts:18`, stored via `route.ts:46`), `apply`/`contact`/`compliance-alerts` send `"EN" | "RU"`, `hire-drivers` sends `"Any" | "English" | "Russian"`.
- Fix: one `localeField = z.enum(["EN","RU"]).catch("EN")` in `server/leads/fields.ts`; map the wizard's display label to `Locale` in `buildPayload`.

### [P2] `ProfitResults` hydration mismatch for non-en-US browsers
- `src/features/profit/ui/ProfitResults.tsx:46` — `result.totalMiles.toLocaleString()` with no locale inside a client component that is server-rendered; `money()` on `:18` correctly pins `"en-US"`.
- Problem: a browser with `ru-RU` (the site's second audience) renders "1 120 mi" vs the server's "1,120 mi" → React 19 text-mismatch error and a client re-render of the boundary.
- Fix: `toLocaleString("en-US")`.

### [P2] Profit calculator edge cases: cost bar overflows on a losing load; zero-mile verdict is "THIN MARGIN"
- `ProfitResults.tsx:30-38` — segment widths are `amount / loadPay`; when `totalCost > loadPay` the four cost segments exceed 100 % and are clipped, and the "Profit" segment is `max(0, profit)` so a loss is invisible in the bar.
- `profit.ts:75,81-83` — with `totalMiles = 0`, `perMile` is 0 so the verdict is "THIN MARGIN" even when `profit < 0` (tolls > pay) or every input is 0.
- Fix: scale segments by `Math.max(loadPay, totalCost)`; in `verdictFor`, take `profit` as a second argument and return `"losing"` when `profit < 0` regardless of `perMile`, and show "—" when `totalMiles === 0`. Add the two cases to `profit.test.ts`.

### [P2] `ConsentBanner` double-writes consent and misuses `role="dialog"`
- `src/components/ConsentBanner.tsx:10-18, 21-24`; `Analytics.tsx:93`.
- Fix: delete the `localStorage` write in `ConsentBanner` (call `onChoice` only) and use `role="region" aria-label="Cookie consent"` (drop `aria-live`); update `tests/e2e/smoke.spec.ts:50` which queries `getByRole("dialog")`.

### [P2] Header menus: language switcher has `role="menu"` without menu keyboard semantics; mobile menu ignores Escape and history navigation
- `SiteHeaderLangSwitcher.tsx:47-61` (`aria-haspopup="menu"`, `role="menu"`, `role="menuitem"` on links; no arrow-key handling), `SiteHeaderMobileMenu.tsx:50-66` (`usePathname` is read but never used to close; no `keydown` listener).
- Fix: switcher → plain disclosure (`aria-expanded` + a `<ul>` of links). Mobile menu → `useEffect(() => setOpen(false), [pathname])` and an Escape handler.

### [P2] Hero image is rendered twice with contradictory loading hints
- `src/features/home/ui/HomeHero.tsx:10-18` (`loading="lazy"` + `fetchPriority="high"` on a `md:block` image) and `:73-81` (same URL again inside `md:hidden`).
- Problem: both `<img>` elements are in the DOM at every viewport; `display:none` prevents the fetch but the browser still parses two preload candidates, and "lazy + high priority" contradict. Carried from the prior audit.
- Fix: one `<Image priority sizes="(min-width: 768px) 48vw, 100vw">` positioned with CSS for both layouts.

### [P2] Dead and unreachable code
- `src/shared/ui/Section.tsx` — `Section`/`SectionTitle` have zero importers.
- `src/server/messaging/email.ts` — no callers (self-documented "No caller yet"); `RESEND_*` env schema entries exist only for it.
- `src/components/Logo.tsx:18-61` (`mark` branch), `:87-94` (`sub`), `className`, `theme="light"` — only `theme="dark" size={n}` is ever passed (`SiteHeader.tsx:62,65`, `SiteFooter.tsx:49`).
- `src/features/compliance/ui/ComplianceAlertsForm.tsx:79` — `dot || "DOT 3412897"` is unreachable (`dot` is `required`).
- `src/features/carriers/server/fmcsa.ts:63` — `v === null` on a `number | string | undefined` parameter.
- Fix: delete, or un-export, and let the coverage threshold rise.

### [P2] `app/(en)/tools/page.tsx` still mixes content and markup (142 lines)
- `:16-41` inline `TOOLS` array; `:77-89` hardcoded "86 / Carpathian Freight / DOT 3412897" card duplicated from `HomeHero.tsx:61-69` and `HomeTools.tsx:33-39`.
- Fix: `features/tools/data/tools.ts` + a `SampleCarrierCard` in `shared/ui`, as done for the other pages (prior A9).

### [P3] Inline RU ternary left in `JobsResults`
- `src/features/jobs/ui/JobsResults.tsx:64` `lang === "RU" ? "примеры вакансий" : "sample listings"`. Move to `JOBS_COPY.sampleListingsLabel`.

### [P3] Search box echoes the lowercased query
- `src/features/jobs/ui/JobsSearchForm.tsx:33` passes `useSearchParam("q").trim().toLowerCase()` as `defaultValue`; typing "Carpathian" and searching shows "carpathian" in the box. Keep the raw value for display; lowercase only in `JobsResults.tsx:99`.
- `JobsResults.tsx:31` concatenates `company + loc + title` with no separator, so a query can match across the boundary ("llchouston"). Join with a space.

### [P3] City job cards all link to `/jobs`
- `src/features/jobs/ui/CityJobsList.tsx:23` `href="/jobs"` for every card (the `CityJob` type has no slug). A card styled as a job link that always goes to the board is misleading; either give city jobs slugs or render them as non-link cards without the "View job" affordance.

### [P3] `authorityAge` pluralisation and `GrossComparison` `useDeferredValue`
- `profile.ts:25` → "1 months". `GrossComparison.tsx:13` `useDeferredValue` on two multiplications (prior 3.1).

### [P3] Internal links via `<a>` instead of `<Link>`
- `ApplyForm.tsx:93,97`, `HireDriversForm.tsx:100,104`, `AboutContactForm.tsx:113,117`, `ConsentBanner.tsx:31`, `app/(en)/tools/compliance-alerts/page.tsx:23`. Full reload instead of client navigation; inconsistent with the rest of the code base.

### [P3] Positional tuples and single-letter keys in content
- `lookup.ts:10-15` `{t, w, d}`, `lookup.ts:17-21` `[label, value]`, `profile.ts:16` `PanelRow`, `jobs.ts:37-46` `jobFacts` `[k, v, c]`, `jobs.ts:48` `{t, items}`, `SiteFooter.tsx:5` `{h, links:{t}}`, `carriers.types.ts:43-44`. Prior 3.1; still open. Rename to `{label, points, detail}` etc.

### [P3] `global-error.tsx` is English-only and unstyled
- `src/app/global-error.tsx` — acceptable as a last resort, but a RU user who hits a root-layout error sees "Something went wrong". Consider reading `document.documentElement.lang` (client component) to pick RU copy from `ERROR_COPY`.

## 4. Verified OK (no action)
- Next 16 API usage: `params`/`searchParams` awaited as Promises everywhere; `error.tsx` uses `retry` (stable since 16.3 per `node_modules/next/dist/docs/.../error.md:331`); `after()` for post-save notify; `global-not-found` + `experimental.globalNotFound`; `LayoutProps<"/">` from typegen; no `middleware.ts`.
- `"use client"` boundaries: 20 client files, all need it (hooks, `useSearchParams`, event handlers). `ErrorContent → StatusPage → SiteHeader` is pulled into the client bundle by `error.tsx`, which is fine (no server-only imports in that tree).
- Profit math: `calcProfit` clamps negatives/NaN/Infinity to 0, divides safely, and the example in `profit.test.ts` matches by hand (`1120 mi`, `perMile 0.78`).
- Wizard reducers: `StepProgress` only offers completed steps and none once `current >= steps.length`, so the dispatch form cannot be re-submitted after success; `canAdvance` gates the call step; honeypot is read from `FormData` before `postJson`.
- Client/server validation parity: client `required` + server `requiredText`/`usPhone`/`dotNumber`; the server's 400 message is surfaced through `postJson` (`USER_FACING` statuses). Filter chip options match the data (`JobsResults` EQUIPMENT/TYPES vs `jobs.ts`; `GuidesList` CATEGORIES vs `guides.ts`; every state row's `equipment` is in its `equipmentOptions`).
- `RU_JOB_TITLES` covers all 7 `JOBS` slugs; `CITY_NAME_TO_SLUG` has an integrity test.
- Prior test smells (date flake, dead assertion) are gone; 217 unit tests + 6 Playwright smokes, coverage thresholds in `vitest.config.mts`.

## 5. Test coverage gaps on critical paths
- No invariant test `sum(scoreBreakdown(c)) === c.score` for `CARRIERS` (would have caught P1-1).
- No test that state-row DOT links resolve (P1-2).
- `server/leads/notifications.ts` untested (copy, throttle interaction, placeholder phone branch).
- `Analytics`/`PageviewTracker` untested (duplicate pageview, consent gating).
- `SiteHeader` RU route mapping and lang-switcher hrefs untested.
- No E2E for `/ru` home or `/ru/jobs` beyond the 404 case, none for carrier lookup or the profit calculator.
- `home-job-rows.ts` `RU_JOB_TITLES` vs `JOBS` slug coverage has no test (prior A6).

## 6. Delegated sweeps (not returned)
Two read-only sweeps were spawned (internal hrefs vs `src/app` routes; EN/RU dictionary and hardcoded-string gaps) but had not reported back when this report was handed in. Their results are NOT included; nothing above is based on them. What I verified myself on those topics:
- Routes/links: every `href` I read in pages, header, footer, status copy, wizards and forms targets an existing route or anchor (`/about#contact` → `AboutContact.tsx:6 id="contact"`, `#pricing` → `DispatchPricing.tsx:6`). RU nav intentionally falls back to EN routes for Tools/Guides/Hire (`SiteHeader.tsx:29-31`); unmatched `/ru/*` → `ru/[...missing]` → RU 404 (covered by E2E). Dead-end link class found: state rows → empty lookup (P1 above).
- i18n: EN/RU key parity holds by construction (`Record<Locale, T>` typed tables); gaps found by reading: SMS EN-only (P1), `JobsResults.tsx:64` inline ternary (P3), hardcoded EN aria-labels on RU pages (`SiteHeader.tsx:80` "Call dispatch 24/7", `SiteHeaderLangSwitcher.tsx:47`, `SiteHeaderMobileMenu.tsx:28` "Menu"), `SiteFooter` is EN-only on RU pages, `html lang` is set correctly per tree (`RootDocument`), RU OG locale set (`ru/layout.tsx:7`). A full component-by-component string sweep remains to be done.
