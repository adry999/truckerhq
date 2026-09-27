import type { StateCarrierRow } from "@/lib/data";

export const ARKANSAS_CARRIERS: StateCarrierRow[] = [
  { name: "Ozark Mountain Freight", city: "Fort Smith", dot: "6312045", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Natural State Logistics", city: "Little Rock", dot: "6338671", equipment: "Dry van", trucks: 12, status: "ACTIVE", score: 91 },
  { name: "Volga Line Transport AR", city: "Springdale", dot: "6355290", equipment: "Dry van", trucks: 5, status: "ACTIVE", score: 79 },
  { name: "Razorback Bulk Carriers", city: "Fayetteville", dot: "6367812", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 83 },
  { name: "Delta Ridge Trucking", city: "Jonesboro", dot: "6321459", equipment: "Reefer", trucks: 3, status: "WARNING", score: 62 },
  { name: "NWA Express Lines", city: "Rogers", dot: "6349903", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 74 },
  { name: "Arkansas River Haulers", city: "Little Rock", dot: "6308217", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 95 },
  { name: "Cotton Belt Transport", city: "Jonesboro", dot: "6392654", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 38 },
];
