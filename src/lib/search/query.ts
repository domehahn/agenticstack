import type { SearchDocument } from "@/lib/search/types";

export function searchDocuments(
  documents: SearchDocument[],
  query: string,
): SearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = documents.map((doc) => {
    const haystacks: [string, number][] = [
      [doc.title.toLowerCase(), 3],
      [doc.description.toLowerCase(), 1],
      [doc.topics.join(" ").toLowerCase(), 2],
      [doc.tags.join(" ").toLowerCase(), 2],
    ];

    let score = 0;
    for (const [text, weight] of haystacks) {
      if (text.includes(q)) {
        score += weight;
        if (text.startsWith(q)) score += weight;
      }
    }
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.doc);
}
