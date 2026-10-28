import { Segmented } from "@/shared/ui/Segmented";
import { DRIVER_TYPES, TRAILER_TYPES, setField } from "@/features/dispatch/model/dispatch-start";
import { SEGMENT_BUTTON, STEP_HEADING, type StepProps } from "../step-props";
import { TruckCounter } from "../TruckCounter";

export function TruckStep({ data, dispatch, headingRef, c }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <h2 ref={headingRef} tabIndex={-1} className={STEP_HEADING}>
        {c.truck.heading}
      </h2>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">{c.truck.trailer}</span>
        <Segmented
          options={TRAILER_TYPES}
          value={data.trailer}
          onChange={(v) => dispatch(setField("trailer", v))}
          label={c.truck.trailer}
          labels={c.options}
          buttonClassName={SEGMENT_BUTTON}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span id="trucks-label" className="text-sm font-semibold">
          {c.truck.trucks}
        </span>
        <TruckCounter
          value={data.trucks}
          onChange={(v) => dispatch(setField("trucks", v))}
          fewerLabel={c.truck.fewer}
          moreLabel={c.truck.more}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">{c.truck.driver}</span>
        <Segmented
          options={DRIVER_TYPES}
          value={data.driver}
          onChange={(v) => dispatch(setField("driver", v))}
          label={c.truck.driver}
          labels={c.options}
          buttonClassName={SEGMENT_BUTTON}
        />
      </div>
    </div>
  );
}
