import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "150", small: "Open jobs" },
  { big: "38", small: "Local jobs" },
  { big: "$0.58–0.70/mi", small: "Typical OTR pay" },
  { big: "$24–29/hr", small: "Typical local pay" },
];

const INDIANAPOLIS_JOBS: CityJob[] = [
  {
    title: "OTR Company Driver",
    company: "Volga Line Transport",
    loc: "Plainfield, IN",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.62–0.68/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Air Cargo Driver",
    company: "Crossroads Air Logistics",
    loc: "Indianapolis, IN",
    type: "LOCAL",
    equipment: "DRY VAN",
    pay: "$27/hr",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Reefer Driver",
    company: "Hoosier Cold Chain",
    loc: "Whitestown, IN",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$1,650/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, Coast to Coast",
    company: "Danube Road Corp",
    loc: "Fishers, IN",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.85/mi split",
    home: "Out 2-3 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Flatbed, Steel Haul",
    company: "Circle City Steel Logistics",
    loc: "Carmel, IN",
    type: "LOCAL",
    equipment: "FLATBED",
    pay: "$28/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Dry Van, Midwest Lanes",
    company: "Iron Horse Hauling",
    loc: "Greenwood, IN",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.64/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Indianapolis, IN: 150 Openings",
  description:
    "Truck driving jobs near Indianapolis. Pay and home time on every listing. Updated daily.",
  robots:
    INDIANAPOLIS_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Volga Line Transport", score: 78, jobs: 14 },
  { name: "Crossroads Air Logistics", score: 85, jobs: 11 },
  { name: "Hoosier Cold Chain", score: 71, jobs: 7 },
  { name: "Circle City Steel Logistics", score: 64, jobs: 4 },
];

const NEARBY_CITIES = [
  { name: "Fishers", count: 21 },
  { name: "Carmel", count: 19 },
  { name: "Plainfield", count: 27 },
  { name: "Greenwood", count: 16 },
  { name: "Columbus, OH", count: 45 },
  { name: "Louisville, KY", count: 38 },
  { name: "Chicago, IL", count: 148 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Indianapolis?",
    a: "On current Trucker HQ listings, OTR company drivers out of Indianapolis are offered $0.58 to $0.70 per mile, and local drivers $24 to $29 per hour. Team and specialized freight pays more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Indianapolis is air cargo drayage near the FedEx hub at Indianapolis International Airport, plus flatbed and steel-haul routes in Carmel and Greenwood. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function IndianapolisJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Indianapolis, IN"
      stateName="Indiana"
      heroIntro="150 truck driving jobs within 50 miles of Indianapolis, updated today. Known as the Crossroads of America where I-65, I-70, and I-69 converge, Indianapolis also hosts one of the largest FedEx air cargo hubs in the country, driving steady dry van, reefer, and regional freight demand."
      stats={STATS}
      jobs={INDIANAPOLIS_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/indianapolis-in"
      searchParams={searchParams}
    />
  );
}
