"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";
import type { TocEntry } from "@/lib/content/toc";

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headingElements = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const visible = observerEntries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 flex flex-col gap-2 border-l border-border">
        {entries.map((entry) => (
          <li key={entry.id} style={{ paddingLeft: entry.depth === 3 ? "1.5rem" : "1rem" }}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "-ml-px block border-l pl-3 leading-snug transition-colors",
                activeId === entry.id
                  ? "border-accent font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
