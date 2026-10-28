import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { GUIDES, hasGuideBody } from "@/features/guides";
import { DISPATCH_SERVICE_PAGES } from "@/features/dispatch";
import { SITE_URL } from "@/shared/config/site";

const urls = () => sitemap().map((e) => e.url);

describe("sitemap", () => {
  it("lists only guides that have a body", () => {
    const guideUrls = urls().filter((u) => u.includes("/guides/"));
    expect(guideUrls).toHaveLength(GUIDES.filter(hasGuideBody).length);
    expect(guideUrls).toHaveLength(1);
  });

  it("lists all 50 state pages now that their data is real FMCSA census data", () => {
    expect(urls().filter((u) => /\/carriers\/[^/]+$/.test(u))).toHaveLength(50);
  });

  it("leaves out city pages that have no real jobs", () => {
    expect(urls().some((u) => /\/jobs\/(?!russian-speaking$)[^/]+$/.test(u))).toBe(false);
  });

  it("lists every dispatch service page", () => {
    for (const p of DISPATCH_SERVICE_PAGES) {
      expect(urls()).toContain(`${SITE_URL}/dispatch/${p.slug}`);
    }
  });

  it("lists the Russian tool pages with hreflang pairs", () => {
    const ru = sitemap().find((e) => e.url === `${SITE_URL}/ru/tools/profit-per-mile`);
    expect(ru?.alternates?.languages).toMatchObject({ en: `${SITE_URL}/tools/profit-per-mile` });
  });

  it("lists the pricing pair and the Russian-speaking jobs page", () => {
    expect(urls()).toEqual(
      expect.arrayContaining([`${SITE_URL}/pricing`, `${SITE_URL}/ru/pricing`, `${SITE_URL}/jobs/russian-speaking`]),
    );
  });

  it("keeps the static routes", () => {
    expect(urls()).toEqual(expect.arrayContaining([expect.stringMatching(/\/guides$/), expect.stringMatching(/\/carriers$/)]));
  });
});
