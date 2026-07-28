import { Feed } from "feed";

import { siteConfig } from "@/config/site";
import { getAllArticles } from "@/lib/content/articles";

export const dynamic = "force-static";

export function GET() {
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.title}`,
    feedLinks: {
      rss: `${siteConfig.url}/feed.xml`,
    },
  });

  for (const article of getAllArticles()) {
    feed.addItem({
      title: article.title,
      id: `${siteConfig.url}/blog/${article.slug}`,
      link: `${siteConfig.url}/blog/${article.slug}`,
      description: article.description,
      author: [{ name: article.author.name }],
      date: new Date(article.updated ?? article.date),
      category: article.topics.map((topic) => ({ name: topic.name })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
