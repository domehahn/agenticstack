# DNS-Konfiguration für agenticstack.eu

**Stand:** 2. August 2026  
**Ziel:** No-Mail-Domain (keine E-Mails über `@agenticstack.eu`)

## Kontext

Die Website **agenticstack.eu** nutzt ausschließlich die private Gmail-Adresse `aboutdevops@gmail.com` für Kontaktanfragen. Es wird **keine** E-Mail-Adresse unter der Domain `agenticstack.eu` verwendet (z.B. `kontakt@agenticstack.eu`).

Daher wird die Domain als **No-Mail-Domain** nach RFC 7505 konfiguriert. Dies verhindert, dass Dritte glaubwürdig wirkende Phishing-Nachrichten mit Absendern wie `admin@agenticstack.eu` versenden können.

**Wichtig:** Diese Konfiguration betrifft nur `agenticstack.eu`. Die private Gmail-Adresse `aboutdevops@gmail.com` bleibt unverändert funktionsfähig.

---

## DNS-Einträge (Zielzustand)

### 1. Null MX (RFC 7505)

Erklärt explizit, dass die Domain **keine E-Mails empfängt**.

| Feld | Wert |
|------|------|
| **Typ** | `MX` |
| **Name** | `@` |
| **Mailserver/Ziel** | `.` |
| **Priorität** | `0` |
| **TTL** | `Auto` |

**Hinweis:** Der einzelne Punkt (`.`) ist beabsichtigt und dokumentiert den Null-MX-Eintrag nach RFC 7505.

**Referenz:** [RFC 7505 - Null MX](https://www.rfc-editor.org/info/rfc7505)

---

### 2. SPF: Keine Absender erlaubt

Erklärt, dass **kein Server** berechtigt ist, E-Mails im Namen von `agenticstack.eu` zu versenden.

| Feld | Wert |
|------|------|
| **Typ** | `TXT` |
| **Name** | `@` |
| **Inhalt** | `v=spf1 -all` |
| **TTL** | `Auto` |

**Wichtig:** Am Apex darf nur **ein einziger** TXT-Eintrag mit `v=spf1` existieren. Mehrere SPF-Einträge sind ungültig.

**Referenz:** [RFC 7208 - SPF](https://www.rfc-editor.org/info/rfc7208)

---

### 3. DMARC: Gefälschte Nachrichten ablehnen

Weist empfangende Mailserver an, nicht authentifizierte Nachrichten von `agenticstack.eu` direkt abzulehnen.

| Feld | Wert |
|------|------|
| **Typ** | `TXT` |
| **Name** | `_dmarc` |
| **Inhalt** | `v=DMARC1; p=reject; sp=reject; pct=100; adkim=s; aspf=s` |
| **TTL** | `Auto` |

**Bedeutung der Parameter:**
- `p=reject`: Gefälschte Nachrichten der Hauptdomain ablehnen
- `sp=reject`: Gilt auch für Subdomains
- `pct=100`: Auf alle betroffenen Nachrichten anwenden
- `adkim=s`: Strikte DKIM-Domainausrichtung
- `aspf=s`: Strikte SPF-Domainausrichtung

**Referenz:** [RFC 7489 - DMARC](https://www.rfc-editor.org/info/rfc7489)

---

### 4. KEIN DKIM

Für eine Domain, die **keine** E-Mails versendet, wird **kein DKIM-Schlüssel benötigt**.

**Nicht anlegen:**
- ❌ `google._domainkey.agenticstack.eu`
- ❌ Andere DKIM-Einträge

Ein Google-DKIM-Schlüssel kann nur durch eine echte Google-Workspace-Administration für die Domain erzeugt werden. Die private Gmail-Adresse `aboutdevops@gmail.com` stellt keinen DKIM-Schlüssel für `agenticstack.eu` bereit.

---

## Cloudflare-Konfiguration

### Schritt 1: Cloudflare Email Routing deaktivieren

**Pfad:** Compute → Email Service → Email Routing

**Aktion:**
- Email Routing sollte **deaktiviert** sein
- Alle Weiterleitungsregeln löschen oder deaktivieren

**Grund:** Email Routing würde eigene MX-, SPF- und DKIM-Einträge anlegen, die für eine No-Mail-Domain unerwünscht sind.

**Referenz:** [Cloudflare Email Routing Docs](https://developers.cloudflare.com/email-service/get-started/route-emails/)

---

### Schritt 2: Bestehende MX-Einträge entfernen

**Pfad:** DNS → Records

**Aktion:**
1. Nach `MX`-Einträgen filtern
2. Alle vorhandenen MX-Einträge löschen (z.B. Google-, Cloudflare- oder andere Mailserver)

**Hinweis:** Ungenutzte MX-Einträge können dazu führen, dass DNS-Scanner fehlende SPF-Einträge bemängeln.

---

### Schritt 3: DNS-Einträge anlegen

Siehe Abschnitt "DNS-Einträge (Zielzustand)" oben.

---

## Erwartetes Ergebnis

Nach erfolgreicher Konfiguration sollten die DNS-Einträge wie folgt aussehen:

```dns
agenticstack.eu.          MX   0 .
agenticstack.eu.          TXT  "v=spf1 -all"
_dmarc.agenticstack.eu.   TXT  "v=DMARC1; p=reject; sp=reject; pct=100; adkim=s; aspf=s"
```

**Keine** Google-MX-Einträge, **kein** `include:_spf.google.com`, **kein** DKIM-Eintrag.

---

## Validierung

### DNS-Abfrage (MX)

```bash
dig MX agenticstack.eu +short
```

**Erwartete Ausgabe:**
```
0 .
```

---

### DNS-Abfrage (SPF)

```bash
dig TXT agenticstack.eu +short
```

**Erwartete Ausgabe (unter anderem):**
```
"v=spf1 -all"
```

---

### DNS-Abfrage (DMARC)

```bash
dig TXT _dmarc.agenticstack.eu +short
```

**Erwartete Ausgabe:**
```
"v=DMARC1; p=reject; sp=reject; pct=100; adkim=s; aspf=s"
```

---

## Auswirkungen

### ✅ Was bleibt funktionsfähig

- **Website:** agenticstack.eu bleibt vollständig erreichbar
- **Gmail:** `aboutdevops@gmail.com` funktioniert unverändert (gehört zu `gmail.com`, nicht zu `agenticstack.eu`)
- **Kontaktformular:** E-Mail-Kontakt über Gmail bleibt möglich

### ⚠️ Was nicht mehr möglich ist

- **E-Mail-Empfang:** `@agenticstack.eu`-Adressen können keine E-Mails empfangen
- **E-Mail-Versand:** Keine Services können authentifiziert E-Mails von `@agenticstack.eu` versenden

### 🛡️ Sicherheitsgewinn

- **Phishing-Schutz:** Empfangende Mailserver lehnen gefälschte Nachrichten von `admin@agenticstack.eu` o.ä. direkt ab
- **Domain-Reputation:** Die Domain kann nicht für Spam oder Phishing missbraucht werden

---

## Referenzen

- [RFC 7505 - A "Null MX" No Service Resource Record for Domains That Accept No Mail](https://www.rfc-editor.org/info/rfc7505)
- [RFC 7208 - Sender Policy Framework (SPF)](https://www.rfc-editor.org/info/rfc7208)
- [RFC 7489 - Domain-based Message Authentication, Reporting, and Conformance (DMARC)](https://www.rfc-editor.org/info/rfc7489)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Google SPF Documentation](https://support.google.com/a/answer/33786)
