import type { StateCarrierRow } from "@/lib/data";

export const OHIO_CARRIERS: StateCarrierRow[] = [
  { name: "Buckeye Freight Solutions", city: "Columbus", dot: "5601234", equipment: "Dry van", trucks: 8, status: "ACTIVE", score: 85 },
  { name: "Carpathian Steel Haulers", city: "Cleveland", dot: "5612456", equipment: "Flatbed", trucks: 5, status: "ACTIVE", score: 79 },
  { name: "Queen City Logistics", city: "Cincinnati", dot: "5623789", equipment: "Dry van", trucks: 10, status: "ACTIVE", score: 91 },
  { name: "Dnipro Transport LLC", city: "Toledo", dot: "5634012", equipment: "Reefer", trucks: 3, status: "ACTIVE", score: 74 },
  { name: "Miami Valley Carriers", city: "Dayton", dot: "5645678", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 72 },
  { name: "Rust Belt Flatbed Co", city: "Akron", dot: "5656901", equipment: "Flatbed", trucks: 4, status: "WARNING", score: 61 },
  { name: "Tisza Line Express", city: "Columbus", dot: "5667234", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 88 },
  { name: "Great Lakes Reefer Inc", city: "Cleveland", dot: "5678567", equipment: "Reefer", trucks: 1, status: "INACTIVE", score: 35 },
];
