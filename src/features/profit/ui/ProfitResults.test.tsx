// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { calcProfit, type ProfitInputs } from "../model/profit";
import { ProfitResults } from "./ProfitResults";

const EXAMPLE: ProfitInputs = {
  loadPay: 2400,
  loadedMiles: 1000,
  deadheadMiles: 120,
  fuelPrice: 3.85,
  mpg: 6.8,
  maintenancePerMile: 0.18,
  tolls: 40,
  truckPayment: 650,
  trailerPayment: 200,
  insurance: 450,
  otherWeekly: 150,
  dispatchFee: 0,
  weekMiles: 2500,
};

function barWidths(container: HTMLElement): number[] {
  return Array.from(container.querySelectorAll<HTMLElement>(".overflow-hidden.rounded-md > div")).map(
    (el) => parseFloat(el.style.width),
  );
}

describe("ProfitResults", () => {
  it("keeps the cost bar within 100% on a losing load", () => {
    const { container } = render(<ProfitResults result={calcProfit({ ...EXAMPLE, loadPay: 500 })} />);
    expect(screen.getByText("LOSING MONEY")).toBeInTheDocument();
    const total = barWidths(container).reduce((a, b) => a + b, 0);
    expect(total).toBeLessThanOrEqual(100.5);
  });

  it("shows no per-mile verdict at zero miles", () => {
    render(<ProfitResults result={calcProfit({ ...EXAMPLE, loadedMiles: 0, deadheadMiles: 0, tolls: 0 })} />);
    expect(screen.queryByText("THIN MARGIN")).not.toBeInTheDocument();
    expect(screen.queryByText("LOSING MONEY")).not.toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("formats miles with the en-US separator", () => {
    render(<ProfitResults result={calcProfit(EXAMPLE)} />);
    expect(screen.getByText("Fixed costs (1,120 mi)")).toBeInTheDocument();
  });
});
