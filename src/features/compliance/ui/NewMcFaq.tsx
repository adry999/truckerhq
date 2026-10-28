import { FaqList } from "@/shared/ui/FaqList";
import { NEW_MC_COPY } from "@/features/compliance/data/new-mc-checklist";
import { getCopy, type Locale } from "@/shared/i18n/locale";

export function NewMcFaq({ lang = "EN" }: { lang?: Locale }) {
  const c = getCopy(NEW_MC_COPY, lang);
  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.faqHeading}</h2>
        <FaqList items={c.faq} />
      </div>
    </section>
  );
}
