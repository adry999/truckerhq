import type { Metadata } from "next";
import CityJobsPage, { type CityJob } from "@/components/CityJobsPage";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "225", small: "Open jobs" },
  { big: "58", small: "Local jobs" },
  { big: "$0.60–0.71/mi", small: "Typical OTR pay" },
  { big: "$24–29/hr", small: "Typical local pay" },
];

const ATLANTA_JOBS: CityJob[] = [
  {
    title: "OTR Company Driver",
    company: "Volga Line Transport",
    loc: "Marietta, GA",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.64–0.69/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Delivery Driver, Food Distribution",
    company: "Peachtree Cartage",
    loc: "Decatur, GA",
    type: "LOCAL",
    equipment: "REEFER",
    pay: "$1,350/wk",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Dry Van, Southeast",
    company: "Danube Road Corp",
    loc: "Alpharetta, GA",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.65/mi",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, Coast to Coast",
    company: "Iron Horse Hauling",
    loc: "College Park, GA",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.88/mi split",
    home: "Out 2-3 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Drayage Driver, Rail Ramp",
    company: "Chattahoochee Logistics",
    loc: "Forest Park, GA",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$27/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Flatbed, Building Materials",
    company: "Carpathian Freight",
    loc: "Kennesaw, GA",
    type: "REGIONAL",
    equipment: "FLATBED",
    pay: "$0.68/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Atlanta, GA: 225 Openings",
  description:
    "Truck driving jobs near Atlanta. Pay and home time on every listing. Updated daily.",
  robots:
    ATLANTA_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Volga Line Transport", score: 82, jobs: 14 },
  { name: "Peachtree Cartage", score: 77, jobs: 10 },
  { name: "Danube Road Corp", score: 71, jobs: 8 },
  { name: "Chattahoochee Logistics", score: 64, jobs: 4 },
];

const NEARBY_CITIES = [
  { name: "Marietta", count: 29 },
  { name: "Decatur", count: 21 },
  { name: "Alpharetta", count: 17 },
  { name: "Savannah", count: 33 },
  { name: "Chattanooga, TN", count: 24 },
  { name: "Charlotte, NC", count: 46 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Atlanta?",
    a: "On current Trucker HQ listings, OTR company drivers out of Atlanta are offered $0.60 to $0.71 per mile, and local drivers $24 to $29 per hour. Team and specialized jobs pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Atlanta is food distribution, drayage out of the Norfolk Southern and CSX rail ramps, and regional runs along I-75 and I-85. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default function AtlantaJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <CityJobsPage
      cityName="Atlanta, GA"
      stateName="Georgia"
      heroIntro="225 truck driving jobs within 50 miles of Atlanta, updated today. Atlanta sits at the I-75/I-85 interchange and is one of the busiest freight hubs in the Southeast, with steady dry van, reefer, and intermodal work moving through its rail ramps and distribution centers."
      stats={STATS}
      jobs={ATLANTA_JOBS}
      faqs={FAQS}
      hiringCarriers={HIRING_CARRIERS}
      nearbyCities={NEARBY_CITIES}
      basePath="/jobs/atlanta-ga"
      searchParams={searchParams}
    />
  );
}
