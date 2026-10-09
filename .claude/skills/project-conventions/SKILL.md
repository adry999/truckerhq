---
name: project-conventions
description: TruckerHQ structure and module rules - where code goes, who may import what, aliases, tests, commits. Read before adding a module, a folder, a cross-module import, or moving files. Records decisions made with the senior-architecture skill.
---

# TruckerHQ conventions

Design and migration plan: `docs/superpowers/specs/2026-10-09-architecture-design.md`.
Findings this builds on: `docs/audit/2026-10-09-codebase-audit.md`.

## Stack

Next.js 16 App Router (read `node_modules/next/dist/docs/` before Next APIs, see `AGENTS.md`), React 19, TypeScript strict, Tailwind 4 (`@theme` tokens in `src/app/globals.css`), zod 4. Vitest 5 (node by default, `// @vitest-environment jsdom` per component test file), Testing Library, Playwright in `tests/e2e/`. Deployed on Vercel. CI: `.github/workflows/ci.yml` runs lint, typecheck, test:coverage, check:placeholders, build, e2e.

## Layout

```text
src/
├── app/         routes and composition only; the only place that wires several features together
├── features/    one folder per business capability: index.ts + model/ + ui/ (+ server/, data/ when needed)
├── shared/      used by 2+ features: ui/, hooks/, lib/, client/
├── server/      server-only infrastructure: env, http, db, messaging, leads
├── components/  LEGACY: site chrome and pages not yet moved to a feature
└── lib/         LEGACY: content, static data, SEO and helpers not yet split
```

- No new files in `lib/` or `components/`. New code goes to a feature or to `shared/`; site chrome (header, footer, layout) may stay in `components/` until it gets its own home.
- A file has one responsibility. Split past ~250 lines or a second reason to change.

## Dependency rules (enforced by `eslint.config.mjs`)

- Direction: `app → features → shared / server / lib`.
- A feature never imports another feature. Cross-feature needs go through a port wired in `app/`, or the shared part moves to `shared/`.
- Features do not import `components/` or `app/`.
- `shared/` does not import features, `components/`, `app/` or `server/`.
- `server/` does not import features, `components/`, `app/`, `shared/ui` or `shared/hooks`.
- Everything outside a feature imports it only through its index: `@/features/<name>`.
- The rules are generated for every folder in `src/features/`, so a new feature is covered the moment its folder exists. A planted violation must fail `npm run lint`.

## Imports and aliases

- One alias, `@/*` → `src/*` (tsconfig and `vitest.config.mts`). Boundaries are read from the path: `@/features/…`, `@/shared/…`, `@/server/…`.
- Inside a feature: `./x` or a single `../x`. Across layers of the same feature use `@/features/<own>/model/…`, never `../../`.
- No barrels in subfolders and no chained `export *`. Only the feature root has an `index.ts`, exporting what `app/` uses.

## Feature internals

| Folder | Holds | Never |
|---|---|---|
| `ui/` | rendering, event wiring, step components | business rules, direct fetch |
| `model/` | pure rules, reducers, option lists, calculations | I/O, DOM |
| `server/` | data access, route logic for this feature | UI decisions |
| `data/` | static data for this feature | logic |

Wizards: one reducer in `model/` (`{ step, data }`), one component per step, `StepProgress` + `useStepFocus` for focus and announcements.

## Server

- Server config only through `server/env.ts` (validated, read at first use). The only other `process.env` reads are build-time public values that Next inlines literally: `lib/analytics.ts` (`NEXT_PUBLIC_*`) and `lib/site.ts` (`VERCEL_PROJECT_PRODUCTION_URL`).
- Outbound HTTP through `server/http/http-request.ts`. Lead routes through `server/leads/create-lead-handler.ts` with a zod schema per route.
- Modules that do I/O or read secrets start with `import "server-only"`. Pure validation (`server/leads/fields.ts`) doesn't need it.

## UI

- Forms: `Field`/`TextInput`/`SelectInput`/`TextArea`, `choices` (`RadioCard`, `CheckCard`, `ChoiceGroup`), `Honeypot` + `FormError`, `useFormSubmit` + `postJson`.
- `Field` keeps `hint` and `error` outside its `<label>`, so they never become part of the control's accessible name.
- URL filters: `FilterChips` / `UrlFilterChips` + `useSearchParam`. A client list exports a `*View` (takes the value, used as the Suspense fallback) and a default export that reads the URL.
- Colours come from `@theme` tokens, not raw hex.

## Tests

- `x.test.ts(x)` next to `x.ts(x)`. E2E in `tests/e2e/`, shared helpers in `tests/support/`.
- Test names describe observable behaviour.
- Route and infra tests inject fakes through handler deps before reaching for `vi.mock`.
- A component test that walks a whole multi-step flow gets an explicit timeout: the 5s default is not enough under a parallel run.

## Git

- Conventional Commits `type(scope): subject`, imperative. Scope = feature or layer.
- One logical step per commit, gates green. File moves and behaviour changes in separate commits.
- No AI, agent or co-author mentions, no `Co-Authored-By` trailer.

## Workspace

- The repo lives in `D:\CODE\TruckerHQ\main`. `D:\CODE\TruckerHQ` is a plain container.
- Manual worktrees are siblings: `git worktree add ..\wt-<branch> <branch>`, then `npm ci` and copy `.env.local`.
- `.claude/skills/` is tracked; `.claude/worktrees/`, `.claude/settings.local.json` and `.worktrees/` are ignored.

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-10-09 | Keep the single `@/` alias instead of adding `@features/@shared/@server`. | Already used in 60+ files and configured once per runtime; the path after `@/` names the boundary just as clearly, and lint enforces it. |
| 2026-10-09 | Cross-layer imports inside a feature use `@/features/<own>/…`; at most one `../`. | Deep relative paths hide which layer is imported and break on moves. |
| 2026-10-09 | Boundary lint rules are generated from the `src/features/` folder list. | A new feature is guarded from its first commit without editing the config. |
| 2026-10-09 | `lib/` and `components/` are legacy; features and `server/` may import `@/lib` until it is split. | Splitting `lib/` is its own migration step; blocking it now would stall feature moves. |
| 2026-10-09 | The lead pipeline stays in `server/leads/`, not `features/leads/`. | It is infrastructure shared by six routes with no UI of its own. |
| 2026-10-09 | Repo in `main\` with sibling worktrees. | Worktrees stay outside every tool's scan and out of `git status`. |
