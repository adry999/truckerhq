import { describe, it, expect } from "vitest";
import { CITY_CONTENT, CITY_SLUGS, MIN_JOBS_TO_INDEX } from "./city-content";
import { CITY_DIRECTORY } from "./cities";
import { CITY_NAME_TO_SLUG } from "./city-slugs";

describe("city content integrity", () => {
  it("CITY_SLUGS lists every content entry", () => {
    expect(CITY_SLUGS).toHaveLength(Object.keys(CITY_CONTENT).length);
  });

  it("every entry has jobs, hiring carriers, nearby cities and FAQs", () => {
    for (const slug of CITY_SLUGS) {
      const entry = CITY_CONTENT[slug];
      expect(entry.jobs.length, `${slug} jobs`).toBeGreaterThan(0);
      expect(entry.hiringCarriers.length, `${slug} hiringCarriers`).toBeGreaterThan(0);
      expect(entry.nearbyCities.length, `${slug} nearbyCities`).toBeGreaterThan(0);
      expect(entry.faqs.length, `${slug} faqs`).toBeGreaterThan(0);
      expect(entry.jobs.length, `${slug} indexable`).toBeGreaterThanOrEqual(MIN_JOBS_TO_INDEX);
    }
  });

  it("CITY_DIRECTORY has one entry per city, matching the 'Open jobs' stat", () => {
    expect(CITY_DIRECTORY).toHaveLength(Object.keys(CITY_CONTENT).length);
    for (const dir of CITY_DIRECTORY) {
      expect(CITY_CONTENT[dir.slug].cityName).toBe(dir.name);
      expect(CITY_CONTENT[dir.slug].stats[0]?.big).toBe(dir.count);
    }
  });

  it("CITY_NAME_TO_SLUG covers every city and only real cities", () => {
    const slugValues = Object.values(CITY_NAME_TO_SLUG).sort();
    expect(slugValues).toEqual([...CITY_SLUGS].sort());
    for (const [name, slug] of Object.entries(CITY_NAME_TO_SLUG)) {
      expect(CITY_CONTENT[slug].cityName).toBe(name);
    }
  });

  it("MIN_JOBS_TO_INDEX is a sane positive threshold", () => {
    expect(MIN_JOBS_TO_INDEX).toBeGreaterThan(0);
  });
});
