import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "195", small: "Open jobs" },
  { big: "52", small: "Local jobs" },
  { big: "$0.60–0.72/mi", small: "Typical OTR pay" },
  { big: "$25–31/hr", small: "Typical local pay" },
];

const HOUSTON_JOBS: CityJob[] = [
  {
    title: "OTR Tanker Driver, Petrochemical",
    company: "Volga Line Transport",
    loc: "Pasadena, TX",
    type: "OTR",
    equipment: "TANKER",
    pay: "$0.68–0.74/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Drayage Driver, Port of Houston",
    company: "Bayou City Drayage",
    loc: "Baytown, TX",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$1,450/wk",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Flatbed, Energy Sector",
    company: "Gulf Coast Rigging & Transport",
    loc: "Sugar Land, TX",
    type: "REGIONAL",
    equipment: "FLATBED",
    pay: "$1,700/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "OTR Dry Van, I-10 Lanes",
    company: "Karpaty Logistics",
    loc: "Katy, TX",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.60–0.66/mi",
    home: "Out 2 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Tanker Driver, Refinery Runs",
    company: "Ship Channel Carriers",
    loc: "Pasadena, TX",
    type: "LOCAL",
    equipment: "TANKER",
    pay: "$29/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Dry Van, Texas Triangle",
    company: "Lone Star Freightways",
    loc: "Beaumont, TX",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.64/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Houston, TX: 195 Openings",
  description:
    "Truck driving jobs near Houston. Pay and home time on every listing. Updated daily.",
  robots:
    HOUSTON_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Volga Line Transport", score: 82, jobs: 14 },
  { name: "Bayou City Drayage", score: 77, jobs: 11 },
  { name: "Gulf Coast Rigging & Transport", score: 71, jobs: 8 },
  { name: "Ship Channel Carriers", score: 64, jobs: 4 },
];

const NEARBY_CITIES = [
  { name: "Pasadena", count: 28 },
  { name: "Baytown", count: 21 },
  { name: "Sugar Land", count: 17 },
  { name: "Galveston", count: 14 },
  { name: "Beaumont", count: 19 },
  { name: "San Antonio, TX", count: 46 },
  { name: "Dallas, TX", count: 61 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Houston?",
    a: "On current Trucker HQ listings, OTR company drivers out of Houston are offered $0.60 to $0.72 per mile, and local drivers $25 to $31 per hour. Tanker and specialized petrochemical hauls pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Houston is container drayage out of the Port of Houston, tanker runs between Ship Channel refineries, and regional flatbed for the energy sector. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function HoustonJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Houston, TX"
      stateName="Texas"
      heroIntro="195 truck driving jobs within 50 miles of Houston, updated today. The Port of Houston drives heavy petrochemical and energy-sector freight, with steady tanker, flatbed, and dry van work along I-10, I-45, and I-69."
      stats={STATS}
      jobs={HOUSTON_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/houston-tx"
      searchParams={searchParams}
    />
  );
}
