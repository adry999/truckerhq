import { ChoiceGroup, RadioCard } from "@/shared/ui/choices";
import { CONTACT_METHODS } from "../../model/claim";
import { STEP_HEADING, type StepProps } from "./step-props";

export function ContactStep({ data, dispatch, headingRef }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
          Choose how we reach you
        </h2>
        <p className="text-[15px] leading-relaxed text-ink-3">
          Pick the contact on your FMCSA record. We verify ownership by phone before any changes go
          live.
        </p>
      </div>
      <ChoiceGroup legend={<span className="sr-only">Contact method</span>}>
        {CONTACT_METHODS.map((method) => (
          <RadioCard
            key={method.id}
            name="contactMethod"
            value={method.id}
            title={<span className="tabular-nums">{method.masked}</span>}
            description={method.label}
            checked={data.contactMethod === method.id}
            onChange={() => dispatch({ type: "setContactMethod", value: method.id })}
          />
        ))}
      </ChoiceGroup>
    </div>
  );
}
