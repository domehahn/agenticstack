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
        "inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent/15",
        className,
      )}
    >
      {topic.name}
    </Link>
  );
}
