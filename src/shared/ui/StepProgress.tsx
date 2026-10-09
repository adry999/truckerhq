import { cx } from "./cx";

export function StepProgress({
  steps,
  current,
  onSelect,
}: {
  steps: readonly string[];
  /** Zero-based active step; `steps.length` means every step is complete. */
  current: number;
  /** When set, completed steps become buttons that jump back. */
  onSelect?: (index: number) => void;
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
                  className={cx(labelClass, "text-left text-amber hover:underline")}
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
        {complete ? "All steps complete" : `Step ${current + 1} of ${steps.length}: ${steps[current]}`}
      </p>
    </>
  );
}
