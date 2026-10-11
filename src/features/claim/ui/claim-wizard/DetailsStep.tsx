import { CheckCard, ChoiceGroup } from "@/shared/ui/choices";
import { Field, TextInput } from "@/shared/ui/Field";
import {
  ALSO_SHOW,
  EQUIPMENT_OPTIONS,
  LANE_OPTIONS,
  type ToggleField,
} from "@/features/claim/model/claim";
import { STEP_HEADING, type StepProps } from "./step-props";

const GROUP_LEGEND = "font-display text-xl font-extrabold uppercase";
const CHIP_GRID = "grid grid-cols-2 gap-2.5 sm:grid-cols-3";

export function DetailsStep({ data, dispatch, headingRef }: StepProps) {
  const toggle = (field: ToggleField, value: string) => dispatch({ type: "toggle", field, value });

  return (
    <div className="flex flex-col gap-6">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        What brokers and drivers should see
      </h2>

      <Field label="Dispatch phone">
        <TextInput
          value={data.phone}
          onChange={(e) => dispatch({ type: "setPhone", value: e.target.value })}
          type="tel"
          placeholder="(XXX) XXX-XXXX"
          className="max-w-sm tabular-nums"
        />
      </Field>

      <ChoiceGroup legend={<span className={GROUP_LEGEND}>Equipment</span>} className={CHIP_GRID}>
        {EQUIPMENT_OPTIONS.map((option) => (
          <CheckCard
            key={option}
            name="equipment"
            value={option}
            title={option}
            checked={data.equipment.includes(option)}
            onChange={() => toggle("equipment", option)}
          />
        ))}
      </ChoiceGroup>

      <ChoiceGroup legend={<span className={GROUP_LEGEND}>Lanes you run</span>} className={CHIP_GRID}>
        {LANE_OPTIONS.map((option) => (
          <CheckCard
            key={option}
            name="lanes"
            value={option}
            title={option}
            checked={data.lanes.includes(option)}
            onChange={() => toggle("lanes", option)}
          />
        ))}
      </ChoiceGroup>

      <ChoiceGroup legend={<span className={GROUP_LEGEND}>Also show</span>}>
        {ALSO_SHOW.map(({ id, label }) => (
          <CheckCard
            key={id}
            name="alsoShow"
            value={id}
            title={label}
            checked={data.alsoShow.includes(id)}
            onChange={() => toggle("alsoShow", id)}
          />
        ))}
      </ChoiceGroup>
    </div>
  );
}
