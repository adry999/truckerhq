export type ProfitInputs = {
  loadPay: number;
  loadedMiles: number;
  deadheadMiles: number;
  fuelPrice: number;
  mpg: number;
  maintenancePerMile: number;
  tolls: number;
  truckPayment: number;
  trailerPayment: number;
  insurance: number;
  otherWeekly: number;
  dispatchFee: number;
  weekMiles: number;
};

export type ProfitResult = {
  loadPay: number;
  totalMiles: number;
  fuel: number;
  maintenance: number;
  tolls: number;
  fixed: number;
  totalCost: number;
  profit: number;
  perMile: number;
  ratePerLoadedMile: number;
  breakEvenPerLoadedMile: number;
};

export type VerdictKey = "good" | "thin" | "losing";

const GOOD_PER_MILE = 0.5;

const VERDICT_LABELS: Record<VerdictKey, string> = {
  good: "GOOD LOAD",
  thin: "THIN MARGIN",
  losing: "LOSING MONEY",
};

function clamp(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function divide(numerator: number, denominator: number): number {
  return denominator > 0 ? numerator / denominator : 0;
}

export function calcProfit(inputs: ProfitInputs): ProfitResult {
  const loadPay = clamp(inputs.loadPay);
  const loadedMiles = clamp(inputs.loadedMiles);
  const totalMiles = loadedMiles + clamp(inputs.deadheadMiles);
  const fuel = divide(totalMiles, clamp(inputs.mpg)) * clamp(inputs.fuelPrice);
  const maintenance = clamp(inputs.maintenancePerMile) * totalMiles;
  const tolls = clamp(inputs.tolls);
  const weeklyFixed =
    clamp(inputs.truckPayment) +
    clamp(inputs.trailerPayment) +
    clamp(inputs.insurance) +
    clamp(inputs.otherWeekly) +
    clamp(inputs.dispatchFee);
  const fixed = divide(weeklyFixed, clamp(inputs.weekMiles)) * totalMiles;
  const totalCost = fuel + maintenance + tolls + fixed;
  const profit = loadPay - totalCost;

  return {
    loadPay,
    totalMiles,
    fuel,
    maintenance,
    tolls,
    fixed,
    totalCost,
    profit,
    perMile: divide(profit, totalMiles),
    ratePerLoadedMile: divide(loadPay, loadedMiles),
    breakEvenPerLoadedMile: divide(totalCost, loadedMiles),
  };
}

export function verdictFor(perMile: number): { key: VerdictKey; label: string } {
  const key: VerdictKey = perMile >= GOOD_PER_MILE ? "good" : perMile >= 0 ? "thin" : "losing";
  return { key, label: VERDICT_LABELS[key] };
}
