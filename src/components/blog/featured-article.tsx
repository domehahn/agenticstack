import Link from "next/link";

import { ArticleMeta } from "@/components/blog/article-meta";
import { TopicBadge } from "@/components/blog/topic-badge";
import type { ArticleSummary } from "@/types/content";

export function FeaturedArticle({ article }: { article: ArticleSummary }) {
  return (
    <article className="border-b border-border pb-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Featured
      </p>
      {article.topics[0] && (
        <TopicBadge topic={article.topics[0]} className="mb-3" />
      )}
      <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        <Link href={`/blog/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h2>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        {article.description}
      </p>
      <ArticleMeta article={article} className="mt-5" />
    </article>
  );
}
