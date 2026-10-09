export type CarrierStatus = "ACTIVE" | "WARNING" | "INACTIVE";

export type StateCarrierRow = {
  name: string;
  city: string;
  dot: string;
  equipment: string;
  trucks: number;
  status: CarrierStatus;
  score: number;
};

export type Carrier = {
  slug: string;
  name: string;
  city: string;
  st: string;
  dot: string;
  mc: string;
  trucks: number;
  drivers: number;
  status: CarrierStatus;
  score: number;
  ageMonths: number;
  insurance: "ok" | "soon" | "none";
  insuranceDate: string;
  inspections: number;
  oosVehicle: number;
  oosDriver: number;
  crashes: number;
  equipment: string;
};

export const CARRIERS: Carrier[] = [
  { slug: "carpathian-freight-3412897", name: "Carpathian Freight LLC", city: "Des Plaines", st: "IL", dot: "3412897", mc: "MC 1182044", trucks: 4, drivers: 5, status: "ACTIVE", score: 91, ageMonths: 38, insurance: "ok", insuranceDate: "Mar 14, 2027", inspections: 22, oosVehicle: 9.1, oosDriver: 2.0, crashes: 0, equipment: "Dry van, Reefer" },
  { slug: "moldova-express-3890122", name: "Moldova Express Inc", city: "Sacramento", st: "CA", dot: "3890122", mc: "MC 1420876", trucks: 2, drivers: 2, status: "WARNING", score: 68, ageMonths: 5, insurance: "soon", insuranceDate: "Oct 12, 2026", inspections: 4, oosVehicle: 25.0, oosDriver: 0, crashes: 0, equipment: "Reefer" },
  { slug: "volga-line-transport-2987410", name: "Volga Line Transport", city: "Houston", st: "TX", dot: "2987410", mc: "MC 1003318", trucks: 7, drivers: 8, status: "ACTIVE", score: 84, ageMonths: 61, insurance: "ok", insuranceDate: "Jan 02, 2027", inspections: 41, oosVehicle: 17.1, oosDriver: 2.4, crashes: 1, equipment: "Dry van, Flatbed" },
  { slug: "danube-road-corp-3561209", name: "Danube Road Corp", city: "Charlotte", st: "NC", dot: "3561209", mc: "MC 1256910", trucks: 1, drivers: 1, status: "INACTIVE", score: 37, ageMonths: 26, insurance: "none", insuranceDate: "Lapsed Jul 30, 2026", inspections: 9, oosVehicle: 33.3, oosDriver: 11.1, crashes: 1, equipment: "Dry van" },
  { slug: "iron-horse-hauling-4012653", name: "Iron Horse Hauling", city: "Phoenix", st: "AZ", dot: "4012653", mc: "MC 1511240", trucks: 3, drivers: 3, status: "ACTIVE", score: 79, ageMonths: 14, insurance: "ok", insuranceDate: "Feb 20, 2027", inspections: 11, oosVehicle: 18.2, oosDriver: 0, crashes: 0, equipment: "Power only" },
  { slug: "lone-star-freightways-3702281", name: "Lone Star Freightways", city: "Dallas", st: "TX", dot: "3702281", mc: "MC 1333590", trucks: 9, drivers: 11, status: "ACTIVE", score: 88, ageMonths: 44, insurance: "ok", insuranceDate: "May 08, 2027", inspections: 57, oosVehicle: 12.3, oosDriver: 1.8, crashes: 1, equipment: "Reefer, Dry van" },
  { slug: "dniester-freight-4120077", name: "Dniester Freight LLC", city: "Jacksonville", st: "FL", dot: "4120077", mc: "MC 1560932", trucks: 1, drivers: 1, status: "ACTIVE", score: 72, ageMonths: 3, insurance: "ok", insuranceDate: "Jun 30, 2027", inspections: 1, oosVehicle: 0, oosDriver: 0, crashes: 0, equipment: "Box truck" },
  { slug: "red-river-freight-3198845", name: "Red River Freight Co", city: "Tulsa", st: "OK", dot: "3198845", mc: "MC 1102467", trucks: 2, drivers: 2, status: "WARNING", score: 58, ageMonths: 52, insurance: "soon", insuranceDate: "Oct 04, 2026", inspections: 15, oosVehicle: 26.7, oosDriver: 6.7, crashes: 2, equipment: "Flatbed" },
];

export function findCarrier(slug: string): Carrier | undefined {
  return CARRIERS.find((c) => c.slug === slug);
}

export const STATUS_COLORS: Record<CarrierStatus, { bg: string; fg: string; dot: string }> = {
  ACTIVE: { bg: "#E2F0E8", fg: "#0E5C3A", dot: "#0E5C3A" },
  WARNING: { bg: "#FFF1CC", fg: "#7A5300", dot: "#F2A900" },
  INACTIVE: { bg: "#FBE9E7", fg: "#B42318", dot: "#B42318" },
};

export type JobType = "OTR" | "REGIONAL" | "LOCAL" | "TEAM" | "OWNER-OP";

export type Job = {
  slug: string;
  title: string;
  company: string;
  carrierSlug: string;
  loc: string;
  type: JobType;
  equipment: string;
  home: string;
  pay: string;
  payNote: string;
  posted: string;
  experience: string;
  russian: boolean;
  milesPerWeek: string;
};

export const JOBS: Job[] = [
  { slug: "otr-company-driver-carpathian", title: "OTR Company Driver", company: "Carpathian Freight LLC", carrierSlug: "carpathian-freight-3412897", loc: "Des Plaines, IL", type: "OTR", equipment: "Dry van", home: "Home every 2 wks", pay: "$0.70/mi", payNote: "$1,700–2,100 / week", posted: "Today", experience: "1+ yr", russian: true, milesPerWeek: "2,500–3,000" },
  { slug: "regional-reefer-driver-lone-star", title: "Regional Reefer Driver", company: "Lone Star Freightways", carrierSlug: "lone-star-freightways-3702281", loc: "Dallas, TX", type: "REGIONAL", equipment: "Reefer", home: "Home weekly", pay: "$1,800/wk", payNote: "guaranteed", posted: "Today", experience: "2+ yrs", russian: false, milesPerWeek: "2,200" },
  { slug: "team-drivers-iron-horse", title: "Team Drivers", company: "Iron Horse Hauling", carrierSlug: "iron-horse-hauling-4012653", loc: "Phoenix, AZ", type: "TEAM", equipment: "Dry van", home: "3 wks out / 1 home", pay: "$0.90/mi", payNote: "split, 5,000+ mi/wk", posted: "1 day ago", experience: "1+ yr", russian: false, milesPerWeek: "5,000–6,000" },
  { slug: "local-flatbed-driver-bluebonnet", title: "Local Flatbed Driver", company: "Bluebonnet Carriers LLC", carrierSlug: "lone-star-freightways-3702281", loc: "San Antonio, TX", type: "LOCAL", equipment: "Flatbed", home: "Home daily", pay: "$28/hr", payNote: "overtime after 40", posted: "2 days ago", experience: "2+ yrs", russian: false, milesPerWeek: "Local" },
  { slug: "owner-operator-power-only-volga", title: "Owner-Operator, Power Only", company: "Volga Line Transport", carrierSlug: "volga-line-transport-2987410", loc: "Houston, TX", type: "OWNER-OP", equipment: "Power only", home: "You choose", pay: "88%", payNote: "of every load", posted: "2 days ago", experience: "2+ yrs", russian: true, milesPerWeek: "Your call" },
  { slug: "otr-reefer-solo-moldova", title: "OTR Reefer, Solo", company: "Moldova Express Inc", carrierSlug: "moldova-express-3890122", loc: "Sacramento, CA", type: "OTR", equipment: "Reefer", home: "Home every 3 wks", pay: "$0.72/mi", payNote: "$1,800–2,200 / week", posted: "3 days ago", experience: "1+ yr", russian: true, milesPerWeek: "2,800" },
  { slug: "regional-dry-van-laredo", title: "Regional Dry Van", company: "Laredo Border Express", carrierSlug: "volga-line-transport-2987410", loc: "Laredo, TX", type: "REGIONAL", equipment: "Dry van", home: "Home weekends", pay: "$0.65/mi", payNote: "$1,500–1,800 / week", posted: "4 days ago", experience: "6+ mo", russian: false, milesPerWeek: "2,300" },
];

export function findJob(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug);
}

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
