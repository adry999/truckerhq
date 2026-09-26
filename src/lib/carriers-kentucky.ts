import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const KENTUCKY_CARRIERS: StateCarrierRow[] = [
  { name: "Bluegrass Freight Lines", city: "Louisville", dot: "7204418", equipment: "Dry van", trucks: 10, status: "ACTIVE" as CarrierStatus, score: 90 },
  { name: "Worldport Logistics Group", city: "Louisville", dot: "7218362", equipment: "Power only", trucks: 7, status: "ACTIVE" as CarrierStatus, score: 86 },
  { name: "Volga Line Transport KY", city: "Covington", dot: "7261947", equipment: "Dry van", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 80 },
  { name: "Bourbon Trail Carriers", city: "Lexington", dot: "7233805", equipment: "Flatbed", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 76 },
  { name: "Bluegrass Reefer Express", city: "Bowling Green", dot: "7247519", equipment: "Reefer", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 73 },
  { name: "Ohio Valley Haulers", city: "Owensboro", dot: "7292630", equipment: "Dry van", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 71 },
  { name: "Richmond Ridge Trucking", city: "Richmond", dot: "7209174", equipment: "Power only", trucks: 2, status: "WARNING" as CarrierStatus, score: 62 },
  { name: "Danube Freight Solutions", city: "Lexington", dot: "7276293", equipment: "Dry van", trucks: 2, status: "INACTIVE" as CarrierStatus, score: 39 },
];
