import type { Locale } from "@/shared/i18n/locale";

export type StartWizardCopy = {
  pageTitle: string;
  stepLabels: readonly [string, string, string, string];
  stepStatus: { complete: string; step: (n: number, total: number, label: string) => string };
  requiredSuffix: string;
  /** Option value (what the API receives) -> label shown to the visitor. Missing keys show the value. */
  options: Record<string, string>;
  truck: {
    heading: string;
    trailer: string;
    trucks: string;
    driver: string;
    fewer: string;
    more: string;
  };
  lanes: {
    heading: string;
    homeBase: string;
    homeBasePlaceholder: string;
    legend: string;
    homeTime: string;
    /** Shown when no lane is picked. */
    required: string;
  };
  authority: {
    heading: string;
    mcLabel: string;
    mcHint: string;
    noAuthority: { before: string; link: string; after: string };
  };
  call: {
    heading: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    bestTime: string;
    language: string;
    disclosure: { before: string; sms: string; between: string; privacy: string; after: string };
  };
  nav: { back: string; next: string; submit: string; sending: string };
  genericError: string;
  aside: {
    price: string;
    unit: (trucks: number) => string;
    note: string;
    soFar: string;
    equipment: string;
    trucks: string;
    drivers: string;
    lanes: string;
    home: string;
    authority: string;
  };
  success: {
    heading: string;
    you: string;
    body: (who: string, when: string, language: string) => string;
    callTimes: Record<string, string>;
    callTimeFallback: string;
    languages: { english: string; other: string };
    readyHeading: string;
    ready: string[];
    callNow: string;
  };
};

const EN: StartWizardCopy = {
  pageTitle: "Start dispatch",
  stepLabels: ["Truck", "Lanes", "Authority", "Call"],
  stepStatus: {
    complete: "All steps complete",
    step: (n, total, label) => `Step ${n} of ${total}: ${label}`,
  },
  requiredSuffix: " (required)",
  options: {},
  truck: {
    heading: "Your truck",
    trailer: "Trailer type",
    trucks: "How many trucks?",
    driver: "Who drives?",
    fewer: "Fewer trucks",
    more: "More trucks",
  },
  lanes: {
    heading: "Lanes and home time",
    homeBase: "Home base",
    homeBasePlaceholder: "City, state",
    legend: "Where do you want to run? (Pick any)",
    homeTime: "How often home?",
    required: "Pick at least one lane to continue.",
  },
  authority: {
    heading: "Your authority",
    mcLabel: "MC/DOT number",
    mcHint: "MC or USDOT number. We'll pull your record from FMCSA so you don't have to type it.",
    noAuthority: {
      before: "No problem. We'll walk you through the ",
      link: "New MC Checklist",
      after: " on the call and start booking as soon as your authority is active.",
    },
  },
  call: {
    heading: "When can we call?",
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Phone",
    bestTime: "Best time",
    language: "Language",
    disclosure: {
      before:
        "By requesting a call, you agree to receive a call and text from Trucker HQ about this request. Msg & data rates may apply. Reply STOP to opt out. See ",
      sms: "SMS terms",
      between: " and ",
      privacy: "Privacy",
      after: ".",
    },
  },
  nav: { back: "← Back", next: "Next", submit: "Request my call", sending: "Sending..." },
  genericError: "Something went wrong. Try again, or call us directly.",
  aside: {
    price: "YOUR PRICE",
    unit: (n) => `/ week × ${n} truck${n === 1 ? "" : "s"}`,
    note: "Flat, week to week. No percentage and no contract.",
    soFar: "So far",
    equipment: "Equipment",
    trucks: "Trucks",
    drivers: "Drivers",
    lanes: "Lanes",
    home: "Home",
    authority: "Authority",
  },
  success: {
    heading: "You're on the list",
    you: "you",
    body: (who, when, language) =>
      `A dispatcher will call ${who} ${when}, in ${language}. The call takes about 10 minutes.`,
    callTimes: {
      "Right now": "in the next 15 minutes",
      Today: "today",
      "Tomorrow AM": "tomorrow morning",
      "Tomorrow PM": "tomorrow afternoon",
    },
    callTimeFallback: "soon",
    languages: { english: "English", other: "Russian" },
    readyHeading: "Have these ready",
    ready: [
      "MC authority letter and W-9",
      "Certificate of insurance",
      "Truck and trailer numbers",
      "Factoring company, if you use one",
    ],
    callNow: "Can't wait? Call now",
  },
};

function trucksRu(n: number): string {
  const last = n % 10;
  const tens = n % 100;
  if (last === 1 && tens !== 11) return "трак";
  if (last >= 2 && last <= 4 && (tens < 12 || tens > 14)) return "трака";
  return "траков";
}

const RU: StartWizardCopy = {
  pageTitle: "Начать диспетчинг",
  stepLabels: ["Трак", "Маршруты", "Авторити", "Звонок"],
  stepStatus: {
    complete: "Все шаги выполнены",
    step: (n, total, label) => `Шаг ${n} из ${total}: ${label}`,
  },
  requiredSuffix: " (обязательно)",
  options: {
    "Dry van": "Драй-ван",
    Reefer: "Реф",
    Flatbed: "Флэтбед",
    "Step deck": "Степдек",
    "Power only": "Power only",
    "I drive": "Еду сам",
    "Company driver": "Наёмный водитель",
    Team: "Тим (два водителя)",
    Midwest: "Мидвест",
    Northeast: "Северо-восток",
    Southeast: "Юго-восток",
    "Texas & South": "Техас и юг",
    "West Coast": "Западное побережье",
    Mountain: "Горные штаты",
    Anywhere: "Куда угодно",
    "Every night": "Каждую ночь",
    "Every week": "Каждую неделю",
    "Every 2 weeks": "Раз в 2 недели",
    "Out 3+ weeks": "В рейсе 3+ недели",
    "I have an MC": "У меня есть MC",
    "MC is pending": "MC в процессе оформления",
    "I don't have one yet": "Пока нет",
    "Right now": "Прямо сейчас",
    Today: "Сегодня",
    "Tomorrow AM": "Завтра утром",
    "Tomorrow PM": "Завтра днём",
    English: "English",
    Русский: "Русский",
  },
  truck: {
    heading: "Ваш трак",
    trailer: "Тип трейлера",
    trucks: "Сколько траков?",
    driver: "Кто за рулём?",
    fewer: "Меньше траков",
    more: "Больше траков",
  },
  lanes: {
    heading: "Маршруты и время дома",
    homeBase: "Домашняя база",
    homeBasePlaceholder: "Город, штат",
    legend: "Где хотите ездить? (можно выбрать несколько)",
    homeTime: "Как часто бываете дома?",
    required: "Выберите хотя бы один маршрут, чтобы продолжить.",
  },
  authority: {
    heading: "Ваше авторити",
    mcLabel: "Номер MC/DOT",
    mcHint:
      "Номер MC или USDOT. Данные по вашей компании мы возьмём из FMCSA, вводить их вручную не нужно.",
    noAuthority: {
      before: "Не проблема. На звонке разберём ",
      link: "чек-лист для нового MC",
      after: " и начнём подбирать грузы, как только ваше авторити станет активным.",
    },
  },
  call: {
    heading: "Когда вам позвонить?",
    name: "Имя",
    namePlaceholder: "Ваше имя",
    phone: "Телефон",
    bestTime: "Удобное время",
    language: "Язык разговора",
    disclosure: {
      before:
        "Отправляя заявку, вы соглашаетесь на звонок и SMS от Trucker HQ по этой заявке. Может взиматься плата за сообщения и данные. Ответьте STOP, чтобы отписаться. См. ",
      sms: "условия SMS",
      between: " и ",
      privacy: "политику конфиденциальности",
      after: ".",
    },
  },
  nav: { back: "← Назад", next: "Далее", submit: "Заказать звонок", sending: "Отправляем..." },
  genericError: "Что-то пошло не так. Попробуйте ещё раз или позвоните нам.",
  aside: {
    price: "ВАША ЦЕНА",
    unit: (n) => `/ неделя × ${n} ${trucksRu(n)}`,
    note: "Фиксированная цена, неделя за неделей. Без процента и без контракта.",
    soFar: "Что выбрано",
    equipment: "Оборудование",
    trucks: "Траки",
    drivers: "Водители",
    lanes: "Маршруты",
    home: "Дома",
    authority: "Авторити",
  },
  success: {
    heading: "Заявка принята",
    you: "вам",
    body: (who, when, language) =>
      `Диспетчер позвонит ${who} ${when}, разговор будет ${language}. Звонок займёт около 10 минут.`,
    callTimes: {
      "Right now": "в ближайшие 15 минут",
      Today: "сегодня",
      "Tomorrow AM": "завтра утром",
      "Tomorrow PM": "завтра днём",
    },
    callTimeFallback: "в ближайшее время",
    languages: { english: "на английском", other: "на русском" },
    readyHeading: "Подготовьте",
    ready: [
      "Письмо о присвоении MC (authority letter) и W-9",
      "Сертификат страховки (COI)",
      "Номера трака и трейлера",
      "Факторинговая компания, если работаете с ней",
    ],
    callNow: "Не хотите ждать? Позвоните",
  },
};

export const START_WIZARD_COPY: Record<Locale, StartWizardCopy> = { EN, RU };

/** Label for an option value; falls back to the value itself. */
export function optionLabel(c: StartWizardCopy, value: string): string {
  return c.options[value] ?? value;
}
