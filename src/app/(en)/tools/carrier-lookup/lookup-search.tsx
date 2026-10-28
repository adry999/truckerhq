import { LookupResults, searchCarriers } from "@/features/carriers";

// Awaits FMCSA, so it renders inside a Suspense boundary and streams in after the shell.
export async function LookupSearch({ query, status }: { query: string; status: string }) {
  const search = await searchCarriers(query, status);
  return <LookupResults query={query} status={status} {...search} />;
}

// Search bar stays usable while the upstream call is pending.
export function LookupSearchFallback({ query }: { query: string }) {
  return (
    <>
      <section className="bg-asphalt">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="flex max-w-2xl gap-1.5 rounded-lg border-2 border-amber bg-white p-1.5">
            <div className="min-h-[50px] flex-1 px-3.5 py-3 font-sans text-[17px] text-asphalt">{query}</div>
            <div className="min-h-[50px] rounded-[10px] bg-amber px-[22px] py-2.5 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt">
              Search
            </div>
          </div>
        </div>
      </section>
      <section
        aria-busy="true"
        aria-label="Searching carriers"
        className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 sm:px-6 md:pb-20"
      >
        <div className="h-8 w-48 animate-pulse rounded bg-asphalt/10" />
        <div className="h-24 animate-pulse rounded-lg bg-asphalt/10" />
        <div className="h-24 animate-pulse rounded-lg bg-asphalt/10" />
        <div className="h-24 animate-pulse rounded-lg bg-asphalt/10" />
      </section>
    </>
  );
}
