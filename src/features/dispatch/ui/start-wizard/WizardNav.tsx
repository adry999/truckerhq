import { Button } from "@/shared/ui/Button";
import type { StartWizardCopy } from "@/features/dispatch/data/start-wizard-copy";
import { CALL_STEP } from "@/features/dispatch/model/dispatch-start";

export function WizardNav({
  step,
  submitting,
  blocked = false,
  onBack,
  c,
}: {
  step: number;
  submitting: boolean;
  /** Holds the submit button until the spam check has produced a token. */
  blocked?: boolean;
  onBack: () => void;
  c: StartWizardCopy["nav"];
}) {
  const last = step === CALL_STEP;
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      {step > 0 ? (
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-11 items-center justify-center rounded-lg px-3 font-display text-base font-bold uppercase tracking-[.05em] text-grey hover:text-asphalt sm:-ml-3"
        >
          {c.back}
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      <Button type="submit" size="lg" className="w-full px-7 sm:w-auto" disabled={submitting || blocked}>
        {last ? (submitting ? c.sending : c.submit) : c.next}
      </Button>
    </div>
  );
}
