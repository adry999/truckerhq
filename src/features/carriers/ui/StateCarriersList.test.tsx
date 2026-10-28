// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CARRIERS } from "@/features/carriers/data/carriers";
import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";
import { profileHref, StateCarriersListView } from "./StateCarriersList";

vi.mock("@/shared/hooks/useSearchParam", () => ({ useSearchParam: () => "All" }));

const row = (patch: Partial<StateCarrierRow>): StateCarrierRow => ({
  name: "Sample Freight",
  city: "Chicago",
  dot: "9999999",
  equipment: "Dry van",
  trucks: 3,
  status: "ACTIVE",
  score: 80,
  ...patch,
});

describe("StateCarriersList", () => {
  it("resolves a profile link only for DOTs that exist in the sample data", () => {
    expect(profileHref(CARRIERS[0].dot)).toBe(`/tools/carrier-lookup/${CARRIERS[0].slug}`);
    expect(profileHref("9999999")).toBeNull();
  });

  it("renders unknown sample carriers as plain text and known ones as links", () => {
    const known = CARRIERS[0];
    render(
      <StateCarriersListView
        stateAbbr="IL"
        stateName="Illinois"
        totalCount="400"
        equip="All"
        carriers={[row({ name: "Ghost Freight" }), row({ name: known.name, dot: known.dot })]}
      />,
    );
    expect(screen.getByText("Ghost Freight").closest("a")).toBeNull();
    expect(screen.getByText(known.name).closest("a")).toHaveAttribute(
      "href",
      `/tools/carrier-lookup/${known.slug}`,
    );
  });
});
