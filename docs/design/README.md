# Handoff: Trucker HQ website (design update, 2026-09-26)

## Overview
Trucker HQ: flat-rate truck dispatch, CDL driver jobs, driver hiring and free carrier tools (FMCSA data) for owner-operators and small fleets. English and Russian.
The Next.js app in this repo (`adry999/truckerhq`) already implements most of these designs. This package replaces the outdated `design/` folder and lists what to change in code.

## About the design files
The `.dc.html` files in this folder are **design references built in HTML**, not production code. Open any of them in a browser (they need `support.js` next to them). Recreate them in the existing Next.js 16 + Tailwind 4 codebase using its patterns (`src/components`, tokens in `globals.css`). Do not copy the HTML.

## Fidelity
**High-fidelity.** Colors, type, spacing, radii and copy are final. Placeholders stay until launch: `$XXX` prices, `(XXX) XXX-XXXX`, `USDOT/MC XXXXXXX`, `20XX`, `City, ST`, `Name Surname` / `Dispatcher Name`, stock photos and sample carriers/jobs.

## To do in code (priority order)
1. ✅ **Cyrillic fonts.** `Barlow_Condensed` and `Overpass` are loaded with `subsets: ["latin"]` only, so `/ru` headings fall back to a serif. Add `cyrillic` to Inter, and add `Roboto_Condensed` (700, 800; latin + cyrillic) as the fallback in `--font-display`: `var(--font-barlow-condensed), var(--font-roboto-condensed), sans-serif`. The logo stays Latin.
2. ✅ **hreflang.** In metadata: `alternates: { canonical, languages: { en: "/…", ru: "/ru/…", "x-default": "/…" } }` on every page pair.
3. ✅ **Carrier profile pages are out of scope for now.** Remove `/tools/carrier-lookup/[slug]` URLs from `sitemap.ts` and set `robots: { index: false }` on that route.
4. ✅ **Legal pages** are three separate routes: `/privacy`, `/terms`, `/sms-terms` (already correct). Footer bottom row links to all three.
5. ✅ **Compliance Alerts consent text** under the submit button (required for SMS in the US):
   "By turning on alerts you agree to receive texts from Trucker HQ about this DOT number. Free, usually 1–3 texts a year. Msg & data rates may apply. Reply STOP to cancel, HELP for help." + links to SMS terms and Privacy.
6. ✅ **Nav label** is "Guides" (route `/guides`), RU "Статьи".
7. ✅ **City jobs template** `/jobs/{city-st}`: publish only with 5+ live jobs, otherwise `noindex`. See `Jobs Chicago.dc.html` and `SEO Plan.dc.html`.
8. ✅ **Mobile sizes** (see `Mobile Previews.dc.html`): header 60px under 960px, 72px above; primary buttons `clamp(48px,12vw,56–60px)`; display headings `clamp(36px, 7vw, 80–88px)`; section padding starts at 36px on phones. Never below 44px hit targets. (Implemented via Tailwind breakpoint steps rather than literal `clamp()`; sizes meet or exceed every floor in the spec.)
9. ✅ Replace the default Next.js `README.md`. (Split: this handoff lives here, project README.md rewritten as a normal dev README.)
10. ✅ Favicon / app icon: the route shield (`Logo mark`), not the Next.js default `favicon.ico`.

## Screens (design file → route)
- Homepage.dc.html → `/` · Homepage RU.dc.html → `/ru` (translation draft, native review needed; full RU site comes last)
- Dispatch.dc.html → `/dispatch` · Dispatch Onboarding.dc.html → `/dispatch/start` (noindex)
- Jobs.dc.html → `/jobs`, `/jobs/[slug]` · Jobs Chicago.dc.html → `/jobs/chicago-il`
- Hire Drivers.dc.html → `/hire-drivers`
- Tools.dc.html → `/tools` · Carrier Lookup → `/tools/carrier-lookup` · Profit Calculator → `/tools/profit-per-mile` · Compliance Alerts → `/tools/compliance-alerts` · New MC Checklist → `/tools/new-mc-checklist` (progress in localStorage)
- State Texas.dc.html → `/carriers/texas` (template for all 50 states)
- Resources.dc.html → `/guides` · Guide.dc.html → `/guides/[slug]`
- About.dc.html → `/about` (contact section anchor `#contact`)
- Claim Profile.dc.html → `/claim` (3 steps: verify via FMCSA phone/email code, details, done; noindex)
- Privacy / Terms / SMS Terms → `/privacy`, `/terms`, `/sms-terms` (outline only, lawyer must write final text)
- Not Found.dc.html → `not-found.tsx` ("EXIT 404 · Road closed")
- SiteHeader / SiteFooter / Logo → shared components
- SEO Plan.dc.html → titles, descriptions, schema per route, technical/local/tracking checklists
- Design System.dc.html, Logo Refinements.dc.html (approved 3c), Brand Materials.dc.html (decal, cards, social, email signature)
- `explorations/Homepage v2.dc.html`: dark "highway" direction, **not approved**. Do not build.

## Design tokens
Colors: asphalt `#16181B`, off-white `#F7F7F5`, sign green `#0E5C3A` (hover `#0B4F31`), amber `#F2A900` (hover `#FFBC1F`), text grey `#3F444B` / `#4B5058` / `#6B7280`, border `#DEDFDB`, row divider `#ECEDEA`, light green bg `#EEF6F1` / `#E2F0E8`, red `#B42318`, highlight `#FFF1CC`.
Health Score colors: ≥80 green `#0E5C3A`, 60–79 `#B07A00`, <60 `#B42318`.
Type: display Barlow Condensed 700/800 (uppercase for page titles, card titles, buttons; letter-spacing .04–.05em on buttons); body Inter 400–700; logo Overpass 800/900. Tabular numbers for prices, DOT/MC, phone.
Radii: cards and inputs 8px, buttons 10px, chips 6px. No large rounded bubbles.
Icons: line icons, 2.5px stroke. Road-line divider: `repeating-linear-gradient(90deg,#F2A900 0 48px,transparent 48px 80px)`, 6px high.
Logo 3c: bolted green sign panel ("Trucker | HQ", HQ in amber) wherever the name appears; route shield for favicon, app icon and avatars.

## Assets
Photos are Unsplash stand-ins or empty image slots; replace with the client's own. The list of what the client still has to supply is in the design project (`Content Checklist`).
