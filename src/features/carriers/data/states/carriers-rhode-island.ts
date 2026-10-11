import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const RHODE_ISLAND_CARRIERS: StateCarrierRow[] = [
  { name: "Ocean State Freight Lines", city: "Providence", dot: "9104217", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 88 },
  { name: "Narragansett Bay Trucking", city: "Warwick", dot: "9112583", equipment: "Reefer", trucks: 4, status: "ACTIVE", score: 91 },
  { name: "Volga Line Transport RI", city: "Cranston", dot: "9127940", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 79 },
  { name: "Blackstone Valley Carriers", city: "Pawtucket", dot: "9138462", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 73 },
  { name: "Providence Port Logistics", city: "Providence", dot: "9145719", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 84 },
  { name: "East Bay Dry Van Co", city: "East Providence", dot: "9156083", equipment: "Dry van", trucks: 1, status: "WARNING", score: 62 },
  { name: "Woonsocket Flatbed & Freight", city: "Woonsocket", dot: "9163257", equipment: "Flatbed", trucks: 2, status: "ACTIVE", score: 76 },
  { name: "Little Rhody Hauling", city: "Cranston", dot: "9178904", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 41 },
];
