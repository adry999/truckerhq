import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  CARRIERS,
  findCarrier,
  STATUS_COLORS,
  healthColor,
} from "@/lib/data";

export function generateStaticParams() {
  return CARRIERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = findCarrier(slug);
  if (!c) return {};
  return {
    title: `${c.name} — DOT ${c.dot} Health Score ${c.score}`,
    description: `${c.name} in ${c.city}, ${c.st}. DOT ${c.dot}, ${c.mc}. Authority ${c.status}, ${c.trucks} trucks. Health Score ${c.score}/100 from public FMCSA data.`,
  };
}

export default async function CarrierProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = findCarrier(slug);
  if (!c) notFound();

  const sc = STATUS_COLORS[c.status];
  const isNew = c.ageMonths < 6;
  const age =
    c.ageMonths < 12
      ? `${c.ageMonths} months`
      : `${Math.floor(c.ageMonths / 12)} yr ${c.ageMonths % 12} mo`;
  const nat = { v: 22.3, d: 6.7 };

  const breakdown = [
    {
      t: "Authority",
      max: 30,
      v: c.status === "INACTIVE" ? 0 : c.ageMonths < 6 ? 20 : 30,
      note:
        c.status === "INACTIVE"
          ? "Operating authority is not active."
          : c.ageMonths < 6
            ? "Active, but under 6 months old."
            : "Active common authority.",
    },
    {
      t: "Insurance",
      max: 25,
      v: c.insurance === "ok" ? 25 : c.insurance === "soon" ? 12 : 0,
      note:
        c.insurance === "ok"
          ? "On file, BIPD $750,000+."
          : c.insurance === "soon"
            ? "Expires within 30 days."
            : "No active insurance on file.",
    },
    {
      t: "Inspections",
      max: 30,
      v: Math.max(0, Math.round(30 - c.oosVehicle * 0.6 - c.oosDriver)),
      note:
        c.inspections < 3
          ? "Too few inspections to judge fully."
          : `Vehicle OOS ${c.oosVehicle}% vs ${nat.v}% national.`,
    },
    {
      t: "Crashes",
      max: 15,
      v: Math.max(0, 15 - c.crashes * 5),
      note: c.crashes
        ? `${c.crashes} reportable in 24 months.`
        : "No reportable crashes in 24 months.",
    },
  ];

  let cta;
  if (c.status === "INACTIVE") {
    cta = {
      eyebrow: "AUTHORITY INACTIVE",
      title: "Get back on the road",
      body: "Reinstating an MC takes insurance filing, BOC-3 and the right forms. Our checklist walks you through every step.",
      btn: "Open reinstate checklist",
      href: "/tools/new-mc-checklist",
    };
  } else if (c.ageMonths < 6) {
    cta = {
      eyebrow: `MC IS ${c.ageMonths} MONTHS OLD`,
      title: "Starter MC dispatch",
      body: "Many brokers will not book a new MC. We know the ones that will, and we send your setup packets for you.",
      btn: "See Starter MC",
      href: "/dispatch",
    };
  } else if (c.insurance === "soon") {
    cta = {
      eyebrow: "INSURANCE EXPIRES SOON",
      title: "Do not get caught",
      body: "Free compliance alerts by text before insurance, UCR or authority dates. Takes 30 seconds to set up.",
      btn: "Turn on alerts",
      href: "/tools/compliance-alerts",
    };
  } else if (c.trucks >= 3) {
    cta = {
      eyebrow: `${c.trucks} TRUCKS · STRONG SCORE`,
      title: "Need drivers?",
      body: "Post a driver job and reach CDL drivers who speak English or Russian. We check CDL and MVR.",
      btn: "Hire drivers",
      href: "/hire-drivers",
    };
  } else {
    cta = {
      eyebrow: "OWNER-OPERATOR",
      title: "Keep more of every load",
      body: "Flat weekly dispatch, no percentage. 24/7 on your time zone.",
      btn: "See dispatch",
      href: "/dispatch",
    };
  }

  const panels = [
    {
      t: "Authority & insurance",
      rows: [
        ["Status", c.status, sc.fg],
        ["Authority age", age, null],
        ["BIPD insurance", c.insurance === "none" ? "None on file" : "$750,000", c.insurance === "none" ? "#B42318" : null],
        ["Expires", c.insuranceDate, c.insurance === "ok" ? null : c.insurance === "soon" ? "#7A5300" : "#B42318"],
        ["BOC-3", "On file", null],
      ],
    },
    {
      t: "Safety · 24 months",
      rows: [
        ["Inspections", String(c.inspections), null],
        ["Vehicle OOS", `${c.oosVehicle}%  (nat. ${nat.v}%)`, c.oosVehicle > nat.v ? "#B42318" : "#0E5C3A"],
        ["Driver OOS", `${c.oosDriver}%  (nat. ${nat.d}%)`, c.oosDriver > nat.d ? "#B42318" : "#0E5C3A"],
        ["Crashes", String(c.crashes), null],
        ["Safety rating", "Not rated", null],
      ],
    },
    {
      t: "Fleet & operation",
      rows: [
        ["Power units", String(c.trucks), null],
        ["Drivers", String(c.drivers), null],
        ["Equipment", c.equipment, null],
        ["Cargo", "General freight", null],
        ["Home base", `${c.city}, ${c.st}`, null],
      ],
    },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 md:pb-10">
          <Link
            href="/tools/carrier-lookup"
            className="flex min-h-11 w-fit items-center font-display text-[17px] font-bold uppercase tracking-[.04em] text-amber"
          >
            ← Back to results
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-7">
            <div className="flex min-w-0 flex-1 basis-[420px] flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <span
                  className="flex h-[30px] items-center gap-1.5 rounded-lg px-3 font-display text-base font-extrabold tracking-[.08em]"
                  style={{ background: sc.bg, color: sc.fg }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: sc.dot }} />
                  {c.status}
                </span>
                <span className="flex h-[30px] items-center rounded-lg border border-white/35 px-3 font-display text-base font-bold tracking-[.08em]">
                  INTERSTATE · FOR-HIRE
                </span>
                {isNew && (
                  <span className="flex h-[30px] items-center rounded-lg bg-amber px-3 font-display text-base font-extrabold tracking-[.08em] text-asphalt">
                    NEW MC
                  </span>
                )}
              </div>
              <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl md:text-7xl">
                {c.name}
              </h1>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-base tabular-nums text-[#D4D6DA]">
                <span>
                  DOT <b className="text-offwhite">{c.dot}</b>
                </span>
                <span>
                  <b className="text-offwhite">{c.mc}</b>
                </span>
                <span>
                  {c.city}, {c.st}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-[18px] rounded-[10px] bg-[#1F2226] p-[22px] shadow-[inset_0_0_0_1.5px_rgba(247,247,245,.14)]">
              <div
                className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
                style={{ background: `conic-gradient(${healthColor(c.score)} ${c.score}%, #33373D 0)` }}
              >
                <div className="flex h-[90px] w-[90px] flex-col items-center justify-center rounded-full bg-[#1F2226]">
                  <span className="font-display text-4xl font-extrabold">{c.score}</span>
                  <span className="text-[11px] font-semibold tracking-[.08em] text-[#AEB2B8]">/100</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-sm font-bold tracking-[.14em] text-[#AEB2B8]">
                  HEALTH SCORE
                </span>
                <span
                  className="font-display text-[30px] font-extrabold leading-none"
                  style={{ color: c.score >= 80 ? "#5FD39B" : c.score >= 60 ? "#F2A900" : "#FF7A6B" }}
                >
                  {c.score >= 80 ? "GOOD" : c.score >= 60 ? "WATCH" : "RISK"}
                </span>
                <span className="text-[13px] text-[#AEB2B8]">Updated today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3.5 px-4 py-[18px] sm:px-6">
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-[26px] font-extrabold uppercase leading-tight text-asphalt">
              Is this your company? Claim your profile.
            </span>
            <span className="text-[15px] text-asphalt">
              Add your phone and lanes, get compliance alerts, and show
              brokers you are real. Free.
            </span>
          </div>
          <button className="flex h-[52px] items-center rounded-xl bg-asphalt px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-green">
            Claim profile
          </button>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-[2fr_1fr] md:py-10">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-white p-[22px]">
            <h2 className="font-display text-[28px] font-extrabold uppercase">
              Score breakdown
            </h2>
            {breakdown.map((b) => (
              <div key={b.t} className="flex flex-col gap-1.5">
                <div className="flex justify-between gap-3 text-[15px]">
                  <span className="font-semibold">{b.t}</span>
                  <span className="tabular-nums text-[#4B5058]">
                    <b className="text-asphalt">{b.v}</b> / {b.max}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-md bg-[#ECEDEA]">
                  <div
                    className="h-full rounded-md"
                    style={{ width: `${Math.round((b.v / b.max) * 100)}%`, background: healthColor((b.v / b.max) * 100) }}
                  />
                </div>
                <div className="text-sm text-grey">{b.note}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {panels.map((p) => (
              <div key={p.t} className="overflow-hidden rounded-lg border border-border bg-white">
                <div className="border-b border-[#ECEDEA] px-5 py-4 font-display text-xl font-extrabold uppercase">
                  {p.t}
                </div>
                {p.rows.map(([k, v, color], i) => (
                  <div
                    key={k}
                    className={`flex items-center justify-between gap-3 px-5 py-3.5 text-[15px] tabular-nums ${i ? "border-t border-[#ECEDEA]" : ""}`}
                  >
                    <span className="text-[#4B5058]">{k}</span>
                    <span className="text-right font-semibold" style={color ? { color } : undefined}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-lg bg-green">
            <div className="flex flex-col gap-3.5 p-6 text-offwhite">
              <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
                {cta.eyebrow}
              </div>
              <div className="font-display text-[34px] font-extrabold uppercase leading-[0.95]">
                {cta.title}
              </div>
              <div className="text-[15px] leading-relaxed text-[#E3EAE6]">{cta.body}</div>
              <Link
                href={cta.href}
                className="flex h-14 items-center justify-center rounded-xl bg-amber font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                {cta.btn}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border-[1.5px] border-border bg-white p-5">
            <div className="font-display text-xl font-extrabold uppercase">
              Watch this carrier
            </div>
            <div className="text-sm leading-relaxed text-[#4B5058]">
              Get a text if authority, insurance or safety status changes.
            </div>
            <Link
              href="/tools/compliance-alerts"
              className="flex h-12 items-center justify-center rounded-[10px] border-2 border-asphalt font-display text-lg font-extrabold uppercase tracking-[.05em] hover:bg-asphalt hover:text-offwhite"
            >
              Set alert
            </Link>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}
