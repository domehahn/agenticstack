import { BlogIndexPage } from "@/components/blog/blog-index-page";
import { getBlogTotalPages } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  const totalPages = getBlogTotalPages();
  // A dynamic route with zero generated params breaks `output: export`
  // (long-standing, still-open Next.js bug — vercel/next.js#61213,
  // vercel/next.js#71862). Placeholder param + notFound() (via
  // BlogIndexPage's own bounds check — Number("__none__") is not an
  // integer) is the community-endorsed workaround: generates one harmless
  // static 404 page instead of failing the entire build when there's only
  // one page of articles so far.
  if (totalPages <= 1) return [{ page: "__none__" }];
  // Page 1 is served by /blog itself; only pages 2+ live under this route.
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

// No dynamic fallback under static export — a page number not produced by
// generateStaticParams simply doesn't exist as a file.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return buildMetadata({
    title: `Blog — Page ${page}`,
    description: "All articles on agentic engineering, DevSecOps, and platform engineering.",
    path: `/blog/page/${page}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return <BlogIndexPage page={Number(page)} />;
}
