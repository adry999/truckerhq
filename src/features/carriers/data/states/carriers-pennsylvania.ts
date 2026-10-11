import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const PENNSYLVANIA_CARRIERS: StateCarrierRow[] = [
  { name: "Keystone Freight Lines", city: "Harrisburg", dot: "5734182", equipment: "Dry van", trucks: 8, status: "ACTIVE", score: 87 },
  { name: "Moldova Express", city: "Philadelphia", dot: "5762940", equipment: "Dry van", trucks: 5, status: "ACTIVE", score: 82 },
  { name: "Steel City Carriers LLC", city: "Pittsburgh", dot: "5719305", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 79 },
  { name: "Lehigh Valley Logistics", city: "Allentown", dot: "5788617", equipment: "Dry van", trucks: 12, status: "ACTIVE", score: 91 },
  { name: "Volga Line Transport", city: "Scranton", dot: "5745023", equipment: "Reefer", trucks: 3, status: "WARNING", score: 61 },
  { name: "Erie Lakeshore Trucking", city: "Erie", dot: "5701488", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 74 },
  { name: "Liberty Bell Haulers", city: "Philadelphia", dot: "5793756", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 85 },
  { name: "Allegheny Ridge Transport", city: "Pittsburgh", dot: "5726841", equipment: "Flatbed", trucks: 2, status: "INACTIVE", score: 38 },
];
