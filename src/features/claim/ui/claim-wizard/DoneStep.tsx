import type { Ref } from "react";
import { Button } from "@/shared/ui/Button";
import { CheckIcon } from "@/shared/ui/icons";
import { CARRIER } from "@/features/claim/model/claim";

export function DoneStep({ headingRef }: { headingRef: Ref<HTMLHeadingElement> }) {
  return (
    <div className="flex flex-col gap-3.5 py-4">
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green text-amber">
        <CheckIcon size={26} />
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-4xl font-extrabold uppercase leading-tight outline-none"
      >
        Claim received
      </h2>
      <p className="max-w-lg text-base leading-relaxed text-ink-3">
        We verify ownership by phone before any changes go live. Expect a call within 1-2 business
        days.
      </p>
      <div className="mt-1.5 flex flex-wrap gap-3">
        <Button href={`/tools/carrier-lookup/${CARRIER.slug}`} size="lg">
          View sample profile
        </Button>
        <Button href="/tools/compliance-alerts" variant="outline" size="lg">
          Turn on alerts
        </Button>
      </div>
    </div>
  );
}
