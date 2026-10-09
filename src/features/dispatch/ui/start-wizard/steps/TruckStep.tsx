import { Segmented } from "@/shared/ui/Segmented";
import { DRIVER_TYPES, TRAILER_TYPES, setField } from "../../../model/dispatch-start";
import { SEGMENT_BUTTON, STEP_HEADING, type StepProps } from "../step-props";
import { TruckCounter } from "../TruckCounter";

export function TruckStep({ data, dispatch, headingRef }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        Your truck
      </h2>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Trailer type</span>
        <Segmented
          options={TRAILER_TYPES}
          value={data.trailer}
          onChange={(v) => dispatch(setField("trailer", v))}
          label="Trailer type"
          buttonClassName={SEGMENT_BUTTON}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span id="trucks-label" className="text-sm font-semibold">
          How many trucks?
        </span>
        <TruckCounter value={data.trucks} onChange={(v) => dispatch(setField("trucks", v))} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Who drives?</span>
        <Segmented
          options={DRIVER_TYPES}
          value={data.driver}
          onChange={(v) => dispatch(setField("driver", v))}
          label="Who drives?"
          buttonClassName={SEGMENT_BUTTON}
        />
      </div>
    </div>
  );
}
