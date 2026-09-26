import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { guidesListSchema } from "@/lib/seo";
import { GUIDES, findGuide, type GuideCategory } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Trucking Guides for Owner-Operators",
  description:
    "Practical answers on rates, brokers, paperwork and starting your authority, from our dispatchers.",
};

const CATEGORIES = ["All", "Rates", "Brokers", "Paperwork", "Money", "Starting out"] as const;

const FEATURED_SLUG = "how-to-tell-if-a-load-pays-enough";

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const params = await searchParams;
  const cat = (params.cat ?? "All") as (typeof CATEGORIES)[number];

  const showFeatured = cat === "All" || cat === "Rates";
  const featured = showFeatured ? findGuide(FEATURED_SLUG) : undefined;

  const filtered = GUIDES.filter((g) => {
    if (cat !== "All" && g.category !== (cat as GuideCategory)) return false;
    return true;
  });

  const listGuides = filtered.filter((g) => !featured || g.slug !== featured.slug);

  const chipHref = (next: string) => (next === "All" ? "/guides" : `/guides?cat=${encodeURIComponent(next)}`);

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={guidesListSchema(GUIDES, "https://truckerhq.com")} />
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-20">
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Guides for <span className="text-amber">owner-operators</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Short, practical answers from our dispatchers: rates, brokers,
            paperwork and starting out. Every guide in English and Russian.
          </p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-7 sm:px-6 md:pb-20">
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={chipHref(c)}
              className={`flex h-11 shrink-0 items-center rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
                cat === c
                  ? "bg-asphalt text-offwhite"
                  : "border-[1.5px] border-border bg-white text-asphalt"
              }`}
            >
              {c.toUpperCase()}
            </Link>
          ))}
        </div>

        {featured && (
          <Link
            href={`/guides/${featured.slug}`}
            className="grid gap-5 rounded-lg border-[1.5px] border-border bg-white p-5 hover:border-green sm:grid-cols-[1.1fr_1fr] sm:p-6"
          >
            <div className="aspect-video rounded-lg bg-border sm:order-2" />
            <div className="flex flex-col justify-center gap-3 sm:order-1">
              <div className="flex flex-wrap gap-1.5">
                <span className="flex h-7 items-center rounded-md bg-[#E2F0E8] px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-green">
                  {featured.category.toUpperCase()}
                </span>
                <span className="flex h-7 items-center rounded-md bg-[#EEEFEC] px-2.5 font-display text-[15px] font-bold tracking-[.06em] text-[#3F444B]">
                  {featured.minutes} MIN
                </span>
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="text-base leading-relaxed text-[#3F444B]">
                Work out your cost per mile, add deadhead, and know your
                walk-away number before you call the broker.
              </p>
              <span className="text-sm text-grey">By {featured.author}</span>
            </div>
          </Link>
        )}

        <div className="flex flex-col overflow-hidden rounded-lg border-[1.5px] border-border bg-white">
          {listGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEDEA] p-5 last:border-b-0 hover:bg-offwhite"
            >
              <span className="text-lg font-bold">{g.title}</span>
              <span className="flex shrink-0 items-center gap-3 text-sm text-grey">
                <span className="font-display text-[13px] font-bold tracking-[.08em] text-[#4B5058]">
                  {g.category.toUpperCase()}
                </span>
                <span>{g.minutes} min</span>
              </span>
            </Link>
          ))}
          {listGuides.length === 0 && !featured && (
            <div className="p-10 text-center text-base text-[#4B5058]">
              No guides in this category yet.
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg bg-green p-6 text-offwhite">
            <span className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
              NEW MC CHECKLIST
            </span>
            <span className="font-display text-2xl font-extrabold uppercase leading-tight">
              17 steps for your first 6 months, with progress saved.
            </span>
            <Link
              href="/tools/new-mc-checklist"
              className="mt-1 flex h-12 w-fit items-center rounded-lg bg-amber px-6 font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              Open checklist
            </Link>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border-[1.5px] border-border bg-white p-6">
            <span className="font-display text-[15px] font-bold tracking-[.14em] text-grey">
              PROFIT PER MILE
            </span>
            <span className="font-display text-2xl font-extrabold uppercase leading-tight">
              Put the numbers from the guide into the calculator.
            </span>
            <Link
              href="/tools/profit-per-mile"
              className="mt-1 flex h-12 w-fit items-center rounded-lg bg-asphalt px-6 font-display text-lg font-extrabold uppercase tracking-[.05em] text-offwhite"
            >
              Open calculator
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
