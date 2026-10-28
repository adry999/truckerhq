import { describe, it, expect } from "vitest";
import { toUsE164 } from "@/shared/lib/phone";

describe("toUsE164", () => {
  it.each(["(312) 555-0123", "312.555.0123", "+1 312 555 0123", "13125550123"])(
    "normalizes %s",
    (input) => expect(toUsE164(input)).toBe("+13125550123"),
  );

  it.each([
    "",
    "555-0123",
    "0125550123",
    "3121555012",
    "1312555012345",
    "abcdefghij",
  ])("rejects %j", (input) => expect(toUsE164(input)).toBeNull());

  it.each([
    "416-555-0123",
    "(604) 555 0123",
    "+1 876 555 0123",
    "2425550123",
    "4415550123",
  ])("rejects Canadian, Bermudian and Caribbean number %j", (input) =>
    expect(toUsE164(input)).toBeNull(),
  );

  it.each(["787 555 0123", "939 555 0123", "340 555 0123", "671 555 0123"])(
    "keeps US territory number %j",
    (input) => expect(toUsE164(input)).toMatch(/^\+1\d{10}$/),
  );
});
