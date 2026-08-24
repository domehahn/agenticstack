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

// Articles can live directly in content/blog/ or be grouped into
// subfolders (e.g. content/blog/agentic-security/sec-01-...mdx) purely to
// keep the source tree tidy — folder placement carries no meaning for the
// site (series grouping comes from frontmatter `series`, not from disk
// layout). Walk the tree recursively and collect each .mdx file's path
// relative to CONTENT_DIR, e.g. "sec-01-foo" or "agentic-security/sec-01-foo".
function findMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const relativePath = path
        .relative(CONTENT_DIR, fullPath)
        .replace(/\.mdx$/, "");
      files.push(relativePath.split(path.sep).join("/"));
    }
  }
  return files;
}

function generate() {
  const files = findMdxFiles(CONTENT_DIR);

  const seenSlugs = new Map();
  const articles = files.map((file) => {
    const slug = path.basename(file, ".mdx");

    const existing = seenSlugs.get(slug);
    if (existing) {
      throw new Error(
        `Duplicate article slug "${slug}": content/blog/${existing} and content/blog/${file}.mdx both resolve to it. Slugs must be unique across all of content/blog, including subfolders.`,
      );
    }
    seenSlugs.set(slug, `${file}.mdx`);

    const raw = fs.readFileSync(path.join(CONTENT_DIR, `${file}.mdx`), "utf8");
    const { data, content } = matter(raw);

    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/blog/${file}.mdx: ${parsed.error.message}`,
      );
    }
    const fm = parsed.data;

    return {
      slug,
      file,
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
