import { describe, it, expect } from "vitest";
import { CARRIERS } from "@/features/carriers/data/carriers";
import { findCarrier } from "./carriers";

describe("findCarrier", () => {
  it("finds an existing carrier by slug", () => {
    const carrier = findCarrier(CARRIERS[0].slug);
    expect(carrier).toBe(CARRIERS[0]);
  });

  it("returns undefined for an unknown carrier slug", () => {
    expect(findCarrier("does-not-exist")).toBeUndefined();
  });
});
