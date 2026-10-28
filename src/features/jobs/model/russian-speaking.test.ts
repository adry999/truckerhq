import { describe, it, expect } from "vitest";
import { JOBS } from "@/features/jobs/data/jobs";
import { CITY_SLUGS } from "@/features/jobs/data/city-content";
import { resolveJobsSlug } from "./jobs";
import { russianSpeakingJobs } from "./russian-speaking";

const SEGMENT = "russian-speaking";

describe("russianSpeakingJobs", () => {
  it("keeps only jobs flagged as Russian-speaking, in board order", () => {
    const result = russianSpeakingJobs();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((j) => j.russian)).toBe(true);
    expect(result.map((j) => j.slug)).toEqual(JOBS.filter((j) => j.russian).map((j) => j.slug));
  });

  it("returns an empty list when no job has Russian-speaking staff", () => {
    expect(russianSpeakingJobs(JOBS.map((j) => ({ ...j, russian: false })))).toEqual([]);
  });
});

describe("the /jobs/russian-speaking static route", () => {
  it("does not collide with any job or city slug", () => {
    expect(JOBS.map((j) => j.slug)).not.toContain(SEGMENT);
    expect(CITY_SLUGS).not.toContain(SEGMENT);
    expect(resolveJobsSlug(SEGMENT)).toEqual({ kind: "none" });
  });
});
