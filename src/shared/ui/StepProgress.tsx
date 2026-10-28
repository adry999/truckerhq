import { cx } from "./cx";

type StepStatus = { complete: string; step: (n: number, total: number, label: string) => string };

const DEFAULT_STATUS: StepStatus = {
  complete: "All steps complete",
  step: (n, total, label) => `Step ${n} of ${total}: ${label}`,
};

export function StepProgress({
  steps,
  current,
  onSelect,
  status = DEFAULT_STATUS,
}: {
  steps: readonly string[];
  /** Zero-based active step; `steps.length` means every step is complete. */
  current: number;
  /** When set, completed steps become buttons that jump back. */
  onSelect?: (index: number) => void;
  /** Screen-reader announcement texts; English by default. */
  status?: StepStatus;
}) {
  const complete = current >= steps.length;
  return (
    <>
      <ol className="flex gap-2">
        {steps.map((label, i) => {
          const future = i > current;
          const past = i < current;
          const labelClass = "font-display text-sm font-bold uppercase tracking-[.08em]";
          return (
            <li
              key={label}
              aria-current={i === current ? "step" : undefined}
              className="flex flex-1 flex-col gap-2"
            >
              <div className={cx("h-1.5 rounded-full", future ? "bg-white/20" : "bg-amber")} />
              {past && !complete && onSelect ? (
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  className={cx(labelClass, "flex min-h-11 items-start pt-1 text-left text-amber hover:underline")}
                >
                  {label}
                </button>
              ) : (
                <span className={cx(labelClass, future ? "text-on-dark-muted" : "text-amber")}>
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p role="status" aria-live="polite" className="sr-only">
        {complete ? status.complete : status.step(current + 1, steps.length, steps[current])}
      </p>
    </>
  );
}
