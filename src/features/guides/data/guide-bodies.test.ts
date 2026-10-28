import { describe, expect, it } from "vitest";
import { GUIDES } from "@/features/guides/data/guides";
import { GUIDE_BODIES } from "@/features/guides/data/guide-bodies";
import type { GuideBodyData } from "@/features/guides/data/guide-body";
import { FEATURED_SLUG } from "@/features/guides/model/guides";

function words(body: GuideBodyData): number {
  const parts: string[] = [body.summary];
  for (const s of body.sections) {
    parts.push(s.heading);
    for (const b of s.blocks) {
      if (b.type === "p" || b.type === "callout") parts.push(b.text);
      if (b.type === "list") parts.push(...b.items);
      if (b.type === "table") parts.push(...b.head, ...b.rows.flat());
    }
  }
  for (const f of body.faqs) parts.push(f.q, f.a);
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

const stubs = GUIDES.filter((g) => g.slug !== FEATURED_SLUG);

describe("guide bodies", () => {
  it.each(stubs.map((g) => [g.slug]))("%s has a complete body", (slug) => {
    const body = GUIDE_BODIES[slug];
    expect(body).toBeDefined();
    expect(body.summary.length).toBeGreaterThan(80);
    expect(body.faqs.length).toBeGreaterThanOrEqual(3);
    expect(body.faqs.length).toBeLessThanOrEqual(5);
    const blocks = body.sections.flatMap((s) => s.blocks);
    expect(blocks.some((b) => b.type === "table" || b.type === "list")).toBe(true);
    for (const s of body.sources) expect(s.url).toMatch(/^https:\/\//);
    expect(words(body)).toBeGreaterThanOrEqual(600);
    expect(words(body)).toBeLessThanOrEqual(1300);
  });

  it("links only to existing guides", () => {
    const slugs = new Set(GUIDES.map((g) => g.slug));
    for (const body of Object.values(GUIDE_BODIES)) {
      const text = JSON.stringify(body);
      for (const m of text.matchAll(/\]\(\/guides\/([a-z0-9-]+)\)/g)) {
        expect(slugs.has(m[1])).toBe(true);
      }
    }
  });
});
