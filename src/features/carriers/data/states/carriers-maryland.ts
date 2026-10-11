import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const MARYLAND_CARRIERS: StateCarrierRow[] = [
  { name: "Baltimore Harbor Freight", city: "Baltimore", dot: "7512483", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Chesapeake Bay Carriers", city: "Annapolis", dot: "7524917", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 83 },
  { name: "Volga Line Transport MD", city: "Rockville", dot: "7536208", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 76 },
  { name: "Frederick Freight Lines", city: "Frederick", dot: "7541672", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 91 },
  { name: "Patapsco Logistics Group", city: "Baltimore", dot: "7553019", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 79 },
  { name: "Gaithersburg Express Trucking", city: "Gaithersburg", dot: "7561845", equipment: "Dry van", trucks: 6, status: "WARNING", score: 61 },
  { name: "Bowie Crossroads Carriers", city: "Bowie", dot: "7572390", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 41 },
  { name: "Danube Interstate Transport", city: "Baltimore", dot: "7589124", equipment: "Reefer", trucks: 7, status: "ACTIVE", score: 85 },
];
