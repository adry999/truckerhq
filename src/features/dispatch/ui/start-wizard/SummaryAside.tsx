import { Card } from "@/shared/ui/Card";
import { optionLabel, type StartWizardCopy } from "@/features/dispatch/data/start-wizard-copy";
import type { DispatchData } from "@/features/dispatch/model/dispatch-start";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border pt-2 first:border-t-0 first:pt-0">
      <span className="text-ink-2">{label}</span>
      <span className="text-right font-semibold text-asphalt">{value}</span>
    </div>
  );
}

export function SummaryAside({ step, data, c }: { step: number; data: DispatchData; c: StartWizardCopy }) {
  const { trucks } = data;
  const label = (value: string) => optionLabel(c, value);
  const a = c.aside;
  return (
    <aside className="flex flex-col gap-4 min-[900px]:sticky min-[900px]:top-24 min-[900px]:self-start">
      <div className="flex flex-col gap-2 rounded-lg bg-asphalt p-5 text-offwhite">
        <span className="font-display text-[13px] font-bold tracking-[.14em] text-amber">
          {a.price}
        </span>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold">$XXX</span>
          <span className="text-[15px] text-on-dark">
            {a.unit(trucks)}
          </span>
        </div>
        <span className="text-[13px] leading-relaxed text-on-dark-muted">
          {a.note}
        </span>
      </div>

      <Card className="flex flex-col gap-2.5 p-5">
        <span className="font-display text-lg font-extrabold uppercase">{a.soFar}</span>
        <div className="flex flex-col gap-2 text-[15px]">
          <SummaryRow label={a.equipment} value={label(data.trailer)} />
          <SummaryRow label={a.trucks} value={String(trucks)} />
          <SummaryRow label={a.drivers} value={label(data.driver)} />
          {step >= 1 && (
            <>
              <SummaryRow label={a.lanes} value={data.lanes.length ? data.lanes.map(label).join(", ") : "—"} />
              <SummaryRow label={a.home} value={label(data.homeTime)} />
            </>
          )}
          {step >= 2 && (
            <SummaryRow
              label={a.authority}
              value={data.mcNumber.trim() ? data.mcNumber : label(data.authority)}
            />
          )}
        </div>
      </Card>
    </aside>
  );
}
