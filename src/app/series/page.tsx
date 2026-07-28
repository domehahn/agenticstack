import Link from "next/link";

import { Container } from "@/components/shared/container";
import { getAllSeriesSlugs, getSeriesArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Series",
  description: "Multi-part article series.",
  path: "/series",
});

export default function SeriesIndexPage() {
  const series = getAllSeriesSlugs()
    .map((slug) => {
      const articles = getSeriesArticles(slug);
      return { slug, title: articles[0]?.series?.title ?? slug, articles };
    })
    .filter((s) => s.articles.length > 0);

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
        <ul className="mt-8 flex flex-col gap-8">
          {series.map((s) => (
            <li key={s.slug} className="border-b border-border pb-8">
              <Link href={`/series/${s.slug}`} className="group">
                <h2 className="text-lg font-semibold group-hover:text-accent">
                  {s.title}
                </h2>
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                {s.articles.length} parts
              </p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
