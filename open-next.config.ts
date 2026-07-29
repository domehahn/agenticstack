import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No custom incremental-cache/tag-cache overrides: the app has no ISR
// (`revalidate`) or on-demand tag revalidation anywhere, so the default
// in-memory behavior is enough — no R2 bucket needed.
export default defineCloudflareConfig();
