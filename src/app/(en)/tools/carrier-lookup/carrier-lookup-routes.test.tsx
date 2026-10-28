import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LOOKUP_FAQ } from "@/features/carriers";
import { faqSchema } from "@/shared/seo/structured-data";
import { metadata as landingMetadata } from "./page";
import { metadata as searchMetadata } from "./search/page";

describe("carrier lookup routes", () => {
  it("keeps the landing static: it never reads searchParams", () => {
    const source = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
    expect(source).not.toMatch(/searchParams|cookies\(|headers\(/);
  });

  it("noindexes search results and canonicalizes them to the landing", () => {
    expect(searchMetadata.robots).toEqual({ index: false, follow: true });
    expect(searchMetadata.alternates?.canonical).toBe("/tools/carrier-lookup");
    expect(landingMetadata.robots).toBeUndefined();
  });

  it("builds FAQPage JSON-LD from the landing FAQ", () => {
    const schema = faqSchema([...LOOKUP_FAQ]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(LOOKUP_FAQ.length);
    expect(LOOKUP_FAQ.length).toBeGreaterThanOrEqual(4);
  });
});
