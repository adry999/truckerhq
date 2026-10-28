import { Button } from "@/shared/ui/Button";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import { Card } from "@/shared/ui/Card";
import { PROFIT_COPY } from "../data/profit-copy";
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

export function ProfitResults({ result, lang = "EN" }: { result: ProfitResult; lang?: Locale }) {
  const { results: t } = getCopy(PROFIT_COPY, lang);
  const { loadPay, profit, perMile, totalCost, totalMiles } = result;
  const verdict = verdictFor(profit, perMile, totalMiles);
  const tone = verdict ? TONE[verdict.key] : "text-offwhite";
  const badge = verdict ? VERDICT_BADGE[verdict.key] : null;

  // On a losing load the costs exceed the pay, so scale the bar to the larger of the two.
  const barTotal = Math.max(loadPay, totalCost);
  const share = (amount: number) =>
    barTotal ? `${Math.min(100, Math.max(0, (amount / barTotal) * 100)).toFixed(1)}%` : "0%";
  const segments = [
    { label: t.segments.fuel, amount: result.fuel, color: "bg-input-border" },
    { label: t.segments.maintenance, amount: result.maintenance, color: "bg-grey" },
    { label: t.segments.tolls, amount: result.tolls, color: "bg-ink-2" },
    { label: t.segments.fixed, amount: result.fixed, color: "bg-[#C9CBCF]" },
    { label: t.segments.profit, amount: Math.max(0, profit), color: "bg-amber" },
  ];

  const lines: { label: string; value: string; strong?: boolean }[] = [
    { label: t.lines.loadPay, value: money(loadPay) },
    { label: t.lines.ratePerMile, value: "$" + result.ratePerLoadedMile.toFixed(2) },
    { label: t.lines.fuel, value: "−" + money(result.fuel) },
    { label: t.lines.maintenance, value: "−" + money(result.maintenance) },
    { label: t.lines.tolls, value: "−" + money(result.tolls) },
    { label: t.fixedLine(totalMiles.toLocaleString("en-US")), value: "−" + money(result.fixed) },
    { label: t.lines.profit, value: money(profit), strong: true },
  ];

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-[10px] bg-asphalt text-offwhite">
        <div className="flex flex-col gap-1.5 px-6 pt-6 pb-5">
          <div className="font-display text-[15px] font-bold tracking-[.14em] text-on-dark-muted">
            {t.eyebrow}
          </div>
          <div className={`flex flex-wrap items-baseline gap-3 ${tone}`}>
            <span className="font-display text-8xl font-extrabold tabular-nums">
              {totalMiles > 0 ? money(perMile, 2) : "—"}
            </span>
            <span className="font-display text-3xl font-extrabold">{t.perMileUnit}</span>
          </div>
          {verdict && badge && (
            <div
              className={`flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 font-display text-[17px] font-extrabold tracking-[.08em] ${badge.badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${badge.dot}`} />
              {t.verdicts[verdict.key]}
            </div>
          )}
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
            {t.breakEvenEyebrow}
          </div>
          <div className="flex flex-wrap items-baseline gap-2.5 tabular-nums">
            <span className="font-display text-4xl font-extrabold">{money(totalCost)}</span>
            <span className="text-[15px] text-[#DCE6E0]">
              {t.perLoadedMile("$" + result.breakEvenPerLoadedMile.toFixed(2))}
            </span>
          </div>
          <div className="text-sm leading-relaxed text-[#DCE6E0]">
            {t.breakEvenNote}
          </div>
        </div>
      </div>
      <Card className="flex flex-col gap-2.5 p-5">
        <div className="font-display text-xl font-extrabold uppercase">{t.percentTitle}</div>
        <div className="text-sm leading-relaxed text-ink-2">
          {t.percentBefore}
          <b className="text-asphalt">{money(loadPay * 0.1)}</b>
          {t.percentAfter}
        </div>
        <Button href={t.dispatchHref}>{t.percentCta}</Button>
      </Card>
    </div>
  );
}
