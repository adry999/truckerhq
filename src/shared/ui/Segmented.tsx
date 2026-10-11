export function Segmented({
  options,
  value,
  onChange,
  label,
  uppercase = false,
  containerClassName = "flex flex-wrap gap-1.5",
  buttonClassName = "h-[50px] flex-1 basis-[110px] font-display text-[17px] font-extrabold tracking-[.05em]",
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  /** Accessible name for the group — pass the same text as the visible label above it. */
  label: string;
  uppercase?: boolean;
  containerClassName?: string;
  buttonClassName?: string;
}) {
  return (
    <div role="group" aria-label={label} className={containerClassName}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`${buttonClassName} rounded-[10px] ${
            value === o
              ? "border-[1.5px] border-green bg-green text-offwhite"
              : "border-[1.5px] border-input-border bg-white text-asphalt"
          }`}
        >
          {uppercase ? o.toUpperCase() : o}
        </button>
      ))}
    </div>
  );
}
