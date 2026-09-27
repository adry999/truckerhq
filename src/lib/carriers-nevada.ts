import type { StateCarrierRow } from "@/lib/data";

export const NEVADA_CARRIERS: StateCarrierRow[] = [
  { name: "Silver State Freight Lines", city: "Las Vegas", dot: "8312045", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Henderson Logistics Co", city: "Henderson", dot: "8324891", equipment: "Power only", trucks: 5, status: "ACTIVE", score: 82 },
  { name: "Biggest Little Trucking", city: "Reno", dot: "8337612", equipment: "Dry van", trucks: 12, status: "ACTIVE", score: 91 },
  { name: "Volga Line Transport NV", city: "North Las Vegas", dot: "8341203", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 76 },
  { name: "Sparks Distribution Carriers", city: "Sparks", dot: "8356780", equipment: "Power only", trucks: 3, status: "ACTIVE", score: 79 },
  { name: "Carson Capital Freight", city: "Carson City", dot: "8362914", equipment: "Flatbed", trucks: 2, status: "ACTIVE", score: 71 },
  { name: "Desert Express Hauling", city: "Las Vegas", dot: "8371058", equipment: "Reefer", trucks: 6, status: "WARNING", score: 63 },
  { name: "Neon Line Transport", city: "Las Vegas", dot: "8389447", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 41 },
];
