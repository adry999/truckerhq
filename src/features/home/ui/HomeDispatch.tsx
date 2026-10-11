import Image from "next/image";
import Link from "next/link";
import type { HomeCopy } from "@/features/home/data/home-copy";

export function HomeDispatch({ c, ru }: { c: HomeCopy; ru: boolean }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.dispatchHeading}</h2>
      <div className="grid gap-4 md:grid-cols-[1.35fr_1fr]">
        <div className="row-span-2 flex flex-col overflow-hidden rounded-lg bg-green text-offwhite">
          <div className="relative h-[220px]">
            <Image
              src="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
              alt={ru ? "Диспетчерская Trucker HQ" : "Trucker HQ dispatch office"}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-7">
            <div className="font-display text-5xl font-extrabold uppercase leading-[0.95]">
              {c.dispatchCardTitle}
            </div>
            <div className="max-w-md text-lg font-medium leading-snug">{c.dispatchCardBody}</div>
            <ul className="grid flex-1 grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
              {c.dispatchItems.map((it) => (
                <li key={it} className="flex gap-2.5 text-[15px] leading-snug text-[#E3EAE6]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F2A900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {it}
                </li>
              ))}
            </ul>
            <Link
              href={c.dispatchCardCtaHref}
              className="mt-2 flex h-14 w-fit items-center rounded-[10px] bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              {c.dispatchCardCtaLabel}
            </Link>
          </div>
        </div>
        {c.smallServices.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="flex flex-col gap-3 rounded-lg border-[1.5px] border-border bg-white p-6 hover:border-green"
          >
            <div className="font-display text-3xl font-extrabold uppercase leading-[0.95]">{s.title}</div>
            <div className="flex-1 text-base leading-relaxed text-[#3F444B]">{s.line}</div>
            <div className="flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-[.05em] text-green">
              {s.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
