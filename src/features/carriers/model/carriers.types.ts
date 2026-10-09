export type CarrierStatus = "ACTIVE" | "WARNING" | "INACTIVE";

export type StateCarrierRow = {
  name: string;
  city: string;
  dot: string;
  equipment: string;
  trucks: number;
  status: CarrierStatus;
  score: number;
};

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
  equipmentBreakdown: { t: string; pct: number }[];
  topCities: { t: string; count: string }[];
  equipmentOptions: readonly string[];
  totalCount: string;
  dispatchCtaEyebrow: string;
  dispatchCtaTitle: string;
  dispatchCtaBody: string;
  hireCtaBody: string;
  carriers: StateCarrierRow[];
};
