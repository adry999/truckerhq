export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; text: string };

export type GuideSection = {
  heading: string;
  blocks: GuideBlock[];
};

export type GuideSource = { label: string; url: string };

export type GuideBodyData = {
  /** 2-3 sentence direct answer, shown first. */
  summary: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  sources: GuideSource[];
  /** "draft" renders only outside production; flip to "approved" after client review. */
  reviewStatus: "draft" | "approved";
};
