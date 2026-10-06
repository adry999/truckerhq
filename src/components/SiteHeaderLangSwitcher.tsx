"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SiteHeaderLangSwitcherProps = {
  ru: boolean;
  enHref: string;
  ruHref: string;
};

export default function SiteHeaderLangSwitcher({ ru, enHref, ruHref }: SiteHeaderLangSwitcherProps) {
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!langOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLangOpen(false);
        langButtonRef.current?.focus();
      }
    }
    function onPointerDown(e: PointerEvent) {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(e.target as Node) &&
        !langButtonRef.current?.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [langOpen]);

  return (
    <div className="relative">
      <button
        ref={langButtonRef}
        onClick={() => setLangOpen((v) => !v)}
        aria-label={`Language: ${ru ? "Russian" : "English"}`}
        aria-haspopup="menu"
        aria-expanded={langOpen}
        aria-controls="lang-menu"
        className="flex h-11 items-center gap-2 rounded-[10px] border border-white/30 px-2.5 font-display text-lg font-extrabold tracking-[.06em] text-offwhite hover:border-amber sm:h-12 sm:px-3"
      >
        {ru ? "RU" : "EN"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F2A900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        id="lang-menu"
        ref={langMenuRef}
        role="menu"
        className={`absolute right-0 top-[calc(100%+6px)] z-30 flex min-w-[160px] flex-col gap-0.5 rounded-xl bg-white p-1.5 shadow-2xl ${
          langOpen ? "flex" : "hidden"
        }`}
      >
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
              role="menuitem"
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
    </div>
  );
}
