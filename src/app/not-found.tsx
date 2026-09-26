import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const EXITS = [
  { label: "Home", href: "/" },
  { label: "Dispatch", href: "/dispatch" },
  { label: "CDL jobs", href: "/jobs" },
  { label: "Carrier Lookup", href: "/tools/carrier-lookup" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="flex flex-1 flex-col items-center justify-center bg-asphalt px-4 py-20 text-center text-offwhite sm:px-6">
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-white/75 bg-green px-10 py-8 sm:px-16">
          <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
            EXIT 404
          </div>
          <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
            Road closed
          </h1>
        </div>

        <p className="mt-7 max-w-md text-lg leading-relaxed text-[#D4D6DA]">
          This page doesn&apos;t exist or has moved. Take one of these exits
          instead.
        </p>

        <div className="mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-2">
          {EXITS.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="flex h-[60px] items-center justify-between rounded-xl bg-amber px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              {e.label}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          ))}
        </div>

        <a
          href="tel:+1XXXXXXXXXX"
          className="mt-8 text-base font-semibold text-amber hover:underline"
        >
          Or call dispatch 24/7: (XXX) XXX-XXXX
        </a>
      </section>

      <SiteFooter />
    </div>
  );
}
