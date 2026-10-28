export type CarrierStatus = "ACTIVE" | "WARNING" | "INACTIVE";

export type Carrier = {
  slug: string;
  name: string;
  city: string;
  st: string;
  dot: string;
  mc: string;
  trucks: number;
  drivers: number;
  status: CarrierStatus;
  score: number;
  ageMonths: number;
  insurance: "ok" | "soon" | "none";
  insuranceDate: string;
  inspections: number;
  oosVehicle: number;
  oosDriver: number;
  crashes: number;
  equipment: string;
};

export type StateContentEntry = {
  stateAbbr: string;
  stateName: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  heroDescription: string;
  stats: { big: string; small: string }[];
  topCities: { t: string; count: string }[];
  totalCount: string;
  /** Raw census figures behind the page, for Dataset JSON-LD. */
  census: { activeForHire: number; powerUnits: number; drivers: number };
  sourceName: string;
  sourceUrl: string;
  /** ISO timestamp the census was fetched. */
  sourceFetchedAt: string;
  dispatchCtaEyebrow: string;
  dispatchCtaTitle: string;
  dispatchCtaBody: string;
  hireCtaBody: string;
};
