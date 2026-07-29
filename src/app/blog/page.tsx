import { BlogIndexPage } from "@/components/blog/blog-index-page";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Blog",
  description: "All articles on agentic engineering, DevSecOps, and platform engineering.",
  path: "/blog",
});

export default function Page() {
  return <BlogIndexPage page={1} />;
}
