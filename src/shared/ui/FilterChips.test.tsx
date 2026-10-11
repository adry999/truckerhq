// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FilterChips } from "./FilterChips";

describe("FilterChips", () => {
  it("marks only the active chip with aria-current and builds filter hrefs", () => {
    render(
      <FilterChips
        param="equip"
        options={["All", "Reefer", "Flatbed"]}
        current={{ equip: "Reefer", q: "ohio" }}
        basePath="/jobs"
        label="Equipment"
      />,
    );
    expect(screen.getByRole("navigation", { name: "Equipment" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Reefer" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Flatbed" }).getAttribute("aria-current")).toBeNull();
    expect(screen.getByRole("link", { name: "Flatbed" }).getAttribute("href")).toBe("/jobs?equip=Flatbed&q=ohio");
    expect(screen.getByRole("link", { name: "All" }).getAttribute("href")).toBe("/jobs?q=ohio");
  });

  it("treats All as active when the param is missing", () => {
    render(<FilterChips param="cat" options={["All", "Rates"]} current={{}} basePath="/guides" label="Category" />);
    expect(screen.getByRole("link", { name: "All" }).getAttribute("aria-current")).toBe("page");
  });
});
