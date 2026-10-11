import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const CALIFORNIA_CARRIERS: StateCarrierRow[] = [
  { name: "Pacific Rim Logistics", city: "Los Angeles", dot: "5104217", equipment: "Dry van", trucks: 8, status: "ACTIVE", score: 89 },
  { name: "Dniester Bay Transport", city: "Long Beach", dot: "5112893", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 82 },
  { name: "Central Valley Cold Chain", city: "Fresno", dot: "5123456", equipment: "Reefer", trucks: 10, status: "ACTIVE", score: 91 },
  { name: "Golden State Flatbed Co", city: "Bakersfield", dot: "5134502", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 76 },
  { name: "Moldova Pacific Express", city: "Oakland", dot: "5141870", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 79 },
  { name: "Delta Stockton Carriers", city: "Stockton", dot: "5152049", equipment: "Power only", trucks: 2, status: "WARNING", score: 61 },
  { name: "Harbor City Trucking", city: "San Diego", dot: "5163315", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 85 },
  { name: "Sacramento River Freight", city: "Sacramento", dot: "5178624", equipment: "Flatbed", trucks: 1, status: "INACTIVE", score: 38 },
];
