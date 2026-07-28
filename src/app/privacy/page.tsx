import { Container } from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung gemäß DSGVO.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="prose prose-article max-w-2xl">
        <h1>Datenschutzerklärung</h1>

        <h2>1) Einleitung und Kontaktdaten des Verantwortlichen</h2>
        <p>
          1.1 Wir freuen uns, dass Sie unsere Website besuchen, und bedanken
          uns für Ihr Interesse. Im Folgenden informieren wir Sie über den
          Umgang mit Ihren personenbezogenen Daten bei der Nutzung unserer
          Website. Personenbezogene Daten sind hierbei alle Daten, mit denen
          Sie persönlich identifiziert werden können.
        </p>
        <p>
          1.2 Verantwortlicher für die Datenverarbeitung auf dieser Website
          im Sinne der Datenschutz-Grundverordnung (DSGVO) ist Dominik Hahn,
          Raiffeisenstraße 4b, 55491 Büchenbeuren, Deutschland, Tel.:
          +4915156065285, E-Mail: dominik87hahn@gmail.com. Der für die
          Verarbeitung von personenbezogenen Daten Verantwortliche ist
          diejenige natürliche oder juristische Person, die allein oder
          gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung
          von personenbezogenen Daten entscheidet.
        </p>

        <h2>2) Datenerfassung beim Besuch unserer Website</h2>
        <p>
          2.1 Bei der bloß informatorischen Nutzung unserer Website, also
          wenn Sie sich nicht registrieren oder uns anderweitig
          Informationen übermitteln, erheben wir nur solche Daten, die Ihr
          Browser an den Seitenserver übermittelt (sog.
          &bdquo;Server-Logfiles&ldquo;). Wenn Sie unsere Website aufrufen,
          erheben wir die folgenden Daten, die für uns technisch
          erforderlich sind, um Ihnen die Website anzuzeigen:
        </p>
        <ul>
          <li>Unsere besuchte Website</li>
          <li>Datum und Uhrzeit zum Zeitpunkt des Zugriffes</li>
          <li>Menge der gesendeten Daten in Byte</li>
          <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
          <li>Verwendeter Browser</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Verwendete IP-Adresse (ggf.: in anonymisierter Form)</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis
          unseres berechtigten Interesses an der Verbesserung der
          Stabilität und Funktionalität unserer Website. Eine Weitergabe
          oder anderweitige Verwendung der Daten findet nicht statt. Wir
          behalten uns allerdings vor, die Server-Logfiles nachträglich zu
          überprüfen, sollten konkrete Anhaltspunkte auf eine rechtswidrige
          Nutzung hinweisen.
        </p>
        <p>
          2.2 Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
          Übertragung personenbezogener Daten und anderer vertraulicher
          Inhalte (z.B. Bestellungen oder Anfragen an den Verantwortlichen)
          eine SSL- bzw. TLS-Verschlüsselung. Sie können eine verschlüsselte
          Verbindung an der Zeichenfolge &bdquo;https://&ldquo; und dem
          Schloss-Symbol in Ihrer Browserzeile erkennen.
        </p>

        <h2>3) Hosting &amp; Content-Delivery-Network</h2>
        <p>
          3.1 Für das Hosting unserer Website und die Darstellung der
          Seiteninhalte nutzen wir einen Anbieter, der seine Leistungen
          selbst oder durch ausgewählte Sub-Unternehmer ausschließlich auf
          Servern innerhalb der Europäischen Union erbringt. Sämtliche auf
          unserer Website erhobenen Daten werden auf diesen Servern
          verarbeitet. Wir haben mit dem Anbieter einen
          Auftragsverarbeitungsvertrag geschlossen, der den Schutz der Daten
          unserer Seitenbesucher sicherstellt und eine unberechtigte
          Weitergabe an Dritte untersagt.
        </p>
        <p>
          3.2 Cloudflare
          <br />
          Wir nutzen ein Content Delivery Network des folgenden Anbieters:
          Cloudflare Inc., 101 Townsend St. San Francisco, CA 94107, USA.
          Dieser Dienst ermöglicht uns, große Mediendateien wie Grafiken,
          Seiteninhalte oder Skripte über ein Netz regional verteilter
          Server schneller auszuliefern. Die Verarbeitung erfolgt zur
          Wahrung unseres berechtigten Interesses an der Verbesserung der
          Stabilität und Funktionalität unserer Website gem. Art. 6 Abs. 1
          lit. f DSGVO. Wir haben mit dem Anbieter einen
          Auftragsverarbeitungsvertrag geschlossen, der den Schutz der Daten
          unserer Seitenbesucher sicherstellt und eine unberechtigte
          Weitergabe an Dritte untersagt. Für Datenübermittlungen in die USA
          hat sich der Anbieter dem EU-US-Datenschutzrahmen (EU-US Data
          Privacy Framework) angeschlossen, das auf Basis eines
          Angemessenheitsbeschlusses der Europäischen Kommission die
          Einhaltung des europäischen Datenschutzniveaus sicherstellt.
        </p>

        <h2>4) Kontaktaufnahme</h2>
        <p>
          Im Rahmen der Kontaktaufnahme mit uns (z.B. per Kontaktformular
          oder E-Mail) werden personenbezogene Daten erhoben. Welche Daten
          im Falle der Nutzung eines Kontaktformulars erhoben werden, ist
          aus dem jeweiligen Kontaktformular ersichtlich. Diese Daten werden
          ausschließlich zum Zweck der Beantwortung Ihres Anliegens bzw.
          für die Kontaktaufnahme und die damit verbundene technische
          Administration gespeichert und verwendet.
        </p>
        <p>
          Rechtsgrundlage für die Verarbeitung dieser Daten ist unser
          berechtigtes Interesse an der Beantwortung Ihres Anliegens gemäß
          Art. 6 Abs. 1 lit. f DSGVO. Zielt Ihre Kontaktierung auf den
          Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage
          für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO. Ihre Daten werden
          nach abschließender Bearbeitung Ihrer Anfrage gelöscht. Dies ist
          der Fall, wenn sich aus den Umständen entnehmen lässt, dass der
          betroffene Sachverhalt abschließend geklärt ist und sofern keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>

        <h2>5) Rechte des Betroffenen</h2>
        <p>
          5.1 Das geltende Datenschutzrecht gewährt Ihnen gegenüber dem
          Verantwortlichen hinsichtlich der Verarbeitung Ihrer
          personenbezogenen Daten die nachstehenden Betroffenenrechte
          (Auskunfts- und Interventionsrechte), wobei für die jeweiligen
          Ausübungsvoraussetzungen auf die angeführte Rechtsgrundlage
          verwiesen wird:
        </p>
        <ul>
          <li>Auskunftsrecht gemäß Art. 15 DSGVO;</li>
          <li>Recht auf Berichtigung gemäß Art. 16 DSGVO;</li>
          <li>Recht auf Löschung gemäß Art. 17 DSGVO;</li>
          <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO;</li>
          <li>Recht auf Unterrichtung gemäß Art. 19 DSGVO;</li>
          <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO;</li>
          <li>
            Recht auf Widerruf erteilter Einwilligungen gemäß Art. 7 Abs. 3
            DSGVO;
          </li>
          <li>Recht auf Beschwerde gemäß Art. 77 DSGVO.</li>
        </ul>
        <p>
          <strong>5.2 Widerspruchsrecht</strong>
          <br />
          Wenn wir im Rahmen einer Interessenabwägung Ihre
          personenbezogenen Daten aufgrund unseres überwiegenden
          berechtigten Interesses verarbeiten, haben Sie das jederzeitige
          Recht, aus Gründen, die sich aus Ihrer besonderen Situation
          ergeben, gegen diese Verarbeitung Widerspruch mit Wirkung für die
          Zukunft einzulegen.
        </p>
        <p>
          Machen Sie von Ihrem Widerspruchsrecht Gebrauch, beenden wir die
          Verarbeitung der betroffenen Daten. Eine Weiterverarbeitung
          bleibt aber vorbehalten, wenn wir zwingende schutzwürdige Gründe
          für die Verarbeitung nachweisen können, die Ihre Interessen,
          Grundrechte und Grundfreiheiten überwiegen, oder wenn die
          Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen dient.
        </p>
        <p>
          Werden Ihre personenbezogenen Daten von uns verarbeitet, um
          Direktwerbung zu betreiben, haben Sie das Recht, jederzeit
          Widerspruch gegen die Verarbeitung Sie betreffender
          personenbezogener Daten zum Zwecke derartiger Werbung
          einzulegen. Sie können den Widerspruch wie oben beschrieben
          ausüben. Machen Sie von Ihrem Widerspruchsrecht Gebrauch, beenden
          wir die Verarbeitung der betroffenen Daten zu
          Direktwerbezwecken.
        </p>

        <h2>6) Dauer der Speicherung personenbezogener Daten</h2>
        <p>
          Die Dauer der Speicherung von personenbezogenen Daten bemisst
          sich anhand der jeweiligen Rechtsgrundlage, am
          Verarbeitungszweck und &ndash; sofern einschlägig &ndash;
          zusätzlich anhand der jeweiligen gesetzlichen Aufbewahrungsfrist
          (z.B. handels- und steuerrechtliche Aufbewahrungsfristen).
        </p>
        <p>
          Bei der Verarbeitung von personenbezogenen Daten auf Grundlage
          einer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a
          DSGVO werden die betroffenen Daten so lange gespeichert, bis Sie
          Ihre Einwilligung widerrufen.
        </p>
        <p>
          Existieren gesetzliche Aufbewahrungsfristen für Daten, die im
          Rahmen rechtsgeschäftlicher bzw. rechtsgeschäftsähnlicher
          Verpflichtungen auf der Grundlage von Art. 6 Abs. 1 lit. b DSGVO
          verarbeitet werden, werden diese Daten nach Ablauf der
          Aufbewahrungsfristen routinemäßig gelöscht, sofern sie nicht mehr
          zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind
          und/oder unsererseits kein berechtigtes Interesse an der
          Weiterspeicherung fortbesteht.
        </p>
        <p>
          Bei der Verarbeitung von personenbezogenen Daten auf Grundlage
          von Art. 6 Abs. 1 lit. f DSGVO werden diese Daten so lange
          gespeichert, bis Sie Ihr Widerspruchsrecht nach Art. 21 Abs. 1
          DSGVO ausüben, es sei denn, wir können zwingende schutzwürdige
          Gründe für die Verarbeitung nachweisen, die Ihre Interessen,
          Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der
          Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen.
        </p>
        <p>
          Bei der Verarbeitung von personenbezogenen Daten zum Zwecke der
          Direktwerbung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO werden
          diese Daten so lange gespeichert, bis Sie Ihr Widerspruchsrecht
          nach Art. 21 Abs. 2 DSGVO ausüben.
        </p>
        <p>
          Sofern sich aus den sonstigen Informationen dieser Erklärung über
          spezifische Verarbeitungssituationen nichts anderes ergibt,
          werden gespeicherte personenbezogene Daten im Übrigen dann
          gelöscht, wenn sie für die Zwecke, für die sie erhoben oder auf
          sonstige Weise verarbeitet wurden, nicht mehr notwendig sind.
        </p>

        <hr />

        <p className="text-sm text-muted-foreground">
          Diese Datenschutzerklärung wurde von den Fachanwälten der
          IT-Recht Kanzlei erstellt und ist urheberrechtlich geschützt (
          <a
            href="https://www.it-recht-kanzlei.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            it-recht-kanzlei.de
          </a>
          ).
          <br />
          Stand: 28.07.2026
        </p>
      </div>
    </Container>
  );
}
