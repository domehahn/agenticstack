import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import { getAuthor } from "@/config/authors";
import { getTopicBySlug, topics as topicDefinitions } from "@/config/topics";
import { frontmatterSchema } from "@/lib/content/schema";
import type { Article, ArticleSummary, SeriesInfo } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

let cache: Article[] | null = null;

function readArticles(): Article[] {
  if (cache) return cache;

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/blog/${file}: ${parsed.error.message}`,
      );
    }
    const fm = parsed.data;

    const resolvedTopics = fm.topics
      .map((slugOrName) => {
        const bySlug = getTopicBySlug(slugOrName);
        if (bySlug) return bySlug;
        return topicDefinitions.find(
          (t) => t.name.toLowerCase() === slugOrName.toLowerCase(),
        );
      })
      .filter((t): t is NonNullable<typeof t> => Boolean(t));

    const article: Article = {
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      updated: fm.updated,
      author: getAuthor(fm.author.toLowerCase()),
      topics: resolvedTopics,
      tags: fm.tags,
      featured: fm.featured ?? false,
      draft: fm.draft ?? false,
      series: fm.series as SeriesInfo | undefined,
      readingTime: readingTime(content).text,
      content,
    };

    return article;
  });

  articles.sort((a, b) => (a.date < b.date ? 1 : -1));

  cache = articles;
  return articles;
}

function toSummary(article: Article): ArticleSummary {
  const { content: _content, ...summary } = article;
  void _content;
  return summary;
}

export function getAllArticles({
  includeDrafts = false,
}: { includeDrafts?: boolean } = {}): ArticleSummary[] {
  return readArticles()
    .filter((article) => includeDrafts || !article.draft)
    .map(toSummary);
}

export function getArticleBySlug(slug: string): Article | undefined {
  const article = readArticles().find((a) => a.slug === slug);
  if (!article || article.draft) return undefined;
  return article;
}

export function getFeaturedArticle(): ArticleSummary | undefined {
  const articles = getAllArticles();
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getLatestArticles(
  limit?: number,
  excludeSlug?: string,
): ArticleSummary[] {
  const articles = getAllArticles().filter((a) => a.slug !== excludeSlug);
  return typeof limit === "number" ? articles.slice(0, limit) : articles;
}

export function getArticlesByTopic(topicSlug: string): ArticleSummary[] {
  return getAllArticles().filter((a) =>
    a.topics.some((t) => t.slug === topicSlug),
  );
}

export function getArticlesByTag(tag: string): ArticleSummary[] {
  return getAllArticles().filter((a) =>
    a.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const article of getAllArticles()) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTopicsWithCounts() {
  return topicDefinitions.map((topic) => ({
    ...topic,
    count: getArticlesByTopic(topic.slug).length,
  }));
}

export function getRelatedArticles(
  article: ArticleSummary,
  limit = 3,
): ArticleSummary[] {
  const others = getAllArticles().filter((a) => a.slug !== article.slug);

  const scored = others.map((candidate) => {
    const sharedTopics = candidate.topics.filter((t) =>
      article.topics.some((at) => at.slug === t.slug),
    ).length;
    const sharedTags = candidate.tags.filter((t) =>
      article.tags.includes(t),
    ).length;
    return { candidate, score: sharedTopics * 2 + sharedTags };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.candidate);
}

export function getAdjacentArticles(slug: string): {
  previous?: ArticleSummary;
  next?: ArticleSummary;
} {
  const articles = getAllArticles();
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return {};
  return {
    previous: articles[index + 1],
    next: index > 0 ? articles[index - 1] : undefined,
  };
}

export function getAllSeriesSlugs(): string[] {
  const slugs = new Set<string>();
  for (const article of getAllArticles()) {
    if (article.series) slugs.add(article.series.slug);
  }
  return Array.from(slugs);
}

export function getSeriesArticles(seriesSlug: string): ArticleSummary[] {
  return getAllArticles()
    .filter((a) => a.series?.slug === seriesSlug)
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));
}

export function getSeriesTitle(seriesSlug: string): string | undefined {
  return getSeriesArticles(seriesSlug)[0]?.series?.title;
}
