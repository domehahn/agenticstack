export type AnalyticsEvent =
  | { name: "article_read"; properties: { slug: string; topic?: string } }
  | { name: "search_opened" }
  | { name: "search_query"; properties: { query: string; resultCount: number } }
  | { name: "code_copied"; properties?: { slug?: string } }
  | { name: "theme_changed"; properties: { theme: string } };
