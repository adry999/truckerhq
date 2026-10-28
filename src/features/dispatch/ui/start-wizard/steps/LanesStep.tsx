import { Segmented } from "@/shared/ui/Segmented";
import { CheckCard, ChoiceGroup } from "@/shared/ui/choices";
import { Field, TextInput } from "@/shared/ui/Field";
import { HOME_TIME_OPTIONS, REGIONS, setField } from "@/features/dispatch/model/dispatch-start";
import { SEGMENT_BUTTON, STEP_HEADING, type StepProps } from "../step-props";

export function LanesStep({ data, dispatch, headingRef, c, fieldErrors }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        {c.lanes.heading}
      </h2>
      <Field label={c.lanes.homeBase} error={fieldErrors.homeBase}>
        <TextInput
          value={data.homeBase}
          onChange={(e) => dispatch(setField("homeBase", e.target.value))}
          placeholder={c.lanes.homeBasePlaceholder}
          autoComplete="address-level2"
          enterKeyHint="next"
        />
      </Field>
      <ChoiceGroup
        legend={c.lanes.legend}
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
        error={data.lanes.length === 0 ? c.lanes.required : fieldErrors.lanes}
      >
        {REGIONS.map((region) => (
          <CheckCard
            key={region}
            name="lanes"
            value={region}
            title={c.options[region] ?? region}
            checked={data.lanes.includes(region)}
            onChange={() => dispatch({ type: "toggleLane", lane: region })}
          />
        ))}
      </ChoiceGroup>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">{c.lanes.homeTime}</span>
        <Segmented
          options={HOME_TIME_OPTIONS}
          value={data.homeTime}
          onChange={(v) => dispatch(setField("homeTime", v))}
          label={c.lanes.homeTime}
          labels={c.options}
          buttonClassName={SEGMENT_BUTTON}
        />
      </div>
    </div>
  );
}
