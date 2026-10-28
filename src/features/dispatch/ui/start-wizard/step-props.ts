import type { Dispatch, Ref } from "react";
import type { StartWizardCopy } from "@/features/dispatch/data/start-wizard-copy";
import type { DispatchAction, DispatchData } from "@/features/dispatch/model/dispatch-start";

export type StepProps = {
  data: DispatchData;
  dispatch: Dispatch<DispatchAction>;
  headingRef: Ref<HTMLHeadingElement>;
  c: StartWizardCopy;
};

export const STEP_HEADING = "font-display text-3xl font-extrabold uppercase outline-none";
export const SEGMENT_BUTTON = "h-[50px] flex-1 basis-[130px] px-3 font-sans text-[15px] font-semibold";
