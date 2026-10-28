import { describe, it, expect } from "vitest";
import { CITY_CONTENT, CITY_SLUGS } from "./city-content";
import { MIN_JOBS_TO_INDEX, isCityIndexable, realJobCount } from "@/features/jobs/model/jobs";
import { CITY_DIRECTORY } from "@/features/jobs/model/cities";
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
    }
  });

  it("CITY_DIRECTORY has one entry per city", () => {
    expect(CITY_DIRECTORY).toHaveLength(Object.keys(CITY_CONTENT).length);
    for (const dir of CITY_DIRECTORY) {
      expect(CITY_CONTENT[dir.slug].cityName).toBe(dir.name);
    }
  });

  it("carries no invented opening counts or freshness claims", () => {
    for (const slug of CITY_SLUGS) {
      const { title, description, heroIntro, stats } = CITY_CONTENT[slug];
      expect(title, slug).not.toMatch(/\d+ openings/i);
      expect(`${description} ${heroIntro}`, slug).not.toMatch(/updated (today|daily)|\d+ truck driving jobs/i);
      expect(stats.map((s) => s.small), slug).not.toContain("Open jobs");
    }
  });

  it("marks every listing as sample, so no city counts as indexable yet", () => {
    for (const slug of CITY_SLUGS) {
      expect(realJobCount(CITY_CONTENT[slug]), slug).toBe(0);
      expect(isCityIndexable(CITY_CONTENT[slug]), slug).toBe(false);
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
