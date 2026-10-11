import { describe, expect, it } from "vitest";
import { STATE_CONTENT, STATE_SLUGS } from "@/features/carriers/data/states";

describe("state data", () => {
  it("parses every state file and gives each state carriers", () => {
    expect(STATE_SLUGS).toHaveLength(50);
    for (const slug of STATE_SLUGS) {
      expect(STATE_CONTENT[slug].carriers.length, slug).toBeGreaterThan(0);
    }
  });
});
