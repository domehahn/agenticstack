# AgenticStack

A production-grade technical publication about agentic engineering,
DevSecOps, and the systems underneath both. Built with Next.js (App Router),
TypeScript, Tailwind CSS, and MDX.

The blog ships with **no demo articles** — see [Adding articles](#adding-articles)
to publish your first one.

## Stack

- **Next.js 16 (App Router, React Server Components)** — static generation
  for all content pages, minimal client JavaScript.
- **TypeScript, strict mode.**
- **Tailwind CSS v4** — CSS-variable design tokens in `src/app/globals.css`,
  `@tailwindcss/typography` for article prose.
- **MDX** via `next-mdx-remote/rsc`, `rehype-pretty-code` (Shiki) for code
  highlighting, `rehype-slug` + `rehype-autolink-headings` for heading
  anchors, `remark-gfm` for tables/strikethrough.
- **next-themes** for light/dark/system theming without a flash of
  unstyled content.
- **cmdk** for the command-palette search dialog.
- No database, no CMS — content lives in the repo as MDX files.

## Architecture

```text
src/
├── app/                # Routes (App Router). Pages stay thin: fetch via
│                        lib/content, render via components/.
├── components/
│   ├── layout/          # Header, footer, theme provider (shell chrome)
│   ├── navigation/      # Mobile nav, theme toggle
│   ├── search/          # Command palette (client)
│   ├── blog/            # Article-domain UI: lists, TOC, meta, series nav
│   ├── mdx/             # Components usable inside article bodies
│   ├── ui/              # Generic primitives (Button, …)
│   └── shared/          # Container, icons — no domain knowledge
├── content/blog/        # Your articles live here. See its README.
├── lib/
│   ├── content/          # articles.ts: reads + validates + indexes MDX
│   ├── search/           # Split server/client: build (fs) vs query (pure)
│   └── seo/              # Metadata + JSON-LD builders, used by every page
├── config/               # site.ts, navigation.ts, topics.ts, authors.ts —
│                          the only places branding/nav/topics are defined
└── types/                # Article domain model
```

### Key decisions

- **Content lives in the filesystem, not a database.** `lib/content/articles.ts`
  reads `content/blog/*.mdx` at build time, validates frontmatter with Zod,
  and derives slugs (from filename), reading time, related articles, topic
  and tag indexes, and series ordering — all in one module, cached per
  build. Every page (`/blog`, `/topics/[topic]`, `/tags/[tag]`, `/series/[series]`,
  the homepage) reads from this single source of truth instead of
  duplicating query logic.
- **Topics are curated, tags are freeform.** Topics live in
  `config/topics.ts` and represent the publication's primary domains; tags
  are whatever an article's frontmatter declares. This mirrors how the
  site's navigation treats them differently (Topics is primary nav; Tags is
  reachable but secondary).
- **Search is split into a server half and a client half.** `lib/search/index.ts`
  (server-only, imports `node:fs` transitively via `articles.ts`) builds the
  index once per request in the root layout. `lib/search/query.ts` is a pure,
  dependency-free scoring function that ships to the client bundle — keeping
  filesystem code out of client JavaScript entirely.
- **Server Components by default.** Only components with real interactivity
  (theme toggle, search dialog, mobile nav, reading progress, TOC
  scroll-spy, copy button) are marked `"use client"`. Article pages,
  listings, and MDX rendering are all server-rendered.
- **MDX components are the extension point**, not one-off markup in every
  article. `<Note>`, `<Warning>`, `<Architecture>`, `<KeyTakeaway>`, and
  `<Figure>` are defined once in `components/mdx/` and available in every
  article body.

## Adding articles

Publishing an article is: create one `.mdx` file. Nothing else.

```bash
cp content/blog/_template.mdx content/blog/my-new-article.mdx
```

The filename becomes the URL slug (`/blog/my-new-article`). Fill in the
frontmatter, write the body, set `draft: false`. Full frontmatter reference,
available MDX components, and code block syntax are documented in
[`content/blog/README.md`](content/blog/README.md).

### Adding a topic

Topics are centrally defined — add one to `src/config/topics.ts` before
referencing its slug in an article's frontmatter.

### Adding a series

Give matching `series: { slug, title, order }` frontmatter to each article
in the series. `/series` and `/series/[slug]` are derived automatically;
no separate registration.

### Adding an author

Add an entry to `src/config/authors.ts`, then reference its key from an
article's `author` frontmatter field.

## Configuration

Site name, description, tagline, URL, and social links are all in
`src/config/site.ts` — nothing else in the codebase hard-codes the brand.
Primary/footer navigation lives in `src/config/navigation.ts`.

## Development

```bash
npm run dev         # start the dev server
npm run build        # production build (also runs the TypeScript check)
npm run start        # serve the production build
npm run lint          # ESLint
npx tsc --noEmit       # TypeScript, standalone
npm run test           # Vitest — lib/content, lib/search, lib/utils
npm run test:e2e        # Playwright — nav, theme, search, article, mobile menu
```

Playwright's config builds and serves a production instance on port 3200
before running (`webServer` in `playwright.config.ts`), so `npm run test:e2e`
works standalone without a dev server already running.

## SEO

Every page builds its metadata through `lib/seo/metadata.ts` (canonical URL,
OpenGraph, Twitter card, optional `noIndex`) so there's one place that
defines the shape of page metadata. `lib/seo/json-ld.ts` provides `WebSite`,
`Blog`, `BlogPosting`, and `BreadcrumbList` structured data. `sitemap.ts`,
`robots.ts`, and `feed.xml` are generated from the same content index as the
pages themselves — adding an article updates all three automatically.

Social preview images are generated per-request from `lib/seo/og-image.tsx`
via Next's file conventions: `app/opengraph-image.tsx` is the site-wide
default (inherited by every page unless overridden), and
`app/blog/[slug]/opengraph-image.tsx` renders a per-article card (topic,
title, author, date). No static image asset to keep in sync.

## Analytics

`lib/analytics/index.ts` exports a single `trackEvent()` function — the only
integration point in the app. It's a no-op while `features.analytics` is
`false` (the default: no vendor configured, nothing loaded). A few real call
sites (`code_copied`, `search_opened`, `search_query`) already call it, so
wiring up a provider later means editing the body of `trackEvent()` once,
not touching every component that reports an event.

## Security

`src/proxy.ts` (Next's request-interception layer — the file formerly named
`middleware.ts`) sets a Content-Security-Policy and the standard hardening
headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, `Strict-Transport-Security`) on every response.

The CSP is `script-src 'self' 'unsafe-inline'`, not the stricter nonce +
`'strict-dynamic'` pattern Next's own docs recommend. That was tried first
and rejected after checking a real browser: this Next/Turbopack version
doesn't thread the nonce onto its own `<script src>` chunk tags, and a bare
`'self'` blocks the unnonced inline `<script>` tags App Router uses for the
RSC hydration payload — both broke real functionality (the search dialog
stopped opening). `'unsafe-inline'` still blocks the more common real threat
for a static-content site like this — an attacker-injected
`<script src="https://evil.example/x.js">` — since only `'self'` script
hosts are allowlisted; it just can't additionally block inline script
execution.

## Deployment

The app is a standard Next.js application with no provider-specific APIs,
so it deploys to any Next.js-compatible host (Vercel, a Node server, or a
container running `next build && next start`). Set `site.url` in
`src/config/site.ts` to the production domain before deploying — it backs
canonical URLs, the sitemap, the RSS feed, and JSON-LD.
