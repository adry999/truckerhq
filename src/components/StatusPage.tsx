import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Locale } from "@/shared/i18n/locale";

type StatusPageProps = {
  lang: Locale;
  eyebrow: string;
  heading: string;
  headingClassName: string;
  body: string;
  children: ReactNode;
};

// Shared frame of the 404 and error pages: header, badge, message, footer.
export default function StatusPage({
  lang,
  eyebrow,
  heading,
  headingClassName,
  body,
  children,
}: StatusPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang={lang} />

      <section className="flex flex-1 flex-col items-center justify-center bg-asphalt px-4 py-20 text-center text-offwhite sm:px-6">
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-white/75 bg-green px-10 py-8 sm:px-16">
          <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber-on-green">
            {eyebrow}
          </div>
          <h1 className={headingClassName}>{heading}</h1>
        </div>

        <p className="mt-7 max-w-md text-lg leading-relaxed text-[#D4D6DA]">
          {body}
        </p>

        {children}
      </section>

      <SiteFooter />
    </div>
  );
}
