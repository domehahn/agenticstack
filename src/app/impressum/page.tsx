import { Container } from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Impressum",
  description: "Anbieterkennzeichnung von AgenticStack.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="prose prose-article max-w-2xl" lang="de">
        <h1>Impressum</h1>

        <h2>Angaben zum Anbieter</h2>
        <p>
          Dominik Hahn
          <br />
          Raiffeisenstraße 4B
          <br />
          55491 Büchenbeuren
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href="mailto:aboutdevops@gmail.com">aboutdevops@gmail.com</a>
        </p>

        <h2>Redaktionell verantwortlich</h2>
        <p>
          Verantwortlich für den journalistisch-redaktionellen Inhalt gemäß
          § 18 Abs. 2 Medienstaatsvertrag (MStV):
        </p>
        <p>
          Dominik Hahn
          <br />
          Raiffeisenstraße 4B
          <br />
          55491 Büchenbeuren
          <br />
          Deutschland
        </p>
      </div>
    </Container>
  );
}
