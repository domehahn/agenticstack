import { NextResponse } from "next/server";

/**
 * Two stricter approaches were tried and rejected after checking a real
 * browser, not just reading docs:
 *  - nonce + 'strict-dynamic' (Next's documented pattern): this Next/
 *    Turbopack version doesn't thread the nonce onto its own emitted
 *    <script src> chunk tags, so every script got blocked.
 *  - 'self' alone: App Router emits unnonced inline <script> tags for the
 *    RSC hydration payload (self.__next_f.push(...)), which 'self' (a
 *    host-based source) does not permit — hydration broke, the search
 *    dialog stopped opening.
 * 'unsafe-inline' still blocks the actual common threat for a site like
 * this — an attacker injecting a <script src="https://evil.example/x.js">
 * — since only 'self' script hosts are allowlisted; it just can't also
 * block inline script execution the way a working nonce setup would.
 */
export function proxy() {
  // Fast Refresh in `next dev` relies on eval()-based module loading, which
  // a strict CSP would otherwise block. Production ships without it.
  const scriptSrc = `'self' 'unsafe-inline'${
    process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
  }`;

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    // Inline `style` attributes (used for computed widths/offsets, e.g. the
    // reading progress bar and TOC indentation) can't execute script, so
    // 'unsafe-inline' here is a reasonable trade-off — Next's own official
    // CSP guide makes the same one.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );

  return response;
}

export const config = {
  matcher: [
    // Skip Next internals and static assets; CSP/security headers don't
    // apply to them and computing them per-asset request is wasted work.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
