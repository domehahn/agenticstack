import { Container } from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Datenschutz",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten bei der Nutzung von AgenticStack.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="prose prose-article max-w-2xl">
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
          ist:
        </p>
        <p>
          Dominik Hahn
          <br />
          Raiffeisenstraße 4B
          <br />
          55491 Büchenbeuren
          <br />
          Deutschland
          <br />
          E-Mail:{" "}
          <a href="mailto:aboutdevops@gmail.com">aboutdevops@gmail.com</a>
        </p>

        <h2>2. Allgemeines zur Datenverarbeitung</h2>
        <p>
          Beim Abruf dieser Website werden technisch erforderliche Daten
          verarbeitet, damit die Website an Ihr Endgerät ausgeliefert,
          gegen Missbrauch geschützt und betrieben werden kann. Ohne diese
          Verarbeitung, insbesondere der IP-Adresse Ihres Endgeräts, kann
          eine Website technisch nicht ausgeliefert werden.
        </p>

        <h2>3. Hosting und Bereitstellung über Cloudflare</h2>
        <p>
          Diese Website wird nach Angabe des Betreibers über Cloudflare
          bereitgestellt. Cloudflare wird dabei als Reverse-Proxy bzw.
          Content-Delivery-Network eingesetzt, über das sämtliche Aufrufe
          dieser Website geleitet werden.
        </p>
        <p>
          Im Rahmen des Betriebs können dabei folgende Daten verarbeitet
          werden:
        </p>
        <ul>
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit des Requests</li>
          <li>angeforderte URL</li>
          <li>HTTP-Methode und HTTP-Statuscode</li>
          <li>Referrer, sofern von Ihrem Browser übertragen</li>
          <li>User-Agent (Browser- und Betriebssysteminformationen)</li>
          <li>
            weitere technische Informationen, die zur Zustellung eines
            Requests oder zur Abwehr von Missbrauch erforderlich sind
          </li>
        </ul>
        <p>
          Diese Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO. Unser berechtigtes Interesse liegt darin, die Website
          zuverlässig auszuliefern, ihre Stabilität sicherzustellen und sie
          vor Angriffen, Missbrauch und Überlastung zu schützen.
        </p>

        <h2>4. Cloudflare und internationale Datenübermittlung</h2>
        <p>
          Cloudflare ist eine international tätige Unternehmensgruppe mit
          Sitz in den USA. Im Zusammenhang mit dem Betrieb ihres Netzwerks
          können daher Datenverarbeitungen außerhalb des Europäischen
          Wirtschaftsraums (EWR) relevant sein.
        </p>
        <p>
          Für solche Übermittlungen kommen grundsätzlich Mechanismen wie das
          EU-U.S. Data Privacy Framework, EU-Standardvertragsklauseln
          (Standard Contractual Clauses) oder ein Auftragsverarbeitungsvertrag
          (Data Processing Addendum) des Anbieters in Betracht. Aus dem
          Quellcode dieser Anwendung lässt sich nicht abschließend
          nachweisen, welche konkreten Mechanismen und Serverstandorte im
          Einzelfall zur Anwendung kommen; wir können daher keine Garantie
          dafür abgeben, dass eine Verarbeitung ausschließlich innerhalb
          Deutschlands oder der EU erfolgt.
        </p>

        <h2>5. Server-Logs</h2>
        <p>
          Soweit im Rahmen des Betriebs der in Abschnitt 3 genannten
          Infrastruktur Server-Logfiles geführt werden, dienen diese der
          Fehleranalyse, der Sicherstellung der Systemsicherheit und der
          Abwehr von Angriffen. Eine konkrete Speicherdauer dieser Logs ist
          uns aus dem Quellcode dieser Anwendung nicht bekannt, da die
          Protokollierung auf Ebene der eingesetzten Infrastruktur und nicht
          innerhalb der Anwendung selbst erfolgt.
        </p>

        <h2>6. Lokale Speicherung der Theme-Einstellung</h2>
        <p>
          Diese Website ermöglicht die Auswahl zwischen einer hellen und
          einer dunklen Darstellung. Ihre Auswahl wird ausschließlich lokal
          in Ihrem Browser gespeichert (Local Storage, Schlüssel{" "}
          <code>theme</code>), damit die gewählte Darstellung bei einem
          erneuten Besuch beibehalten werden kann.
        </p>
        <p>
          Diese Speicherung enthält keine personenbezogenen Daten, wird
          nicht an uns oder Dritte übertragen und nicht zu
          Analyse- oder Trackingzwecken verwendet. Sie ist technisch
          erforderlich, um die von Ihnen ausdrücklich gewählte Funktion
          (Beibehaltung der Darstellung) bereitzustellen, und fällt damit
          unter die Ausnahme des § 25 Abs. 2 Nr. 2 TDDDG. Eine Einwilligung
          ist hierfür nicht erforderlich. Es werden keine Cookies gesetzt.
        </p>

        <h2>7. Keine Analyse- und Trackingdienste</h2>
        <p>
          AgenticStack verwendet derzeit keine Analyse-, Marketing- oder
          Trackingdienste. Es findet keine automatisierte
          Entscheidungsfindung im Sinne des Art. 22 DSGVO statt.
        </p>

        <h2>8. Externe Links</h2>
        <p>
          Diese Website enthält Links, unter anderem zu GitHub. Durch das
          bloße Einbinden eines solchen Links werden keine Daten an das
          verlinkte Angebot übertragen. Erst wenn Sie einem Link aktiv
          folgen, verlassen Sie AgenticStack; für die verlinkte Website
          gilt dann deren eigene Datenschutzerklärung.
        </p>

        <h2>9. Ihre Rechte als betroffene Person</h2>
        <p>Ihnen stehen hinsichtlich Ihrer personenbezogenen Daten zu:</p>
        <ul>
          <li>das Auskunftsrecht gemäß Art. 15 DSGVO,</li>
          <li>das Recht auf Berichtigung gemäß Art. 16 DSGVO,</li>
          <li>das Recht auf Löschung gemäß Art. 17 DSGVO,</li>
          <li>
            das Recht auf Einschränkung der Verarbeitung gemäß Art. 18
            DSGVO,
          </li>
          <li>das Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO sowie</li>
          <li>das Widerspruchsrecht gemäß Art. 21 DSGVO.</li>
        </ul>
        <p>
          Zur Ausübung dieser Rechte genügt eine formlose Nachricht an die
          in Abschnitt 1 genannte E-Mail-Adresse.
        </p>

        <h2>10. Beschwerderecht</h2>
        <p>
          Unabhängig davon steht Ihnen ein Beschwerderecht bei einer
          Datenschutzaufsichtsbehörde zu, insbesondere in dem Mitgliedstaat
          Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des
          Ortes des mutmaßlichen Verstoßes.
        </p>

        <h2>11. Aktualität dieser Erklärung</h2>
        <p>
          Diese Datenschutzerklärung wird angepasst, sobald sich die
          Website, die eingesetzte Infrastruktur oder die maßgebliche
          Rechtslage ändern.
        </p>
      </div>
    </Container>
  );
}
