import type { Metadata } from "next";
import { languageAlternates } from "@/shared/i18n/alternates";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { DispatchStartWizard, START_WIZARD_COPY } from "@/features/dispatch";

export const metadata: Metadata = buildMetadata({
  title: "Начать диспетчинг",
  description: "Расскажите о траке и маршрутах. Диспетчер перезвонит вам.",
  path: "/ru/dispatch/start",
  ogImage: false,
  locale: "ru_RU",
  robots: { index: false, follow: false },
  languages: languageAlternates("/dispatch/start"),
});

export default function DispatchStartRuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang="RU" enHref="/dispatch/start" ruHref="/ru/dispatch/start" />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <section className="bg-asphalt text-offwhite">
          <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
              {START_WIZARD_COPY.RU.pageTitle}
            </h1>
          </div>
        </section>

        <DispatchStartWizard locale="RU" />
      </main>
      <SiteFooter lang="RU" />
    </div>
  );
}
