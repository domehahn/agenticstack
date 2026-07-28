import Link from "next/link";

import { ArticleMeta } from "@/components/blog/article-meta";
import { TopicBadge } from "@/components/blog/topic-badge";
import type { ArticleSummary } from "@/types/content";

export function ArticleListItem({ article }: { article: ArticleSummary }) {
  return (
    <article className="border-b border-border py-8 first:pt-0 last:border-none">
      {article.topics[0] && (
        <TopicBadge topic={article.topics[0]} className="mb-2" />
      )}
      <h3 className="text-xl font-semibold leading-snug">
        <Link
          href={`/blog/${article.slug}`}
          className="hover:text-accent"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {article.description}
      </p>
      <ArticleMeta article={article} className="mt-3" />
    </article>
  );
}
