export type JobsCopy = {
  h1Line1: string;
  h1Line2: string;
  heroBody: string;
  searchAriaLabel: string;
  searchPlaceholder: string;
  searchButton: string;
  jobTypeLabel: string;
  equipmentLabel: string;
  countLabel: (n: number) => string;
  newestFirst: string;
  ruSpokenBadge: string;
  viewJobLabel: string;
  noResultsText: string;
  browseByCityHeading: string;
  carriersEyebrow: string;
  carriersHeading: string;
  hireDriversCta: string;
  basePath: string;
};

export const JOBS_COPY: Record<"EN" | "RU", JobsCopy> = {
  EN: {
    h1Line1: "CDL jobs.",
    h1Line2: "Pay posted up front.",
    heroBody:
      "Every job shows the pay and home time. Every carrier shows its Health Score. Apply in English or Russian.",
    searchAriaLabel: "Search jobs",
    searchPlaceholder: "City, state or company",
    searchButton: "Find jobs",
    jobTypeLabel: "JOB TYPE",
    equipmentLabel: "EQUIPMENT",
    countLabel: (n) => `${n} job${n === 1 ? "" : "s"}`,
    newestFirst: "Newest first",
    ruSpokenBadge: "RU SPOKEN",
    viewJobLabel: "VIEW JOB →",
    noResultsText: "No jobs match these filters. Try fewer filters.",
    browseByCityHeading: "Browse jobs by city",
    carriersEyebrow: "CARRIERS",
    carriersHeading: "Need a driver? Post a job here.",
    hireDriversCta: "Hire drivers",
    basePath: "/jobs",
  },
  RU: {
    h1Line1: "Работа CDL.",
    h1Line2: "Оплата указана сразу.",
    heroBody: "В каждой вакансии — оплата и время дома. У каждого перевозчика — Health Score. Отклик на английском или русском.",
    searchAriaLabel: "Поиск вакансий",
    searchPlaceholder: "Город, штат или компания",
    searchButton: "Найти работу",
    jobTypeLabel: "ТИП РАБОТЫ",
    equipmentLabel: "ОБОРУДОВАНИЕ",
    countLabel: (n) => `${n} ваканси${n === 1 ? "я" : n >= 2 && n <= 4 ? "и" : "й"}`,
    newestFirst: "Сначала новые",
    ruSpokenBadge: "ГОВОРИМ ПО-РУССКИ",
    viewJobLabel: "СМОТРЕТЬ →",
    noResultsText: "Нет вакансий по этим фильтрам. Попробуйте убрать часть фильтров.",
    browseByCityHeading: "Вакансии по городам",
    carriersEyebrow: "ПЕРЕВОЗЧИКАМ",
    carriersHeading: "Нужен водитель? Разместите вакансию здесь.",
    hireDriversCta: "Нанять водителей",
    basePath: "/ru/jobs",
  },
};
