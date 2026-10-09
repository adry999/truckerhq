import { MAX_TRUCKS } from "../../model/dispatch-start";

const BUTTON =
  "flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border-[1.5px] border-input-border font-display text-2xl font-extrabold text-asphalt disabled:opacity-30";

export function TruckCounter({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div role="group" aria-labelledby="trucks-label" className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Fewer trucks"
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
        aria-label="More trucks"
        className={BUTTON}
      >
        +
      </button>
    </div>
  );
}
