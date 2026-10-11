export const LOCALES = ["EN", "RU"] as const;
export type Locale = (typeof LOCALES)[number];

export function getCopy<T>(table: Record<Locale, T>, locale: Locale): T {
  return table[locale];
}
