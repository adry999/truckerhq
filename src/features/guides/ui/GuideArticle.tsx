import Link from "next/link";
import type { Guide } from "@/features/guides/data/guides";
import { FEATURED_SLUG, readNextGuides, updatedLabel } from "@/features/guides/model/guides";
import { FeaturedGuideBody } from "@/features/guides/ui/FeaturedGuideBody";
import { GuideReadNext } from "@/features/guides/ui/GuideReadNext";

export function GuideArticle({ guide }: { guide: Guide }) {
  const readNext = readNextGuides(guide);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-7 sm:px-6 md:py-10">
      <div className="flex items-center gap-1.5 text-sm text-grey">
        <Link href="/guides" className="font-bold text-asphalt">
          Guides
        </Link>
        <span>/</span>
        <span>{guide.category}</span>
      </div>

      <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
        {guide.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3">
        <div className="h-11 w-11 shrink-0 rounded-full bg-border" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[15px] font-bold">
            {guide.author} <span className="font-normal text-grey">· Trucker HQ dispatch</span>
          </span>
          <span className="text-sm text-grey">
            {guide.minutes} min read · {updatedLabel(guide.date)}
          </span>
        </div>
      </div>

      <div className="aspect-video rounded-lg bg-border" />

      {guide.slug === FEATURED_SLUG ? (
        <FeaturedGuideBody />
      ) : (
        <article>
          <p className="text-lg leading-relaxed">
            This guide is being written by our dispatch team — check back
            soon.
          </p>
        </article>
      )}

      {readNext.length > 0 && <GuideReadNext guides={readNext} />}
    </section>
  );
}
