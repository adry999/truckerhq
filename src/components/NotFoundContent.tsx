import Link from "next/link";
import StatusPage from "@/components/StatusPage";
import { PHONE_DISPLAY, PHONE_HREF } from "@/shared/config/contact";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import { NOT_FOUND_COPY } from "@/shared/i18n/status-copy";

export default function NotFoundContent({ lang = "EN" }: { lang?: Locale }) {
  const c = getCopy(NOT_FOUND_COPY, lang);

  return (
    <StatusPage
      lang={lang}
      eyebrow={c.eyebrow}
      heading={c.heading}
      headingClassName="font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-7xl"
      body={c.body}
    >
      <div className="mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-2">
        {c.exits.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="flex h-[60px] items-center justify-between rounded-xl bg-amber px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
          >
            {e.label}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>

      <a
        href={PHONE_HREF}
        className="mt-8 text-base font-semibold text-amber hover:underline"
      >
        {c.callPrefix}{PHONE_DISPLAY}
      </a>
    </StatusPage>
  );
}
