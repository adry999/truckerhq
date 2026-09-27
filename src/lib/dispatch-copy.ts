export type DispatchCopy = {
  heroAlt: string;
  h1Line1: string;
  h1Line2: string;
  heroBody: string;
  ctaSeePackages: string;
  ctaCall: string;
  cardEyebrow: string;
  cardUnit: string;
  statTimezone: string;
  statGross: string;
  statDispatchers: string;
  statNoticeValue: string;
  statNoticeLabel: string;
  includedHeading: string;
  included: { t: string; d: string }[];
  pricingHeading: string;
  pricingSub: string;
  packages: {
    who: string;
    name: string;
    unit: string;
    desc: string;
    items: string[];
    cta: string;
    featured: boolean;
    popular?: boolean;
  }[];
  mostPopular: string;
  stepsHeading: string;
  steps: { n: string; title: string; desc: string }[];
  grossEyebrow: string;
  grossHeading: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
  ctaEyebrow: string;
  ctaHeading: string;
  ctaBody: string;
  ctaStart: string;
};

export const DISPATCH_COPY: Record<"EN" | "RU", DispatchCopy> = {
  EN: {
    heroAlt: "Driver in the cab at a truck stop, dawn",
    h1Line1: "Flat weekly dispatch.",
    h1Line2: "No percentage.",
    heroBody:
      "We find the loads, push for the rate and do the paperwork. You pay one price every week, no matter how much you gross.",
    ctaSeePackages: "See packages",
    ctaCall: "Call (XXX) XXX-XXXX",
    cardEyebrow: "ONE TRUCK · ONE PRICE",
    cardUnit: "/ week",
    statTimezone: "every US time zone",
    statGross: "of your gross",
    statDispatchers: "dispatchers",
    statNoticeValue: "1 WEEK",
    statNoticeLabel: "notice to stop",
    includedHeading: "Everything a dispatcher should do",
    included: [
      { t: "24/7 dispatcher", d: "A real person on your time zone, day or night. English or Russian." },
      { t: "Load boards", d: "We search DAT, Truckstop and direct broker lists so you do not have to." },
      { t: "Rate negotiation", d: "We push every broker for more. We check the lane average before we say yes." },
      { t: "Broker vetting", d: "Credit, days-to-pay and authority checked on every broker before booking." },
      { t: "Fuel discounts", d: "Fuel card savings at major truck stop chains across the US." },
      { t: "Paperwork", d: "Rate cons, BOLs, invoices and factoring packets handled for you." },
      { t: "Compliance reminders", d: "We watch your insurance, UCR, IFTA and authority dates." },
      { t: "Online visibility", d: "A simple website and a Google Business profile so brokers and shippers find you." },
    ],
    pricingHeading: "Pick your lane",
    pricingSub: "Every dispatch package is a flat weekly price. Week to week, no long contract.",
    packages: [
      {
        who: "MC UNDER 6 MONTHS",
        name: "Starter MC",
        unit: "/ week",
        desc: "For new authorities that need their first brokers and first loads.",
        items: ["Full dispatch service", "Broker setup packets", "Brokers that accept new MCs", "New MC Checklist walkthrough", "Compliance reminders"],
        cta: "Start Starter MC",
        featured: false,
      },
      {
        who: "1–3 TRUCKS",
        name: "Owner-Operator Flat",
        unit: "/ week per truck",
        desc: "Everything included. One price, every week.",
        items: ["24/7 dispatcher on your time zone", "Rate negotiation on every load", "Broker vetting", "Paperwork and invoicing", "Fuel card discounts"],
        cta: "Start dispatch",
        featured: true,
        popular: true,
      },
      {
        who: "3–10 TRUCKS",
        name: "Fleet",
        unit: "/ week per truck",
        desc: "Lower per-truck price and one dispatcher who knows your whole fleet.",
        items: ["Everything in Owner-Operator", "Dedicated dispatcher", "Weekly fleet report", "Driver hiring support", "Website and Google profile included"],
        cta: "Talk to us",
        featured: false,
      },
      {
        who: "ANY CARRIER",
        name: "Web & Brand",
        unit: "one-time",
        desc: "Look like a real company to brokers and shippers.",
        items: ["One-page company website", "Google Business profile", "Email on your domain", "Logo and truck door lettering file", "Add to any dispatch package"],
        cta: "Get online",
        featured: false,
      },
    ],
    mostPopular: "MOST POPULAR",
    stepsHeading: "Rolling in 3 steps",
    steps: [
      { n: "1", title: "Call or sign up", desc: "Tell us your truck, equipment, lanes and home time. Send your MC, W-9 and insurance." },
      { n: "2", title: "We book the loads", desc: "We search the boards, check the broker and negotiate. You approve every load." },
      { n: "3", title: "You drive, we do paper", desc: "Rate cons, check calls, invoices and factoring. You get paid, we get the same flat price." },
    ],
    grossEyebrow: "FLAT FEE VS PERCENTAGE",
    grossHeading: "See what a percentage costs you",
    faqHeading: "Dispatch questions",
    faq: [
      { q: "What does the flat weekly price include?", a: "Everything on this page: load search, rate negotiation, broker vetting, paperwork, invoicing, fuel discounts and 24/7 support. No extra fees per load." },
      { q: "Is there a contract?", a: "No long contract. Dispatch runs week to week. Give us one week notice and you are free to go." },
      { q: "Do you force loads on me?", a: "Never. We bring you options with the rate and the lane. You say yes or no. It is your truck." },
      { q: "My MC is new. Will brokers work with me?", a: "Some will not, and we know which ones will. Starter MC covers broker setup packets and lanes that accept new authorities." },
      { q: "Do you work with factoring companies?", a: "Yes. We send rate cons, BOLs and invoices to your factoring company, or invoice brokers directly if you do not factor." },
      { q: "What equipment do you dispatch?", a: "Dry van, reefer, flatbed, step deck, power only and box trucks." },
    ],
    ctaEyebrow: "NEXT EXIT · YOUR FIRST LOAD",
    ctaHeading: "Ready to roll?",
    ctaBody: "Ten minutes on the phone. We can book your first load today.",
    ctaStart: "Start dispatch",
  },
  RU: {
    heroAlt: "Водитель в кабине на стоянке для дальнобойщиков, рассвет",
    h1Line1: "Фиксированная цена в неделю.",
    h1Line2: "Без процентов.",
    heroBody:
      "Мы находим грузы, торгуемся за ставку и делаем документы. Вы платите одну цену каждую неделю, независимо от вашей выручки.",
    ctaSeePackages: "Смотреть пакеты",
    ctaCall: "Звонок (XXX) XXX-XXXX",
    cardEyebrow: "ОДИН ГРУЗОВИК · ОДНА ЦЕНА",
    cardUnit: "/ неделя",
    statTimezone: "все пояса США",
    statGross: "от вашей выручки",
    statDispatchers: "диспетчеры",
    statNoticeValue: "1 НЕДЕЛЯ",
    statNoticeLabel: "на выход",
    includedHeading: "Всё, что должен делать диспетчер",
    included: [
      { t: "Диспетчер 24/7", d: "Живой человек в вашем часовом поясе, днём и ночью. По-английски или по-русски." },
      { t: "Биржи грузов", d: "Мы ищем на DAT, Truckstop и у прямых брокеров, чтобы вам не пришлось." },
      { t: "Торг за ставку", d: "Давим на каждого брокера за более высокую цену. Сверяем со средней по маршруту, прежде чем согласиться." },
      { t: "Проверка брокера", d: "Кредитная история, скорость оплаты и статус авторизации проверяются перед каждой бронью." },
      { t: "Скидки на топливо", d: "Скидки по топливной карте на крупных сетях заправок по всей стране." },
      { t: "Документы", d: "Rate con, BOL, инвойсы и пакеты для факторинга — всё оформляем за вас." },
      { t: "Напоминания по комплаенсу", d: "Следим за страховкой, UCR, IFTA и датами по авторизации." },
      { t: "Присутствие онлайн", d: "Простой сайт и профиль Google Business, чтобы брокеры и грузоотправители находили вас." },
    ],
    pricingHeading: "Выберите свой вариант",
    pricingSub: "Каждый пакет диспетчинга — фиксированная цена в неделю. Неделя за неделей, без долгого контракта.",
    packages: [
      {
        who: "MC МОЛОЖЕ 6 МЕСЯЦЕВ",
        name: "Starter MC",
        unit: "/ неделя",
        desc: "Для новых авторизаций, которым нужны первые брокеры и первые грузы.",
        items: ["Полный диспетчинг", "Пакеты для оформления у брокеров", "Брокеры, работающие с новыми MC", "Разбор New MC Checklist", "Напоминания по комплаенсу"],
        cta: "Начать Starter MC",
        featured: false,
      },
      {
        who: "1–3 ГРУЗОВИКА",
        name: "Owner-Operator Flat",
        unit: "/ неделя за грузовик",
        desc: "Всё включено. Одна цена, каждую неделю.",
        items: ["Диспетчер 24/7 в вашем поясе", "Торг за ставку на каждый груз", "Проверка брокеров", "Документы и инвойсы", "Скидки по топливной карте"],
        cta: "Начать диспетчинг",
        featured: true,
        popular: true,
      },
      {
        who: "3–10 ГРУЗОВИКОВ",
        name: "Fleet",
        unit: "/ неделя за грузовик",
        desc: "Цена ниже за грузовик и один диспетчер, знающий весь ваш парк.",
        items: ["Всё из Owner-Operator", "Персональный диспетчер", "Еженедельный отчёт по парку", "Помощь в найме водителей", "Сайт и профиль Google включены"],
        cta: "Поговорить с нами",
        featured: false,
      },
      {
        who: "ЛЮБОЙ ПЕРЕВОЗЧИК",
        name: "Web & Brand",
        unit: "разовый платёж",
        desc: "Выглядите как настоящая компания для брокеров и грузоотправителей.",
        items: ["Одностраничный сайт компании", "Профиль Google Business", "Почта на вашем домене", "Файл логотипа и надписи на дверь", "Добавляется к любому пакету диспетчинга"],
        cta: "Выйти онлайн",
        featured: false,
      },
    ],
    mostPopular: "ПОПУЛЯРНЫЙ",
    stepsHeading: "Старт за 3 шага",
    steps: [
      { n: "1", title: "Звоните или регистрируйтесь", desc: "Расскажите про грузовик, оборудование, маршруты и время дома. Пришлите MC, W-9 и страховку." },
      { n: "2", title: "Мы бронируем грузы", desc: "Ищем на биржах, проверяем брокера и торгуемся. Вы одобряете каждый груз." },
      { n: "3", title: "Вы едете, мы делаем бумаги", desc: "Rate con, check calls, инвойсы и факторинг. Вам платят, мы получаем ту же фиксированную цену." },
    ],
    grossEyebrow: "ФИКСИРОВАННАЯ ЦЕНА ПРОТИВ ПРОЦЕНТА",
    grossHeading: "Сколько вам стоит процент",
    faqHeading: "Вопросы о диспетчинге",
    faq: [
      { q: "Что входит в фиксированную недельную цену?", a: "Всё на этой странице: поиск грузов, торг за ставку, проверка брокеров, документы, инвойсы, скидки на топливо и поддержка 24/7. Никаких доплат за груз." },
      { q: "Есть ли долгосрочный контракт?", a: "Долгого контракта нет. Диспетчинг работает неделя за неделей. Предупредите за неделю — и вы свободны." },
      { q: "Вы навязываете мне грузы?", a: "Никогда. Мы приносим вам варианты со ставкой и маршрутом. Вы говорите да или нет. Это ваш грузовик." },
      { q: "У меня новый MC. Брокеры будут со мной работать?", a: "Некоторые нет, и мы знаем, кто будет. Starter MC включает пакеты для оформления у брокеров и маршруты, принимающие новые авторизации." },
      { q: "Вы работаете с факторинговыми компаниями?", a: "Да. Мы отправляем rate con, BOL и инвойсы в вашу факторинговую компанию, либо выставляем счета брокерам напрямую, если вы не факторите." },
      { q: "Какое оборудование вы диспетчерите?", a: "Dry van, reefer, flatbed, step deck, power only и box truck." },
    ],
    ctaEyebrow: "СЛЕДУЮЩИЙ ВЫЕЗД · ВАШ ПЕРВЫЙ ГРУЗ",
    ctaHeading: "Готовы стартовать?",
    ctaBody: "Десять минут по телефону. Мы можем забронировать ваш первый груз уже сегодня.",
    ctaStart: "Начать диспетчинг",
  },
};
