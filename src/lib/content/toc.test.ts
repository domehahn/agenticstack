import { describe, expect, it } from "vitest";

import { extractToc } from "@/lib/content/toc";

describe("extractToc", () => {
  it("extracts h2 and h3 headings in order", () => {
    const markdown = `
Intro paragraph.

## First Section

Some text.

### A Subsection

More text.

## Second Section
`;
    const toc = extractToc(markdown);
    expect(toc).toEqual([
      { id: "first-section", title: "First Section", depth: 2 },
      { id: "a-subsection", title: "A Subsection", depth: 3 },
      { id: "second-section", title: "Second Section", depth: 2 },
    ]);
  });

  it("ignores h1 and h4+ headings", () => {
    const markdown = "# Title\n\n#### Too deep\n\n## Real section\n";
    const toc = extractToc(markdown);
    expect(toc).toEqual([{ id: "real-section", title: "Real section", depth: 2 }]);
  });

  it("disambiguates duplicate heading text like rehype-slug does", () => {
    const markdown = "## Overview\n\n## Overview\n";
    const toc = extractToc(markdown);
    expect(toc.map((t) => t.id)).toEqual(["overview", "overview-1"]);
  });

  it("returns an empty array for content with no headings", () => {
    expect(extractToc("Just a paragraph, no headings.")).toEqual([]);
  });
});
