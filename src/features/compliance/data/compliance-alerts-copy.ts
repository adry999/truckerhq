import type { Locale } from "@/shared/i18n/locale";

export const WATCH_KEYS = ["auth", "ins", "ucr", "boc", "oos", "insp"] as const;
export type WatchKey = (typeof WATCH_KEYS)[number];

export type ComplianceAlertsCopy = {
  watchItems: Record<WatchKey, { title: string; description: string }>;
  sentTitle: string;
  /** Sentence after the count; `{count}` and `{dot}` are filled in by the form. */
  sentBody: string;
  checklistLink: string;
  checklistHref: string;
  watchAnother: string;
  dotLabel: string;
  watchLegend: string;
  contactHeading: string;
  phoneLabel: string;
  textLanguageLabel: string;
  disclosure: { before: string; smsTerms: string; and: string; privacy: string };
  submit: string;
  submitting: string;
  sampleEyebrow: string;
  sampleStamp: string;
  whyHeading: string;
  whyBody: string;
};

export const COMPLIANCE_ALERTS_COPY: Record<Locale, ComplianceAlertsCopy> = {
  EN: {
    watchItems: {
      auth: { title: "Operating authority", description: "Active, pending, revoked or inactive" },
      ins: { title: "Insurance filing", description: "BIPD and cargo on file, cancellation notices" },
      ucr: { title: "UCR registration", description: "Reminder before the yearly deadline" },
      boc: { title: "BOC-3 process agent", description: "Filing missing or removed" },
      oos: { title: "Out-of-service order", description: "Any new OOS order on your DOT" },
      insp: { title: "New inspections and crashes", description: "Every roadside inspection that hits your record" },
    },
    sentTitle: "Alerts are on",
    sentBody: "We're watching {count} items for {dot}. A confirmation text is on its way.",
    checklistLink: "New MC Checklist",
    checklistHref: "/tools/new-mc-checklist",
    watchAnother: "Watch another carrier",
    dotLabel: "1. Your DOT or MC number",
    watchLegend: "2. What to watch",
    contactHeading: "3. Where to text you",
    phoneLabel: "Mobile number",
    textLanguageLabel: "Text language",
    disclosure: {
      before: "Free, usually 1–3 texts a year. Msg & data rates may apply. Reply STOP to cancel, HELP for help. See our",
      smsTerms: "SMS terms",
      and: "and",
      privacy: "Privacy policy",
    },
    submit: "Turn on alerts",
    submitting: "Sending...",
    sampleEyebrow: "WHAT A TEXT LOOKS LIKE",
    sampleStamp: "Trucker HQ · today, 7:02 AM",
    whyHeading: "Why this matters",
    whyBody:
      "If your insurance filing lapses, FMCSA can revoke your authority, and brokers stop tendering loads. Most carriers find out when a load gets cancelled. A text the same day gives you time to call your agent.",
  },
  RU: {
    watchItems: {
      auth: { title: "Operating authority", description: "Active, pending, revoked или inactive" },
      ins: { title: "Страховка (filing)", description: "BIPD и cargo в базе FMCSA, уведомления об отмене" },
      ucr: { title: "Регистрация UCR", description: "Напоминание до годового дедлайна" },
      boc: { title: "BOC-3 (process agent)", description: "BOC-3 нет в базе или его удалили" },
      oos: { title: "Out-of-service order", description: "Любой новый OOS на ваш DOT" },
      insp: { title: "Новые инспекции и аварии", description: "Каждая инспекция на дороге, которая попадает в вашу запись" },
    },
    sentTitle: "Уведомления включены",
    sentBody: "Мы следим за {count} пунктами по {dot}. Текст с подтверждением уже в пути.",
    checklistLink: "New MC Checklist",
    checklistHref: "/ru/tools/new-mc-checklist",
    watchAnother: "Следить за другим перевозчиком",
    dotLabel: "1. Ваш номер DOT или MC",
    watchLegend: "2. За чем следить",
    contactHeading: "3. Куда писать",
    phoneLabel: "Мобильный номер",
    textLanguageLabel: "Язык SMS",
    disclosure: {
      before: "Бесплатно, обычно 1–3 SMS в год. Может взиматься плата за сообщения и данные. Ответьте STOP, чтобы отписаться, HELP — для помощи. Смотрите наши",
      smsTerms: "SMS terms",
      and: "и",
      privacy: "Privacy policy",
    },
    submit: "Включить уведомления",
    submitting: "Отправляем...",
    sampleEyebrow: "КАК ВЫГЛЯДИТ SMS",
    sampleStamp: "Trucker HQ · сегодня, 7:02",
    whyHeading: "Почему это важно",
    whyBody:
      "Если страховая подача (filing) истечёт, FMCSA может отозвать вашу авторизацию, и брокеры перестанут давать грузы. Большинство перевозчиков узнают об этом, когда отменяют груз. SMS в тот же день даёт время позвонить агенту.",
  },
};
