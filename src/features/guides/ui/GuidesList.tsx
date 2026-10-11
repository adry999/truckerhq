"use client";

import Link from "next/link";
import { GUIDES } from "@/features/guides/data/guides";
import { FEATURED_SLUG, FEATURED_SUMMARY, findGuide } from "@/features/guides/model/guides";
import { useSearchParam } from "@/shared/hooks/useSearchParam";
import { Badge } from "@/shared/ui/Badge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { FilterChips } from "@/shared/ui/FilterChips";

const CATEGORIES = ["All", "Rates", "Brokers", "Paperwork", "Money", "Starting out"] as const;

export function GuidesListView({ cat }: { cat: string }) {
  const featured = cat === "All" || cat === "Rates" ? findGuide(FEATURED_SLUG) : undefined;

  const filtered = GUIDES.filter((g) => cat === "All" || g.category === cat);
  const listGuides = filtered.filter((g) => g.slug !== featured?.slug);

  return (
    <>
      <FilterChips
        param="cat"
        options={CATEGORIES}
        current={cat === "All" ? {} : { cat }}
        basePath="/guides"
        label="Guide categories"
        uppercase
      />

      {featured && (
        <Link
          href={`/guides/${featured.slug}`}
          className="grid gap-5 rounded-lg border-[1.5px] border-border bg-white p-5 hover:border-green sm:grid-cols-[1.1fr_1fr] sm:p-6"
        >
          <div className="aspect-video rounded-lg bg-border sm:order-2" />
          <div className="flex flex-col justify-center gap-3 sm:order-1">
            <div className="flex flex-wrap gap-1.5">
              <Badge className="rounded-md">{featured.category.toUpperCase()}</Badge>
              <Badge variant="muted" className="rounded-md">
                {featured.minutes} MIN
              </Badge>
            </div>
            <h2 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">{featured.title}</h2>
            <p className="text-base leading-relaxed text-ink-3">{FEATURED_SUMMARY}</p>
            <span className="text-sm text-grey">By {featured.author}</span>
          </div>
        </Link>
      )}

      <div className="flex flex-col overflow-hidden rounded-lg border-[1.5px] border-border bg-white">
        {listGuides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-divider p-5 last:border-b-0 hover:bg-offwhite"
          >
            <span className="text-lg font-bold">{g.title}</span>
            <span className="flex shrink-0 items-center gap-3 text-sm text-grey">
              <span className="font-display text-[13px] font-bold tracking-[.08em] text-ink-2">
                {g.category.toUpperCase()}
              </span>
              <span>{g.minutes} min</span>
            </span>
          </Link>
        ))}
        {listGuides.length === 0 && !featured && (
          <EmptyState bordered={false}>No guides in this category yet.</EmptyState>
        )}
      </div>
    </>
  );
}

export default function GuidesList() {
  return <GuidesListView cat={useSearchParam("cat", "All")} />;
}
