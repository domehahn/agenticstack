import { ImageResponse } from "next/og";

import { getAllArticles, getArticleBySlug } from "@/lib/content/articles";
import { OgImage, ogImageContentType, ogImageSize } from "@/lib/seo/og-image";
import { formatDate } from "@/lib/utils/dates";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const dynamic = "force-static";

export function generateStaticParams() {
  const articles = getAllArticles();
  // A dynamic route with zero generated params breaks `output: export`
  // (long-standing, still-open Next.js bug — vercel/next.js#61213,
  // vercel/next.js#71862). Rendering the "Article not found" fallback image
  // for a placeholder slug is harmless — nothing links to it.
  if (articles.length === 0) return [{ slug: "__none__" }];
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  return new ImageResponse(
    (
      <OgImage
        eyebrow={article?.topics[0]?.name}
        title={article?.title ?? "Article not found"}
        footer={
          article
            ? `${article.author.name} · ${formatDate(article.date)} · ${article.readingTime}`
            : undefined
        }
      />
    ),
    { ...size },
  );
}
