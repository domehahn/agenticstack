import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import type { ArticleSummary } from "@/types/content";

export function SeriesNavigation({
  seriesTitle,
  articles,
  currentSlug,
}: {
  seriesTitle: string;
  articles: ArticleSummary[];
  currentSlug: string;
}) {
  const currentIndex = articles.findIndex(
    (article) => article.slug === currentSlug,
  );

  return (
    <aside className="not-prose my-10 overflow-hidden rounded-2xl border border-border bg-surface-elevated">
      <div className="border-b border-border px-6 py-5">
        <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
          Serie
        </span>
        <p className="mt-2 text-base font-semibold">{seriesTitle}</p>
        {currentIndex >= 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            Teil {currentIndex + 1} von {articles.length}
          </p>
        )}
      </div>
      <ol className="flex flex-col gap-1 p-3">
        {articles.map((article, index) => {
          const isCurrent = article.slug === currentSlug;
          return (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isCurrent
                    ? "bg-accent/10 font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px]",
                    isCurrent
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>
                <span className="leading-snug">{article.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
