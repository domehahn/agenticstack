import Link from "next/link";

import { Container } from "@/components/shared/container";
import { buildSearchIndex, searchDocuments } from "@/lib/search";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Search",
  description: "Search articles by title, description, topic, or tag.",
  path: "/search",
  noIndex: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? searchDocuments(buildSearchIndex(), q) : [];

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Search
        </h1>
        <form action="/search" method="get" className="mt-5">
          <label htmlFor="q" className="sr-only">
            Search articles
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search articles, topics, tags…"
            className="w-full max-w-md rounded-md border border-border bg-background px-4 py-2 text-sm outline-none focus-visible:border-accent"
          />
        </form>
        <p className="mt-3 text-xs text-muted-foreground">
          Tip: press <kbd className="rounded border border-border px-1 py-0.5 font-mono">/</kbd>{" "}
          or <kbd className="rounded border border-border px-1 py-0.5 font-mono">⌘K</kbd> anywhere
          to search without leaving the page.
        </p>
      </header>

      <div className="mt-8">
        {!q && (
          <p className="text-sm text-muted-foreground">
            Enter a search term above to find articles.
          </p>
        )}
        {q && results.length === 0 && (
          <p className="border-y border-border py-12 text-center text-sm text-muted-foreground">
            No articles match &ldquo;{q}&rdquo;.
          </p>
        )}
        {results.length > 0 && (
          <ul>
            {results.map((doc) => (
              <li key={doc.slug} className="border-b border-border py-6 first:pt-0">
                <Link
                  href={`/blog/${doc.slug}`}
                  className="text-lg font-medium hover:text-accent"
                >
                  {doc.title}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {doc.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
