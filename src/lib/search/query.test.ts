import { describe, expect, it } from "vitest";

import { searchDocuments } from "@/lib/search/query";
import type { SearchDocument } from "@/lib/search/types";

const docs: SearchDocument[] = [
  {
    slug: "mcp-as-the-interface-layer",
    title: "MCP as the Interface Layer for AI Agents",
    description: "The Model Context Protocol standardizes tool access.",
    topics: ["Agentic Engineering"],
    tags: ["MCP", "AI Agents"],
  },
  {
    slug: "devsecops-basics",
    title: "DevSecOps Basics",
    description: "Shifting security left into the pipeline.",
    topics: ["DevSecOps"],
    tags: ["Security", "CI/CD"],
  },
];

describe("searchDocuments", () => {
  it("returns nothing for an empty query", () => {
    expect(searchDocuments(docs, "")).toEqual([]);
    expect(searchDocuments(docs, "   ")).toEqual([]);
  });

  it("matches by title", () => {
    const results = searchDocuments(docs, "mcp");
    expect(results.map((d) => d.slug)).toEqual(["mcp-as-the-interface-layer"]);
  });

  it("matches by tag", () => {
    const results = searchDocuments(docs, "security");
    expect(results.map((d) => d.slug)).toEqual(["devsecops-basics"]);
  });

  it("is case-insensitive", () => {
    const results = searchDocuments(docs, "DEVSECOPS");
    expect(results.map((d) => d.slug)).toEqual(["devsecops-basics"]);
  });

  it("ranks a title match above a description-only match", () => {
    const results = searchDocuments(docs, "interface");
    expect(results[0]?.slug).toBe("mcp-as-the-interface-layer");
  });

  it("returns no results when nothing matches", () => {
    expect(searchDocuments(docs, "kubernetes")).toEqual([]);
  });
});
