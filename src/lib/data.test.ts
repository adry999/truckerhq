import { describe, it, expect } from "vitest";
import { JOBS } from "@/features/jobs";
import { findCarrier, CARRIERS } from "./data";

describe("findCarrier", () => {
  it("finds an existing carrier by slug", () => {
    const carrier = findCarrier(CARRIERS[0].slug);
    expect(carrier).toBe(CARRIERS[0]);
  });

  it("returns undefined for an unknown carrier slug", () => {
    expect(findCarrier("does-not-exist")).toBeUndefined();
  });

  it("every job's carrierSlug resolves to a real carrier", () => {
    for (const job of JOBS) {
      expect(findCarrier(job.carrierSlug), `job ${job.slug} -> carrier ${job.carrierSlug}`).toBeDefined();
    }
  });
});
