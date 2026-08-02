// Reads content/blog/*.mdx off the real filesystem at BUILD time and writes
// a single JSON manifest that lib/content/articles.ts imports statically.
//
// Why this exists: lib/content/articles.ts used to call fs.readdirSync on
// content/blog directly. That works on any Node host, but not on Cloudflare
// Workers — Workers have no filesystem, and Next's build tracer can't see a
// dynamically-constructed fs path to bundle it. A `import manifest from
// "./generated/articles.json"` is a static reference the bundler *can* see
// and include, so the manifest — not raw fs access — is what ships to the
// Worker. This script is the only place in the app that still touches fs
// for content; it only ever runs locally/in CI, never inside the deployed
// runtime (wired via the predev/prebuild npm scripts).
//
// Kept intentionally dependency-light (plain fs + gray-matter + reading-time
// + zod, all already app dependencies) instead of reusing
// src/lib/content/schema.ts directly, since that would require a TypeScript
// loader for a plain build script. Keep this schema in sync with
// src/lib/content/schema.ts by hand — schema.test.ts covers the canonical
// version.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const OUTPUT_DIR = path.join(process.cwd(), "src", "lib", "content", "generated");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "articles.json");

const frontmatterSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    author: z.string().min(1),
    topics: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    series: z
      .object({
        slug: z.string(),
        title: z.string(),
        order: z.number(),
      })
      .optional(),
    language: z.enum(["de", "en"]).optional(),
    ai: z
      .object({
        assisted: z.boolean(),
        humanReviewed: z.boolean().optional(),
        reviewedBy: z.string().optional(),
        reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        disclosure: z.string().optional(),
        tools: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      const articleDate = new Date(data.date);
      const aiActDate = new Date("2026-08-02");
      if (articleDate >= aiActDate && !data.ai) {
        return false;
      }
      return true;
    },
    {
      message:
        "Artikel ab 2026-08-02 benötigen ein ai-Feld (assisted: true/false)",
    }
  );

function generate() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/blog/${file}: ${parsed.error.message}`,
      );
    }
    const fm = parsed.data;

    return {
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      updated: fm.updated,
      author: fm.author,
      topics: fm.topics,
      tags: fm.tags,
      featured: fm.featured,
      draft: fm.draft,
      series: fm.series,
      language: fm.language,
      ai: fm.ai,
      readingTime: readingTime(content).text,
      content,
    };
  });

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2) + "\n");
  console.log(
    `Generated ${path.relative(process.cwd(), OUTPUT_FILE)} (${articles.length} article${articles.length === 1 ? "" : "s"})`,
  );
}

generate();
