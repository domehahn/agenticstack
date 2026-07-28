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
  return (
    <aside className="not-prose my-8 rounded-md border border-border p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Series
      </p>
      <p className="mt-1 text-base font-semibold">{seriesTitle}</p>
      <ol className="mt-4 flex flex-col gap-2">
        {articles.map((article, index) => {
          const isCurrent = article.slug === currentSlug;
          return (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "flex gap-3 rounded-md px-2 py-1.5 text-sm",
                  isCurrent
                    ? "bg-surface font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {article.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
