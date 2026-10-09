/** Normalizes a US phone number to E.164, or null if it isn't a valid NANP number. */
export function toUsE164(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (national.length !== 10) return null;
  if (/[01]/.test(national[0]!) || /[01]/.test(national[3]!)) return null;
  return `+1${national}`;
}
