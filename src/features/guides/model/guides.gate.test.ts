import { afterEach, describe, expect, it, vi } from "vitest";
import { GUIDES } from "@/features/guides/data/guides";
import { GUIDE_BODIES } from "@/features/guides/data/guide-bodies";
import { FEATURED_SLUG, getGuideBody, hasGuideBody, isDraftPreview } from "@/features/guides/model/guides";

const draft = GUIDES.find((g) => g.slug !== FEATURED_SLUG)!;

afterEach(() => {
  vi.unstubAllEnvs();
  GUIDE_BODIES[draft.slug].reviewStatus = "draft";
});

describe("guide publishing gate", () => {
  it("keeps every drafted guide unpublished", () => {
    expect(GUIDES.filter(hasGuideBody).map((g) => g.slug)).toEqual([FEATURED_SLUG]);
  });

  it("hides the draft body in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isDraftPreview(draft)).toBe(false);
    expect(hasGuideBody(draft)).toBe(false);
  });

  it("previews the draft body outside production", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(getGuideBody(draft)?.reviewStatus).toBe("draft");
    expect(isDraftPreview(draft)).toBe(true);
    expect(hasGuideBody(draft)).toBe(false);
  });

  it("publishes an approved body in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    GUIDE_BODIES[draft.slug].reviewStatus = "approved";
    expect(hasGuideBody(draft)).toBe(true);
    expect(isDraftPreview(draft)).toBe(false);
  });
});
