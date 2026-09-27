import type { StateCarrierRow } from "@/lib/data";

export const IDAHO_CARRIERS: StateCarrierRow[] = [
  { name: "Gem State Freightways", city: "Boise", dot: "6812340", equipment: "Reefer", trucks: 6, status: "ACTIVE", score: 88 },
  { name: "Snake River Logistics", city: "Idaho Falls", dot: "6823451", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 91 },
  { name: "Treasure Valley Trucking", city: "Meridian", dot: "6834562", equipment: "Dry van", trucks: 8, status: "ACTIVE", score: 79 },
  { name: "Volga Line Transport", city: "Nampa", dot: "6845673", equipment: "Reefer", trucks: 3, status: "ACTIVE", score: 82 },
  { name: "Highline Ag Carriers", city: "Pocatello", dot: "6856784", equipment: "Flatbed", trucks: 5, status: "ACTIVE", score: 74 },
  { name: "Panhandle Freight Co", city: "Coeur d'Alene", dot: "6867895", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 95 },
  { name: "Boise Basin Transport", city: "Boise", dot: "6878906", equipment: "Dry van", trucks: 1, status: "WARNING", score: 61 },
  { name: "Karpaty Freight LLC", city: "Nampa", dot: "6889017", equipment: "Reefer", trucks: 1, status: "INACTIVE", score: 38 },
];
