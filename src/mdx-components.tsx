import type { MDXComponents } from "mdx/types";

import { mdxComponents } from "@/components/mdx/mdx-components";

// Required file convention for @next/mdx under the App Router — registers
// components globally for every compiled .mdx file, so article pages don't
// need to pass a `components` prop.
export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
