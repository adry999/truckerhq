import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { GUIDES, hasGuideBody } from "@/features/guides";

const urls = () => sitemap().map((e) => e.url);

describe("sitemap", () => {
  it("lists only guides that have a body", () => {
    const guideUrls = urls().filter((u) => u.includes("/guides/"));
    expect(guideUrls).toHaveLength(GUIDES.filter(hasGuideBody).length);
    expect(guideUrls).toHaveLength(1);
  });

  it("leaves out state pages while their data is sample", () => {
    expect(urls().some((u) => /\/carriers\/[^/]+$/.test(u))).toBe(false);
  });

  it("leaves out city pages that have no real jobs", () => {
    expect(urls().some((u) => /\/jobs\/[^/]+$/.test(u))).toBe(false);
  });

  it("keeps the static routes", () => {
    expect(urls()).toEqual(expect.arrayContaining([expect.stringMatching(/\/guides$/), expect.stringMatching(/\/carriers$/)]));
  });
});
