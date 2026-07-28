import { siteConfig } from "@/config/site";

const PALETTE = {
  background: "#16181d",
  foreground: "#f2f1ed",
  muted: "#9a9fac",
  accent: "#8ec8ff",
  border: "#2b2f38",
};

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function OgImage({
  eyebrow,
  title,
  footer,
}: {
  eyebrow?: string;
  title: string;
  footer?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: PALETTE.background,
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 28,
          color: PALETTE.foreground,
          letterSpacing: -0.5,
        }}
      >
        {siteConfig.name}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {eyebrow && (
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: PALETTE.accent,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            color: PALETTE.foreground,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `2px solid ${PALETTE.border}`,
          paddingTop: 28,
          fontSize: 24,
          color: PALETTE.muted,
        }}
      >
        <div style={{ display: "flex" }}>{footer ?? siteConfig.tagline}</div>
        <div style={{ display: "flex", color: PALETTE.accent }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    </div>
  );
}
