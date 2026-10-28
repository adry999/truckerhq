import { describe, expect, it } from "vitest";
import { PROFIT_FAQ } from "@/features/profit";
import { faqSchema } from "@/shared/seo/structured-data";

describe("profit per mile page", () => {
  it("builds FAQPage JSON-LD with 4 to 6 questions", () => {
    const schema = faqSchema([...PROFIT_FAQ]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(4);
    expect(schema.mainEntity.length).toBeLessThanOrEqual(6);
  });
});
