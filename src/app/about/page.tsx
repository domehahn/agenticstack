import { authors } from "@/config/authors";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: `About ${siteConfig.title}.`,
  path: "/about",
});

export default function AboutPage() {
  const author = authors.dome;

  return (
    <Container className="py-12 sm:py-16">
      <div className="prose prose-article max-w-2xl">
        <h1>About {siteConfig.title}</h1>
        <p className="lead">{siteConfig.description}</p>
        <p>
          Software delivery spent the last decade learning to bake security
          and operations into every stage of the pipeline instead of bolting
          them on at the end. {siteConfig.title} is about the next shift: what
          changes when AI agents, not just humans, are executing steps in
          that pipeline — planning tasks, opening changes, and sometimes
          acting on production systems directly.
        </p>
        <p>
          We write for engineers who already know DevSecOps, platform
          engineering, and software architecture, and who want a rigorous,
          unhyped look at what agentic engineering actually requires:
          context engineering, spec-driven development, skills, MCP, and the
          security model that has to sit underneath all of it.
        </p>
        <h2>Editor</h2>
        <p>
          <strong>{author.name}</strong> — {author.role}. {author.bio}
        </p>
      </div>
    </Container>
  );
}
