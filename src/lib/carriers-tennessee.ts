import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const TENNESSEE_CARRIERS: StateCarrierRow[] = [
  { name: "Music City Freight Lines", city: "Nashville", dot: "9412086", equipment: "Dry van", trucks: 9, status: "ACTIVE" as CarrierStatus, score: 88 },
  { name: "Memphis Bluff Logistics", city: "Memphis", dot: "9433751", equipment: "Power only", trucks: 12, status: "ACTIVE" as CarrierStatus, score: 91 },
  { name: "Volga Line Transport TN", city: "Nashville", dot: "9461204", equipment: "Dry van", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 80 },
  { name: "Scenic City Carriers", city: "Chattanooga", dot: "9477938", equipment: "Flatbed", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 76 },
  { name: "Odessa Freight Solutions", city: "Memphis", dot: "9405513", equipment: "Dry van", trucks: 7, status: "WARNING" as CarrierStatus, score: 63 },
  { name: "Clarksville Crossing Trucking", city: "Clarksville", dot: "9488361", equipment: "Power only", trucks: 2, status: "ACTIVE" as CarrierStatus, score: 71 },
  { name: "Murfreesboro Midway Haulers", city: "Murfreesboro", dot: "9449826", equipment: "Dry van", trucks: 2, status: "INACTIVE" as CarrierStatus, score: 41 },
  { name: "Knoxville Ridge Reefer Co", city: "Knoxville", dot: "9493150", equipment: "Reefer", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 84 },
];
