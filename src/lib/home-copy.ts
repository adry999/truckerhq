import { JOBS as REAL_JOBS } from "@/lib/data";

export type HomeJobRow = {
  title: string;
  company: string;
  loc: string;
  type: string;
  equip: string;
  pay: string;
  posted: string;
  href: string;
};

export type HomeCopy = {
  eyebrow: string;
  h1: string;
  heroBody: string;
  searchAriaLabel: string;
  searchPlaceholder: string;
  searchButton: string;
  heroImageAlt: string;
  lastCheckedLabel: string;
  carrierStatusLine: string;
  facts: { k: string; v: string }[];
  dispatchHeading: string;
  dispatchCardTitle: string;
  dispatchCardBody: string;
  dispatchItems: string[];
  dispatchCardCtaHref: string;
  dispatchCardCtaLabel: string;
  smallServices: { title: string; href: string; cta: string; line: string }[];
  toolsFreeBadge: string;
  toolsEyebrowLabel: string;
  toolsHeading: string;
  allToolsLabel: string;
  tools: { name: string; href: string; desc: string; hasScore: boolean }[];
  toolOpenLabel: string;
  stepsHeading: string;
  steps: { n: string; title: string; desc: string }[];
  pricingEyebrow: string;
  pricingHeadingLine1: string;
  pricingHeadingLine2: string;
  pricingUnit: string;
  pricingBody: string;
  pricingCtaHref: string;
  pricingCtaLabel: string;
  callLabel: string;
  exampleEyebrow: string;
  example10Label: string;
  example8Label: string;
  exampleFooter: string;
  latestJobsHeading: string;
  seeAllJobsHref: string;
  seeAllJobsLabel: string;
  jobs: HomeJobRow[];
  teamHeading: string;
  teamBody: string;
  team: { name: string; role: string; note: string }[];
  quotesHeading: string;
  quotes: { text: string; name: string; role: string; lang: string }[];
  quoteOpen: string;
  quoteClose: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
};

// RU homepage historically showed a separate hand-written set of job cards
// (not the real JOBS data) with translated titles; best-effort matched to a
// real job slug by company name so the cards link somewhere real.
function ruJobSlugFor(company: string): string {
  const hit = REAL_JOBS.find((j) => j.company.startsWith(company));
  return hit ? `/jobs/${hit.slug}` : "/ru/jobs";
}

const RU_JOBS_RAW = [
  { title: "Водитель OTR в компанию", co: "Carpathian Freight", loc: "Des Plaines, IL", type: "OTR", equip: "DRY VAN", pay: "$0.68–0.72/mi", posted: "Сегодня" },
  { title: "Региональный водитель, дома каждую неделю", co: "Volga Line Transport", loc: "Jacksonville, FL", type: "REGIONAL", equip: "REEFER", pay: "$1,800/wk", posted: "Сегодня" },
  { title: "Командные водители", co: "Iron Horse Hauling", loc: "Phoenix, AZ", type: "OTR", equip: "DRY VAN", pay: "$0.90/ми на двоих", posted: "1 день назад" },
  { title: "Локальный водитель, flatbed", co: "Danube Road Corp", loc: "Charlotte, NC", type: "LOCAL", equip: "FLATBED", pay: "$28/hr", posted: "2 дня назад" },
  { title: "Lease purchase, owner-operator", co: "Moldova Express", loc: "Sacramento, CA", type: "OTR", equip: "REEFER", pay: "88% от груза", posted: "3 дня назад" },
];

export const HOME_COPY: Record<"EN" | "RU", HomeCopy> = {
  EN: {
    eyebrow: "Dispatch · CDL jobs · Free carrier tools",
    h1: "Dispatch that picks up at 3 a.m.",
    heroBody:
      "Flat weekly rate, never a percentage. English and Russian-speaking dispatchers on every US time zone. CDL jobs and free carrier checks on the same site.",
    searchAriaLabel: "Search carriers",
    searchPlaceholder: "Check a broker or carrier: DOT, MC or name",
    searchButton: "Check",
    heroImageAlt: "One of Trucker HQ's trucks on the road",
    lastCheckedLabel: "Last checked 2 min ago",
    carrierStatusLine: "DOT 3412897 · Authorized · Insured",
    facts: [
      { k: "In business since", v: "20XX · City, ST" },
      { k: "Dispatch line, 24/7", v: "(XXX) XXX-XXXX" },
      { k: "We speak", v: "English · Русский" },
      { k: "Office hours", v: "Mon–Sun, all US time zones" },
    ],
    dispatchHeading: "Dispatch, jobs and hiring",
    dispatchCardTitle: "Dispatch",
    dispatchCardBody: "One flat price a week. You keep everything you haul above it.",
    dispatchItems: [
      "Loads booked day and night",
      "Rate negotiation on every load",
      "Broker checked before you say yes",
      "Rate cons, invoices, factoring",
      "Fuel card discounts",
      "Your website and Google profile",
    ],
    dispatchCardCtaHref: "/dispatch",
    dispatchCardCtaLabel: "Start dispatch",
    smallServices: [
      {
        title: "Driver jobs",
        href: "/jobs",
        cta: "Browse jobs",
        line: "Pay and home time are posted on every job. Apply in English or Russian and a person calls you back.",
      },
      {
        title: "Hire drivers",
        href: "/hire-drivers",
        cta: "Hire drivers",
        line: "Post a job. We check CDL, MVR and experience before a driver reaches you.",
      },
    ],
    toolsFreeBadge: "FREE",
    toolsEyebrowLabel: "TRUCKER HQ TOOLS",
    toolsHeading: "Free tools. No sign-up.",
    allToolsLabel: "All tools →",
    tools: [
      {
        name: "Carrier Lookup",
        href: "/tools/carrier-lookup",
        desc: "Search by DOT or MC. Authority, insurance, safety and a Health Score.",
        hasScore: true,
      },
      {
        name: "Profit per Mile",
        href: "/tools/profit-per-mile",
        desc: "Fuel, insurance, truck payment. See what a load really pays.",
        hasScore: false,
      },
      {
        name: "Compliance Alerts",
        href: "/tools/compliance-alerts",
        desc: "Get a text before your insurance, UCR or authority status changes.",
        hasScore: false,
      },
      {
        name: "New MC Checklist",
        href: "/tools/new-mc-checklist",
        desc: "Every step for your first 6 months, from BOC-3 to first load.",
        hasScore: false,
      },
    ],
    toolOpenLabel: "Open →",
    stepsHeading: "How dispatch works",
    steps: [
      { n: "1", title: "Call or sign up", desc: "Tell us your truck, your lanes and when you want to be home. Ten minutes on the phone." },
      { n: "2", title: "We book the loads", desc: "We search the boards, check every broker and push for the best rate. You say yes or no." },
      { n: "3", title: "You drive", desc: "Rate cons, invoices, factoring paperwork. We handle it so you can focus on the road." },
    ],
    pricingEyebrow: "DISPATCH PRICING",
    pricingHeadingLine1: "One flat price.",
    pricingHeadingLine2: "No percentage.",
    pricingUnit: "/ week per truck",
    pricingBody:
      "Includes a dispatcher on your time zone, rate negotiation on every load, broker checks, fuel card discounts, invoicing, and your own website and Google profile.",
    pricingCtaHref: "/dispatch",
    pricingCtaLabel: "Start dispatch",
    callLabel: "Call us 24/7",
    exampleEyebrow: "EXAMPLE · $8,000 GROSS A WEEK",
    example10Label: "10% dispatcher",
    example8Label: "8% dispatcher",
    exampleFooter: "Good week or bad week, the price stays the same. The more you haul, the more you keep.",
    latestJobsHeading: "Latest CDL jobs",
    seeAllJobsHref: "/jobs",
    seeAllJobsLabel: "See all jobs →",
    jobs: REAL_JOBS.map((j) => ({
      title: j.title,
      company: j.company,
      loc: j.loc,
      type: j.type,
      equip: j.equipment.toUpperCase(),
      pay: j.pay,
      posted: j.posted,
      href: `/jobs/${j.slug}`,
    })),
    teamHeading: "The people who answer the phone",
    teamBody: "You get one dispatcher who learns your truck, your lanes and when you need to be home.",
    team: [
      { name: "Dispatcher Name", role: "Dispatcher · Dry van, reefer", note: "EN · RU · Nights, Central time" },
      { name: "Dispatcher Name", role: "Dispatcher · Flatbed", note: "EN · RU · Days, Eastern time" },
      { name: "Dispatcher Name", role: "New MC onboarding", note: "EN · RU · Days, Pacific time" },
    ],
    quotesHeading: "From the drivers",
    quotes: [
      {
        text: "Same price every week. Last month I ran hard and kept all of it. With my old dispatcher that was $700 gone.",
        name: "Ion R.",
        role: "Owner-operator, 2 trucks · IL",
        lang: "RU",
      },
      {
        text: "My MC was 3 months old and nobody wanted me. They found brokers that work with new carriers and got me moving.",
        name: "Sergei M.",
        role: "New carrier · FL",
        lang: "RU",
      },
      {
        text: "I check every broker in Carrier Lookup before I say yes. Takes ten seconds from the cab.",
        name: "Mike D.",
        role: "Owner-operator · TX",
        lang: "EN",
      },
    ],
    quoteOpen: "“",
    quoteClose: "”",
    faqHeading: "Questions",
    faq: [
      {
        q: "How is a flat weekly rate better than a percentage?",
        a: "A percentage dispatcher earns more when you haul more. We charge the same every week, so the extra money from a good week stays with you.",
      },
      { q: "Do I need to sign a long contract?", a: "No. Dispatch is week to week. Stop any time with one week notice." },
      {
        q: "I just got my MC. Can you work with me?",
        a: "Yes. We help new authorities from day one: broker setup packets, the New MC Checklist, and lanes that accept new carriers.",
      },
      { q: "Can I talk to someone in Russian?", a: "Yes. Our dispatchers speak English and Russian, 24/7 on every US time zone." },
      {
        q: "Where does the Carrier Lookup data come from?",
        a: "Public FMCSA records: authority, insurance, inspections and crash history. The Health Score sums it up from 0 to 100.",
      },
    ],
  },
  RU: {
    eyebrow: "Диспетчинг · Работа CDL · Бесплатные инструменты",
    h1: "Диспетчер, который ответит в 3 часа ночи",
    heroBody:
      "Фиксированная цена в неделю, никаких процентов. Диспетчеры говорят по-английски и по-русски, во всех часовых поясах США. Работа для водителей CDL и бесплатная проверка перевозчиков на одном сайте.",
    searchAriaLabel: "Поиск перевозчиков",
    searchPlaceholder: "Проверить брокера или перевозчика: DOT, MC или название",
    searchButton: "Проверить",
    heroImageAlt: "Один из траков Trucker HQ на дороге",
    lastCheckedLabel: "Проверен 2 мин назад",
    carrierStatusLine: "DOT 3412897 · Лицензия активна · Застрахован",
    facts: [
      { k: "Работаем с", v: "20XX · City, ST" },
      { k: "Диспетчерская, 24/7", v: "(XXX) XXX-XXXX" },
      { k: "Говорим на", v: "English · Русский" },
      { k: "Часы работы", v: "Пн–Вс, все пояса США" },
    ],
    dispatchHeading: "Диспетчинг, работа и найм",
    dispatchCardTitle: "Диспетчинг",
    dispatchCardBody: "Одна фиксированная цена в неделю. Всё, что заработаете сверх неё, остаётся вам.",
    dispatchItems: [
      "Грузы днём и ночью",
      "Торг за каждый груз",
      "Брокер проверен до вашего «да»",
      "Rate con, инвойсы, факторинг",
      "Скидки по топливной карте",
      "Ваш сайт и профиль в Google",
    ],
    dispatchCardCtaHref: "/dispatch/start",
    dispatchCardCtaLabel: "Начать работу",
    smallServices: [
      {
        title: "Работа водителям",
        href: "/ru/jobs",
        cta: "Смотреть вакансии",
        line: "В каждой вакансии указаны оплата и время дома. Откликайтесь по-русски или по-английски, вам перезвонит человек.",
      },
      {
        title: "Найм водителей",
        href: "/hire-drivers",
        cta: "Найти водителя",
        line: "Разместите вакансию. Мы проверим CDL, MVR и опыт, прежде чем водитель придёт к вам.",
      },
    ],
    toolsFreeBadge: "БЕСПЛАТНО",
    toolsEyebrowLabel: "ИНСТРУМЕНТЫ TRUCKER HQ",
    toolsHeading: "Бесплатные инструменты. Без регистрации.",
    allToolsLabel: "Все инструменты →",
    tools: [
      {
        name: "Carrier Lookup",
        href: "/tools/carrier-lookup",
        desc: "Поиск по DOT или MC. Лицензия, страховка, безопасность и Health Score.",
        hasScore: true,
      },
      {
        name: "Прибыль за милю",
        href: "/tools/profit-per-mile",
        desc: "Топливо, страховка, платёж за трак. Сколько на самом деле платит груз.",
        hasScore: false,
      },
      {
        name: "Compliance Alerts",
        href: "/tools/compliance-alerts",
        desc: "SMS, если меняется статус страховки, UCR или лицензии.",
        hasScore: false,
      },
      {
        name: "Чек-лист нового MC",
        href: "/tools/new-mc-checklist",
        desc: "Все шаги первых 6 месяцев, от BOC-3 до первого груза.",
        hasScore: false,
      },
    ],
    toolOpenLabel: "Открыть →",
    stepsHeading: "Как работает диспетчинг",
    steps: [
      { n: "1", title: "Позвоните или оставьте заявку", desc: "Расскажите про трак, направления и когда хотите быть дома. Десять минут по телефону." },
      { n: "2", title: "Мы находим грузы", desc: "Ищем на бордах, проверяем каждого брокера и торгуемся за лучшую цену. Решаете вы." },
      { n: "3", title: "Вы едете", desc: "Rate con, инвойсы, бумаги для факторинга берём на себя. Вам остаётся дорога." },
    ],
    pricingEyebrow: "ЦЕНА ДИСПЕТЧИНГА",
    pricingHeadingLine1: "Одна цена.",
    pricingHeadingLine2: "Никаких процентов.",
    pricingUnit: "/ неделя за трак",
    pricingBody:
      "Включено: диспетчер в вашем часовом поясе, торг за каждый груз, проверка брокеров, скидки по топливной карте, выставление счетов, ваш сайт и профиль в Google.",
    pricingCtaHref: "/dispatch/start",
    pricingCtaLabel: "Начать работу",
    callLabel: "Звоните 24/7",
    exampleEyebrow: "ПРИМЕР · $8 000 GROSS В НЕДЕЛЮ",
    example10Label: "Диспетчер за 10%",
    example8Label: "Диспетчер за 8%",
    exampleFooter: "Хорошая неделя или плохая, цена не меняется. Чем больше возите, тем больше остаётся вам.",
    latestJobsHeading: "Свежие вакансии CDL",
    seeAllJobsHref: "/ru/jobs",
    seeAllJobsLabel: "Все вакансии →",
    jobs: RU_JOBS_RAW.map((j) => ({
      title: j.title,
      company: j.co,
      loc: j.loc,
      type: j.type,
      equip: j.equip,
      pay: j.pay,
      posted: j.posted,
      href: ruJobSlugFor(j.co),
    })),
    teamHeading: "Люди, которые берут трубку",
    teamBody: "У вас один диспетчер, который знает ваш трак, ваши направления и когда вам нужно быть дома.",
    team: [
      { name: "Dispatcher Name", role: "Диспетчер · Dry van, reefer", note: "EN · RU · Ночи, Central" },
      { name: "Dispatcher Name", role: "Диспетчер · Flatbed", note: "EN · RU · Дни, Eastern" },
      { name: "Dispatcher Name", role: "Старт нового MC", note: "EN · RU · Дни, Pacific" },
    ],
    quotesHeading: "Отзывы водителей",
    quotes: [
      {
        text: "Одна цена каждую неделю. В прошлом месяце я много откатал, и всё осталось мне. Со старым диспетчером ушло бы $700.",
        name: "Ion R.",
        role: "Owner-operator, 2 трака · IL",
        lang: "RU",
      },
      {
        text: "Моему MC было 3 месяца, и никто не хотел со мной работать. Они нашли брокеров, которые берут новых перевозчиков, и я поехал.",
        name: "Sergei M.",
        role: "Новый перевозчик · FL",
        lang: "RU",
      },
      {
        text: "I check every broker in Carrier Lookup before I say yes. Takes ten seconds from the cab.",
        name: "Mike D.",
        role: "Owner-operator · TX",
        lang: "EN",
      },
    ],
    quoteOpen: "«",
    quoteClose: "»",
    faqHeading: "Вопросы",
    faq: [
      {
        q: "Чем фиксированная цена лучше процента?",
        a: "Диспетчер на проценте зарабатывает больше, когда больше возите вы. Мы берём одинаково каждую неделю, поэтому деньги с хорошей недели остаются у вас.",
      },
      { q: "Нужно подписывать долгий контракт?", a: "Нет. Работаем понедельно. Можно остановиться в любой момент, предупредив за неделю." },
      {
        q: "Я только получил MC. Будете со мной работать?",
        a: "Да. Помогаем новым компаниям с первого дня: пакеты для брокеров, чек-лист для нового MC и направления, где берут новых перевозчиков.",
      },
      { q: "Можно говорить по-русски?", a: "Да. Наши диспетчеры говорят по-английски и по-русски, 24/7 во всех часовых поясах США." },
      {
        q: "Откуда данные в Carrier Lookup?",
        a: "Из открытых записей FMCSA: лицензия, страховка, инспекции и аварии. Health Score сводит всё в оценку от 0 до 100.",
      },
    ],
  },
};
