"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="flex flex-1 flex-col items-center justify-center bg-asphalt px-4 py-20 text-center text-offwhite sm:px-6">
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-white/75 bg-green px-10 py-8 sm:px-16">
          <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber-on-green">
            SOMETHING BROKE DOWN
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl">
            Roadside issue
          </h1>
        </div>

        <p className="mt-7 max-w-md text-lg leading-relaxed text-[#D4D6DA]">
          Something went wrong loading this page. Try again, or head back
          home.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => retry()}
            className="flex h-[60px] items-center justify-center rounded-xl bg-amber px-8 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
          >
            Try again
          </button>
          <Link
            href="/"
            className="flex h-[60px] items-center justify-center rounded-xl border-2 border-offwhite px-8 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite"
          >
            Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-[#8A8F98]">Error ref: {error.digest}</p>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
