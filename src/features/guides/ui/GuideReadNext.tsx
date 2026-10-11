import Link from "next/link";
import type { Guide } from "@/features/guides/data/guides";

export function GuideReadNext({ guides }: { guides: Guide[] }) {
  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-border pt-6">
      <span className="font-display text-sm font-bold tracking-[.12em] text-grey">
        READ NEXT
      </span>
      <div className="flex flex-col gap-2.5">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="flex items-center justify-between gap-3 rounded-lg border-[1.5px] border-border bg-white p-4 hover:border-green"
          >
            <span className="text-base font-bold">{g.title}</span>
            <span className="shrink-0 text-sm text-grey">{g.minutes} min</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
