import Link from "next/link";

import { slugify } from "@/lib/utils/slug";

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${slugify(tag)}`}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
