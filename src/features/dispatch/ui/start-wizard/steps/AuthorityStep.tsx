import Link from "next/link";
import { ChoiceGroup, RadioCard } from "@/shared/ui/choices";
import { Field, TextInput } from "@/shared/ui/Field";
import { AUTHORITY_OPTIONS, NO_AUTHORITY, setField } from "../../../model/dispatch-start";
import { STEP_HEADING, type StepProps } from "../step-props";

export function AuthorityStep({ data, dispatch, headingRef }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        Your authority
      </h2>
      <ChoiceGroup legend={<span className="sr-only">Your authority</span>}>
        {AUTHORITY_OPTIONS.map((option) => (
          <RadioCard
            key={option}
            name="authority"
            value={option}
            title={option}
            checked={data.authority === option}
            onChange={(v) => dispatch(setField("authority", v))}
          />
        ))}
      </ChoiceGroup>
      {data.authority !== NO_AUTHORITY ? (
        <Field
          label="MC/DOT number"
          hint={
            <span className="text-[13px] text-grey">
              We&apos;ll pull your record from FMCSA so you don&apos;t have to type it.
            </span>
          }
        >
          <TextInput
            value={data.mcNumber}
            onChange={(e) => dispatch(setField("mcNumber", e.target.value))}
            placeholder="MC 1182044"
          />
        </Field>
      ) : (
        <div className="rounded-lg border-[1.5px] border-amber bg-amber-tint p-4 text-[15px] leading-relaxed text-asphalt">
          No problem. We&apos;ll walk you through the{" "}
          <Link href="/tools/new-mc-checklist" className="font-semibold text-green underline">
            New MC Checklist
          </Link>{" "}
          on the call and start booking as soon as your authority is active.
        </div>
      )}
    </div>
  );
}
