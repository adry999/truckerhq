import type { StateCarrierRow } from "@/lib/data";

export const MICHIGAN_CARRIERS: StateCarrierRow[] = [
  { name: "Motor City Freight Lines", city: "Detroit", dot: "7712045", equipment: "Dry van", trucks: 10, status: "ACTIVE", score: 91 },
  { name: "Volga Line Transport MI", city: "Warren", dot: "7734981", equipment: "Dry van", trucks: 5, status: "ACTIVE", score: 83 },
  { name: "Grand River Logistics", city: "Grand Rapids", dot: "7756203", equipment: "Flatbed", trucks: 7, status: "ACTIVE", score: 78 },
  { name: "Wolverine Auto Haulers", city: "Sterling Heights", dot: "7768419", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 85 },
  { name: "Ann Arbor Dry Freight Co", city: "Ann Arbor", dot: "7723567", equipment: "Dry van", trucks: 3, status: "WARNING", score: 62 },
  { name: "Capitol Lansing Carriers", city: "Lansing", dot: "7789102", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 74 },
  { name: "Dnieper Cartage Michigan", city: "Detroit", dot: "7701358", equipment: "Dry van", trucks: 6, status: "INACTIVE", score: 38 },
  { name: "Great Lakes Reefer Lines", city: "Grand Rapids", dot: "7745726", equipment: "Reefer", trucks: 9, status: "ACTIVE", score: 88 },
];
