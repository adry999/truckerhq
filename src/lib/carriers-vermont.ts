import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const VERMONT_CARRIERS: StateCarrierRow[] = [
  { name: "Green Mountain Freight Co", city: "Burlington", dot: "9612044", equipment: "Dry van", trucks: 7, status: "ACTIVE" as CarrierStatus, score: 91 },
  { name: "Lake Champlain Logistics", city: "South Burlington", dot: "9634871", equipment: "Reefer", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 85 },
  { name: "Rutland Marble Transport", city: "Rutland", dot: "9648203", equipment: "Flatbed", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 78 },
  { name: "Volga Line Transport VT", city: "Barre", dot: "9601567", equipment: "Dry van", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 82 },
  { name: "Montpelier Capital Carriers", city: "Montpelier", dot: "9667932", equipment: "Reefer", trucks: 2, status: "ACTIVE" as CarrierStatus, score: 74 },
  { name: "St. Albans Border Freight", city: "St. Albans", dot: "9623410", equipment: "Dry van", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 88 },
  { name: "Barre Granite Haulers", city: "Barre", dot: "9691285", equipment: "Power only", trucks: 1, status: "WARNING" as CarrierStatus, score: 61 },
  { name: "Burlington Bay Trucking", city: "Burlington", dot: "9655719", equipment: "Reefer", trucks: 2, status: "INACTIVE" as CarrierStatus, score: 41 },
];
