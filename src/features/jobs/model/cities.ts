import { CITY_CONTENT, CITY_SLUGS } from "@/features/jobs/data/city-content";

export type CityDirectoryEntry = {
  name: string;
  slug: string;
};

export const CITY_DIRECTORY: CityDirectoryEntry[] = CITY_SLUGS.map((slug) => ({
  name: CITY_CONTENT[slug].cityName,
  slug,
}));
