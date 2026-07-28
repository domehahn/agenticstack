import { siteConfig } from "@/config/site";
import type { Article, ArticleSummary } from "@/types/content";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  };
}

export function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: siteConfig.title,
    description: siteConfig.description,
    url: `${siteConfig.url}/blog`,
  };
}

export function articleJsonLd(article: Article | ArticleSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    url: `${siteConfig.url}/blog/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.title,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
