import type { StateCarrierRow } from "@/lib/data";

export const COLORADO_CARRIERS: StateCarrierRow[] = [
  { name: "Rocky Mountain Freight Co", city: "Denver", dot: "6412087", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 91 },
  { name: "Front Range Hauling", city: "Colorado Springs", dot: "6423519", equipment: "Flatbed", trucks: 5, status: "ACTIVE", score: 84 },
  { name: "Volga Line Transport CO", city: "Aurora", dot: "6431742", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 78 },
  { name: "Mile High Logistics", city: "Denver", dot: "6445908", equipment: "Reefer", trucks: 6, status: "ACTIVE", score: 88 },
  { name: "Fort Collins Ag Carriers", city: "Fort Collins", dot: "6456273", equipment: "Flatbed", trucks: 2, status: "WARNING", score: 62 },
  { name: "Pueblo Steel & Freight", city: "Pueblo", dot: "6462814", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 75 },
  { name: "Grand Mesa Trucking", city: "Grand Junction", dot: "6478350", equipment: "Power only", trucks: 1, status: "INACTIVE", score: 41 },
  { name: "Continental Divide Transport", city: "Denver", dot: "6489167", equipment: "Dry van", trucks: 12, status: "ACTIVE", score: 95 },
];
