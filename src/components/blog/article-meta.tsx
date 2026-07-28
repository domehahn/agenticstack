import type { ArticleSummary } from "@/types/content";
import { formatDate } from "@/lib/utils/dates";

export function ArticleMeta({
  article,
  className,
}: {
  article: Pick<ArticleSummary, "author" | "date" | "readingTime">;
  className?: string;
}) {
  return (
    <p className={`text-sm text-muted-foreground ${className ?? ""}`}>
      <span>{article.author.name}</span>
      <span aria-hidden="true"> · </span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden="true"> · </span>
      <span>{article.readingTime}</span>
    </p>
  );
}
