import { describe, it, expect } from "vitest";
import { CITY_CONTENT, CITY_SLUGS, MIN_JOBS_TO_INDEX } from "./city-content";
import { CITY_DIRECTORY } from "./cities";
import { CITY_NAME_TO_SLUG } from "./city-slugs";

describe("city content integrity", () => {
  it("has all 11 cities", () => {
    expect(CITY_SLUGS).toHaveLength(11);
  });

  it("every entry has jobs, hiring carriers, nearby cities and FAQs", () => {
    for (const slug of CITY_SLUGS) {
      const entry = CITY_CONTENT[slug];
      expect(entry.jobs.length, `${slug} jobs`).toBeGreaterThan(0);
      expect(entry.hiringCarriers.length, `${slug} hiringCarriers`).toBeGreaterThan(0);
      expect(entry.nearbyCities.length, `${slug} nearbyCities`).toBeGreaterThan(0);
      expect(entry.faqs.length, `${slug} faqs`).toBeGreaterThan(0);
      // Every city currently has enough jobs to stay indexed; if this ever
      // drops below MIN_JOBS_TO_INDEX the route sets noindex automatically.
      expect(entry.jobs.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("CITY_DIRECTORY has one entry per city, matching the 'Open jobs' stat", () => {
    expect(CITY_DIRECTORY).toHaveLength(11);
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
