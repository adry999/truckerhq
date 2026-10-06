import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { STATE_DIRECTORY } from "@/lib/states";

export const metadata: Metadata = buildMetadata({
  title: "Carrier Directory by State",
  description:
    "Browse for-hire interstate carriers by state, from public FMCSA data. Search DOT and MC numbers and check any carrier's Health Score.",
  path: "/carriers",
  ogImage: false,
});

export default function CarriersIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <section className="border-b border-border bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:px-6 md:py-16">
          <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.9] sm:text-5xl">
            Carriers by state
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Every for-hire interstate carrier, from public FMCSA data. Pick a
            state to search DOT and MC numbers, filter by equipment and check
            any carrier&apos;s Health Score.
          </p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {STATE_DIRECTORY.map((s) => (
            <Link
              key={s.slug}
              href={`/carriers/${s.slug}`}
              className="flex h-11 items-center gap-2 rounded-[10px] border-[1.5px] border-border bg-white px-3.5 text-[15px] font-semibold hover:border-green"
            >
              {s.name}
              <span className="text-[13px] font-medium text-grey">{s.count}</span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
