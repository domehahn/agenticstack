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
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Series
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {articles.length} parts, read in order.
        </p>
      </header>
      <ol className="mt-8 flex flex-col gap-6">
        {articles.map((article, index) => (
          <li key={article.slug} className="flex gap-4 border-b border-border pb-6">
            <span className="font-mono text-sm text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <Link
                href={`/blog/${article.slug}`}
                className="font-medium hover:text-accent"
              >
                {article.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                {article.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
