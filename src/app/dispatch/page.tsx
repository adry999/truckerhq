import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Logo from "@/components/Logo";
import GrossComparison from "@/components/GrossComparison";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Truck Dispatch Service, Flat Weekly Rate",
  description:
    "Dispatch for owner-operators and small fleets. One flat price per truck per week, 24/7 dispatchers, broker checks, paperwork included.",
};

const INCLUDED = [
  { t: "24/7 dispatcher", d: "A real person on your time zone, day or night. English or Russian." },
  { t: "Load boards", d: "We search DAT, Truckstop and direct broker lists so you do not have to." },
  { t: "Rate negotiation", d: "We push every broker for more. We check the lane average before we say yes." },
  { t: "Broker vetting", d: "Credit, days-to-pay and authority checked on every broker before booking." },
  { t: "Fuel discounts", d: "Fuel card savings at major truck stop chains across the US." },
  { t: "Paperwork", d: "Rate cons, BOLs, invoices and factoring packets handled for you." },
  { t: "Compliance reminders", d: "We watch your insurance, UCR, IFTA and authority dates." },
  { t: "Online visibility", d: "A simple website and a Google Business profile so brokers and shippers find you." },
];

const PACKAGES = [
  {
    who: "MC UNDER 6 MONTHS",
    name: "Starter MC",
    unit: "/ week",
    desc: "For new authorities that need their first brokers and first loads.",
    items: ["Full dispatch service", "Broker setup packets", "Brokers that accept new MCs", "New MC Checklist walkthrough", "Compliance reminders"],
    cta: "Start Starter MC",
    featured: false,
  },
  {
    who: "1–3 TRUCKS",
    name: "Owner-Operator Flat",
    unit: "/ week per truck",
    desc: "Everything included. One price, every week.",
    items: ["24/7 dispatcher on your time zone", "Rate negotiation on every load", "Broker vetting", "Paperwork and invoicing", "Fuel card discounts"],
    cta: "Start dispatch",
    featured: true,
    popular: true,
  },
  {
    who: "3–10 TRUCKS",
    name: "Fleet",
    unit: "/ week per truck",
    desc: "Lower per-truck price and one dispatcher who knows your whole fleet.",
    items: ["Everything in Owner-Operator", "Dedicated dispatcher", "Weekly fleet report", "Driver hiring support", "Website and Google profile included"],
    cta: "Talk to us",
    featured: false,
  },
  {
    who: "ANY CARRIER",
    name: "Web & Brand",
    unit: "one-time",
    desc: "Look like a real company to brokers and shippers.",
    items: ["One-page company website", "Google Business profile", "Email on your domain", "Logo and truck door lettering file", "Add to any dispatch package"],
    cta: "Get online",
    featured: false,
  },
];

const STEPS = [
  { n: "1", title: "Call or sign up", desc: "Tell us your truck, equipment, lanes and home time. Send your MC, W-9 and insurance." },
  { n: "2", title: "We book the loads", desc: "We search the boards, check the broker and negotiate. You approve every load." },
  { n: "3", title: "You drive, we do paper", desc: "Rate cons, check calls, invoices and factoring. You get paid, we get the same flat price." },
];

const FAQ = [
  { q: "What does the flat weekly price include?", a: "Everything on this page: load search, rate negotiation, broker vetting, paperwork, invoicing, fuel discounts and 24/7 support. No extra fees per load." },
  { q: "Is there a contract?", a: "No long contract. Dispatch runs week to week. Give us one week notice and you are free to go." },
  { q: "Do you force loads on me?", a: "Never. We bring you options with the rate and the lane. You say yes or no. It is your truck." },
  { q: "My MC is new. Will brokers work with me?", a: "Some will not, and we know which ones will. Starter MC covers broker setup packets and lanes that accept new authorities." },
  { q: "Do you work with factoring companies?", a: "Yes. We send rate cons, BOLs and invoices to your factoring company, or invoice brokers directly if you do not factor." },
  { q: "What equipment do you dispatch?", a: "Dry van, reefer, flatbed, step deck, power only and box trucks." },
];

export default function DispatchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(FAQ)} />
      <SiteHeader />

      <section className="relative overflow-hidden bg-asphalt text-offwhite">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1783247007596-cca4a61a16f5?fm=jpg&q=70&w=2000&auto=format&fit=crop"
            alt="Driver in the cab at a truck stop, dawn"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(22,24,27,.94)] via-[rgba(22,24,27,.7)] to-[rgba(22,24,27,.35)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
          <div className="flex flex-col gap-5">
            <Logo theme="dark" size={30} sub="DISPATCH" />
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
              Flat weekly dispatch.
              <br />
              <span className="text-amber">No percentage.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#D4D6DA] md:text-xl">
              We find the loads, push for the rate and do the paperwork. You
              pay one price every week, no matter how much you gross.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#pricing"
                className="flex h-14 items-center rounded-xl bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                See packages
              </a>
              <a
                href="tel:+1XXXXXXXXXX"
                className="flex h-14 items-center rounded-xl border-2 border-offwhite px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
              >
                Call (XXX) XXX-XXXX
              </a>
            </div>
          </div>
          <div className="justify-self-end w-full max-w-[420px] rounded-[10px] bg-green p-1.5">
            <div className="flex flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6">
              <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
                ONE TRUCK · ONE PRICE
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-8xl font-extrabold">$XXX</span>
                <span className="text-[17px] text-[#DCE6E0]">/ week</span>
              </div>
              <div className="h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_24px,transparent_24px_40px)]" />
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <div className="font-display text-3xl font-extrabold">24/7</div>
                  <div className="text-sm text-[#DCE6E0]">every US time zone</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold">0%</div>
                  <div className="text-sm text-[#DCE6E0]">of your gross</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold">EN · RU</div>
                  <div className="text-sm text-[#DCE6E0]">dispatchers</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold">1 WEEK</div>
                  <div className="text-sm text-[#DCE6E0]">notice to stop</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="road-line relative h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Everything a dispatcher should do
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map((i) => (
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

      <section id="pricing" className="border-y border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              Pick your lane
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">
              Every dispatch package is a flat weekly price. Week to week, no
              long contract.
            </p>
          </div>
          <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((p) => (
              <div
                key={p.name}
                className={
                  p.featured
                    ? "flex rounded-[10px] bg-green p-1.5"
                    : "flex rounded-[10px] border-[1.5px] border-border"
                }
              >
                <div
                  className={`flex flex-1 flex-col gap-3.5 rounded-md p-6 ${
                    p.featured ? "border-[1.5px] border-white/70 text-offwhite" : "text-asphalt"
                  }`}
                >
                  <div className="flex min-h-7 items-center justify-between gap-2">
                    <span
                      className={`font-display text-[15px] font-bold tracking-[.14em] ${
                        p.featured ? "text-amber" : "text-grey"
                      }`}
                    >
                      {p.who}
                    </span>
                    {p.popular && (
                      <span className="flex h-7 items-center rounded-md bg-amber px-2.5 font-display text-sm font-extrabold tracking-[.08em] text-asphalt">
                        MOST POPULAR
                      </span>
                    )}
                  </div>
                  <div className="font-display text-[34px] font-extrabold uppercase leading-[0.95]">
                    {p.name}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-5xl font-extrabold">$XXX</span>
                    <span className={`text-[15px] ${p.featured ? "text-[#DCE6E0]" : "text-[#4B5058]"}`}>
                      {p.unit}
                    </span>
                  </div>
                  <div className={`text-[15px] leading-snug ${p.featured ? "text-[#DCE6E0]" : "text-[#4B5058]"}`}>
                    {p.desc}
                  </div>
                  <div className={`h-px ${p.featured ? "bg-white/25" : "bg-border"}`} />
                  <ul className="flex flex-1 flex-col gap-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dispatch/start"
                    className={`mt-1.5 flex h-14 items-center justify-center rounded-xl font-display text-xl font-extrabold uppercase tracking-[.05em] ${
                      p.featured
                        ? "bg-amber text-asphalt hover:bg-amber-hover"
                        : "border-2 border-asphalt text-asphalt hover:bg-asphalt hover:text-offwhite"
                    }`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Rolling in 3 steps
        </h2>
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-7 right-7 top-[27px] hidden h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_32px,transparent_32px_52px)] md:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative flex flex-col gap-3.5">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
                {s.n}
              </div>
              <div className="font-display text-3xl font-extrabold uppercase">{s.title}</div>
              <div className="max-w-[340px] text-base leading-relaxed text-[#3F444B]">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-9 px-4 py-14 sm:px-6 md:py-24">
          <div className="flex flex-col gap-2">
            <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
              FLAT FEE VS PERCENTAGE
            </div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              See what a percentage costs you
            </h2>
          </div>
          <GrossComparison />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Dispatch questions
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
      </section>

      <section className="px-4 pb-14 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-5xl rounded-[24px] bg-green p-2">
          <div className="flex flex-wrap items-center justify-between gap-7 rounded-xl border-2 border-white/75 px-6 py-10 text-offwhite sm:px-12 sm:py-14">
            <div className="flex max-w-xl flex-col gap-3">
              <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
                NEXT EXIT · YOUR FIRST LOAD
              </div>
              <h2 className="font-display text-5xl font-extrabold leading-[0.95] md:text-6xl">
                Ready to roll?
              </h2>
              <p className="text-lg leading-relaxed text-[#E3EAE6]">
                Ten minutes on the phone. We can book your first load today.
              </p>
            </div>
            <div className="flex min-w-[280px] flex-col gap-3">
              <Link
                href="/dispatch/start"
                className="flex h-[60px] items-center justify-center rounded-xl bg-amber px-7 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                Start dispatch
              </Link>
              <a
                href="tel:+1XXXXXXXXXX"
                className="flex h-[60px] items-center justify-center rounded-xl border-2 border-offwhite px-6 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
              >
                Call (XXX) XXX-XXXX
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
