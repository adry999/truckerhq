import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const MASSACHUSETTS_CARRIERS: StateCarrierRow[] = [
  { name: "Bay State Freight Lines", city: "Boston", dot: "7612048", equipment: "Dry van", trucks: 9, status: "ACTIVE" as CarrierStatus, score: 90 },
  { name: "Worcester Crosstown Carriers", city: "Worcester", dot: "7634971", equipment: "Dry van", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 86 },
  { name: "Volga Line Transport New England", city: "Springfield", dot: "7658302", equipment: "Reefer", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 80 },
  { name: "Port of Boston Logistics", city: "Boston", dot: "7621459", equipment: "Power only", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 76 },
  { name: "Merrimack Valley Trucking", city: "Lowell", dot: "7647215", equipment: "Dry van", trucks: 5, status: "WARNING" as CarrierStatus, score: 62 },
  { name: "Cambridge Turnpike Haulers", city: "Cambridge", dot: "7609834", equipment: "Dry van", trucks: 2, status: "ACTIVE" as CarrierStatus, score: 73 },
  { name: "Odessa Coastal Freight", city: "New Bedford", dot: "7663527", equipment: "Reefer", trucks: 1, status: "ACTIVE" as CarrierStatus, score: 71 },
  { name: "Whaling City Flatbed Co", city: "New Bedford", dot: "7691086", equipment: "Flatbed", trucks: 3, status: "INACTIVE" as CarrierStatus, score: 44 },
];
