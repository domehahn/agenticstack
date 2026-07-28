import { ArticleListItem } from "@/components/blog/article-list-item";
import type { ArticleSummary } from "@/types/content";

export function ArticleList({
  articles,
  emptyMessage = "No articles here yet.",
}: {
  articles: ArticleSummary[];
  emptyMessage?: string;
}) {
  if (articles.length === 0) {
    return (
      <p className="border-y border-border py-12 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticleListItem key={article.slug} article={article} />
      ))}
    </div>
  );
}
