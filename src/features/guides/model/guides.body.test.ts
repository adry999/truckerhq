import { describe, it, expect } from "vitest";
import { GUIDES } from "@/features/guides/data/guides";
import { FEATURED_SLUG, hasGuideBody } from "@/features/guides/model/guides";

describe("hasGuideBody", () => {
  it("is true only for the featured guide", () => {
    expect(GUIDES.filter(hasGuideBody).map((g) => g.slug)).toEqual([FEATURED_SLUG]);
  });
});
