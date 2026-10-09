import { describe, it, expect } from "vitest";
import { CARRIERS } from "@/features/carriers/data/carriers";
import {
  dataSourceNote,
  filterByStatus,
  matchSampleCarriers,
  modeHref,
  normalizeQuery,
  searchPlaceholder,
  statusHref,
} from "./lookup";

describe("normalizeQuery", () => {
  it("lowercases, trims and strips a DOT or MC prefix", () => {
    expect(normalizeQuery("  DOT 3412897 ")).toBe("3412897");
    expect(normalizeQuery("mc1182044")).toBe("1182044");
    expect(normalizeQuery("Freight")).toBe("freight");
  });
});

describe("matchSampleCarriers", () => {
  it("returns every carrier for an empty query", () => {
    expect(matchSampleCarriers(CARRIERS, "")).toHaveLength(CARRIERS.length);
  });

  it("matches by DOT number", () => {
    const hit = matchSampleCarriers(CARRIERS, "DOT 3412897");
    expect(hit.map((c) => c.dot)).toEqual(["3412897"]);
  });

  it("matches by name and returns nothing for gibberish", () => {
    expect(matchSampleCarriers(CARRIERS, "freight").length).toBeGreaterThan(0);
    expect(matchSampleCarriers(CARRIERS, "zzzz")).toEqual([]);
  });
});

describe("filterByStatus", () => {
  it("keeps all carriers for All and only the matching status otherwise", () => {
    expect(filterByStatus(CARRIERS, "All")).toHaveLength(CARRIERS.length);
    expect(filterByStatus(CARRIERS, "WARNING").every((c) => c.status === "WARNING")).toBe(true);
  });
});

describe("lookup links", () => {
  it("modeHref omits the mode for All", () => {
    expect(modeHref("All")).toBe("/tools/carrier-lookup");
    expect(modeHref("DOT")).toBe("/tools/carrier-lookup?mode=DOT");
  });

  it("statusHref keeps the query and omits the status for All", () => {
    expect(statusHref("freight", "All")).toBe("/tools/carrier-lookup?q=freight");
    expect(statusHref("freight", "ACTIVE")).toBe("/tools/carrier-lookup?q=freight&status=ACTIVE");
  });
});

describe("copy helpers", () => {
  it("picks the placeholder for each mode", () => {
    expect(searchPlaceholder("Name")).toBe("Company name");
    expect(searchPlaceholder("All")).toBe("Search any carrier by DOT, MC or name");
  });

  it("explains where the results came from", () => {
    expect(dataSourceNote(true, true)).toMatch(/Live data/);
    expect(dataSourceNote(false, true)).toMatch(/No live FMCSA match/);
    expect(dataSourceNote(false, false)).toMatch(/Sample data/);
  });
});
