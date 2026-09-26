import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Free Trucking Tools, No Sign-Up",
  description:
    "Carrier lookup, profit per mile calculator, compliance alerts and a new MC checklist. Built on FMCSA data.",
};

const TOOLS = [
  {
    name: "Profit per mile",
    href: "/tools/profit-per-mile",
    cta: "Run the numbers",
    desc: "Fuel, insurance, truck payment. See your real cost per mile and the lowest rate worth taking.",
  },
  {
    name: "Compliance Alerts",
    href: "/tools/compliance-alerts",
    cta: "Set up alerts",
    desc: "Get a text when your authority, insurance filing, UCR or safety status changes.",
  },
  {
    name: "New MC Checklist",
    href: "/tools/new-mc-checklist",
    cta: "Open checklist",
    desc: "Every step for your first 6 months, from BOC-3 to the new entrant safety audit.",
  },
  {
    name: "Broker check before you book",
    href: "/tools/carrier-lookup",
    cta: "Check a broker",
    desc: "Look up the broker on the rate con. Authority age, bond and any red flags.",
  },
];

const STATES = [
  "Texas", "California", "Illinois", "Florida", "Georgia", "Ohio",
  "Pennsylvania", "North Carolina", "Tennessee", "Indiana", "New Jersey", "Arizona",
];

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:px-6 md:py-20">
          <span className="flex h-7 w-fit items-center rounded-md bg-amber px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-asphalt">
            FREE · NO SIGN-UP
          </span>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Carrier tools
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Check a broker before you haul, see what a load really pays, and
            keep your authority out of trouble. Built on public FMCSA data.
          </p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 md:py-16">
        <Link
          href="/tools/carrier-lookup"
          className="flex flex-col gap-[18px] rounded-lg bg-green p-6 text-offwhite hover:bg-[#0B4F31] md:col-span-2 md:row-span-2 md:p-9"
        >
          <div className="font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-6xl">
            Carrier Lookup
          </div>
          <p className="max-w-md text-[17px] leading-relaxed text-[#E3EAE6]">
            Search any carrier or broker by DOT, MC or name. Authority,
            insurance, inspections and crashes, summed up in a Health Score
            from 0 to 100.
          </p>
          <div className="flex max-w-md items-center gap-3.5 rounded-md bg-white p-4 text-asphalt">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#0E5C3A_86%,#E3E4E0_0)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-display text-xl font-extrabold">
                86
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-base font-bold">Carpathian Freight</span>
              <span className="text-[13px] text-[#4B5058]">
                DOT 3412897 · Authorized · Insured
              </span>
            </div>
          </div>
          <div className="mt-auto flex items-center gap-2 font-display text-xl font-extrabold uppercase tracking-[.05em] text-amber">
            Check a carrier
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </Link>

        {TOOLS.map((t) => (
          <Link
            key={t.name}
            href={t.href}
            className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-6 hover:border-green"
          >
            <div className="font-display text-[30px] font-extrabold uppercase leading-tight">
              {t.name}
            </div>
            <div className="flex-1 text-[15px] leading-relaxed text-[#3F444B]">{t.desc}</div>
            <div className="flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-[.05em] text-green">
              {t.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 sm:px-6 md:py-16">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Carriers by state
          </h2>
          <div className="flex flex-wrap gap-2">
            {STATES.map((s) => (
              <Link
                key={s}
                href={s === "Texas" ? "/carriers/texas" : "#"}
                className="flex h-11 items-center rounded-md border-[1.5px] border-border bg-offwhite px-3.5 text-[15px] font-semibold hover:border-green hover:text-green"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
