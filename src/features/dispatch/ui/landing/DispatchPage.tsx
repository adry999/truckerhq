import { getCopy, type Locale } from "@/shared/i18n/locale";
import { DISPATCH_COPY } from "@/features/dispatch/data/dispatch-copy";
import { DispatchHero } from "./DispatchHero";
import { DispatchIncluded } from "./DispatchIncluded";
import { DispatchPricing } from "./DispatchPricing";
import { DispatchSteps } from "./DispatchSteps";
import { DispatchGross } from "./DispatchGross";
import { DispatchFaq } from "./DispatchFaq";
import { DispatchCta } from "./DispatchCta";

export function DispatchPage({ lang }: { lang: Locale }) {
  const c = getCopy(DISPATCH_COPY, lang);

  return (
    <>
      <DispatchHero c={c} />
      <DispatchIncluded c={c} />
      <DispatchPricing c={c} />
      <DispatchSteps c={c} />
      <DispatchGross c={c} lang={lang} />
      <DispatchFaq c={c} />
      <DispatchCta c={c} />
    </>
  );
}
