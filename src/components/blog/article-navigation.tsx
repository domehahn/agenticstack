import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { ArticleSummary } from "@/types/content";

export function ArticleNavigation({
  previous,
  next,
}: {
  previous?: ArticleSummary;
  next?: ArticleSummary;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Article navigation"
      className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="group flex flex-col gap-1 rounded-md p-3 hover:bg-surface"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Previous
          </span>
          <span className="text-sm font-medium group-hover:text-accent">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end gap-1 rounded-md p-3 text-right hover:bg-surface"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
