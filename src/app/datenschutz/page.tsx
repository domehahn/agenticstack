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

        <p>
          <strong>Stand: August 2026</strong>
        </p>

        <h2>1. Verantwortlicher</h2>

        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
          und anderer datenschutzrechtlicher Vorschriften ist:
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
          <a href="mailto:aboutdevops@gmail.com">
            aboutdevops@gmail.com
          </a>
        </p>

        <h2>2. Allgemeine Hinweise zur Datenverarbeitung</h2>

        <p>
          Personenbezogene Daten sind alle Informationen, die sich auf eine
          identifizierte oder identifizierbare natürliche Person beziehen.
          Hierzu können insbesondere IP-Adressen, Kommunikationsdaten und
          technische Nutzungsdaten gehören.
        </p>

        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur
          Bereitstellung, Absicherung und Optimierung dieser Website, zur
          Bearbeitung von Anfragen oder zur Erfüllung gesetzlicher Pflichten
          erforderlich ist.
        </p>

        <h2>3. Aufruf und Bereitstellung der Website</h2>

        <p>
          Beim Aufruf dieser Website werden technisch erforderliche
          Informationen zwischen Ihrem Endgerät, Ihrem Browser und der
          eingesetzten Web-Infrastruktur übertragen. Ohne diese Verarbeitung
          kann die Website nicht an Ihr Endgerät ausgeliefert werden.
        </p>

        <p>Dabei können insbesondere folgende Daten verarbeitet werden:</p>

        <ul>
          <li>IP-Adresse des zugreifenden Endgeräts,</li>
          <li>Datum und Uhrzeit des Zugriffs,</li>
          <li>aufgerufene Adresse beziehungsweise URL,</li>
          <li>übertragene Datenmenge,</li>
          <li>HTTP-Methode und HTTP-Statuscode,</li>
          <li>Referrer-URL, sofern vom Browser übertragen,</li>
          <li>
            Browsertyp, Browserversion, Betriebssystem und User-Agent,
          </li>
          <li>
            technische Informationen zur Verbindung, Auslieferung und
            Absicherung der Website.
          </li>
        </ul>

        <p>
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO. Unser berechtigtes Interesse besteht in der sicheren,
          stabilen, performanten und fehlerfreien Bereitstellung unseres
          Internetangebots.
        </p>

        <h2>4. Hosting, Content Delivery und Sicherheit durch Cloudflare</h2>

        <p>
          Diese Website wird über Dienste von Cloudflare bereitgestellt und
          abgesichert. Cloudflare wird insbesondere als Hosting- und
          Content-Delivery-Infrastruktur, Reverse-Proxy sowie zum Schutz vor
          Angriffen, missbräuchlichen Zugriffen und Überlastung eingesetzt.
        </p>

        <p>Anbieter der Cloudflare-Dienste sind insbesondere:</p>

        <p>
          Cloudflare, Inc.
          <br />
          101 Townsend Street
          <br />
          San Francisco, California 94107
          <br />
          USA
        </p>

        <p>sowie die europäische Konzerngesellschaft:</p>

        <p>
          Cloudflare Germany GmbH
          <br />
          c/o Design Offices München Atlas
          <br />
          Rosenheimer Straße 143C, 8. Etage
          <br />
          81671 München
          <br />
          Deutschland
        </p>

        <p>
          Da sämtliche Anfragen über das Netzwerk von Cloudflare geleitet
          werden, verarbeitet Cloudflare die in Abschnitt 3 genannten
          technischen Zugriffsdaten. Die Verarbeitung dient insbesondere:
        </p>

        <ul>
          <li>der Auslieferung und Zwischenspeicherung von Inhalten,</li>
          <li>der Verkürzung von Ladezeiten,</li>
          <li>der Erkennung und Abwehr von Angriffen,</li>
          <li>dem Schutz vor Bots, Missbrauch und Überlastung,</li>
          <li>der Fehleranalyse und Sicherstellung der Verfügbarkeit.</li>
        </ul>

        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
          Interesse liegt in der sicheren, zuverlässigen und effizienten
          Bereitstellung dieser Website.
        </p>

        <p>
          Soweit Cloudflare personenbezogene Daten in unserem Auftrag
          verarbeitet, erfolgt dies auf Grundlage der geltenden
          Vertragsbedingungen und des Data Processing Addendum von
          Cloudflare.
        </p>

        <p>
          Weitere Informationen finden Sie in der{" "}
          <a
            href="https://www.cloudflare.com/de-de/privacypolicy/"
            target="_blank"
            rel="noreferrer"
          >
            Datenschutzerklärung von Cloudflare
          </a>{" "}
          und im{" "}
          <a
            href="https://www.cloudflare.com/cloudflare-customer-dpa/"
            target="_blank"
            rel="noreferrer"
          >
            Data Processing Addendum
          </a>
          .
        </p>

        <h2>5. Server- und Sicherheitsprotokolle</h2>

        <p>
          Cloudflare kann technische Protokoll- und Sicherheitsdaten
          verarbeiten, um die Website bereitzustellen, Fehler zu analysieren,
          Angriffe zu erkennen und die Stabilität der Infrastruktur
          sicherzustellen.
        </p>

        <p>
          Die Protokolldaten werden nur so lange gespeichert, wie dies für
          den jeweiligen Betriebs- oder Sicherheitszweck erforderlich ist.
          Eine längere Speicherung kann erfolgen, wenn ein konkreter
          Sicherheitsvorfall untersucht werden muss oder gesetzliche
          Aufbewahrungspflichten bestehen. Anschließend werden die Daten
          gelöscht oder anonymisiert.
        </p>

        <h2>6. Cloudflare Web Analytics</h2>

        <p>
          Wir verwenden Cloudflare Web Analytics, um die Nutzung und die
          technische Performance dieser Website statistisch auszuwerten.
          Dadurch können wir beispielsweise erkennen, welche Inhalte häufig
          aufgerufen werden und wie schnell beziehungsweise stabil die
          Website auf unterschiedlichen Geräten und Browsern funktioniert.
        </p>

        <p>
          Cloudflare Web Analytics verwendet ein JavaScript-Beacon. Das
          Skript wird von{" "}
          <code>static.cloudflareinsights.com/beacon.min.js</code> geladen.
          Bei Websites, die über Cloudflare bereitgestellt werden, werden die
          Messdaten grundsätzlich an einen Endpunkt unter{" "}
          <code>/cdn-cgi/rum</code> auf der aufgerufenen Domain übertragen.
        </p>

        <p>
          Im Rahmen der Auswertung können insbesondere folgende Informationen
          verarbeitet werden:
        </p>

        <ul>
          <li>aufgerufene Domain und aufgerufener Seitenpfad,</li>
          <li>Seitenaufrufe und Zeitpunkte der Aufrufe,</li>
          <li>Herkunftsseite beziehungsweise Referrer,</li>
          <li>ungefähres Herkunftsland,</li>
          <li>Gerätetyp, Browser und Betriebssystem,</li>
          <li>Art des Navigationsvorgangs,</li>
          <li>
            technische Ladezeit- und Performanceinformationen,
            einschließlich sogenannter Core Web Vitals.
          </li>
        </ul>

        <p>
          Bei der technischen Übertragung von Daten an einen Webserver fällt
          außerdem zwangsläufig die IP-Adresse des zugreifenden Endgeräts an.
          Nach Angaben von Cloudflare wird die IP-Adresse im Rahmen von
          Cloudflare Web Analytics nicht dazu verwendet, einzelne Personen
          zu identifizieren oder wiederzuerkennen.
        </p>

        <p>
          Nach Angaben von Cloudflare verwendet Cloudflare Web Analytics
          keine Cookies, keinen Local Storage und keine sonstigen
          clientseitigen Kennungen zur Wiedererkennung von Besuchern. Es
          erfolgt kein Fingerprinting anhand der IP-Adresse, des User-Agents
          oder anderer Geräteeigenschaften und keine websiteübergreifende
          Verfolgung einzelner Personen.
        </p>

        <p>
          Cloudflare gibt an, nicht aggregierte Beacon-Daten für sieben Tage
          aufzubewahren. Anschließend werden die Daten aggregiert und in
          reduzierter Form weiter gespeichert. Die Auswertungen im
          Cloudflare-Dashboard sind derzeit für einen Zeitraum von bis zu
          sechs Monaten abrufbar.
        </p>

        <p>
          Soweit bei der technischen Durchführung personenbezogene Daten
          verarbeitet werden, erfolgt die Verarbeitung auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in
          der statistischen Auswertung, der Erkennung technischer Probleme
          sowie der Verbesserung von Inhalt, Stabilität, Bedienbarkeit und
          Performance unserer Website.
        </p>

        <p>
          Weitere Informationen finden Sie in der{" "}
          <a
            href="https://developers.cloudflare.com/web-analytics/about/"
            target="_blank"
            rel="noreferrer"
          >
            Dokumentation zu Cloudflare Web Analytics
          </a>{" "}
          und den{" "}
          <a
            href="https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/"
            target="_blank"
            rel="noreferrer"
          >
            Informationen zur Datenerhebung
          </a>
          .
        </p>

        <h2>7. Cookies und lokale Speicherung</h2>

        <h3>7.1 Cloudflare Web Analytics</h3>

        <p>
          Cloudflare Web Analytics setzt nach Angaben von Cloudflare keine
          Cookies und verwendet weder den Local Storage noch den Session
          Storage Ihres Browsers zur Wiedererkennung oder Analyse von
          Besuchern.
        </p>

        <h3>7.2 Technisch erforderliche Cloudflare-Cookies</h3>

        <p>
          Abhängig von den aktivierten Sicherheitsfunktionen und der
          Bewertung einer konkreten Anfrage kann Cloudflare technisch
          erforderliche Cookies setzen. Dies kann insbesondere der Fall
          sein, wenn eine Anfrage als ungewöhnlich erkannt, eine
          Sicherheitsprüfung durchgeführt oder eine Challenge angezeigt
          wird.
        </p>

        <p>
          Hierzu können beispielsweise die Cookies <code>cf_clearance</code>{" "}
          oder <code>__cf_bm</code> gehören. Diese Cookies dienen der
          Unterscheidung legitimer Zugriffe von automatisierten oder
          missbräuchlichen Zugriffen und nicht der Erstellung von
          Marketingprofilen.
        </p>

        <p>
          Soweit solche Cookies eingesetzt werden, erfolgt die Speicherung
          auf Grundlage von § 25 Abs. 2 Nr. 2 TDDDG, da sie für die sichere
          Bereitstellung des von Ihnen aufgerufenen digitalen Dienstes
          erforderlich ist.
        </p>

        <p>
          Weitere Informationen enthält die{" "}
          <a
            href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/"
            target="_blank"
            rel="noreferrer"
          >
            Übersicht der Cloudflare-Cookies
          </a>
          .
        </p>

        <h3>7.3 Speicherung der Darstellungseinstellung</h3>

        <p>
          Diese Website ermöglicht die Auswahl zwischen einer hellen, einer
          dunklen und einer vom Betriebssystem abhängigen Darstellung. Wenn
          Sie eine Darstellung auswählen, wird diese Auswahl lokal in Ihrem
          Browser gespeichert. Hierfür wird grundsätzlich der
          Local-Storage-Schlüssel <code>theme</code> verwendet.
        </p>

        <p>
          Die gespeicherte Information enthält ausschließlich die gewählte
          Darstellungseinstellung. Sie wird nicht zu Analyse- oder
          Marketingzwecken verwendet und nicht an uns oder Dritte übertragen.
        </p>

        <p>
          Die Speicherung erfolgt gemäß § 25 Abs. 2 Nr. 2 TDDDG, da sie
          erforderlich ist, um die von Ihnen gewählte Darstellung bei
          weiteren Seitenaufrufen beizubehalten.
        </p>

        <h2>8. Kontaktaufnahme per E-Mail</h2>

        <p>
          Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen
          übermittelten Daten. Hierzu gehören insbesondere:
        </p>

        <ul>
          <li>Ihre E-Mail-Adresse,</li>
          <li>Ihr Name, sofern angegeben,</li>
          <li>Betreff und Inhalt Ihrer Nachricht,</li>
          <li>weitere von Ihnen übermittelte Informationen und Anhänge,</li>
          <li>technische Metadaten der E-Mail-Kommunikation.</li>
        </ul>

        <p>
          Die Verarbeitung erfolgt zur Bearbeitung und Beantwortung Ihrer
          Anfrage.
        </p>

        <p>
          Bezieht sich Ihre Anfrage auf die Anbahnung oder Durchführung eines
          Vertrags, ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage. Bei
          sonstigen Anfragen erfolgt die Verarbeitung auf Grundlage von Art. 6
          Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in der
          sachgerechten Bearbeitung der an uns gerichteten Kommunikation.
        </p>

        <p>
          Die Daten werden gelöscht, sobald Ihre Anfrage abschließend
          bearbeitet wurde und keine gesetzlichen Aufbewahrungspflichten oder
          berechtigten Gründe für eine weitere Speicherung bestehen.
        </p>

        <p>
          Bei der E-Mail-Kommunikation können die von uns sowie die von Ihnen
          eingesetzten E-Mail- und Infrastrukturprovider als Empfänger oder
          Auftragsverarbeiter beteiligt sein.
        </p>

        <h2>9. Externe Links</h2>

        <p>
          Diese Website enthält Links zu externen Angeboten, insbesondere zu
          GitHub und zu weiterführenden Informationsquellen. Durch das bloße
          Anzeigen eines normalen Textlinks werden grundsätzlich keine Daten
          an die verlinkte Website übertragen.
        </p>

        <p>
          Erst wenn Sie einen externen Link aufrufen, verlassen Sie
          AgenticStack. Für die anschließende Datenverarbeitung ist der
          jeweilige Betreiber des externen Angebots verantwortlich. Es gelten
          dessen Datenschutzbestimmungen.
        </p>

        <h2>10. Empfänger personenbezogener Daten</h2>

        <p>
          Personenbezogene Daten werden nur an Empfänger übermittelt, wenn
          dies zur Erfüllung der beschriebenen Zwecke erforderlich ist, eine
          gesetzliche Verpflichtung besteht oder eine andere Rechtsgrundlage
          die Übermittlung erlaubt.
        </p>

        <p>Zu den möglichen Empfängern gehören insbesondere:</p>

        <ul>
          <li>Cloudflare und verbundene Cloudflare-Unternehmen,</li>
          <li>eingesetzte IT-, Hosting- und E-Mail-Dienstleister,</li>
          <li>
            Behörden, Gerichte oder andere öffentliche Stellen, soweit eine
            gesetzliche Verpflichtung besteht,
          </li>
          <li>
            Rechts- und Fachberater, soweit dies zur Wahrung unserer Rechte
            erforderlich ist.
          </li>
        </ul>

        <h2>11. Datenübermittlungen in Drittländer</h2>

        <p>
          Cloudflare ist eine international tätige Unternehmensgruppe mit
          Hauptsitz in den USA. Im Rahmen der Bereitstellung der
          Cloudflare-Dienste kann eine Verarbeitung personenbezogener Daten
          außerhalb des Europäischen Wirtschaftsraums, insbesondere in den
          USA, stattfinden.
        </p>

        <p>
          Cloudflare gibt an, für Übermittlungen in die USA unter anderem auf
          seine Zertifizierung nach dem EU-U.S. Data Privacy Framework zu
          vertrauen. Soweit ein Angemessenheitsbeschluss nicht anwendbar ist,
          sieht das Data Processing Addendum von Cloudflare die Verwendung
          der Standardvertragsklauseln der Europäischen Kommission und
          ergänzender Schutzmaßnahmen vor.
        </p>

        <p>
          Trotz dieser Mechanismen kann bei einer Verarbeitung in
          Drittländern nicht ausgeschlossen werden, dass dortige Behörden
          unter den Voraussetzungen des jeweiligen nationalen Rechts Zugriff
          auf Daten erhalten.
        </p>

        <h2>12. Ihre Rechte als betroffene Person</h2>

        <p>
          Soweit die gesetzlichen Voraussetzungen erfüllt sind, stehen Ihnen
          insbesondere folgende Rechte zu:
        </p>

        <ul>
          <li>Auskunft gemäß Art. 15 DSGVO,</li>
          <li>Berichtigung gemäß Art. 16 DSGVO,</li>
          <li>Löschung gemäß Art. 17 DSGVO,</li>
          <li>
            Einschränkung der Verarbeitung gemäß Art. 18 DSGVO,
          </li>
          <li>Datenübertragbarkeit gemäß Art. 20 DSGVO,</li>
          <li>Widerspruch gemäß Art. 21 DSGVO.</li>
        </ul>

        <p>
          Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an die in
          Abschnitt 1 genannte E-Mail-Adresse.
        </p>

        <h2>13. Widerspruch gegen die Verarbeitung</h2>

        <p>
          Erfolgt eine Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO, haben Sie gemäß Art. 21 DSGVO das Recht, aus Gründen, die
          sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die
          Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.
        </p>

        <p>
          Wir verarbeiten die betroffenen personenbezogenen Daten anschließend
          nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe
          für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und
          Freiheiten überwiegen, oder die Verarbeitung dient der
          Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
        </p>

        <h2>14. Beschwerderecht bei einer Aufsichtsbehörde</h2>

        <p>
          Sie haben gemäß Art. 77 DSGVO das Recht, sich bei einer
          Datenschutzaufsichtsbehörde zu beschweren. Dies gilt insbesondere
          bei der Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsorts, Ihres
          Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
        </p>

        <p>Für den Verantwortlichen zuständig ist grundsätzlich:</p>

        <p>
          Der Landesbeauftragte für den Datenschutz und die
          Informationsfreiheit Rheinland-Pfalz
          <br />
          Hintere Bleiche 34
          <br />
          55116 Mainz
          <br />
          Deutschland
          <br />
          E-Mail:{" "}
          <a href="mailto:poststelle@datenschutz.rlp.de">
            poststelle@datenschutz.rlp.de
          </a>
          <br />
          Website:{" "}
          <a
            href="https://www.datenschutz.rlp.de/"
            target="_blank"
            rel="noreferrer"
          >
            www.datenschutz.rlp.de
          </a>
        </p>

        <h2>15. Automatisierte Entscheidungsfindung</h2>

        <p>
          Es findet keine automatisierte Entscheidungsfindung einschließlich
          Profiling im Sinne von Art. 22 DSGVO statt.
        </p>

        <h2>16. Änderungen dieser Datenschutzerklärung</h2>

        <p>
          Wir können diese Datenschutzerklärung anpassen, wenn sich die
          Website, die eingesetzten Dienste, die Datenverarbeitungen oder die
          rechtlichen Anforderungen ändern.
        </p>

        <p>
          Es gilt die jeweils auf dieser Seite veröffentlichte aktuelle
          Fassung.
        </p>
      </div>
    </Container>
  );
}