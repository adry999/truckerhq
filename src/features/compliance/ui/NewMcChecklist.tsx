import Link from "next/link";
import { NEW_MC_COPY } from "@/features/compliance/data/new-mc-checklist";
import { NewMcAudit } from "@/features/compliance/ui/NewMcAudit";
import { NewMcCardGrid } from "@/features/compliance/ui/NewMcCardGrid";
import { NewMcCta } from "@/features/compliance/ui/NewMcCta";
import { NewMcFaq } from "@/features/compliance/ui/NewMcFaq";
import { getCopy, type Locale } from "@/shared/i18n/locale";

export function NewMcChecklist({ lang = "EN" }: { lang?: Locale }) {
  const c = getCopy(NEW_MC_COPY, lang);
  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:py-16">
          <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
            <Link href={c.toolsHref} className="text-offwhite">{c.toolsLabel}</Link>
            <span>/</span>
            <span>{c.crumb}</span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            {c.h1}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">{c.intro}</p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.beforeHeading}</h2>
        <NewMcCardGrid items={c.beforeYouHaul} dotClassName="bg-amber" />
      </section>

      <NewMcAudit lang={lang} />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.shutdownHeading}</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">{c.shutdownIntro}</p>
        </div>
        <NewMcCardGrid items={c.shutdownReasons} dotClassName="bg-red" />
      </section>

      <NewMcFaq lang={lang} />
      <NewMcCta lang={lang} />
    </>
  );
}
