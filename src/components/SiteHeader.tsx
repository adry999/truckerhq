"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const NAV = [
  { label: "Dispatch", href: "/dispatch" },
  { label: "Jobs", href: "/jobs" },
  { label: "Hire Drivers", href: "/hire-drivers" },
  { label: "Tools", href: "/tools" },
  { label: "Guides", href: "/guides" },
];

type SiteHeaderProps = {
  lang?: "EN" | "RU";
  enHref?: string;
  ruHref?: string;
};

export default function SiteHeader({
  lang = "EN",
  enHref = "/",
  ruHref = "/ru",
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const ru = lang === "RU";
  const homeHref = ru ? "/ru" : "/";
  const startHref = ru ? "/ru/dispatch/start" : "/dispatch/start";
  const t = (en: string, ruText: string) => (ru ? ruText : en);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-asphalt font-sans">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center gap-2 px-3 sm:h-[72px] sm:gap-6 sm:px-6">
        <Link href={homeHref} className="flex shrink-0">
          <Logo theme="dark" size={26} className="sm:hidden" />
          <Logo theme="dark" size={30} className="hidden sm:inline-flex" />
        </Link>

        <nav className="ml-3 hidden gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-11 items-center rounded-lg px-3 text-[15px] font-medium hover:bg-white/8 hover:text-amber ${
                  active ? "bg-amber/10 text-amber" : "text-offwhite"
                }`}
              >
                {ru
                  ? { Dispatch: "Диспетчинг", Jobs: "Работа", "Hire Drivers": "Найм", Tools: "Инструменты", Guides: "Статьи" }[
                      item.label
                    ]
                  : item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Language"
              className="flex h-11 items-center gap-2 rounded-[10px] border border-white/30 px-2.5 font-display text-lg font-extrabold tracking-[.06em] text-offwhite hover:border-amber sm:h-12 sm:px-3"
            >
              {ru ? "RU" : "EN"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F2A900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-30 flex min-w-[160px] flex-col gap-0.5 rounded-xl bg-white p-1.5 shadow-2xl">
                {(
                  [
                    ["EN", "English", enHref],
                    ["RU", "Русский", ruHref],
                  ] as const
                ).map(([code, name, href]) => {
                  const cur = (ru ? "RU" : "EN") === code;
                  return (
                    <Link
                      key={code}
                      href={href}
                      onClick={() => setLangOpen(false)}
                      className={`flex h-12 items-center justify-between rounded-lg px-3 text-base text-asphalt hover:bg-offwhite ${
                        cur ? "bg-[#FFF1CC] font-bold" : "font-medium"
                      }`}
                    >
                      {name}
                      <span className="font-display text-[15px] font-extrabold tracking-[.06em] text-grey">
                        {code}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <a
            href="tel:+1XXXXXXXXXX"
            aria-label="Call dispatch 24/7"
            className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-[10px] border border-white/30 px-2.5 text-[15px] font-semibold tabular-nums text-amber hover:border-amber sm:h-12 sm:min-w-12 sm:px-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="hidden text-offwhite min-[1240px]:inline">
              (XXX) XXX-XXXX
            </span>
          </a>

          <Link
            href={startHref}
            className="hidden h-12 items-center rounded-[10px] bg-amber px-[22px] font-display text-[19px] font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover lg:flex"
          >
            {t("Get started", "Начать")}
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/30 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F7F7F5" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-white/10 px-4 pb-5 pt-2 lg:hidden">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex h-[48px] items-center border-b border-white/8 px-2 font-display text-xl font-bold uppercase ${
                  active ? "text-amber" : "text-offwhite"
                }`}
              >
                {ru
                  ? { Dispatch: "Диспетчинг", Jobs: "Работа", "Hire Drivers": "Найм", Tools: "Инструменты", Guides: "Статьи" }[
                      item.label
                    ]
                  : item.label}
              </Link>
            );
          })}
          <Link
            href={startHref}
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex h-14 items-center justify-center rounded-xl bg-amber font-display text-[22px] font-extrabold uppercase tracking-[.05em] text-asphalt"
          >
            {t("Get started", "Начать")}
          </Link>
          <a
            href="tel:+1XXXXXXXXXX"
            className="flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-offwhite font-display text-[22px] font-extrabold uppercase tracking-[.05em] text-offwhite"
          >
            {t("Call 24/7", "Звонок 24/7")} · (XXX) XXX-XXXX
          </a>
        </div>
      )}
    </header>
  );
}
