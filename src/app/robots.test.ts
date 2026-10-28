import { describe, it, expect } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("keeps noindex pages crawlable and blocks only the live carrier lookup", () => {
    const { rules } = robots();
    const rule = Array.isArray(rules) ? rules[0] : rules;
    expect(rule.disallow).toEqual(["/tools/carrier-lookup?"]);
  });
});
