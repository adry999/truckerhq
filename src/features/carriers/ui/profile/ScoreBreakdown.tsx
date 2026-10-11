import { healthColor } from "@/shared/lib/health-score";
import type { ScoreFactor } from "@/features/carriers/model/profile";

export function ScoreBreakdown({ factors }: { factors: ScoreFactor[] }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-white p-[22px]">
      <h2 className="font-display text-[28px] font-extrabold uppercase">
        Score breakdown
      </h2>
      {factors.map((b) => (
        <div key={b.t} className="flex flex-col gap-1.5">
          <div className="flex justify-between gap-3 text-[15px]">
            <span className="font-semibold">{b.t}</span>
            <span className="tabular-nums text-[#4B5058]">
              <b className="text-asphalt">{b.v}</b> / {b.max}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-md bg-[#ECEDEA]">
            <div
              className="h-full rounded-md"
              style={{ width: `${Math.round((b.v / b.max) * 100)}%`, background: healthColor((b.v / b.max) * 100) }}
            />
          </div>
          <div className="text-sm text-grey">{b.note}</div>
        </div>
      ))}
    </div>
  );
}
