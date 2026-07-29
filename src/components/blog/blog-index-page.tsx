import { notFound } from "next/navigation";

import { ArticleList } from "@/components/blog/article-list";
import { Pagination } from "@/components/blog/pagination";
import { Container } from "@/components/shared/container";
import {
  BLOG_PAGE_SIZE,
  getAllArticles,
  getBlogTotalPages,
} from "@/lib/content/articles";

export function BlogIndexPage({ page }: { page: number }) {
  const allArticles = getAllArticles();
  const totalPages = getBlogTotalPages();

  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound();

  const articles = allArticles.slice(
    (page - 1) * BLOG_PAGE_SIZE,
    page * BLOG_PAGE_SIZE,
  );

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
