import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const OKLAHOMA_CARRIERS: StateCarrierRow[] = [
  { name: "Sooner State Freight", city: "Oklahoma City", dot: "8912340", equipment: "Flatbed", trucks: 9, status: "ACTIVE" as CarrierStatus, score: 88 },
  { name: "Tulsa Crossroads Trucking", city: "Tulsa", dot: "8923456", equipment: "Dry van", trucks: 12, status: "ACTIVE" as CarrierStatus, score: 91 },
  { name: "Red Dirt Logistics", city: "Norman", dot: "8934521", equipment: "Dry van", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 82 },
  { name: "Broken Arrow Energy Haulers", city: "Broken Arrow", dot: "8945678", equipment: "Flatbed", trucks: 7, status: "ACTIVE" as CarrierStatus, score: 76 },
  { name: "Volga Line Transport OK", city: "Edmond", dot: "8956789", equipment: "Dry van", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 79 },
  { name: "Lawton Rig Transport", city: "Lawton", dot: "8967890", equipment: "Flatbed", trucks: 4, status: "WARNING" as CarrierStatus, score: 61 },
  { name: "Prairie Wind Carriers", city: "Oklahoma City", dot: "8978901", equipment: "Reefer", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 73 },
  { name: "Route 66 Hauling Co", city: "Tulsa", dot: "8989012", equipment: "Power only", trucks: 2, status: "INACTIVE" as CarrierStatus, score: 42 },
];
