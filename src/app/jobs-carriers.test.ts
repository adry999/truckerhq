import { describe, it, expect } from "vitest";
import { JOBS } from "@/features/jobs";
import { findCarrier } from "@/features/carriers";

describe("jobs and carriers integrity", () => {
  it("every job's carrierSlug resolves to a real carrier", () => {
    for (const job of JOBS) {
      expect(findCarrier(job.carrierSlug), `job ${job.slug} -> carrier ${job.carrierSlug}`).toBeDefined();
    }
  });
});
