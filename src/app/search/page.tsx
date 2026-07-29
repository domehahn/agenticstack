import { Suspense } from "react";

import { Container } from "@/components/shared/container";
import { SearchPageClient } from "@/components/search/search-page-client";
import { buildSearchIndex } from "@/lib/search";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Search",
  description: "Search articles by title, description, topic, or tag.",
  path: "/search",
  noIndex: true,
});

export default function SearchPage() {
  const searchIndex = buildSearchIndex();

  return (
    <Container className="py-12 sm:py-16">
      <Suspense>
        <SearchPageClient searchIndex={searchIndex} />
      </Suspense>
    </Container>
  );
}
