import { MAX_TRUCKS } from "@/features/dispatch/model/dispatch-start";

const BUTTON =
  "flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border-[1.5px] border-input-border font-display text-2xl font-extrabold text-asphalt disabled:opacity-30";

export function TruckCounter({
  value,
  onChange,
  fewerLabel,
  moreLabel,
}: {
  value: number;
  onChange: (value: number) => void;
  fewerLabel: string;
  moreLabel: string;
}) {
  return (
    <div role="group" aria-labelledby="trucks-label" className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={fewerLabel}
        className={BUTTON}
      >
        −
      </button>
      <output
        aria-live="polite"
        className="flex h-[50px] w-[70px] items-center justify-center rounded-[10px] border-[1.5px] border-border bg-white font-display text-2xl font-extrabold tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_TRUCKS}
        aria-label={moreLabel}
        className={BUTTON}
      >
        +
      </button>
    </div>
  );
}
