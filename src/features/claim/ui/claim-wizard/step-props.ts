import type { Dispatch, Ref } from "react";
import type { ClaimAction, ClaimData } from "../../model/claim";

export type StepProps = {
  data: ClaimData;
  dispatch: Dispatch<ClaimAction>;
  headingRef: Ref<HTMLHeadingElement>;
};

export const STEP_HEADING = "font-display text-3xl font-extrabold uppercase leading-tight outline-none";
