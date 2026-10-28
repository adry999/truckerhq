import type { Locale } from "@/shared/i18n/locale";

export type PricingCopy = {
  metaTitle: string;
  metaDescription: string;
  path: string;
  breadcrumbHome: string;
  breadcrumbName: string;
  badge: string;
  h1: string;
  intro: string;
  facts: { value: string; label: string }[];
  hireHeading: string;
  hireIntro: string;
  /** Only used when the hire-drivers plans component has no copy for this locale. */
  hireFallback: {
    jobPost: { name: string; unit: string; items: string[] };
    full: { name: string; unit: string; items: string[] };
    link: string;
  } | null;
  hireHref: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
};

export const PRICING_COPY: Record<Locale, PricingCopy> = {
  EN: {
    metaTitle: "Truck Dispatch Pricing, Flat Weekly Rate",
    metaDescription:
      "Truck dispatch pricing for owner-operators and small fleets. One flat weekly price per truck, never a percentage of your gross. Week to week, one week notice to stop.",
    path: "/pricing",
    breadcrumbHome: "Home",
    breadcrumbName: "Pricing",
    badge: "PRICING",
    h1: "One flat weekly price per truck",
    intro:
      "We never take a percentage of your gross. You pay a set amount per truck each week. It does not change when your rate or your miles do. There is no long contract. Give us one week notice and you can stop.",
    facts: [
      { value: "0%", label: "of your gross" },
      { value: "WEEKLY", label: "billed per truck" },
      { value: "1 WEEK", label: "notice to stop" },
    ],
    hireHeading: "Driver hiring plans",
    hireIntro: "For carriers that need drivers. Pay for a job post, or let us screen drivers for you.",
    hireFallback: null,
    hireHref: "/hire-drivers#post",
    faqHeading: "Pricing questions",
    faq: [
      {
        q: "When am I billed?",
        a: "Dispatch is billed weekly, per truck. You pay for the week you are with us. Nothing is taken from your loads.",
      },
      {
        q: "What counts as one truck?",
        a: "One power unit that we dispatch. A tractor and its trailer count as one truck. If you add a second tractor, that is a second truck.",
      },
      {
        // REVIEW: client to confirm there is no setup fee before this goes live.
        q: "Is there a setup fee?",
        a: "No. The flat weekly price is the only dispatch charge. Onboarding is included.",
      },
      {
        q: "How do I stop?",
        a: "Give us one week notice. Dispatch runs week to week, so there is no contract to break and no exit fee.",
      },
      {
        q: "Is factoring included in the price?",
        a: "No. Factoring is a separate service from a separate company. We work with the factoring company you already use. We send them your rate cons, BOLs and invoices.",
      },
      {
        // REVIEW: client to confirm accepted payment methods (ACH, card, other).
        q: "How do I pay?",
        a: "You pay the weekly price by bank transfer or card. We confirm the method when you sign up.",
      },
      {
        // REVIEW: client to confirm the Starter MC 6-month graduation terms.
        q: "What happens after six months on Starter MC?",
        a: "Starter MC is for new authorities. After six months you move to the Owner-Operator Flat package, if you are running one to three trucks. We tell you before the change.",
      },
      {
        q: "Is Web & Brand a weekly charge?",
        a: "No. Web & Brand is a one-time payment. It covers your website and Google Business profile. It is separate from the weekly dispatch price.",
      },
    ],
  },
  RU: {
    metaTitle: "Цены на диспетчинг, фиксированная цена в неделю",
    metaDescription:
      "Цены на диспетчинг для owner-operator и небольших автопарков. Одна фиксированная цена за грузовик в неделю, никогда не процент от gross. Неделя за неделей, уведомление за 1 неделю.",
    path: "/ru/pricing",
    breadcrumbHome: "Главная",
    breadcrumbName: "Цены",
    badge: "ЦЕНЫ",
    h1: "Одна фиксированная цена за грузовик в неделю",
    intro:
      "Мы никогда не берём процент от вашего gross. Вы платите одну и ту же сумму за грузовик каждую неделю. Она не меняется, если меняются ваш рейт или мили. Долгого контракта нет. Предупредите нас за одну неделю, и вы свободны.",
    facts: [
      { value: "0%", label: "от вашего gross" },
      { value: "В НЕДЕЛЮ", label: "оплата за грузовик" },
      { value: "1 НЕДЕЛЯ", label: "уведомление, чтобы уйти" },
    ],
    hireHeading: "Найм водителей",
    hireIntro: "Для перевозчиков, которым нужны водители. Оплатите объявление или поручите нам проверку водителей.",
    hireFallback: {
      jobPost: {
        name: "Объявление",
        unit: "/ 30 дней",
        items: [
          "Ваша вакансия на Trucker HQ Jobs на 30 дней",
          "Показывается на английском и русском",
          "Ваш Health Score рядом с вакансией",
          "Отклики приходят на ваш телефон",
        ],
      },
      full: {
        name: "Полный подбор",
        unit: "за нанятого водителя",
        items: [
          "Всё из пакета «Объявление»",
          "Мы звоним и проверяем каждого кандидата",
          "Проверки CDL, MVR, PSP и Clearinghouse",
          "Бесплатная замена в течение 30 дней",
          "Платите, только когда водитель вышел на работу",
        ],
      },
      link: "Страница найма водителей (на английском)",
    },
    hireHref: "/hire-drivers",
    faqHeading: "Вопросы о ценах",
    faq: [
      {
        q: "Когда я плачу?",
        a: "Диспетчинг оплачивается раз в неделю, за каждый грузовик. Вы платите за неделю, которую работаете с нами. С ваших грузов мы ничего не снимаем.",
      },
      {
        q: "Что считается одним грузовиком?",
        a: "Один power unit, который мы диспетчируем. Тягач вместе с трейлером считается как один грузовик. Если вы добавляете второй тягач, это второй грузовик.",
      },
      {
        // REVIEW: client to confirm there is no setup fee before this goes live.
        q: "Есть ли плата за подключение?",
        a: "Нет. Фиксированная цена в неделю — единственный платёж за диспетчинг. Подключение входит в цену.",
      },
      {
        q: "Как отказаться от услуги?",
        a: "Предупредите нас за одну неделю. Диспетчинг идёт неделя за неделей, поэтому контракта, который нужно расторгать, нет, и штрафа за выход тоже нет.",
      },
      {
        q: "Входит ли factoring в цену?",
        a: "Нет. Factoring — отдельная услуга от отдельной компании. Мы работаем с factoring-компанией, которой вы уже пользуетесь, и отправляем ей rate con, BOL и инвойсы.",
      },
      {
        // REVIEW: client to confirm accepted payment methods (ACH, card, other).
        q: "Как платить?",
        a: "Вы платите еженедельную цену банковским переводом или картой. Способ мы уточним при подключении.",
      },
      {
        // REVIEW: client to confirm the Starter MC 6-month graduation terms.
        q: "Что будет через шесть месяцев на Starter MC?",
        a: "Starter MC — для новых authority. Через шесть месяцев вы переходите на пакет Owner-Operator Flat, если у вас от одного до трёх грузовиков. Мы предупредим вас до перехода.",
      },
      {
        q: "Web & Brand — это недельный платёж?",
        a: "Нет. Web & Brand — разовый платёж. Он покрывает ваш сайт и профиль Google Business. Это отдельно от недельной цены за диспетчинг.",
      },
    ],
  },
};
