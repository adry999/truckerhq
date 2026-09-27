import type { StateCarrierRow } from "@/lib/data";

export const WASHINGTON_CARRIERS: StateCarrierRow[] = [
  { name: "Emerald City Freight", city: "Seattle", dot: "9812340", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 91 },
  { name: "Cascade Reefer Lines", city: "Tacoma", dot: "9823156", equipment: "Reefer", trucks: 7, status: "ACTIVE", score: 84 },
  { name: "Volga Line Transport NW", city: "Spokane", dot: "9834721", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 79 },
  { name: "Puget Sound Carriers", city: "Bellevue", dot: "9845093", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 75 },
  { name: "Columbia Gorge Trucking", city: "Vancouver", dot: "9856278", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 82 },
  { name: "Everett Timber Haulers", city: "Everett", dot: "9867412", equipment: "Flatbed", trucks: 2, status: "ACTIVE", score: 71 },
  { name: "Baltic Star Logistics", city: "Seattle", dot: "9878934", equipment: "Dry van", trucks: 6, status: "WARNING", score: 62 },
  { name: "Inland Empire Freightways", city: "Spokane", dot: "9889205", equipment: "Power only", trucks: 1, status: "INACTIVE", score: 38 },
];
