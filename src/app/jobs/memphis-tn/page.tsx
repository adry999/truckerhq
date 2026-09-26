import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "175", small: "Open jobs" },
  { big: "68", small: "Local jobs" },
  { big: "$0.60–0.70/mi", small: "Typical OTR pay" },
  { big: "$24–29/hr", small: "Typical local pay" },
];

const MEMPHIS_JOBS: CityJob[] = [
  {
    title: "Local Air Cargo Shuttle Driver",
    company: "Mid-South Air Cargo Carriers",
    loc: "Memphis, TN",
    type: "LOCAL",
    equipment: "DRY VAN",
    pay: "$26/hr",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Local Package Feeder Driver",
    company: "Bluff City Logistics",
    loc: "Memphis, TN",
    type: "LOCAL",
    equipment: "STRAIGHT TRUCK",
    pay: "$24/hr",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "OTR Company Driver",
    company: "Cotton Belt Freight",
    loc: "Southaven, MS",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.62–0.68/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Regional Reefer Driver",
    company: "Neva River Transport",
    loc: "West Memphis, AR",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$1,700/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Local Drayage Driver, River Port",
    company: "Wolf River Drayage",
    loc: "Bartlett, TN",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$28/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Flatbed Driver",
    company: "Delta Trucking Co",
    loc: "Olive Branch, MS",
    type: "REGIONAL",
    equipment: "FLATBED",
    pay: "$0.65/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Memphis, TN: 175 Openings",
  description:
    "Truck driving jobs near Memphis. Pay and home time on every listing. Updated daily.",
  robots:
    MEMPHIS_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Mid-South Air Cargo Carriers", score: 88, jobs: 14 },
  { name: "Bluff City Logistics", score: 82, jobs: 11 },
  { name: "Neva River Transport", score: 71, jobs: 8 },
  { name: "Wolf River Drayage", score: 65, jobs: 5 },
];

const NEARBY_CITIES = [
  { name: "Southaven, MS", count: 27 },
  { name: "West Memphis, AR", count: 19 },
  { name: "Bartlett", count: 14 },
  { name: "Olive Branch, MS", count: 16 },
  { name: "Jackson, MS", count: 23 },
  { name: "Nashville, TN", count: 41 },
  { name: "Little Rock, AR", count: 25 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Memphis?",
    a: "On current Trucker HQ listings, OTR company drivers out of Memphis are offered $0.60 to $0.70 per mile, and local drivers $24 to $29 per hour. Air cargo and drayage work often pays more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Memphis is home to the FedEx World Hub, the largest air cargo hub in the world, which drives steady local shuttle and feeder work, plus drayage off the Mississippi River port. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function MemphisJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Memphis, TN"
      stateName="Tennessee"
      heroIntro="175 truck driving jobs within 50 miles of Memphis, updated today. Memphis is home to the FedEx World Hub, the largest air cargo hub on Earth, and sits where I-40, I-55, and I-69 meet Mississippi River barge-to-truck freight."
      stats={STATS}
      jobs={MEMPHIS_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/memphis-tn"
      searchParams={searchParams}
    />
  );
}
