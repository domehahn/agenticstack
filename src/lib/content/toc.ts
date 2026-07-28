import GithubSlugger from "github-slugger";

export type TocEntry = {
  id: string;
  title: string;
  depth: 2 | 3;
};

export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  const entries: TocEntry[] = [];

  for (const match of markdown.matchAll(headingPattern)) {
    const depth = match[1].length as 2 | 3;
    const title = match[2].trim().replace(/[#*`]/g, "");
    entries.push({ id: slugger.slug(title), title, depth });
  }

  return entries;
}
