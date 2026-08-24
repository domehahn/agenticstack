import Link from "next/link";

import { Container } from "@/components/shared/container";
import { getAllSeriesSummaries } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Series",
  description: "Multi-part article series.",
  path: "/series",
});

export default function SeriesIndexPage() {
  const series = getAllSeriesSummaries();

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Series
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Multi-part articles meant to be read in order.
        </p>
      </header>
      {series.length === 0 ? (
        <p className="mt-12 border-y border-border py-12 text-center text-sm text-muted-foreground">
          No series published yet.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {series.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/series/${s.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border p-6 transition-colors hover:border-accent/40 hover:bg-surface"
              >
                <div>
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                    Serie
                  </span>
                  <h2 className="mt-3 text-lg font-semibold group-hover:text-accent">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.count} {s.count === 1 ? "Teil" : "Teile"}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
