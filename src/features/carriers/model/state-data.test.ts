import { describe, expect, it } from "vitest";
import { STATE_CONTENT, STATE_SLUGS } from "@/features/carriers/data/states";
import censusJson from "@/features/carriers/data/states/census.json";
import { parseCensus } from "@/features/carriers/model/census.schema";

describe("state data", () => {
  it("parses every state file and gives each state census numbers", () => {
    expect(STATE_SLUGS).toHaveLength(50);
    const census = parseCensus(censusJson);
    for (const slug of STATE_SLUGS) {
      expect(census.states[slug].activeForHire, slug).toBeGreaterThan(0);
      expect(STATE_CONTENT[slug].topCities.length, slug).toBeGreaterThan(0);
    }
  });

  it("keeps the old invented figures out of every state page", () => {
    const text = JSON.stringify(STATE_CONTENT);
    expect(text).not.toContain("48,210");
    expect(text).not.toContain("1,284");
    expect(text).not.toContain("Lone Star Freightways");
  });

  it("records where the census came from", () => {
    const { source } = parseCensus(censusJson);
    expect(source.datasetId).toBe("az4n-8mr2");
    expect(source.url).toContain("data.transportation.gov");
  });
});
