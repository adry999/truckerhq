import { calcProfit, type ProfitInputs } from "./profit";

export const PROFIT_GUIDE_UPDATED = "October 2026";

/** The calculator's starting values; the worked example in the guide uses them too. */
export const EXAMPLE_INPUTS: ProfitInputs = {
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

function weeklyFixed(i: ProfitInputs): number {
  return i.truckPayment + i.trailerPayment + i.insurance + i.otherWeekly + i.dispatchFee;
}

export function workedExample() {
  return { inputs: EXAMPLE_INPUTS, weeklyFixed: weeklyFixed(EXAMPLE_INPUTS), result: calcProfit(EXAMPLE_INPUTS) };
}

export const USD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function usd(value: number): string {
  return USD.format(value);
}

export const PROFIT_FAQ = [
  {
    q: "How do I calculate profit per mile?",
    a: "Subtract your total costs for the load from the load pay, then divide by total miles, loaded plus deadhead. Costs are fuel, maintenance, tolls and your share of weekly fixed costs.",
  },
  {
    q: "Do deadhead miles count?",
    a: "Yes. Deadhead miles burn fuel and wear the truck, so the calculator adds them to the loaded miles before it works out costs and profit per mile. The rate per loaded mile only uses loaded miles.",
  },
  {
    q: "What is a good profit per mile?",
    a: "In this calculator a load is rated Good at $0.50 or more profit per mile, Thin Margin below that, and Losing Money if profit is below zero. Your own target may be higher.",
  },
  {
    q: "How are fixed costs spread across a load?",
    a: "Weekly fixed costs (truck payment, trailer payment, insurance, other costs and any dispatch fee) are divided by the miles you expect to run in a week, then multiplied by the miles on this load.",
  },
  {
    q: "What is the break-even rate per mile?",
    a: "It is the total cost of the load divided by its loaded miles. Any rate per loaded mile above that number leaves you with a profit.",
  },
  {
    q: "Are the example numbers my real costs?",
    a: "No. They are placeholders to show how the formula works. Replace them with your own fuel price, mpg and weekly costs to get a result you can use.",
  },
] as const;
