# Brief pentru studiul de caz: Trucker HQ

> Sursă: codul din acest repo (`truckerhq`), branch `refactor/p1-server-foundations`, 2026-10-09.
> Tot ce nu reiese din cod este marcat `[DE CONFIRMAT: ...]`. Deducțiile sunt marcate `(dedus)`.
>
> **Notă importantă pentru echipă:** la data acestui brief, produsul este **pregătit de lansare, dar încă nelansat**.
> Codul conține intenționat date de probă: prețuri `$XXX`, telefon `(XXX) XXX-XXXX`, transportatori și joburi
> exemplu, nume „Dispatcher Name”, fotografii stock (vezi `README.md`, secțiunea „Placeholders”, și
> `scripts/check-placeholders.mjs`). Studiul de caz nu trebuie publicat cu capturi sau cifre din aceste date.

---

## 0. Identitate

| Câmp | Valoare |
|---|---|
| Nume proiect | Trucker HQ (dovedit din cod: brand, logo, domeniu `truckerhq.com`) |
| Client (companie juridică) | `[DE CONFIRMAT: numele firmei clientului și dacă putem să-l numim public]` |
| Tip | RO: Platformă web pentru transport rutier (dispecerat, joburi, instrumente gratuite) · EN: Web platform for trucking (dispatch, jobs, free tools) |
| Etichete | RO: Platformă web · Generare de clienți · Date FMCSA · SMS · EN / RU · EN: Web platform · Lead generation · FMCSA data · SMS · EN / RU |
| Etichete tehnice (card) | Next.js · Cloud database · SMS · FMCSA API |
| Site live | `https://truckerhq.com` (domeniul din cod) `[DE CONFIRMAT: e live? din ce dată?]` |
| Preview / demo | Proiect Vercel `truckerhq` `[DE CONFIRMAT: URL de preview public; nu există conturi, deci nu e nevoie de cont demo]` |
| Figma | Designul a fost livrat ca prototipuri HTML (`docs/design/*.dc.html`), nu Figma `[DE CONFIRMAT: există și fișier Figma?]` |
| An | 2026 (dovedit: primul commit 2026-09-26) |
| Durată | `[DE CONFIRMAT: durata totală, inclusiv analiză și design; codul arată ~2 săptămâni de implementare, 26.09 – 09.10.2026]` |
| Echipă | `[DE CONFIRMAT: componența echipei; git arată 2 autori]` |

---

## 1. Card (homepage și listă)

**Titlu card**
- RO: Trucker HQ: dispecerat și joburi pentru camioane
- EN: Trucker HQ: truck dispatch and CDL jobs

**Descriere card**
- RO: Platformă web în engleză și rusă prin care transportatorii mici din SUA cer dispecerat la preț fix, găsesc șoferi și își verifică datele FMCSA gratuit.
- EN: An English and Russian web platform where small US carriers request flat-rate dispatch, hire drivers and check their FMCSA records for free.

**Rezultat scurt pentru card**
- Valoare: `[DE CONFIRMAT]` · Etichetă: `[DE CONFIRMAT: ex. cereri de dispecerat pe lună, rata de conversie, poziții în Google]`

---

## 2. Hero

**Titlu complet**
- RO: Am construit pentru Trucker HQ o platformă care aduce clienți serviciului de dispecerat prin instrumente gratuite pentru transportatori.
- EN: We built Trucker HQ a platform that brings in dispatch clients through free tools for truck carriers.

**Lead**
- RO: Șoferii-proprietari și flotele mici din SUA își verifică autorizația, calculează profitul pe milă și găsesc joburi. Când au nevoie de dispecer, cererea ajunge direct la echipă, iar omul primește un SMS de confirmare.
- EN: Owner-operators and small US fleets check their authority, work out profit per mile and find jobs. When they need a dispatcher, the request goes straight to the team and the driver gets a confirmation text.

---

## 3. Fapte

| RO | EN |
|---|---|
| Client: `[DE CONFIRMAT]` | Client: `[DE CONFIRMAT]` |
| Tip: Platformă web de generare a clienților | Type: Lead generation web platform |
| Module: Dispecerat, Joburi CDL, Angajare șoferi, 4 instrumente gratuite, Ghiduri | Modules: Dispatch, CDL jobs, Driver hiring, 4 free tools, Guides |
| Limbi: engleză, rusă | Languages: English, Russian |

---

## 4. S: Situație

**RO**

Trucker HQ oferă dispecerat pentru șoferi-proprietari (owner-operators) și flote mici din SUA, mulți dintre ei vorbitori de rusă (dedus din conținut și limbi). Piața de dispecerat lucrează de obicei cu procent: 8–10% din fiecare cursă. Trucker HQ voia să vină cu un preț fix pe săptămână, dar un model nou trebuie explicat și dovedit, iar clienții potriviți trebuie mai întâi găsiți. `[DE CONFIRMAT: cum găsea clientul clienți înainte: telefon, recomandări, grupuri, reclame?]`

Transportatorii mici au nevoi zilnice care nu țin de dispecer: își verifică autorizația și asigurarea în FMCSA, socotesc dacă o cursă merită, caută șoferi sau un loc de muncă. Informația există, dar e împrăștiată, tehnică și doar în engleză (dedus). Fără un loc unde acești oameni vin singuri, fiecare client nou costa timp de vânzare și reclamă plătită. `[DE CONFIRMAT: unde se pierdeau concret timp, bani sau clienți]`

**EN**

Trucker HQ provides dispatch for owner-operators and small US fleets, many of whom speak Russian (inferred from content and languages). Dispatch is usually sold as a percentage: 8–10% of every load. Trucker HQ wanted to offer a flat weekly price, but a new model has to be explained and proven, and the right carriers have to be found first. `[TO CONFIRM: how did the client find customers before: phone, referrals, groups, ads?]`

Small carriers have daily needs that have nothing to do with a dispatcher: checking their authority and insurance in FMCSA, working out whether a load pays, finding drivers or a job. The information exists, but it is scattered, technical and English-only (inferred). Without a place these people come to on their own, every new client cost sales time and paid ads. `[TO CONFIRM: where exactly time, money or clients were lost]`

**Cât costa problema** (doar întrebări)
- `[DE CONFIRMAT: câte cereri de dispecerat primea clientul pe lună înainte de site?]`
- `[DE CONFIRMAT: cât costa un client nou din reclame sau din timpul echipei de vânzări?]`
- `[DE CONFIRMAT: cât timp petrecea un dispecer la telefon cu oameni care nu erau clienți potriviți?]`
- `[DE CONFIRMAT: ce procent din clienți vorbesc rusă?]`

---

## 5. T: Sarcină

**Obiectiv**
- RO: Să găsim împreună cu clientul o soluție care aduce transportatori mici pe site prin instrumente cu adevărat utile, astfel încât cei care au nevoie de dispecer să lase o cerere completă, fără un apel de calificare.
- EN: To work out with the client a way to bring small carriers to the site through genuinely useful tools, so that those who need a dispatcher leave a complete request without a qualifying call.

**Constrângeri**

| RO | EN |
|---|---|
| **Date publice, dar sensibile:** un număr DOT sau MC poate identifica o persoană fizică. Aceste numere nu ajung niciodată în platformele de reclamă, iar formularele salvează date fără să le poată citi înapoi din browser. | **Public but sensitive data:** a DOT or MC number can identify a sole proprietor. These numbers never reach ad platforms, and the forms save data but can never read it back from the browser. |
| **SMS reglementat în SUA:** mesajele cer consimțământ explicit, opțiunea STOP și pagină de termeni SMS. Am limitat și trimiterile, ca nimeni să nu poată folosi formularele pentru a trimite SMS-uri pe banii clientului. | **Regulated SMS in the US:** texts need explicit consent, a STOP option and an SMS terms page. We also capped sends so nobody can use the forms to send texts at the client's expense. |
| **Două limbi, nu o traducere:** publicul vorbește engleză și rusă. Paginile principale există în ambele limbi, cu fonturi pentru chirilică și semnale corecte pentru Google. | **Two languages, not a translation:** the audience speaks English and Russian. The main pages exist in both, with Cyrillic fonts and correct signals for Google. |
| **Utilizatori pe telefon, în cabină:** formulare scurte, butoane mari, fără cont și fără parolă. | **Users on a phone, in a cab:** short forms, large buttons, no account and no password. |
| **Date dintr-un sistem terț:** registrul federal FMCSA nu publică o schemă a răspunsului. Am adaptat datele lui la modelul nostru și am construit un scor propriu de sănătate a transportatorului. | **Data from a third-party system:** the federal FMCSA registry publishes no response schema. We mapped its data to our own model and built our own carrier health score. |
| **Lansare înainte de toate datele reale:** prețuri, telefon și fotografii vin de la client mai târziu. Am construit site-ul să funcționeze cu date de probă și o verificare automată care oprește lansarea cât timp ele mai există. | **Launch before all real data exists:** prices, phone and photos come from the client later. We built the site to run on sample data, with an automated check that blocks launch while any remain. |
| Termen: `[DE CONFIRMAT]` · Buget: `[DE CONFIRMAT]` | Deadline: `[TO CONFIRM]` · Budget: `[TO CONFIRM]` |

---

## 6. A: Acțiune

**RO**

Am pornit de la oamenii care vor folosi site-ul: șoferul-proprietar cu un camion, flota de 3–10 camioane, transportatorul cu autorizație nouă (MC sub 6 luni), șoferul CDL care caută loc de muncă și firma care angajează. Pentru fiecare am stabilit ce caută, ce date ne dă și unde ajung acestea: cererea de dispecerat la dispeceri, aplicația la recrutori, înscrierea la alerte în baza de date pentru verificări zilnice. Designul a fost livrat ca prototipuri interactive pentru fiecare ecran, cu un plan SEO, un plan de reclame și o listă de conținut pe care clientul o completează. `[DE CONFIRMAT: câte sesiuni de analiză cu clientul, dacă a existat un document de cerințe formal]`

Apoi am construit platforma urmând drumul utilizatorului. Omul ajunge din Google pe pagina statului sau a orașului lui, ori pe un instrument gratuit. Își verifică transportatorul după DOT sau MC, calculează profitul unei curse sau parcurge lista pentru primele 6 luni de autorizație. Din fiecare instrument există un pas natural spre dispecerat: un formular în 4 pași care strânge exact ce întreabă un dispecer la primul apel. Cererea se salvează în baza de date, iar omul primește imediat un SMS de confirmare.

**EN**

We started from the people who would use the site: the owner-operator with one truck, the fleet with 3–10 trucks, the carrier with a new authority (MC under 6 months), the CDL driver looking for work and the company hiring. For each we worked out what they look for, what data they give us and where it goes: dispatch requests to dispatchers, applications to recruiters, alert sign-ups to the database for daily checks. The design was delivered as interactive prototypes for every screen, with an SEO plan, an ads plan and a content checklist for the client to fill in. `[TO CONFIRM: number of analysis sessions with the client, whether there was a formal requirements document]`

Then we built the platform along the user's path. A carrier lands from Google on their state or city page, or on a free tool. They check a carrier by DOT or MC, work out the profit on a load, or go through the checklist for the first 6 months of authority. Every tool has a natural next step into dispatch: a 4-step form that collects exactly what a dispatcher asks on the first call. The request is saved to the database, and the carrier gets a confirmation text right away.

**Business: decizii**

| RO | EN |
|---|---|
| Am arătat prețul fix lângă un calculator care compară costul cu un dispecer de 8% și 10%, ca omul să-și vadă singur economia pe săptămână și pe an. | We put the flat price next to a calculator comparing it to an 8% and a 10% dispatcher, so carriers see their own weekly and yearly saving. |
| Am făcut instrumentele gratuite și fără înregistrare, ca să aducă trafic din căutări și încredere înainte de orice vânzare. | We made the tools free with no sign-up, to bring search traffic and build trust before any sale. |
| Am separat pachetele după etapa transportatorului: MC nou, 1–3 camioane, flotă, plus site și profil Google ca serviciu separat. | We split the packages by the carrier's stage: new MC, 1–3 trucks, fleet, plus a website and Google profile as a separate service. |
| Am ascuns din Google paginile subțiri (orașe cu sub 5 joburi, profiluri de transportator) ca site-ul să nu fie penalizat pentru conținut duplicat. | We kept thin pages (cities with under 5 jobs, carrier profiles) out of Google so the site is not penalised for duplicate content. |
| Am amânat panoul pentru transportatori cu cont până după lansare; întâi validăm cererea cu formulare simple. | We postponed the carrier panel with accounts until after launch; first we validate demand with simple forms. |

**Tehnic: capabilități**

| Nume | Rol (RO) | Role (EN) | Tehnologie (intern) |
|---|---|---|---|
| Web app | Site rapid, gata pentru Google, în engleză și rusă, cu pagini generate pentru fiecare stat, oraș, job și ghid. | A fast, search-ready site in English and Russian, with pages generated for every state, city, job and guide. | Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Vercel |
| Cloud database | Păstrează în siguranță fiecare cerere: dispecerat, aplicații, angajări, contact, alerte, revendicări de profil. | Safely stores every request: dispatch, applications, hiring, contact, alerts, profile claims. | Supabase (Postgres), RLS doar cu drept de inserare |
| Government data integration | Caută transportatori în registrul federal FMCSA după DOT, MC sau nume și calculează un scor de sănătate. | Looks up carriers in the federal FMCSA registry by DOT, MC or name and computes a health score. | FMCSA QCMobile API, cache 1 oră |
| SMS gateway | Trimite confirmări imediate după cerere, cu consimțământ și protecție împotriva abuzului. | Sends instant confirmations after a request, with consent and abuse protection. | Twilio REST API, limitare per număr și globală |
| Analytics & ads tracking | Măsoară ce pagini și instrumente aduc cereri, cu acord pentru cookie-uri și fără date personale trimise la reclame. | Measures which pages and tools bring requests, with cookie consent and no personal data sent to ad platforms. | GA4, Meta Pixel, banner de consimțământ, Global Privacy Control |
| Search visibility | Date structurate, imagini de distribuire și hartă a site-ului pentru fiecare tip de pagină. | Structured data, share images and a sitemap for every page type. | JSON-LD (JobPosting, FAQPage, Organization etc.), `opengraph-image`, hreflang |

---

## 7. Funcționalități

Nu există conturi de utilizator. Toate funcțiile sunt publice; rolurile de mai jos sunt **tipuri de vizitatori**. Echipa clientului citește cererile direct în baza de date (dedus; nu există panou de administrare în cod).

**Dispecerat** (transportator / owner-operator)
- Pagina de dispecerat: vede ce face un dispecer, cele 4 pachete cu preț săptămânal fix, pașii de pornire și întrebări frecvente. (EN + RU)
- Calculator „preț fix vs. procent”: introduce venitul brut săptămânal și vede cât ar plăti unui dispecer de 8% sau 10%, pe săptămână și pe an.
- Formular de pornire în 4 pași: tip de remorcă, număr de camioane, tip de șofer, bază, rute preferate, timp acasă, autorizație și MC, nume, telefon, ora potrivită pentru apel, limbă. Primește SMS de confirmare.

**Joburi CDL** (șofer)
- Listă de joburi cu căutare și filtre (OTR, regional, local, echipă, owner-operator). (EN + RU)
- Pagini de oraș (11 orașe) cu joburile din zonă și filtre pe tip.
- Pagina jobului și aplicare rapidă: nume, telefon, categorie CDL, experiență, limbă. Primește SMS de confirmare.

**Angajare șoferi** (firmă de transport)
- Pagina de angajare cu procesul de selecție (CDL, istoric de conducere, experiență, Clearinghouse).
- Formular de publicare a postului: companie, DOT, persoană de contact, plată, bază, poziție, echipament, limba șoferului.

**Instrumente gratuite** (oricine)
- Carrier Lookup: caută un transportator după DOT, MC sau nume în datele FMCSA și vede statusul, asigurarea, inspecțiile, rata de oprire din circulație, accidentele și un scor de sănătate 0–100.
- Profil de transportator: detaliile complete plus pași recomandați după situație (ex. „autorizație inactivă”, „MC nou”).
- Calculator de profit pe milă: introduce tariful, milele, combustibilul, costurile fixe și vede profitul pe milă cu verdict („cursă bună”, „marjă mică”, „pierdere”).
- Alerte de conformitate: introduce DOT și telefon, alege ce urmărește (autorizație, asigurare, UCR, BOC-3, oprire din circulație, inspecții) și limba SMS-ului. Necesită consimțământ SMS.
- Lista pentru MC nou: etapele primelor 6 luni de autorizație, cu progresul salvat în browser.

**Director de transportatori** (oricine)
- Pagina fiecărui stat: transportatori din stat, filtre pe echipament, statistici.

**Revendicare profil** (proprietar de transportator)
- Formular în 3 pași: alege metoda de verificare, completează echipamentul, rutele și ce vrea să arate (vorbim rusă, angajăm, căutăm clienți direcți). `[DE CONFIRMAT: verificarea prin cod nu e încă implementată pe server]`

**Conținut și încredere**
- Ghiduri pe categorii (tarife, brokeri, acte, bani, început de drum), cu filtru.
- Pagina „Despre” cu formular de contact.
- Politică de confidențialitate, termeni, termeni SMS. `[DE CONFIRMAT: textul final scris de avocat]`
- Banner de cookie-uri care respectă Global Privacy Control.

---

## 8. R: Rezultat

**RO**

Clientul are acum un singur loc unde transportatorii mici vin singuri: din căutări după numele statului, al orașului sau după numărul DOT. Fiecare cerere ajunge completă și structurată, cu echipamentul, rutele și ora potrivită pentru apel, deci dispecerul începe conversația știind deja cu cine vorbește (dedus). Omul primește confirmarea pe loc, iar echipa vede din analytics ce pagini și instrumente aduc clienți. Vorbitorii de rusă găsesc serviciul în limba lor. `[DE CONFIRMAT: cifre reale după lansare]`

După lansare, oferim 6 luni de mentenanță: corectăm erorile și rezolvăm situațiile neprevăzute care apar doar cu trafic real, de la abuz pe formulare la schimbări în datele FMCSA.

**EN**

The client now has one place small carriers come to on their own: from searches for their state, their city or their DOT number. Every request arrives complete and structured, with equipment, lanes and the best time to call, so the dispatcher starts the conversation already knowing who they are talking to (inferred). The carrier gets a confirmation on the spot, and the team sees in analytics which pages and tools bring in clients. Russian speakers find the service in their own language. `[TO CONFIRM: real figures after launch]`

After launch we provide 6 months of maintenance: we fix bugs and handle the unexpected situations that only show up with real traffic, from form abuse to changes in FMCSA data.

**Câștig (+)**
- `[DE CONFIRMAT: cereri de dispecerat pe lună după lansare]`
- `[DE CONFIRMAT: vizitatori organici pe lună / poziții în Google pentru „truck dispatch”, „carrier lookup”]`
- `[DE CONFIRMAT: rata de conversie de la instrument la cerere]`
- `[DE CONFIRMAT: aplicații la joburi pe lună]`

**Economii (−)**
- `[DE CONFIRMAT: reducerea costului per client din reclame]`
- `[DE CONFIRMAT: timp economisit pe apelurile de calificare]`

---

## 9. Feedback client (întrebări)

1. Cum ați ajuns la Codepedia?
2. Cum a arătat începutul: ce știați sigur că vreți și ce era încă neclar?
3. Cum ați trăit etapa de analiză și prototipurile? A schimbat ceva în ce ați cerut inițial?
4. Cum a fost să lucrați cot la cot cu echipa? Un moment anume?
5. Ce s-a schimbat în munca dispecerilor de când primesc cererile prin site?
6. Ce i-ați spune unui alt proprietar de firmă care se gândește să lucreze cu noi?

Plus: nume, funcție, companie, acord de publicare a numelui și fotografiei.

---

## 10. Capturi de ecran (ordinea pentru galerie)

Toate ecranele de mai jos conțin acum **date de probă** (prețuri `$XXX`, telefon `XXX`, transportatori și joburi inventate). Capturile se fac după lansare, cu date reale aprobate, sau cu date demo curate.

1. `/` Homepage: hero cu căutare de transportator, dispecerat, instrumente.
2. `/dispatch` Pachetele cu preț fix și calculatorul „fix vs. procent”.
3. `/dispatch/start` Formularul în 4 pași, cu sumarul lateral (mobil).
4. `/tools/carrier-lookup?q=...` Rezultatele căutării cu scorul de sănătate. ⚠ date FMCSA reale ale unor firme reale: folosiți un DOT cu acordul proprietarului sau date demo.
5. `/tools/carrier-lookup/[slug]` Profilul de transportator. ⚠ același risc.
6. `/tools/profit-per-mile` Calculatorul cu verdict.
7. `/tools/compliance-alerts` Formularul și exemplul de SMS. ⚠ nu arătați un telefon real.
8. `/jobs/chicago-il` Pagină de oraș cu joburi.
9. `/ru` sau `/ru/dispatch` Versiunea în rusă.
10. `/carriers/texas` Pagina unui stat.
11. Varianta mobilă la 390px pentru 1, 3 și 6.

---

## 11. Întrebări deschise

**Pentru client**
- Numele firmei și acordul de a fi numită public.
- Data lansării și URL-ul live.
- Cum găseau clienți înainte și unde se pierdea timp sau bani.
- Prețurile reale ale pachetelor (acum `$XXX`).
- Cifre înainte/după: cereri de dispecerat, cost per client, trafic organic, conversie, aplicații la joburi.
- Ce procent din clienți vorbesc rusă.
- Citat, nume, funcție, fotografie.
- Acord pentru capturi cu date reale.

**Pentru echipă**
- Durata totală a proiectului (analiză + design + cod) și componența echipei.
- Câte sesiuni de analiză au fost; există document de cerințe formal?
- Există fișier Figma sau doar prototipurile HTML?
- URL de preview public.
- Statusul verificării prin cod la revendicarea profilului și al jobului zilnic pentru alerte FMCSA (amândouă par neimplementate pe server).
- Textele legale finale sunt scrise de avocat?
- Mentenanța de 6 luni: confirmați că se aplică acestui contract.

---

## 12. Note tehnice interne (nu se publică)

**Stack**
- Next.js 16.3 (App Router, Server Components, `after()` pentru SMS după răspuns), React 19.2, TypeScript, Tailwind CSS 4.
- Zod 4 (validare, în curs de introducere), Vitest 5 + Testing Library, Playwright pentru E2E.
- CI pe GitHub Actions: lint, typecheck, teste, verificare placeholder-e, build.

**Integrări externe**
- **Supabase** (Postgres): tabele `dispatch_requests`, `job_applications`, `hire_driver_requests`, `contact_messages`, `compliance_alert_signups`, `claims`. Scriere prin PostgREST cu cheia anon; RLS permite doar `insert`, deci site-ul nu poate citi lead-urile înapoi.
- **FMCSA QCMobile API**: căutare după DOT, docket/MC și nume; fallback pe date de probă fără cheie.
- **Twilio**: SMS de confirmare pentru dispecerat, aplicare, alerte.
- **Resend**: wrapper de email pregătit, fără apelant încă.
- **GA4 + Meta Pixel**: încărcate doar cu consimțământ; evenimentele de lead mapate pe `Lead` din Meta; DOT/MC/telefon/nume blocate.

**Hosting**: Vercel (proiect `truckerhq`), Node.js 24 în CI.

**Arhitectură pe scurt**
- Site majoritar static (131 pagini generate la build, conform auditului din 2026-10-09), insule client doar pentru calculatoare, formulare și wizard-uri.
- Grup de rute `(en)` + prefix `/ru`; hreflang în pagini și sitemap.
- 6 rute API pentru lead-uri, toate prin `guardLeadRoute`: verificare Origin, limită de mărime, rate limit pe IP, honeypot, normalizare telefon în E.164.
- `src/server/` separat cu `server-only` (db, http, messaging); în curs de refactor spre module pe feature (vezi `docs/audit/2026-10-09-codebase-audit.md`).

**Lucruri dificile rezolvate (dovadă de expertiză)**
- Normalizarea răspunsurilor FMCSA fără schemă publicată, într-un model unic, plus un scor de sănătate propriu (autoritate 30, asigurare 25, inspecții 30, accidente 15, plafonat la rating „Conditional”/„Unsatisfactory”).
- Protecție împotriva SMS pumping: limită de 1 SMS / număr / 10 min și 30 / oră global, plus consimțământ obligatoriu pentru alerte.
- Analytics conștient de confidențialitate: Global Privacy Control respectat, date care pot identifica un transportator persoană fizică nu ajung la Meta.
- SEO la scară: pagini pe stat și oraș generate din date, JSON-LD (JobPosting, FAQPage, Organization, BreadcrumbList), imagini OG per tip de pagină inclusiv în rusă, `noindex` automat pentru pagini subțiri.
- Headere de securitate (HSTS, X-Frame-Options, CSP în report-only).
- Verificare automată în CI care blochează lansarea cât timp există placeholder-e.

**Limitări cunoscute (de știut înainte de a promite ceva public)**
- Rate limit-ul și limita SMS sunt în memorie, per instanță.
- Joburile, transportatorii pe state și orașe sunt deocamdată date de probă.
- Alertele FMCSA salvează înscrierea, dar jobul zilnic care compară datele nu există încă în cod.
- Revendicarea profilului nu verifică încă codul pe server.
- Paginile de eroare și 404 în rusă afișează textul în engleză.
