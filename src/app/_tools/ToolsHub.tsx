import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { STATE_DIRECTORY } from "@/features/carriers";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import { TOOLS_HUB_COPY } from "./tools-hub-copy";

function Arrow({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ToolsHub({ lang }: { lang: Locale }) {
  const t = getCopy(TOOLS_HUB_COPY, lang);

  return (
    <div className="flex min-h-screen flex-col">
      {lang === "RU" ? (
        <SiteHeader lang="RU" enHref="/tools" ruHref="/ru/tools" />
      ) : (
        <SiteHeader />
      )}
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <section className="bg-asphalt text-offwhite">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:px-6 md:py-20">
            <span className="flex h-7 w-fit items-center rounded-md bg-amber px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-asphalt">
              {t.badge}
            </span>
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
              {t.h1}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">{t.intro}</p>
          </div>
          <div className="road-line h-1.5" />
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 md:py-16">
          <Link
            href={t.lookup.href}
            className="flex flex-col gap-[18px] rounded-lg bg-green p-6 text-offwhite hover:bg-[#0B4F31] md:col-span-2 md:row-span-2 md:p-9"
          >
            <div className="font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-6xl">
              {t.lookup.title}
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-[#E3EAE6]">{t.lookup.desc}</p>
            {t.lookup.note && <p className="text-sm text-amber">{t.lookup.note}</p>}
            <div className="flex max-w-md items-center gap-3.5 rounded-md bg-white p-4 text-asphalt">
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#0E5C3A_86%,#E3E4E0_0)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-display text-xl font-extrabold">
                  86
                </div>
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-base font-bold">{t.lookup.demoName}</span>
                <span className="text-[13px] text-[#4B5058]">{t.lookup.demoMeta}</span>
              </div>
            </div>
            <div className="mt-auto flex items-center gap-2 font-display text-xl font-extrabold uppercase tracking-[.05em] text-amber">
              {t.lookup.cta}
              <Arrow size={18} />
            </div>
          </Link>

          {t.tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-6 hover:border-green"
            >
              <div className="font-display text-[30px] font-extrabold uppercase leading-tight">
                {tool.name}
              </div>
              <div className="flex-1 text-[15px] leading-relaxed text-[#3F444B]">{tool.desc}</div>
              <div className="flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-[.05em] text-green">
                {tool.cta}
                <Arrow size={16} />
              </div>
            </Link>
          ))}
        </section>

        <section className="border-t border-border bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 sm:px-6 md:py-16">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">{t.statesHeading}</h2>
            {t.statesNote && <p className="-mt-3 text-sm text-grey">{t.statesNote}</p>}
            <div className="flex flex-wrap gap-2">
              {STATE_DIRECTORY.map((s) => (
                <Link
                  key={s.slug}
                  href={`/carriers/${s.slug}`}
                  className="flex h-11 items-center rounded-md border-[1.5px] border-border bg-offwhite px-3.5 text-[15px] font-semibold hover:border-green hover:text-green"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      {lang === "RU" ? <SiteFooter lang="RU" /> : <SiteFooter />}
    </div>
  );
}
