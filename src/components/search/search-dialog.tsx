"use client";

import { Command } from "cmdk";
import { FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { searchDocuments } from "@/lib/search/query";
import type { SearchDocument } from "@/lib/search/types";

export function SearchDialog({
  searchIndex,
}: {
  searchIndex: SearchDocument[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTypingElsewhere =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (event.key === "/" && !isTypingElsewhere) {
        event.preventDefault();
        setOpen(true);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = searchDocuments(searchIndex, query).slice(0, 8);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) trackEvent({ name: "search_opened" });
    else setQuery("");
  }

  function goTo(slug: string) {
    if (query) {
      trackEvent({
        name: "search_query",
        properties: { query, resultCount: results.length },
      });
    }
    handleOpenChange(false);
    router.push(`/blog/${slug}`);
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="hidden items-center gap-2 text-muted-foreground sm:inline-flex"
        onClick={() => handleOpenChange(true)}
        aria-label="Open search"
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Search</span>
        <kbd className="ml-2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="sm:hidden"
        onClick={() => handleOpenChange(true)}
        aria-label="Open search"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Command.Dialog
        open={open}
        onOpenChange={handleOpenChange}
        label="Search articles"
        contentClassName="fixed inset-0 z-50"
        shouldFilter={false}
      >
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => handleOpenChange(false)}
          aria-hidden="true"
        />
        <div className="fixed left-1/2 top-24 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-xl">
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Search articles, topics, tags…"
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
              {query
                ? `No articles match "${query}".`
                : "Start typing to search the publication."}
            </Command.Empty>
            {results.map((doc) => (
              <Command.Item
                key={doc.slug}
                value={doc.slug}
                onSelect={() => goTo(doc.slug)}
                className="flex cursor-pointer flex-col gap-0.5 rounded-md px-3 py-2 data-[selected=true]:bg-surface"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  {doc.title}
                </span>
                <span className="pl-5 text-xs text-muted-foreground">
                  {doc.description}
                </span>
              </Command.Item>
            ))}
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}
