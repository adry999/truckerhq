import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const GEORGIA_CARRIERS: StateCarrierRow[] = [
  { name: "Peachtree Logistics Group", city: "Atlanta", dot: "5412093", equipment: "Dry van", trucks: 11, status: "ACTIVE" as CarrierStatus, score: 89 },
  { name: "Savannah Port Carriers", city: "Savannah", dot: "5433671", equipment: "Reefer", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 85 },
  { name: "Volga Line Transport GA", city: "Marietta", dot: "5461208", equipment: "Dry van", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 79 },
  { name: "Coastal Empire Freight", city: "Savannah", dot: "5477942", equipment: "Flatbed", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 74 },
  { name: "Moldova Express Southeast", city: "Atlanta", dot: "5405517", equipment: "Dry van", trucks: 8, status: "WARNING" as CarrierStatus, score: 61 },
  { name: "Augusta Bulldog Trucking", city: "Augusta", dot: "5488365", equipment: "Power only", trucks: 1, status: "ACTIVE" as CarrierStatus, score: 72 },
  { name: "Macon Midway Haulers", city: "Macon", dot: "5449830", equipment: "Dry van", trucks: 2, status: "INACTIVE" as CarrierStatus, score: 36 },
  { name: "Columbus River Line", city: "Columbus", dot: "5493154", equipment: "Reefer", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 82 },
];
