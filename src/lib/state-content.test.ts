import { describe, it, expect } from "vitest";
import { STATE_CONTENT, STATE_SLUGS } from "./state-content";
import { STATE_DIRECTORY } from "./states";

describe("state content integrity", () => {
  it("has all 50 states", () => {
    expect(STATE_SLUGS).toHaveLength(50);
  });

  it("every entry has carriers and non-empty content", () => {
    for (const slug of STATE_SLUGS) {
      const entry = STATE_CONTENT[slug];
      expect(entry.carriers.length, `${slug} carriers`).toBeGreaterThan(0);
      expect(entry.stats.length, `${slug} stats`).toBeGreaterThan(0);
      expect(entry.equipmentBreakdown.length, `${slug} equipmentBreakdown`).toBeGreaterThan(0);
      expect(entry.topCities.length, `${slug} topCities`).toBeGreaterThan(0);
      expect(entry.title).toContain(entry.stateName);
    }
  });

  it("STATE_DIRECTORY has one entry per state, matching totalCount", () => {
    expect(STATE_DIRECTORY).toHaveLength(50);
    for (const dir of STATE_DIRECTORY) {
      expect(STATE_CONTENT[dir.slug].totalCount).toBe(dir.count);
      expect(STATE_CONTENT[dir.slug].stateName).toBe(dir.name);
    }
  });

  it("STATE_DIRECTORY is sorted alphabetically by name", () => {
    const names = STATE_DIRECTORY.map((s) => s.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });
});
