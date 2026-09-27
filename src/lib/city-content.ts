import type { CityJob } from "@/components/CityJobsPage";

export const MIN_JOBS_TO_INDEX = 5;

export type CityContentEntry = {
  cityName: string;
  stateName: string;
  title: string;
  description: string;
  heroIntro: string;
  stats: { big: string; small: string }[];
  jobs: CityJob[];
  hiringCarriers: { name: string; score: number; jobs: number }[];
  nearbyCities: { name: string; count: number }[];
  faqs: { q: string; a: string }[];
};

export const CITY_CONTENT: Record<string, CityContentEntry> = {
  "atlanta-ga": {
    cityName: "Atlanta, GA",
    stateName: "Georgia",
    title: "CDL Jobs in Atlanta, GA: 225 Openings",
    description: "Truck driving jobs near Atlanta. Pay and home time on every listing. Updated daily.",
    heroIntro: "225 truck driving jobs within 50 miles of Atlanta, updated today. Atlanta sits at the I-75/I-85 interchange and is one of the busiest freight hubs in the Southeast, with steady dry van, reefer, and intermodal work moving through its rail ramps and distribution centers.",
    stats: [
      { big: "225", small: "Open jobs" },
      { big: "58", small: "Local jobs" },
      { big: "$0.60–0.71/mi", small: "Typical OTR pay" },
      { big: "$24–29/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Volga Line Transport", score: 82, jobs: 14 },
      { name: "Peachtree Cartage", score: 77, jobs: 10 },
      { name: "Danube Road Corp", score: 71, jobs: 8 },
      { name: "Chattahoochee Logistics", score: 64, jobs: 4 },
    ],
    nearbyCities: [
      { name: "Marietta", count: 29 },
      { name: "Decatur", count: 21 },
      { name: "Alpharetta", count: 17 },
      { name: "Savannah", count: 33 },
      { name: "Chattanooga, TN", count: 24 },
      { name: "Charlotte, NC", count: 46 },
    ],
    faqs: [
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
    ],
  },
  "charlotte-nc": {
    cityName: "Charlotte, NC",
    stateName: "North Carolina",
    title: "CDL Jobs in Charlotte, NC: 155 Openings",
    description: "Truck driving jobs near Charlotte. Pay and home time on every listing. Updated daily.",
    heroIntro: "155 truck driving jobs within 50 miles of Charlotte, updated today. Charlotte sits at the I-77/I-85 interchange, one of the busiest freight crossroads in the Southeast, with steady dry van, reefer, and intermodal work moving through the region daily.",
    stats: [
      { big: "155", small: "Open jobs" },
      { big: "38", small: "Local jobs" },
      { big: "$0.60–0.72/mi", small: "Typical OTR pay" },
      { big: "$24–30/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Queen City Freight", score: 85, jobs: 13 },
      { name: "Piedmont Intermodal", score: 78, jobs: 10 },
      { name: "Volga Line Transport", score: 72, jobs: 8 },
      { name: "Carolina Steel Haulers", score: 64, jobs: 5 },
    ],
    nearbyCities: [
      { name: "Concord", count: 28 },
      { name: "Gastonia", count: 24 },
      { name: "Matthews", count: 14 },
      { name: "Huntersville", count: 16 },
      { name: "Rock Hill, SC", count: 20 },
      { name: "Greensboro", count: 33 },
      { name: "Columbia, SC", count: 25 },
      { name: "Raleigh", count: 41 },
    ],
    faqs: [
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
    ],
  },
  "chicago-il": {
    cityName: "Chicago, IL",
    stateName: "Illinois",
    title: "CDL Jobs in Chicago, IL: 148 Openings",
    description: "Truck driving jobs near Chicago. Pay and home time on every listing. Updated daily.",
    heroIntro: "148 truck driving jobs within 50 miles of Chicago, updated today. Chicago is one of the largest freight hubs in the US, with steady dry van and intermodal work out of the I-55 and I-80 corridors.",
    stats: [
      { big: "148", small: "Open jobs" },
      { big: "41", small: "Local jobs" },
      { big: "$0.62–0.74/mi", small: "Typical OTR pay" },
      { big: "$26–32/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Carpathian Freight", score: 86, jobs: 12 },
      { name: "Lakeshore Drayage", score: 81, jobs: 9 },
      { name: "Volga Line Transport", score: 74, jobs: 7 },
      { name: "Iron Horse Hauling", score: 68, jobs: 5 },
    ],
    nearbyCities: [
      { name: "Joliet", count: 34 },
      { name: "Aurora", count: 22 },
      { name: "Naperville", count: 18 },
      { name: "Elgin", count: 15 },
      { name: "Gary, IN", count: 19 },
      { name: "Rockford", count: 21 },
      { name: "Milwaukee, WI", count: 57 },
    ],
    faqs: [
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
    ],
  },
  "columbus-oh": {
    cityName: "Columbus, OH",
    stateName: "Ohio",
    title: "CDL Jobs in Columbus, OH: 140 Openings",
    description: "Truck driving jobs near Columbus. Pay and home time on every listing. Updated daily.",
    heroIntro: "140 truck driving jobs within 50 miles of Columbus, updated today. Columbus sits at the crossroads of I-70 and I-71, putting it within a day's drive of most of the eastern US population and making it one of the busiest distribution hubs in the country.",
    stats: [
      { big: "140", small: "Open jobs" },
      { big: "37", small: "Local jobs" },
      { big: "$0.58–0.70/mi", small: "Typical OTR pay" },
      { big: "$24–29/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Buckeye Freight Systems", score: 82, jobs: 14 },
      { name: "Volga Line Transport", score: 76, jobs: 10 },
      { name: "Scioto Valley Logistics", score: 71, jobs: 8 },
      { name: "Ironworks Trucking Co", score: 63, jobs: 4 },
    ],
    nearbyCities: [
      { name: "Dublin", count: 16 },
      { name: "Grove City", count: 14 },
      { name: "Westerville", count: 12 },
      { name: "Dayton", count: 29 },
      { name: "Cincinnati", count: 41 },
      { name: "Cleveland", count: 38 },
      { name: "Indianapolis, IN", count: 33 },
    ],
    faqs: [
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
    ],
  },
  "dallas-tx": {
    cityName: "Dallas, TX",
    stateName: "Texas",
    title: "CDL Jobs in Dallas, TX: 210 Openings",
    description: "Truck driving jobs near Dallas. Pay and home time on every listing. Updated daily.",
    heroIntro: "210 truck driving jobs within 50 miles of Dallas, updated today. Dallas-Fort Worth sits at the junction of I-35, I-30, and I-20, making it one of the country's largest inland freight and distribution hubs.",
    stats: [
      { big: "210", small: "Open jobs" },
      { big: "52", small: "Local jobs" },
      { big: "$0.60–0.72/mi", small: "Typical OTR pay" },
      { big: "$24–29/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Lone Star Freightways", score: 84, jobs: 14 },
      { name: "Trinity River Logistics", score: 77, jobs: 10 },
      { name: "Volga Line Transport", score: 71, jobs: 8 },
      { name: "Metroplex Intermodal", score: 63, jobs: 4 },
    ],
    nearbyCities: [
      { name: "Fort Worth", count: 61 },
      { name: "Arlington", count: 33 },
      { name: "Plano", count: 24 },
      { name: "Irving", count: 27 },
      { name: "Garland", count: 19 },
      { name: "Oklahoma City, OK", count: 38 },
      { name: "Houston, TX", count: 89 },
    ],
    faqs: [
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
    ],
  },
  "houston-tx": {
    cityName: "Houston, TX",
    stateName: "Texas",
    title: "CDL Jobs in Houston, TX: 195 Openings",
    description: "Truck driving jobs near Houston. Pay and home time on every listing. Updated daily.",
    heroIntro: "195 truck driving jobs within 50 miles of Houston, updated today. The Port of Houston drives heavy petrochemical and energy-sector freight, with steady tanker, flatbed, and dry van work along I-10, I-45, and I-69.",
    stats: [
      { big: "195", small: "Open jobs" },
      { big: "52", small: "Local jobs" },
      { big: "$0.60–0.72/mi", small: "Typical OTR pay" },
      { big: "$25–31/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Volga Line Transport", score: 82, jobs: 14 },
      { name: "Bayou City Drayage", score: 77, jobs: 11 },
      { name: "Gulf Coast Rigging & Transport", score: 71, jobs: 8 },
      { name: "Ship Channel Carriers", score: 64, jobs: 4 },
    ],
    nearbyCities: [
      { name: "Pasadena", count: 28 },
      { name: "Baytown", count: 21 },
      { name: "Sugar Land", count: 17 },
      { name: "Galveston", count: 14 },
      { name: "Beaumont", count: 19 },
      { name: "San Antonio, TX", count: 46 },
      { name: "Dallas, TX", count: 61 },
    ],
    faqs: [
      {
        q: "How much do truck drivers make in Houston?",
        a: "On current Trucker HQ listings, OTR company drivers out of Houston are offered $0.60 to $0.72 per mile, and local drivers $25 to $31 per hour. Tanker and specialized petrochemical hauls pay more.",
      },
      {
        q: "Are there local CDL jobs with home time every night?",
        a: "Yes. Most local work around Houston is container drayage out of the Port of Houston, tanker runs between Ship Channel refineries, and regional flatbed for the energy sector. Filter by Local to see only those.",
      },
      {
        q: "Can I apply in Russian?",
        a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
      },
    ],
  },
  "indianapolis-in": {
    cityName: "Indianapolis, IN",
    stateName: "Indiana",
    title: "CDL Jobs in Indianapolis, IN: 150 Openings",
    description: "Truck driving jobs near Indianapolis. Pay and home time on every listing. Updated daily.",
    heroIntro: "150 truck driving jobs within 50 miles of Indianapolis, updated today. Known as the Crossroads of America where I-65, I-70, and I-69 converge, Indianapolis also hosts one of the largest FedEx air cargo hubs in the country, driving steady dry van, reefer, and regional freight demand.",
    stats: [
      { big: "150", small: "Open jobs" },
      { big: "38", small: "Local jobs" },
      { big: "$0.58–0.70/mi", small: "Typical OTR pay" },
      { big: "$24–29/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Volga Line Transport", score: 78, jobs: 14 },
      { name: "Crossroads Air Logistics", score: 85, jobs: 11 },
      { name: "Hoosier Cold Chain", score: 71, jobs: 7 },
      { name: "Circle City Steel Logistics", score: 64, jobs: 4 },
    ],
    nearbyCities: [
      { name: "Fishers", count: 21 },
      { name: "Carmel", count: 19 },
      { name: "Plainfield", count: 27 },
      { name: "Greenwood", count: 16 },
      { name: "Columbus, OH", count: 45 },
      { name: "Louisville, KY", count: 38 },
      { name: "Chicago, IL", count: 148 },
    ],
    faqs: [
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
    ],
  },
  "los-angeles-ca": {
    cityName: "Los Angeles, CA",
    stateName: "California",
    title: "CDL Jobs in Los Angeles, CA: 340 Openings",
    description: "Truck driving jobs near Los Angeles. Pay and home time on every listing. Updated daily.",
    heroIntro: "340 truck driving jobs within 50 miles of Los Angeles, updated today. The Port of LA and Port of Long Beach together form the busiest container gateway in the country, driving heavy year-round demand for drayage and local drivers.",
    stats: [
      { big: "340", small: "Open jobs" },
      { big: "162", small: "Local jobs" },
      { big: "$0.65–0.78/mi", small: "Typical OTR pay" },
      { big: "$28–36/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Pacific Gateway Drayage", score: 84, jobs: 14 },
      { name: "Volga Line Transport", score: 77, jobs: 11 },
      { name: "Sunbelt Freight Systems", score: 90, jobs: 8 },
      { name: "Harbor Intermodal Inc.", score: 63, jobs: 4 },
    ],
    nearbyCities: [
      { name: "Long Beach", count: 61 },
      { name: "Anaheim", count: 38 },
      { name: "Ontario", count: 33 },
      { name: "Riverside", count: 27 },
      { name: "San Diego", count: 45 },
      { name: "Bakersfield", count: 19 },
    ],
    faqs: [
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
    ],
  },
  "louisville-ky": {
    cityName: "Louisville, KY",
    stateName: "Kentucky",
    title: "CDL Jobs in Louisville, KY: 130 Openings",
    description: "Truck driving jobs near Louisville. Pay and home time on every listing. Updated daily.",
    heroIntro: "130 truck driving jobs within 50 miles of Louisville, updated today. Louisville is home to UPS Worldport, the largest UPS air hub in the world, sitting right at the I-64/I-65/I-71 interchange, which keeps local feeder and package work steady year-round.",
    stats: [
      { big: "130", small: "Open jobs" },
      { big: "58", small: "Local jobs" },
      { big: "$0.58–0.70/mi", small: "Typical OTR pay" },
      { big: "$24–29/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Bluegrass Sort & Ship", score: 84, jobs: 14 },
      { name: "Volga Line Transport", score: 77, jobs: 10 },
      { name: "Derby City Freightways", score: 71, jobs: 8 },
      { name: "Ohio Valley Cartage", score: 63, jobs: 4 },
    ],
    nearbyCities: [
      { name: "Jeffersonville, IN", count: 26 },
      { name: "New Albany, IN", count: 19 },
      { name: "Shepherdsville", count: 15 },
      { name: "Lexington", count: 31 },
      { name: "Cincinnati, OH", count: 42 },
      { name: "Nashville, TN", count: 47 },
      { name: "Indianapolis, IN", count: 38 },
    ],
    faqs: [
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
    ],
  },
  "memphis-tn": {
    cityName: "Memphis, TN",
    stateName: "Tennessee",
    title: "CDL Jobs in Memphis, TN: 175 Openings",
    description: "Truck driving jobs near Memphis. Pay and home time on every listing. Updated daily.",
    heroIntro: "175 truck driving jobs within 50 miles of Memphis, updated today. Memphis is home to the FedEx World Hub, the largest air cargo hub on Earth, and sits where I-40, I-55, and I-69 meet Mississippi River barge-to-truck freight.",
    stats: [
      { big: "175", small: "Open jobs" },
      { big: "68", small: "Local jobs" },
      { big: "$0.60–0.70/mi", small: "Typical OTR pay" },
      { big: "$24–29/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Mid-South Air Cargo Carriers", score: 88, jobs: 14 },
      { name: "Bluff City Logistics", score: 82, jobs: 11 },
      { name: "Neva River Transport", score: 71, jobs: 8 },
      { name: "Wolf River Drayage", score: 65, jobs: 5 },
    ],
    nearbyCities: [
      { name: "Southaven, MS", count: 27 },
      { name: "West Memphis, AR", count: 19 },
      { name: "Bartlett", count: 14 },
      { name: "Olive Branch, MS", count: 16 },
      { name: "Jackson, MS", count: 23 },
      { name: "Nashville, TN", count: 41 },
      { name: "Little Rock, AR", count: 25 },
    ],
    faqs: [
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
    ],
  },
  "phoenix-az": {
    cityName: "Phoenix, AZ",
    stateName: "Arizona",
    title: "CDL Jobs in Phoenix, AZ: 165 Openings",
    description: "Truck driving jobs near Phoenix. Pay and home time on every listing. Updated daily.",
    heroIntro: "165 truck driving jobs within 50 miles of Phoenix, updated today. Phoenix sits at the crossroads of I-10 and I-17, and its fast-growing warehouse and distribution market keeps steady demand for local shuttle and regional dry van drivers.",
    stats: [
      { big: "165", small: "Open jobs" },
      { big: "38", small: "Local jobs" },
      { big: "$0.60–0.70/mi", small: "Typical OTR pay" },
      { big: "$24–29/hr", small: "Typical local pay" },
    ],
    jobs: [],
    hiringCarriers: [
      { name: "Desert Crossroads Logistics", score: 82, jobs: 11 },
      { name: "Sonoran Freight Lines", score: 77, jobs: 9 },
      { name: "Ural Trans Carriers", score: 68, jobs: 6 },
      { name: "Cactus State Hauling", score: 63, jobs: 4 },
    ],
    nearbyCities: [
      { name: "Mesa", count: 41 },
      { name: "Chandler", count: 29 },
      { name: "Scottsdale", count: 24 },
      { name: "Tempe", count: 22 },
      { name: "Tucson", count: 36 },
      { name: "Flagstaff", count: 14 },
    ],
    faqs: [
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
    ],
  },
};

export const CITY_SLUGS = Object.keys(CITY_CONTENT);
