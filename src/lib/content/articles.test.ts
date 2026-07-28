import { describe, expect, it } from "vitest";

import {
  getAllArticles,
  getAllTags,
  getArticleBySlug,
} from "@/lib/content/articles";
import { slugify } from "@/lib/utils/slug";

describe("getAllArticles", () => {
  it("never includes draft articles, including the authoring template", () => {
    const articles = getAllArticles();
    expect(articles.every((a) => !a.draft)).toBe(true);
    expect(articles.some((a) => a.slug === "_template")).toBe(false);
  });

  it("is sorted by date, newest first", () => {
    const articles = getAllArticles();
    for (let i = 1; i < articles.length; i++) {
      expect(articles[i - 1].date >= articles[i].date).toBe(true);
    }
  });
});

describe("getArticleBySlug", () => {
  it("returns undefined for a draft slug", () => {
    expect(getArticleBySlug("_template")).toBeUndefined();
  });

  it("returns undefined for a nonexistent slug", () => {
    expect(getArticleBySlug("does-not-exist")).toBeUndefined();
  });

  it("resolves a published article with derived fields", () => {
    const article = getArticleBySlug("what-is-agentic-engineering");
    expect(article).toBeDefined();
    expect(article?.readingTime).toMatch(/read/);
    expect(article?.topics.length).toBeGreaterThan(0);
  });
});

describe("getAllTags", () => {
  it("gives every tag a slug consistent with slugify()", () => {
    for (const { tag, slug } of getAllTags()) {
      expect(slug).toBe(slugify(tag));
    }
  });
});
