import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleList } from "@/components/blog/article-list";
import { Container } from "@/components/shared/container";
import { getTopicBySlug, topics } from "@/config/topics";
import { getArticlesByTopic } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  if (!topic) return {};

  return buildMetadata({
    title: topic.name,
    description: topic.description,
    path: `/topics/${topic.slug}`,
  });
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  if (!topic) notFound();

  const articles = getArticlesByTopic(topic.slug);
  const relatedTopics = topics.filter((t) => t.slug !== topic.slug).slice(0, 3);

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Topic
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {topic.name}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {topic.description}
        </p>
      </header>
      <div className="mt-4">
        <ArticleList
          articles={articles}
          emptyMessage={`No articles published under ${topic.name} yet.`}
        />
      </div>
      {relatedTopics.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Related topics
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {relatedTopics.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/topics/${t.slug}`}
                  className="rounded-full border border-border px-3 py-1 text-sm hover:border-accent hover:text-accent"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
