import Link from "next/link";
import {
  STATUS_COLORS,
  healthColor,
  healthTextColor,
  healthLabel,
  type StateCarrierRow,
} from "@/lib/data";

export default function StateCarriersList({
  stateAbbr,
  stateName,
  carriers,
  totalCount,
  equip,
}: {
  stateAbbr: string;
  stateName: string;
  carriers: StateCarrierRow[];
  totalCount: string;
  equip: string;
}) {
  const shown = carriers.filter((c) => equip === "All" || c.equipment === equip);

  return (
    <>
    <div className="overflow-hidden rounded-lg border border-border bg-white">
      <div className="hidden grid-cols-[2.2fr_1fr_1.2fr_80px_130px_110px] gap-4 bg-asphalt px-5 py-3.5 font-display text-[15px] font-bold tracking-[.1em] text-offwhite md:grid">
        <span>CARRIER</span>
        <span>DOT</span>
        <span>EQUIPMENT</span>
        <span>TRUCKS</span>
        <span>AUTHORITY</span>
        <span className="text-right">HEALTH</span>
      </div>
      {shown.map((c, i) => {
        const sc = STATUS_COLORS[c.status];
        return (
          <Link
            key={c.dot}
            href={`/tools/carrier-lookup?q=${c.dot}&mode=DOT`}
            className={`grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-[18px] tabular-nums hover:bg-offwhite md:grid-cols-[2.2fr_1fr_1.2fr_80px_130px_110px] md:gap-4 ${
              i ? "border-t border-[#ECEDEA]" : ""
            }`}
          >
            <span className="col-span-2 flex flex-col gap-0.5 md:col-span-1">
              <span className="text-[17px] font-bold">{c.name}</span>
              <span className="text-sm text-grey">
                {c.city}, {stateAbbr}
                <span className="md:hidden">
                  {" "}
                  · {c.equipment} · {c.trucks} truck
                  {c.trucks === 1 ? "" : "s"}
                </span>
              </span>
            </span>
            <span className="hidden text-[15px] md:block">{c.dot}</span>
            <span className="hidden text-[15px] md:block">
              {c.equipment}
            </span>
            <span className="hidden text-[15px] md:block">
              {c.trucks}
            </span>
            <span>
              <span
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-display text-[15px] font-extrabold tracking-[.08em]"
                style={{ background: sc.bg, color: sc.fg }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: sc.dot }}
                />
                {c.status}
              </span>
            </span>
            <span className="flex justify-end">
              <span className="flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-border py-0.5 pl-1 pr-1.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full font-display text-base font-extrabold"
                  style={{
                    background: healthColor(c.score),
                    color:
                      c.score >= 60 && c.score < 80
                        ? "#16181B"
                        : "#F7F7F5",
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
          </Link>
        );
      })}
      {shown.length === 0 && (
        <div className="p-10 text-center text-base text-[#4B5058]">
          No {stateName} carriers match this filter. Try a different
          equipment type.
        </div>
      )}
    </div>

    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="text-sm text-grey">
        Showing {shown.length} of {totalCount} · sample data
      </span>
      <Link
        href="/tools/carrier-lookup"
        className="flex h-12 items-center rounded-[10px] border-2 border-asphalt px-5 font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-asphalt hover:text-offwhite"
      >
        Search all {stateName} carriers
      </Link>
    </div>
    </>
  );
}
