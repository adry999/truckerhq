import type { Locale } from "@/shared/i18n/locale";

export type ToolsHubCopy = {
  badge: string;
  h1: string;
  intro: string;
  tools: { name: string; href: string; cta: string; desc: string }[];
  lookup: {
    href: string;
    title: string;
    desc: string;
    /** Small note shown when the tool itself is English-only. */
    note?: string;
    demoName: string;
    demoMeta: string;
    cta: string;
  };
  statesHeading: string;
  /** Prefix for state directory links; the directory itself is English-only. */
  statesNote?: string;
};

export const TOOLS_HUB_COPY: Record<Locale, ToolsHubCopy> = {
  EN: {
    badge: "FREE · NO SIGN-UP",
    h1: "Carrier tools",
    intro:
      "Check a broker before you haul, see what a load really pays, and keep your authority out of trouble. Built on public FMCSA data.",
    tools: [
      {
        name: "Profit per mile",
        href: "/tools/profit-per-mile",
        cta: "Run the numbers",
        desc: "Fuel, insurance, truck payment. See your real cost per mile and the lowest rate worth taking.",
      },
      {
        name: "Compliance Alerts",
        href: "/tools/compliance-alerts",
        cta: "Set up alerts",
        desc: "Get a text when your authority, insurance filing, UCR or safety status changes.",
      },
      {
        name: "New MC Checklist",
        href: "/tools/new-mc-checklist",
        cta: "Open checklist",
        desc: "Every step for your first 6 months, from BOC-3 to the new entrant safety audit.",
      },
      {
        name: "Broker check before you book",
        href: "/tools/carrier-lookup",
        cta: "Check a broker",
        desc: "Look up the broker on the rate con. Authority age, bond and any red flags.",
      },
    ],
    lookup: {
      href: "/tools/carrier-lookup",
      title: "Carrier Lookup",
      desc: "Search any carrier or broker by DOT, MC or name. Authority, insurance, inspections and crashes, summed up in a Health Score from 0 to 100.",
      demoName: "Carpathian Freight",
      demoMeta: "DOT 3412897 · Authorized · Insured",
      cta: "Check a carrier",
    },
    statesHeading: "Carriers by state",
  },
  RU: {
    badge: "БЕСПЛАТНО · БЕЗ РЕГИСТРАЦИИ",
    h1: "Инструменты для перевозчиков",
    intro:
      "Проверьте брокера до рейса, посчитайте, сколько груз платит на самом деле, и держите authority в порядке. Работает на открытых данных FMCSA.",
    tools: [
      {
        name: "Прибыль на милю",
        href: "/ru/tools/profit-per-mile",
        cta: "Посчитать",
        desc: "Топливо, страховка, платёж за трак. Узнайте реальную стоимость мили и минимальную ставку, которую стоит брать.",
      },
      {
        name: "Compliance-алерты",
        href: "/ru/tools/compliance-alerts",
        cta: "Настроить алерты",
        desc: "Получайте SMS, когда меняется ваш authority, страховой filing, UCR или safety-статус.",
      },
      {
        name: "Чеклист для нового MC",
        href: "/ru/tools/new-mc-checklist",
        cta: "Открыть чеклист",
        desc: "Все шаги первых 6 месяцев: от BOC-3 до safety audit для новых перевозчиков.",
      },
      {
        name: "Проверка брокера перед загрузкой",
        href: "/tools/carrier-lookup",
        cta: "Проверить брокера (на английском)",
        desc: "Найдите брокера из rate con. Возраст authority, bond и красные флаги. Сервис работает на английском.",
      },
    ],
    lookup: {
      href: "/tools/carrier-lookup",
      title: "Carrier Lookup",
      desc: "Ищите любого перевозчика или брокера по DOT, MC или названию. Authority, страховка, инспекции и аварии в одном Health Score от 0 до 100.",
      note: "Поиск работает на английском",
      demoName: "Carpathian Freight",
      demoMeta: "DOT 3412897 · Authorized · Insured",
      cta: "Проверить перевозчика",
    },
    statesHeading: "Перевозчики по штатам",
    statesNote: "Страницы штатов на английском",
  },
};
