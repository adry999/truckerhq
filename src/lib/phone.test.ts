import { describe, it, expect } from "vitest";
import { toUsE164 } from "@/lib/phone";

describe("toUsE164", () => {
  it.each(["(312) 555-0123", "312.555.0123", "+1 312 555 0123", "13125550123"])(
    "normalizes %s",
    (input) => expect(toUsE164(input)).toBe("+13125550123"),
  );

  it.each(["", "555-0123", "0125550123", "3121555012", "1312555012345", "abcdefghij"])(
    "rejects %j",
    (input) => expect(toUsE164(input)).toBeNull(),
  );
});
