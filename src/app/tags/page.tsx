import Link from "next/link";

import { Container } from "@/components/shared/container";
import { getAllTags } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Tags",
  description: "Granular concepts referenced across articles.",
  path: "/tags",
});

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Tags
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Granular concepts. For primary domains, see{" "}
          <Link href="/topics" className="underline underline-offset-4">
            Topics
          </Link>
          .
        </p>
      </header>
      {tags.length === 0 ? (
        <p className="mt-12 border-y border-border py-12 text-center text-sm text-muted-foreground">
          No tags yet — they appear once articles are published.
        </p>
      ) : (
        <ul className="mt-8 flex flex-wrap gap-3">
          {tags.map(({ tag, slug, count }) => (
            <li key={slug}>
              <Link
                href={`/tags/${slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-accent hover:text-accent"
              >
                {tag} <span className="text-muted-foreground">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
