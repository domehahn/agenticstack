# Writing articles

Every published article is a single `.mdx` file in this folder. Nothing else
is required — the content pipeline (`src/lib/content/articles.ts`) reads this
directory at build time, validates frontmatter, and derives slugs, reading
time, topic/tag pages, series, and related articles automatically.

## Quick start

1. Copy `_template.mdx` to a new file named after your article, e.g.
   `context-engineering-vs-prompt-engineering.mdx`.
   **The filename (without `.mdx`) becomes the URL slug**:
   `/blog/context-engineering-vs-prompt-engineering`.
2. Fill in the frontmatter (see reference below).
3. Write the article body in Markdown/MDX.
4. Set `draft: false` when it's ready to publish. Draft articles are excluded
   from listings, sitemap, RSS, and static generation, but you can still view
   them by temporarily setting `draft: false` locally.

No code changes, no manual registration step — dropping a valid `.mdx` file
here is the entire publishing workflow.

## Frontmatter reference

```yaml
---
title: "Article title"              # required
description: "One-sentence summary" # required, used for previews + SEO
date: "2026-07-28"                  # required, YYYY-MM-DD
updated: "2026-08-01"                # optional, shown as "Updated" if different from date
author: "dome"                      # required, must match a key in src/config/authors.ts
topics:                             # required, at least one
  - agentic-engineering             # slug or name from src/config/topics.ts
  - devsecops
tags:                                # optional, freeform, powers /tags/[tag]
  - MCP
  - Kubernetes
featured: false                     # optional, at most one article should be true
draft: true                         # required to publish: set to false
series:                             # optional, groups articles into a series
  slug: agentic-engineering-foundations
  title: "Agentic Engineering Foundations"
  order: 1
---
```

## MDX components available in the body

- `<Note>`, `<Warning>`, `<Architecture>`, `<KeyTakeaway>` — callouts
- `<Figure caption="...">` — image/diagram with a caption
- Standard Markdown: headings (`##`/`###` power the table of contents),
  tables, lists, blockquotes, and fenced code blocks

Fenced code blocks support syntax highlighting for any language Shiki knows
(`ts`, `bash`, `yaml`, `dockerfile`, etc.), plus filenames and highlighted
lines via the standard rehype-pretty-code syntax:

````
```ts title="lib/example.ts" {2}
const a = 1;
const b = 2; // highlighted
```
````

Footnotes use standard Markdown footnote syntax (via `remark-gfm`):

```markdown
A claim that needs a citation.[^1]

[^1]: The citation itself, rendered in a "Footnotes" section at the bottom.
```

## Adding a new topic

Topics are a curated, central list (not freeform like tags). Add a new one in
`src/config/topics.ts` before referencing its slug in an article.
