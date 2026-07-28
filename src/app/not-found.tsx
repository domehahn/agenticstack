import Link from "next/link";

import { Container } from "@/components/shared/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-16">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        This route doesn&apos;t exist.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The page you&apos;re looking for may have moved or never existed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex w-fit items-center gap-1 text-sm font-medium text-accent hover:underline"
      >
        ← Back to the publication
      </Link>
    </Container>
  );
}
