import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createMDX from "@next/mdx";

/**
 * Two stricter CSP approaches were tried and rejected after checking a real
 * browser, not just reading docs:
 *  - nonce + 'strict-dynamic' (Next's documented pattern): this Next/
 *    Turbopack version doesn't thread the nonce onto its own emitted
 *    <script src> chunk tags, so every script got blocked.
 *  - 'self' alone: App Router emits unnonced inline <script> tags for the
 *    RSC hydration payload (self.__next_f.push(...)), which 'self' (a
 *    host-based source) does not permit — hydration broke, the search
 *    dialog stopped opening.
 * 'unsafe-inline' still blocks the actual common threat for a site like
 * this — an attacker injecting a <script src="https://evil.example/x.js">
 * — since only 'self' script hosts are allowlisted; it just can't also
 * block inline script execution the way a working nonce setup would.
 *
 * This lives in next.config.ts rather than a proxy/middleware file: once
 * the nonce was dropped there was nothing per-request left to compute, and
 * Next 16's proxy.ts always runs on the Node.js runtime with no opt-out —
 * which OpenNext's Cloudflare adapter doesn't support. Static headers()
 * has no such runtime constraint and works identically everywhere.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${
    process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
  }`,
  // Inline `style` attributes (used for computed widths/offsets, e.g. the
  // reading progress bar and TOC indentation) can't execute script, so
  // 'unsafe-inline' here is a reasonable trade-off — Next's own official
  // CSP guide makes the same one.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Lets .mdx files be compiled by @next/mdx; we don't use it for file-based
  // routing (no .mdx files under src/app), only for the dynamic
  // `import(`.../content/blog/${slug}.mdx`)` in the article page.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // Articles are authored by trusted contributors in this repo, so any
    // https image host is allowed. Narrow this to specific hostnames if
    // content ever comes from untrusted sources.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack only accepts plugins referenced by string with serializable
    // options (a JS function reference like a custom highlighter can't cross
    // into the Rust compiler) — see rehype-pretty-code's default engine note
    // in content/blog's authoring docs for why that's fine here: MDX now
    // compiles at build time, not inside the deployed Cloudflare Worker, so
    // Shiki's default (WASM-based) engine never runs in the Workers sandbox.
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

// Enables the Cloudflare Workers runtime (bindings, wrangler.jsonc env vars,
// R2/KV, etc.) inside `next dev` so local dev matches the deployed worker.
initOpenNextCloudflareForDev();
