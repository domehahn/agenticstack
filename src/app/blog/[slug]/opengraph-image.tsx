import { ImageResponse } from "next/og";

import { getArticleBySlug } from "@/lib/content/articles";
import { OgImage, ogImageContentType, ogImageSize } from "@/lib/seo/og-image";
import { formatDate } from "@/lib/utils/dates";

export const size = ogImageSize;
export const contentType = ogImageContentType;

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
