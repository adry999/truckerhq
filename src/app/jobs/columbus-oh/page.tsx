import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "140", small: "Open jobs" },
  { big: "37", small: "Local jobs" },
  { big: "$0.58–0.70/mi", small: "Typical OTR pay" },
  { big: "$24–29/hr", small: "Typical local pay" },
];

const COLUMBUS_JOBS: CityJob[] = [
  {
    title: "OTR Company Driver",
    company: "Buckeye Freight Systems",
    loc: "Grove City, OH",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.60–0.66/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Distribution Driver",
    company: "Volga Line Transport",
    loc: "Columbus, OH",
    type: "LOCAL",
    equipment: "DRY VAN",
    pay: "$1,350/wk",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Reefer Driver",
    company: "Scioto Valley Logistics",
    loc: "Dublin, OH",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$1,650/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, Coast to Coast",
    company: "Ironworks Trucking Co",
    loc: "Obetz, OH",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.85/mi split",
    home: "Out 2-3 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Flatbed, Building Materials",
    company: "Westerville Steel Haulers",
    loc: "Westerville, OH",
    type: "LOCAL",
    equipment: "FLATBED",
    pay: "$27/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Dry Van, Midwest & Northeast",
    company: "Dnieper Transit Group",
    loc: "Groveport, OH",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.64/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Columbus, OH: 140 Openings",
  description:
    "Truck driving jobs near Columbus. Pay and home time on every listing. Updated daily.",
  robots:
    COLUMBUS_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Buckeye Freight Systems", score: 82, jobs: 14 },
  { name: "Volga Line Transport", score: 76, jobs: 10 },
  { name: "Scioto Valley Logistics", score: 71, jobs: 8 },
  { name: "Ironworks Trucking Co", score: 63, jobs: 4 },
];

const NEARBY_CITIES = [
  { name: "Dublin", count: 16 },
  { name: "Grove City", count: 14 },
  { name: "Westerville", count: 12 },
  { name: "Dayton", count: 29 },
  { name: "Cincinnati", count: 41 },
  { name: "Cleveland", count: 38 },
  { name: "Indianapolis, IN", count: 33 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Columbus?",
    a: "On current Trucker HQ listings, OTR company drivers out of Columbus are offered $0.58 to $0.70 per mile, and local drivers $24 to $29 per hour. Team and specialized jobs pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Columbus is distribution center freight off I-270, flatbed hauling building materials, and regional drayage. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function ColumbusJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Columbus, OH"
      stateName="Ohio"
      heroIntro="140 truck driving jobs within 50 miles of Columbus, updated today. Columbus sits at the crossroads of I-70 and I-71, putting it within a day's drive of most of the eastern US population and making it one of the busiest distribution hubs in the country."
      stats={STATS}
      jobs={COLUMBUS_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/columbus-oh"
      searchParams={searchParams}
    />
  );
}
