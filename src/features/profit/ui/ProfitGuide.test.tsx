// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfitGuide } from "./ProfitGuide";

describe("ProfitGuide", () => {
  it("renders the heading, the update date and the model's profit per mile", () => {
    render(<ProfitGuide />);
    expect(screen.getByRole("heading", { level: 2, name: "How to calculate profit per mile" })).toBeTruthy();
    expect(screen.getByText(/Updated October 2026/)).toBeTruthy();
    expect(screen.getByText("Profit per mile: $0.78/mi")).toBeTruthy();
  });
});
