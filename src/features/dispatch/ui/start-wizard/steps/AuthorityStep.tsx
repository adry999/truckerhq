import Link from "next/link";
import { ChoiceGroup, RadioCard } from "@/shared/ui/choices";
import { Field, TextInput } from "@/shared/ui/Field";
import { AUTHORITY_OPTIONS, NO_AUTHORITY, setField } from "@/features/dispatch/model/dispatch-start";
import { STEP_HEADING, type StepProps } from "../step-props";

export function AuthorityStep({ data, dispatch, headingRef, c }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        {c.authority.heading}
      </h2>
      <ChoiceGroup legend={<span className="sr-only">{c.authority.heading}</span>}>
        {AUTHORITY_OPTIONS.map((option) => (
          <RadioCard
            key={option}
            name="authority"
            value={option}
            title={c.options[option] ?? option}
            checked={data.authority === option}
            onChange={(v) => dispatch(setField("authority", v))}
          />
        ))}
      </ChoiceGroup>
      {data.authority !== NO_AUTHORITY ? (
        <Field
          label={c.authority.mcLabel}
          hint={<span className="text-[13px] text-grey">{c.authority.mcHint}</span>}
        >
          <TextInput
            value={data.mcNumber}
            onChange={(e) => dispatch(setField("mcNumber", e.target.value))}
            placeholder="1182044"
            inputMode="numeric"
            autoComplete="off"
            maxLength={16}
          />
        </Field>
      ) : (
        <div className="rounded-lg border-[1.5px] border-amber bg-amber-tint p-4 text-[15px] leading-relaxed text-asphalt">
          {c.authority.noAuthority.before}
          <Link href="/tools/new-mc-checklist" className="font-semibold text-green underline">
            {c.authority.noAuthority.link}
          </Link>
          {c.authority.noAuthority.after}
        </div>
      )}
    </div>
  );
}
