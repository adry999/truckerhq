import { SITE_URL } from "@/shared/config/site";

// Routes that exist in both languages: [EN path, RU path]. The single source
// for page hreflang alternates and the sitemap.
export const LOCALIZED_ROUTES = [
  { en: "/", ru: "/ru" },
  { en: "/dispatch", ru: "/ru/dispatch" },
  { en: "/jobs", ru: "/ru/jobs" },
] as const;

type Pair = (typeof LOCALIZED_ROUTES)[number];

function findPair(path: string): Pair {
  const pair = LOCALIZED_ROUTES.find((r) => r.en === path || r.ru === path);
  if (!pair) throw new Error(`No localized route pair for ${path}`);
  return pair;
}

/** `alternates.languages` for a page, with relative paths. Accepts the EN or RU path. */
export function languageAlternates(path: string) {
  const { en, ru } = findPair(path);
  return { en, ru, "x-default": en };
}

/** Sitemap `alternates` for a route, with absolute URLs. Accepts the EN or RU path. */
export function sitemapAlternates(path: string) {
  const { en, ru } = findPair(path);
  return { languages: { en: `${SITE_URL}${en}`, ru: `${SITE_URL}${ru}`, "x-default": `${SITE_URL}${en}` } };
}
