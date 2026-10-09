import { describe, expect, it } from "vitest";
import { buildStateContent } from "@/features/carriers/model/state-content";
import type { StateData } from "@/features/carriers/model/state-data.schema";

const raw: StateData = {
  stateAbbr: "AL",
  stateName: "Alabama",
  heroImage: "https://example.com/hero.jpg",
  heroAlt: "Alabama hero",
  stats: ["16,500", "398", "73", "2.6"],
  equipmentBreakdown: [{ t: "Dry van", pct: 44 }],
  topCities: [{ t: "Birmingham", count: "4,610" }],
  equipmentOptions: ["All", "Dry van"],
  dispatchCtaBody: "dispatch body",
  hireCtaBody: "hire body",
  carriers: [
    { name: "Magic City Freight Lines", city: "Birmingham", dot: "6014287", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  ],
};

describe("buildStateContent", () => {
  it("fills the state-name templates", () => {
    const entry = buildStateContent(raw);
    expect(entry.title).toBe("Alabama Carriers — DOT/MC Directory");
    expect(entry.description).toBe(
      "For-hire interstate carriers based in Alabama. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
    );
    expect(entry.heroDescription).toBe(
      "For-hire interstate carriers based in Alabama. Search, filter and check any Health Score.",
    );
    expect(entry.dispatchCtaEyebrow).toBe("ALABAMA OWNER-OPERATOR?");
    expect(entry.dispatchCtaTitle).toBe("Flat dispatch out of Alabama");
  });

  it("labels the stats and takes the total count from the first one", () => {
    const entry = buildStateContent(raw);
    expect(entry.totalCount).toBe("16,500");
    expect(entry.stats).toEqual([
      { big: "16,500", small: "Active for-hire carriers" },
      { big: "398", small: "New MCs in the last 30 days" },
      { big: "73", small: "Average Health Score" },
      { big: "2.6", small: "Trucks per carrier, average" },
    ]);
  });

  it("lets a raw override win over its template", () => {
    const entry = buildStateContent({ ...raw, description: "Custom", dispatchCtaTitle: "Custom title" });
    expect(entry.description).toBe("Custom");
    expect(entry.dispatchCtaTitle).toBe("Custom title");
    expect(entry.title).toBe("Alabama Carriers — DOT/MC Directory");
  });
});
