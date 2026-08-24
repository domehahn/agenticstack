import Link from "next/link";

import { GithubIcon } from "@/components/shared/icons";

import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="grid gap-10 py-12 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo className="h-16" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            {siteConfig.links.github && (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {footerNavigation.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.title}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/impressum" className="hover:text-foreground">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-foreground">
            Datenschutz
          </Link>
        </div>
      </Container>
    </footer>
  );
}
