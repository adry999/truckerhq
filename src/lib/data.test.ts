import { describe, it, expect } from "vitest";
import { healthColor, healthOnColor, healthTextColor, healthLabel, findCarrier, findJob, CARRIERS, JOBS } from "./data";

describe("health score bands", () => {
  it("labels >=80 as GOOD, 60-79 as WATCH, <60 as RISK", () => {
    expect(healthLabel(100)).toBe("GOOD");
    expect(healthLabel(80)).toBe("GOOD");
    expect(healthLabel(79)).toBe("WATCH");
    expect(healthLabel(60)).toBe("WATCH");
    expect(healthLabel(59)).toBe("RISK");
    expect(healthLabel(0)).toBe("RISK");
  });

  it("healthColor and healthTextColor agree with healthLabel's bands", () => {
    for (const score of [95, 80, 79, 60, 59, 10]) {
      const label = healthLabel(score);
      const color = healthColor(score);
      const textColor = healthTextColor(score);
      if (label === "GOOD") {
        expect(color).toBe("#0E5C3A");
        expect(textColor).toBe("#0E5C3A");
      } else if (label === "WATCH") {
        expect(color).toBe("#F2A900");
        expect(textColor).toBe("#7A5300");
      } else {
        expect(color).toBe("#B42318");
        expect(textColor).toBe("#B42318");
      }
    }
  });
});

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

describe("healthOnColor", () => {
  it("uses dark text only on the amber WATCH band", () => {
    expect(healthOnColor(79)).toBe("#16181B");
    expect(healthOnColor(60)).toBe("#16181B");
    expect(healthOnColor(80)).toBe("#F7F7F5");
    expect(healthOnColor(59)).toBe("#F7F7F5");
  });
});
