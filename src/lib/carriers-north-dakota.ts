import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const NORTH_DAKOTA_CARRIERS: StateCarrierRow[] = [
  { name: "Red River Freight Co", city: "Fargo", dot: "8801234", equipment: "Dry van", trucks: 8, status: "ACTIVE" as CarrierStatus, score: 90 },
  { name: "Capital City Carriers", city: "Bismarck", dot: "8812456", equipment: "Flatbed", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 84 },
  { name: "Bakken Basin Tank Lines", city: "Williston", dot: "8823789", equipment: "Tanker", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 78 },
  { name: "Volga Line Transport ND", city: "Minot", dot: "8834012", equipment: "Flatbed", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 82 },
  { name: "Northern Lights Logistics", city: "Grand Forks", dot: "8845321", equipment: "Power only", trucks: 2, status: "ACTIVE" as CarrierStatus, score: 75 },
  { name: "Sheyenne Valley Trucking", city: "West Fargo", dot: "8856789", equipment: "Reefer", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 95 },
  { name: "Oil Patch Power Haulers", city: "Williston", dot: "8867123", equipment: "Power only", trucks: 1, status: "WARNING" as CarrierStatus, score: 61 },
  { name: "Dakota Plains Freight", city: "Fargo", dot: "8878456", equipment: "Flatbed", trucks: 2, status: "INACTIVE" as CarrierStatus, score: 41 },
];
