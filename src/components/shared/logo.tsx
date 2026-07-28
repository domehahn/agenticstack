import { cn } from "@/lib/utils/cn";

/**
 * Renders both theme variants and lets CSS pick the visible one via the
 * `dark` class on <html> — no client JS, so there's no flash of the wrong
 * logo while the theme is resolving.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG brand mark, not a raster optimization candidate */}
      <img
        src="/logo/full-light.svg"
        alt="AgenticStack"
        className="block h-full w-auto dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG brand mark, not a raster optimization candidate */}
      <img
        src="/logo/full-dark.svg"
        alt="AgenticStack"
        className="hidden h-full w-auto dark:block"
      />
    </span>
  );
}
