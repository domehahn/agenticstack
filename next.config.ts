import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Fully static build: every route is prerendered at build time (or client-
  // rendered, for the few pages that read the URL query string) — see
  // README's "Deployment" section for why. `next build` writes plain HTML/
  // JS/CSS to `out/`, which is what gets deployed; there's no Node/Workers
  // server involved at request time at all.
  output: "export",
  // Lets .mdx files be compiled by @next/mdx; we don't use it for file-based
  // routing (no .mdx files under src/app), only for the dynamic
  // `import(`.../content/blog/${slug}.mdx`)` in the article page.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // next/image's optimization API needs a running server, which a static
    // export doesn't have. No article currently uses an external image (see
    // the privacy audit in content/blog/README.md), so this only affects
    // future usage: images render at their original dimensions, unresized.
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack only accepts plugins referenced by string with serializable
    // options (a JS function reference like a custom highlighter can't cross
    // into the Rust compiler) — see rehype-pretty-code's default engine note
    // in content/blog's authoring docs for why that's fine here: MDX
    // compiles at build time, not inside a deployed server, so Shiki's
    // default (WASM-based) engine never runs anywhere near a Workers
    // sandbox.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "wrap" }],
      [
        "rehype-pretty-code",
        {
          theme: { dark: "github-dark-dimmed", light: "github-light" },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
