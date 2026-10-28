import { describe, expect, it } from "vitest";
import { buildStateContent, formatCensusDate } from "@/features/carriers/model/state-content";
import type { CensusSource, StateCensus } from "@/features/carriers/model/census.schema";
import type { StateData } from "@/features/carriers/model/state-data.schema";

const raw: StateData = {
  stateAbbr: "AL",
  stateName: "Alabama",
  heroImage: "https://example.com/hero.jpg",
  heroAlt: "Alabama hero",
  dispatchCtaBody: "dispatch body",
  hireCtaBody: "hire body",
};

const census: StateCensus = {
  activeForHire: 7074,
  newLast12Months: 1094,
  smallFleetCount: 5500,
  smallFleetShare: 77.8,
  powerUnits: 61234,
  drivers: 70000,
  topCities: [{ city: "Birmingham", count: 810 }],
};

const source: CensusSource = {
  name: "FMCSA Company Census File",
  url: "https://data.transportation.gov/d/az4n-8mr2",
  datasetId: "az4n-8mr2",
  fetchedAt: "2026-10-28T18:47:00.897Z",
  filters: "test",
};

describe("buildStateContent", () => {
  it("puts the formatted carrier count in the title, description and hero", () => {
    const entry = buildStateContent(raw, census, source);
    expect(entry.title).toBe("Alabama trucking carriers: 7,074 active for-hire carriers (FMCSA data)");
    expect(entry.description).toContain("7,074 active interstate for-hire carriers");
    expect(entry.heroDescription).toContain("7,074");
    expect(entry.dispatchCtaEyebrow).toBe("ALABAMA OWNER-OPERATOR?");
    expect(entry.dispatchCtaTitle).toBe("Flat dispatch out of Alabama");
  });

  it("formats the census stats and top cities", () => {
    const entry = buildStateContent(raw, census, source);
    expect(entry.totalCount).toBe("7,074");
    expect(entry.stats).toEqual([
      { big: "7,074", small: "Active for-hire carriers" },
      { big: "1,094", small: "New carriers in the last 12 months" },
      { big: "78%", small: "Small fleets (1-5 power units)" },
      { big: "61,234", small: "Power units registered" },
    ]);
    expect(entry.topCities).toEqual([{ t: "Birmingham", count: "810" }]);
  });

  it("lets a raw override win over its template", () => {
    const entry = buildStateContent({ ...raw, description: "Custom", dispatchCtaTitle: "Custom title" }, census, source);
    expect(entry.description).toBe("Custom");
    expect(entry.dispatchCtaTitle).toBe("Custom title");
  });

  it("formats the source date as month and year", () => {
    expect(formatCensusDate(source.fetchedAt)).toBe("October 2026");
  });
});
