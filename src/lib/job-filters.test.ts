import { describe, expect, it } from "vitest";
import { filterJobsByType } from "./job-filters";

const jobs = [
  { id: 1, type: "OTR" },
  { id: 2, type: "LOCAL" },
  { id: 3, type: "REGIONAL" },
];

describe("filterJobsByType", () => {
  it("returns every job for All", () => {
    expect(filterJobsByType(jobs, "All")).toHaveLength(3);
  });

  it("matches the type regardless of case", () => {
    expect(filterJobsByType(jobs, "local").map((j) => j.id)).toEqual([2]);
    expect(filterJobsByType(jobs, "OTR").map((j) => j.id)).toEqual([1]);
  });

  it("returns nothing for an unknown type", () => {
    expect(filterJobsByType(jobs, "TEAM")).toEqual([]);
  });
});
