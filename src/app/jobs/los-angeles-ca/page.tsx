import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "340", small: "Open jobs" },
  { big: "162", small: "Local jobs" },
  { big: "$0.65–0.78/mi", small: "Typical OTR pay" },
  { big: "$28–36/hr", small: "Typical local pay" },
];

const LOS_ANGELES_JOBS: CityJob[] = [
  {
    title: "Port Drayage Driver, Containers",
    company: "Pacific Gateway Drayage",
    loc: "Long Beach, CA",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$1,650/wk",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Local Drayage, Port of LA",
    company: "Volga Line Transport",
    loc: "Carson, CA",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$27–33/hr",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "OTR Company Driver, Dry Van",
    company: "Sunbelt Freight Systems",
    loc: "Ontario, CA",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.68–0.78/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Regional Reefer Driver, SoCal to NorCal",
    company: "Golden State Cold Transport",
    loc: "Fontana, CA",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$1,800/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Local Chassis & Container Hauler",
    company: "Harbor Intermodal Inc.",
    loc: "Wilmington, CA",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$29/hr",
    home: "Home daily",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, West Coast Line-Haul",
    company: "Odessa Transport Group",
    loc: "Rancho Dominguez, CA",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.95/mi split",
    home: "Out 2 weeks",
    posted: "2 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Los Angeles, CA: 340 Openings",
  description:
    "Truck driving jobs near Los Angeles. Pay and home time on every listing. Updated daily.",
  robots:
    LOS_ANGELES_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Pacific Gateway Drayage", score: 84, jobs: 14 },
  { name: "Volga Line Transport", score: 77, jobs: 11 },
  { name: "Sunbelt Freight Systems", score: 90, jobs: 8 },
  { name: "Harbor Intermodal Inc.", score: 63, jobs: 4 },
];

const NEARBY_CITIES = [
  { name: "Long Beach", count: 61 },
  { name: "Anaheim", count: 38 },
  { name: "Ontario", count: 33 },
  { name: "Riverside", count: 27 },
  { name: "San Diego", count: 45 },
  { name: "Bakersfield", count: 19 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Los Angeles?",
    a: "On current Trucker HQ listings, OTR company drivers out of Los Angeles are offered $0.65 to $0.78 per mile, and local drivers $28 to $36 per hour. Port drayage and specialized freight often pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Los Angeles is container drayage out of the Port of LA and Port of Long Beach, the largest container gateway in the US. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function LosAngelesJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Los Angeles, CA"
      stateName="California"
      heroIntro="340 truck driving jobs within 50 miles of Los Angeles, updated today. The Port of LA and Port of Long Beach together form the busiest container gateway in the country, driving heavy year-round demand for drayage and local drivers."
      stats={STATS}
      jobs={LOS_ANGELES_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/los-angeles-ca"
      searchParams={searchParams}
    />
  );
}
