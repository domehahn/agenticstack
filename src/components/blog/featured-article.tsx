import Link from "next/link";

import { ArticleMeta } from "@/components/blog/article-meta";
import { TopicBadge } from "@/components/blog/topic-badge";
import type { ArticleSummary } from "@/types/content";

export function FeaturedArticle({ article }: { article: ArticleSummary }) {
  return (
    <article className="group rounded-2xl border border-border bg-surface-elevated p-8">
      <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
        Featured
      </span>
      {article.topics[0] && (
        <TopicBadge topic={article.topics[0]} className="ml-2" />
      )}
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        <Link href={`/blog/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h2>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        {article.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
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
