import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const MISSISSIPPI_CARRIERS: StateCarrierRow[] = [
  { name: "Magnolia State Freight", city: "Jackson", dot: "7912438", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Gulfport Harbor Carriers", city: "Gulfport", dot: "7934210", equipment: "Flatbed", trucks: 6, status: "ACTIVE", score: 84 },
  { name: "Volga Line Transport MS", city: "Southaven", dot: "7956092", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 79 },
  { name: "Pine Belt Hauling Co", city: "Hattiesburg", dot: "7967745", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 75 },
  { name: "Biloxi Bay Logistics", city: "Biloxi", dot: "7923581", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 81 },
  { name: "Meridian Crossroads Trucking", city: "Meridian", dot: "7989164", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 71 },
  { name: "Kaskil Freight Lines", city: "Jackson", dot: "7945327", equipment: "Dry van", trucks: 7, status: "WARNING", score: 63 },
  { name: "Delta Southern Carriers", city: "Southaven", dot: "7978603", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 41 },
];
