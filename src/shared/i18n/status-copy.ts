import type { Locale } from "./locale";

type Exit = { label: string; href: string };

export type NotFoundCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  exits: Exit[];
  callPrefix: string;
};

export type ErrorCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  retryLabel: string;
  homeLabel: string;
  homeHref: string;
  refPrefix: string;
};

export const NOT_FOUND_COPY: Record<Locale, NotFoundCopy> = {
  EN: {
    eyebrow: "EXIT 404",
    heading: "Road closed",
    body: "This page doesn't exist or has moved. Take one of these exits instead.",
    exits: [
      { label: "Home", href: "/" },
      { label: "Dispatch", href: "/dispatch" },
      { label: "CDL jobs", href: "/jobs" },
      { label: "Carrier Lookup", href: "/tools/carrier-lookup" },
    ],
    callPrefix: "Or call dispatch 24/7: ",
  },
  RU: {
    eyebrow: "СЪЕЗД 404",
    heading: "Дорога закрыта",
    body: "Этой страницы нет, или она переехала. Воспользуйтесь одним из съездов ниже.",
    exits: [
      { label: "Главная", href: "/ru" },
      { label: "Диспетчинг", href: "/ru/dispatch" },
      { label: "Работа CDL", href: "/ru/jobs" },
      { label: "Проверка перевозчика", href: "/tools/carrier-lookup" },
    ],
    callPrefix: "Или позвоните в диспетчерскую 24/7: ",
  },
};

export const ERROR_COPY: Record<Locale, ErrorCopy> = {
  EN: {
    eyebrow: "SOMETHING BROKE DOWN",
    heading: "Roadside issue",
    body: "Something went wrong loading this page. Try again, or head back home.",
    retryLabel: "Try again",
    homeLabel: "Home",
    homeHref: "/",
    refPrefix: "Error ref: ",
  },
  RU: {
    eyebrow: "ЧТО-ТО СЛОМАЛОСЬ",
    heading: "Проблема на трассе",
    body: "Не удалось загрузить страницу. Попробуйте ещё раз или вернитесь на главную.",
    retryLabel: "Повторить",
    homeLabel: "Главная",
    homeHref: "/ru",
    refPrefix: "Код ошибки: ",
  },
};
