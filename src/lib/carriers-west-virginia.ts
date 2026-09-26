import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const WEST_VIRGINIA_CARRIERS: StateCarrierRow[] = [
  { name: "Mountain State Freightways", city: "Charleston", dot: "9912340", equipment: "Flatbed", trucks: 7, status: "ACTIVE" as CarrierStatus, score: 88 },
  { name: "Huntington Ridge Logistics", city: "Huntington", dot: "9924571", equipment: "Dry van", trucks: 9, status: "ACTIVE" as CarrierStatus, score: 91 },
  { name: "Volga Line Transport WV", city: "Wheeling", dot: "9938862", equipment: "Dry van", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 76 },
  { name: "Parkersburg Valley Carriers", city: "Parkersburg", dot: "9945103", equipment: "Flatbed", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 82 },
  { name: "Morgantown Summit Trucking", city: "Morgantown", dot: "9957294", equipment: "Reefer", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 79 },
  { name: "Weirton Steel City Haulers", city: "Weirton", dot: "9961485", equipment: "Power only", trucks: 1, status: "ACTIVE" as CarrierStatus, score: 73 },
  { name: "Kanawha River Express", city: "Charleston", dot: "9973826", equipment: "Flatbed", trucks: 6, status: "WARNING" as CarrierStatus, score: 61 },
  { name: "Ohio Valley Bulk Line", city: "Wheeling", dot: "9989017", equipment: "Dry van", trucks: 2, status: "INACTIVE" as CarrierStatus, score: 38 },
];
