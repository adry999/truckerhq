import { NEW_MC_COPY } from "@/features/compliance/data/new-mc-checklist";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import { Steps } from "@/shared/ui/Steps";

export function NewMcAudit({ lang = "EN" }: { lang?: Locale }) {
  const c = getCopy(NEW_MC_COPY, lang);
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
        <div className="flex flex-col gap-2">
          <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
            {c.auditEyebrow}
          </div>
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            {c.auditHeading}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">
            {c.auditIntro}
          </p>
        </div>
        <Steps items={c.auditSteps} />
      </div>
    </section>
  );
}
