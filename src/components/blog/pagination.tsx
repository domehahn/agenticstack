import Link from "next/link";

export function Pagination({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prevHref = currentPage <= 2 ? basePath : `${basePath}?page=${currentPage - 1}`;
  const nextHref = `${basePath}?page=${currentPage + 1}`;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-between border-t border-border pt-6 text-sm"
    >
      {currentPage > 1 ? (
        <Link href={prevHref} className="text-foreground hover:text-accent">
          ← Newer
        </Link>
      ) : (
        <span />
      )}
      <p className="text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      {currentPage < totalPages ? (
        <Link href={nextHref} className="text-foreground hover:text-accent">
          Older →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
