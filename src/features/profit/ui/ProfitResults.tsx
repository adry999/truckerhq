import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { verdictFor, type ProfitResult, type VerdictKey } from "../model/profit";

const TONE: Record<VerdictKey, string> = {
  good: "text-[#5FD39B]",
  thin: "text-amber",
  losing: "text-[#FF7A6B]",
};

const VERDICT_BADGE: Record<VerdictKey, { badge: string; dot: string }> = {
  good: { badge: "bg-green-tint text-green", dot: "bg-green" },
  thin: { badge: "bg-[#FFF1CC] text-[#7A5300]", dot: "bg-amber" },
  losing: { badge: "bg-[#FBE9E7] text-red", dot: "bg-red" },
};

function money(value: number, decimals = 0) {
  return (value < 0 ? "−$" : "$") + Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function ProfitResults({ result }: { result: ProfitResult }) {
  const { loadPay, profit, perMile, totalCost } = result;
  const verdict = verdictFor(perMile);
  const tone = TONE[verdict.key];
  const badge = VERDICT_BADGE[verdict.key];

  const share = (amount: number) =>
    loadPay ? `${Math.max(0, (amount / loadPay) * 100).toFixed(1)}%` : "0%";
  const segments = [
    { label: "Fuel", amount: result.fuel, color: "bg-input-border" },
    { label: "Maintenance", amount: result.maintenance, color: "bg-grey" },
    { label: "Tolls", amount: result.tolls, color: "bg-ink-2" },
    { label: "Fixed", amount: result.fixed, color: "bg-[#C9CBCF]" },
    { label: "Profit", amount: Math.max(0, profit), color: "bg-amber" },
  ];

  const lines: { label: string; value: string; strong?: boolean }[] = [
    { label: "Load pay", value: money(loadPay) },
    { label: "Rate per loaded mile", value: "$" + result.ratePerLoadedMile.toFixed(2) },
    { label: "Fuel", value: "−" + money(result.fuel) },
    { label: "Tires & maintenance", value: "−" + money(result.maintenance) },
    { label: "Tolls & scales", value: "−" + money(result.tolls) },
    { label: `Fixed costs (${result.totalMiles.toLocaleString()} mi)`, value: "−" + money(result.fixed) },
    { label: "Profit on this load", value: money(profit), strong: true },
  ];

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-[10px] bg-asphalt text-offwhite">
        <div className="flex flex-col gap-1.5 px-6 pt-6 pb-5">
          <div className="font-display text-[15px] font-bold tracking-[.14em] text-on-dark-muted">
            PROFIT PER MILE · ALL MILES
          </div>
          <div className={`flex flex-wrap items-baseline gap-3 ${tone}`}>
            <span className="font-display text-8xl font-extrabold tabular-nums">
              {money(perMile, 2)}
            </span>
            <span className="font-display text-3xl font-extrabold">/ mi</span>
          </div>
          <div
            className={`flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 font-display text-[17px] font-extrabold tracking-[.08em] ${badge.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${badge.dot}`} />
            {verdict.label}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-6 pb-5">
          <div className="flex h-4 overflow-hidden rounded-md bg-[#33373D]">
            {segments.map((s) => (
              <div key={s.label} className={s.color} style={{ width: share(s.amount) }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-[13px] text-on-dark">
            {segments.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-sm ${s.color}`} />
                {s.label}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-white/14">
          {lines.map((line, i) => (
            <div
              key={line.label}
              className={`flex justify-between gap-3 px-6 py-3 text-[15px] tabular-nums ${i ? "border-t border-white/8" : ""}`}
            >
              <span className="text-on-dark">{line.label}</span>
              <span className={`font-semibold ${line.strong ? tone : "text-offwhite"}`}>
                {line.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 bg-green px-6 py-5">
          <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">
            BREAK-EVEN RATE
          </div>
          <div className="flex flex-wrap items-baseline gap-2.5 tabular-nums">
            <span className="font-display text-4xl font-extrabold">{money(totalCost)}</span>
            <span className="text-[15px] text-[#DCE6E0]">
              ${result.breakEvenPerLoadedMile.toFixed(2)} per loaded mile
            </span>
          </div>
          <div className="text-sm leading-relaxed text-[#DCE6E0]">
            Below this, the load costs you money.
          </div>
        </div>
      </div>
      <Card className="flex flex-col gap-2.5 p-5">
        <div className="font-display text-xl font-extrabold uppercase">Paying a percentage?</div>
        <div className="text-sm leading-relaxed text-ink-2">
          A 10% dispatcher takes <b className="text-asphalt">{money(loadPay * 0.1)}</b> of this
          load. Our flat weekly price does not change with the rate.
        </div>
        <Button href="/dispatch">See flat dispatch</Button>
      </Card>
    </div>
  );
}
