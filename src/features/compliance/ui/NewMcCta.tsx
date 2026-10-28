import Link from "next/link";
import { NEW_MC_COPY } from "@/features/compliance/data/new-mc-checklist";
import { getCopy, type Locale } from "@/shared/i18n/locale";

export function NewMcCta({ lang = "EN" }: { lang?: Locale }) {
  const c = getCopy(NEW_MC_COPY, lang).cta;
  return (
    <section className="px-4 pb-14 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl rounded-[24px] bg-green p-2">
        <div className="flex flex-wrap items-center justify-between gap-7 rounded-xl border-2 border-white/75 px-6 py-10 text-offwhite sm:px-12 sm:py-14">
          <div className="flex max-w-xl flex-col gap-3">
            <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber-on-green">
              {c.eyebrow}
            </div>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] md:text-6xl">
              {c.heading}
            </h2>
            <p className="text-lg leading-relaxed text-[#E3EAE6]">
              {c.body}
            </p>
          </div>
          <div className="flex min-w-[280px] flex-col gap-3">
            <Link
              href={c.primaryHref}
              className="flex h-[60px] items-center justify-center rounded-xl bg-amber px-7 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              {c.primary}
            </Link>
            <Link
              href={c.secondaryHref}
              className="flex h-[60px] items-center justify-center rounded-xl border-2 border-offwhite px-6 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
            >
              {c.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
