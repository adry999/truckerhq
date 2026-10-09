import { Card } from "@/shared/ui/Card";
import type { DispatchData } from "../../model/dispatch-start";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border pt-2 first:border-t-0 first:pt-0">
      <span className="text-ink-2">{label}</span>
      <span className="text-right font-semibold text-asphalt">{value}</span>
    </div>
  );
}

export function SummaryAside({ step, data }: { step: number; data: DispatchData }) {
  const { trucks } = data;
  return (
    <aside className="flex flex-col gap-4 min-[900px]:sticky min-[900px]:top-24 min-[900px]:self-start">
      <div className="flex flex-col gap-2 rounded-lg bg-asphalt p-5 text-offwhite">
        <span className="font-display text-[13px] font-bold tracking-[.14em] text-amber">
          YOUR PRICE
        </span>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold">$XXX</span>
          <span className="text-[15px] text-on-dark">
            / week × {trucks} truck{trucks === 1 ? "" : "s"}
          </span>
        </div>
        <span className="text-[13px] leading-relaxed text-on-dark-muted">
          Flat, week to week. No percentage and no contract.
        </span>
      </div>

      <Card className="flex flex-col gap-2.5 p-5">
        <span className="font-display text-lg font-extrabold uppercase">So far</span>
        <div className="flex flex-col gap-2 text-[15px]">
          <SummaryRow label="Equipment" value={data.trailer} />
          <SummaryRow label="Trucks" value={String(trucks)} />
          <SummaryRow label="Drivers" value={data.driver} />
          {step >= 1 && (
            <>
              <SummaryRow label="Lanes" value={data.lanes.length ? data.lanes.join(", ") : "—"} />
              <SummaryRow label="Home" value={data.homeTime} />
            </>
          )}
          {step >= 2 && (
            <SummaryRow
              label="Authority"
              value={data.mcNumber.trim() ? data.mcNumber : data.authority}
            />
          )}
        </div>
      </Card>
    </aside>
  );
}
