// Public, inlined at build time. Unset in dev and staging: the widget is not
// rendered and forms submit without a token.
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
