import Link from "next/link";

import type { ArticleSummary } from "@/types/content";

export function RelatedArticles({ articles }: { articles: ArticleSummary[] }) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2
        id="related-heading"
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Related articles
      </h2>
      <ul className="mt-4 grid gap-6 sm:grid-cols-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/blog/${article.slug}`} className="group">
              <p className="text-sm font-medium leading-snug group-hover:text-accent">
                {article.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {article.readingTime}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
