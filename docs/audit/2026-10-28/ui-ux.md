# TruckerHQ — UI/UX + Accessibility Audit

- **Date:** 2026-10-28
- **Branch:** main @ `1fcb0b3` (post i18n merge)
- **Scope:** `src/app/**`, `src/features/**/ui`, `src/shared/ui`, `src/components`, `globals.css`, fonts, `docs/design/`, both Claude Code briefs, and the 2026-10-09 audit's UI/UX/a11y items.
- **Method:** read-only code review, Tailwind-token contrast math, and a `next dev` run with curl against `/`, `/ru`, `/dispatch/start`, `/ru/dispatch/start`, `/ru/<missing>`, `/nope`, `/jobs`, `/claim`, `/tools/carrier-lookup?q=…`, `/privacy`. No visual rendering; layout findings are reasoned from classes. Dev server stopped afterwards.
- **Severity:** P0 blocks launch/ads · P1 measurable conversion or WCAG AA failure · P2 friction / AA risk · P3 polish.

---

## 1. Status of prior findings

### 1.1 `docs/Claude Code Brief - Mobile Fixes.md`

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Two logos in header | **FIXED** | `src/components/SiteHeader.tsx:60-67` wraps each `<Logo>` in a `span` carrying the visibility class |
| 2 | Footer logo column `col-span-2 … sm:col-span-1` | **FIXED** | `src/components/SiteFooter.tsx:48` |
| 3 | RU homepage job rows link to `/jobs/{slug}` | **FIXED** | `src/features/home/model/home-job-rows.ts:56`, used by `src/app/ru/page.tsx:26` |

### 1.2 `docs/Claude Code Brief - Fixes.md`

| # | Item | Status | Evidence |
|---|---|---|---|
| A1 | Tools page: all states link to `/carriers/{slug}` | **FIXED** | `src/app/(en)/tools/page.tsx:126-129` maps `STATE_DIRECTORY` |
| A2 | Home "Latest CDL jobs" per-row links, built from `JOBS` | **FIXED** | `home-job-rows.ts`, `HomeJobs.tsx:21` |
| A3 | Footer phone as `tel:` link | **FIXED** | `SiteFooter.tsx:28` uses `PHONE_HREF` |
| B4 | Footer links `min-h-11` | **FIXED** | `SiteFooter.tsx:64,71` |
| B5 | City filter chips `h-11` | **FIXED** | `src/shared/ui/FilterChips.tsx:44`, `CityJobsView.tsx:157` |
| B6 | Carrier-lookup mode chips `min-h-11` | **FIXED** | `LookupLanding.tsx:41` (`h-11`) |
| B7 | Gross slider `h-11`, 28px thumb | **FIXED** | `GrossComparison.tsx:40` |
| C8 | "Health" label 13px | **FIXED** | `JobCard.tsx:43` |
| D9 | `/carriers` in sitemap | **FIXED** | `src/app/sitemap.ts:24` |
| E10 | SMS/email notifications | **PARTIAL** | `src/server/messaging/sms.ts` + `notifications.ts` exist and run via `after()`; `email.ts` has no callers (outside this audit's UI scope) |
| E11 | `api/claim` route + wizard wired | **FIXED** | `src/app/api/claim/route.ts`, `ClaimProfileWizard.tsx:41-50` tracks only after success |

### 1.3 `docs/audit/2026-10-09-codebase-audit.md` — UI/UX/a11y items

| Ref | Item | Status | Evidence |
|---|---|---|---|
| §4.4 P1 | Wizards don't move focus / announce step | **FIXED** | `src/shared/hooks/useStepFocus.ts`; `StepProgress.tsx:46-48` polite live region; success headings `tabIndex={-1}` focused (test `DispatchStartWizard.test.tsx:28`) |
| §4.4 P1 | Custom `role=radio/checkbox` buttons | **FIXED** (wizards) | `src/shared/ui/choices.tsx` uses native inputs in labels. `Segmented.tsx` is still `aria-pressed` buttons for single-select groups (see F-14) |
| §4.4 P1 | No `aria-invalid` / `aria-describedby`; alert inserted populated | **PARTIAL** | `FormError` is now a persistent live region (`form-bits.tsx:15-20`). `Field.tsx` still renders `hint`/`error` with no ids and never sets `aria-describedby`/`aria-invalid`; only `NumberField.tsx:39` does. See F-08 |
| §4.4 P1 | Compliance phone input has no visible label | **FIXED** | `ComplianceAlertsForm.tsx:130` `Field label="Mobile number"` |
| §4.4 P2 | Lang switcher `role="menu"` without menu keyboard handling | **STILL OPEN** | `SiteHeaderLangSwitcher.tsx:48,61,77` — see F-11 |
| §4.4 P2 | ConsentBanner `role="dialog"` + `aria-live` | **STILL OPEN** | `ConsentBanner.tsx:22-24` — see F-05 |
| §4.4 P2 | `text-[#7D8189]` on asphalt | **FIXED** | no occurrences in `src/` |
| §4.3 | ProfitCalculator `Number("")` snaps to 0 | **FIXED** | string-backed state, `ProfitCalculator.tsx:10,74` |
| §4.3 | Compliance "Watch another" doesn't reset | **FIXED** | `ComplianceAlertsForm.tsx:60-66` |
| §4.3 | Analytics: consent grant fires duplicate pageview | **STILL OPEN** | `Analytics.tsx:38` effect deps `[pathname, searchParams, consent]` |
| §4.3 | Mobile menu doesn't close on Escape / route change | **STILL OPEN** | `SiteHeaderMobileMenu.tsx` has no key handler; closes only on link `onClick` |
| §3.1 | ConsentBanner duplicate `localStorage` write | **STILL OPEN** | `ConsentBanner.tsx:12` and `consent.ts:35` both write |
| §3.1 | Hero image rendered twice | **STILL OPEN** | `HomeHero.tsx:10-18` and `:73-80`, both `fetchPriority="high"` |
| §3.1 | `useDeferredValue` in GrossComparison | **STILL OPEN** | `GrossComparison.tsx:13` |
| A10 | RU error / 404 show English | **FIXED** (copy) | `status-copy.ts` RU, `ru/[...missing]/page.tsx`. New lang-attr issue: F-09 |
| Q5 | `(XXX) XXX-XXXX` / `tel:+1XXXXXXXXXX` / `$XXX` live | **STILL OPEN** (by design until launch) | curl `/`: 9 `tel:+1XXXXXXXXXX` links, 4 `$XXX`; see F-01 |
| §4.2 | Design tokens / Button primitive | **PARTIAL** | tokens exist in `globals.css`; 167 raw hex colours remain in `src/**/*.tsx`; `Button` exists but most landing CTAs are hand-rolled (F-16) |

---

## 2. Findings

### [P0] Every click-to-call target dials a placeholder number
`src/shared/config/contact.ts:2-3`; rendered in `SiteHeader.tsx:79`, `SiteHeaderMobileMenu.tsx:88`, `SiteFooter.tsx:28`, `HomePricing.tsx:29`, `DispatchHero.tsx:36`, `DispatchCta.tsx:23`, `SuccessPanel.tsx:48`, `NotFoundContent.tsx:44`, `HireDriversHero.tsx:38`
**Problem.** `PHONE_HREF = "tel:+1XXXXXXXXXX"`. curl of `/` shows nine such links; `/dispatch/start` seven. On a phone, tapping the most prominent CTA on the site (the header phone button is the *only* always-visible CTA under `lg`) opens the dialer with an invalid number. `call_click` is also the primary conversion in the design README, and it is not tracked (no `call_click` anywhere in `src/`). This is known as a launch placeholder, but it is also the single biggest conversion hole and must be on the launch checklist with a hard gate.
**Fix.** (1) Fill `contact.ts` before any traffic; keep `PHONE_IS_PLACEHOLDER` and, while it's true, render the phone CTAs as `href="/about#contact"` with the label "Request a call" instead of a dead `tel:`. (2) Add a shared `<CallLink>` (client) that wraps `<a href={PHONE_HREF}>` and fires `trackEvent("call_click", { placement })` on click; replace the nine hand-rolled anchors. (3) Add a CI grep that fails the production build when `PHONE_HREF` contains `X`.

### [P1] No `<main>` landmark and no skip link on any page
`src/components/RootDocument.tsx:57-61`; every page wraps content in `<div className="flex min-h-screen flex-col">` (e.g. `src/app/(en)/dispatch/start/page.tsx:17`, `claim/page.tsx:17`, `LegalDocLayout.tsx:29`, `StatusPage.tsx:25`)
**Problem.** curl of all sampled pages: `<main` count 0, "skip to" count 0. Keyboard and screen-reader users must tab through the header (logo, lang button, phone, menu button, 5 nav links) on every page before reaching the form — WCAG 2.4.1 Bypass Blocks (A) fails. The header is `sticky`, so a skip target must also account for it.
**Fix.** In `RootDocument.tsx` add, as the first child of `<body>`:
```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-amber focus:px-4 focus:py-3 focus:font-display focus:font-extrabold focus:uppercase focus:text-asphalt">Skip to content</a>
```
Replace the page wrapper `div` in each route (or in a shared `PageShell`) with `<main id="main" tabIndex={-1} className="flex flex-1 flex-col scroll-mt-[72px]">` between `<SiteHeader/>` and `<SiteFooter/>`. Add `role="contentinfo"` is implicit on `<footer>`; keep `<header>`/`<nav>` as they are.

### [P1] Russian visitors are routed into an English-only wizard (and a 404 on `/ru/dispatch/start`)
`src/components/SiteHeader.tsx:46-48`, `src/features/home/data/home-copy.ts:230,289` (RU `dispatchCardCtaHref`/`pricingCtaHref` → `/dispatch/start`), `src/features/dispatch/ui/start-wizard/**` (EN strings only), `src/app/ru/dispatch/page.tsx` (RU landing exists, no `start/`)
**Problem.** The RU homepage, RU dispatch landing and RU header "Начать" all land on the EN wizard: headings, options ("Dry van", "Every 2 weeks", "I don't have one yet"), the consent sentence and the success panel are English. For the 40–60 year old Russian-speaking owner-operator this is where the primary conversion dies. curl `/ru/dispatch/start` → 404. Also the lang button's accessible name is English on RU pages (`SiteHeaderLangSwitcher.tsx:47`).
**Fix.** Localise the wizard copy through the existing `getCopy(…, lang)` pattern: move the option arrays and labels in `dispatch-start.ts`/`steps/*.tsx` behind a `DISPATCH_WIZARD_COPY: Record<Locale, …>`, keep the *stored values* English (server schema is unchanged), and add `src/app/ru/dispatch/start/page.tsx` rendering `<DispatchStartWizard lang="RU"/>`. Until that ships, pre-select `language: "Русский"` when the wizard is reached from a `/ru` referrer (`searchParams.lang=ru`) so the callback at least happens in Russian, and set the header `startHref` to `/ru/dispatch/start` once it exists.

### [P1] Consent banner links to a privacy policy that doesn't disclose the trackers it asks consent for
`src/components/ConsentBanner.tsx:29-33`, `src/app/(en)/privacy/page.tsx:28-29` (`"[Which analytics and ad tools the site uses, if any.]"`), `src/components/LegalDocLayout.tsx:39-42` ("Outline only…")
**Problem.** Once `NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_META_PIXEL_ID` are set, GA4 (consent-mode default denied) and the Meta base script load before any choice, and the banner says "See our Privacy Policy" — which is a bracketed placeholder with an "Outline only" banner on top. The design README item 2 explicitly requires "Disclose analytics in the Privacy page" before ads run. There is also no way to change the choice later (no "Cookie settings" link in the footer; `consent.ts` has no reset).
**Fix.** Fill the "Cookies and analytics" section (GA4, Meta Pixel, Google Ads conversion tag, purpose, retention, how to opt out, GPC honoured). Add a footer `LEGAL` entry "Cookie settings" that calls a new `resetConsent()` (sets `cached = null`, removes the key, notifies listeners) so the banner reappears. Keep the Meta base script behind `consent === "granted"` (move the `<Script id="meta-pixel-init">` inside that condition) so nothing from Facebook loads before consent.

### [P1] Consent banner is a fixed full-width overlay with no page offset; on phones it covers the submit button
`src/components/ConsentBanner.tsx:21-27`
**Problem.** `fixed inset-x-0 bottom-0 z-50` with stacked text + two buttons is ~150px tall at 390px. Nothing adds `padding-bottom` to `body`, so the bottom of every page — including the "Request my call" / "Send application" buttons and the 404 call link — is hidden until the visitor dismisses it. For a low-patience audience that is a drop-off. It also combines `role="dialog"` (implies modal) with `aria-live` and gives no heading.
**Fix.** `role="region" aria-label="Cookie consent"`, drop `aria-live`. Render it as the last child of `<body>` **in flow** (`sticky bottom-0`) or, if it stays fixed, set `document.body.style.paddingBottom = bannerHeight` via a `ResizeObserver` while visible. Make the buttons full-width on mobile: `className="grid grid-cols-2 gap-2 sm:flex"` and `h-12`. Call `setConsent` directly and delete the duplicate `localStorage` write (`:10-18`).

### [P1] Field-level errors are never associated with their inputs; server validation errors land in one line under the button
`src/shared/ui/Field.tsx:21-33` (no ids, no `aria-describedby`/`aria-invalid`), `src/shared/hooks/useFormSubmit.ts:34`, `src/app/api/*/route.ts` (`usPhone()` returns "Enter a valid US phone number"), `DispatchStartWizard.tsx:85`
**Problem.** Client validation is only native `required`. The one real rule — the phone must be a valid NANP number (`fields.ts:21-29`) — is enforced on the server, so a 50-year-old typing "555 1234" taps "Request my call", waits for the round trip, and gets a red line *under* the button that is not tied to the field (`aria-invalid` is never set, `aria-[invalid=true]:border-red` in `CONTROL` never triggers). On a phone the error may be off-screen below the button. In the wizard this happens on step 4 after three steps of effort.
**Fix.** (1) `Field` generates ids with `useId()` and clones/passes `aria-describedby={[hintId, errorId]}` and `aria-invalid={!!error}` to the control (make `Field` render-prop style: `children(controlProps)` or wrap with `cloneElement`). (2) Validate phone client-side on blur/submit with the already-shared `toUsE164()` (`src/shared/lib/phone.ts`) and show the message in `Field error` before posting; focus the first invalid control. (3) Add `inputMode="tel"` is implicit on `type="tel"`, but add `pattern="[0-9()+\- ]*"` and `maxLength={20}`. (4) Keep `FormError` for transport failures only and place it *above* the submit button.

### [P1] DOT/MC inputs lack numeric keyboard and digit filtering
`src/features/dispatch/ui/start-wizard/steps/AuthorityStep.tsx:34-38` (MC/DOT, plain text), `src/features/hire-drivers/ui/HireDriversForm.tsx:17` (DOT, `type:"text"`), `src/features/claim/ui/claim-wizard/DetailsStep.tsx:24-30` (phone, no `autoComplete="tel"`)
**Problem.** Only the compliance form sets `inputMode="numeric"` (`ComplianceAlertsForm.tsx:108`). Elsewhere the phone keyboard opens in full QWERTY for a 6–8 digit number, and the server `dotNumber()` rule strips non-digits silently, so "MC 1182044" is accepted while the placeholder suggests the prefix.
**Fix.** `inputMode="numeric" pattern="[0-9 ]*" autoComplete="off" maxLength={10}` on both DOT/MC fields; placeholder `"1182044"` with the hint "Digits only, MC or USDOT". Add `autoComplete="tel" inputMode="tel"` to the claim phone input.

### [P1] `/ru/<missing>` 404 renders without `lang` (dev-verified)
`src/app/ru/[...missing]/page.tsx`, `src/app/ru/not-found.tsx`
**Problem.** curl `/ru/nope` (and `/ru/dispatch/start`) in `next dev` returns `<html id="__next_error__">` with **no** `lang` attribute while `/nope` returns `<html lang="en" …>`. The Russian copy is present, so screen readers will read Cyrillic with an English voice (WCAG 3.1.1 Language of Page). Verify after `next build && next start`; if it persists, it is a Next.js catch-all + `notFound()` shell issue.
**Fix.** Give the ru segment its own `src/app/ru/layout.tsx`-level `not-found` by exporting metadata and ensuring `RootDocument lang="ru"` wraps it; if the error shell is unavoidable, set `document.documentElement.lang = "ru"` in a tiny client effect inside `ru/not-found.tsx` as a fallback.

### [P2] No sticky mobile CTA; below `lg` the only visible conversion control is a 44px phone icon with a placeholder number
`src/components/SiteHeader.tsx:91-96` (`hidden … lg:flex`), `SiteHeaderMobileMenu.tsx:80-92` (CTA only inside the opened menu), `docs/design/Mobile Previews.dc.html` (no sticky bar in design either)
**Problem.** On `/`, `/dispatch` and `/carriers/*` the "Get started" button is hidden under 1024px. The first in-page dispatch CTA on the homepage is below hero → facts → dispatch card (`HomeDispatch.tsx:35`, which links to `/dispatch`, another hop). EN `pricingCtaHref` is `/dispatch` while RU is `/dispatch/start` (`home-copy.ts:144` vs `:289`) — the English funnel has one more page than the Russian one.
**Fix.** Add a `MobileCtaBar` (client, `lg:hidden`, `sticky bottom-0`, two buttons: amber "Start dispatch" → `/dispatch/start`, outline "Call") rendered on `/`, `/ru`, `/dispatch`, `/ru/dispatch`, `/carriers/[state]` and `/tools/carrier-lookup/[slug]`; hide it when the consent banner is visible or a form is in viewport (`IntersectionObserver` on the form). Point EN `pricingCtaHref`/`dispatchCardCtaHref` at `/dispatch/start` like RU does.

### [P2] Wizard "Back" and step-label buttons are below 44px tap targets
`src/features/dispatch/ui/start-wizard/WizardNav.tsx:17-23`, `src/shared/ui/StepProgress.tsx:30-36`
**Problem.** The Back button is bare `text-base` text with no height or padding (~24px tall). Completed step labels in the progress bar are `text-sm` buttons (~17px tall) sitting under a 6px bar. WCAG 2.5.8 Target Size (AA, 24px minimum) is borderline; the project's own rule is 44px.
**Fix.** `WizardNav` back: `className="flex min-h-11 items-center gap-1 rounded-lg px-3 -ml-3 …"`. `StepProgress` button: `className={cx(labelClass, "flex min-h-11 items-start pt-1 text-left text-amber hover:underline")}` and keep the `li` `gap-2`.

### [P2] Lookup results hide the DOT/MC columns on phones
`src/features/carriers/ui/lookup/CarrierResultRow.tsx:27-29` (`hidden … md:block`), `LookupResults.tsx:87` (header row `hidden md:grid`)
**Problem.** The hero promises "Check any carrier in 10 seconds" and the search is by DOT/MC, yet on mobile the result row shows only name, city, status and score — the visitor can't confirm the DOT they typed matched. The status/health pills also have no column label on mobile, and the whole grid is `div`s, so screen readers get no table semantics.
**Fix.** Show `DOT {c.dot}` in the second line on mobile: `<span className="text-sm text-grey">{c.city}, {c.st} · DOT {c.dot}{c.mc ? ` · ${c.mc}` : ""}</span>` and keep the dedicated columns `md:` only. Add `aria-label="Authority"` / `"Health Score"` on the two pill wrappers, or render the list as `<table>` with `sr-only` `<th>` on mobile.

### [P2] Language switcher is a fake menu
`src/components/SiteHeaderLangSwitcher.tsx:48,61,77`
**Problem.** `aria-haspopup="menu"` + `role="menu"`/`menuitem` without arrow-key navigation or focus move into the menu; the items are links, so the menu pattern is wrong anyway. On RU pages the button's `aria-label` is "Language: Russian" in English.
**Fix.** Disclosure pattern: remove `role="menu"`/`menuitem` and `aria-haspopup`, keep `aria-expanded`/`aria-controls`, use `<ul>` of links, label `aria-label={ru ? "Язык: русский" : "Language: English"}`, and on open move focus to the first link. Add `hrefLang="ru"`/`"en"` on the links.

### [P2] Mobile menu: no Escape, no focus return, panel is not a dialog
`src/components/SiteHeaderMobileMenu.tsx:23-40, 50-94`
**Problem.** The hamburger toggles an inline panel; there is no Escape handler, focus stays on the button, and nothing closes it on back/forward navigation. `aria-haspopup="true"` announces a menu but the panel is a `<nav>`. Since the header is `sticky`, an open panel pushes content and can exceed the viewport on short phones with no scroll containment.
**Fix.** Add a `keydown` Escape listener that closes and refocuses the button (same pattern as `SiteHeaderLangSwitcher.tsx:17-24`), close on `pathname` change (`useEffect(() => setOpen(false), [pathname])`), drop `aria-haspopup`, and give the panel `max-h-[calc(100dvh-60px)] overflow-y-auto`.

### [P2] Single-select groups use toggle buttons instead of radios
`src/shared/ui/Segmented.tsx:20-36`; used in `TruckStep.tsx:14,30`, `LanesStep.tsx:37`, `CallStep.tsx:38,48`, `HireDriversForm.tsx:80-88`, `AboutContactForm.tsx:58,96`, `ComplianceAlertsForm.tsx:141`
**Problem.** `role="group"` with `aria-pressed` buttons: a screen-reader user hears "Dry van, toggle button, pressed" and has to tab through every option; there is no "1 of 5" context and no arrow-key selection. The visible label above is a `<span>`, not a legend, so the group name is duplicated through `aria-label` only. Visually there is no focus ring inside the group beyond the global outline.
**Fix.** Re-implement `Segmented` on native `<input type="radio" className="peer sr-only">` inside `<label>` wrapped in `<fieldset><legend>`, reusing the `peer-checked:` and `peer-focus-visible:` classes already in `choices.tsx:5`. Remove the duplicate `<span>` labels in the step files and pass the text as `legend`.

### [P2] Success states of the four single-page forms lose focus and are not headings
`src/features/jobs/ui/ApplyForm.tsx:24-39`, `src/features/hire-drivers/ui/HireDriversForm.tsx:45-57`, `src/features/contact/ui/AboutContactForm.tsx:32-46`, `src/features/compliance/ui/ComplianceAlertsForm.tsx:70-94`
**Problem.** On success the `<form>` is unmounted and replaced by a panel whose title is a `<span>` (Apply, Hire, Contact) or an unfocused `<h2>` (Compliance). Focus drops to `<body>`; a screen-reader user hears nothing. The wizards solved this (`useStepFocus`), the forms didn't.
**Fix.** Give `useFormSubmit` an optional `successRef`, or in each form render `<h2 ref={ref} tabIndex={-1} className="… outline-none">` and `useEffect(() => { if (status === "sent") ref.current?.focus(); }, [status])`. Also tell the visitor *what happens next and when* consistently ("within one business day" exists on Apply/Hire; Contact says "shortly"; Compliance says "a confirmation text is on its way") and add the phone number they entered, as `SuccessPanel.tsx:34` does.

### [P2] Wizard gives no early-step feedback and allows an empty "Lanes" step
`src/features/dispatch/model/dispatch-start.ts:111-114` (`canAdvance` true for steps 0–2), `LanesStep.tsx:13-19` (Home base free text, no `autoComplete`)
**Problem.** Steps 1–3 can always be advanced; de-selecting every region is allowed and later shows "Lanes —" in the summary. "Home base" has no `autoComplete="address-level2"` (the hire-drivers form has it) and no `enterKeyHint="next"`, so on iOS the keyboard's return key submits (advances) unexpectedly. The step heading is `h2` while the page `h1` sits in a separate section (fine), but there is no visible "Step 2 of 4" text — only the sr-only status — which matters for the 40–60 audience.
**Fix.** In `canAdvance`: `if (step === 1) return data.lanes.length > 0;` and render `Field error` text "Pick at least one region". Add `autoComplete="address-level2" enterKeyHint="next"` to Home base. Show the live-region text visibly: `className="font-sans text-sm text-on-dark-muted"` instead of `sr-only` in `StepProgress.tsx:46`.

### [P2] Hero image is fetched twice and both copies are high priority
`src/features/home/ui/HomeHero.tsx:10-18, 73-80`
**Problem.** Desktop (`hidden md:block`) and mobile (`md:hidden`) copies of the same Unsplash image are both rendered; the mobile one has no `loading="lazy"` and `fetchPriority="high"`, so desktop downloads a 100vw-sized duplicate it never shows; mobile downloads the desktop one too unless the browser skips `display:none` fill images (it does not for `priority` images). This directly delays LCP on 4G in a truck cab.
**Fix.** One `<Image … priority sizes="(min-width:768px) 48vw, 100vw">` placed in a wrapper that changes position with CSS (`relative aspect-video md:absolute md:inset-y-0 md:right-0 md:left-[52%] md:aspect-auto`), or use `<picture>` with `media` queries so only one source loads.

### [P2] Analytics fires a second GA pageview when consent is granted
`src/components/Analytics.tsx:20-38`
**Problem.** `PageviewTracker`'s effect depends on `consent`; clicking "Accept" re-runs `gtag("config", GA_ID, { page_path })`, i.e. a duplicate pageview for every visitor who accepts on the first page. Inflates sessions/pageviews exactly on the landing page you'll be optimising ads against.
**Fix.** Split into two effects: pageview on `[pathname, searchParams]` only; Meta `init`/`PageView` in a separate effect keyed on `consent` that tracks `PageView` once per path via a `lastTrackedPath` ref.

### [P3] Comparison/summary "tables" are div grids
`src/features/dispatch/ui/landing/GrossComparison.tsx:47-79, 86-107`, `src/features/carriers/ui/lookup/LookupResults.tsx:86-97`, `src/features/jobs/ui/JobDetail.tsx:51-62`
**Problem.** Numeric comparisons (10 % vs 8 % vs flat, feature-by-feature matrix, job facts) are `grid` divs; screen readers cannot navigate by row/column, and at 390px the three-column matrix with `p-4` leaves ~100px per cell for sentences.
**Fix.** Use `<table>` with `<caption className="sr-only">`, `<th scope="col|row">`; on mobile stack with `block` rows or reduce padding to `p-3` and `text-[13px]` for the matrix.

### [P3] Footer email links to the contact form, not `mailto:`; office address is a placeholder on a trust section
`src/components/SiteFooter.tsx:29`, `src/features/contact/ui/AboutContact.tsx:36-40`, `src/features/contact/data/about.ts:13-25` ("Name Surname", "Dispatcher Name"), `HomeTeam.tsx:13` (grey boxes for photos)
**Problem.** The footer shows an email address whose link goes to `/about#contact`. The About page shows "Street address · City, ST 00000", a grey rectangle where the map should be, and team cards with placeholder names and empty photo boxes — the trust signals a sceptical owner-operator looks for are visibly unfinished. Known placeholders, listed here so they are on the launch gate.
**Fix.** `href: "mailto:hello@truckerhq.com"`; add the real address or remove the block; ship real team photos/names or drop `HomeTeam` until they exist (an empty team section hurts more than none).

### [P3] Small hit area and cramped copy on the compliance consent checkbox
`src/features/compliance/ui/ComplianceAlertsForm.tsx:165-175`
**Problem.** Native checkbox is `h-4 w-4` with 13px grey text; the label is the hit area but its line-height is ~20px, so the row is ~40px tall. The submit button is `disabled` until the box is ticked with no explanation.
**Fix.** `className="mt-0.5 h-5 w-5 shrink-0 accent-green"`, label `min-h-11 items-center text-sm text-ink-2`, and instead of disabling the button keep it enabled and show "Tick the consent box to continue" via `Field error` on submit.

### [P3] Amber-on-light and hex drift versus the token set
`src/app/(en)/tools/page.tsx:90` (`text-amber` on `bg-green`, 4.0:1 — passes only because the text is 20px bold), `src/shared/ui/FaqList.tsx:10,15`, `HomeJobs.tsx:33-36`, `HomeQuotes.tsx:23`, `LegalDocLayout.tsx:39`, 167 raw hex occurrences in `src/**/*.tsx`
**Problem.** `globals.css` defines `--color-amber-on-green` for exactly this case, yet the tools card uses `text-amber`. Elsewhere `text-[#4B5058]`, `text-[#3F444B]`, `border-[#ECEDEA]`, `bg-[#EEEFEC]`, `text-[#D4D6DA]` are used instead of `text-ink-2`, `text-ink-3`, `border-divider`, `bg-surface-muted`, `text-on-dark`. All measured pairs still pass AA (grey `#6B7280` on `#F7F7F5` ≈ 4.6:1; `#8A8F98` is only used on dark surfaces), so this is consistency, not a failure.
**Fix.** `text-amber` → `text-amber-on-green` on green surfaces; a one-off codemod mapping the hex values above to the tokens; add an ESLint rule (`no-restricted-syntax` on `/\[#[0-9a-f]{6}\]/i` in className) so it doesn't regress.

### [P3] RU strings at risk of wrapping inside fixed-height buttons
`src/components/SiteHeaderMobileMenu.tsx:87-92` (`h-14 text-[22px]` "ЗВОНОК 24/7 · (XXX) XXX-XXXX" — 28 characters at 390px), `src/features/dispatch/ui/landing/DispatchPricing.tsx:62` (RU `cta: "Поговорить с нами"` in `h-14 text-xl`), `src/features/dispatch/data/dispatch-copy.ts:61-89`
**Problem.** Fixed `h-14` with no `min-h`/`flex-wrap`; condensed uppercase Cyrillic at 22px is ~12px per glyph, so the call row is ~340px of text inside a 358px button. If it wraps, the second line is clipped. Not visually verified.
**Fix.** `min-h-14 py-2 text-center leading-tight` on the two menu buttons and `text-[clamp(16px,4.6vw,22px)]`; or split into two lines on purpose (`Звонок 24/7` / number) with `flex-col`.

### [P3] Search inputs are not `type="search"`; hero search button uses an inline style
`src/features/home/ui/HomeHero.tsx:41-53`, `src/features/carriers/ui/lookup/LookupLanding.tsx:59-71`, `src/features/jobs/ui/JobsSearchForm.tsx:15-21`
**Problem.** Plain `<input>` with only `aria-label`; iOS shows "return" instead of "search", no clear-x, no `autoCapitalize="off"` for DOT/MC. The hero/lookup submit buttons set `style={{ background: "var(--color-amber)" }}` instead of `bg-amber`.
**Fix.** `type="search" enterKeyHint="search" autoCapitalize="off" autoCorrect="off" spellCheck={false} inputMode={mode === "Name" ? "text" : "numeric"}`; replace the inline style with `bg-amber hover:bg-amber-hover`.

### [P3] `Notice` and demo labelling are good; the Claim wizard still collects nothing that identifies the claimant
`src/features/claim/ui/claim-wizard/ClaimProfileWizard.tsx:63-65`, `ContactStep.tsx`, `claim.ts:110-121`
**Problem.** The demo notice is clear (prior P0 mitigated). But the flow submits `dot` of the sample carrier plus a chosen masked contact method; there is no name/phone/email of the person claiming, so "Expect a call within 1-2 business days" cannot be honoured. Fine as a demo, misleading if left when the lookup goes live.
**Fix.** When the claim flow goes live, add a required "Your name" and "Your phone" on the Contact step (reuse `Field`/`TextInput` with `autoComplete`), and pass the real `dot` from `/tools/carrier-lookup/[slug]` via the `ClaimBanner` link (`?dot=`).

---

## 3. What is in good shape

- Wizard focus management, polite step announcements, persistent `role="alert"` error region, native radio/checkbox cards with visible `peer-checked`/`peer-focus-visible` states (`choices.tsx`), 44px targets on nav, chips, footer and segmented controls, `tabular-nums` on prices/DOT/phone, RU `lang` on `/ru` (curl-verified), RU 404/error copy, Cyrillic display fallback font wired via `unicode-range`, global `:focus-visible` outline that beats `outline-none`, consent default-denied for GA (Consent Mode v2) and GPC honoured, query-param allowlist for analytics, SMS consent sentences on every lead form, "Sample listing"/"Demo" notices on jobs and claim, sticky summary asides on desktop, `EmptyState` on filtered lists, no animations (so no reduced-motion work needed).

## 4. Suggested order

1. F-01 phone placeholder gate + `call_click` (P0, ads blocked without it).
2. F-02 `<main>` + skip link (one shared shell, half a day).
3. F-03 RU wizard (biggest RU conversion gap).
4. F-04/F-05 consent: privacy text, region role, in-flow banner, Meta behind consent.
5. F-06/F-07 field-level validation + numeric keyboards (shared `Field` change, then forms).
6. F-09–F-13 mobile CTA bar, tap targets, lookup DOT on mobile, lang switcher, mobile menu.
7. The rest with the token codemod.
