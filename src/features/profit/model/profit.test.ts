import { describe, expect, it } from "vitest";
import { calcProfit, verdictFor, type ProfitInputs } from "./profit";

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

function expectFinite(result: ReturnType<typeof calcProfit>) {
  for (const value of Object.values(result)) {
    expect(Number.isFinite(value)).toBe(true);
  }
}

describe("calcProfit", () => {
  it("computes the example load", () => {
    const r = calcProfit(EXAMPLE);
    expect(r.totalMiles).toBe(1120);
    expect(r.fuel).toBeCloseTo((1120 / 6.8) * 3.85, 6);
    expect(r.maintenance).toBeCloseTo(201.6, 6);
    expect(r.tolls).toBe(40);
    expect(r.fixed).toBeCloseTo((1450 / 2500) * 1120, 6);
    expect(r.totalCost).toBeCloseTo(r.fuel + r.maintenance + r.tolls + r.fixed, 6);
    expect(r.profit).toBeCloseTo(2400 - r.totalCost, 6);
    expect(r.perMile.toFixed(2)).toBe("0.78");
    expect(r.ratePerLoadedMile).toBeCloseTo(2.4, 6);
    expect(r.breakEvenPerLoadedMile).toBeCloseTo(r.totalCost / 1000, 6);
  });

  it("includes the dispatch fee in fixed costs", () => {
    const withFee = calcProfit({ ...EXAMPLE, dispatchFee: 250 });
    expect(withFee.fixed).toBeCloseTo((1700 / 2500) * 1120, 6);
  });

  it("reports a negative profit when the rate is too low", () => {
    const r = calcProfit({ ...EXAMPLE, loadPay: 1000 });
    expect(r.profit).toBeLessThan(0);
    expect(r.perMile.toFixed(2)).toBe("-0.47");
  });

  it("returns zeros instead of NaN or Infinity when miles are zero", () => {
    const r = calcProfit({ ...EXAMPLE, loadedMiles: 0, deadheadMiles: 0 });
    expectFinite(r);
    expect(r.perMile).toBe(0);
    expect(r.ratePerLoadedMile).toBe(0);
    expect(r.breakEvenPerLoadedMile).toBe(0);
    expect(r.fuel).toBe(0);
    expect(r.fixed).toBe(0);
  });

  it("treats zero mpg as no fuel cost", () => {
    const r = calcProfit({ ...EXAMPLE, mpg: 0 });
    expectFinite(r);
    expect(r.fuel).toBe(0);
  });

  it("treats zero weekly miles as no fixed cost", () => {
    const r = calcProfit({ ...EXAMPLE, weekMiles: 0 });
    expectFinite(r);
    expect(r.fixed).toBe(0);
  });

  it("clamps negative inputs to zero", () => {
    const negative = Object.fromEntries(
      Object.keys(EXAMPLE).map((key) => [key, -5]),
    ) as ProfitInputs;
    const r = calcProfit(negative);
    expectFinite(r);
    expect(r).toMatchObject({ loadPay: 0, totalMiles: 0, totalCost: 0, profit: 0, perMile: 0 });
    expect(calcProfit({ ...EXAMPLE, tolls: -40 }).tolls).toBe(0);
  });

  it("treats NaN inputs as zero", () => {
    const r = calcProfit({ ...EXAMPLE, loadPay: Number.NaN, tolls: Number.NaN });
    expectFinite(r);
    expect(r.loadPay).toBe(0);
    expect(r.tolls).toBe(0);
  });
});

describe("verdictFor", () => {
  it("is good from 0.50 per mile up", () => {
    expect(verdictFor(0.5)).toEqual({ key: "good", label: "GOOD LOAD" });
    expect(verdictFor(2.21).key).toBe("good");
  });

  it("is thin between 0 and 0.50", () => {
    expect(verdictFor(0.49)).toEqual({ key: "thin", label: "THIN MARGIN" });
    expect(verdictFor(0).key).toBe("thin");
  });

  it("is losing below zero", () => {
    expect(verdictFor(-0.01)).toEqual({ key: "losing", label: "LOSING MONEY" });
  });
});
