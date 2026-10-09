import { describe, it, expect } from "vitest";
import { findCarrier, findJob, CARRIERS, JOBS } from "./data";

describe("findCarrier / findJob", () => {
  it("finds an existing carrier by slug", () => {
    const carrier = findCarrier(CARRIERS[0].slug);
    expect(carrier).toBe(CARRIERS[0]);
  });

  it("returns undefined for an unknown carrier slug", () => {
    expect(findCarrier("does-not-exist")).toBeUndefined();
  });

  it("finds an existing job by slug", () => {
    const job = findJob(JOBS[0].slug);
    expect(job).toBe(JOBS[0]);
  });

  it("returns undefined for an unknown job slug", () => {
    expect(findJob("does-not-exist")).toBeUndefined();
  });

  it("every job's carrierSlug resolves to a real carrier", () => {
    for (const job of JOBS) {
      expect(findCarrier(job.carrierSlug), `job ${job.slug} -> carrier ${job.carrierSlug}`).toBeDefined();
    }
  });
});
