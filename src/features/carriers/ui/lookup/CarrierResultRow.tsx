import Link from "next/link";
import { healthColor, healthTextColor, healthLabel } from "@/shared/lib/health-score";
import { STATUS_COLORS } from "@/features/carriers/ui/status-colors";
import type { Carrier } from "@/features/carriers/model/carriers.types";

export function CarrierResultRow({
  carrier: c,
  index: i,
  live,
}: {
  carrier: Carrier;
  index: number;
  live: boolean;
}) {
  const sc = STATUS_COLORS[c.status];
  const rowClassName = `grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-[18px] tabular-nums md:grid-cols-[2.4fr_1fr_1fr_80px_130px_110px] md:gap-4 ${
    live ? "" : "hover:bg-offwhite"
  } ${i ? "border-t border-[#ECEDEA]" : ""}`;
  const rowContent = (
    <>
      <span className="col-span-2 flex flex-col gap-0.5 md:col-span-1">
        <span className="text-[17px] font-bold">{c.name}</span>
        <span className="text-sm text-grey">
          {c.city}, {c.st}
        </span>
      </span>
      <span className="hidden text-[15px] md:block">{c.dot}</span>
      <span className="hidden text-[15px] md:block">{c.mc}</span>
      <span className="hidden text-[15px] md:block">{c.trucks || "—"}</span>
      <span>
        <span
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-display text-[15px] font-extrabold tracking-[.08em]"
          style={{ background: sc.bg, color: sc.fg }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: sc.dot }} />
          {c.status}
        </span>
      </span>
      <span className="flex justify-end">
        <span className="flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-border py-0.5 pl-1 pr-1.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full font-display text-base font-extrabold"
            style={{
              background: healthColor(c.score),
              color: c.score >= 60 && c.score < 80 ? "#16181B" : "#F7F7F5",
            }}
          >
            {c.score}
          </span>
          <span
            className="pr-1 font-display text-sm font-extrabold tracking-[.06em]"
            style={{ color: healthTextColor(c.score) }}
          >
            {healthLabel(c.score)}
          </span>
        </span>
      </span>
    </>
  );
  // Live FMCSA rows don't have a detail page behind them (only
  // the sample-data profiles do), so they render as plain rows.
  return live ? (
    <div className={rowClassName}>
      {rowContent}
    </div>
  ) : (
    <Link href={`/tools/carrier-lookup/${c.slug}`} className={rowClassName}>
      {rowContent}
    </Link>
  );
}
