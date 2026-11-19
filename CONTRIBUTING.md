# Contributing to AgenticStack

Thank you for your interest in contributing to **AgenticStack** ([agenticstack.eu](https://agenticstack.eu)).

## Repository Structure

- **Application Repository (`agenticstack`):** Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, MDX build-time compilation, Vitest unit tests, Playwright E2E tests, and Cloudflare Workers static-assets deployment.
- **Content Submodule (`content/blog`):** Git submodule pointing to [`domehahn/agentic-devsecops`](https://github.com/domehahn/agentic-devsecops), containing MDX articles, frontmatter templates, and authoring documentation.

## Prerequisites

- **Node.js** 22+ and **npm** 10+
- **Git** with submodule support

## Local Setup

```bash
git clone --recurse-submodules git@github.com:domehahn/agenticstack.git
cd agenticstack
npm ci
npm run dev
```

## Quality Gates

Before opening a Pull Request, ensure all checks pass locally:

```bash
npm run generate:content   # Validate MDX frontmatter & build content manifest
npm run lint               # ESLint checks
npx tsc --noEmit           # Strict TypeScript check
npm test                   # Vitest unit tests (schema, content, search, TOC, slugs)
npm run build              # Next.js static export to out/
```

## Editorial & EU AI Act Art. 50 Compliance

All articles dated on or after **2026-08-02** must include the `ai` transparency object in their YAML frontmatter (enforced at build time by [`src/lib/content/schema.ts`](src/lib/content/schema.ts) and [`scripts/generate-content-manifest.mjs`](scripts/generate-content-manifest.mjs)):

```yaml
ai:
  assisted: true
  humanReviewed: true
  reviewedBy: "Dominik Hahn"
  reviewedAt: "2026-11-19"
  tools:
    - "Claude"
```

See [`docs/compliance/editorial-ai-policy.md`](docs/compliance/editorial-ai-policy.md) and [`content/blog/README.md`](content/blog/README.md) for the complete editorial workflow and citation verification checklist.
