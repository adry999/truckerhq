# TruckerHQ — Web Performance Audit (self-hosted Node on Hostinger behind Cloudflare)

- Date: 2026-10-28
- Commit: `1fcb0b3` (main), Next.js 16.3.6 (Turbopack), React 19.2.8, Tailwind v4
- Method: `npm run build` (exit 0), inspection of `.next/server/app/*.html`, `.next/static/chunks`, `prerender-manifest.json`, source read of every page/layout/hero/analytics/font/fetch module, cross-checked against `node_modules/next/dist/docs` (self-hosting, output, image, font, script, caching, CDN guides).
- Read-only: no project files were changed.

---

## 1. Build result

`next build` succeeded: 131/131 pages generated in 16 s (compile 22 s, TypeScript 19 s). Six warnings: `metadataBase property in metadata export is not set ... using "http://localhost:3000"` (still open from the 2026-10-09 audit, Q18).

### 1.1 Route table (from build output)

| Route | Kind | Notes |
|---|---|---|
| `/`, `/ru`, `/about`, `/carriers`, `/claim`, `/dispatch`, `/ru/dispatch`, `/dispatch/start`, `/guides`, `/hire-drivers`, `/jobs`, `/ru/jobs`, `/privacy`, `/terms`, `/sms-terms`, `/tools`, `/tools/{compliance-alerts,new-mc-checklist,profit-per-mile}`, `/robots.txt`, `/sitemap.xml`, `/icon.svg`, `/apple-icon`, all static `opengraph-image*` | ○ Static | prerendered, `revalidate: false` (cache forever until next deploy) |
| `/carriers/[state]` (50), `/guides/[slug]` (11), `/jobs/[slug]` (18 jobs + cities), `/tools/carrier-lookup/[slug]` (8) | ● SSG | `generateStaticParams` present on all four; `dynamicParams` left at default (fallback `null` = unknown slugs render on demand) |
| `/tools/carrier-lookup` | ƒ Dynamic | reads `searchParams` at page level; landing state is also dynamic |
| `/guides/[slug]/opengraph-image`, `/jobs/[slug]/opengraph-image` | ƒ Dynamic | no `generateStaticParams` on the image routes, so Satori renders on first request per slug |
| `/ru/[...missing]` | ƒ Dynamic | catch-all that calls `notFound()` |
| `/api/*` (6) | ƒ Dynamic | POST lead handlers |

Nothing uses `cacheComponents` / `'use cache'`; the app runs the "previous" caching model (fetch Data Cache + full-route static prerender). No `proxy.ts`/middleware, no `loading.tsx`, no `next/dynamic`.

### 1.2 First Load JS (Next 16 no longer prints it; computed from the `<script>` tags of each prerendered HTML and chunk sizes, gzip level 6)

The 110 KB `0cz1d0mv5g_q7.js` is the legacy polyfill bundle and is emitted with `noModule`, so modern browsers never download it. Figures below exclude it.

| Page | Scripts | JS raw | JS gzip | HTML raw | HTML gzip | Inline RSC payload |
|---|---|---|---|---|---|---|
| Framework floor, every page (react-dom 228 KB, app-router 152 KB, 4 small runtime chunks) | 7 | 444 KB | ~132 KB | — | — | — |
| `/` | 11 | 519 KB | 159 KB | 128 KB | 19 KB | 79 KB |
| `/ru` | 11 | 519 KB | 159 KB | 129 KB | 21 KB | 80 KB |
| `/dispatch` | 11 | 528 KB | 161 KB | 112 KB | 16 KB | 69 KB |
| `/dispatch/start` (wizard) | 11 | 528 KB | 161 KB | 56 KB | 8 KB | 36 KB |
| `/jobs` | 11 | 522 KB | 160 KB | 80 KB | 12 KB | 45 KB |
| `/carriers/texas` | 11 | 510 KB | 156 KB | 93 KB | 13 KB | 54 KB |
| `/tools/profit-per-mile` (calculator) | 10 | 498 KB | 151 KB | 65 KB | 9 KB | 37 KB |
| `/tools/new-mc-checklist` | 10 | 501 KB | 152 KB | 88 KB | 13 KB | 58 KB |
| `/claim` (wizard) | 10 | 505 KB | 153 KB | 55 KB | 8 KB | 36 KB |
| `/guides` | 10 | 495 KB | 150 KB | 64 KB | 9 KB | 40 KB |
| `/privacy` (text only) | 10 | 489 KB | 149 KB | 52 KB | 8 KB | 37 KB |
| `/_not-found` | 8 | 467 KB | 140 KB | 35 KB | 6 KB | 20 KB |

Reading: application code per page is 5–30 KB gzip; ~132 KB gzip is the React 19 + Next 16 app-router floor and cannot be reduced without leaving the App Router. CSS: one file, 63.5 KB raw / 10.8 KB gzip. Fonts preloaded on every page: 5 woff2 = 136 KB (see F-07). No `zod` in any client chunk (verified by grep). No duplicated React copies (one chunk matches `react-dom`).

---

## 2. Status of performance items from `docs/audit/2026-10-09-codebase-audit.md`

| Item (2026-10-09) | Status | Evidence |
|---|---|---|
| §3.1 `HomePageContent.tsx:21` — hero says "lazy" but sets `fetchPriority="high"`, hero rendered twice | **STILL OPEN** | `src/features/home/ui/HomeHero.tsx:10-18` (`loading="lazy"` + `fetchPriority="high"`) and `:73-80` (second copy). Prerendered HTML carries both `<img>` with `loading="lazy"`. |
| A3 `state-content.ts` 2,026 lines; every state's carriers imported eagerly | **PARTLY FIXED** | Data moved to `src/features/carriers/data/states/*.json` (129 KB). Still all 50 files imported and zod-parsed at module init in `src/features/carriers/data/states/index.ts:4-53,108`. Server-only, so no client-bundle impact. |
| A13 `ClaimProfileWizard` pulls `lib/data` into client; `*FromUrl` wrappers serialise full datasets | **FIXED** | Wizard imports `@/features/claim/model/claim` only (`ClaimProfileWizard.tsx:11-20`); the `useSearchParam` + `View` split replaces `*FromUrl`; zod absent from client chunks. |
| Q6 no fetch timeout | **FIXED** | `src/server/http/http-request.ts:31` `AbortSignal.timeout(timeoutMs)`; FMCSA uses 8 s (`fmcsa.ts:50`). |
| Q7 SMS awaited inline (use `after()`) | **FIXED** | `src/server/leads/create-lead-handler.ts:54` `deps.after(...)`. |
| Q17 `og-ru.ts` top-level await, no `server-only` | **PARTLY FIXED** | `src/shared/seo/og-fonts-ru.ts:1` has `server-only`; top-level `await Promise.all` of six file reads remains at `:15`. |
| Q18 `metadataBase` build warning | **STILL OPEN** | 6 warnings in this build. |
| §4.3 Analytics: one effect depends on navigation and consent → duplicate pageview on consent | **STILL OPEN** | `src/components/Analytics.tsx:20-38` effect deps `[pathname, searchParams, consent]`; granting consent re-runs `gtag('config')` for the same URL. |
| §6 #19 `dynamicParams = false` on closed sets | **STILL OPEN** | `prerender-manifest.json` shows `fallback: null` for all four dynamic routes. |
| §6 #19 `metadataBase` in every root layout | **STILL OPEN** | see Q18. |
| Thin city pages noindexed + out of sitemap | FIXED (unchanged) | `jobs/[slug]/page.tsx:36-39`, `sitemap.ts:51-53`. |

---

## 3. Findings

Severity: P0 = blocks a good launch on this host, P1 = measurable Core Web Vitals / availability impact, P2 = clear win, P3 = polish.

### [P1] F-01 — LCP hero images are lazy-loaded and never preloaded
`src/features/home/ui/HomeHero.tsx:10-18`, `:73-80`; `src/features/carriers/ui/state/StateHero.tsx:20-28`; `src/features/dispatch/ui/landing/DispatchHero.tsx:9-17`; `src/features/hire-drivers/ui/HireDriversHero.tsx:9-17`

**Problem.** The home hero `<Image>` has `loading="lazy"` on the desktop copy and the default (lazy) on the mobile copy, both with `fetchPriority="high"`; the prerendered `index.html` confirms two `<img ... loading="lazy" fetchPriority="high">`. A lazy image is discovered only after layout, so the LCP element starts loading late regardless of `fetchPriority`. The other heroes use `loading="eager"` which is correct, but none emit a `<link rel="preload" as="image">` (checked: `index.html` and `carriers/texas.html` heads contain only font preloads). The `src` fallback is the `w=3840` candidate, so any browser that ignores `srcset` fetches the largest variant. The same photo is also rendered twice on the home page (desktop and mobile copies), so each HTML carries ~2.5 KB of duplicated srcset and the browser evaluates two LCP candidates.

**Fix.** On every hero: drop `loading="lazy"`, keep one `<Image>` (hide/show via CSS on the same element or use the `<picture>`-style art direction with `sizes`), and add `preload` (Next 16 replaced `priority` with `preload`; see `docs/.../image.md` "preload"). For the home page, where the mobile and desktop images are the same asset, a single `fill` image with `sizes="(min-width: 768px) 48vw, 100vw"` and `preload` is enough. Expected: LCP drops by the image discovery delay (typically 300–800 ms on 4G).

### [P1] F-02 — Hero images are hot-linked from Unsplash through the self-hosted `/_next/image` optimizer
`next.config.ts:24-31`; `HomeHero.tsx:11`, `HomeDispatch.tsx:13`, `DispatchHero.tsx:10`, `src/features/hire-drivers/data/hire-drivers.ts` (`HERO_IMAGE`), 50 × `data/states/*.json` `heroImage`

**Problem.** On Vercel the optimizer runs on a managed fleet; on Hostinger it runs inside your single Node process. Each hero srcset has 8–9 width candidates × 2 formats (AVIF + WebP) × every unique `q`; the first visitor for each combination triggers a remote fetch from `images.unsplash.com` (the URL already asks Unsplash for `q=70&w=2000` JPEG, which is then re-encoded) and a `sharp` encode on your CPU. AVIF encoding is 5–10× slower than WebP. If Unsplash rate-limits or is slow, `/_next/image` returns 5xx and the hero disappears. There is no `minimumCacheTTL` (default 4 h, but Unsplash sends a 1-year `Cache-Control`, so Next keeps the larger one — fine, but only on local disk `.next/cache/images`, which a redeploy may wipe).

**Fix.** Download the 5 landing heroes and the 50 state heroes once (Unsplash licence permits it), store them under `src/assets/img/` and use static imports (`import hero from "@/assets/img/home-hero.jpg"`). Static imports get `Cache-Control: public, max-age=315360000, immutable`, a build-time blur placeholder, intrinsic size (no CLS), and no remote dependency. Also set in `next.config.ts`: `images.formats: ["image/webp"]` (drop AVIF on a small VPS), `images.deviceSizes: [640, 750, 828, 1080, 1200, 1920]` (nothing in the design needs 2048/3840), `images.qualities: [70]`, `images.minimumCacheTTL: 2592000`. If you later want the encode off the origin entirely, use a Cloudflare loader (`images.loader: "custom"`, `loaderFile` returning `/cdn-cgi/image/width=${width},quality=${quality},format=auto/${src}`; requires Cloudflare Images / Image Resizing enabled on the zone) and add that origin to CSP `img-src`.

### [P1] F-03 — `/tools/carrier-lookup` is fully dynamic; the landing state is uncacheable and the FMCSA call blocks the whole response
`src/app/(en)/tools/carrier-lookup/page.tsx:15-31`; `src/features/carriers/server/fmcsa.ts:46-51`; `src/features/carriers/server/lookup.ts:15-25`

**Problem.** `await searchParams` at the top of the page makes the entire route dynamic (`ƒ` in the build table). Consequences on this host: (a) the no-query landing page — the target of the home-page search form and the second-most linked page in the header — is rendered on every request with `Cache-Control: private, no-store`, so Cloudflare never caches it and each hit costs a full React render; (b) when `?q=` is present the page cannot stream: `searchCarriers` awaits the FMCSA fetch (8 s timeout, `http-request.ts:31`) before any HTML is sent, so a slow upstream means an 8 s blank tab. The hourly Data Cache (`next: { revalidate: 3600 }`) helps repeat searches only.

**Fix.** Enable `cacheComponents: true` in `next.config.ts` (Next 16's Partial Prerendering; see `docs/.../caching.md`). Keep `page.tsx` synchronous and render `<Suspense fallback={<LookupLanding mode="All" />}>` around an async `<LookupResults searchParams={searchParams} />` child that awaits `searchParams` and `searchCarriers`. The static shell (header, landing copy, footer) is prerendered and CDN-cacheable; results stream in. Alternatively, without cacheComponents: split into `/tools/carrier-lookup` (static landing, form `action="/tools/carrier-lookup/search"`) and a dynamic `/tools/carrier-lookup/search` page. Either way wrap the FMCSA call in `<Suspense>` so the shell is sent immediately. Note Cloudflare does not buffer streamed responses by default; if you place nginx in front on the VPS, add `X-Accel-Buffering: no` (see `self-hosting.md` "Streaming").

### [P1] F-04 — No `output: 'standalone'`; production deploy would ship the full `node_modules` and build on the host
`next.config.ts:22-31`; `package.json:5-9`; `.github/workflows/ci.yml` (build only verifies, nothing is published)

**Problem.** Hostinger Node plans are CPU- and memory-limited; this build used 11 workers and ~20 s of TypeScript, which on a 1-vCPU VPS or shared Node hosting can take minutes or OOM. Without `standalone`, `next start` needs the complete `node_modules` (hundreds of MB) on the server.

**Fix.** `output: "standalone"` in `next.config.ts`. Build in GitHub Actions (CI already runs `npm run build`), then `cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/`, upload `.next/standalone` as the deploy artifact and run `PORT=3000 HOSTNAME=0.0.0.0 node server.js` under PM2/systemd. `sharp` 0.35.4 is already a dependency of Next 16 and is traced into standalone (`node_modules/sharp`, `@img/sharp-linux-x64` will be selected on Linux — install on a Linux runner, never upload a Windows build). Set `MALLOC_ARENA_MAX=2` (glibc) per the Next self-hosting note on sharp memory, and `NODE_OPTIONS=--max-old-space-size=<~70% of plan RAM>`. Also set `generateBuildId` from the git SHA so rebuilds from the same commit share cache keys, and `deploymentId` for version-skew protection.

### [P1] F-05 — Cloudflare cache rules: static HTML carries `s-maxage=31536000`, so "Cache Everything" would serve stale pages after every deploy
`next.config.ts:33-55` (headers), Next runtime behaviour per `docs/.../cdn-caching.md`

**Problem.** Every prerendered page is `revalidate: false` (1-year `s-maxage`). Cloudflare's default does not cache HTML, so out of the box the origin renders/serves every HTML hit (fine for static files on disk, but RSC/`_rsc` navigations and dynamic pages all reach the box). If someone enables a "Cache Everything" rule to fix that, Cloudflare will honour the 1-year `s-maxage` and keep serving HTML that references chunk hashes that no longer exist after a deploy → broken pages until a manual purge. Also, App Router responses vary on the `rsc`/`next-router-*` headers; Cloudflare ignores `Vary` on custom headers and relies on the `_rsc` query param being part of the cache key.

**Fix.** Cloudflare Cache Rules (in order):
1. `/_next/static/*`, `/_next/image*`, `/icon.svg`, `/apple-icon*`, `/*opengraph-image*` → Eligible for cache, Edge TTL "respect origin" (already `immutable` / long max-age), Browser TTL respect origin.
2. `/api/*`, `/tools/carrier-lookup*` (dynamic), `/ru/*` catch-all 404s → Bypass cache.
3. Everything else (HTML + `?_rsc=` payloads) → Eligible, **Edge TTL override 10 min (not origin)**, Browser TTL "respect origin" (origin sends no browser max-age for HTML), cache key must keep the query string (default) so `_rsc` variants are separated. Purge Everything from the deploy pipeline (`cf cache purge --everything` or API) after each release.
Do not enable Cloudflare "Rocket Loader", "Auto Minify" or "Mirage" — they rewrite Next's scripts/images and break hydration. Keep "Always Use HTTPS" and HSTS at origin (already set).

### [P2] F-06 — Third-party scripts load before consent; duplicate GA pageview on consent grant
`src/components/Analytics.tsx:61-88`, `:15-41`

**Problem.** `gtag.js` (~90 KB) and the Meta Pixel bootstrap (which fetches `fbevents.js`, ~110 KB) are injected `afterInteractive` on every page regardless of consent; only `fbq('init')` is gated. Visitors who decline still pay ~200 KB of script and the extra TCP connections to two origins on every navigation. The pageview effect depends on `consent`, so clicking "Accept" fires a second `gtag('config')` for the same URL (open since the last audit).

**Fix.** Render the Meta `<Script>` only when `consent === "granted"` (there is no consent-mode equivalent for Meta, so loading it early buys nothing). For GA4, either keep Consent Mode v2 "advanced" but switch both to `strategy="lazyOnload"`, or gate it on consent as well ("basic" consent mode). Split the effect: one on `[pathname, searchParams]` for pageviews, one on `[consent]` that only calls `gtag('consent','update')`/`fbq('init')`. Consider replacing GA with Cloudflare Web Analytics (beacon ~6 KB, no consent prompt needed) if the GA data is not actively used.

### [P2] F-07 — 136 KB of fonts preloaded on every page; 39 KB is for the two-word logo and 19 KB is Cyrillic on English pages
`src/components/RootDocument.tsx:7-32`; `src/app/globals.css:58-60`; `src/components/Logo.tsx:67`

**Problem.** `index.html` preloads 5 woff2 files: Inter latin 48 KB, Inter cyrillic 19 KB, Barlow Condensed 700 15 KB, Barlow 800 15 KB, Overpass 39 KB. Overpass (`--font-logo`) is used only for the "Trucker HQ" wordmark; Inter's cyrillic subset is preloaded on EN pages where no Cyrillic glyph is ever rendered (the `unicode-range` would fetch it on demand anyway). Preloads compete with the LCP image for bandwidth in the first RTTs.

**Fix.** Replace the Overpass wordmark with inline SVG paths (or set the logo in Barlow Condensed, already loaded) and delete the Overpass import. Declare Inter twice: `Inter({ subsets: ["latin"] })` for the variable, and a second `Inter({ subsets: ["cyrillic"], preload: false, variable: "--font-inter-cyr" })` appended to `--font-sans` only in `ru/layout.tsx`, or simpler: keep one instance with `subsets: ["latin"]` and let `unicode-range` lazy-fetch Cyrillic (RU pages pay one extra round trip, EN pages save 19 KB). Reduce Barlow to one weight (800) if 700 is not visibly used. Target: 2 preloads, ~60 KB.

### [P2] F-08 — Image optimizer settings default to AVIF + 3840 px candidates on a small VPS
`next.config.ts:24-31`; prerendered srcsets (9 candidates up to `w=3840` per hero)

**Problem.** See F-02 for the CPU cost. Even after moving images local, the srcset still enumerates `640…3840` and the `Accept: image/avif` path forces AVIF encodes. The 9-candidate srcset × 3 images adds ~6 KB to the home HTML.

**Fix.** `images: { formats: ["image/webp"], deviceSizes: [640, 750, 828, 1080, 1200, 1920], imageSizes: [256, 384], qualities: [70], minimumCacheTTL: 2592000 }`. Re-enable AVIF only if the host has ≥2 vCPU and Cloudflare is caching `/_next/image*` so each variant is encoded once.

### [P2] F-09 — Dynamic Open Graph images for guides and jobs are rendered per request
`src/app/(en)/guides/[slug]/opengraph-image.tsx:7-25`; `src/app/(en)/jobs/[slug]/opengraph-image.tsx`

**Problem.** Both routes are `ƒ` in the build table because they lack `generateStaticParams`; each first hit per slug (and after every restart, since the result is not persisted) runs Satori + resvg on the origin CPU (~100–300 ms, ~30 MB peak). Social crawlers hit these in bursts. The 11 guides and 18 jobs are closed sets already enumerated by the page routes.

**Fix.** Export `generateStaticParams` from both `opengraph-image.tsx` files (reuse `GUIDES.map` / `jobsStaticSlugs`) and `export const dynamicParams = false`. They then prerender to `.body` files like the other 12 OG images (61–81 KB PNG each).

### [P3] F-10 — `dynamicParams` left on for closed sets
`src/app/(en)/carriers/[state]/page.tsx:10`, `guides/[slug]/page.tsx:9`, `jobs/[slug]/page.tsx:17`, `tools/carrier-lookup/[slug]/page.tsx:8`

**Problem.** `fallback: null` in `prerender-manifest.json`: any `/carriers/<garbage>` request runs the page on demand (full render, `notFound()`), uncacheable. Bots and scanners generate these freely.

**Fix.** `export const dynamicParams = false` on all four routes (the audit's item #19). Unknown slugs then 404 from the router without rendering.

### [P3] F-11 — All 50 state JSON files are imported and zod-validated at module evaluation
`src/features/carriers/data/states/index.ts:4-53,108-112`; `src/features/carriers/model/state-data.schema.ts:40-46`

**Problem.** Server-only, so no client cost, but every Node worker that touches `features/carriers` (home, sitemap, carriers index, any state page, lookup) parses 129 KB of JSON through `z.strictObject` on first import. Adds ~50–100 ms to cold start on a small VPS and is repeated per build worker. Validation of static committed data belongs in a test, not the request path.

**Fix.** Keep `parseStateData` in `state-data.test.ts` (already exists) and have `index.ts` cast the JSON (`raw as StateData`). Optionally load per state with `await import(\`./${slug}.json\`)` inside the page so only the requested state is read.

### [P3] F-12 — `metadataBase` warnings and OG URLs resolving to `localhost` for some routes
Build log (6 warnings); `src/shared/seo/metadata.ts:53`; `src/app/global-not-found.tsx`, `src/app/apple-icon.tsx`, `src/app/opengraph-image.tsx`

**Problem.** Still open from the last audit. The routes outside the `(en)`/`ru` layouts (global not-found, root metadata files) have no `metadataBase`, so their social image URLs would be `http://localhost:3000/...` in production HTML.

**Fix.** Export `metadata = { metadataBase: new URL(SITE_URL) }` from `global-not-found.tsx` (and any other root-level route that produces metadata). Also change `src/shared/config/site.ts:3` — `VERCEL_PROJECT_PRODUCTION_URL` is meaningless on Hostinger; read `SITE_URL` from an explicit env (`NEXT_PUBLIC_SITE_URL`) with the `truckerhq.com` default, and keep `INDEXABLE` keyed on a `NOINDEX` env rather than a `.vercel.app` suffix.

### [P3] F-13 — Home/RU HTML is 128 KB raw (19–21 KB gzip): content serialized twice
`.next/server/app/index.html` (83 KB inline RSC `self.__next_f.push`, 25 KB class attributes, 6 KB srcsets)

**Problem.** Normal for the App Router (HTML + RSC payload for hydration), gzips well, but the sections passed as props (`HOME_COPY` is 17 KB; `jobRows`) are duplicated in the payload. Not a CWV blocker; listed so the number is not mistaken for a bug.

**Fix.** Only if it becomes a concern: pass `lang` instead of the full `c` copy object to section components that are client components (none currently are, so the duplication is purely the RSC tree). Reducing `deviceSizes` (F-08) trims ~4 KB.

### [P3] F-14 — EN and RU root layouts emit two near-identical 22.5 KB client chunks
`.next/static/chunks/2g41zu381p5mh.js` (EN pages) vs `0mvjc9fckvcq9.js` (RU pages); `src/app/(en)/layout.tsx`, `src/app/ru/layout.tsx`, `src/components/RootDocument.tsx`

**Problem.** Two root layouts mean the shared client components (error boundary, `Analytics`, header islands, `Logo`) are bundled once per layout. Switching language downloads 22 KB again and forces a full document load (two root layouts cannot share a client router tree).

**Fix.** Accept for now (RU has 3 pages). If RU grows, move to a single `app/[locale]/layout.tsx` as the earlier audit recommended (A10), which also makes EN↔RU a client-side navigation.

### [P3] F-15 — `og-fonts-ru.ts` reads six font files with top-level await at import
`src/shared/seo/og-fonts-ru.ts:10-22`

**Problem.** Partly fixed (`server-only` added). The six `readFile` calls still run at module load for any route that imports the RU OG module, and `process.cwd()`-relative paths only work when the standalone server is started from its own directory.

**Fix.** Lazy-load inside the OG handler (`async function ruFonts() { ... }` with a module-level promise cache) and resolve the path with `import.meta.url`/`path.join(__dirname, ...)` or include `src/assets/fonts/**` via `outputFileTracingIncludes` so standalone tracing copies them.

### [P3] F-16 — `/ru/[...missing]` and unknown EN paths render 404s dynamically
`src/app/ru/[...missing]/page.tsx:6-8`; `experimental.globalNotFound` in `next.config.ts:23`

**Problem.** Every bad `/ru/...` URL is a dynamic render with `private, no-store`, so Cloudflare will not absorb 404 floods. The EN `_not-found` is static (35 KB HTML) and cacheable.

**Fix.** Low priority; a Cloudflare rule "cache 404 responses for 1 min" on `/ru/*` covers it. Structural fix is the `[locale]` layout (F-14).

---

## 4. Self-hosting recommendations (Hostinger Node + Cloudflare)

1. **Build artefact.** `output: "standalone"` (F-04). Build on GitHub Actions `ubuntu-latest` with Node 24 (CI already uses it), tar `.next/standalone` + copied `public` and `.next/static`, deploy by SSH/rsync, restart with PM2 (`pm2 start server.js --name truckerhq -i 1`). Do not run `npm run build` on the Hostinger box.
2. **Process/memory.** Typical Hostinger Node tiers: shared "Node.js hosting" caps a process at ~1–2 GB and throttles CPU; KVM1 VPS = 1 vCPU / 4 GB; KVM2 = 2 vCPU / 8 GB (verify the plan). Budget: Next server idle ~150 MB, +50 MB in-memory ISR cache (`cacheMaxMemorySize` default), sharp spikes 100–300 MB per AVIF encode. Set `NODE_OPTIONS=--max-old-space-size=1536` on a 2 GB tier, `MALLOC_ARENA_MAX=2`, and keep `formats: ["image/webp"]` until there are ≥2 vCPU. Run a single instance; multi-instance needs `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` and a shared cache handler (not needed here — no Server Actions, no ISR).
3. **Compression.** Next's `compress: true` gives gzip at origin. Cloudflare will pass gzip through as-is; it only applies Brotli when the origin sends identity. Two valid setups: (a) keep gzip (safe if the orange cloud is ever disabled), or (b) `compress: false` and let Cloudflare brotli at the edge (better ratios, less origin CPU, but origin→edge traffic is uncompressed). Prefer (b) only if nginx is also on the VPS and configured for `brotli on; gzip on;` so origin never serves identity to a direct client.
4. **Cache headers from origin.** Next already sets `public, max-age=31536000, immutable` on `/_next/static/*` and `/_next/image` (static-import sources), `s-maxage=31536000, stale-while-revalidate` on prerendered HTML, `private, no-store` on dynamic routes. Do not add a blanket `Cache-Control` in `headers()`; add a 1-hour `Cache-Control: public, max-age=3600` only for `/robots.txt` and `/sitemap.xml` if you want Cloudflare to hold them.
5. **Cloudflare settings.** Cache Rules per F-05; HTTP/3 (QUIC) on; 0-RTT on; Early Hints on (benefit is limited because Next emits `<link rel=preload>` in HTML, not as `Link` headers — Cloudflare can still learn them from the HTML and emit 103 on subsequent requests, so enable it); Brotli on; Tiered Cache on (free); Polish/Mirage/Rocket Loader/Auto Minify **off**; "Cache Reserve" optional. Add a WAF rate-limit rule on `POST /api/*` (the in-process limiter in `api-guard.ts` is per-instance and memory-bound) and on `/tools/carrier-lookup?q=*` to protect the FMCSA key quota.
6. **Reverse proxy on the VPS.** Put nginx (or Caddy) in front of `node server.js` as the Next docs recommend, with `proxy_buffering off` for streaming, `client_max_body_size 64k` for the lead APIs, and real-IP from `CF-Connecting-IP` so `api-guard.ts` rate limits the visitor, not Cloudflare.
7. **Image optimisation alternatives.** Order of preference: static imports served through `/_next/image` with WebP only and Cloudflare caching `/_next/image*` (zero extra cost) → Cloudflare Images "Transformations" via a custom `loaderFile` (offloads encode; ~$0.50 per 1k transformations) → `unoptimized: true` with pre-sized WebP files committed per breakpoint (no runtime cost at all, manual).
8. **Monitoring.** `next start` prints nothing per request; enable `logging.fetches` in dev only, and rely on Cloudflare Analytics + `pm2 logs`. Watch `.next/cache/images` disk growth (no eviction) and clear it on deploy.
9. **Env.** `SITE_URL`/`INDEXABLE` currently key off Vercel variables (F-12). Provide `NEXT_PUBLIC_SITE_URL`, `FMCSA_WEBKEY`, Supabase, Twilio, and the two analytics IDs through PM2 `ecosystem.config.js` or systemd `EnvironmentFile`; `NEXT_PUBLIC_*` are inlined at build time, so set them in the CI build step, not only on the host.

---

## 5. Things that are already right

- 124 of 131 routes are fully static; data is in-repo; no DB on the read path.
- `generateStaticParams` on all four dynamic segments; thin city pages noindexed.
- Client islands are small (`useSearchParam` + View split, Suspense fallbacks render real content); no `next/dynamic` needed; zod stays on the server; no duplicate React.
- Fonts use `next/font` (self-hosted, `font-display: swap`, size-adjusted fallbacks); Roboto Condensed Cyrillic correctly `preload: false` with unicode-range.
- Fetch wrapper has timeouts and never throws; lead notifications run in `after()`.
- Security headers, `poweredByHeader: false`, CSP (report-only) already limit third-party origins; `img-src` already covers `/_next/image` via `'self'`.
- Tailwind v4 output is a single 10.8 KB gzip stylesheet.
