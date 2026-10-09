import Link from "next/link";
import { Segmented } from "@/shared/ui/Segmented";
import { Field, TextInput } from "@/shared/ui/Field";
import { BEST_TIME_OPTIONS, LANGUAGE_OPTIONS, setField } from "@/features/dispatch/model/dispatch-start";
import { SEGMENT_BUTTON, STEP_HEADING, type StepProps } from "../step-props";

export function CallStep({ data, dispatch, headingRef }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        When can we call?
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <TextInput
            required
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={(e) => dispatch(setField("name", e.target.value))}
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone" required>
          <TextInput
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => dispatch(setField("phone", e.target.value))}
            placeholder="(555) 555-5555"
          />
        </Field>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Best time</span>
        <Segmented
          options={BEST_TIME_OPTIONS}
          value={data.bestTime}
          onChange={(v) => dispatch(setField("bestTime", v))}
          label="Best time"
          buttonClassName={SEGMENT_BUTTON}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Language</span>
        <Segmented
          options={LANGUAGE_OPTIONS}
          value={data.language}
          onChange={(v) => dispatch(setField("language", v))}
          label="Language"
          containerClassName="grid max-w-[340px] grid-cols-2 gap-2"
          buttonClassName="h-[50px] px-3 font-sans text-[15px] font-semibold"
        />
      </div>
      <p className="text-[13px] leading-relaxed text-grey">
        By requesting a call, you agree to receive a call and text from Trucker HQ about this
        request. Msg &amp; data rates may apply. Reply STOP to opt out. See{" "}
        <Link href="/sms-terms" className="underline">
          SMS terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
        .
      </p>
    </div>
  );
}
