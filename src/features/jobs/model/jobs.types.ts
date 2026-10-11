export type JobType = "OTR" | "REGIONAL" | "LOCAL" | "TEAM" | "OWNER-OP";

export type Job = {
  slug: string;
  title: string;
  company: string;
  carrierSlug: string;
  loc: string;
  type: JobType;
  equipment: string;
  home: string;
  pay: string;
  payNote: string;
  posted: string;
  experience: string;
  russian: boolean;
  milesPerWeek: string;
};

export type JobWithScore = Job & { score: number };

export type JobCarrier = {
  slug: string;
  name: string;
  dot: string;
  trucks: number;
  score: number;
};

export type CityJob = {
  title: string;
  company: string;
  loc: string;
  type: "OTR" | "LOCAL" | "REGIONAL";
  equipment: string;
  pay: string;
  home: string;
  posted: string;
};

export type CityContentEntry = {
  cityName: string;
  stateName: string;
  title: string;
  description: string;
  heroIntro: string;
  stats: { big: string; small: string }[];
  jobs: CityJob[];
  hiringCarriers: { name: string; score: number; jobs: number }[];
  nearbyCities: { name: string; count: number }[];
  faqs: { q: string; a: string }[];
};
