import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/shared/config/site";
import { LOCALIZED_ROUTES, languageAlternates, sitemapAlternates } from "./alternates";

describe("languageAlternates", () => {
  it("gives the same relative pair from the EN or the RU path, with the EN page as x-default", () => {
    const expected = { en: "/dispatch", ru: "/ru/dispatch", "x-default": "/dispatch" };
    expect(languageAlternates("/dispatch")).toEqual(expected);
    expect(languageAlternates("/ru/dispatch")).toEqual(expected);
  });

  it("maps the home page to /ru", () => {
    expect(languageAlternates("/")).toEqual({ en: "/", ru: "/ru", "x-default": "/" });
    expect(languageAlternates("/ru")).toEqual({ en: "/", ru: "/ru", "x-default": "/" });
  });

  it("rejects a path that has no translation", () => {
    expect(() => languageAlternates("/about")).toThrow(/No localized route pair/);
  });
});

describe("sitemapAlternates", () => {
  it("prefixes every language with the site URL", () => {
    expect(sitemapAlternates("/jobs")).toEqual({
      languages: {
        en: `${SITE_URL}/jobs`,
        ru: `${SITE_URL}/ru/jobs`,
        "x-default": `${SITE_URL}/jobs`,
      },
    });
  });

  it("produces alternates for every listed route from either side", () => {
    for (const { en, ru } of LOCALIZED_ROUTES) {
      expect(sitemapAlternates(ru)).toEqual(sitemapAlternates(en));
    }
  });
});
