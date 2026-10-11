import Link from "next/link";

export function NewMcCta() {
  return (
    <section className="px-4 pb-14 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl rounded-[24px] bg-green p-2">
        <div className="flex flex-wrap items-center justify-between gap-7 rounded-xl border-2 border-white/75 px-6 py-10 text-offwhite sm:px-12 sm:py-14">
          <div className="flex max-w-xl flex-col gap-3">
            <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber-on-green">
              NEW MC · FIRST LOADS
            </div>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] md:text-6xl">
              Get through it without losing loads.
            </h2>
            <p className="text-lg leading-relaxed text-[#E3EAE6]">
              Starter MC dispatch covers brokers that accept new authorities
              and walks you through this checklist while you haul.
            </p>
          </div>
          <div className="flex min-w-[280px] flex-col gap-3">
            <Link
              href="/dispatch"
              className="flex h-[60px] items-center justify-center rounded-xl bg-amber px-7 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              See Starter MC
            </Link>
            <Link
              href="/tools/compliance-alerts"
              className="flex h-[60px] items-center justify-center rounded-xl border-2 border-offwhite px-6 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
            >
              Get alerts before anything lapses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
