// Non-US NANP area codes (Canada, Bermuda, Caribbean) are blocked: texting them
// is billed at international rates and is the usual target of SMS pumping / toll fraud.
const NON_US_NANP_AREA_CODES = new Set([
  // Canada
  "204",
  "226",
  "236",
  "249",
  "250",
  "263",
  "289",
  "306",
  "343",
  "354",
  "365",
  "367",
  "368",
  "382",
  "387",
  "403",
  "416",
  "418",
  "428",
  "431",
  "437",
  "438",
  "450",
  "460",
  "468",
  "474",
  "506",
  "514",
  "519",
  "548",
  "579",
  "581",
  "584",
  "587",
  "600",
  "604",
  "613",
  "622",
  "639",
  "647",
  "672",
  "683",
  "705",
  "709",
  "742",
  "753",
  "778",
  "780",
  "782",
  "807",
  "819",
  "825",
  "867",
  "873",
  "879",
  "902",
  "905",
  "942",
  // Bermuda and the Caribbean
  "242",
  "246",
  "264",
  "268",
  "284",
  "345",
  "441",
  "473",
  "649",
  "658",
  "664",
  "721",
  "758",
  "767",
  "784",
  "809",
  "829",
  "849",
  "868",
  "869",
  "876",
]);

/**
 * Normalizes a US phone number to E.164, or null if it isn't a valid NANP number
 * or its area code belongs to Canada, Bermuda or the Caribbean. US territories
 * (PR, USVI, Guam, ...) are allowed.
 */
export function toUsE164(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  const national =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (national.length !== 10) return null;
  if (/[01]/.test(national[0]!) || /[01]/.test(national[3]!)) return null;
  if (NON_US_NANP_AREA_CODES.has(national.slice(0, 3))) return null;
  return `+1${national}`;
}
