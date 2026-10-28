import { describe, expect, it } from "vitest";
import { metadata } from "./page";

describe("/ru/dispatch/start metadata", () => {
  it("is noindex, canonical to itself and paired with the EN wizard", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates?.canonical).toBe("/ru/dispatch/start");
    expect(metadata.alternates?.languages).toEqual({
      en: "/dispatch/start",
      ru: "/ru/dispatch/start",
      "x-default": "/dispatch/start",
    });
  });
});
