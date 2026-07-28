import { notFound } from "next/navigation";

import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleNavigation } from "@/components/blog/article-navigation";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { RelatedArticles } from "@/components/blog/related-articles";
import { SeriesNavigation } from "@/components/blog/series-navigation";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Container } from "@/components/shared/container";
import { ArticleContent } from "@/lib/content/mdx";
import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  getSeriesArticles,
} from "@/lib/content/articles";
import { extractToc } from "@/lib/content/toc";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
    authors: [article.author.name],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const toc = extractToc(article.content);
  const related = getRelatedArticles(article);
  const { previous, next } = getAdjacentArticles(article.slug);
  const seriesArticles = article.series
    ? getSeriesArticles(article.series.slug)
    : [];

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Blog", path: "/blog" },
              { name: article.title, path: `/blog/${article.slug}` },
            ]),
          ),
        }}
      />
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <article id="article-body">
            <ArticleHeader article={article} />

            {toc.length > 0 && (
              <details className="not-prose mb-8 rounded-md border border-border p-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-medium">
                  Table of contents
                </summary>
                <div className="mt-4">
                  <TableOfContents entries={toc} />
                </div>
              </details>
            )}

            <div className="prose prose-article">
              <ArticleContent source={article.content} />
            </div>

            {article.series && seriesArticles.length > 1 && (
              <SeriesNavigation
                seriesTitle={article.series.title}
                articles={seriesArticles}
                currentSlug={article.slug}
              />
            )}

            <ArticleNavigation previous={previous} next={next} />
            <RelatedArticles articles={related} />
          </article>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents entries={toc} />
              </div>
            </aside>
          )}
        </div>
      </Container>
    </>
  );
}
