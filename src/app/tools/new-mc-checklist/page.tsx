import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "New MC Authority Checklist: First 6 Months",
  description:
    "Every filing and setup step for a new trucking authority, from BOC-3 to the new entrant audit.",
};

const BEFORE_YOU_HAUL = [
  {
    t: "USDOT & MC number",
    d: "Issued by FMCSA when you register through the Unified Registration System. Your authority goes active after a 4-day protest period.",
  },
  {
    t: "BOC-3 process agent",
    d: "Required in every state you operate. A process agent service can file blanket coverage for all 50 states in one shot.",
  },
  {
    t: "UCR registration",
    d: "Unified Carrier Registration, paid every year. The fee is based on how many trucks are in your fleet.",
  },
  {
    t: "BMC-91/91X insurance",
    d: "Liability and optional cargo insurance, filed straight to FMCSA by your insurer. This is not paperwork you file yourself.",
  },
  {
    t: "EIN & business bank account",
    d: "Keep company money separate from day one. Brokers and factoring companies will ask for both.",
  },
  {
    t: "IFTA & IRP",
    d: "Fuel tax license and apportioned plates if you run more than one state. Skip these and roadside stops get expensive fast.",
  },
];

const AUDIT_STEPS = [
  {
    n: "1",
    title: "Authority goes active",
    desc: "Your USDOT and MC are live. FMCSA starts an 18-24 month new entrant monitoring period the same day.",
  },
  {
    n: "2",
    title: "Audit gets scheduled",
    desc: "Most new entrants see a safety audit within the first 12 months, often inside the first 60-90 days.",
  },
  {
    n: "3",
    title: "The paperwork gets checked",
    desc: "Driver qualification files, HOS and ELD records, drug & alcohol testing, maintenance records and your accident register.",
  },
  {
    n: "4",
    title: "Pass, fix, or lose your authority",
    desc: "Most failures are missing files, not violations. An unsatisfactory rating can lead to revoked operating authority.",
  },
];

const SHUTDOWN_REASONS = [
  {
    t: "BOC-3 lapses",
    d: "Miss it in even one state you run and your authority can be frozen until it is refiled.",
  },
  {
    t: "Failing the audit on paperwork",
    d: "Missing driver files or HOS logs fails you just as fast as an actual safety problem.",
  },
  {
    t: "Skipping the Clearinghouse",
    d: "Every DOT-regulated carrier with drivers, even a solo owner-operator, must register for the Drug & Alcohol Clearinghouse.",
  },
  {
    t: "No ELD or HOS logs",
    d: "Running without required logs is one of the fastest paths to an unsatisfactory safety rating.",
  },
  {
    t: "BMC-91X lapses",
    d: "Let your insurance filing lapse for even a day and FMCSA revokes operating authority automatically, no grace period.",
  },
];

const FAQ = [
  {
    q: "How long does it take to get my MC?",
    a: "USDOT and MC numbers are usually issued within a few business days of applying through URS. Your authority does not go active until a 4-day protest period passes and your BOC-3 and insurance filings are on file with FMCSA.",
  },
  {
    q: "Can I haul loads before the safety audit?",
    a: "Yes. You can haul as soon as your authority is active. The safety audit usually happens later in your first year, but FMCSA expects you to be keeping full driver, HOS and maintenance records from day one, not just once the audit is scheduled.",
  },
  {
    q: "What is BOC-3 and do I need it in every state?",
    a: "BOC-3 designates a process agent to accept legal papers on your behalf, and yes, you need coverage in every state you operate. Most process agent services file blanket coverage for all 50 states at once.",
  },
  {
    q: "Will brokers work with a brand-new MC?",
    a: "Some brokers filter out authorities under 6 months, mainly over insurance and fraud risk. Plenty still will, especially if a dispatcher who knows which brokers accept new MCs is setting up the load.",
  },
  {
    q: "What happens if I fail the new entrant audit?",
    a: "A conditional rating usually gives you a chance to correct the deficiencies. An unsatisfactory rating can lead to your operating authority being revoked, which shuts down your ability to haul.",
  },
];

export default function NewMcChecklistPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(FAQ)} />
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:py-16">
          <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
            <Link href="/tools" className="text-offwhite">Tools</Link>
            <span>/</span>
            <span>New MC Checklist</span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            New MC checklist
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Every step for your first 6 months, from getting your USDOT and MC
            number to passing the FMCSA new entrant safety audit.
          </p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Before you haul
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BEFORE_YOU_HAUL.map((i) => (
            <div key={i.t} className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 shrink-0 rounded-sm bg-amber" />
                <span className="font-display text-2xl font-extrabold uppercase leading-tight">
                  {i.t}
                </span>
              </div>
              <div className="text-[15px] leading-relaxed text-[#4B5058]">{i.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
          <div className="flex flex-col gap-2">
            <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
              YOUR FIRST 90 DAYS
            </div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              The new entrant safety audit
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">
              FMCSA monitors every new entrant for 18-24 months and typically
              schedules a safety audit within the first 12 months, often
              inside the first 60 to 90 days. This is the single most
              important thing a new MC needs to be ready for.
            </p>
          </div>
          <div className="relative grid gap-8 md:grid-cols-4">
            <div className="absolute left-7 right-7 top-[27px] hidden h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_32px,transparent_32px_52px)] md:block" />
            {AUDIT_STEPS.map((s) => (
              <div key={s.n} className="relative flex flex-col gap-3.5">
                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
                  {s.n}
                </div>
                <div className="font-display text-2xl font-extrabold uppercase">{s.title}</div>
                <div className="max-w-[300px] text-base leading-relaxed text-[#3F444B]">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            Common reasons new MCs get shut down
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">
            Most authorities do not lose their MC over a crash. They lose it
            over a missed filing.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHUTDOWN_REASONS.map((r) => (
            <div key={r.t} className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 shrink-0 rounded-sm bg-red" />
                <span className="font-display text-2xl font-extrabold uppercase leading-tight">
                  {r.t}
                </span>
              </div>
              <div className="text-[15px] leading-relaxed text-[#4B5058]">{r.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            New MC questions
          </h2>
          <div className="flex flex-col border-t-2 border-asphalt">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-b border-border">
                <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold marker:hidden">
                  {f.q}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEEFEC] text-xl font-medium group-open:bg-amber">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="pb-5 text-base leading-relaxed text-[#3F444B]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-5xl rounded-[24px] bg-green p-2">
          <div className="flex flex-wrap items-center justify-between gap-7 rounded-xl border-2 border-white/75 px-6 py-10 text-offwhite sm:px-12 sm:py-14">
            <div className="flex max-w-xl flex-col gap-3">
              <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
                NEW MC · FIRST LOADS
              </div>
              <h2 className="font-display text-5xl font-extrabold leading-[0.95] md:text-6xl">
                Get through it without losing loads.
              </h2>
              <p className="text-lg leading-relaxed text-[#E3EAE6]">
                Starter MC dispatch covers brokers that accept new authorities
                and walks you through this checklist while you haul.
              </p>
            </div>
            <div className="flex min-w-[280px] flex-col gap-3">
              <Link
                href="/dispatch"
                className="flex h-[60px] items-center justify-center rounded-xl bg-amber px-7 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                See Starter MC
              </Link>
              <Link
                href="/tools/compliance-alerts"
                className="flex h-[60px] items-center justify-center rounded-xl border-2 border-offwhite px-6 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
              >
                Get alerts before anything lapses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
