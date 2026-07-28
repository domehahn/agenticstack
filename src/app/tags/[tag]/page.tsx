import { notFound } from "next/navigation";

import { ArticleList } from "@/components/blog/article-list";
import { Container } from "@/components/shared/container";
import { getAllTags, getArticlesByTag } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return buildMetadata({
    title: `#${tag}`,
    description: `Articles tagged with ${tag}.`,
    path: `/tags/${tag}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const articles = getArticlesByTag(tag);
  const knownTag = getAllTags().find(
    (t) => t.tag.toLowerCase() === tag.toLowerCase(),
  );
  if (!knownTag) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Tag
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          #{knownTag.tag}
        </h1>
      </header>
      <div className="mt-4">
        <ArticleList
          articles={articles}
          emptyMessage={`No articles tagged "${knownTag.tag}" yet.`}
        />
      </div>
    </Container>
  );
}
