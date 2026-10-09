import { useId } from "react";

export function NumberField({
  label,
  value,
  onChange,
  step,
  prefix,
  suffix,
  note,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  step: number;
  prefix?: string;
  suffix?: string;
  note?: string;
}) {
  const id = useId();
  const noteId = `${id}-note`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <span className="flex h-14 items-center overflow-hidden rounded-[10px] border-[1.5px] border-input-border focus-within:border-green">
        <span aria-hidden="true" className="pl-3.5 text-[17px] text-grey">
          {prefix}
        </span>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          step={step}
          aria-describedby={note ? noteId : undefined}
          className="h-full min-w-0 flex-1 border-0 px-2 font-sans text-lg font-semibold tabular-nums outline-none"
        />
        <span aria-hidden="true" className="whitespace-nowrap pr-3.5 text-sm text-grey">
          {suffix}
        </span>
      </span>
      {note && (
        <span id={noteId} className="text-[13px] text-grey">
          {note}
        </span>
      )}
    </div>
  );
}
