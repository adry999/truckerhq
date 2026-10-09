import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const LOUISIANA_CARRIERS: StateCarrierRow[] = [
  { name: "Crescent City Freight Lines", city: "New Orleans", dot: "7312450", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Bayou State Logistics", city: "Baton Rouge", dot: "7328917", equipment: "Flatbed", trucks: 6, status: "ACTIVE", score: 91 },
  { name: "Volga Line Transport LA", city: "Metairie", dot: "7341206", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 76 },
  { name: "Port of New Orleans Carriers", city: "New Orleans", dot: "7355883", equipment: "Power only", trucks: 12, status: "ACTIVE", score: 83 },
  { name: "Red River Hauling", city: "Shreveport", dot: "7367129", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 79 },
  { name: "Acadiana Express", city: "Lafayette", dot: "7378544", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 95 },
  { name: "Lake Charles Petro Transport", city: "Lake Charles", dot: "7384012", equipment: "Power only", trucks: 2, status: "WARNING", score: 61 },
  { name: "Odessa Freight Solutions", city: "Baton Rouge", dot: "7391675", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 38 },
];
