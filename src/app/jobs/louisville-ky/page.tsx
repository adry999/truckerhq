import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "130", small: "Open jobs" },
  { big: "58", small: "Local jobs" },
  { big: "$0.58–0.70/mi", small: "Typical OTR pay" },
  { big: "$24–29/hr", small: "Typical local pay" },
];

const LOUISVILLE_JOBS: CityJob[] = [
  {
    title: "Local Package Feeder Driver",
    company: "Bluegrass Sort & Ship",
    loc: "Louisville, KY",
    type: "LOCAL",
    equipment: "BOX TRUCK",
    pay: "$27/hr",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Local Air Cargo Shuttle Driver",
    company: "Volga Line Transport",
    loc: "Jeffersonville, IN",
    type: "LOCAL",
    equipment: "DRY VAN",
    pay: "$26/hr",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "OTR Company Driver",
    company: "Derby City Freightways",
    loc: "New Albany, IN",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.60–0.66/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Delivery Driver, Hub Feeder",
    company: "Ohio Valley Cartage",
    loc: "Clarksville, IN",
    type: "LOCAL",
    equipment: "STRAIGHT TRUCK",
    pay: "$1,150/wk",
    home: "Home daily",
    posted: "1 day ago",
  },
  {
    title: "Regional Dry Van Driver",
    company: "Danube Road Corp",
    loc: "Shepherdsville, KY",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.64/mi",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, Air Cargo Line-Haul",
    company: "Bourbon Trail Logistics",
    loc: "Louisville, KY",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.85/mi split",
    home: "Out 10 days",
    posted: "2 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Louisville, KY: 130 Openings",
  description:
    "Truck driving jobs near Louisville. Pay and home time on every listing. Updated daily.",
  robots:
    LOUISVILLE_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Bluegrass Sort & Ship", score: 84, jobs: 14 },
  { name: "Volga Line Transport", score: 77, jobs: 10 },
  { name: "Derby City Freightways", score: 71, jobs: 8 },
  { name: "Ohio Valley Cartage", score: 63, jobs: 4 },
];

const NEARBY_CITIES = [
  { name: "Jeffersonville, IN", count: 26 },
  { name: "New Albany, IN", count: 19 },
  { name: "Shepherdsville", count: 15 },
  { name: "Lexington", count: 31 },
  { name: "Cincinnati, OH", count: 42 },
  { name: "Nashville, TN", count: 47 },
  { name: "Indianapolis, IN", count: 38 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Louisville?",
    a: "On current Trucker HQ listings, OTR company drivers out of Louisville are offered $0.58 to $0.70 per mile, and local drivers $24 to $29 per hour. Air cargo feeder and team routes pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Louisville is home to UPS Worldport, the largest UPS air hub in the world, sitting at the junction of I-64, I-65, and I-71, which drives heavy local and feeder demand around the airport. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function LouisvilleJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Louisville, KY"
      stateName="Kentucky"
      heroIntro="130 truck driving jobs within 50 miles of Louisville, updated today. Louisville is home to UPS Worldport, the largest UPS air hub in the world, sitting right at the I-64/I-65/I-71 interchange, which keeps local feeder and package work steady year-round."
      stats={STATS}
      jobs={LOUISVILLE_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/louisville-ky"
      searchParams={searchParams}
    />
  );
}
