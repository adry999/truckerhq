# Trucker HQ: fixes after design review (main @ 180b90f)

Design reference: `docs/design/`. Keep all placeholders ($XXX, phone, email, photos) as they are.

## A. Broken links
1. `src/app/tools/page.tsx:130`: "Carriers by state" links every state except Texas to `#`. Link each one to `/carriers/{slug}` (take slugs from `STATE_DIRECTORY` in `src/lib/states.ts`). Consider rendering all 50 states instead of 12.
2. `src/app/page.tsx` and `src/app/ru/page.tsx`, "Latest CDL jobs": every row links to `/jobs`. Link each row to `/jobs/{slug}`. Better: build the list from `JOBS` in `src/lib/data.ts` instead of the hardcoded array.
3. `src/components/SiteFooter.tsx`: the phone number "(XXX) XXX-XXXX · 24/7" is a plain span. Make it `<a href="tel:+1XXXXXXXXXX">`.

## B. Tap targets under 44px on mobile
4. `SiteFooter.tsx` lines 63 and 70: `min-h-9` → `min-h-11`.
5. `src/components/CityJobsPage.tsx:222`: filter chips `h-9` → `h-11`, so they match `/jobs`.
6. `src/app/tools/carrier-lookup/page.tsx:247`: `min-h-9` → `min-h-11`.
7. `src/components/GrossComparison.tsx:55`: slider `h-8` → `h-11`, and make the thumb at least 28px:
   `[&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7`, with the same values for `-moz-range-thumb`.

## C. Text size
8. `src/app/jobs/page.tsx:168` and `src/app/ru/jobs/page.tsx:168`: the "Health" label `text-[11px]` → `text-[13px]`.

## D. SEO
9. `src/app/sitemap.ts`: add `/carriers` (monthly, priority 0.7).

## E. Backend (open from the previous review)
10. Emails and SMS messages N1–N6 per `docs/design/Notifications.dc.html`. Nothing is sent today; the forms only save to Supabase.
    - Email: Resend (`RESEND_API_KEY`). SMS: Twilio (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`).
    - Send from the existing routes `api/dispatch-start`, `api/apply`, `api/hire-drivers`, `api/contact` and `api/compliance-alerts`, after the Supabase insert succeeds.
    - Send an SMS only if the user gave SMS consent. Every SMS must include "Reply STOP to opt out".
    - If a key is missing, log and skip. The form must still succeed.
    - Messages go out in the language the user chose (EN/RU). Where the Russian text isn't ready yet, use EN.
11. `api/claim`: add a route in the same pattern as the others (validation, honeypot, `api-guard`, Supabase insert into a `claims` table). Connect `ClaimProfileWizard.tsx` to it and fire the `claim_profile` tracking event only after a successful response.

## Not in scope now
- Russian beyond homepage/dispatch/jobs (comes later).
- Telegram/WhatsApp link on About (waiting on the client).
- Resources page and Carrier Panel (not decided).

## Check before pushing
- `npm run build` with no errors.
- At 390px wide: no horizontal scroll on any page, and every tap target is at least 44px.
