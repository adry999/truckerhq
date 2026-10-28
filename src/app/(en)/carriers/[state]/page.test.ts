import { describe, it, expect } from "vitest";
import { generateMetadata } from "./page";
import { STATE_DATA_IS_SAMPLE } from "@/features/carriers";

describe("state page metadata", () => {
  it("noindexes state pages while the data is sample", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ state: "texas" }) });
    expect(STATE_DATA_IS_SAMPLE).toBe(true);
    expect(meta.robots).toEqual({ index: false, follow: true });
  });
});
