import Link from "next/link";

import { MobileNav } from "@/components/navigation/mobile-nav";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { SearchDialog } from "@/components/search/search-dialog";
import { Container } from "@/components/shared/container";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { SearchDocument } from "@/lib/search";

export function SiteHeader({
  searchIndex,
}: {
  searchIndex: SearchDocument[];
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight lowercase"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-6">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <SearchDialog searchIndex={searchIndex} />
          <ThemeToggle />
          <MobileNav items={primaryNavigation} />
        </div>
      </Container>
    </header>
  );
}
