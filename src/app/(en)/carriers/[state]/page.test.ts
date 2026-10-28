import { describe, it, expect } from "vitest";
import { generateMetadata } from "./page";
import { STATE_DATA_IS_SAMPLE } from "@/features/carriers";

describe("state page metadata", () => {
  it("is indexable now that the numbers come from the FMCSA census", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ state: "texas" }) });
    expect(STATE_DATA_IS_SAMPLE).toBe(false);
    expect(meta.robots).toBeUndefined();
  });

  it("puts the real carrier count in the title and not the old sample numbers", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ state: "texas" }) });
    expect(JSON.stringify(meta)).toMatch(/Texas trucking carriers: [\d,]+ active for-hire carriers \(FMCSA data\)/);
    expect(JSON.stringify(meta)).not.toContain("48,210");
  });
});
