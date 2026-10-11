import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const NEW_JERSEY_CARRIERS: StateCarrierRow[] = [
  { name: "Port Newark Drayage Co", city: "Newark", dot: "5512087", equipment: "Dry van", trucks: 11, status: "ACTIVE", score: 89 },
  { name: "Moldova Express", city: "Elizabeth", dot: "5534602", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 82 },
  { name: "Garden State Freight Lines", city: "Edison", dot: "5561944", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 85 },
  { name: "Camden Waterfront Carriers", city: "Camden", dot: "5507318", equipment: "Reefer", trucks: 4, status: "ACTIVE", score: 78 },
  { name: "Volga Line Transport", city: "Jersey City", dot: "5578255", equipment: "Power only", trucks: 3, status: "ACTIVE", score: 74 },
  { name: "Trenton Capital Trucking", city: "Trenton", dot: "5545871", equipment: "Dry van", trucks: 2, status: "WARNING", score: 61 },
  { name: "Exit 8A Logistics", city: "Edison", dot: "5592036", equipment: "Dry van", trucks: 7, status: "ACTIVE", score: 91 },
  { name: "Elizabethport Hauling", city: "Elizabeth", dot: "5519473", equipment: "Flatbed", trucks: 1, status: "INACTIVE", score: 38 },
];
