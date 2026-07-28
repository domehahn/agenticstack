import Link from "next/link";

import { Container } from "@/components/shared/container";
import { getTopicsWithCounts } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Topics",
  description: "Primary content domains covered by the publication.",
  path: "/topics",
});

export default function TopicsPage() {
  const topics = getTopicsWithCounts();

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Topics
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The primary domains this publication covers.
        </p>
      </header>
      <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic.slug} className="border-b border-border pb-6">
            <Link href={`/topics/${topic.slug}`} className="group block">
              <p className="text-lg font-semibold group-hover:text-accent">
                {topic.name}
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  {topic.count} {topic.count === 1 ? "article" : "articles"}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {topic.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
