export const siteConfig = {
  name: "aboutagentic",
  title: "AboutAgentic",
  description:
    "Engineering the transition from DevSecOps to Agentic Engineering.",
  tagline: "DevSecOps · Agents · Skills · Specs · Platforms",
  url: "https://aboutagentic.dev",
  ogImage: "/og/default.png",
  locale: "en-US",
  keywords: [
    "Agentic Engineering",
    "Agentic DevSecOps",
    "DevSecOps",
    "AI Engineering",
    "AI Agents",
    "Coding Agents",
    "Spec-Driven Development",
    "Context Engineering",
    "Prompt Engineering",
    "MCP",
    "Kubernetes",
    "Platform Engineering",
    "Software Architecture",
    "Application Security",
  ],
  links: {
    github: "https://github.com/aboutagentic",
    linkedin: undefined as string | undefined,
    rss: "/feed.xml",
  },
} as const;

export type SiteConfig = typeof siteConfig;
