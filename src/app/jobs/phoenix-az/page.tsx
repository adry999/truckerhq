import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "165", small: "Open jobs" },
  { big: "38", small: "Local jobs" },
  { big: "$0.60–0.70/mi", small: "Typical OTR pay" },
  { big: "$24–29/hr", small: "Typical local pay" },
];

const PHOENIX_JOBS: CityJob[] = [
  {
    title: "OTR Company Driver",
    company: "Desert Crossroads Logistics",
    loc: "Goodyear, AZ",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.62–0.68/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Warehouse Shuttle Driver",
    company: "Sonoran Freight Lines",
    loc: "Chandler, AZ",
    type: "LOCAL",
    equipment: "DRY VAN",
    pay: "$1,350/wk",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Reefer Driver",
    company: "Ural Trans Carriers",
    loc: "Mesa, AZ",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$1,650/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, West Coast Lanes",
    company: "Odessa Route Logistics",
    loc: "Tempe, AZ",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.85/mi split",
    home: "Out 2-3 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Flatbed, Building Materials",
    company: "Cactus State Hauling",
    loc: "Glendale, AZ",
    type: "LOCAL",
    equipment: "FLATBED",
    pay: "$27/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Dry Van, Southwest",
    company: "Desert Crossroads Logistics",
    loc: "Avondale, AZ",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.64/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Phoenix, AZ: 165 Openings",
  description:
    "Truck driving jobs near Phoenix. Pay and home time on every listing. Updated daily.",
  robots:
    PHOENIX_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Desert Crossroads Logistics", score: 82, jobs: 11 },
  { name: "Sonoran Freight Lines", score: 77, jobs: 9 },
  { name: "Ural Trans Carriers", score: 68, jobs: 6 },
  { name: "Cactus State Hauling", score: 63, jobs: 4 },
];

const NEARBY_CITIES = [
  { name: "Mesa", count: 41 },
  { name: "Chandler", count: 29 },
  { name: "Scottsdale", count: 24 },
  { name: "Tempe", count: 22 },
  { name: "Tucson", count: 36 },
  { name: "Flagstaff", count: 14 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Phoenix?",
    a: "On current Trucker HQ listings, OTR company drivers out of Phoenix are offered $0.60 to $0.70 per mile, and local drivers $24 to $29 per hour. Team and specialized jobs pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Phoenix is warehouse and distribution shuttle runs out of the West Valley, plus flatbed hauling building materials. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function PhoenixJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Phoenix, AZ"
      stateName="Arizona"
      heroIntro="165 truck driving jobs within 50 miles of Phoenix, updated today. Phoenix sits at the crossroads of I-10 and I-17, and its fast-growing warehouse and distribution market keeps steady demand for local shuttle and regional dry van drivers."
      stats={STATS}
      jobs={PHOENIX_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/phoenix-az"
      searchParams={searchParams}
    />
  );
}
