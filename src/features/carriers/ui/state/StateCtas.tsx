import Link from "next/link";

export function StateCtas({
  stateName,
  dispatchCtaEyebrow,
  dispatchCtaTitle,
  dispatchCtaBody,
  hireCtaBody,
}: {
  stateName: string;
  dispatchCtaEyebrow: string;
  dispatchCtaTitle: string;
  dispatchCtaBody: string;
  hireCtaBody: string;
}) {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 md:py-14">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[10px] bg-green p-1.5">
          <div className="flex h-full flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6 text-offwhite">
            <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">
              {dispatchCtaEyebrow}
            </div>
            <div className="font-display text-4xl font-extrabold uppercase leading-[0.95]">
              {dispatchCtaTitle}
            </div>
            <div className="flex-1 text-base leading-relaxed text-[#E3EAE6]">
              {dispatchCtaBody}
            </div>
            <Link
              href="/dispatch"
              className="flex h-14 w-fit items-center rounded-xl bg-amber px-[26px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              See dispatch
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 rounded-[10px] bg-asphalt p-6 text-offwhite shadow-[inset_0_0_0_1.5px_rgba(247,247,245,.14)]">
          <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
            HIRING IN {stateName.toUpperCase()}?
          </div>
          <div className="font-display text-4xl font-extrabold uppercase leading-[0.95]">
            Find CDL drivers near you
          </div>
          <div className="flex-1 text-base leading-relaxed text-[#C9CBCF]">
            {hireCtaBody}
          </div>
          <Link
            href="/hire-drivers"
            className="flex h-14 w-fit items-center rounded-xl border-2 border-offwhite px-[26px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
          >
            Hire drivers
          </Link>
        </div>
      </div>
    </section>
  );
}
