import { Segmented } from "@/shared/ui/Segmented";
import { CheckCard, ChoiceGroup } from "@/shared/ui/choices";
import { Field, TextInput } from "@/shared/ui/Field";
import { HOME_TIME_OPTIONS, REGIONS, setField } from "../../../model/dispatch-start";
import { SEGMENT_BUTTON, STEP_HEADING, type StepProps } from "../step-props";

export function LanesStep({ data, dispatch, headingRef }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        Lanes and home time
      </h2>
      <Field label="Home base">
        <TextInput
          value={data.homeBase}
          onChange={(e) => dispatch(setField("homeBase", e.target.value))}
          placeholder="City, state"
        />
      </Field>
      <ChoiceGroup
        legend="Where do you want to run? (Pick any)"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
      >
        {REGIONS.map((region) => (
          <CheckCard
            key={region}
            name="lanes"
            value={region}
            title={region}
            checked={data.lanes.includes(region)}
            onChange={() => dispatch({ type: "toggleLane", lane: region })}
          />
        ))}
      </ChoiceGroup>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">How often home?</span>
        <Segmented
          options={HOME_TIME_OPTIONS}
          value={data.homeTime}
          onChange={(v) => dispatch(setField("homeTime", v))}
          label="How often home?"
          buttonClassName={SEGMENT_BUTTON}
        />
      </div>
    </div>
  );
}
