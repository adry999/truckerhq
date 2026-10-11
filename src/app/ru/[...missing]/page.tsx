import { notFound } from "next/navigation";

// Unmatched /ru/... URLs never reach a segment's not-found.tsx (they fall to
// global-not-found.tsx, which is English). This catch-all calls notFound()
// inside the ru layout so they get ru/not-found.tsx instead.
export default function MissingRuPage(): never {
  notFound();
}
