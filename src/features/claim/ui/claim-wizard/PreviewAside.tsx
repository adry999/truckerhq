import { healthColor } from "@/shared/lib/health-score";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { CheckIcon } from "@/shared/ui/icons";
import { CARRIER, DETAILS_STEP, alsoShowLabels, type ClaimData } from "@/features/claim/model/claim";

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
      <span className="text-ink-2">{label}</span>
      <span className="text-right font-semibold text-asphalt">{value}</span>
    </div>
  );
}

export function PreviewAside({ step, data }: { step: number; data: ClaimData }) {
  const filled = step >= DETAILS_STEP;
  const notes = alsoShowLabels(data);
  const listOrNone = (items: string[]) => (filled && items.length ? items.join(", ") : "Not listed");

  return (
    <aside className="flex flex-col gap-3 md:sticky md:top-6 md:self-start">
      <span className="font-display text-sm font-bold tracking-[.14em] text-grey">PREVIEW</span>
      <Card className="flex flex-col gap-4 border p-5">
        <div className="flex items-center gap-4">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${healthColor(CARRIER.score)} ${CARRIER.score}%, var(--color-divider) 0)`,
            }}
          >
            <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-white">
              <span className="font-display text-2xl font-extrabold">{CARRIER.score}</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-display text-lg font-extrabold uppercase leading-tight">
              {CARRIER.name}
            </span>
            <span className="text-sm tabular-nums text-grey">
              DOT {CARRIER.dot} · {CARRIER.mc}
            </span>
            {filled && (
              <Badge className="mt-1 text-xs uppercase tracking-[.05em]">
                <CheckIcon size={12} strokeWidth={3.5} />
                Pending verification
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col divide-y divide-divider border-t border-divider">
          <PreviewRow label="Phone" value={filled && data.phone.trim() ? data.phone : "Not listed"} />
          <PreviewRow label="Equipment" value={listOrNone(data.equipment)} />
          <PreviewRow label="Lanes" value={listOrNone(data.lanes)} />
          {filled && notes.length > 0 && <PreviewRow label="Notes" value={notes.join(", ")} />}
        </div>
      </Card>
      <span className="text-[13px] text-grey">Free. You can edit or hide these details any time.</span>
    </aside>
  );
}
