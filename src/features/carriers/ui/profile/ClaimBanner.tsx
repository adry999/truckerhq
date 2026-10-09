import Link from "next/link";

export function ClaimBanner() {
  return (
    <section className="bg-amber">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3.5 px-4 py-[18px] sm:px-6">
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-[26px] font-extrabold uppercase leading-tight text-asphalt">
            Is this your company? Claim your profile.
          </span>
          <span className="text-[15px] text-asphalt">
            Add your phone and lanes, get compliance alerts, and show
            brokers you are real. Free.
          </span>
        </div>
        <Link
          href="/claim"
          className="flex h-[52px] items-center rounded-xl bg-asphalt px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-green"
        >
          Claim profile
        </Link>
      </div>
    </section>
  );
}
