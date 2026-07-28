import { describe, expect, it } from "vitest";

import { frontmatterSchema } from "@/lib/content/schema";

const validFrontmatter = {
  title: "A Valid Article",
  description: "A one-sentence summary.",
  date: "2026-07-28",
  author: "dome",
  topics: ["agentic-engineering"],
};

describe("frontmatterSchema", () => {
  it("accepts minimal valid frontmatter and fills defaults", () => {
    const result = frontmatterSchema.parse(validFrontmatter);
    expect(result.tags).toEqual([]);
    expect(result.featured).toBe(false);
    expect(result.draft).toBe(false);
  });

  it("rejects a missing title", () => {
    expect(
      frontmatterSchema.safeParse({ ...validFrontmatter, title: undefined }).success,
    ).toBe(false);
  });

  it("rejects a malformed date", () => {
    expect(
      frontmatterSchema.safeParse({ ...validFrontmatter, date: "28-07-2026" }).success,
    ).toBe(false);
  });

  it("rejects an empty topics array", () => {
    expect(
      frontmatterSchema.safeParse({ ...validFrontmatter, topics: [] }).success,
    ).toBe(false);
  });

  it("accepts an optional series block", () => {
    const result = frontmatterSchema.parse({
      ...validFrontmatter,
      series: { slug: "foundations", title: "Foundations", order: 1 },
    });
    expect(result.series?.order).toBe(1);
  });
});
