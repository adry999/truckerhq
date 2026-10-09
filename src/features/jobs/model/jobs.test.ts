import { describe, it, expect } from "vitest";
import { JOBS } from "@/features/jobs/data/jobs";
import { CITY_SLUGS } from "@/features/jobs/data/city-content";
import {
  DEFAULT_CARRIER_SCORE,
  findJob,
  jobFacts,
  jobSections,
  jobsStaticSlugs,
  resolveJobsSlug,
  withCarrierScores,
} from "./jobs";

describe("findJob", () => {
  it("finds an existing job by slug", () => {
    expect(findJob(JOBS[0].slug)).toBe(JOBS[0]);
  });

  it("returns undefined for an unknown job slug", () => {
    expect(findJob("does-not-exist")).toBeUndefined();
  });
});

describe("resolveJobsSlug", () => {
  it("resolves a city slug to its content", () => {
    const r = resolveJobsSlug(CITY_SLUGS[0]);
    expect(r.kind).toBe("city");
    if (r.kind === "city") expect(r.slug).toBe(CITY_SLUGS[0]);
  });

  it("resolves a job slug to the job", () => {
    expect(resolveJobsSlug(JOBS[0].slug)).toEqual({ kind: "job", job: JOBS[0] });
  });

  it("returns none for an unknown slug", () => {
    expect(resolveJobsSlug("does-not-exist")).toEqual({ kind: "none" });
  });
});

describe("jobsStaticSlugs", () => {
  it("lists job slugs first, then city slugs", () => {
    const slugs = jobsStaticSlugs().map((s) => s.slug);
    expect(slugs).toEqual([...JOBS.map((j) => j.slug), ...CITY_SLUGS]);
  });
});

describe("withCarrierScores", () => {
  it("uses the carrier score and falls back to the default", () => {
    const scored = withCarrierScores(JOBS, (slug) => (slug === JOBS[0].carrierSlug ? 90 : undefined));
    expect(scored[0].score).toBe(90);
    const other = scored.find((j) => j.carrierSlug !== JOBS[0].carrierSlug);
    expect(other?.score).toBe(DEFAULT_CARRIER_SCORE);
  });
});

describe("jobFacts / jobSections", () => {
  it("builds the fact grid from the job", () => {
    const facts = jobFacts(JOBS[0]);
    expect(facts[0]).toEqual(["PAY", JOBS[0].pay, "text-green"]);
    expect(facts).toHaveLength(6);
  });

  it("mentions Russian dispatch only for Russian-speaking jobs", () => {
    const ru = JOBS.find((j) => j.russian)!;
    const en = JOBS.find((j) => !j.russian)!;
    expect(jobSections(ru)[0].items.join(" ")).toContain("English and Russian");
    expect(jobSections(en)[0].items.join(" ")).not.toContain("Russian");
  });

  it("describes local routes for LOCAL jobs", () => {
    const local = JOBS.find((j) => j.type === "LOCAL")!;
    expect(jobSections(local)[0].items[0]).toContain(`local routes around ${local.loc}`);
  });
});
