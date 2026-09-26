# Handoff: Trucker HQ website (design update, 2026-09-26)

## Overview
Trucker HQ: flat-rate truck dispatch, CDL driver jobs, driver hiring and free carrier tools (FMCSA data) for owner-operators and small fleets. English and Russian.
The Next.js app in this repo (`adry999/truckerhq`) already implements most of these designs. This package replaces the outdated `design/` folder and lists what to change in code.

## About the design files
The `.dc.html` files in `design/` are **design references built in HTML**, not production code. Open any of them in a browser (they need `support.js` next to them). Recreate them in the existing Next.js 16 + Tailwind 4 codebase using its patterns (`src/components`, tokens in `globals.css`). Do not copy the HTML.

## Fidelity
**High-fidelity.** Colors, type, spacing, radii and copy are final. Placeholders stay until launch: `$XXX` prices, `(XXX) XXX-XXXX`, `USDOT/MC XXXXXXX`, `20XX`, `City, ST`, `Name Surname` / `Dispatcher Name`, stock photos and sample carriers/jobs.

## To do in code (priority order)
Done after the 2026-09-26 16:27 sync: Cyrillic fonts, hreflang on / and /ru, carrier profiles noindex + out of sitemap, SMS consent text, Guides label, city-page noindex rule, favicon, README, 8 state pages.

1. **Share images (Open Graph, 1200×630).** `opengraph-image.tsx` from `Share Images.dc.html`: OG1 default (root), OG2 `/dispatch`, OG3 per job (`/jobs/[slug]`, title truncated after 50 chars), OG4 per city, OG5 per guide, OG6 all `/tools/*` and `/carriers/*`. Set `twitter:card = summary_large_image`. Load Barlow Condensed + Overpass in the image route.
2. **Tracking (needed before any ads run).** GA4 + Meta Pixel + Google Ads conversion tag. Events: `call_click` (any `tel:` link), `dispatch_start_submit`, `job_apply_submit`, `hire_drivers_submit`, `carrier_search`, `alerts_signup`. Mark `call_click` and `dispatch_start_submit` as conversions. Keep the phone number in one constant so a call-tracking number can replace it site-wide. Disclose analytics in the Privacy page.
3. **Automated emails and SMS** from `Notifications.dc.html` (N1–N6). Suggested: React Email + an email API (Resend/Postmark) and an SMS provider (Twilio or similar) behind `/api/notify`. Rules: one button per email, 600px wide, footer with address + USDOT/MC; every SMS under 160 chars, ends with STOP; SMS only to numbers that gave consent in the form. Store consent timestamp. N5 (FMCSA change alert) needs a daily job that re-checks watched DOT numbers via `src/lib/fmcsa.ts` and diffs against the last snapshot.
4. **Apple icon**: use the route shield (same as `icon.svg`), not plain "HQ". In `icon.svg` the HQ text is Arial; convert it to a path from Overpass 900 so it matches the logo.
5. **Mobile sizes** (see `Mobile Previews.dc.html`): header 60px under 960px; primary buttons `clamp(48px,12vw,56–60px)`; display headings start at 36px on phones; never below 44px hit targets. Please verify every page at 390px.
6. **Carrier Panel** (`Carrier Panel.dc.html`, route `/panel`): **later, not now.** Needs carrier accounts created after Claim profile. Drivers have no accounts.

## Screens (design file → route)
- Homepage.dc.html → `/` · Homepage RU.dc.html → `/ru` (translation draft, native review needed; full RU site comes last)
- Dispatch.dc.html → `/dispatch` · Dispatch Onboarding.dc.html → `/dispatch/start` (noindex)
- Jobs.dc.html → `/jobs`, `/jobs/[slug]` · Jobs Chicago.dc.html → `/jobs/chicago-il`
- Hire Drivers.dc.html → `/hire-drivers`
- Tools.dc.html → `/tools` · Carrier Lookup → `/tools/carrier-lookup` · Profit Calculator → `/tools/profit-per-mile` · Compliance Alerts → `/tools/compliance-alerts` · New MC Checklist → `/tools/new-mc-checklist` (progress in localStorage)
- State Texas.dc.html → `/carriers/{state}` (8 built; same template for the other 42)
- Resources.dc.html → `/guides` · Guide.dc.html → `/guides/[slug]`
- About.dc.html → `/about` (contact section anchor `#contact`)
- Claim Profile.dc.html → `/claim` (3 steps: verify via FMCSA phone/email code, details, done; noindex)
- Privacy / Terms / SMS Terms → `/privacy`, `/terms`, `/sms-terms` (outline only, lawyer must write final text)
- Not Found.dc.html → `not-found.tsx` ("EXIT 404 · Road closed")
- SiteHeader / SiteFooter / Logo → shared components
- SEO Plan.dc.html → titles, descriptions, schema per route, technical/local/tracking checklists
- Design System.dc.html, Logo Refinements.dc.html (approved 3c), Brand Materials.dc.html (decal, cards, social, email signature)
- `explorations/Homepage v2.dc.html`: dark "highway" direction, **not approved**. Do not build.
- Share Images.dc.html → `opengraph-image.tsx` per route type
- Project Hub.dc.html → status of every screen vs. code (updated after each sync)
- Notifications.dc.html → automated emails and SMS (N1–N6)
- Carrier Panel.dc.html → `/panel`, later
- Ads Plan.dc.html → only the tracking checklist matters for code

## Design tokens
Colors: asphalt `#16181B`, off-white `#F7F7F5`, sign green `#0E5C3A` (hover `#0B4F31`), amber `#F2A900` (hover `#FFBC1F`), text grey `#3F444B` / `#4B5058` / `#6B7280`, border `#DEDFDB`, row divider `#ECEDEA`, light green bg `#EEF6F1` / `#E2F0E8`, red `#B42318`, highlight `#FFF1CC`.
Health Score colors: ≥80 green `#0E5C3A`, 60–79 `#B07A00`, <60 `#B42318`.
Type: display Barlow Condensed 700/800 (uppercase for page titles, card titles, buttons; letter-spacing .04–.05em on buttons); body Inter 400–700; logo Overpass 800/900. Tabular numbers for prices, DOT/MC, phone.
Radii: cards and inputs 8px, buttons 10px, chips 6px. No large rounded bubbles.
Icons: line icons, 2.5px stroke. Road-line divider: `repeating-linear-gradient(90deg,#F2A900 0 48px,transparent 48px 80px)`, 6px high.
Logo 3c: bolted green sign panel ("Trucker | HQ", HQ in amber) wherever the name appears; route shield for favicon, app icon and avatars.

## Assets
Photos are Unsplash stand-ins or empty image slots; replace with the client's own. The list of what the client still has to supply is in the design project (`Content Checklist`).
