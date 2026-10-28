"use client";

import { useReducer, type FormEvent } from "react";
import { trackEvent } from "@/shared/client/analytics";
import { postJson } from "@/shared/client/post-json";
import { splitFieldErrors, useFieldErrors, useFocusInvalid } from "@/shared/hooks/useFieldErrors";
import { useStepFocus } from "@/shared/hooks/useStepFocus";
import { useTurnstile } from "@/shared/hooks/useTurnstile";
import { Button } from "@/shared/ui/Button";
import { FormError, Honeypot } from "@/shared/ui/form-bits";
import { Notice } from "@/shared/ui/Notice";
import { StepProgress } from "@/shared/ui/StepProgress";
import { Turnstile } from "@/shared/ui/Turnstile";
import {
  type ClaimAction,
  CARRIER,
  DETAILS_STEP,
  DONE_STEP,
  STEPS,
  buildPayload,
  canAdvance,
  claimReducer,
  firstErrorStep,
  initialClaimState,
  isClaimField,
} from "@/features/claim/model/claim";
import { ContactStep } from "./ContactStep";
import { DetailsStep } from "./DetailsStep";
import { DoneStep } from "./DoneStep";
import { PreviewAside } from "./PreviewAside";

const GENERIC_ERROR = "Something went wrong. Try again in a moment.";

export function ClaimProfileWizard() {
  const [{ step, data, status, error }, dispatch] = useReducer(claimReducer, initialClaimState);
  const headingRef = useStepFocus(step);
  const submitting = status === "submitting";
  const turnstile = useTurnstile();
  const { fieldErrors, setFieldErrors, clearFieldError, clearFieldErrors } = useFieldErrors();
  const { formRef, requestFocus } = useFocusInvalid();

  /** Editing a field drops the server error shown for it. */
  function dispatchEdit(action: ClaimAction) {
    if (action.type === "setContactMethod") clearFieldError("contactMethod");
    else if (action.type === "setPhone") clearFieldError("phone");
    else if (action.type === "toggle") clearFieldError(action.field);
    dispatch(action);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < DETAILS_STEP) {
      dispatch({ type: "next" });
      return;
    }
    const website = new FormData(e.currentTarget).get("website");
    clearFieldErrors();
    dispatch({ type: "submitStart" });
    const result = await postJson(
      "/api/claim",
      {
        ...buildPayload(data, typeof website === "string" ? website : ""),
        ...(turnstile.token ? { turnstileToken: turnstile.token } : {}),
      },
    );
    if (!result.ok) {
      turnstile.reset();
      const { matched, hasUnmatched } = splitFieldErrors(result.fields, isClaimField);
      const errorStep = firstErrorStep(matched);
      if (errorStep !== null) {
        setFieldErrors(matched);
        requestFocus();
        if (errorStep < step) dispatch({ type: "goTo", step: errorStep });
      }
      const message = errorStep !== null && !hasUnmatched ? null : (result.message ?? GENERIC_ERROR);
      dispatch({ type: "submitFailed", message });
      return;
    }
    trackEvent("carrier_profile_claimed", { dot: CARRIER.dot });
    dispatch({ type: "submitted" });
  }

  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 md:pb-10">
          <StepProgress steps={STEPS} current={step} />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-3 md:py-12">
        <div className="flex min-w-0 flex-col gap-5 md:col-span-2">
          <Notice>
            Demo: the carrier shown is a sample. Ownership claims are verified manually by phone.
          </Notice>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex flex-col gap-5 rounded-lg border border-border bg-white p-[22px]"
          >
            <Honeypot />
            {step === 0 && (
              <ContactStep
                data={data}
                dispatch={dispatchEdit}
                headingRef={headingRef}
                fieldErrors={fieldErrors}
              />
            )}
            {step === DETAILS_STEP && (
              <DetailsStep
                data={data}
                dispatch={dispatchEdit}
                headingRef={headingRef}
                fieldErrors={fieldErrors}
              />
            )}
            {step === DONE_STEP && <DoneStep headingRef={headingRef} />}

            {step === DETAILS_STEP && <Turnstile controller={turnstile} />}

            {step !== DONE_STEP && (
              <div className="flex items-center justify-between gap-3 border-t border-divider pt-5">
                {step === DETAILS_STEP ? (
                  <Button variant="ghost" onClick={() => dispatch({ type: "back" })}>
                    ← Back
                  </Button>
                ) : (
                  <span />
                )}
                <Button type="submit" size="lg" className="px-7" disabled={!canAdvance(step, data) || submitting || (step === DETAILS_STEP && !turnstile.ready)}>
                  {step === 0 ? "Continue" : submitting ? "Submitting..." : "Submit claim"}
                </Button>
              </div>
            )}
            <FormError message={error} />
          </form>
        </div>
        <PreviewAside step={step} data={data} />
      </section>
    </>
  );
}
