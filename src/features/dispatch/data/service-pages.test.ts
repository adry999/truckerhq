import { describe, expect, it } from "vitest";
import { TRAILER_TYPES } from "@/features/dispatch/model/dispatch-start";
import { DISPATCH_SERVICE_PAGES, findServicePage, type ServicePage } from "./service-pages";

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function wordCount(p: ServicePage): number {
  const text = [
    p.h1,
    p.intro,
    ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    ...p.faq.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

describe("dispatch service pages", () => {
  it("covers every wizard trailer type plus new authority, with unique slugs", () => {
    const slugs = DISPATCH_SERVICE_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect([...slugs].sort()).toEqual([...TRAILER_TYPES.map(slugify), "new-authority"].sort());
  });

  it("gives every page a unique title and description", () => {
    const titles = DISPATCH_SERVICE_PAGES.map((p) => p.title);
    const descriptions = DISPATCH_SERVICE_PAGES.map((p) => p.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it.each(DISPATCH_SERVICE_PAGES.map((p) => [p.slug, p] as const))("%s meets the SEO limits", (_slug, p) => {
    expect(p.title.length).toBeLessThanOrEqual(60);
    expect(p.description.length).toBeGreaterThanOrEqual(120);
    expect(p.description.length).toBeLessThanOrEqual(170);
    expect(p.sections.length).toBeGreaterThanOrEqual(3);
    expect(p.faq.length).toBeGreaterThanOrEqual(3);
    expect(wordCount(p)).toBeGreaterThanOrEqual(500);
  });

  it("uses unique section headings within and across pages", () => {
    const headings = DISPATCH_SERVICE_PAGES.flatMap((p) => p.sections.map((s) => s.heading));
    expect(new Set(headings).size).toBe(headings.length);
  });

  it("states no price", () => {
    for (const p of DISPATCH_SERVICE_PAGES) {
      expect(JSON.stringify(p)).not.toMatch(/\$\d/);
    }
  });

  it("finds a page by slug and returns undefined for unknown slugs", () => {
    expect(findServicePage("reefer")?.name).toBe("Reefer");
    expect(findServicePage("start")).toBeUndefined();
  });
});
