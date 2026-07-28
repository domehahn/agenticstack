import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

import { Architecture, KeyTakeaway, Note, Warning } from "@/components/mdx/callout";
import { CopyButton } from "@/components/mdx/copy-button";
import { Figure } from "@/components/mdx/figure";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  img: ({ src, alt = "" }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="w-full rounded-md border border-border"
      />
    );
  },
  pre: CopyButton,
  table: ({ children }) => (
    <div className="not-prose my-6 overflow-x-auto rounded-md border border-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border bg-surface px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-4 py-2 align-top">{children}</td>
  ),
  Note,
  Warning,
  Architecture,
  KeyTakeaway,
  Figure,
};
