"use client";

import { useReducer, useState, type FormEvent } from "react";
import { trackEvent } from "@/shared/client/analytics";
import { postJson } from "@/shared/client/post-json";
import { SMS_CONSENT_VERSION } from "@/shared/config/sms-consent";
import { useStepFocus } from "@/shared/hooks/useStepFocus";
import { useTurnstile } from "@/shared/hooks/useTurnstile";
import { FormError, Honeypot } from "@/shared/ui/form-bits";
import { SmsConsent } from "@/shared/ui/SmsConsent";
import { StepProgress } from "@/shared/ui/StepProgress";
import { Turnstile } from "@/shared/ui/Turnstile";
import {
  CALL_STEP,
  DONE_STEP,
  STEP_LABELS,
  buildPayload,
  canAdvance,
  dispatchReducer,
  initialDispatchState,
} from "@/features/dispatch/model/dispatch-start";
import { AuthorityStep } from "./steps/AuthorityStep";
import { CallStep } from "./steps/CallStep";
import { LanesStep } from "./steps/LanesStep";
import { TruckStep } from "./steps/TruckStep";
import { SuccessPanel } from "./SuccessPanel";
import { SummaryAside } from "./SummaryAside";
import { WizardNav } from "./WizardNav";

const STEPS = [TruckStep, LanesStep, AuthorityStep, CallStep];
const GENERIC_ERROR = "Something went wrong. Try again, or call us directly.";

export function DispatchStartWizard() {
  const [{ step, data, status, error }, dispatch] = useReducer(dispatchReducer, initialDispatchState);
  const headingRef = useStepFocus(step);
  const [smsConsent, setSmsConsent] = useState(false);
  const turnstile = useTurnstile();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < CALL_STEP) {
      dispatch({ type: "next" });
      return;
    }
    if (!canAdvance(step, data)) return;
    const website = new FormData(e.currentTarget).get("website");
    dispatch({ type: "submitStart" });
    const result = await postJson(
      "/api/dispatch-start",
      {
        ...buildPayload(data, typeof website === "string" ? website : ""),
        smsConsent,
        smsConsentVersion: SMS_CONSENT_VERSION,
        ...(turnstile.token ? { turnstileToken: turnstile.token } : {}),
      },
    );
    if (!result.ok) {
      turnstile.reset();
      dispatch({ type: "submitFailed", message: result.message ?? GENERIC_ERROR });
      return;
    }
    trackEvent("dispatch_start_request", { trucks: data.trucks, authority: data.authority });
    dispatch({ type: "submitted" });
  }

  const Step = STEPS[step];

  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pb-10 pt-6 sm:px-6 md:pb-14">
          <StepProgress
            steps={STEP_LABELS}
            current={step}
            onSelect={(index) => dispatch({ type: "goTo", step: index })}
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-14">
        <div className="grid gap-6 min-[900px]:grid-cols-3">
          <div className="min-[900px]:col-span-2">
            {step === DONE_STEP ? (
              <SuccessPanel data={data} headingRef={headingRef} />
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-7 rounded-lg border border-border bg-white p-[22px] sm:p-7"
              >
                <Honeypot />
                <Step data={data} dispatch={dispatch} headingRef={headingRef} />
                {step === CALL_STEP && (
                  <>
                    <SmsConsent checked={smsConsent} onChange={setSmsConsent} />
                    <Turnstile controller={turnstile} />
                  </>
                )}
                <WizardNav
                  step={step}
                  submitting={status === "submitting"}
                  blocked={step === CALL_STEP && !turnstile.ready}
                  onBack={() => dispatch({ type: "back" })}
                />
                <FormError message={error} />
              </form>
            )}
          </div>
          <SummaryAside step={step} data={data} />
        </div>
      </section>
    </>
  );
}
