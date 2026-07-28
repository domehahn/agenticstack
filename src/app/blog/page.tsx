import { notFound } from "next/navigation";

import { ArticleList } from "@/components/blog/article-list";
import { Pagination } from "@/components/blog/pagination";
import { Container } from "@/components/shared/container";
import { getAllArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

const PAGE_SIZE = 20;

export const metadata = buildMetadata({
  title: "Blog",
  description: "All articles on agentic engineering, DevSecOps, and platform engineering.",
  path: "/blog",
});

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = pageParam ? Number(pageParam) : 1;

  const allArticles = getAllArticles();
  const totalPages = Math.max(1, Math.ceil(allArticles.length / PAGE_SIZE));

  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound();

  const articles = allArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Blog
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {allArticles.length} articles on agentic engineering, DevSecOps, and
          the systems underneath both.
        </p>
      </header>
      <div className="mt-4">
        <ArticleList articles={articles} />
      </div>
      <Pagination basePath="/blog" currentPage={page} totalPages={totalPages} />
    </Container>
  );
}
