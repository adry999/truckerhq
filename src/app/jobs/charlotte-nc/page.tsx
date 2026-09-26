import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "155", small: "Open jobs" },
  { big: "38", small: "Local jobs" },
  { big: "$0.60–0.72/mi", small: "Typical OTR pay" },
  { big: "$24–30/hr", small: "Typical local pay" },
];

const CHARLOTTE_JOBS: CityJob[] = [
  {
    title: "OTR Company Driver",
    company: "Queen City Freight",
    loc: "Concord, NC",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.64–0.70/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local P&D Driver",
    company: "Piedmont Intermodal",
    loc: "Charlotte, NC",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$28/hr",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Reefer Driver",
    company: "Volga Line Transport",
    loc: "Gastonia, NC",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$1,700/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, I-85 Corridor",
    company: "Carolina Steel Haulers",
    loc: "Matthews, NC",
    type: "OTR",
    equipment: "FLATBED",
    pay: "$0.85/mi split",
    home: "Out 2 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Dry Van, Grocery Distribution",
    company: "Catawba Valley Distribution",
    loc: "Rock Hill, SC",
    type: "LOCAL",
    equipment: "DRY VAN",
    pay: "$26/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Dry Van, Southeast",
    company: "Blue Ridge Freightways",
    loc: "Huntersville, NC",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.62/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Charlotte, NC: 155 Openings",
  description:
    "Truck driving jobs near Charlotte. Pay and home time on every listing. Updated daily.",
  robots:
    CHARLOTTE_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Queen City Freight", score: 85, jobs: 13 },
  { name: "Piedmont Intermodal", score: 78, jobs: 10 },
  { name: "Volga Line Transport", score: 72, jobs: 8 },
  { name: "Carolina Steel Haulers", score: 64, jobs: 5 },
];

const NEARBY_CITIES = [
  { name: "Concord", count: 28 },
  { name: "Gastonia", count: 24 },
  { name: "Matthews", count: 14 },
  { name: "Huntersville", count: 16 },
  { name: "Rock Hill, SC", count: 20 },
  { name: "Greensboro", count: 33 },
  { name: "Columbia, SC", count: 25 },
  { name: "Raleigh", count: 41 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Charlotte?",
    a: "On current Trucker HQ listings, OTR company drivers out of Charlotte are offered $0.60 to $0.72 per mile, and local drivers $24 to $30 per hour. Team and flatbed jobs pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Charlotte is intermodal drayage, grocery distribution, and P&D runs out of the I-77/I-85 interchange. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function CharlotteJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Charlotte, NC"
      stateName="North Carolina"
      heroIntro="155 truck driving jobs within 50 miles of Charlotte, updated today. Charlotte sits at the I-77/I-85 interchange, one of the busiest freight crossroads in the Southeast, with steady dry van, reefer, and intermodal work moving through the region daily."
      stats={STATS}
      jobs={CHARLOTTE_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/charlotte-nc"
      searchParams={searchParams}
    />
  );
}
