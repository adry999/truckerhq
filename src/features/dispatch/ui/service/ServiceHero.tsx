import Link from "next/link";
import { PHONE_HREF } from "@/shared/config/contact";
import type { ServicePage } from "@/features/dispatch/data/service-pages";

export function ServiceHero({ page }: { page: ServicePage }) {
  return (
    <section className="relative overflow-hidden bg-asphalt text-offwhite">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-14 sm:px-6 md:py-24">
        <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">{page.eyebrow}</div>
        <h1 className="max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl md:text-7xl">
          {page.h1}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[#D4D6DA] md:text-xl">{page.intro}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dispatch/start"
            className="flex h-14 items-center rounded-xl bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
          >
            Start dispatch
          </Link>
          <a
            href={PHONE_HREF}
            className="flex h-14 items-center rounded-xl border-2 border-offwhite px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
          >
            Call us
          </a>
        </div>
      </div>
      <div className="road-line relative h-1.5" />
    </section>
  );
}
