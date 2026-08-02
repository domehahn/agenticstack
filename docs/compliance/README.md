# Compliance Documentation

Diese Dokumentation beschreibt die Compliance- und Sicherheitsmaßnahmen für AgenticStack.

## Übersicht

AgenticStack ist eine statische, vollständig über Cloudflare Workers Static Assets bereitgestellte Website. Es gibt keine serverseitige Next.js-Runtime und keine per-request-Worker-CPU-Abrechnung.

## Compliance-Status

### Automatisiert behobene Punkte (Repository)

✅ **security.txt nach RFC 9116**  
- Dateipfad: `public/.well-known/security.txt`
- Enthält Contact, Expires, Canonical, Preferred-Languages
- Tests validieren Pflichtfelder und Ablaufdatum

✅ **TDM-Rechtevorbehalt** (Text-and-Data-Mining)  
- Header `tdm-reservation: 1` für eigene redaktionelle Inhalte
- Implementiert in `public/_headers`
- Test prüft Vorhandensein nach Build

✅ **AI Act Transparenz-Frontmatter**  
- Erweiterte Frontmatter-Schema für KI-unterstützte Artikel
- Pflichtfelder für Artikel ab 2026-08-02
- Human-Review-Dokumentation
- Sichtbare Disclosure-Komponente

✅ **Sprachkennzeichnung**  
- Deutsche Rechtsseiten (`lang="de"`)
- Artikel mit optionalem `language`-Frontmatter
- Korrekte Accessibility-Attribute

✅ **Security-Header**  
- CSP, HSTS, X-Frame-Options, Referrer-Policy
- Permissions-Policy
- TDM-Header

### Nur mit Cloudflare-Credentials behebbar

Die folgenden Punkte erfordern Cloudflare-API-Zugriff. Das Repository enthält ein Audit- und Remediation-Tool:

⚠️ **Cloudflare Web Analytics/RUM deaktivieren**  
- Ziel: Kein Client-Side-Beacon, kein `/cdn-cgi/rum`
- Tool: `npm run cloudflare:audit` und `npm run cloudflare:apply`
- Dokumentation: [cloudflare-remediation.md](./cloudflare-remediation.md)

⚠️ **Network Error Logging (NEL) deaktivieren**  
- Ziel: Keine `NEL`- und `cf-nel`-Report-To-Header
- API-Endpunkt: Zone Setting `nel.enabled=false`

⚠️ **Always Use HTTPS aktivieren**  
- Ziel: HTTP → HTTPS Redirect mit 301/308
- API-Endpunkt: Zone Setting `always_use_https=on`

⚠️ **SPF-Eintrag korrigieren**  
- Nur bei eindeutiger Provider-Erkennung
- Tool prüft MX, Cloudflare Email Routing, bestehende SPF
- Keine Änderung ohne Nachweis des tatsächlichen Versanddienstes

⚠️ **Bot Fight Mode aktivieren**  
- Ziel: Schutz vor nicht regelkonformen Scrapern
- Prüfung auf Kompatibilität mit APIs/Webhooks erforderlich

⚠️ **AI Labyrinth aktivieren**  
- Cloudflare-Feature gegen nicht regelkonforme Scraper
- Keine Auswirkung auf normale Besucher

### Manuell zu prüfen und zu entscheiden

Diese Punkte erfordern rechtliche oder organisatorische Entscheidungen:

📋 **Verwendeter E-Mail-Dienst**  
- aboutdevops@gmail.com wird verwendet
- Prüfung erforderlich: privates Gmail oder Google Workspace?
- Cloudflare Email Routing aktiv?
- Datenschutzerklärung muss den tatsächlichen Dienst beschreiben

📋 **Cloudflare DPA und Vertragsstand**  
- Tatsächlich geltende Vertragsbedingungen prüfen
- EU-U.S. Data Privacy Framework-Zertifizierung
- Standardvertragsklauseln
- Keine hypothetischen AVV-Angaben in Datenschutzerklärung

📋 **Zweite unmittelbare Kontaktmöglichkeit**  
- § 5 TMG und § 18 MStV verlangen unmittelbare Erreichbarkeit
- Derzeit nur E-Mail vorhanden
- Keine Telefonnummer oder zweite Kontaktmöglichkeit vorhanden
- Rechtliche Prüfung erforderlich, ob E-Mail allein ausreicht

📋 **AI Crawler Policy**  
- Vorgeschlagene Standard-Policy:
  - Search: allow
  - Agent: allow
  - Training: block
- Entscheidung des Betreibers erforderlich
- Cloudflare AI Crawl Control oder robots.txt

📋 **Redaktionelle Prüfung bestehender Artikel**  
- Welche Artikel wurden mit KI-Unterstützung erstellt?
- Welche Artikel wurden redaktionell geprüft?
- Kein automatisches `humanReviewed: true` setzen

## Verwendete Tools

- `npm run cloudflare:audit` — Dry-Run-Prüfung aller Cloudflare-Einstellungen
- `npm run cloudflare:plan` — Geplante Änderungen anzeigen
- `npm run cloudflare:apply -- --confirm-zone agenticstack.eu` — Änderungen anwenden
- `npm run production:audit` — Produktionsverifikation (HTTP-Header, DNS, etc.)

## Weitere Dokumentation

- [Cloudflare Remediation](./cloudflare-remediation.md) — Cloudflare-API-basierte Änderungen
- [Production Verification](./production-verification.md) — Produktionsprüfung
- [Legal Manual Review](./legal-manual-review.md) — Manuell zu prüfende Punkte
- [Editorial AI Policy](./editorial-ai-policy.md) — Redaktionelle KI-Policy

## Abnahmekriterien

Die Compliance-Umsetzung gilt als abgeschlossen, wenn:

1. ✅ Alle Repository-Änderungen implementiert und getestet
2. ✅ Cloudflare-Audit-Tool implementiert und dokumentiert
3. ⚠️ Cloudflare-Einstellungen geprüft und dokumentiert (Credentials erforderlich)
4. ⚠️ DNS-Einstellungen geprüft und dokumentiert (Credentials erforderlich)
5. ✅ Tests erweitert und erfolgreich
6. ✅ Dokumentation vollständig
7. 📋 Alle manuellen Prüfpunkte dokumentiert und an den Betreiber übergeben
