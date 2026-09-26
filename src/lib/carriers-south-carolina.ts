import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const SOUTH_CAROLINA_CARRIERS: StateCarrierRow[] = [
  { name: "Palmetto Freight Lines", city: "Columbia", dot: "9203417", equipment: "Dry van", trucks: 9, status: "ACTIVE" as CarrierStatus, score: 88 },
  { name: "Charleston Harbor Carriers", city: "Charleston", dot: "9214856", equipment: "Reefer", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 82 },
  { name: "Volga Line Transport SC", city: "North Charleston", dot: "9227390", equipment: "Dry van", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 76 },
  { name: "Lowcountry Logistics", city: "Mount Pleasant", dot: "9238124", equipment: "Flatbed", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 79 },
  { name: "Rock Hill Express", city: "Rock Hill", dot: "9241067", equipment: "Power only", trucks: 2, status: "ACTIVE" as CarrierStatus, score: 71 },
  { name: "Greenville Ridge Trucking", city: "Greenville", dot: "9256789", equipment: "Dry van", trucks: 7, status: "ACTIVE" as CarrierStatus, score: 91 },
  { name: "Carpathian Freight Solutions", city: "Columbia", dot: "9263452", equipment: "Dry van", trucks: 5, status: "WARNING" as CarrierStatus, score: 62 },
  { name: "Port City Hauling", city: "North Charleston", dot: "9271908", equipment: "Reefer", trucks: 1, status: "INACTIVE" as CarrierStatus, score: 34 },
];
