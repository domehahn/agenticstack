export type TopicDefinition = {
  slug: string;
  name: string;
  description: string;
};

export const topics: TopicDefinition[] = [
  {
    slug: "agentic-engineering",
    name: "Agentic Engineering",
    description:
      "Designing systems where AI agents plan, act, and verify work across a software lifecycle.",
  },
  {
    slug: "devsecops",
    name: "DevSecOps",
    description:
      "Security as a first-class part of delivery — from pipelines to production.",
  },
  {
    slug: "ai-engineering",
    name: "AI Engineering",
    description:
      "The engineering discipline behind building reliable, evaluable AI-powered systems.",
  },
  {
    slug: "security",
    name: "Security",
    description:
      "Application and platform security for systems that increasingly act on their own.",
  },
  {
    slug: "platform-engineering",
    name: "Platform Engineering",
    description:
      "Internal platforms, golden paths, and developer self-service at scale.",
  },
  {
    slug: "software-architecture",
    name: "Software Architecture",
    description:
      "Structural decisions that determine how systems evolve, scale, and fail.",
  },
  {
    slug: "developer-experience",
    name: "Developer Experience",
    description:
      "The tooling, feedback loops, and ergonomics that make engineering teams fast.",
  },
];

export function getTopicBySlug(slug: string): TopicDefinition | undefined {
  return topics.find((topic) => topic.slug === slug);
}
