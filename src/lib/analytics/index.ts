import { featureFlags } from "@/config/features";
import type { AnalyticsEvent } from "@/lib/analytics/types";

export type { AnalyticsEvent } from "@/lib/analytics/types";

/**
 * The single integration point for analytics. Swapping providers (Plausible,
 * Umami, Matomo, ...) means editing the body of this function only — no
 * caller anywhere in the app needs to change.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (!featureFlags.analytics) return;

  // No provider configured yet. When one is, call it here, e.g.:
  //   window.plausible?.(event.name, { props: "properties" in event ? event.properties : undefined });
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event);
  }
}
