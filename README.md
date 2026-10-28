# Trucker HQ

Flat-rate truck dispatch, CDL driver jobs, driver hiring and free carrier
tools (FMCSA data) for owner-operators and small fleets in the US. Next.js 16
(App Router), TypeScript, Tailwind v4, React 19. English and Russian (`/ru`).

Production domain: **truckerhq.us** (planned, not live yet). Hosting:
Hostinger Node.js Web App behind Cloudflare. Where the project stands and
what comes next: [`docs/STATUS.md`](docs/STATUS.md).

## Getting started

```bash
npm install
cp .env.example .env.local   # every variable is optional for local dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without env vars the site still works:
- carrier lookup uses sample data;
- forms skip Supabase, SMS, email and Turnstile;
- every page is `noindex`.

`.env.example` documents each variable.

## Scripts

- `npm run dev`: dev server
- `npm run build` / `npm run start`: production build and server
- `npm run lint`: ESLint
- `npm run typecheck`: `next typegen` + `tsc`
- `npm test`, `npm run test:coverage`: Vitest
- `npm run test:e2e`: Playwright (builds and serves on port 3100)
- `npm run check:placeholders`: lists sample values still in the UI

## Structure

Rules for where code goes and who may import what are in
`.claude/skills/project-conventions/SKILL.md`. In short:

- `src/app`: routes only (pages, metadata, `api/*` route handlers, sitemap, robots, `llms.txt`).
- `src/features/<feature>`: `data/`, `model/`, `ui/`, and `server/` where needed, per feature (carriers, dispatch, jobs, guides, …).
- `src/server`: server-only code. Covers env validation, the HTTP guard (origin, Cloudflare IP and secret, rate limit, Turnstile), the Supabase insert, the lead handler and SMS/email.
- `src/shared`: config (site URL, contact, SMS consent, Turnstile), i18n, SEO helpers, UI primitives and hooks.
- `supabase/migrations`: lead tables plus the RLS lockdown. See `supabase/README.md` before applying.

## Docs

- `docs/STATUS.md`: current state, blockers, next steps.
- `docs/launch-runbook.md`: go-live steps for domain, Cloudflare, Hostinger, email, Supabase, Turnstile and SEO.
- `docs/audit/2026-10-28/`: launch audit (7 sector reports + merged plan).
- `docs/design/`: design references (`.dc.html` prototypes, open in a browser).

## Placeholders

Sample data, `$XXX` prices, `(XXX) XXX-XXXX` phone numbers and stock
photos are intentional placeholders until the client supplies real data.
Sample-data pages (state carrier pages, stub guides, city job pages) are
`noindex` behind data flags until real content replaces them.
