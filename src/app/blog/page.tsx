import { ArticleList } from "@/components/blog/article-list";
import { Container } from "@/components/shared/container";
import { getAllArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Blog",
  description: "All articles on agentic engineering, DevSecOps, and platform engineering.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl border-b border-border pb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Blog
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {articles.length} articles on agentic engineering, DevSecOps, and
          the systems underneath both.
        </p>
      </header>
      <div className="mt-4">
        <ArticleList articles={articles} />
      </div>
    </Container>
  );
}
