import Link from "next/link";
import StatusPage from "@/components/StatusPage";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import { ERROR_COPY } from "@/shared/i18n/status-copy";

type ErrorContentProps = {
  lang?: Locale;
  digest?: string;
  retry: () => void;
};

export default function ErrorContent({ lang = "EN", digest, retry }: ErrorContentProps) {
  const c = getCopy(ERROR_COPY, lang);

  return (
    <StatusPage
      lang={lang}
      eyebrow={c.eyebrow}
      heading={c.heading}
      headingClassName="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl"
      body={c.body}
    >
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => retry()}
          className="flex h-[60px] items-center justify-center rounded-xl bg-amber px-8 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
        >
          {c.retryLabel}
        </button>
        <Link
          href={c.homeHref}
          className="flex h-[60px] items-center justify-center rounded-xl border-2 border-offwhite px-8 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite"
        >
          {c.homeLabel}
        </Link>
      </div>

      {digest && (
        <p className="mt-6 text-xs text-[#8A8F98]">{c.refPrefix}{digest}</p>
      )}
    </StatusPage>
  );
}
