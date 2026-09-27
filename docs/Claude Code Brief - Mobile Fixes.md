# Trucker HQ: mobile fixes (from phone screenshots, 390px)

## 1. Two logos in the header (critical, on every page)
On mobile both logos show side by side: "TRUCKER HQ TRUCKER HQ". The header overflows, the EN button gets cut off and the menu button (hamburger) is pushed off screen. The visitor can't open the menu.

Cause: `Logo.tsx` always adds `inline-flex` to its root. In `SiteHeader.tsx:74-75` that clashes with `sm:hidden` and with `hidden sm:inline-flex`, and `inline-flex` wins, so both logos show.

Fix in `SiteHeader.tsx`: put the visibility on a wrapper, not on the Logo:
```tsx
<Link href={homeHref} className="flex shrink-0">
  <span className="sm:hidden"><Logo theme="dark" size={26} /></span>
  <span className="hidden sm:inline-flex"><Logo theme="dark" size={30} /></span>
</Link>
```
Search the whole of `src/` for any other `<Logo ... className="...hidden...">` and fix it the same way.

## 2. Footer: the logo overlaps the "SERVICES" column
In `SiteFooter.tsx`, the first column (logo + text) is too narrow for the logo in `grid-cols-2`. Give that column the full row on mobile:
```tsx
<div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
```

## 3. RU homepage: job links
In `src/app/ru/page.tsx`, "Latest CDL jobs" still links every row to `/ru/jobs`. Link each row to `/jobs/{slug}`, the same as on the EN homepage.

## Check
At 390px on homepage, /dispatch, /jobs, /tools/carrier-lookup and /carriers/texas:
- one logo in the header
- the language button, the phone button and the menu button all fully visible
- the menu opens
- no horizontal scroll
