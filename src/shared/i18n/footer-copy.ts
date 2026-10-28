import type { Locale } from "@/shared/i18n/locale";

export type FooterLink = { t: string; href: string };

export type FooterCopy = {
  tagline: string;
  columns: { h: string; links: FooterLink[] }[];
  legalLine: string;
  legal: FooterLink[];
  cookieSettings: string;
};

// Links stay on their English URL until an RU page exists.
export const FOOTER_COPY: Record<Locale, FooterCopy> = {
  EN: {
    tagline: "Dispatch, jobs and tools for US truckers.",
    columns: [
      {
        h: "SERVICES",
        links: [
          { t: "Dispatch", href: "/dispatch" },
          { t: "Driver Jobs", href: "/jobs" },
          { t: "Hire Drivers", href: "/hire-drivers" },
        ],
      },
      {
        h: "FREE TOOLS",
        links: [
          { t: "All tools", href: "/tools" },
          { t: "Carrier Lookup", href: "/tools/carrier-lookup" },
          { t: "Profit per Mile", href: "/tools/profit-per-mile" },
          { t: "Compliance Alerts", href: "/tools/compliance-alerts" },
          { t: "New MC Checklist", href: "/tools/new-mc-checklist" },
          { t: "Texas carriers", href: "/carriers/texas" },
        ],
      },
      {
        h: "CONTACT",
        links: [
          { t: "Guides", href: "/guides" },
          { t: "About us", href: "/about" },
        ],
      },
    ],
    legalLine: "© 2026 Trucker HQ. Carrier data from public FMCSA records.",
    legal: [
      { t: "Privacy", href: "/privacy" },
      { t: "Terms", href: "/terms" },
      { t: "SMS terms", href: "/sms-terms" },
    ],
    cookieSettings: "Cookie settings",
  },
  RU: {
    tagline: "Диспетчинг, работа и инструменты для дальнобойщиков в США.",
    columns: [
      {
        h: "УСЛУГИ",
        links: [
          { t: "Диспетчинг", href: "/ru/dispatch" },
          { t: "Работа для водителей", href: "/ru/jobs" },
          { t: "Найм водителей", href: "/hire-drivers" },
        ],
      },
      {
        h: "БЕСПЛАТНЫЕ ИНСТРУМЕНТЫ",
        links: [
          { t: "Все инструменты", href: "/tools" },
          { t: "Проверка перевозчика", href: "/tools/carrier-lookup" },
          { t: "Прибыль за милю", href: "/tools/profit-per-mile" },
          { t: "Оповещения о compliance", href: "/tools/compliance-alerts" },
          { t: "Чек-лист нового MC", href: "/tools/new-mc-checklist" },
          { t: "Перевозчики Техаса", href: "/carriers/texas" },
        ],
      },
      {
        h: "КОНТАКТЫ",
        links: [
          { t: "Статьи", href: "/guides" },
          { t: "О нас", href: "/about" },
        ],
      },
    ],
    legalLine: "© 2026 Trucker HQ. Данные о перевозчиках — из открытых записей FMCSA.",
    legal: [
      { t: "Конфиденциальность", href: "/privacy" },
      { t: "Условия использования", href: "/terms" },
      { t: "Условия SMS", href: "/sms-terms" },
    ],
    cookieSettings: "Настройки cookie",
  },
};
