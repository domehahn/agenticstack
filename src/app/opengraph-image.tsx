import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { OgImage, ogImageContentType, ogImageSize } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    <OgImage title="Engineering the agentic era." footer={siteConfig.tagline} />,
    { ...size },
  );
}
