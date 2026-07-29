import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { topics } from "@/config/topics";
import {
  getAllArticles,
  getAllSeriesSlugs,
  getAllTags,
  getBlogTotalPages,
} from "@/lib/content/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/topics",
    "/tags",
    "/series",
    "/about",
    "/search",
    "/impressum",
    "/datenschutz",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const totalBlogPages = getBlogTotalPages();
  const blogPaginationRoutes = Array.from(
    { length: Math.max(0, totalBlogPages - 1) },
    (_, i) => ({
      url: `${siteConfig.url}/blog/page/${i + 2}`,
      lastModified: new Date(),
    }),
  );

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${siteConfig.url}/blog/${article.slug}`,
    lastModified: new Date(article.updated ?? article.date),
  }));

  const topicRoutes = topics.map((topic) => ({
    url: `${siteConfig.url}/topics/${topic.slug}`,
    lastModified: new Date(),
  }));

  const tagRoutes = getAllTags().map(({ slug }) => ({
    url: `${siteConfig.url}/tags/${slug}`,
    lastModified: new Date(),
  }));

  const seriesRoutes = getAllSeriesSlugs().map((slug) => ({
    url: `${siteConfig.url}/series/${slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...blogPaginationRoutes,
    ...articleRoutes,
    ...topicRoutes,
    ...tagRoutes,
    ...seriesRoutes,
  ];
}
