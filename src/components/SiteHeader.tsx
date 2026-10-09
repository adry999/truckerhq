import type { Locale } from "@/shared/i18n/locale";
import { PHONE_DISPLAY, PHONE_HREF } from "@/shared/config/contact";
import Link from "next/link";
import Logo from "./Logo";
import SiteHeaderLangSwitcher from "./SiteHeaderLangSwitcher";
import {
  SiteHeaderMobileMenuButton,
  SiteHeaderMobileMenuPanel,
  SiteHeaderMobileMenuProvider,
} from "./SiteHeaderMobileMenu";
import SiteHeaderNavLink from "./SiteHeaderNavLink";

const NAV = [
  { label: "Dispatch", href: "/dispatch" },
  { label: "Jobs", href: "/jobs" },
  { label: "Hire Drivers", href: "/hire-drivers" },
  { label: "Tools", href: "/tools" },
  { label: "Guides", href: "/guides" },
];

const RU_LABELS: Record<string, string> = {
  Dispatch: "Диспетчинг",
  Jobs: "Работа",
  "Hire Drivers": "Найм",
  Tools: "Инструменты",
  Guides: "Статьи",
};

// Only Dispatch and Jobs have RU pages so far; everything else falls
// back to the English route.
const RU_ROUTES: Record<string, string> = { "/dispatch": "/ru/dispatch", "/jobs": "/ru/jobs" };

type SiteHeaderProps = {
  lang?: Locale;
  enHref?: string;
  ruHref?: string;
};

export default function SiteHeader({
  lang = "EN",
  enHref = "/",
  ruHref = "/ru",
}: SiteHeaderProps) {
  const ru = lang === "RU";
  const homeHref = ru ? "/ru" : "/";
  // No RU dispatch-start wizard exists yet; send everyone to the EN one
  // rather than 404 on the primary CTA.
  const startHref = "/dispatch/start";
  const t = (en: string, ruText: string) => (ru ? ruText : en);

  const navItems = NAV.map((item) => ({
    href: ru ? (RU_ROUTES[item.href] ?? item.href) : item.href,
    label: ru ? RU_LABELS[item.label] : item.label,
  }));

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-asphalt font-sans">
      <SiteHeaderMobileMenuProvider>
        <div className="mx-auto flex h-[60px] max-w-6xl items-center gap-2 px-3 sm:h-[72px] sm:gap-6 sm:px-6">
          <Link href={homeHref} className="flex shrink-0">
            <span className="sm:hidden">
              <Logo theme="dark" size={26} />
            </span>
            <span className="hidden sm:inline-flex">
              <Logo theme="dark" size={30} />
            </span>
          </Link>

          <nav className="ml-3 hidden gap-1 lg:flex">
            {navItems.map((item) => (
              <SiteHeaderNavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
            <SiteHeaderLangSwitcher ru={ru} enHref={enHref} ruHref={ruHref} />

            <a
              href={PHONE_HREF}
              aria-label="Call dispatch 24/7"
              className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-[10px] border border-white/30 px-2.5 text-[15px] font-semibold tabular-nums text-amber hover:border-amber sm:h-12 sm:min-w-12 sm:px-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="hidden text-offwhite min-[1240px]:inline">
                {PHONE_DISPLAY}
              </span>
            </a>

            <Link
              href={startHref}
              className="hidden h-12 items-center rounded-[10px] bg-amber px-[22px] font-display text-[19px] font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover lg:flex"
            >
              {t("Get started", "Начать")}
            </Link>

            <SiteHeaderMobileMenuButton />
          </div>
        </div>

        <SiteHeaderMobileMenuPanel
          items={navItems}
          startHref={startHref}
          startLabel={t("Get started", "Начать")}
          callLabel={t("Call 24/7", "Звонок 24/7")}
        />
      </SiteHeaderMobileMenuProvider>
    </header>
  );
}
