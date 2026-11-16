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
          This publication is written for engineers who already know DevSecOps,
          platform engineering, and software architecture, and who want a
          rigorous, unhyped look at what agentic engineering actually requires:
          context engineering, spec-driven development, skills, MCP, and the
          security model that has to sit underneath all of it.
        </p>

        <h2>About the Author</h2>
        <p>
          <strong>{author.name}</strong> — {author.role}.
        </p>
        <p>
          With a Master of Science in Computer Science (focused on application
          development) and a certification in software architecture (iSAQB
          CPSA-F), my path in software engineering spans more than a decade
          across the full lifecycle — from classical backend development to
          enterprise architecture consulting, cloud-native platforms, and
          DevSecOps in regulated industries.
        </p>

        <h3>From Backend Engineering to Distributed Systems</h3>
        <p>
          I started out as a classical software engineer building backend
          modules, calculation kernels, and online application workflows in the
          financial sector. Early on, that meant working close to the metal of
          enterprise systems: Java-based services, complex third-party and
          scoring integrations, relational database migrations, load and UI
          test automation, GDPR data-deletion concepts, and application
          security work.
        </p>

        <h3>Architecture Consulting &amp; Cloud-Native Modernization</h3>
        <p>
          Moving into technical consulting and software architecture, my focus
          shifted toward modernizing legacy landscapes into distributed,
          cloud-native systems. Across numerous projects, I designed and built
          microservices and self-contained systems (Java, Spring Boot, Go),
          established API strategies around REST, GraphQL, and centralized
          OpenAPI governance, and guided teams through containerization,
          proof-of-concept evaluations, and architectural refactoring.
        </p>

        <h3>DevSecOps, Kubernetes Platforms &amp; Agentic Engineering</h3>
        <p>
          In recent years, I have worked primarily at the intersection of
          architecture, development, security, and operations as a Senior
          DevOps and DevSecOps Engineer in large enterprise environments:
        </p>
        <ul>
          <li>
            <strong>Platform &amp; Infrastructure Automation:</strong> Building
            and operating reproducible Kubernetes platforms using Infrastructure
            as Code (Terraform, Ansible, Helm) and Git-based workflows.
          </li>
          <li>
            <strong>DevSecOps &amp; Pipeline Governance:</strong> Designing
            GitLab CI/CD pipelines with integrated source-code and container
            vulnerability scanning, hardened container base images, and
            automated compliance jobs.
          </li>
          <li>
            <strong>Resilience &amp; Security Architecture:</strong> Contributing
            to architecture boards, fault-tolerance patterns, DDoS and
            rate-limiting concepts, and mentoring engineering teams.
          </li>
          <li>
            <strong>AI-Native &amp; Agentic Workflows:</strong> Combining proven
            DevSecOps guardrails and software architecture principles with
            autonomous coding agents, MCP, and spec-driven engineering.
          </li>
        </ul>
      </div>
    </Container>
  );
}
