import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const TEXAS_CARRIERS: StateCarrierRow[] = [
  { name: "Lone Star Freightways", city: "Dallas", dot: "3702281", equipment: "Reefer", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Volga Line Transport", city: "Houston", dot: "2987410", equipment: "Dry van", trucks: 7, status: "ACTIVE", score: 84 },
  { name: "Bluebonnet Carriers LLC", city: "San Antonio", dot: "3844019", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 81 },
  { name: "Gulf Coast Haulers", city: "Houston", dot: "3309762", equipment: "Dry van", trucks: 2, status: "WARNING", score: 66 },
  { name: "Laredo Border Express", city: "Laredo", dot: "3990514", equipment: "Dry van", trucks: 12, status: "ACTIVE", score: 77 },
  { name: "Prut River Trucking", city: "Fort Worth", dot: "4108833", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 71 },
  { name: "Big Bend Transport Co", city: "El Paso", dot: "3122690", equipment: "Flatbed", trucks: 5, status: "INACTIVE", score: 42 },
  { name: "Alamo Reefer Lines", city: "San Antonio", dot: "3655127", equipment: "Reefer", trucks: 4, status: "WARNING", score: 63 },
];
