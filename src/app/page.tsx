import Link from "next/link";

import { ArticleList } from "@/components/blog/article-list";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";
import {
  getAllSeriesSummaries,
  getFeaturedArticle,
  getLatestArticles,
  getTopicsWithCounts,
} from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: `${siteConfig.title} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(6, featured?.slug);
  const topics = getTopicsWithCounts();
  const series = getAllSeriesSummaries();

  return (
    <Container className="py-12 sm:py-16">
      <section className="max-w-2xl border-b border-border pb-12">
        <p className="font-mono text-sm text-muted-foreground">
          {siteConfig.name}
        </p>
        <h1 className="mt-3 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          Engineering the agentic era.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Exploring how AI agents, DevSecOps, software architecture,
          security, platforms, and engineering methodology converge into a
          single discipline.
        </p>
      </section>

      {featured && (
        <section className="mt-12" aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="sr-only">
            Featured article
          </h2>
          <FeaturedArticle article={featured} />
        </section>
      )}

      <section className="mt-4" aria-labelledby="latest-heading">
        <div className="flex items-baseline justify-between">
          <h2
            id="latest-heading"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Latest articles
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="mt-4">
          <ArticleList articles={latest} />
        </div>
      </section>

      <section className="mt-16" aria-labelledby="topics-heading">
        <h2
          id="topics-heading"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Explore by topic
        </h2>
        <ul className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link href={`/topics/${topic.slug}`} className="group block">
                <p className="font-medium group-hover:text-accent">
                  {topic.name}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {topic.count}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {topic.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {series.length > 0 && (
        <section className="mt-16" aria-labelledby="series-heading">
          <div className="flex items-baseline justify-between">
            <h2
              id="series-heading"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Selected series
            </h2>
            <Link
              href="/series"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <ul className="mt-5 flex flex-col gap-4">
            {series.slice(0, 3).map((s) => (
              <li key={s.slug}>
                <Link href={`/series/${s.slug}`} className="group block">
                  <p className="font-medium group-hover:text-accent">
                    {s.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.count} {s.count === 1 ? "part" : "parts"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          About the publication
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          {siteConfig.title} is written for engineers navigating the shift
          from traditional software delivery toward agentic, AI-native
          systems — without losing the rigor DevSecOps and platform
          engineering already taught us.{" "}
          <Link href="/about" className="text-foreground underline underline-offset-4">
            Read more
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}
