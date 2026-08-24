export const siteConfig = {
  name: "agenticstack",
  title: "AgenticStack",
  description:
    "Engineering the transition from DevSecOps to Agentic Engineering.",
  tagline: "DevSecOps · Agents · Skills · Specs · Platforms",
  url: "https://agenticstack.eu",
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
    github: "https://github.com/domehahn/agenticstack",
    linkedin: undefined as string | undefined,
  },
} as const;

export type SiteConfig = typeof siteConfig;
