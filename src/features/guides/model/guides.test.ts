import { describe, expect, it } from "vitest";
import { GUIDES } from "@/features/guides/data/guides";
import {
  FEATURED_SLUG,
  FEATURED_SUMMARY,
  findGuide,
  guideDescription,
  readNextGuides,
  updatedLabel,
} from "@/features/guides/model/guides";

describe("guides model", () => {
  it("finds a guide by slug and returns undefined for an unknown one", () => {
    expect(findGuide(FEATURED_SLUG)?.slug).toBe(FEATURED_SLUG);
    expect(findGuide("nope")).toBeUndefined();
  });

  it("lists read-next guides without the current one", () => {
    const current = findGuide("when-to-turn-down-a-load")!;
    const slugs = readNextGuides(current).map((g) => g.slug);
    expect(slugs).toHaveLength(2);
    expect(slugs).not.toContain(current.slug);
  });

  it("uses the featured summary only for the featured guide", () => {
    expect(guideDescription(findGuide(FEATURED_SLUG)!)).toBe(FEATURED_SUMMARY);
    const other = GUIDES.find((g) => g.slug !== FEATURED_SLUG)!;
    expect(guideDescription(other)).toContain(`${other.minutes} min read`);
  });

  it("formats the updated label as short month and year", () => {
    expect(updatedLabel("2026-10-15")).toBe("Updated Oct 2026");
  });
});
