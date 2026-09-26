import Link from "next/link";
import Logo from "./Logo";

const COLUMNS: { h: string; links: { t: string; href?: string }[] }[] = [
  {
    h: "SERVICES",
    links: [
      { t: "Dispatch", href: "/dispatch" },
      { t: "Driver Jobs", href: "/jobs" },
      { t: "Hire Drivers", href: "/hire-drivers" },
    ],
  },
  {
    h: "FREE TOOLS",
    links: [
      { t: "All tools", href: "/tools" },
      { t: "Carrier Lookup", href: "/tools/carrier-lookup" },
      { t: "Profit per Mile", href: "/tools/profit-per-mile" },
      { t: "Compliance Alerts", href: "/tools/compliance-alerts" },
      { t: "New MC Checklist", href: "/tools/new-mc-checklist" },
      { t: "Texas carriers", href: "/carriers/texas" },
    ],
  },
  {
    h: "CONTACT",
    links: [
      { t: "(XXX) XXX-XXXX · 24/7" },
      { t: "hello@truckerhq.com", href: "/about#contact" },
      { t: "Guides", href: "/guides" },
      { t: "About us", href: "/about" },
    ],
  },
];

const LEGAL = [
  { t: "Privacy", href: "/privacy" },
  { t: "Terms", href: "/terms" },
  { t: "SMS terms", href: "/sms-terms" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-asphalt font-sans text-[#C9CBCF]">
      <div className="road-line h-1.5" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-8 pt-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo theme="dark" size={32} />
            <p className="text-sm leading-relaxed">
              Dispatch, jobs and tools for US truckers.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.h} className="flex flex-col gap-1">
              <div className="mb-1.5 font-display text-[15px] font-bold tracking-[.14em] text-amber">
                {col.h}
              </div>
              {col.links.map((l) =>
                l.href ? (
                  <Link
                    key={l.t}
                    href={l.href}
                    className="flex min-h-9 items-center text-[15px] text-[#E4E6E9] hover:text-amber"
                  >
                    {l.t}
                  </Link>
                ) : (
                  <span
                    key={l.t}
                    className="flex min-h-9 items-center text-[15px] text-[#E4E6E9]"
                  >
                    {l.t}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/12 pt-6 text-[13px] text-[#8A8F98]">
          <span>© 2026 Trucker HQ. Carrier data from public FMCSA records.</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1.5">
            {LEGAL.map((l) => (
              <Link key={l.t} href={l.href} className="text-[#AEB2B8] hover:text-amber">
                {l.t}
              </Link>
            ))}
            <span>English · Русский</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
