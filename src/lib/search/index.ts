import { getAllArticles } from "@/lib/content/articles";
import type { SearchDocument } from "@/lib/search/types";

export type { SearchDocument } from "@/lib/search/types";
export { searchDocuments } from "@/lib/search/query";

export function buildSearchIndex(): SearchDocument[] {
  return getAllArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    topics: article.topics.map((t) => t.name),
    tags: article.tags,
  }));
}
