"use client";

import { JOBS_COPY } from "@/lib/jobs-copy";
import { useSearchParam } from "@/shared/hooks/useSearchParam";

export function JobsSearchFormView({ lang, q }: { lang: "EN" | "RU"; q: string }) {
  const c = JOBS_COPY[lang];

  return (
    <form
      action={c.basePath}
      className="flex max-w-3xl flex-col gap-1.5 rounded-lg border-[3px] border-amber bg-white p-1.5 sm:flex-row"
    >
      <input
        name="q"
        defaultValue={q}
        aria-label={c.searchAriaLabel}
        placeholder={c.searchPlaceholder}
        className="min-h-[58px] flex-1 border-0 bg-transparent px-3.5 font-sans text-lg text-asphalt outline-none"
      />
      <button
        type="submit"
        className="min-h-[58px] rounded bg-amber px-8 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt"
      >
        {c.searchButton}
      </button>
    </form>
  );
}

export default function JobsSearchForm({ lang }: { lang: "EN" | "RU" }) {
  return <JobsSearchFormView lang={lang} q={useSearchParam("q", "").trim().toLowerCase()} />;
}
