import Image from "next/image";
import Link from "next/link";

export function StateHero({
  stateAbbr,
  stateName,
  heroImage,
  heroAlt,
  heroDescription,
}: {
  stateAbbr: string;
  stateName: string;
  heroImage: string;
  heroAlt: string;
  heroDescription: string;
}) {
  return (
    <section className="relative overflow-hidden bg-asphalt text-offwhite">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(22,24,27,.95)] via-[rgba(22,24,27,.7)] to-[rgba(22,24,27,.4)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-[88px]">
        <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
          <Link href="/tools/carrier-lookup" className="text-offwhite">
            Carrier Lookup
          </Link>
          <span>/</span>
          <Link href="/carriers" className="text-offwhite">
            States
          </Link>
          <span>/</span>
          <span className="text-amber">{stateName}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3.5">
          <span className="flex h-14 min-w-[72px] items-center justify-center rounded-[10px] border-2 border-offwhite bg-green px-3 font-display text-[34px] font-extrabold">
            {stateAbbr}
          </span>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            {stateName} carriers
          </h1>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
          {heroDescription}
        </p>
      </div>
      <div className="road-line relative h-1.5" />
    </section>
  );
}
