// Static city-name -> slug map, used to link "nearby city" chips only when
// a real city page exists (avoids linking to a route that 404s).
export const CITY_NAME_TO_SLUG: Record<string, string> = {
  "Atlanta, GA": "atlanta-ga",
  "Charlotte, NC": "charlotte-nc",
  "Chicago, IL": "chicago-il",
  "Columbus, OH": "columbus-oh",
  "Dallas, TX": "dallas-tx",
  "Houston, TX": "houston-tx",
  "Indianapolis, IN": "indianapolis-in",
  "Los Angeles, CA": "los-angeles-ca",
  "Louisville, KY": "louisville-ky",
  "Memphis, TN": "memphis-tn",
  "Phoenix, AZ": "phoenix-az",
};
