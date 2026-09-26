import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const MINNESOTA_CARRIERS: StateCarrierRow[] = [
  { name: "Twin Cities Freight Lines", city: "Minneapolis", dot: "7812345", equipment: "Dry van", trucks: 9, status: "ACTIVE" as CarrierStatus, score: 88 },
  { name: "St. Paul Logistics Co", city: "St. Paul", dot: "7823456", equipment: "Reefer", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 91 },
  { name: "Mayo Corridor Carriers", city: "Rochester", dot: "7834567", equipment: "Dry van", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 82 },
  { name: "Duluth Harbor Transport", city: "Duluth", dot: "7845678", equipment: "Flatbed", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 76 },
  { name: "Volga Line Transport MN", city: "Bloomington", dot: "7856789", equipment: "Dry van", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 79 },
  { name: "Granite City Hauling", city: "St. Cloud", dot: "7867890", equipment: "Power only", trucks: 2, status: "ACTIVE" as CarrierStatus, score: 71 },
  { name: "North Star Ag Freight", city: "St. Cloud", dot: "7878901", equipment: "Reefer", trucks: 7, status: "WARNING" as CarrierStatus, score: 63 },
  { name: "Lakeside Bulk Carriers", city: "Duluth", dot: "7889012", equipment: "Flatbed", trucks: 1, status: "INACTIVE" as CarrierStatus, score: 41 },
];
