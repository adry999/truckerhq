"use client";

import { PHONE_DISPLAY, PHONE_HREF } from "@/shared/config/contact";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

// The toggle button sits in the header bar and the panel below it, so they
// share open state through a provider that renders no DOM of its own.
const MenuContext = createContext<{ open: boolean; setOpen: (v: boolean | ((p: boolean) => boolean)) => void } | null>(null);

function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("SiteHeaderMobileMenu parts must be used inside SiteHeaderMobileMenuProvider");
  return ctx;
}

export function SiteHeaderMobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <MenuContext.Provider value={{ open, setOpen }}>{children}</MenuContext.Provider>;
}

export function SiteHeaderMobileMenuButton() {
  const { open, setOpen } = useMenu();
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      aria-label="Menu"
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/30 lg:hidden"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F7F7F5" strokeWidth="2.5" strokeLinecap="round">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    </button>
  );
}

type SiteHeaderMobileMenuPanelProps = {
  items: { href: string; label: string }[];
  startHref: string;
  startLabel: string;
  callLabel: string;
};

export function SiteHeaderMobileMenuPanel({
  items,
  startHref,
  startLabel,
  callLabel,
}: SiteHeaderMobileMenuPanelProps) {
  const { open, setOpen } = useMenu();
  const pathname = usePathname();
  if (!open) return null;
  return (
    <nav
      id="mobile-menu"
      aria-label="Mobile"
      className="flex flex-col gap-1 border-t border-white/10 px-4 pb-5 pt-2 lg:hidden"
    >
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex h-[48px] items-center border-b border-white/8 px-2 font-display text-xl font-bold uppercase ${
              active ? "text-amber" : "text-offwhite"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        href={startHref}
        onClick={() => setOpen(false)}
        className="mt-3 flex h-14 items-center justify-center rounded-xl bg-amber font-display text-[22px] font-extrabold uppercase tracking-[.05em] text-asphalt"
      >
        {startLabel}
      </Link>
      <a
        href={PHONE_HREF}
        className="flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-offwhite font-display text-[22px] font-extrabold uppercase tracking-[.05em] text-offwhite"
      >
        {callLabel} · {PHONE_DISPLAY}
      </a>
    </nav>
  );
}
