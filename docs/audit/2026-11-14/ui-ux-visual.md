# Audit UI/UX vizual — 2026-11-14

- **Ramură:** `main` @ `d823f14`
- **Metodă:** site rulat local (`next dev`), capturi full-page pe 24 de pagini la 1280 px și 390 px (plus 768 px pe grile), măsurători din DOM (overflow orizontal, padding de secțiune, înălțimi și raze de CTA). Auditul din 2026-10-28 a fost făcut doar din cod; acesta e primul pe randare reală.
- **Limite:** fără schimbări de arhitectură, logică, rute sau date. Doar ierarhie vizuală, layout, spațiere, consistență și lizibilitatea avertizărilor.
- **Stare:** ✅ rezolvat în PR-ul acestui audit · ⏸ lăsat pentru decizie.

## 1. Probleme găsite

### Buguri de layout (mobil)

| # | Unde | Ce se vede | Stare |
|---|---|---|---|
| B1 | `/tools/profit-per-mile` | Pagina derulează 21 px pe orizontală; unitățile din câmpuri („/ gal”, „mpg”) sunt tăiate de marginea cardului | ✅ |
| B2 | `/tools/carrier-lookup/search` | Butonul „Search” iese cu 20 px din caseta de căutare; pagina derulează pe orizontală | ✅ |
| B3 | `/dispatch`, `/pricing` (comparația flat vs. procent) | Valorile „per week” și „per year” sunt lipite: `$800$40,000` | ✅ |

### Ierarhie vizuală

| # | Unde | Ce se vede | Stare |
|---|---|---|---|
| H1 | Profil carrier WARNING / INACTIVE | Motivele („Expires within 30 days”, „No active insurance on file”) apar doar ca note gri de 14 px sub bare. Cel mai vizibil element e banda „Claim your profile” | ✅ |
| H2 | `/jobs/[slug]` pe mobil | Formularul de aplicare, singura conversie a paginii, e la ~2.400 px sub fold, fără ancoră spre el | ✅ |
| H3 | Homepage, 1280 px | H1-ul intră peste fotografie („3” pe imagine, „A.M.” singur pe rând); cipul „Last checked” trece peste marginea panoului | ✅ |
| H4 | `/dispatch`, 1280 px | H1 rupt pe 5 rânduri, cu „NO” singur pe rând | ✅ |
| H5 | `/dispatch` | Comparația „flat vs. procent”, argumentul principal, vine după pachetele de preț | ⏸ |

### Consistență

| # | Unde | Ce se vede | Stare |
|---|---|---|---|
| C1 | Rândurile de pași (home, dispatch, hire drivers, checklist) | Linia punctată continuă după ultimul pas; același markup copiat în 4 feature-uri | ✅ |
| C2 | Perechi de CTA pe mobil | Butoane aliniate la stânga, cu lățimi diferite (174 px lângă 233 px) | ✅ |
| C3 | Carduri de preț `/dispatch` | Titlurile de lungimi diferite decalează prețul, descrierea și lista între carduri | ✅ |
| C4 | Carduri întinse | Benzi goale în cardul verde de pe homepage, în matricea de comparație și în cardul pasului din wizard | ✅ |
| C5 | `/tools` | Grila are o gaură în colțul din dreapta jos | ✅ |
| C6 | Wizard `/dispatch/start` | Opțiunea rămasă singură pe rând e întinsă pe toată lățimea; „Next” mic, aliniat la dreapta pe mobil; etichetele pașilor parcurși stau cu ~4 px mai jos | ✅ |
| C7 | `/jobs` | Filtrele „Job type” sunt cu majuscule, „Equipment” nu | ✅ |
| C8 | Profil carrier, 1280 px | Trei carduri înguste: etichetele și valorile se rup („Vehicle / OOS”, „Sacramento, / CA”) | ✅ |
| C9 | `/carriers/[state]`, `/tools/carrier-lookup` | Cardul „Top cities” centrat îngust și hero-ul de lookup decalat față de marginea containerului | ✅ |
| C10 | Butonul de căutare (home, lookup) | Rază de 4 px și stil inline, față de clasele cu tokeni din rest | ✅ |
| C11 | Benzi de cifre | Patru stiluri diferite (home, hire drivers, pricing, pagini de stat) | ⏸ |
| C12 | Secțiuni FAQ | Coloană îngustă centrată, care rupe marginea stângă a paginii | ⏸ |

### Titlu vs. conținut

| # | Unde | Ce se vede | Stare |
|---|---|---|---|
| T1 | Footer | Coloana „Contact” conține „Guides” și „About us” | ✅ |
| T2 | Homepage, cardul „Dispatch” | Fotografia e o tastatură de gaming | ⏸ |

### Densitate (mobil)

| # | Unde | Ce se vede | Stare |
|---|---|---|---|
| D1 | Homepage, `/about` | Placeholderele de echipă ocupă ~1.500–1.800 px de gri | ✅ compactat · ⏸ ascundere |
| D2 | Homepage, „Latest CDL jobs” | Plata stă lângă taguri sau sub ele, în funcție de lungimea tagurilor | ✅ |
| D3 | Rezultate lookup | Pastila de status întinsă pe tot rândul; DOT/MC ascuns | ✅ |
| D4 | Bara fixă „Get started / Call” | Dublează CTA-urile din hero pe primul ecran | ⏸ |

## 2. Soluții de UX

- **Avertizări (H1):** bloc „Needs attention” deasupra defalcării scorului, afișat doar când scorul total e sub 80. Listează factorii sub 80 % din maxim, cel mai grav primul, cu etichetă text (RISK / WATCH) și bordură colorată. Folosește exact datele din `scoreBreakdown`.
- **Conversie pe mobil (H2):** buton „Apply now” în hero-ul jobului, vizibil sub `lg`, cu ancoră spre formular.
- **CTA-uri (C2):** sub `sm` perechile primar + secundar se stivuiesc pe toată lățimea; de la `sm` rămân în linie.
- **Wizard (C6):** grilă egală pentru opțiuni, „Next” pe toată lățimea pe mobil cu „Back” deasupra, înălțime constantă a antetului între pași.
- **Footer (T1):** telefonul și emailul rămân sub „Contact”; „Guides” și „About us” trec într-un grup „Company”.
- **Pagini de stat (C9):** orașele și blocul de lookup stau alăturat de la `lg`, pe grila containerului.

## 3. UI / styling

| Ce | Cum |
|---|---|
| Pași | `shared/ui/Steps`: fiecare pas își desenează conectorul până la următorul; 3 sau 4 coloane |
| Clase de buton | `buttonClass({ variant, size })` exportat din `shared/ui/Button`, pentru ancore și `CallLink` |
| Perechi de CTA | `shared/ui/ButtonRow`: `flex-col` cu copii `w-full` sub `sm`, rând de la `sm` |
| Grila din calculator (B1) | `grid-cols-1 sm:grid-cols-2`: coloana implicită `auto` se lățea după cel mai lat câmp |
| Căutare (B2) | `min-w-0` pe input, ca să se poată îngusta în formularul flex |
| Comparație (B3) | coloană flexibilă + două coloane `auto` aliniate la dreapta, cu padding în loc de gap |
| Carduri de preț (C3) | `subgrid` pe 7 rânduri: titlu, preț, descriere, listă și CTA aliniate între carduri |
| Carduri întinse (C4) | `md:self-start` sau rânduri distribuite pe înălțime |
| Grila `/tools` (C5) | 6 coloane de la `md`: cardul mare 4×2, două carduri de 2, două de 3 |
| Panouri profil (C8) | `sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2`, etichete `whitespace-nowrap` |
| Culori | tokeni în locul valorilor hex pe liniile atinse (`text-ink-2`, `border-divider`, `bg-surface-muted`) |

## 4. Rămase pentru decizie

1. Mutarea comparației „flat vs. procent” înaintea pachetelor pe `/dispatch` (H5).
2. Un singur stil pentru benzile de cifre (C11).
3. FAQ aliniat la marginea containerului sau păstrat centrat (C12).
4. Fotografia din cardul „Dispatch” de pe homepage (T2).
5. Ascunderea secțiunii de echipă până vin pozele reale (D1).
6. Bara fixă de pe mobil ascunsă cât timp CTA-urile din hero sunt vizibile (D4).
