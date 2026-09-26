# Trucker HQ

Flat-rate truck dispatch, CDL driver jobs, driver hiring and free carrier
tools (FMCSA data) for owner-operators and small fleets. Next.js 16 (App
Router), TypeScript, Tailwind v4, React 19. English and Russian (`/ru`).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Structure

- `src/app` — routes (App Router). Most pages are server components;
  interactive pieces (calculators, wizards, forms) are isolated
  `"use client"` components under `src/components`.
- `src/lib/data.ts` — sample carrier/job data used across Carrier Lookup,
  Jobs and the homepage.
- `src/lib/guides.ts`, `src/lib/seo.ts` — guide metadata and JSON-LD helpers.
- `src/app/sitemap.ts`, `src/app/robots.ts` — SEO metadata routes.

## Design source

Design specs and the current handoff notes live in `docs/design/` — see
[`docs/design/README.md`](docs/design/README.md). The `.dc.html` files
there are design references (open in a browser, not production code); the
Next.js app in `src/` is the real implementation.

## Placeholders

Sample data, `$XXX` prices, `(XXX) XXX-XXXX` phone numbers and stock
photos are intentional placeholders until the client supplies real data.
