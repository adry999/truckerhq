import { describe, expect, it } from "vitest";
import { PROFIT_FAQ, USD, usd, workedExample } from "./example";
import { GOOD_PER_MILE, calcProfit, verdictFor } from "./profit";

describe("profit guide worked example", () => {
  it("shows exactly what the calculator computes for its default inputs", () => {
    const { inputs, result } = workedExample();
    expect(result).toEqual(calcProfit(inputs));
  });

  it("has the numbers quoted in the guide copy", () => {
    const { result, weeklyFixed } = workedExample();
    expect(weeklyFixed).toBe(1450);
    expect(result.totalMiles).toBe(1120);
    expect(usd(result.fuel)).toBe("$634.12");
    expect(usd(result.maintenance)).toBe("$201.60");
    expect(usd(result.fixed)).toBe("$649.60");
    expect(usd(result.totalCost)).toBe("$1,525.32");
    expect(usd(result.profit)).toBe("$874.68");
    expect(USD.format(result.perMile)).toBe("$0.78");
  });

  it("rates the example Good, consistent with the threshold in the FAQ", () => {
    const { result } = workedExample();
    expect(verdictFor(result.profit, result.perMile, result.totalMiles)?.key).toBe("good");
    expect(GOOD_PER_MILE).toBe(0.5);
    expect(PROFIT_FAQ.some((f) => f.a.includes("$0.50"))).toBe(true);
  });
});
