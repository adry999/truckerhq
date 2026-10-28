import Link from "next/link";
import { DISPATCH_SERVICE_PAGES } from "@/features/dispatch/data/service-pages";

export function ServiceLinks({ currentSlug }: { currentSlug: string }) {
  const others = DISPATCH_SERVICE_PAGES.filter((p) => p.slug !== currentSlug);
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-14 sm:px-6 md:pb-20">
      <h2 className="font-display text-3xl font-extrabold md:text-4xl">Dispatch by equipment</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/dispatch/${p.slug}`}
              className="flex min-h-14 items-center gap-3 rounded-lg border-[1.5px] border-border bg-white px-5 py-3 font-display text-xl font-extrabold uppercase hover:border-asphalt"
            >
              <span className="h-3 w-3 shrink-0 rounded-sm bg-amber" />
              {p.name} dispatch
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
