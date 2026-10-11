import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  text,
  requiredText,
  usPhone,
  optionalUsPhone,
  textList,
  dotNumber,
  withChecks,
} from "./fields";

describe("text", () => {
  it("trims and caps length", () => {
    expect(text(10).parse("  hello  ")).toBe("hello");
    expect(text(5).parse("a very long string")).toBe("a ver");
  });

  it("returns empty string for non-strings", () => {
    for (const v of [undefined, null, 123, {}, ["x"]]) expect(text(10).parse(v)).toBe("");
  });
});

describe("requiredText", () => {
  it("passes non-empty text through trimmed and capped", () => {
    expect(requiredText(5, "req").parse("  abcdefg ")).toBe("abcde");
  });

  it("fails with the given message when empty or not a string", () => {
    for (const v of ["", "   ", undefined, 5]) {
      const res = requiredText(5, "req").safeParse(v);
      expect(res.success).toBe(false);
      expect(res.error?.issues[0]?.message).toBe("req");
    }
  });
});

describe("usPhone", () => {
  it("normalizes to E.164", () => {
    expect(usPhone().parse("(312) 555-0123")).toBe("+13125550123");
  });

  it("fails with the default or custom message", () => {
    expect(usPhone().safeParse("555-0123").error?.issues[0]?.message).toBe(
      "Enter a valid US phone number",
    );
    expect(usPhone("bad").safeParse("x").error?.issues[0]?.message).toBe("bad");
  });
});

describe("optionalUsPhone", () => {
  it("allows empty, normalizes valid, rejects invalid", () => {
    expect(optionalUsPhone().parse("")).toBe("");
    expect(optionalUsPhone().parse("312-555-0123")).toBe("+13125550123");
    expect(optionalUsPhone().safeParse("12").success).toBe(false);
  });
});

describe("textList", () => {
  it("caps items and length, drops empties", () => {
    expect(textList(2, 3).parse([" abcd ", "", "efg", "hij"])).toEqual(["abc"]);
  });

  it("returns [] for non-arrays", () => {
    expect(textList(2, 3).parse("abc")).toEqual([]);
    expect(textList(2, 3).parse(undefined)).toEqual([]);
  });
});

describe("dotNumber", () => {
  it("keeps digits only", () => {
    expect(dotNumber().parse("DOT 1234567")).toBe("1234567");
  });

  it.each(["abc", "", "123456789"])("rejects %j", (v) => {
    expect(dotNumber().safeParse(v).error?.issues[0]?.message).toBe("Enter a valid DOT number");
  });
});

describe("withChecks", () => {
  const schema = withChecks(
    z.object({ a: requiredText(5, "missing"), phone: text(30), b: requiredText(5, "missing") }),
    { phone: usPhone() },
  );

  it("reports missing fields before format problems", () => {
    const res = schema.safeParse({ phone: "bad", a: "x" });
    expect(res.error?.issues[0]?.message).toBe("missing");
  });

  it("applies checks and merges results", () => {
    expect(schema.parse({ a: "x", b: "y", phone: "312 555 0123" })).toEqual({
      a: "x",
      b: "y",
      phone: "+13125550123",
    });
    expect(schema.safeParse({ a: "x", b: "y", phone: "bad" }).error?.issues[0]?.message).toBe(
      "Enter a valid US phone number",
    );
  });
});
