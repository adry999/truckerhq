import { describe, expect, it } from "vitest";
import { buildFilterHref } from "./filter-href";

describe("buildFilterHref", () => {
  it("sets the key and keeps the other params", () => {
    expect(buildFilterHref("/jobs", { q: "ohio" }, "equip", "Reefer")).toBe("/jobs?q=ohio&equip=Reefer");
  });

  it("removes the key when the value is the all value", () => {
    expect(buildFilterHref("/jobs", { type: "OTR", q: "x" }, "type", "All")).toBe("/jobs?q=x");
  });

  it("returns the bare base path when nothing is left", () => {
    expect(buildFilterHref("/guides", { cat: "Rates" }, "cat", "All")).toBe("/guides");
  });

  it("accepts URLSearchParams and encodes values", () => {
    const current = new URLSearchParams("type=OTR");
    expect(buildFilterHref("/guides", current, "cat", "Starting out")).toBe("/guides?type=OTR&cat=Starting+out");
  });

  it("honours a custom all value", () => {
    expect(buildFilterHref("/x", { a: "1" }, "a", "any", "any")).toBe("/x");
  });
});
