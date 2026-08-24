import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { getAllSeriesSlugs, getSeriesArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  const slugs = getAllSeriesSlugs();
  // A dynamic route with zero generated params breaks `output: export`
  // (long-standing, still-open Next.js bug — vercel/next.js#61213,
  // vercel/next.js#71862). Placeholder param + notFound() below is the
  // community-endorsed workaround: generates one harmless static 404 page
  // instead of failing the entire build when there are no series yet.
  if (slugs.length === 0) return [{ series: "__none__" }];
  return slugs.map((series) => ({ series }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ series: string }>;
}) {
  const { series: seriesSlug } = await params;
  const articles = getSeriesArticles(seriesSlug);
  const title = articles[0]?.series?.title;
  if (!title) return {};

  return buildMetadata({
    title,
    description: `${articles.length}-part series: ${title}.`,
    path: `/series/${seriesSlug}`,
  });
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ series: string }>;
}) {
  const { series: seriesSlug } = await params;
  const articles = getSeriesArticles(seriesSlug);
  if (articles.length === 0) notFound();

  const title = articles[0].series?.title ?? seriesSlug;

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
          Serie
        </span>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {articles.length} Teile, in Reihenfolge zu lesen.
        </p>
      </header>
      <ol className="mt-8 flex flex-col gap-4">
        {articles.map((article, index) => (
          <li key={article.slug}>
            <Link
              href={`/blog/${article.slug}`}
              className="group flex gap-4 rounded-2xl border border-border p-6 transition-colors hover:border-accent/40 hover:bg-surface"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-xs text-muted-foreground">
                {index + 1}
              </span>
              <div>
                <p className="font-medium group-hover:text-accent">
                  {article.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {article.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  );
}
