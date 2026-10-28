import type { Ref } from "react";
import { PHONE_HREF } from "@/shared/config/contact";
import { Button } from "@/shared/ui/Button";
import { CheckIcon } from "@/shared/ui/icons";
import type { StartWizardCopy } from "@/features/dispatch/data/start-wizard-copy";
import type { DispatchData } from "@/features/dispatch/model/dispatch-start";

export function SuccessPanel({
  data,
  headingRef,
  c,
}: {
  data: DispatchData;
  headingRef: Ref<HTMLHeadingElement>;
  c: StartWizardCopy;
}) {
  const s = c.success;
  const when = s.callTimes[data.bestTime] ?? s.callTimeFallback;
  const language = data.language === "English" ? s.languages.english : s.languages.other;
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
        {s.heading}
      </h2>
      <p className="max-w-md text-base leading-relaxed text-ink-3">
        {s.body(data.phone.trim() || s.you, when, language)}
      </p>
      <div className="w-full max-w-md rounded-lg bg-surface-muted p-5 text-left">
        <span className="font-display text-lg font-extrabold uppercase">{s.readyHeading}</span>
        <ul className="mt-3 flex flex-col gap-2.5">
          {s.ready.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
              <CheckIcon size={20} strokeWidth={3.5} className="mt-0.5 shrink-0 text-green" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Button href={PHONE_HREF} variant="outline" size="lg" className="mt-1.5 px-7">
        {s.callNow}
      </Button>
    </div>
  );
}
