import Link from "next/link";

import type { TopicDefinition } from "@/config/topics";
import { cn } from "@/lib/utils/cn";

export function TopicBadge({
  topic,
  className,
}: {
  topic: TopicDefinition;
  className?: string;
}) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={cn(
        "inline-flex items-center text-xs font-semibold uppercase tracking-wider text-accent hover:underline",
        className,
      )}
    >
      {topic.name}
    </Link>
  );
}
