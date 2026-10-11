import { Button } from "@/shared/ui/Button";
import { CALL_STEP } from "@/features/dispatch/model/dispatch-start";

export function WizardNav({
  step,
  submitting,
  onBack,
}: {
  step: number;
  submitting: boolean;
  onBack: () => void;
}) {
  const last = step === CALL_STEP;
  return (
    <div className="flex items-center justify-between">
      {step > 0 ? (
        <button
          type="button"
          onClick={onBack}
          className="font-display text-base font-bold uppercase tracking-[.05em] text-grey hover:text-asphalt"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <Button type="submit" size="lg" className="px-7" disabled={submitting}>
        {last ? (submitting ? "Sending..." : "Request my call") : "Next"}
      </Button>
    </div>
  );
}
