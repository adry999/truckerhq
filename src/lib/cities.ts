import { CITY_CONTENT, CITY_SLUGS } from "@/lib/city-content";

export type CityDirectoryEntry = {
  name: string;
  slug: string;
  count: string;
};

export const CITY_DIRECTORY: CityDirectoryEntry[] = CITY_SLUGS.map((slug) => ({
  name: CITY_CONTENT[slug].cityName,
  slug,
  count: CITY_CONTENT[slug].stats[0]?.big ?? "",
}));
