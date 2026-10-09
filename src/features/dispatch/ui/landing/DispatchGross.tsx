import type { Locale } from "@/shared/i18n/locale";
import type { DispatchCopy } from "@/features/dispatch/data/dispatch-copy";
import { GrossComparison } from "./GrossComparison";

export function DispatchGross({ c, lang }: { c: DispatchCopy; lang: Locale }) {
  return (
    <section className="bg-asphalt text-offwhite">
      <div className="mx-auto flex max-w-6xl flex-col gap-9 px-4 py-14 sm:px-6 md:py-24">
        <div className="flex flex-col gap-2">
          <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">{c.grossEyebrow}</div>
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.grossHeading}</h2>
        </div>
        <GrossComparison lang={lang} />
      </div>
    </section>
  );
}
