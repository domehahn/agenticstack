import type { Author } from "@/config/authors";
import type { TopicDefinition } from "@/config/topics";

export type SeriesInfo = {
  slug: string;
  title: string;
  order: number;
};

export type AITransparency = {
  assisted: boolean;
  humanReviewed?: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
  disclosure?: string;
  tools?: string[];
};

export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  topics: string[];
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  series?: {
    slug: string;
    title: string;
    order: number;
  };
  language?: "de" | "en";
  ai?: AITransparency;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: Author;
  topics: TopicDefinition[];
  tags: string[];
  featured: boolean;
  draft: boolean;
  series?: SeriesInfo;
  readingTime: string;
  content: string;
  language?: "de" | "en";
  ai?: AITransparency;
};

export type ArticleSummary = Omit<Article, "content">;
