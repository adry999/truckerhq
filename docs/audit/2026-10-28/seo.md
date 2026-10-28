# TruckerHQ: SEO audit (technical and content)

Date: 2026-10-28 · Commit `1fcb0b3` (main) · Next.js 16.3.6, App Router, hosted on Vercel
Method: I read all `page.tsx`, `layout.tsx`, `sitemap.ts`, `robots.ts`, `src/shared/seo/*` and `src/shared/i18n/*`, and checked them against `node_modules/next/dist/docs` (generate-metadata, not-found, sitemap, robots, opengraph-image). I then ran the existing production build (`.next`, built 2026-10-28) with `next start` and fetched `robots.txt`, `sitemap.xml` (90 URLs), the rendered `<head>` of the key pages and the 404 responses with a Googlebot UA. No project files were changed.

---

## 0. Status of the SEO items in `docs/audit/2026-10-09-codebase-audit.md`

| Item | Topic | Status | Evidence |
|---|---|---|---|
| Q1 / Plan #1 | Sample jobs in the sitemap plus `JobPosting` with a build-time `datePosted` | **FIXED** | No `JobPosting` anywhere in `src`. Job detail pages are `noindex, follow` (`src/app/(en)/jobs/[slug]/page.tsx:50`) and the sitemap no longer lists `JOBS`. |
| Plan #1 | "Sample data" banners on carrier profiles and state lists | **FIXED** | `CarrierProfile.tsx:20`, `StateCarriersList.tsx:95`, `CityJobsList.tsx:19`, `JobDetail.tsx:48` |
| Plan #1 | "from public FMCSA data" copy that isn't true yet | **STILL OPEN (partial)** | The Organization schema (`RootDocument.tsx:41`), the footer (`SiteFooter.tsx` "Carrier data from public FMCSA records") and the `/tools` hero still say this, while state pages and profiles show sample data. |
| Q5 | `XXX` placeholders in the phone number, prices and schema | **STILL OPEN** | `src/shared/config/contact.ts:2-4`, plus the `$XXX` in both dispatch OG images (`(en)/dispatch/opengraph-image.tsx:12-13`, `ru/dispatch/opengraph-image.tsx:15-16`) and the `telephone` in the ContactPage JSON-LD. `check:placeholders` exists but only warns (`scripts/check-placeholders.mjs:3`). |
| Q18 | `metadataBase` missing on some routes | **FIXED** | It is set in `rootMetadata` (`metadata.ts:54`) and in `global-not-found.tsx:7`. The build emits absolute `https://truckerhq.com/...` OG URLs. |
| A10 / Plan #13 | The RU 404 showed English | **PARTLY FIXED** | `ru/not-found.tsx` and `ru/[...missing]/page.tsx` now pass `lang="RU"`. **The `<title>` and description are still the English homepage ones, and the server HTML is an empty error shell** (see F-09). |
| A10 | Hand-written hreflang pairs in the sitemap | **FIXED** | `src/shared/i18n/alternates.ts` is the single source and feeds both page alternates and the sitemap. |
| A4 | Hardcoded job counts in titles ("225 Openings") | **STILL OPEN** | `src/features/jobs/data/city-content.ts:7,110,215…` |
| Plan #19 | OG `alt` on EN images, `metadataBase` in all root layouts, `dynamicParams=false` | **PARTLY FIXED** | `metadataBase` is done. EN OG files still have no `alt` export (only the 3 RU files do), and no route sets `dynamicParams`. |
| Strengths | Thin city pages noindexed, `buildMetadata` factory | Holds | `sitemap.ts:50-57` |

---

## 1. Findings

### [P0] 10 of 11 guides are empty stubs but indexed, in the sitemap, and marked up as `Article`
`src/features/guides/ui/GuideArticle.tsx:40-47`, `src/features/guides/data/guides.ts:18-28`, `src/app/sitemap.ts:37-42`, `src/app/(en)/guides/[slug]/page.tsx:39-45`

**Problem.** Every guide except `how-to-tell-if-a-load-pays-enough` renders only "This guide is being written by our dispatch team — check back soon." Each one still has a canonical, sits in the sitemap with `lastModified`, carries `Article` JSON-LD and gets a templated description ("A rates guide for owner-operators… 4 min read."). On a brand-new domain, ten soft-404 or thin URLs in the first crawl lower Google's quality estimate for the whole site, and the `/guides` hub links to all of them. The author is also the placeholder "Dispatcher Name". A grey box stands in for the hero image (`GuideArticle.tsx:37`), and the avatar is a blank circle.

**Fix.** Gate indexing on whether a guide has a body. Ship only the guides that are written, at 1,000+ words each.
```ts
// guides.ts
export type Guide = { …; body?: React.ComponentType; published: boolean; updated?: string; authorSlug: string };
// sitemap.ts
const guideRoutes = GUIDES.filter((g) => g.published).map((g) => ({ url: …, lastModified: g.updated ?? g.date }));
// guides/[slug]/page.tsx generateMetadata
robots: guide.published ? undefined : { index: false, follow: true },
// guides index: hide unpublished cards or label them "Coming soon" without a link
```
It is better still to move guides to MDX (`content/guides/*.mdx` with frontmatter) so the body, dates and author live together.

### [P0] State carrier pages (50 URLs, indexed) present invented statistics and fictional carriers
`src/features/carriers/data/states/*.json`, `src/features/carriers/model/state-content.ts:17-20`, `src/app/sitemap.ts:44-48`, `src/app/(en)/carriers/[state]/page.tsx`

**Problem.** `/carriers/texas` states "48,210 active for-hire carriers", "1,284 new MCs in the last 30 days" and per-city counts as fact. It then lists carriers that don't exist, with fabricated DOT numbers (Wyoming's are 8-digit, such as `10123456`, which no real carrier has). Only the list itself carries a small "sample data" label. All 50 pages are in the sitemap, and their title, description and hero copy are 100% templated ("{State} Carriers — DOT/MC Directory"). Google treats this as scaled, low-value, templated content (Helpful Content and spam policies on "scaled content abuse"), and the fabricated numbers are a YMYL-adjacent trust risk. It is the biggest site-wide quality risk at launch.

**Fix.** Choose one:
1. **Until real FMCSA aggregates exist (recommended for launch):** set `robots: { index: false, follow: true }` in `generateMetadata`, drop `stateRoutes` from the sitemap, and remove the invented stats.
2. **Index them:** source the counts from the FMCSA Census or QCMobile snapshot at build time, list real carriers (top N by power units, linking to `/tools/carrier-lookup/[real-dot]`), and add 300–500 words of unique state content: top lanes, freight types, weigh stations and ports of entry, state-specific requirements (IRP, IFTA base, intrastate authority such as the TX DMV, CA MCP, the NY HUT and KY KYU, the NM weight-distance tax, OR weight-mile). Re-target the page at "trucking companies in {state}" and "truck dispatch {state}" (see §3).
```ts
// carriers/[state]/page.tsx
const INDEX_STATES = process.env.STATE_DATA_SOURCE === "fmcsa";
return buildMetadata({ …, robots: INDEX_STATES ? undefined : { index: false, follow: true } });
```

### [P0] City job pages are indexed with fake opening counts and "updated daily/today" claims
`src/features/jobs/data/city-content.ts:7-9` (and every city), `src/app/(en)/jobs/[slug]/page.tsx:36-39`, `src/app/sitemap.ts:50-57`

**Problem.** `MIN_JOBS_TO_INDEX = 5` and each of the 11 cities has 6 sample jobs, so all 11 are indexed and in the sitemap. The title promises "CDL Jobs in Atlanta, GA: 225 Openings", the intro says "225 truck driving jobs within 50 miles… updated today", and the page shows 6 illustrative listings. That is a misleading title and description, the gap will raise bounce rates, and Google can rewrite the title. The count rule passes only because the sample data is large enough, so it measures nothing about real jobs.

**Fix.** Index only on **real** jobs, and derive the counts from data.
```ts
const realJobs = city.jobs.filter((j) => !j.sample);
robots: realJobs.length >= MIN_JOBS_TO_INDEX ? undefined : { index: false, follow: true },
title: `CDL Jobs in ${city.cityName}${realJobs.length ? ` — ${realJobs.length} Openings` : ""}`,
```
Remove "updated today" from the copy unless a real `updatedAt` exists. Filter the sitemap the same way.

### [P0] Placeholder phone, prices, DOT/MC, team names and legal text are visible on every page and in schema and OG images
`src/shared/config/contact.ts:2-4`, `src/features/contact/data/about.ts:6-28`, `src/app/(en)/dispatch/opengraph-image.tsx:12-13`, `src/app/ru/dispatch/opengraph-image.tsx:15-16`, `src/app/opengraph-image.tsx:15`, `src/app/(en)/terms/page.tsx:29`, `src/app/(en)/privacy/page.tsx:28`

**Problem.** The header, footer and every OG card show `(XXX) XXX-XXXX`, and the dispatch share card reads "$XXX / week". The About page lists "Founded 20XX", "USDOT XXXXXXX", "Name Surname" and "Dispatcher Name", and the Telegram link is `href="#"`. The Terms page contains "[To be written by your lawyer.]". The ContactPage JSON-LD has `telephone: "+1-XXX-XXX-XXXX"`. These are E-E-A-T killers, both for Google's quality raters (Who is behind this? Contact info?) and for users. OG images also get cached by Facebook and Telegram, so a launch share burns in the placeholder.

**Fix.** Fill in the real values. Run `check:placeholders --strict` in CI for the production branch and in the Vercel build (`"build": "node scripts/check-placeholders.mjs --strict && next build"`, gated on `VERCEL_ENV === "production"`). Until the phone is real, leave `telephone` out of the schema:
```ts
telephone: PHONE_IS_PLACEHOLDER ? undefined : PHONE_SCHEMA,
```

### [P1] Organization schema is minimal; no WebSite, Service or ProfessionalService schema
`src/components/RootDocument.tsx:35-44`, `src/shared/seo/structured-data.ts`

**Problem.** The Organization block has no `logo`, `contactPoint`, `sameAs`, `address`, `email`, `foundingDate` or `@id`. The site has no `WebSite` schema, which provides the site-name signal in SERPs. The money pages (`/dispatch`, `/hire-drivers`) have no `Service` or `Offer` markup, only `FAQPage`. Since 2023 Google shows FAQ rich results only for well-known government and health sites, so FAQPage adds no SERP feature. It is harmless but shouldn't be the only markup. The same Organization block also renders on 404 pages.

**Fix.** Add an entity graph with stable `@id`s:
```ts
export const ORG_ID = `${SITE_URL}/#organization`;
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"], // ProfessionalService only with a real address
    "@id": ORG_ID,
    name: "Trucker HQ",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-512.png`,   // add a real 512x512 PNG to /public
    image: `${SITE_URL}/opengraph-image`,
    email: CONTACT_EMAIL,
    telephone: PHONE_IS_PLACEHOLDER ? undefined : PHONE_SCHEMA,
    address: REAL_ADDRESS && { "@type": "PostalAddress", streetAddress, addressLocality, addressRegion, postalCode, addressCountry: "US" },
    areaServed: { "@type": "Country", name: "United States" },
    knowsLanguage: ["en", "ru"],
    sameAs: ["https://www.facebook.com/…", "https://t.me/truckerhq", "https://www.linkedin.com/company/…", GBP_URL],
    contactPoint: [{ "@type": "ContactPoint", contactType: "dispatch", telephone, availableLanguage: ["English","Russian"], hoursAvailable: "Mo-Su 00:00-23:59" }],
  };
}
export function websiteSchema() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`,
    url: SITE_URL, name: "Trucker HQ", publisher: { "@id": ORG_ID }, inLanguage: ["en-US", "ru"] };
}
export function serviceSchema(s: { name: string; path: string; description: string; price?: number }) {
  return { "@context": "https://schema.org", "@type": "Service", name: s.name, serviceType: "Truck dispatching",
    url: `${SITE_URL}${s.path}`, provider: { "@id": ORG_ID }, areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", name: "Owner-operators and small fleets" },
    ...(s.price && { offers: { "@type": "Offer", price: s.price, priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: s.price, priceCurrency: "USD", unitText: "per truck per week" } } }) };
}
```
Render `websiteSchema` only on `/` and `/ru`, and `serviceSchema` on `/dispatch`, `/ru/dispatch` and `/hire-drivers`. Don't use `LocalBusiness` or `ProfessionalService` with an address until a real, staffed address exists. Google treats a virtual office as a guideline violation.

### [P1] `Article` schema for guides is incomplete; `og:type` is `website`
`src/app/(en)/guides/[slug]/page.tsx:39-45`, `src/shared/seo/metadata.ts:44`

**Problem.** The schema is missing `image`, `dateModified`, `publisher`, `mainEntityOfPage` and `author.url`, and the author is a placeholder. Google lists `image` as a recommended Article property. Without author pages and real names, guides carry no E-E-A-T.

**Fix.**
```ts
{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guideDescription(guide),
  image: [`${SITE_URL}/guides/${slug}/opengraph-image`], datePublished: guide.date, dateModified: guide.updated ?? guide.date,
  author: { "@type": "Person", name: author.name, url: `${SITE_URL}/about#${author.slug}`, jobTitle: author.role },
  publisher: { "@id": ORG_ID }, mainEntityOfPage: `${SITE_URL}/guides/${slug}`, inLanguage: "en-US" }
```
Extend `buildMetadata` with `type?: "website" | "article"` and, for guides, pass `openGraph.type: "article"` with `publishedTime` and `modifiedTime`. Add a `BreadcrumbList` (Guides → Category → Title) to match the visible breadcrumb.

### [P1] Money-page H1s and titles miss the head terms
`src/features/home/data/home-copy.ts:59`, `src/features/dispatch/data/dispatch-copy.ts:47-48`, `src/features/hire-drivers/ui/HireDriversHero.tsx:21-24`, `src/features/carriers/ui/lookup/LookupLanding.tsx:27-30`, `src/app/(en)/tools/carrier-lookup/page.tsx:8`, `src/app/(en)/page.tsx:12`

**Problem.** The H1s are slogans with no query words: "Dispatch that picks up at 3 a.m.", "Flat weekly dispatch. No percentage.", "A parked truck makes no money.", "Check any carrier in 10 seconds.". The home title leads with the brand, which a new brand can't afford. The lookup title says "Carrier Lookup by DOT or MC Number" but the page never uses the high-volume phrases "MC number lookup", "USDOT number lookup" or "FMCSA carrier lookup".

**Fix.** Keep each slogan as a visual line, but make the H1 (or an eyebrow inside it) carry the keyword. Suggested titles, all 60 characters or fewer:

| Page | `<title>` | H1 |
|---|---|---|
| `/` | `Truck Dispatch Service for Owner-Operators, Flat Rate \| Trucker HQ` | "Truck dispatch that picks up at 3 a.m." |
| `/dispatch` | `Owner Operator Dispatch Service: Flat Weekly Rate` | "Truck dispatch service. Flat weekly rate, no percentage." |
| `/hire-drivers` | `Hire CDL Drivers: Pre-Screened Class A Drivers` | "Hire CDL drivers. A parked truck makes no money." |
| `/jobs` | `CDL-A Truck Driving Jobs, Pay Posted Up Front` | "CDL jobs. Pay posted up front." (already fine) |
| `/tools/carrier-lookup` | `MC Number & USDOT Lookup: Free FMCSA Carrier Search` | "MC & DOT number lookup" |
| `/ru/dispatch` | `Диспетчер для траков: фиксированная цена в неделю` (≤60) | "Диспетчинг для траков…" |

The H1 can be split with a `<span className="block">`, so the visual design doesn't change.

### [P1] RU has only 3 pages; the RU audience can't reach tools, guides or hire-drivers in Russian
`src/shared/i18n/alternates.ts:5-9`, `src/components/SiteHeader.tsx:31`

**Problem.** Russian-language queries ("диспетчер для траков", "диспетчерская служба США", "работа CDL", "проверить MC номер", "калькулятор прибыли трак") are a low-competition niche where Trucker HQ can rank quickly. Only `/ru`, `/ru/dispatch` and `/ru/jobs` exist. RU navigation falls back to English pages, and the footer is English-only on RU pages (`SiteFooter` takes no `lang`).

**Fix.** Phase 1 (launch +30 days): add `/ru/hire-drivers`, `/ru/tools`, `/ru/tools/profit-per-mile`, `/ru/tools/new-mc-checklist` and `/ru/tools/carrier-lookup`, plus `/ru/guides` once guides exist, and register each pair in `LOCALIZED_ROUTES` (hreflang and sitemap follow automatically). Localize `SiteFooter` with `lang`. Phase 2: migrate to an `app/[locale]` segment once there are more than about 8 RU pages (already noted in A10).

### [P1] `SITE_URL` comes from `VERCEL_PROJECT_PRODUCTION_URL`; the www/apex choice and previews aren't pinned
`src/shared/config/site.ts:3-9`

**Problem.** Vercel sets `VERCEL_PROJECT_PRODUCTION_URL` to the *shortest* production custom domain. If the client makes `www.truckerhq.com` primary and redirects apex → www, every canonical, hreflang, sitemap `<loc>` and OG URL would point at the apex, which 308s, so canonicals would point at a redirect. The variable is also set on Preview deployments, so `INDEXABLE` is `true` on previews. Vercel's `X-Robots-Tag: noindex` on preview URLs mitigates that, but robots.txt on previews still advertises the prod sitemap.

**Fix.** Pin it explicitly:
```ts
const host = process.env.NEXT_PUBLIC_SITE_HOST ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "truckerhq.com";
export const INDEXABLE = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : !host.endsWith(".vercel.app");
```
Set `NEXT_PUBLIC_SITE_HOST=truckerhq.com` in Production, and make the other host a 308 redirect in Vercel Domains (see checklist).

### [P2] Segment 404s have the English homepage `<title>` and description and an empty server HTML shell (the RU 404 bug)
`src/app/ru/not-found.tsx`, `src/app/(en)/not-found.tsx`, `src/components/NotFoundContent.tsx`, `src/app/(en)/guides/[slug]/page.tsx:20` (and the same `return {}` in every `generateMetadata`)

**Problem.** Verified against the running build:
- `/ru/nope`, `/ru/tools`, `/guides/nope`, `/carriers/nope`, `/jobs/nope` and `/tools/carrier-lookup/nope` return **404 + `noindex`**, which is correct. But they return `<title>Trucker HQ: Flat-Rate Truck Dispatch, CDL Jobs, Carrier Tools</title>` plus the home description, because `not-found.js` can't export metadata (only `global-not-found.js` can, per the docs) and `generateMetadata` returns `{}`, so the root default applies.
- The server HTML is `<html id="__next_error__">` with **no `lang`, no `<h1>` and no body content**. The localized 404 renders only on the client. Only the top-level `/nope` (global-not-found) is server-rendered, with `lang="en"` and "Page not found | Trucker HQ".

The SEO impact is small, since these pages are noindexed with a correct status, but the RU 404 title shows in English, the tab title duplicates the homepage, and users without JS or with slow JS see a blank page.

**Fix.**
1. Put React 19 `<title>` hoisting inside the not-found component. It works in `not-found.tsx`:
```tsx
// NotFoundContent.tsx
<>
  <title>{lang === "RU" ? "Страница не найдена | Trucker HQ" : "Page not found | Trucker HQ"}</title>
  <meta name="description" content={c.body} />
  <StatusPage …/>
</>
```
2. Call `notFound()` inside `generateMetadata` instead of `return {}`, which the docs allow, so metadata resolution stops early.
3. Add `export const dynamicParams = false;` to `carriers/[state]`, `guides/[slug]`, `jobs/[slug]` and `tools/carrier-lookup/[slug]`, all closed sets built from static data. Unknown slugs then get a 404 without on-demand rendering. Rebuild and curl again to confirm the server HTML contains the `<h1>`.

### [P2] `robots.txt` disallows URLs that are also `noindex`, so Google can't see the noindex
`src/app/robots.ts:11`

**Problem.** `/dispatch/start` is linked from the header's "Get started" on every page, and `/claim` is also linked. Blocking them in robots.txt stops Googlebot from fetching the page and reading `noindex`, so they can show up as "Indexed, though blocked by robots.txt" with no snippet.

**Fix.** Drop `/dispatch/start` and `/claim` from `disallow` and rely on the page-level `noindex, follow`. Keep `/tools/carrier-lookup?` disallowed, since it protects the FMCSA API budget. Optionally also disallow `/api/`.
```ts
disallow: ["/api/", "/tools/carrier-lookup?"],
```

### [P2] EN OG images have no `alt`; state pages use the generic root OG image instead of `/carriers/opengraph-image`
`src/app/opengraph-image.tsx`, `src/app/(en)/*/opengraph-image.tsx`, `src/app/(en)/carriers/[state]/page.tsx:26`, `src/app/(en)/tools/carrier-lookup/[slug]/page.tsx:24`

**Fix.** Add `export const alt = "…"` to every EN OG file, or have a `defineOg({ alt, … })` factory export `alt`, `size`, `contentType` and the default. Add `carriers/[state]/opengraph-image.tsx` rendering "{State} carriers" (with `generateStaticParams`), or at minimum pass `ogImage: "/carriers/opengraph-image"`.

### [P2] Legal pages have no description, so they inherit the homepage description
`src/app/(en)/privacy/page.tsx:5-8`, `terms/page.tsx:5-8`, `sms-terms/page.tsx:5-8`

**Fix.** Add one-line descriptions. Legal pages are worth keeping indexed for trust, since A2P 10DLC reviewers and Google raters look for them.

### [P2] Internal linking: state and city hubs are weakly linked; tools don't link to guides or money pages contextually
`src/components/SiteFooter.tsx` (only "Texas carriers"), `src/app/(en)/tools/page.tsx:117-131`

**Problem.** The 11 city pages are linked only from the `/jobs` board, and the state pages only from `/tools` and `/carriers`. The homepage links to neither hub. Guides don't link to tools, and tools don't link to guides. Breadcrumb JSON-LD on city pages repeats `/jobs` for the state level (`jobs/[slug]/page.tsx:70`), and state breadcrumbs start at "Carrier Lookup" rather than Home.

**Fix.** Add a "Popular" footer column (Top 6 states, Top 6 job cities, `/carriers`, the job-cities index). Add contextual links: profit calculator → "How to tell if a load pays enough"; new-MC checklist → "Getting your first load with a 30-day MC" plus `/dispatch` (new-authority dispatch); carrier lookup → "Double brokering warning signs". Either add a real `/jobs/state/{state}` level or drop the state crumb.

### [P2] Guides hub lists unpublished items and uses a templated description per guide
`src/features/guides/model/guides.ts:25-29`

**Fix.** Write a hand-written 140–155 character description per guide in the data, and list only published guides (see P0).

### [P3] Organization description claims "built on public FMCSA data"
`src/components/RootDocument.tsx:41`

**Fix.** Keep it only once live FMCSA lookup is the default path. Otherwise rephrase to "free carrier tools".

### [P3] Stock imagery as "Trucker HQ dispatch office"
`src/features/home/ui/HomeDispatch.tsx:12-14`

**Problem.** An Unsplash photo is alt-tagged "Trucker HQ dispatch office". That is a trust problem rather than a ranking one: Google image search and reverse image lookups expose it.

**Fix.** Use real photos of the team and office, or change the alt to a description of the image.

### [P3] Long RU titles
`src/app/ru/dispatch/page.tsx:11` renders at about 72 characters with the suffix, so it will be truncated. Shorten to 60 or fewer (see table above).

### [P3] Sitemap hygiene
`src/app/sitemap.ts`

**Problem.** `priority` and `changefreq` are ignored by Google. That is harmless, but `lastModified` is missing on the static and state routes. `lastModified` is the only field Google uses, and only if it is accurate.

**Fix.** Add a real `updated` constant per page or data file (not `new Date()`). When guides exceed about 50, split into `generateSitemaps` (guides, jobs, carriers).

### [P3] No `manifest.webmanifest`, no 512px PNG logo
`src/app/icon.svg` and `src/app/apple-icon.tsx` exist. Add `app/manifest.ts` and a `/public/logo-512.png` for the Organization `logo` property. Google requires at least 112×112 and recommends a raster image for the logo.

### What is already correct (no action)
- Canonicals are absolute, self-referencing and slashless, and `/dispatch/` 308s to `/dispatch` (Next default `trailingSlash: false`).
- EN↔RU hreflang is reciprocal with `x-default` on all 3 pairs, both in `<head>` and in the sitemap `xhtml:link`.
- `og:locale` is `ru_RU` on RU pages, and RU OG images use Cyrillic fonts and carry `alt`.
- Exactly one `<h1>` per page component (checked all 23). Every `next/image` has `alt`.
- Job details and carrier profiles are `noindex, follow` and kept out of the sitemap. Sample banners are present.
- `?q=` lookups are robots-blocked, and lookup filters canonicalize to the base URL.
- Off-production hosts (`*.vercel.app`) are `noindex` and the sitemap isn't advertised there.

---

## 2. JobPosting: spec for when real jobs exist

`JobPosting` is currently not emitted, which is correct. Once postings are real and stored with dates, emit it per job detail page and make the page indexable. Google's required fields are `title`, `description` (HTML, the full posting), `datePosted`, `hiringOrganization` and `jobLocation` (or `applicantLocationRequirements` with `jobLocationType: "TELECOMMUTE"`). `validThrough`, `baseSalary`, `employmentType` and `identifier` are recommended, and `validThrough` effectively becomes required, because expired jobs must drop out.
```ts
export function jobPostingSchema(j: StoredJob) {
  return {
    "@context": "https://schema.org", "@type": "JobPosting",
    title: j.title, description: j.descriptionHtml,
    identifier: { "@type": "PropertyValue", name: j.company, value: j.id },
    datePosted: j.postedAt.toISOString(),            // stored, never new Date()
    validThrough: j.expiresAt.toISOString(),         // auto-404 or noindex after this
    employmentType: j.type === "OWNER-OP" ? "CONTRACTOR" : "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: j.company, sameAs: j.companyUrl,
      identifier: { "@type": "PropertyValue", name: "USDOT", value: j.dot } },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress",
      addressLocality: j.city, addressRegion: j.state, postalCode: j.zip, addressCountry: "US" } },
    baseSalary: { "@type": "MonetaryAmount", currency: "USD",
      value: { "@type": "QuantitativeValue", minValue: j.payMin, maxValue: j.payMax, unitText: j.payUnit /* "HOUR" | "WEEK" | "YEAR" (no per-mile unit) */ } },
    directApply: true,
    qualifications: "CDL Class A", experienceRequirements: { "@type": "OccupationalExperienceRequirements", monthsOfExperience: j.expMonths },
  };
}
```
Pay posted as "$0.70/mi" must be converted to a weekly range for `baseSalary`, because `unitText` accepts only HOUR, DAY, WEEK, MONTH or YEAR. Expired jobs must return 404 or 410 (or noindex) and be removed from the sitemap. Ping the Indexing API, which Google officially allows for JobPosting pages, on create and expire.

---

## 3. Content strategy

### 3.1 Keyword → page mapping (US EN; the volumes are rough directional estimates, so validate in GSC or Ahrefs)

| Cluster | Primary keyword | Secondary | Target page | Status |
|---|---|---|---|---|
| Dispatch | truck dispatch service | truck dispatching services, trucking dispatch company | `/dispatch` | exists; fix H1 and title |
| Dispatch | owner operator dispatch | dispatch for owner operators, independent truck dispatcher | `/dispatch` (H2 section) → later `/dispatch/owner-operators` | partial |
| Dispatch | flat rate truck dispatch | flat fee dispatch, dispatch service no percentage | `/dispatch` + guide "Flat fee vs percentage dispatch" | partial |
| Dispatch | dispatch for new authority | new MC dispatch, dispatch for new carriers | **new** `/dispatch/new-authority` | missing |
| Dispatch by equipment | box truck dispatch, hotshot dispatch, flatbed dispatch, reefer dispatch, power only dispatch | | **new** `/dispatch/{equipment}` (5 pages, unique lanes, rates and FAQ each) | missing |
| Dispatch cost | how much does a truck dispatcher charge | dispatcher fees, truck dispatch cost | **new** guide plus pricing section | missing |
| Jobs | CDL jobs | CDL A jobs, truck driving jobs | `/jobs` | exists |
| Jobs local | CDL jobs {city} | truck driving jobs {city} | `/jobs/{city}` (index only with real jobs) | exists, gate |
| Jobs RU-speaking | Russian speaking CDL jobs | trucking jobs for Russian speakers | **new** `/jobs/russian-speaking` + `/ru/jobs` | missing, unique niche |
| Jobs type | owner operator jobs, team driving jobs, OTR jobs | | filter landing pages `/jobs/owner-operator`, `/jobs/team` (only when listings are real) | missing |
| Hiring | hire CDL drivers | find CDL drivers, truck driver recruiting service | `/hire-drivers` | exists; fix H1 |
| Hiring | how to find owner operators to lease on | | guide | missing |
| Lookup | MC number lookup | USDOT number lookup, FMCSA carrier lookup, DOT lookup | `/tools/carrier-lookup` | exists; fix title and H1, add 400 words of explainer and FAQ below the tool |
| Lookup | broker lookup / check broker MC | broker authority check, is my broker legit | **new** `/tools/broker-check` (same tool, broker framing) | missing |
| Lookup programmatic | {carrier name} DOT number | | `/tools/carrier-lookup/{dot}`, only with **live** FMCSA data, otherwise noindex | gated |
| Calculator | trucking profit per mile calculator | cost per mile calculator trucking, rate per mile calculator | `/tools/profit-per-mile` | exists; add explainer, worked example and FAQ |
| New authority | new MC checklist | how to start a trucking company, new entrant safety audit, BOC-3 | `/tools/new-mc-checklist` + guides | exists |
| Compliance | FMCSA compliance alerts | MC authority status check, insurance lapse alert | `/tools/compliance-alerts` | exists; thin, add content |
| State | trucking companies in {state} | {state} carriers, truck dispatch {state} | `/carriers/{state}` | exists; real data or noindex |
| RU | диспетчер для траков | диспетчерская служба, диспетчер траков США | `/ru/dispatch` | exists |
| RU | работа CDL на русском | работа дальнобойщиком в США | `/ru/jobs` | exists |
| RU | проверить MC номер | | **new** `/ru/tools/carrier-lookup` | missing |
| RU | как открыть траковую компанию в США | MC номер получить | **new** `/ru/guides/...` | missing |

### 3.2 New pages to create (priority order)
1. **Finish 10 guides** (1,000–1,800 words each, real author bio, one original table or worked example each). Then write next: "How much does a truck dispatcher charge (2026)", "Flat fee vs percentage dispatch", "How to start a trucking company: step by step", "New entrant safety audit: what to expect", "BOC-3, UCR, IRP, IFTA explained", "Average rate per mile by equipment (monthly update)". The monthly rates update attracts links.
2. **`/dispatch/new-authority`**, **`/dispatch/box-truck`**, **`/dispatch/hotshot`**, **`/dispatch/flatbed`**, **`/dispatch/reefer`**, **`/dispatch/power-only`**. Each needs a unique intro, typical lanes, the equipment's rate range, required docs, FAQ, and `Service` schema with `serviceType`.
3. **`/pricing`**: one transparent pricing page for "truck dispatch cost". It needs real prices and `Offer` schema.
4. **`/jobs/russian-speaking`** (EN) and a stronger `/ru/jobs`. This is a defensible niche that competitors don't target.
5. **`/tools/broker-check`**: high intent, and it links naturally into dispatch.
6. **RU mirrors** of tools and hire-drivers (see P1).
7. **Author pages or anchors** on `/about` (real names, years in dispatch, photo, LinkedIn), which every guide links to.
8. **`/reviews` or testimonials** with real carrier names and MCs, once there is consent. Don't add `Review` or `AggregateRating` schema about yourself, because Google ignores self-serving reviews.
9. **Comparison pages** (later): "Trucker HQ vs percentage dispatchers". Avoid naming competitors until you have legal review.

### 3.3 Competitor gap (typical SERP for "truck dispatch service")
Top-ranking dispatch sites usually have: a pricing page, equipment-specific pages, a "how it works" page, 20–100 blog posts, testimonials with MC numbers, a visible US address and phone, and a Google Business Profile with reviews. Trucker HQ's differentiators, free FMCSA tools, flat rate and Russian-speaking dispatch, are stronger link magnets than a typical dispatch blog. Lean on the tools for links (submit the profit calculator and the broker check to trucking forums, subreddits such as r/Truckers and r/OwnerOperators, Facebook and Telegram groups for Russian-speaking truckers, and podcasts).

### 3.4 E-E-A-T and local readiness
- The About page needs: real founder and dispatcher names with photos, the company's own USDOT/MC (or a statement that dispatch isn't a carrier, or the broker MC if it holds one), founding year, a physical mailing address, the phone, the hours (24/7 dispatch, office M–F), and working Telegram and WhatsApp links.
- Show the same NAP (name, address, phone) in the footer, the About page, the schema and the GBP, character for character.
- Make the Privacy, Terms and SMS terms real text. They are also required for A2P 10DLC SMS registration.

---

## 4. Launch SEO checklist (off-code)

**Domain and canonical host**
- [ ] Choose **apex `truckerhq.com`** as canonical. It is shorter, it matches the code default and the `hello@truckerhq.com` brand, and Vercel's `VERCEL_PROJECT_PRODUCTION_URL` picks it. In Vercel → Domains, add `www.truckerhq.com` as a **308 redirect → truckerhq.com**.
- [ ] Set `NEXT_PUBLIC_SITE_HOST=truckerhq.com` for Production (P1 fix).
- [ ] Cloudflare DNS: apex `A 76.76.21.21` (or the CNAME-flattened `cname.vercel-dns.com`) and `www CNAME cname.vercel-dns.com`, both **DNS only (grey cloud)**. Orange-cloud proxying in front of Vercel breaks Vercel cert issuance and causes double-caching. If proxying is wanted, set SSL to "Full (strict)" and follow Vercel's Cloudflare guide.
- [ ] Verify: `curl -I http://www.truckerhq.com/dispatch` → a single 308 to `https://truckerhq.com/dispatch`, `curl -I https://truckerhq.com/dispatch/` → 308 to `/dispatch`, and HSTS present. HSTS is `includeSubDomains; preload`, so only submit to hstspreload.org once every subdomain is HTTPS.

**Old site / 301 plan** (if a previous truckerhq.com or other domain existed)
- [ ] Export the old URLs from the old GSC (Performance + Pages), Wayback Machine and any backlink tool, and map each one to its closest new URL.
- [ ] Implement them as permanent redirects in `next.config.ts` `redirects()` (permanent: true → 308), or in Vercel's bulk redirects if there are more than about 1,000. Don't send everything to `/`.
- [ ] Keep the old domain's DNS and redirects for 12 months or more, and use GSC → Change of Address if the domain changes.

**Google Search Console**
- [ ] Add a **Domain property** `truckerhq.com` → GSC gives a `google-site-verification=…` TXT record → add it in Cloudflare DNS (Type TXT, Name `@`, TTL Auto) → Verify. It covers http/https/www/apex together.
- [ ] Submit `https://truckerhq.com/sitemap.xml` under Sitemaps. Check that the URL count matches the expected *indexable* set after the P0 fixes (fewer than the current 90).
- [ ] Use URL Inspection → Request indexing for `/`, `/dispatch`, `/ru`, `/ru/dispatch`, `/jobs`, `/hire-drivers` and `/tools/carrier-lookup`.
- [ ] Run the Rich Results Test on `/`, `/dispatch`, `/guides/how-to-tell-if-a-load-pays-enough` and a city page.
- [ ] After 7–14 days, check Pages → "Crawled – currently not indexed" and "Duplicate without user-selected canonical", plus International targeting for hreflang errors.
- [ ] Link GSC to GA4.

**Bing Webmaster Tools** (also feeds ChatGPT search, DuckDuckGo and Yahoo)
- [ ] Import from GSC (one click), or add the site and verify with a CNAME or TXT in Cloudflare. Submit the sitemap.

**IndexNow** (Bing, Yandex, Seznam, Naver; Yandex matters for RU-speaking users)
- [ ] Generate a key, serve `https://truckerhq.com/{key}.txt` (a `public/{key}.txt` or a route handler), and POST changed URLs to `https://api.indexnow.org/indexnow` on deploy, from a Vercel deploy hook or GitHub Action. Only send URLs that are indexable.
- [ ] Optional: Yandex Webmaster (DNS TXT verification) for the RU pages.

**GA4**
- [ ] Create the GA4 property and web stream, and set `NEXT_PUBLIC_GA_ID` in Vercel Production.
- [ ] Confirm Consent Mode v2 defaults: the code sends `consent update` on grant, so verify the `default` denied state is set before `config`.
- [ ] Mark conversions: dispatch-start submit, apply submit, compliance-alert signup, `tel:` clicks, `mailto:` clicks. Set `page_path` as the code does.
- [ ] Filter internal traffic and add an `utm` convention for Telegram and Facebook groups.

**Google Business Profile**
- [ ] A GBP requires either a staffed physical location customers can visit or a **service-area business** (address hidden, service area set). For a remote dispatch company, use a **service-area business** with the real registered address (not a virtual office or PO box), hidden, and service areas set to its states.
- [ ] Category: "Trucking company" isn't right, since it isn't a carrier. Use **"Transportation service"** or "Logistics service" as primary, and "Business management consultant" (or similar) as secondary. Check the categories GBP currently offers.
- [ ] NAP must match the site exactly. Website = `https://truckerhq.com/?utm_source=gbp`, hours 24/7, language attributes, services list (Truck dispatch, Driver recruiting), a photo of the real team and office, and verification (video or postcard).
- [ ] Put the GBP URL in the Organization `sameAs` and start asking clients for reviews. Reply in EN and RU.
- [ ] Citations: Bing Places (import from GBP), Apple Business Connect, BBB, LinkedIn company page, Facebook page, trucking directories (DAT and Truckstop dispatcher listings, if any), and Russian-community directories.

**Pre-launch technical gate**
- [ ] `npm run check:placeholders -- --strict` returns 0 hits.
- [ ] On `/robots.txt`, the sitemap line points at the apex host.
- [ ] Spot-check that `view-source:` on a state, city and guide shows the intended `robots` meta after the P0 decisions.
- [ ] OG debuggers: Facebook Sharing Debugger, LinkedIn Post Inspector and the Telegram `@webpagebot` rescrape for `/`, `/ru` and `/dispatch` once the real phone and prices are in.
- [ ] Core Web Vitals: PageSpeed Insights on `/` and `/dispatch` (mobile). The hero images come from Unsplash via `next/image` with AVIF/WebP. Check that the LCP image has `priority`.
