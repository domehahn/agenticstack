import { describe, expect, it } from "vitest";

import { slugify } from "@/lib/utils/slug";

describe("slugify", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(slugify("AI Agents")).toBe("ai-agents");
  });

  it("collapses non-alphanumeric runs into a single hyphen", () => {
    expect(slugify("Spec-Driven Development!!")).toBe("spec-driven-development");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --Kubernetes--  ")).toBe("kubernetes");
  });

  it("never produces a segment containing a space", () => {
    expect(slugify("Multi Word Tag Name")).not.toContain(" ");
  });
});
