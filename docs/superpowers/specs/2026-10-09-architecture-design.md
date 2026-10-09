# TruckerHQ: architecture and migration plan

- **Date:** 2026-10-09
- **Branch:** `refactor/p1-ui-primitives`
- **Builds on:** `docs/audit/2026-10-09-codebase-audit.md` (findings, target tree §2.3, roadmap §6). This spec does not repeat the audit; it records what is decided, what is done and what is next.
- **Rules:** `.claude/skills/project-conventions/SKILL.md` (decision log included).

## 1. Where the code stands

Done since the audit (on `main` or this branch):

- `server/` with validated `env.ts`, one HTTP client, one lead handler with zod schemas, SMS throttle, post-response notifications via `after()`.
- CI with lint, typecheck, coverage thresholds, placeholder report, build and Playwright smoke tests.
- Shared UI primitives (`Button`, `Field`, `choices`, `FilterChips`, `StepProgress`, `EmptyState`, …), `useFormSubmit` + `postJson`, theme tokens.
- First three features migrated: `profit`, `dispatch`, `claim`, each with `index.ts`, a pure `model/` and split `ui/`.
- The `*FromUrl` wrappers replaced by `useSearchParam` + `*View` components.
- Boundary lint for `features/`, `shared/`, `server/` and feature entry points.

Still open (structural):

| Area | Problem | Audit ref |
|---|---|---|
| `lib/` | 78 files mixing content, static data, SEO and helpers. `state-content.ts` 2,026 lines, `city-content.ts` 1,163 lines. `city-content.ts:1` imports a type from `components/`. | A1–A6 |
| `components/` | 29 flat files; jobs, carriers, guides, compliance and hire-drivers UI not in features. `HomePageContent.tsx` 385 lines, `StateCarriersPage.tsx` 257. | A2, §4.1 |
| `app/(en)/tools/carrier-lookup` | Two pages of 365 and 358 lines with inline content and helpers. | A8, A9 |
| `app/(en)/jobs/[slug]` | One segment serves city landing and single job, branching in three files. | A7 |
| i18n | Three copy patterns, EN-only content modules. | A10 |
| Unused | `components/CtaCard`, `PageHero`, `StatsStrip`, `shared/ui/FaqList` exist untracked and unused. | §4.2 |

## 2. Target

The audit's target tree (§2.3) stands, with these decisions (details in the conventions decision log):

1. Single `@/` alias; boundaries read from the path and enforced by `no-restricted-imports` generated per feature folder.
2. The lead pipeline stays in `server/leads/` rather than `features/leads/`.
3. `lib/` and `components/` are legacy: nothing new goes there, and they shrink with each step until deleted.

Example of the two module shapes already in the tree:

- **Independent:** `features/profit`: `model/profit.ts` (pure maths, tested) ← `ui/ProfitCalculator.tsx`; `index.ts` exports `ProfitCalculator`; used only by `app/(en)/tools/profit-per-mile/page.tsx`.
- **Dependent:** `features/dispatch`: `model/dispatch-start.ts` (reducer, options, payload) ← `ui/start-wizard/*`; depends on `shared/ui`, `shared/hooks/useStepFocus`, `shared/client/post-json` and `lib/analytics`; posts to `/api/dispatch-start`, which lives in `server/leads`. No import of another feature.

## 3. Migration plan

Each step: moves in one commit, behaviour changes in another, lint + typecheck + tests + build + e2e green before the next step. The boundary rule covers a new feature as soon as its folder exists.

| # | Step | Risk | Verify |
|---|---|---|---|
| 1 | **jobs**: `features/jobs/{model,ui,data}` from `JobCard`, `JobsResults`, `JobsSearchForm`, `CityJobs*`, `JobsPageContent`, `lib/job-filters`, `JOBS`, `city-content`. Move the `CityJob` type into `jobs.types.ts` (fixes A1). Add `resolveJobsSlug()` for `jobs/[slug]`. | Medium: 50+ static city pages and the RU jobs page. | Build page count unchanged (131). E2E jobs filter. Snapshot one city page's HTML before/after. |
| 2 | **carriers**: `features/carriers` from `StateCarriers*`, `HealthBadge`, the health helpers in `lib/data.ts`, `lib/fmcsa.ts`, both carrier-lookup pages (split into landing/results/profile). Wire `PageHero`, `StatsStrip`, `CtaCard` here or delete them. | Medium: 50 state pages. | Same page count; carrier-lookup e2e smoke added. |
| 3 | **carriers data**: `carriers-*.ts` ×49 + `TEXAS_CARRIERS` → `data/states/<slug>.json` with one loader; `state-content.ts` → unique fields + template functions. | High: content regressions across 50 pages. | A test that renders every state's content and compares key fields to the old output, written before the move. |
| 4 | **guides**, **compliance**, **hire-drivers**, **contact** into features (small, independent). | Low. | Existing component tests move with them. |
| 5 | **Split `lib/`**: `shared/seo`, `shared/config` (`site`, `contact`), `shared/client` (`analytics`, `consent`), `shared/i18n`; delete `lib/`. | Medium: many importers. | Mechanical commit per target folder; grep shows no `@/lib/`. |
| 6 | **Home and dispatch pages**: section components for `HomePageContent` and `DispatchPageContent`; `FaqList` shared. | Low. | Visual check EN + RU. |
| 7 | **i18n**: one `Locale`, `getCopy()`, RU error/404. | Medium. | `/ru/<bad-path>` shows a Russian 404. |

### Step 1 notes (inventory done 2026-10-09, nothing moved yet)

- **Into `features/jobs`:** `components/{JobCard,JobsResults,JobsSearchForm,CityJobsList,CityJobsPage,JobsPageContent,ApplyForm}` → `ui/`; `lib/job-filters` → `model/`; `JOBS`, `Job`, `JobType`, `findJob` from `lib/data.ts`, plus `lib/{city-content,cities,city-slugs,jobs-copy}` → `data/`; `CityJob` → `jobs.types.ts`.
- **Into `shared/`, not jobs:** `HealthBadge` and the health helpers in `lib/data.ts` (`healthColor`, `healthOnColor`, `healthTextColor`, `healthLabel`). Both jobs and carriers use them.
- **Stays in `lib/data.ts` until step 2:** `CARRIERS`, `findCarrier`. The jobs pages read a carrier score from them; in step 2 that becomes a value passed in from `app/`, not a jobs → carriers import.
- **Legacy importers of jobs:** `lib/home-copy.ts` and `lib/notifications.ts` use `JOBS`/`findJob`. After the move they import `@/features/jobs` (index only; lint allows it). `notifications.ts` moves to `server/leads` in step 5.
- **Commit order:** (a) health helpers + `HealthBadge` to `shared/`, (b) pure move into `features/jobs` with import updates, (c) `resolveJobsSlug()` for `jobs/[slug]` as a separate behaviour commit.
- **Regression check:** `D:\CODE\TruckerHQ\.tmp\before.txt` has the visible text, links, meta and JSON-LD of every prerendered page at `583bc9a`. After each commit: `npm run build`, then `node ../.tmp/snapshot.mjs .next/server/app ../.tmp/after.txt` and diff the two files. Pure moves must produce no diff.
- **Per-commit gates:** `../.tmp/commit-verified.sh "<message>" <paths…>` stages the paths, sets the rest aside, runs typecheck + tests, and commits only if green. It uses `git stash` — don't run it while another session uses the stash.

## 4. Verification register

| Check | Result |
|---|---|
| **Baseline** (working tree as found, before any change today) | typecheck **6 errors** (`StateCarriersPage`, `CityJobsPage` still imported deleted `*FromUrl`/chip components); vitest **1 failed** / 209 passed (`DispatchStartWizard`: `Field` put the hint inside `<label>`, so "MC/DOT number" was not the accessible name). Red baseline became step 0: both fixed and committed. |
| **After step 0 and the prototype** (boundary lint + alias rewrite) | lint 0, typecheck 0, vitest 36 files / 210 tests passed, `next build` 131/131 static pages, Playwright 5/5. No new errors against the repaired baseline. |
| **Collection** | `vitest run src/features src/shared` collects 14 files / 69 tests. `vitest.config.mts` includes `src/**/*.test.{ts,tsx}` relative to the repo root, so `.claude/worktrees/` is never collected. |
| **Guards** | 6 planted violations each failed `eslint` with the intended message: feature → other feature, deep `../../` inside a feature, `shared` → feature, `server` → `shared/ui`, `components` → feature internals, feature → `components`. Two allowed imports (feature index from `components`, own-feature alias inside a feature) passed. |

One flaky test was found while verifying commits: the full `DispatchStartWizard` flow takes ~2s alone and passed the 5s default under the 36-file parallel run. It now has an explicit 15s timeout.
