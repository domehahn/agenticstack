# Security Policy

## Supported Versions

AgenticStack is continuously deployed from the `main` branch to [agenticstack.eu](https://agenticstack.eu). Only the latest production deployment on `main` is actively supported.

| Version / Branch | Supported          |
| ---------------- | ------------------ |
| `main` (latest)  | :white_check_mark: |

## Reporting a Vulnerability

We take the security of AgenticStack seriously. If you discover a security vulnerability in the application code, build pipeline, or Cloudflare deployment configuration:

1. **Do not open a public GitHub issue.**
2. **Report via email:** Send a detailed report to **[info@agenticstack.eu](mailto:info@agenticstack.eu)** (see also our RFC 9116 disclosure file at [`https://agenticstack.eu/.well-known/security.txt`](https://agenticstack.eu/.well-known/security.txt)).
3. **Include details:** Provide affected URLs or file paths, reproduction steps, and potential impact.

We aim to acknowledge receipt of vulnerability reports within **48 hours** and provide a remediation timeline after initial triage.

## Security Architecture

- **Pure Static Export (`output: "export"`):** The production site ships as pre-rendered static HTML/CSS/JS assets served directly from Cloudflare's edge asset layer with zero server-side request execution or runtime MDX `eval()`.
- **Hardened HTTP Response Headers (`public/_headers`):**
  - `Content-Security-Policy` restricting script, style, font, image, and connection origins (`frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`)
  - `Strict-Transport-Security` (`max-age=63072000; includeSubDomains; preload`)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- **RFC 9116 Compliance:** Published at [`public/.well-known/security.txt`](public/.well-known/security.txt).
- **Automated Cloudflare Compliance Auditing:** [`scripts/cloudflare-audit.mts`](scripts/cloudflare-audit.mts) verifies zone-level security settings (`Always Use HTTPS`, `NEL`, `RUM`, `SPF`, `security.txt`, and HTTP headers).
