import type { Locale } from "@/shared/i18n/locale";

export type GrossComparisonCopy = {
  tenPercent: string;
  eightPercent: string;
  rows: [string, string, string][];
  weeklyGross: string;
  dispatcherHead: string;
  perWeekHead: string;
  perYearHead: string;
  flat: string;
  footnote: string;
  percentageHead: string;
};

export const GROSS_COMPARISON_COPY: Record<Locale, GrossComparisonCopy> = {
  EN: {
    tenPercent: "10% dispatcher",
    eightPercent: "8% dispatcher",
    rows: [
      ["What you pay", "8–10% of every load", "Same price every week"],
      ["Good week", "You pay more", "You keep more"],
      ["Dispatcher goal", "Bigger gross, any miles", "Loads that make you money"],
      ["Contract", "Often 3–12 months", "Week to week"],
      ["Broker checks", "Sometimes", "Every load"],
      ["Language", "English", "English and Russian"],
    ],
    weeklyGross: "Your weekly gross",
    dispatcherHead: "DISPATCHER",
    perWeekHead: "PER WEEK",
    perYearHead: "PER YEAR",
    flat: "Trucker HQ flat",
    footnote: "Per year = 50 working weeks. The flat price stays the same on a good week and a bad week.",
    percentageHead: "PERCENTAGE",
  },
  RU: {
    tenPercent: "Диспетчер за 10%",
    eightPercent: "Диспетчер за 8%",
    rows: [
      ["Сколько платите", "8–10% с каждого груза", "Одна цена каждую неделю"],
      ["Хорошая неделя", "Платите больше", "Вы оставляете себе больше"],
      ["Цель диспетчера", "Больше выручки, любые мили", "Грузы, которые приносят вам деньги"],
      ["Контракт", "Часто 3–12 месяцев", "Неделя за неделей"],
      ["Проверка брокера", "Иногда", "На каждый груз"],
      ["Язык", "Английский", "Английский и русский"],
    ],
    weeklyGross: "Ваша выручка в неделю",
    dispatcherHead: "ДИСПЕТЧЕР",
    perWeekHead: "В НЕДЕЛЮ",
    perYearHead: "В ГОД",
    flat: "Trucker HQ фикс",
    footnote: "В году = 50 рабочих недель. Фиксированная цена не меняется — ни в хорошую неделю, ни в плохую.",
    percentageHead: "ПРОЦЕНТ",
  },
};
