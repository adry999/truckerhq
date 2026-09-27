import type { StateCarrierRow } from "@/lib/data";

export const VIRGINIA_CARRIERS: StateCarrierRow[] = [
  { name: "Tidewater Dry Van Logistics", city: "Norfolk", dot: "9712340", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Chesapeake Bay Freight Co", city: "Chesapeake", dot: "9734521", equipment: "Reefer", trucks: 6, status: "ACTIVE", score: 82 },
  { name: "Volga Line Transport VA", city: "Alexandria", dot: "9756789", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 79 },
  { name: "Port of Virginia Carriers", city: "Norfolk", dot: "9723456", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 91 },
  { name: "Richmond Capital Trucking", city: "Richmond", dot: "9745612", equipment: "Dry van", trucks: 12, status: "ACTIVE", score: 85 },
  { name: "Virginia Beach Freight Lines", city: "Virginia Beach", dot: "9767890", equipment: "Power only", trucks: 1, status: "WARNING", score: 61 },
  { name: "Newport News Shipping Transport", city: "Newport News", dot: "9778901", equipment: "Dry van", trucks: 2, status: "INACTIVE", score: 42 },
  { name: "Dnister Freight Solutions", city: "Alexandria", dot: "9789012", equipment: "Dry van", trucks: 7, status: "ACTIVE", score: 76 },
];
