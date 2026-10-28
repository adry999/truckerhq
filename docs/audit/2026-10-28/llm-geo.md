# TruckerHQ — AI / LLM Search Visibility (GEO) Audit

- **Date:** 2026-10-28
- **Branch:** `main` @ `1fcb0b3` (read-only review, no edits)
- **Scope:** crawler access (robots.ts, Cloudflare/Vercel bot layers), llms.txt, server-rendering of citeable text, entity/structured data, answer-first content structure on guides and landing pages, factual specificity, citeable data assets, markdown alternatives.
- **Targets:** ChatGPT search (OAI-SearchBot / ChatGPT-User), Perplexity (PerplexityBot / Perplexity-User), Google AI Overviews (Googlebot, Google-Extended for Gemini training), Claude (ClaudeBot / Claude-SearchBot / Claude-User), Gemini, Copilot (Bingbot), Apple (Applebot / Applebot-Extended), Common Crawl (CCBot).
- **Context read first:** `docs/audit/2026-10-09-codebase-audit.md` (P0 "honesty pass" on sample data and placeholders is still open; it is also the single biggest GEO blocker, see F1–F3).

Severity: P0 = blocks or actively harms citation; P1 = materially lowers the chance of being cited; P2 = improvement; P3 = polish.

---

## 0. Summary

**GEO readiness: 3.5 / 10.** The technical substrate is good: every page is server-rendered HTML, FAQs are real `<details>` markup, FAQPage/Article/Organization/Breadcrumb JSON-LD exist, hreflang is generated, robots.txt does not block any AI bot. What stops an LLM from citing Trucker HQ today is *content*, not plumbing:

1. **Nothing concrete to cite.** Price is `$XXX` in 9 places, phone is `(XXX) XXX-XXXX`, founder is "Name Surname", founded "20XX · City, ST", authors are "Dispatcher Name". LLM answer engines extract and repeat specific facts ("flat $450/week per truck"); placeholders are skipped or, worse, quoted verbatim.
2. **10 of 11 guides are empty stubs** ("This guide is being written…") yet are in the sitemap with `Article` schema and dates. That is 10 thin pages teaching crawlers that `/guides/*` is low-value.
3. **Fabricated statistics presented as data.** "48,210 active for-hire carriers in Texas", sample carriers with real-format DOT numbers and "Health Score 91". These are exactly the kind of numbers an LLM lifts into an answer. Once cited, they are wrong in public.
4. **No `/llms.txt`**, no markdown alternates, no `Content-Signal` lines, no explicit AI-bot rules.
5. **Entity graph is thin.** `Organization` has no `@id`, `sameAs`, `logo`, `telephone`, `address`, `founder`; a second unlinked `Organization` is emitted on `/about`; no `WebSite`, `Service`/`Offer`, or `Person` nodes.

The Cloudflare point (section 4) is operational, not in the repo: the app is hosted on Vercel (`VERCEL_PROJECT_PRODUCTION_URL` in `src/shared/config/site.ts:3`), there is no `wrangler`/Cloudflare config. If `truckerhq.com` DNS sits on Cloudflare with the proxy on, Cloudflare's default "Block AI bots" / AI Crawl Control setting will silently drop OAI-SearchBot, ClaudeBot, PerplexityBot, CCBot and Google-Extended regardless of what `robots.ts` says.

---

## 1. Crawler access

### [P1] AI search bots may be blocked at the edge (Cloudflare / Vercel), not by robots.ts
`src/app/robots.ts:4-16`, `src/shared/config/site.ts:3`

**Problem.** `robots.ts` emits a single `User-Agent: *` allow rule, so every AI crawler is *permitted* by robots. But permission at robots level is irrelevant if the edge returns 403/JS-challenge. There is nothing in the repo that controls this; it lives in the Cloudflare and/or Vercel dashboards. Cloudflare zones created since mid-2025 default to **blocking AI crawlers** ("Block AI bots" / AI Crawl Control), and the "managed robots.txt" feature rewrites your robots.txt to add disallow lines for AI training bots. Vercel Firewall also ships an "AI Bots" managed ruleset that can challenge or deny the same user agents.

**Fix.** See section 4 for the exact dashboard settings. In the repo, add a smoke check to CI or a cron that fetches `https://truckerhq.com/` and `/llms.txt` with the user-agents `OAI-SearchBot/1.0`, `ClaudeBot/1.0`, `PerplexityBot/1.0`, `Claude-SearchBot/1.0`, `Bingbot/2.0` and fails on anything other than 200 + `text/html` (a Cloudflare challenge returns 403 or a 503 "Just a moment" page). Also serve `Content-Signal` via `robots.ts` (next finding) so the intent is machine-readable.

### [P2] robots.ts has no explicit AI-bot rules or Content-Signal
`src/app/robots.ts:6-12`

**Problem.** Wildcard-only robots is *functionally* fine, but (a) Cloudflare's managed robots.txt / AI Crawl Control inserts its own `User-agent: GPTBot … Disallow: /` block above yours when enabled, and an explicit per-bot `Allow: /` is the only thing that survives a later "did we mean to block this?" question; (b) the Content Signals convention (`Content-Signal: search=yes, ai-input=yes, ai-train=no`) is what Cloudflare and a growing set of crawlers read to distinguish *search/retrieval* (you want this) from *training* (your call). Next 16.3 added the `other` field to emit such non-standard lines per user-agent block (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`, "Non-standard directives").

**Fix.** Explicit allow for retrieval bots, explicit decision for training bots, `Content-Signal` on the wildcard block. Full sketch in section 6. Recommended policy for a lead-gen site that *wants* to be cited:

| Bot | Purpose | Recommendation |
|---|---|---|
| `OAI-SearchBot`, `ChatGPT-User` | ChatGPT search index + live fetch | **Allow** |
| `PerplexityBot`, `Perplexity-User` | Perplexity index + live fetch | **Allow** |
| `ClaudeBot`, `Claude-SearchBot`, `Claude-User` | Claude index + live fetch | **Allow** |
| `Googlebot`, `Bingbot`, `Applebot` | Search + AI Overviews / Copilot / Siri | **Allow** (never touch) |
| `GPTBot` | OpenAI *training* | Allow (visibility inside the model itself; harmless for public marketing content). Disallow only if the owner objects on principle. |
| `Google-Extended` | Gemini *training* / grounding control, does **not** affect Search or AI Overviews | Allow |
| `Applebot-Extended` | Apple Intelligence training | Allow |
| `CCBot` | Common Crawl (feeds many models + datasets) | Allow |
| `anthropic-ai`, `cohere-ai`, `Bytespider`, `Amazonbot`, `meta-externalagent` | training / scrapers | owner's call; leave under `*` |

Keep `Disallow` for `/dispatch/start`, `/claim`, `/tools/carrier-lookup?` on every block (the lookup `?q=` hits live FMCSA; AI agents re-fetch aggressively).

### [P2] `/tools/carrier-lookup` results and `/tools/carrier-lookup/[slug]` are invisible to answer engines by design; nothing static replaces them
`src/app/robots.ts:11`, `src/app/(en)/tools/carrier-lookup/[slug]/page.tsx:25`

**Problem.** Correct decisions (live API, sample data), but the net effect is that the single most "answerable" asset on the site ("is carrier X legit?") contributes zero citeable text. The landing page's score methodology (`LookupLanding.tsx:90-118`, `lookup.ts:10-15`) is the only static explanation and it is four one-liners.

**Fix.** Give the landing page a server-rendered "How the Health Score is calculated" section with the weights as a table (Authority 30 / Insurance 25 / Inspections 30 / Crashes 15), the band thresholds, the data sources named by FMCSA product (SAFER, L&I, MCMIS crash/inspection), the refresh cadence, and 4–6 FAQs ("What does 'Not Authorized' mean?", "How long is a new MC on probation?"). That text is what gets cited; the tool itself does not need to be.

---

## 2. Server-rendered content check

### [P3] Client components do not hide important text (verified, no action)
`src/shared/ui/FaqList.tsx:3-20`, `src/features/guides/ui/GuidesIndex.tsx:23`, `src/features/jobs/ui/JobsBoard.tsx:31,40`, `src/features/profit/ui/ProfitCalculator.tsx:79-81`, `src/features/dispatch/ui/landing/GrossComparison.tsx:11-19`

FAQs are plain `<details>/<summary>` in a server component, so the answer text is in the HTML. The `useSearchParams` islands (`GuidesList`, `JobsResults`, `JobsSearchForm`) are wrapped in `Suspense` whose fallback renders the *same* view with defaults, so prerendered HTML contains the full list. `ProfitCalculator` and `GrossComparison` are `"use client"` but their first render uses `useState` defaults, so the example result ($2,400 load / 1,000 mi / 120 dh) and the $8,000-gross comparison are in the SSR HTML. The checklist (`NewMcChecklist.tsx`) is fully server-rendered. **No GEO loss from client rendering.** The gap is that tool pages carry almost no *prose* around the widget (next finding).

### [P1] Tool pages have no citeable explanation around the widget
`src/app/(en)/tools/profit-per-mile/page.tsx:20-43`, `src/features/carriers/ui/lookup/LookupLanding.tsx:90-118`

**Problem.** `/tools/profit-per-mile` is a 2-sentence hero plus the calculator. A query like "how do I calculate profit per mile trucking" is answered by LLMs from pages that *state the formula in prose*. The formula lives only in `features/profit/model/profit.ts` (code) and in the featured guide.

**Fix.** Add a server-rendered section under the calculator (not above, keep the tool first): definition sentence, the formula as text (`profit per mile = (load pay − fuel − maintenance − tolls − fixed weekly costs × (load miles ÷ weekly miles)) ÷ (loaded + deadhead miles)`), a 3-row worked example table using the same defaults as the widget, 4 FAQs with `faqSchema`, "Updated <month year>", and a `SoftwareApplication`/`WebApplication` JSON-LD node (`applicationCategory: "FinanceApplication"`, `offers.price: 0`). Same pattern for compliance-alerts and carrier-lookup.

---

## 3. Entity clarity and structured data

### [P0] Placeholders in the facts LLMs extract (price, phone, founder, founded, USDOT/MC, authors)
`src/shared/config/contact.ts:2-4`, `src/features/contact/data/about.ts:6-8,13,25`, `src/features/home/data/home-copy.ts:69,156-160`, `src/features/home/ui/HomePricing.tsx:17,49`, `src/features/dispatch/ui/landing/DispatchHero.tsx:49`, `src/features/dispatch/ui/landing/DispatchPricing.tsx:43`, `src/features/dispatch/ui/landing/GrossComparison.tsx:74-77`, `src/features/dispatch/ui/start-wizard/SummaryAside.tsx:22`, `src/features/profit/ui/ProfitCalculator.tsx:65`, `src/features/hire-drivers/ui/HireDriversPlans.tsx:16,41`, `src/app/(en)/dispatch/opengraph-image.tsx:12-13`, `src/app/ru/dispatch/opengraph-image.tsx:15-16`, `src/features/guides/data/guides.ts:18-28`

**Problem.** The site's whole positioning is "flat weekly price, not a percentage", and the number is `$XXX` everywhere, including the OG image and the ContactPage JSON-LD telephone (`+1-XXX-XXX-XXXX`, `about/page.tsx:21`). When Perplexity is asked "how much does Trucker HQ dispatch cost" there is nothing to quote, so it quotes a competitor with a number. `scripts/check-placeholders.mjs` is warn-only in CI (`ci.yml:25`).

**Fix.** Fill the real values (one file for phone; a `PRICING` constant for the three packages consumed by every `$XXX` site). Then flip CI to `check:placeholders -- --strict`. Until real prices exist, do **not** ship `$XXX`: say "from $X/week" with a real floor, or remove the number and keep the claim qualitative. Same for `author`: a real name + role, or `"Trucker HQ dispatch team"` as an `Organization` author (acceptable to LLMs; "Dispatcher Name" is not).

### [P1] Organization JSON-LD is minimal and duplicated; no `@id`, `sameAs`, logo, contact, founder, address
`src/components/RootDocument.tsx:34-43`, `src/shared/seo/structured-data.ts:3-26`, `src/app/(en)/about/page.tsx:18-23`

**Problem.** Entity resolution ("is Trucker HQ a real company, where, who runs it, which profiles are the same entity?") is how answer engines decide whether to cite a small brand at all. The root `Organization` has name/url/description only. `/about` emits a *second* `Organization` inside `ContactPage.about` with no `@id`, so the graph has two unlinked Trucker HQ nodes. There is no `sameAs` (Google Business Profile, LinkedIn, Facebook, YouTube, Telegram), no `logo`, no `address`, no `founder`, no `telephone`, no `WebSite` node with `inLanguage: ["en","ru"]`.

**Fix.** One `@graph` in `RootDocument` with `@id`s, reuse the ids everywhere:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://truckerhq.com/#org",
      "name": "Trucker HQ",
      "legalName": "<LLC name>",
      "url": "https://truckerhq.com/",
      "logo": { "@type": "ImageObject", "url": "https://truckerhq.com/icon.svg" },
      "foundingDate": "20XX",
      "founder": { "@type": "Person", "@id": "https://truckerhq.com/about#founder", "name": "<Founder>" },
      "address": { "@type": "PostalAddress", "addressLocality": "<City>", "addressRegion": "<ST>", "addressCountry": "US" },
      "telephone": "+1-XXX-XXX-XXXX",
      "email": "hello@truckerhq.com",
      "areaServed": { "@type": "Country", "name": "United States" },
      "knowsLanguage": ["en", "ru"],
      "identifier": [
        { "@type": "PropertyValue", "propertyID": "USDOT", "value": "<USDOT>" },
        { "@type": "PropertyValue", "propertyID": "MC", "value": "<MC>" }
      ],
      "sameAs": ["<Google Business Profile URL>", "<LinkedIn>", "<Facebook>", "https://t.me/truckerhq"]
    },
    { "@type": "WebSite", "@id": "https://truckerhq.com/#website", "url": "https://truckerhq.com/", "name": "Trucker HQ", "publisher": { "@id": "https://truckerhq.com/#org" }, "inLanguage": ["en", "ru"] }
  ]
}
```

Then `contactPageSchema` should reference `{"@id": "https://truckerhq.com/#org"}` instead of inlining a new `Organization`; `Article.publisher` and `Article.author` (if team-authored) point at the same id.

### [P1] Dispatch pricing has no `Service` / `Offer` schema (once prices exist)
`src/features/dispatch/data/dispatch-copy.ts:73-111`, `src/app/(en)/dispatch/page.tsx:22`

**Problem.** The packages (Starter MC, Owner-Operator Flat, Fleet, Web & Brand) exist only as marketing cards. LLMs answering "flat rate truck dispatch pricing" pull from pages whose `Offer` nodes carry `price`, `priceCurrency`, `unitText`. Nothing on the site states "per truck per week" in a machine-readable way.

**Fix.** Emit on `/dispatch` (and `/ru/dispatch`): `Service` with `@id`, `serviceType: "Truck dispatch service"`, `provider: {@id org}`, `areaServed: US`, `availableLanguage`, and `hasOfferCatalog` → one `Offer` per package with `price`, `priceCurrency: "USD"`, `priceSpecification.unitText: "per truck per week"`, `eligibleCustomerType` text (e.g. "MC under 6 months"). Also put the same sentence in visible prose on the page: "Owner-Operator Flat is $N per truck per week, billed weekly, cancel with one week's notice."

### [P1] Article schema is incomplete and the "Updated" date is actually the publish date
`src/app/(en)/guides/[slug]/page.tsx:39-45`, `src/features/guides/model/guides.ts:31-34`, `src/features/guides/ui/GuideArticle.tsx:31`

**Problem.** `Article` has `headline`, `author` (placeholder), `datePublished` only: no `dateModified`, `publisher`, `mainEntityOfPage`, `description`, `image`, `inLanguage`, `about`. The visible "Updated Oct 2026" is derived from `guide.date` which the sitemap uses as `lastModified` and the schema as `datePublished`, so the three disagree about what the date means. Freshness signals ("last updated") are weighted heavily by Perplexity and Google AI Overviews for how-to content.

**Fix.** Add `updated?: string` to `Guide` (`guides.ts:8-15`); `datePublished = date`, `dateModified = updated ?? date`; show "Published <d> · Updated <d>" only when they differ; sitemap `lastModified = updated ?? date`. Add `publisher: {@id org}`, `mainEntityOfPage`, `description: guideDescription(guide)`, `inLanguage: "en"`. For the stubs, see F below.

### [P2] NAP inconsistencies and dead contact links
`src/components/SiteFooter.tsx:29`, `src/features/contact/data/about.ts:51-55`, `src/features/contact/data/about.ts:33-43`

**Problem.** Footer email links to `/about#contact` instead of `mailto:`; Telegram/WhatsApp `href: "#"`; "Dispatch, 24/7" and "Office, Mon–Fri 9–6 CT" show the *same* phone; no street/city anywhere. Entity resolvers cross-check NAP across the site, Google Business Profile, and schema.

**Fix.** Real `mailto:`, real `https://t.me/...` / `https://wa.me/1...`, distinct numbers if they differ, a city/state line in footer and `/about`, all matching the `PostalAddress` in the graph.

---

## 4. Cloudflare (and Vercel) bot settings

The repo has no Cloudflare artefacts; hosting is Vercel. Two scenarios:

**A. DNS on Cloudflare, proxy ON (orange cloud) in front of Vercel.** Cloudflare sits in the request path and its bot settings apply. Check and set:

| Dashboard location | Setting | Set to | Why |
|---|---|---|---|
| Security → Bots (or **AI Crawl Control** / "AI Audit") | **Block AI bots** / "Block AI Scrapers and Crawlers" | **Off** (or "Block only on hostnames without ads"→Off) | Default-on for new zones since July 2025. Blocks `GPTBot`, `ClaudeBot`, `CCBot`, `PerplexityBot`, `Google-Extended`, `Bytespider`, etc. with a 403 at the edge. Robots.txt is never consulted. |
| AI Crawl Control → per-crawler table | Per-bot Allow/Block | **Allow**: OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot, Bingbot, Googlebot, Google-Extended, CCBot. Training bots per owner policy. | Granular override of the global toggle. |
| AI Crawl Control → **Pay Per Crawl** | | **Off** / not enrolled | Enrolled zones return 402 to crawlers that have not agreed to pay; search bots walk away. |
| Security → Bots → **Managed robots.txt** | | **Off**, or verify the generated `/robots.txt` | When on, Cloudflare prepends its own disallow block for AI training bots and a `Content-Signal` line to the robots.txt your Next route serves. Fine if you agree with it; it overrides your intent if you don't. |
| Security → Bots → **Bot Fight Mode** (Free plan) | | **Off**, or accept the risk | BFM applies a JS challenge to traffic its heuristics score as automated. Verified bots (Googlebot, Bingbot, Applebot, and the OpenAI/Anthropic/Perplexity *search* bots that are on Cloudflare's verified-bot list) are exempt, but `ChatGPT-User` / `Claude-User` / `Perplexity-User` live-fetches made on behalf of a user are not always verified and get challenged. BFM cannot be tuned; it is on/off. |
| Security → Bots → **Super Bot Fight Mode** (Pro+) | "Definitely automated", "Likely automated", "Verified bots" | Definitely automated: **Allow** or Managed Challenge (not Block); Likely automated: Allow; Verified bots: **Allow** | Any "Block" on "Definitely automated" kills unverified AI fetchers. |
| Security → WAF → Managed rules / Custom rules | Rules matching `cf.verified_bot_category eq "AI Crawler"` or `"AI Search"` / `"AI Assistant"` | Action **Skip** or **Allow** for the "AI Search" and "AI Assistant" categories | Cloudflare now tags verified bots by category; a custom rule can allow retrieval categories while challenging "AI Crawler" (training). |
| Security → Settings → **AI Labyrinth** | | **Off** | Serves hidden decoy links to bots classified as "AI crawler" to poison their crawl; it will also waste the allowed bots' crawl budget if the classifier is wrong. |
| Security → Settings → **Browser Integrity Check** | | Off for `/llms.txt`, `/robots.txt`, `/sitemap.xml` (Configuration Rule), or site-wide | BIC rejects requests with "non-browser" headers; some fetchers trip it. |
| Rules → Configuration Rules | For paths `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/sitemap.xml`, `/guides/*.md` | Security Level: Essentially Off; disable BIC; cache: Cache Everything, Edge TTL 1h | These must always be plain 200 responses. |
| Speed → Optimization | **Rocket Loader**, **Email obfuscation**, **Mirage** | **Off** | Rocket Loader rewrites `<script>` tags (breaks Next hydration and can move JSON-LD); email obfuscation replaces `hello@truckerhq.com` with a JS stub, so crawlers never see the email. |
| Caching → Configuration | **Development mode** | Off | Not a bot issue, just make sure the HTML is cacheable at the edge. |

Verify from a shell after changes (a 200 with HTML, not a 403 or a "Just a moment…" page):

```sh
for ua in "OAI-SearchBot/1.0; +https://openai.com/searchbot" "ChatGPT-User/1.0" "ClaudeBot/1.0" "Claude-SearchBot/1.0" "PerplexityBot/1.0" "Bingbot/2.0" "CCBot/2.0"; do
  printf '%-45s ' "$ua"; curl -s -o /dev/null -w '%{http_code} %{content_type}\n' -A "$ua" https://truckerhq.com/
done
```

Also check Security → Events for the last 7 days filtered by those user agents; "Block"/"Managed Challenge" rows are the smoking gun.

**B. DNS on Cloudflare, proxy OFF (grey cloud) or DNS elsewhere.** Cloudflare is DNS-only and has no bot effect. Then the only edge is **Vercel**: Project → Firewall → **Bot Protection** / Managed Rulesets → "AI Bots" should be **Off** or **Log** (not Challenge/Deny); **Attack Challenge Mode** must be off outside an incident (it challenges everything, including Googlebot). Vercel's `BotID` is only active where you wire it (none in repo). Vercel's own bot filter does not block verified search bots.

Either way, do **not** rely on `robots.ts` to understand what crawlers actually receive; the CI smoke check from F1 is the only reliable signal.

---

## 5. Content for citation (guides, home, dispatch)

### [P0] 10 of 11 guides are stubs that are indexed, in the sitemap, and carry Article schema
`src/features/guides/ui/GuideArticle.tsx:38-47`, `src/features/guides/data/guides.ts:19-28`, `src/app/sitemap.ts:37-42`, `src/app/(en)/guides/[slug]/page.tsx:39-45`

**Problem.** Every guide except `how-to-tell-if-a-load-pays-enough` renders "This guide is being written by our dispatch team — check back soon." as the body, with a dated `Article` schema, `priority 0.5` sitemap entries, and the meta description "A brokers guide for owner-operators from Trucker HQ dispatch. 5 min read." Answer engines treat domains with many thin pages as low-authority; Google's helpful-content system demotes the whole site section. This is also an honesty problem: `/guides` promises "Every guide in English and Russian" (`GuidesIndex.tsx:15-16`) while zero RU guides exist.

**Fix.** Short-term (one PR): `robots: { index: false, follow: true }` for any guide without a body, drop them from `sitemap.ts`, drop the `Article` schema for stubs, remove "in English and Russian" from the index copy. Medium-term: write the 10 bodies using the pattern in 5.3; these topics (double brokering signs, rate con reading, IFTA step by step, recourse vs non-recourse factoring, detention pay) are exactly the long-tail questions ChatGPT/Perplexity users ask, and the featured guide shows the team can write them.

### [P1] Fabricated statistics and sample carriers are presented as data LLMs will quote
`src/features/carriers/data/states/*.json` (e.g. `texas.json:5-21`), `src/features/carriers/model/state-content.ts:4-9`, `src/features/home/data/home-copy.ts:66-67`, `src/features/carriers/data/carriers.ts:4-11`, `src/features/carriers/ui/profile/ProfileHeader.tsx:73`

**Problem.** "48,210 active for-hire carriers · 1,284 new MCs in the last 30 days · Average Health Score 76 · 3.1 trucks per carrier" ×50 states, "Houston 9,820 carriers", home hero "DOT 3412897 · Authorized · Insured · Last checked 2 min ago", profile "Updated today". None of it is sourced; the carriers are invented with real-format DOT numbers. State pages are indexable (`priority 0.7`). An LLM asked "how many trucking companies are in Texas" that lands on `/carriers/texas` will repeat 48,210 and attribute it to Trucker HQ. This is the codebase audit's Q2 risk, now with a misinformation-at-scale angle.

**Fix.** Two options, pick one per page:
- **Make it true (recommended, and it becomes the site's best citeable asset).** FMCSA publishes the Motor Carrier Census (MCMIS) and the monthly "Motor Carrier Registrations" files publicly. A quarterly script can compute per-state counts of active for-hire interstate carriers, new MC grants in the last 30/90 days, median fleet size, and equipment mix; store in `data/states/<slug>.json` with `"source": "FMCSA MCMIS census, snapshot 2026-10-01"` and render "Source: FMCSA, snapshot Oct 1 2026" under the stat strip plus a `Dataset` JSON-LD node. That is a unique, dated, sourced data page per state — the exact shape of thing answer engines cite and link.
- **Label it.** Until then, render "Sample data for illustration" above the stats and list, `noindex` the state pages, and remove the fake DOT line from the home hero.

### [P1] Guides and landing pages are not answer-first
`src/features/guides/ui/FeaturedGuideBody.tsx:5-11`, `src/features/home/data/home-copy.ts:59-61,185-200`, `src/features/dispatch/data/dispatch-copy.ts:47-50,122-129`

**Problem.** The copy is good human copy (short, concrete, no fluff) but it is written for a reader who scrolls, not for an extractor that takes the first 40–60 words after a heading. Examples: the featured guide opens with a scene ("A load that looks good on the board can lose money…") instead of the definition; `/dispatch` never states in one sentence *what* the service is, *who* it is for, *what it costs* and *what the contract is*; FAQ answers are 1–2 sentences but several lack the number that makes them quotable ("Stop any time with one week notice" is good; "Yes. We help new authorities from day one" is not). No tables anywhere except the gross comparison widget. No "last updated" on any landing page.

**Fix.** Apply the rewrite pattern in 5.3 to: `heroBody` on home and dispatch, the first paragraph of each guide, and each FAQ answer. Add one comparison table to `/dispatch` (flat vs 8% vs 10% at $6k/$8k/$12k gross, server-rendered, not just the slider) and one "What's included" table with Yes/No per package. Add "Updated <Mon YYYY>" to home, dispatch, tools, hire-drivers (a `PAGE_UPDATED` constant per page is enough).

### [P2] RU surface is three pages with no guide or tool content
`src/shared/i18n/alternates.ts:5-9`, `src/app/ru/`

**Problem.** The business differentiator is Russian-speaking dispatch, and Russian-language queries to ChatGPT/Perplexity ("диспетчер для траков фиксированная оплата", "как проверить брокера по MC") are a low-competition niche. Only home, dispatch and jobs exist in RU; FAQ schema is emitted for them (good). No RU guides, no RU tool explanations.

**Fix.** Prioritise RU versions of the featured guide, the New MC checklist, and the carrier-lookup methodology; add to `LOCALIZED_ROUTES` so hreflang is generated. The `/ru/` `Organization` node should include `knowsLanguage: ["en","ru"]` (already in `availableLanguage`).

### [P2] New MC Checklist is the best GEO page on the site; it is missing dates and a HowTo/ItemList
`src/features/compliance/data/new-mc-checklist.ts:5-80`, `src/app/(en)/tools/new-mc-checklist/page.tsx:17-26`

**Problem.** Concrete, correct, specific (BOC-3, UCR, BMC-91/91X, 18–24-month new-entrant window, 60–90-day audit). It has FAQPage schema but no `HowTo`/`ItemList`, no "Updated" date, no source links (FMCSA URS, UCR), and no RU version.

**Fix.** Add `dateModified` text + `ItemList` of `HowToStep`-shaped items (Google retired HowTo rich results, but LLM extractors still read step lists), link the FMCSA pages for each item (outbound citations raise trust), and surface the step count in the H1/lead ("17 steps" appears on `/guides` but not on the checklist page itself).

### 5.3 Rewrite patterns (three concrete examples)

**Pattern:** `H2 as the question` → `one-sentence direct answer with the number` → `2–4 sentence why/how` → `table or list when there are ≥3 comparable items` → `FAQ at the bottom` → `Updated <date>` + author/role.

**Example 1 — featured guide opening** (`FeaturedGuideBody.tsx:6-11`)

Before:
> A load that looks good on the board can lose money once you count the miles to pick it up and what your truck costs to run. Before you call the broker, you need one number: the lowest rate per mile you will take.

After (answer-first, defines the term, carries the number):
> **A load pays enough when its all-in rate per mile, counted over loaded *and* deadhead miles, is above your cost per mile plus the profit you need.** For a typical owner-operator in 2026 that floor is about $2.00–$2.30 per mile all-in: $1.78 cost per mile on 10,000 miles a month plus 25–50 cents of margin. Here is how to work out your own number in four steps.
>
> | Step | What you calculate | Example |
> |---|---|---|
> | 1 | Cost per mile = monthly costs ÷ monthly miles | $17,800 ÷ 10,000 = $1.78 |
> | 2 | Real rate = pay ÷ (loaded + deadhead miles) | $2,100 ÷ (800 + 80) = $2.39 |
> | 3 | Walk-away = cost + margin | $1.78 + $0.40 = $2.18 |
> | 4 | Outbound check | loads posted out of the delivery city |

Keep the existing four sections after it; they already carry the worked numbers.

**Example 2 — dispatch hero + first FAQ** (`dispatch-copy.ts:49-50,123`)

Before (heroBody):
> We find the loads, push for the rate and do the paperwork. You pay one price every week, no matter how much you gross.

After:
> Trucker HQ is a flat-rate truck dispatch service for US owner-operators and fleets of 1–10 trucks. You pay **$N per truck per week** (not a percentage of gross), week to week with one week's notice, and get a 24/7 English- and Russian-speaking dispatcher who books loads from DAT and Truckstop, negotiates every rate, vets every broker, and handles rate cons, invoicing and factoring paperwork.

Before (FAQ):
> Q: What does the flat weekly price include? A: Everything on this page: load search, rate negotiation, broker vetting, paperwork, invoicing, fuel discounts and 24/7 support. No extra fees per load.

After:
> Q: How much does Trucker HQ dispatch cost? A: **$N per truck per week, flat.** Starter MC (authority under 6 months) is $N/week, Owner-Operator Flat (1–3 trucks) is $N per truck per week, Fleet (3–10 trucks) is $N per truck per week. There is no percentage, no per-load fee, no setup fee and no contract beyond one week's notice. On an $8,000 gross week a 10% dispatcher costs $800; the flat price is $N.

(Keep "What does the price include?" as a second FAQ.)

**Example 3 — home FAQ "I just got my MC"** (`home-copy.ts:191-194`)

Before:
> Yes. We help new authorities from day one: broker setup packets, the New MC Checklist, and lanes that accept new carriers.

After:
> Yes. Trucker HQ dispatches new MCs from the day the authority goes active. The Starter MC package ($N/week) includes broker setup packets for brokers that accept authorities under 90 days old, the 17-step New MC Checklist, and compliance reminders through the 18–24-month new-entrant period. Most new carriers get their first booked load within 3–5 business days of sending their MC, W-9 and certificate of insurance.

(Only keep the "3–5 business days" claim if it is true; a specific, true number is what gets cited.)

---

## 6. Ready-to-ship assets

### 6.1 `robots.ts` sketch

```ts
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/shared/config/site";

// Filtered listings canonicalize to the base URL. Carrier lookup ?q= hits the
// live FMCSA API, so no crawler may enumerate it.
const DISALLOW = ["/dispatch/start", "/claim", "/tools/carrier-lookup?", "/api/"];

// Search / retrieval bots: these produce citations and links. Always allowed.
const AI_SEARCH_BOTS = [
  "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Applebot", "Bingbot", "Googlebot", "DuckAssistBot",
];

// Training-only bots. Allowed on purpose: public marketing content inside the
// models is free distribution. Move any of these to a disallow block if the
// owner decides otherwise.
const AI_TRAINING_BOTS = ["GPTBot", "Google-Extended", "Applebot-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: AI_SEARCH_BOTS, allow: "/", disallow: DISALLOW },
      { userAgent: AI_TRAINING_BOTS, allow: "/", disallow: DISALLOW },
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
        // Content Signals (contentsignals.org), read by Cloudflare and a growing
        // set of crawlers. `other` is supported from Next 16.3.
        other: { "Content-Signal": "search=yes, ai-input=yes, ai-train=yes" },
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

Notes: the `!INDEXABLE` branch replaces the current "no sitemap on vercel.app" trick with an explicit disallow for preview hosts (today previews are crawlable and only `noindex` via meta). Set `ai-train=no` if the owner wants to opt out of training while staying in search; keep `search=yes, ai-input=yes` regardless.

### 6.2 `/llms.txt` (serve from `src/app/llms.txt/route.ts`, `Content-Type: text/plain; charset=utf-8`, built from `GUIDES`, `STATE_DIRECTORY` and `SITE_URL` so URLs follow the environment)

```md
# Trucker HQ

> Flat-rate truck dispatch for US owner-operators and small fleets (1–10 trucks), CDL driver jobs with pay posted up front, pre-screened driver hiring, and free FMCSA-based carrier tools. English and Russian-speaking dispatchers, 24/7, every US time zone. Based in <City, ST>, USDOT <n>, MC <n>.

Trucker HQ charges one flat price per truck per week instead of a percentage of gross: Starter MC (authority under 6 months) $N/week, Owner-Operator Flat (1–3 trucks) $N per truck per week, Fleet (3–10 trucks) $N per truck per week. Week to week, one week's notice, no per-load fees. Dispatchers search DAT, Truckstop and direct broker lists, negotiate every rate, vet every broker (credit, days-to-pay, authority), and handle rate confirmations, BOLs, invoicing and factoring paperwork. Equipment dispatched: dry van, reefer, flatbed, step deck, power only, box truck.

Contact: +1-XXX-XXX-XXXX (24/7, call or text), hello@truckerhq.com. Russian: https://truckerhq.com/ru

## Dispatch

- [Truck dispatch service, flat weekly rate](https://truckerhq.com/dispatch): packages, what is included, flat-fee vs percentage comparison, FAQ
- [Диспетчинг (Russian)](https://truckerhq.com/ru/dispatch): the same page in Russian
- [About Trucker HQ](https://truckerhq.com/about): team, contact, company facts

## Free tools (no sign-up)

- [Carrier Lookup by DOT or MC](https://truckerhq.com/tools/carrier-lookup): authority, insurance, inspections and crashes from public FMCSA data, summarised as a 0–100 Health Score (Authority 30 pts, Insurance 25, Inspections 30, Crashes 15; 80–100 Good, 60–79 Watch, 0–59 Risk)
- [Profit per Mile calculator](https://truckerhq.com/tools/profit-per-mile): real cost per mile and the lowest rate worth taking, with deadhead and fixed weekly costs
- [New MC Checklist](https://truckerhq.com/tools/new-mc-checklist): 17 steps for the first 6 months of a new authority, from USDOT/MC, BOC-3, UCR, BMC-91/91X, IFTA/IRP to the FMCSA new entrant safety audit
- [Compliance Alerts](https://truckerhq.com/tools/compliance-alerts): SMS when insurance, UCR or authority status changes
- [Carriers by state](https://truckerhq.com/carriers): per-state directory of for-hire interstate carriers

## Guides for owner-operators

- [How to tell if a load pays enough](https://truckerhq.com/guides/how-to-tell-if-a-load-pays-enough): cost per mile, deadhead, walk-away number, worked example ($1.78/mi cost, $2.18 floor)
<!-- generate one line per guide from GUIDES, only for guides with a written body -->

## Jobs and hiring

- [CDL jobs with pay posted up front](https://truckerhq.com/jobs): OTR, regional and local CDL-A jobs, apply in English or Russian
- [Hire CDL drivers, pre-screened](https://truckerhq.com/hire-drivers): CDL, MVR, PSP and Clearinghouse checked before a driver calls; first calls typically in 2–5 days; free replacement within 30 days on Full recruiting

## Optional

- [Guides index](https://truckerhq.com/guides)
- [Privacy](https://truckerhq.com/privacy), [Terms](https://truckerhq.com/terms), [SMS terms](https://truckerhq.com/sms-terms)
- [Full text for LLMs](https://truckerhq.com/llms-full.txt)
- [Sitemap](https://truckerhq.com/sitemap.xml)
```

`/llms-full.txt`: same header, then the full markdown body of every written guide, the New MC checklist items, the Health Score methodology and the dispatch FAQ, concatenated with `## <title>` headings and `Source: <url>` lines. Generate it from the same data modules at build time (route handler, cached) so it never drifts. Put `<link rel="alternate" type="text/plain" href="/llms.txt">` in the root layout `<head>` is optional; the convention is discovery by path.

### 6.3 Markdown alternates for guides (P2)

Add `src/app/md/guides/[slug]/route.ts` returning `text/markdown` built from a markdown source of each guide (move guide bodies from JSX to `.md`/MDX under `features/guides/content/` so the HTML page and the `.md` endpoint share one source), and a `rewrites()` entry in `next.config.ts` from `/guides/:slug.md` to `/md/guides/:slug`. Reference each from the HTML page with `<link rel="alternate" type="text/markdown" href="/guides/<slug>.md">` and list them in `llms.txt`. Answer engines that support markdown fetch (Claude, Perplexity's agent) get clean text; everyone else is unaffected.

---

## 7. Prioritised plan

| # | Sev | Action | Files |
|---|---|---|---|
| 1 | P0 | Fill real price, phone, founder, founded, USDOT/MC, author; CI `check:placeholders --strict` | `contact.ts`, `about.ts`, `home-copy.ts`, pricing components, `guides.ts`, `ci.yml` |
| 2 | P0 | Noindex + de-sitemap + drop Article schema for stub guides; remove "in English and Russian" claim | `guides/[slug]/page.tsx`, `sitemap.ts`, `GuidesIndex.tsx` |
| 3 | P1 | Cloudflare/Vercel bot settings per section 4; add UA smoke check to CI | dashboard, `ci.yml` |
| 4 | P1 | State stats: real FMCSA-derived numbers with source + date, or "sample data" label + noindex; remove fake DOT line from home hero | `data/states/*.json`, `StateStats`, `home-copy.ts:66-67` |
| 5 | P1 | Organization `@graph` with `@id`, `sameAs`, logo, address, telephone, founder, identifiers; `WebSite`; reuse `@id` in ContactPage/Article | `RootDocument.tsx`, `structured-data.ts` |
| 6 | P1 | `Service` + `Offer` schema and one-sentence price statement on `/dispatch` and `/ru/dispatch` | `dispatch/page.tsx`, `dispatch-copy.ts` |
| 7 | P1 | Answer-first rewrites (5.3), comparison table on `/dispatch`, "Updated" line on landing pages, `dateModified` on guides | copy modules, `GuideArticle.tsx`, `guides.ts` |
| 8 | P1 | Prose + FAQ + formula under each tool widget | `profit-per-mile/page.tsx`, `LookupLanding.tsx`, `compliance-alerts` |
| 9 | P2 | `/llms.txt` + `/llms-full.txt` route handlers (6.2); explicit AI-bot `robots.ts` with Content-Signal (6.1) | `src/app/llms.txt/route.ts`, `robots.ts` |
| 10 | P2 | Write the 10 guide bodies, markdown source + `.md` alternates; RU versions of featured guide + checklist | `features/guides/content/`, `alternates.ts` |
| 11 | P2 | NAP fixes: `mailto:`, Telegram/WhatsApp links, city/state in footer | `SiteFooter.tsx`, `about.ts` |
| 12 | P3 | `lastModified` on all sitemap entries; `Dataset` schema on state pages once real; `ItemList` on checklist | `sitemap.ts`, state pages, checklist page |

---

## Appendix — what already works for GEO

- All pages are server-rendered; `"use client"` islands render real content on first paint (`Suspense` fallbacks are the real view with defaults, `useState` defaults produce the example numbers).
- FAQs are native `<details>` with the answer text in HTML, and every FAQ page emits `FAQPage` JSON-LD, EN and RU.
- `BreadcrumbList` on state pages, `ItemList` on `/guides`, `ContactPage` on `/about`, `Article` on guides.
- Hreflang pairs and `x-default` are generated from one source (`alternates.ts`); `<html lang="ru">` on RU pages.
- Preview hosts are `noindex` (`metadata.ts:67`) and get no sitemap.
- The New MC Checklist and the featured guide already contain the concrete, specific, numeric content LLMs prefer; the rest of the site should look like them.
- `robots.ts` blocks nothing an answer engine needs; the live FMCSA lookup is correctly fenced.
