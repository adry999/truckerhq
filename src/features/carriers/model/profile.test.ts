import { describe, it, expect } from "vitest";
import { CARRIERS } from "@/features/carriers/data/carriers";
import type { Carrier } from "@/features/carriers/model/carriers.types";
import { authorityAge, profileCta, profilePanels, scoreBreakdown } from "./profile";

const base = CARRIERS[0];
const make = (patch: Partial<Carrier>): Carrier => ({ ...base, ...patch });

describe("authorityAge", () => {
  it("shows months under a year and years plus months after", () => {
    expect(authorityAge(make({ ageMonths: 5 }))).toBe("5 months");
    expect(authorityAge(make({ ageMonths: 26 }))).toBe("2 yr 2 mo");
  });
});

describe("scoreBreakdown", () => {
  it("scores an inactive authority at zero", () => {
    const authority = scoreBreakdown(make({ status: "INACTIVE" }))[0];
    expect(authority.v).toBe(0);
  });

  it("never lets crashes push the score below zero", () => {
    const crashes = scoreBreakdown(make({ crashes: 9 }))[3];
    expect(crashes.v).toBe(0);
  });
});

describe("profileCta", () => {
  it("prefers the reinstate checklist for an inactive carrier", () => {
    expect(profileCta(make({ status: "INACTIVE" })).href).toBe("/tools/new-mc-checklist");
  });

  it("offers Starter MC dispatch for a new MC", () => {
    expect(profileCta(make({ status: "ACTIVE", ageMonths: 3 })).href).toBe("/dispatch");
  });

  it("offers driver hiring for a larger healthy fleet", () => {
    const c = make({ status: "ACTIVE", ageMonths: 40, insurance: "ok", trucks: 5 });
    expect(profileCta(c).href).toBe("/hire-drivers");
  });
});

describe("profilePanels", () => {
  it("flags vehicle out-of-service rates above the national average", () => {
    const rows = profilePanels(make({ oosVehicle: 40 }), "#000")[1].rows;
    expect(rows[1][2]).toBe("#B42318");
  });
});
