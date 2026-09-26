export type CityDirectoryEntry = {
  name: string;
  slug: string;
  count: string;
};

// count mirrors each city page's own "Open jobs" stat.
export const CITY_DIRECTORY: CityDirectoryEntry[] = [
  { name: "Chicago, IL", slug: "chicago-il", count: "148" },
  { name: "Dallas, TX", slug: "dallas-tx", count: "210" },
  { name: "Houston, TX", slug: "houston-tx", count: "195" },
  { name: "Atlanta, GA", slug: "atlanta-ga", count: "225" },
  { name: "Los Angeles, CA", slug: "los-angeles-ca", count: "340" },
  { name: "Phoenix, AZ", slug: "phoenix-az", count: "165" },
  { name: "Charlotte, NC", slug: "charlotte-nc", count: "155" },
  { name: "Columbus, OH", slug: "columbus-oh", count: "140" },
  { name: "Memphis, TN", slug: "memphis-tn", count: "175" },
  { name: "Indianapolis, IN", slug: "indianapolis-in", count: "150" },
  { name: "Louisville, KY", slug: "louisville-ky", count: "130" },
];
