import { notFound } from "next/navigation";

import { ArticleList } from "@/components/blog/article-list";
import { Container } from "@/components/shared/container";
import { getAllTags, getArticlesByTagSlug } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  const tags = getAllTags();
  // A dynamic route with zero generated params breaks `output: export`
  // (long-standing, still-open Next.js bug — vercel/next.js#61213,
  // vercel/next.js#71862). Placeholder param + notFound() below is the
  // community-endorsed workaround.
  if (tags.length === 0) return [{ tag: "__none__" }];
  return tags.map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: tagSlug } = await params;
  const knownTag = getAllTags().find((t) => t.slug === tagSlug);
  if (!knownTag) return {};

  return buildMetadata({
    title: `#${knownTag.tag}`,
    description: `Articles tagged with ${knownTag.tag}.`,
    path: `/tags/${knownTag.slug}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: tagSlug } = await params;
  const knownTag = getAllTags().find((t) => t.slug === tagSlug);
  if (!knownTag) notFound();

  const articles = getArticlesByTagSlug(tagSlug);

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
