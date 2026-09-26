import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const UTAH_CARRIERS: StateCarrierRow[] = [
  { name: "Wasatch Line Logistics", city: "Salt Lake City", dot: "9503412", equipment: "Dry van", trucks: 9, status: "ACTIVE" as CarrierStatus, score: 91 },
  { name: "Beehive Freight Co", city: "West Valley City", dot: "9517880", equipment: "Power only", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 84 },
  { name: "Volga Line Transport UT", city: "Provo", dot: "9524390", equipment: "Dry van", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 77 },
  { name: "Timpanogos Transport", city: "Orem", dot: "9531267", equipment: "Reefer", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 88 },
  { name: "Wasatch Front Carriers", city: "West Jordan", dot: "9548029", equipment: "Flatbed", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 73 },
  { name: "Ogden Rail Yard Trucking", city: "Ogden", dot: "9552910", equipment: "Power only", trucks: 2, status: "ACTIVE" as CarrierStatus, score: 80 },
  { name: "Great Salt Freight", city: "Salt Lake City", dot: "9561344", equipment: "Dry van", trucks: 8, status: "WARNING" as CarrierStatus, score: 62 },
  { name: "Provo Canyon Haulers", city: "Provo", dot: "9578603", equipment: "Dry van", trucks: 1, status: "INACTIVE" as CarrierStatus, score: 41 },
];
