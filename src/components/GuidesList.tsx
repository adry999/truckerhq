import Link from "next/link";
import { GUIDES, findGuide, type GuideCategory } from "@/lib/guides";

const CATEGORIES = ["All", "Rates", "Brokers", "Paperwork", "Money", "Starting out"] as const;

const FEATURED_SLUG = "how-to-tell-if-a-load-pays-enough";

export default function GuidesList({ cat }: { cat: string }) {
  const showFeatured = cat === "All" || cat === "Rates";
  const featured = showFeatured ? findGuide(FEATURED_SLUG) : undefined;

  const filtered = GUIDES.filter((g) => {
    if (cat !== "All" && g.category !== (cat as GuideCategory)) return false;
    return true;
  });

  const listGuides = filtered.filter((g) => !featured || g.slug !== featured.slug);

  const chipHref = (next: string) => (next === "All" ? "/guides" : `/guides?cat=${encodeURIComponent(next)}`);

  return (
    <>
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
    </>
  );
}
