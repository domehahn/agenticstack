"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { searchDocuments } from "@/lib/search/query";
import type { SearchDocument } from "@/lib/search/types";

export function SearchPageClient({
  searchIndex,
}: {
  searchIndex: SearchDocument[];
}) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const results = query ? searchDocuments(searchIndex, query) : [];

  return (
    <>
      <header className="max-w-2xl border-b border-border pb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Search
        </h1>
        <div className="mt-5">
          <label htmlFor="q" className="sr-only">
            Search articles
          </label>
          <input
            id="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, topics, tags…"
            className="w-full max-w-md rounded-md border border-border bg-background px-4 py-2 text-sm outline-none focus-visible:border-accent"
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Tip: press{" "}
          <kbd className="rounded border border-border px-1 py-0.5 font-mono">
            /
          </kbd>{" "}
          or{" "}
          <kbd className="rounded border border-border px-1 py-0.5 font-mono">
            ⌘K
          </kbd>{" "}
          anywhere to search without leaving the page.
        </p>
      </header>

      <div className="mt-8">
        {!query && (
          <p className="text-sm text-muted-foreground">
            Enter a search term above to find articles.
          </p>
        )}
        {query && results.length === 0 && (
          <p className="border-y border-border py-12 text-center text-sm text-muted-foreground">
            No articles match &ldquo;{query}&rdquo;.
          </p>
        )}
        {results.length > 0 && (
          <ul>
            {results.map((doc) => (
              <li
                key={doc.slug}
                className="border-b border-border py-6 first:pt-0"
              >
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
    </>
  );
}
