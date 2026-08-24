import Link from "next/link";

import { ArticleMeta } from "@/components/blog/article-meta";
import { TopicBadge } from "@/components/blog/topic-badge";
import type { ArticleSummary } from "@/types/content";

export function ArticleListItem({ article }: { article: ArticleSummary }) {
  return (
    <article className="group rounded-2xl border border-border p-6 transition-colors hover:border-accent/40 hover:bg-surface">
      {article.topics[0] && (
        <TopicBadge topic={article.topics[0]} className="mb-3" />
      )}
      <h3 className="text-xl font-semibold leading-snug">
        <Link href={`/blog/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {article.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ArticleMeta article={article} />
        <Link
          href={`/blog/${article.slug}`}
          className="text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5"
        >
          Weiterlesen →
        </Link>
      </div>
    </article>
  );
}
