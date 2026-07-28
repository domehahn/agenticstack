import { TagList } from "@/components/blog/tag-list";
import { TopicBadge } from "@/components/blog/topic-badge";
import { formatDate } from "@/lib/utils/dates";
import type { Article } from "@/types/content";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {article.topics.map((topic) => (
          <TopicBadge key={topic.slug} topic={topic} />
        ))}
      </div>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {article.description}
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        <span>{article.author.name}</span>
        <span aria-hidden="true"> · </span>
        <span>{article.readingTime}</span>
        <span aria-hidden="true"> · </span>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        {article.updated && article.updated !== article.date && (
          <>
            <span aria-hidden="true"> · </span>
            <span>
              Updated{" "}
              <time dateTime={article.updated}>
                {formatDate(article.updated)}
              </time>
            </span>
          </>
        )}
      </p>
      {article.tags.length > 0 && (
        <div className="mt-4">
          <TagList tags={article.tags} />
        </div>
      )}
    </header>
  );
}
