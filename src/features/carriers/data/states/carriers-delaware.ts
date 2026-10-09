import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const DELAWARE_CARRIERS: StateCarrierRow[] = [
  { name: "First State Freight Lines", city: "Wilmington", dot: "6612384", equipment: "Dry van", trucks: 7, status: "ACTIVE", score: 91 },
  { name: "Blue Hen Transport", city: "Dover", dot: "6634759", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 84 },
  { name: "Diamond State Logistics", city: "Newark", dot: "6647201", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Volga Line Transport DE", city: "Middletown", dot: "6621937", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 76 },
  { name: "Port of Wilmington Carriers", city: "Wilmington", dot: "6658412", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 79 },
  { name: "Smyrna Crossroads Trucking", city: "Smyrna", dot: "6663085", equipment: "Flatbed", trucks: 4, status: "WARNING", score: 62 },
  { name: "Milford Bay Haulers", city: "Milford", dot: "6609673", equipment: "Reefer", trucks: 1, status: "INACTIVE", score: 41 },
  { name: "Odessa Express Carriers", city: "Newark", dot: "6671529", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 95 },
];
