import { healthLabel, healthTextColor } from "@/shared/lib/health-score";
import type { ScoreFactor } from "@/features/carriers/model/profile";
import { factorPercent, isFactorHealthy } from "@/features/carriers/ui/profile/factor-health";

function totalScore(factors: ScoreFactor[]): number {
  return factors.reduce((sum, f) => sum + f.v, 0);
}

export function AttentionSummary({ factors }: { factors: ScoreFactor[] }) {
  if (totalScore(factors) >= 80) return null;

  const issues = factors
    .filter((f) => !isFactorHealthy(f))
    .sort((a, b) => factorPercent(a) - factorPercent(b));
  if (issues.length === 0) return null;

  return (
    <section aria-labelledby="needs-attention" className="flex flex-col gap-3.5 rounded-lg border border-border bg-white p-[22px]">
      <h2 id="needs-attention" className="font-display text-[28px] font-extrabold uppercase leading-none">
        Needs attention
      </h2>
      <ul className="flex flex-col gap-3">
        {issues.map((f) => {
          const pct = factorPercent(f);
          return (
            <li
              key={f.t}
              className={`flex flex-col gap-0.5 border-l-4 py-0.5 pl-3.5 sm:flex-row sm:items-baseline sm:gap-3 ${
                pct < 60 ? "border-red" : "border-amber"
              }`}
            >
              <span
                className="w-16 shrink-0 font-display text-[15px] font-extrabold tracking-[.08em]"
                style={{ color: healthTextColor(pct) }}
              >
                {healthLabel(pct)}
              </span>
              <span className="text-base leading-snug text-asphalt">
                <b>{f.t}:</b> {f.note}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
