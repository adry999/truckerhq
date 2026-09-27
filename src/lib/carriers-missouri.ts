import type { StateCarrierRow } from "@/lib/data";

export const MISSOURI_CARRIERS: StateCarrierRow[] = [
  { name: "Gateway City Freight", city: "St. Louis", dot: "8012345", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "KC Crossroads Logistics", city: "Kansas City", dot: "8023456", equipment: "Dry van", trucks: 7, status: "ACTIVE", score: 84 },
  { name: "Volga Line Transport MO", city: "Independence", dot: "8034567", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 77 },
  { name: "Ozark Flatbed Co", city: "Springfield", dot: "8045678", equipment: "Flatbed", trucks: 5, status: "ACTIVE", score: 81 },
  { name: "Show-Me Reefer Lines", city: "Columbia", dot: "8056789", equipment: "Reefer", trucks: 3, status: "ACTIVE", score: 73 },
  { name: "Lee's Summit Power Haulers", city: "Lee's Summit", dot: "8067890", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 70 },
  { name: "Mississippi Valley Carriers", city: "St. Louis", dot: "8078901", equipment: "Dry van", trucks: 8, status: "WARNING", score: 61 },
  { name: "Independence Midway Trucking", city: "Independence", dot: "8089012", equipment: "Dry van", trucks: 2, status: "INACTIVE", score: 38 },
];
