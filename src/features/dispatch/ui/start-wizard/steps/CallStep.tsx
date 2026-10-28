import Link from "next/link";
import { Segmented } from "@/shared/ui/Segmented";
import { Field, TextInput } from "@/shared/ui/Field";
import { BEST_TIME_OPTIONS, LANGUAGE_OPTIONS, setField } from "@/features/dispatch/model/dispatch-start";
import { SEGMENT_BUTTON, STEP_HEADING, type StepProps } from "../step-props";

export function CallStep({ data, dispatch, headingRef, c }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        {c.call.heading}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={c.call.name} required requiredSuffix={c.requiredSuffix}>
          <TextInput
            required
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={(e) => dispatch(setField("name", e.target.value))}
            placeholder={c.call.namePlaceholder}
          />
        </Field>
        <Field label={c.call.phone} required requiredSuffix={c.requiredSuffix}>
          <TextInput
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={data.phone}
            onChange={(e) => dispatch(setField("phone", e.target.value))}
            placeholder="(555) 555-5555"
          />
        </Field>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">{c.call.bestTime}</span>
        <Segmented
          options={BEST_TIME_OPTIONS}
          value={data.bestTime}
          onChange={(v) => dispatch(setField("bestTime", v))}
          label={c.call.bestTime}
          labels={c.options}
          buttonClassName={SEGMENT_BUTTON}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">{c.call.language}</span>
        <Segmented
          options={LANGUAGE_OPTIONS}
          value={data.language}
          onChange={(v) => dispatch(setField("language", v))}
          label={c.call.language}
          labels={c.options}
          containerClassName="grid max-w-[340px] grid-cols-2 gap-2"
          buttonClassName="h-[50px] px-3 font-sans text-[15px] font-semibold"
        />
      </div>
      <p className="text-[13px] leading-relaxed text-grey">
        {c.call.disclosure.before}
        <Link href="/sms-terms" className="underline">
          {c.call.disclosure.sms}
        </Link>
        {c.call.disclosure.between}
        <Link href="/privacy" className="underline">
          {c.call.disclosure.privacy}
        </Link>
        {c.call.disclosure.after}
      </p>
    </div>
  );
}
