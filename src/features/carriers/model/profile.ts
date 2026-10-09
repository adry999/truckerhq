import type { Carrier } from "@/features/carriers/model/carriers.types";

// National out-of-service averages the sample profiles are compared against.
export const NATIONAL_OOS = { vehicle: 22.3, driver: 6.7 } as const;

export const NEW_MC_MONTHS = 6;

const GOOD = "#0E5C3A";
const BAD = "#B42318";
const WARN = "#7A5300";

export type ScoreFactor = { t: string; max: number; v: number; note: string };

export type ProfileCta = { eyebrow: string; title: string; body: string; btn: string; href: string };

export type PanelRow = readonly [label: string, value: string, color: string | null];

export type ProfilePanel = { t: string; rows: readonly PanelRow[] };

export function isNewMc(c: Carrier): boolean {
  return c.ageMonths < NEW_MC_MONTHS;
}

export function authorityAge(c: Carrier): string {
  return c.ageMonths < 12
    ? `${c.ageMonths} months`
    : `${Math.floor(c.ageMonths / 12)} yr ${c.ageMonths % 12} mo`;
}

export function scoreBreakdown(c: Carrier): ScoreFactor[] {
  return [
    {
      t: "Authority",
      max: 30,
      v: c.status === "INACTIVE" ? 0 : c.ageMonths < NEW_MC_MONTHS ? 20 : 30,
      note:
        c.status === "INACTIVE"
          ? "Operating authority is not active."
          : c.ageMonths < NEW_MC_MONTHS
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
          : `Vehicle OOS ${c.oosVehicle}% vs ${NATIONAL_OOS.vehicle}% national.`,
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
}

export function profileCta(c: Carrier): ProfileCta {
  if (c.status === "INACTIVE") {
    return {
      eyebrow: "AUTHORITY INACTIVE",
      title: "Get back on the road",
      body: "Reinstating an MC takes insurance filing, BOC-3 and the right forms. Our checklist walks you through every step.",
      btn: "Open reinstate checklist",
      href: "/tools/new-mc-checklist",
    };
  }
  if (c.ageMonths < NEW_MC_MONTHS) {
    return {
      eyebrow: `MC IS ${c.ageMonths} MONTHS OLD`,
      title: "Starter MC dispatch",
      body: "Many brokers will not book a new MC. We know the ones that will, and we send your setup packets for you.",
      btn: "See Starter MC",
      href: "/dispatch",
    };
  }
  if (c.insurance === "soon") {
    return {
      eyebrow: "INSURANCE EXPIRES SOON",
      title: "Do not get caught",
      body: "Free compliance alerts by text before insurance, UCR or authority dates. Takes 30 seconds to set up.",
      btn: "Turn on alerts",
      href: "/tools/compliance-alerts",
    };
  }
  if (c.trucks >= 3) {
    return {
      eyebrow: `${c.trucks} TRUCKS · STRONG SCORE`,
      title: "Need drivers?",
      body: "Post a driver job and reach CDL drivers who speak English or Russian. We check CDL and MVR.",
      btn: "Hire drivers",
      href: "/hire-drivers",
    };
  }
  return {
    eyebrow: "OWNER-OPERATOR",
    title: "Keep more of every load",
    body: "Flat weekly dispatch, no percentage. 24/7 on your time zone.",
    btn: "See dispatch",
    href: "/dispatch",
  };
}

export function profilePanels(c: Carrier, statusColor: string): ProfilePanel[] {
  return [
    {
      t: "Authority & insurance",
      rows: [
        ["Status", c.status, statusColor],
        ["Authority age", authorityAge(c), null],
        ["BIPD insurance", c.insurance === "none" ? "None on file" : "$750,000", c.insurance === "none" ? BAD : null],
        ["Expires", c.insuranceDate, c.insurance === "ok" ? null : c.insurance === "soon" ? WARN : BAD],
        ["BOC-3", "On file", null],
      ],
    },
    {
      t: "Safety · 24 months",
      rows: [
        ["Inspections", String(c.inspections), null],
        ["Vehicle OOS", `${c.oosVehicle}%  (nat. ${NATIONAL_OOS.vehicle}%)`, c.oosVehicle > NATIONAL_OOS.vehicle ? BAD : GOOD],
        ["Driver OOS", `${c.oosDriver}%  (nat. ${NATIONAL_OOS.driver}%)`, c.oosDriver > NATIONAL_OOS.driver ? BAD : GOOD],
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
  ];
}
