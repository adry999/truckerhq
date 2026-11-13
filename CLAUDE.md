@AGENTS.md

<!-- baza-proiect v1 -->
# Trucker HQ — bază proiect

| | |
|---|---|
| Proiect Claude | Business · Truck Dispatch |
| Repo | adry999/truckerhq |
| Trunk | `main` |
| Folder | `D:\CODE\truckerhq` |

## Ce e
Dispatch cu tarif fix, joburi CDL, angajare șoferi și unelte gratuite pe date FMCSA, pentru owner-operators și flote mici din SUA. Engleză și rusă (`/ru`).

## Stack
Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Supabase, Vitest, Playwright.

## Comenzi
- `npm run dev`: server local
- `npm run lint && npm run typecheck && npm test`: verificări
- `npm run test:e2e`: browser, port 3100
- `npm run check:placeholders`: valori de exemplu rămase în UI

## Deploy și mediu
Domeniu planificat truckerhq.us. Hosting: Hostinger Node.js în spatele Cloudflare. Fără variabile de mediu site-ul merge cu date de exemplu și `noindex`.

## Reguli
- Răspunde și scrie documentația în română, direct și concis.
- Structura `D:\CODE` (vezi `D:\CODE\README.md`): worktree-uri doar în `../wt/<task>`, loguri și output de verificări în `../logs`, materiale client în `../assets`.
- Nu comite `.env*` cu valori reale. Orice variabilă nouă merge și în `.env.example`.
- Cod modular, componente reutilizabile, fără aspect de cod generat de AI.
- Înainte de a raporta „gata”: rulează comenzile de verificare de mai sus.

## Mai mult
- `README.md`, `docs/STATUS.md`
- Unealta internă de leaduri e în `D:\CODE\dispatch-leads`.
