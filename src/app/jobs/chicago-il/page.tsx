import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "148", small: "Open jobs" },
  { big: "41", small: "Local jobs" },
  { big: "$0.62–0.74/mi", small: "Typical OTR pay" },
  { big: "$26–32/hr", small: "Typical local pay" },
];

const CHICAGO_JOBS: CityJob[] = [
  {
    title: "OTR Company Driver",
    company: "Carpathian Freight",
    loc: "Des Plaines, IL",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.68–0.72/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Intermodal Driver",
    company: "Lakeshore Drayage",
    loc: "Chicago, IL",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$1,500/wk",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Reefer Driver",
    company: "Volga Line Transport",
    loc: "Joliet, IL",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$1,750/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, Coast to Coast",
    company: "Iron Horse Hauling",
    loc: "Elk Grove Village, IL",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.90/mi split",
    home: "Out 3 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Flatbed, Steel Coils",
    company: "Prairie Steel Logistics",
    loc: "Gary, IN",
    type: "LOCAL",
    equipment: "FLATBED",
    pay: "$30/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Dry Van, Midwest",
    company: "Danube Road Corp",
    loc: "Bolingbrook, IL",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.66/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Chicago, IL: 148 Openings",
  description:
    "Truck driving jobs near Chicago. Pay and home time on every listing. Updated daily.",
  robots:
    CHICAGO_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Carpathian Freight", score: 86, jobs: 12 },
  { name: "Lakeshore Drayage", score: 81, jobs: 9 },
  { name: "Volga Line Transport", score: 74, jobs: 7 },
  { name: "Iron Horse Hauling", score: 68, jobs: 5 },
];

const NEARBY_CITIES = [
  { name: "Joliet", count: 34 },
  { name: "Aurora", count: 22 },
  { name: "Naperville", count: 18 },
  { name: "Elgin", count: 15 },
  { name: "Gary, IN", count: 19 },
  { name: "Rockford", count: 21 },
  { name: "Milwaukee, WI", count: 57 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Chicago?",
    a: "On current Trucker HQ listings, OTR company drivers out of Chicago are offered $0.62 to $0.74 per mile, and local drivers $26 to $32 per hour. Team and specialized jobs pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Chicago is intermodal drayage from the rail yards, flatbed out of Northwest Indiana, and food distribution. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function ChicagoJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Chicago, IL"
      stateName="Illinois"
      heroIntro="148 truck driving jobs within 50 miles of Chicago, updated today. Chicago is one of the largest freight hubs in the US, with steady dry van and intermodal work out of the I-55 and I-80 corridors."
      stats={STATS}
      jobs={CHICAGO_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/chicago-il"
      searchParams={searchParams}
    />
  );
}
