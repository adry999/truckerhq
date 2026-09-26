import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "210", small: "Open jobs" },
  { big: "52", small: "Local jobs" },
  { big: "$0.60–0.72/mi", small: "Typical OTR pay" },
  { big: "$24–29/hr", small: "Typical local pay" },
];

const DALLAS_JOBS: CityJob[] = [
  {
    title: "OTR Company Driver",
    company: "Lone Star Freightways",
    loc: "Fort Worth, TX",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.64–0.70/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Delivery Driver, Distribution Center",
    company: "Trinity River Logistics",
    loc: "Grand Prairie, TX",
    type: "LOCAL",
    equipment: "BOX TRUCK",
    pay: "$1,150/wk",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Dry Van Driver",
    company: "Volga Line Transport",
    loc: "Arlington, TX",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$1,600/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, Coast to Coast",
    company: "Metroplex Intermodal",
    loc: "Irving, TX",
    type: "OTR",
    equipment: "CONTAINER",
    pay: "$0.85/mi split",
    home: "Out 2-3 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Flatbed, Building Materials",
    company: "Big D Steel Logistics",
    loc: "Mesquite, TX",
    type: "LOCAL",
    equipment: "FLATBED",
    pay: "$27/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Reefer Driver, Central US",
    company: "Blackland Prairie Carriers",
    loc: "Grapevine, TX",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$0.63/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Dallas, TX: 210 Openings",
  description:
    "Truck driving jobs near Dallas. Pay and home time on every listing. Updated daily.",
  robots:
    DALLAS_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Lone Star Freightways", score: 84, jobs: 14 },
  { name: "Trinity River Logistics", score: 77, jobs: 10 },
  { name: "Volga Line Transport", score: 71, jobs: 8 },
  { name: "Metroplex Intermodal", score: 63, jobs: 4 },
];

const NEARBY_CITIES = [
  { name: "Fort Worth", count: 61 },
  { name: "Arlington", count: 33 },
  { name: "Plano", count: 24 },
  { name: "Irving", count: 27 },
  { name: "Garland", count: 19 },
  { name: "Oklahoma City, OK", count: 38 },
  { name: "Houston, TX", count: 89 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Dallas?",
    a: "On current Trucker HQ listings, OTR company drivers out of Dallas are offered $0.60 to $0.72 per mile, and local drivers $24 to $29 per hour. Team and specialized freight pays more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Dallas-Fort Worth is distribution center delivery, flatbed for building materials, and drayage out of the rail yards. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function DallasJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Dallas, TX"
      stateName="Texas"
      heroIntro="210 truck driving jobs within 50 miles of Dallas, updated today. Dallas-Fort Worth sits at the junction of I-35, I-30, and I-20, making it one of the country's largest inland freight and distribution hubs."
      stats={STATS}
      jobs={DALLAS_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/dallas-tx"
      searchParams={searchParams}
    />
  );
}
