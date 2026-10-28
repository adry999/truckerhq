import { describe, it, expect } from "vitest";
import { generateMetadata } from "./page";

describe("city jobs metadata", () => {
  it("noindexes a city whose listings are all sample", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "atlanta-ga" }) });
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(String(meta.title)).not.toMatch(/openings/i);
  });
});
