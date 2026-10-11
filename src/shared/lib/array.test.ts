import { describe, expect, it } from "vitest";
import { toggleInArray } from "./array";

describe("toggleInArray", () => {
  it("adds a missing value at the end", () => {
    expect(toggleInArray(["a"], "b")).toEqual(["a", "b"]);
  });

  it("removes a present value without mutating the input", () => {
    const input = ["a", "b"];
    expect(toggleInArray(input, "a")).toEqual(["b"]);
    expect(input).toEqual(["a", "b"]);
  });
});
