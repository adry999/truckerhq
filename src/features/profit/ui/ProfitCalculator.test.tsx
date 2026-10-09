// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfitCalculator } from "./ProfitCalculator";

async function setField(label: string, value: string) {
  const input = screen.getByLabelText(new RegExp(`^${label}`));
  await userEvent.clear(input);
  await userEvent.type(input, value);
}

describe("ProfitCalculator", () => {
  it("renders every input with its label", () => {
    render(<ProfitCalculator />);
    for (const label of ["Load pay", "Loaded miles", "Deadhead miles", "Diesel price", "Fuel economy", "Miles per week"]) {
      expect(screen.getByLabelText(new RegExp(`^${label}`))).toBeInTheDocument();
    }
  });

  it("shows the example profit per mile by default", () => {
    render(<ProfitCalculator />);
    expect(screen.getByText("$0.78")).toBeInTheDocument();
    expect(screen.getByText("GOOD LOAD")).toBeInTheDocument();
  });

  it("updates profit per mile when the rate changes", async () => {
    render(<ProfitCalculator />);
    await setField("Load pay", "4000");
    expect(screen.getByText("$2.21")).toBeInTheDocument();
    expect(screen.queryByText("$0.78")).not.toBeInTheDocument();
  });

  it("keeps a cleared field empty while typing and counts it as zero", async () => {
    render(<ProfitCalculator />);
    const input = screen.getByLabelText(/^Load pay/);
    await userEvent.clear(input);
    expect(input).toHaveValue(null);
    expect(screen.getByText("−$1.36")).toBeInTheDocument();
  });

  it("links the field note to its input", () => {
    render(<ProfitCalculator />);
    expect(screen.getByLabelText(/^Deadhead miles/)).toHaveAccessibleDescription("Empty miles to pickup");
  });

  it("flags a losing load and resets to the example", async () => {
    render(<ProfitCalculator />);
    await setField("Load pay", "1000");
    expect(screen.getByText("−$0.47")).toBeInTheDocument();
    expect(screen.getByText("LOSING MONEY")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Reset to example" }));
    expect(screen.getByText("GOOD LOAD")).toBeInTheDocument();
  });
});
