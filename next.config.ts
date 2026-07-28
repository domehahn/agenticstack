import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Articles are authored by trusted contributors in this repo, so any
    // https image host is allowed. Narrow this to specific hostnames if
    // content ever comes from untrusted sources.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
