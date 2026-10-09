import type { Ref } from "react";
import { PHONE_HREF } from "@/lib/contact";
import { Button } from "@/shared/ui/Button";
import { CheckIcon } from "@/shared/ui/icons";
import { callTimePhrase, languageName, type DispatchData } from "../../model/dispatch-start";

const READY_ITEMS = [
  "MC authority letter and W-9",
  "Certificate of insurance",
  "Truck and trailer numbers",
  "Factoring company, if you use one",
];

export function SuccessPanel({
  data,
  headingRef,
}: {
  data: DispatchData;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-white p-7 text-center sm:p-10">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green text-amber">
        <CheckIcon size={28} strokeWidth={3.5} />
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-4xl font-extrabold uppercase leading-tight outline-none"
      >
        You&apos;re on the list
      </h2>
      <p className="max-w-md text-base leading-relaxed text-ink-3">
        A dispatcher will call {data.phone.trim() || "you"} {callTimePhrase(data.bestTime)}, in{" "}
        {languageName(data.language)}. The call takes about 10 minutes.
      </p>
      <div className="w-full max-w-md rounded-lg bg-surface-muted p-5 text-left">
        <span className="font-display text-lg font-extrabold uppercase">Have these ready</span>
        <ul className="mt-3 flex flex-col gap-2.5">
          {READY_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
              <CheckIcon size={20} strokeWidth={3.5} className="mt-0.5 shrink-0 text-green" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Button href={PHONE_HREF} variant="outline" size="lg" className="mt-1.5 px-7">
        Can&apos;t wait? Call now
      </Button>
    </div>
  );
}
