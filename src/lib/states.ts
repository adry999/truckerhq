import { STATE_CONTENT, STATE_SLUGS } from "@/lib/state-content";

export type StateDirectoryEntry = {
  name: string;
  slug: string;
  count: string;
};

export const STATE_DIRECTORY: StateDirectoryEntry[] = STATE_SLUGS.map((slug) => ({
  name: STATE_CONTENT[slug].stateName,
  slug,
  count: STATE_CONTENT[slug].totalCount,
})).sort((a, b) => a.name.localeCompare(b.name));
