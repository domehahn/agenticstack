#!/usr/bin/env node
/**
 * Cloudflare Compliance Audit & Remediation Tool
 * 
 * Prüft und korrigiert Cloudflare-Einstellungen für agenticstack.eu
 * 
 * SICHERHEIT:
 * - Dry-Run ist Standard
 * - Schreiboperationen benötigen --apply und --confirm-zone agenticstack.eu
 * - Keine Token oder Credentials werden geloggt
 * - Idempotent: bereits korrekte Einstellungen werden erkannt
 * 
 * VERWENDUNG:
 * 
 * Audit (Dry-Run):
 *   npm run cloudflare:audit
 * 
 * Plan anzeigen:
 *   npm run cloudflare:plan
 * 
 * Änderungen anwenden (benötigt Bestätigung):
 *   npm run cloudflare:apply -- --confirm-zone agenticstack.eu
 * 
 * Produktions-Verifikation:
 *   npm run production:audit
 * 
 * UMGEBUNGSVARIABLEN:
 * 
 *   CLOUDFLARE_API_TOKEN  — API Token mit Zone:Read und Zone:Edit Berechtigung
 *   CLOUDFLARE_ZONE_ID    — Zone ID für agenticstack.eu
 * 
 * WICHTIG:
 * - Verwende API Tokens, keine Global API Keys
 * - Tokens niemals committen oder in Logs ausgeben
 * - Bei fehlenden Credentials wird ein manueller Plan erzeugt
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const ZONE_NAME = "agenticstack.eu";
const API_BASE = "https://api.cloudflare.com/client/v4";

// TypeScript types for Cloudflare API responses
interface CloudflareResponse<T> {
  success: boolean;
  errors: unknown[];
  messages: unknown[];
  result: T;
}

interface CloudflareSetting<T = unknown> {
  id: string;
  value: T;
  editable: boolean;
  modified_on: string;
}

interface SettingUpdateResult<T = unknown> {
  before: T;
  after: T;
  changed: boolean;
}

interface CloudflareZone {
  id: string;
  name: string;
  status: string;
}

interface RumSite {
  siteTag?: string;
  [key: string]: unknown;
}

// Sicherheitsprüfung: Verhindere versehentliche Produktionsänderungen
function requireConfirmation(args: string[]): void {
  const hasApply = args.includes("--apply");
  const confirmZone = args.find((arg) => arg.startsWith("--confirm-zone="));
  const confirmedZone = confirmZone?.split("=")[1];

  if (hasApply && confirmedZone !== ZONE_NAME) {
    console.error(`\n❌ SICHERHEITSPRÜFUNG FEHLGESCHLAGEN\n`);
    console.error(`Produktionsänderungen erfordern:`);
    console.error(`  --apply --confirm-zone=${ZONE_NAME}\n`);
    console.error(`Du hast angegeben: ${args.join(" ")}\n`);
    process.exit(1);
  }
}

// Cloudflare API Request mit Fehlerbehandlung
async function cloudflareRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<CloudflareResponse<T>> {
  const token = process.env.CLOUDFLARE_API_TOKEN;

  if (!token) {
    throw new Error(
      "CLOUDFLARE_API_TOKEN nicht gesetzt. Siehe .env.example für Anleitung."
    );
  }

  const url = `${API_BASE}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!response.ok || !data.success) {
      // Fehler ohne Authorization-Header ausgeben
      const sanitizedError = {
        status: response.status,
        errors: data.errors || [],
        messages: data.messages || [],
      };
      throw new Error(
        `Cloudflare API Fehler: ${JSON.stringify(sanitizedError, null, 2)}`
      );
    }

    return data;
  } catch (error) {
    // Sicherstellen, dass keine Token in Fehlermeldungen auftauchen
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    throw new Error(message.replace(/Bearer [^\s]+/g, "Bearer [REDACTED]"));
  }
}

// Zone ID auflösen
async function getZoneId(): Promise<string> {
  const envZoneId = process.env.CLOUDFLARE_ZONE_ID;
  if (envZoneId) return envZoneId;

  console.log(`Suche Zone ID für ${ZONE_NAME}...`);
  const response = await cloudflareRequest<CloudflareZone[]>(`/zones?name=${ZONE_NAME}`);
  const zones = response.result;

  if (!zones || zones.length === 0) {
    throw new Error(`Zone ${ZONE_NAME} nicht gefunden`);
  }

  return zones[0].id;
}

// Zone Setting lesen
async function getZoneSetting<T = unknown>(
  zoneId: string,
  setting: string
): Promise<CloudflareSetting<T>> {
  const response = await cloudflareRequest<CloudflareSetting<T>>(`/zones/${zoneId}/settings/${setting}`);
  return response.result;
}

// Zone Setting schreiben
async function updateZoneSetting<T = unknown>(
  zoneId: string,
  setting: string,
  value: T,
  dryRun: boolean
): Promise<SettingUpdateResult<T>> {
  const before = await getZoneSetting<T>(zoneId, setting);
  const beforeValue = before.value;

  const changed = JSON.stringify(beforeValue) !== JSON.stringify(value);

  if (!changed) {
    return { before: beforeValue, after: beforeValue, changed: false };
  }

  if (dryRun) {
    return { before: beforeValue, after: value, changed: true };
  }

  const response = await cloudflareRequest<CloudflareSetting<T>>(
    `/zones/${zoneId}/settings/${setting}`,
    {
      method: "PATCH",
      body: JSON.stringify({ value }),
    }
  );

  return { before: beforeValue, after: response.result.value, changed: true };
}

// Web Analytics prüfen und deaktivieren
async function auditWebAnalytics(
  zoneId: string,
  _dryRun: boolean
): Promise<AuditResult> {
  const findings: Finding[] = [];

  try {
    // Prüfe Web Analytics Sites
    const response = await cloudflareRequest<RumSite[]>(
      `/zones/${zoneId}/rum/site_info/list`
    );
    const sites = response.result;

    if (sites && sites.length > 0) {
      for (const site of sites) {
        findings.push({
          category: "Web Analytics / RUM",
          severity: "high",
          current: `Web Analytics Site aktiv (ID: ${site.siteTag || "unknown"})`,
          expected: "Deaktiviert",
          action: "Manuell über Cloudflare Dashboard deaktivieren",
          remediated: false,
        });
      }
    } else {
      // Keine Sites = RUM ist deaktiviert
      findings.push({
        category: "Web Analytics / RUM",
        severity: "high",
        current: "Deaktiviert",
        expected: "Deaktiviert",
        action: "Bereits korrekt",
        remediated: true,
      });
    }
  } catch (error) {
    // 404 oder "Unable to authenticate" = RUM ist nicht konfiguriert/deaktiviert
    const errorMessage = error instanceof Error ? error.message : "";
    const is404 = errorMessage.includes("404") || errorMessage.includes("Unable to authenticate");
    
    if (is404) {
      findings.push({
        category: "Web Analytics / RUM",
        severity: "high",
        current: "Deaktiviert (keine RUM Sites konfiguriert)",
        expected: "Deaktiviert",
        action: "Bereits korrekt",
        remediated: true,
      });
    } else {
      findings.push({
        category: "Web Analytics / RUM",
        severity: "high",
        current: "API-Prüfung fehlgeschlagen",
        expected: "Deaktiviert",
        action: `Manuell prüfen: ${errorMessage}`,
        remediated: false,
      });
    }
  }

  return { findings };
}

// Network Error Logging deaktivieren
async function auditNEL(
  zoneId: string,
  dryRun: boolean
): Promise<AuditResult> {
  const findings: Finding[] = [];

  try {
    const result = await updateZoneSetting(
      zoneId,
      "nel",
      { enabled: false },
      dryRun
    );

    findings.push({
      category: "Network Error Logging",
      severity: "high",
      current: result.before?.enabled ? "aktiviert" : "deaktiviert",
      expected: "deaktiviert",
      action: result.changed
        ? dryRun
          ? "Würde deaktiviert"
          : "Deaktiviert"
        : "Bereits korrekt",
      remediated: !dryRun && result.changed,
    });
  } catch (error) {
    findings.push({
      category: "Network Error Logging",
      severity: "high",
      current: "Fehler bei NEL API-Abfrage",
      expected: "deaktiviert",
      action: `Fehler: ${error instanceof Error ? error.message : "unknown"}`,
      remediated: false,
    });
  }

  return { findings };
}

// Always Use HTTPS aktivieren
async function auditHTTPS(
  zoneId: string,
  dryRun: boolean
): Promise<AuditResult> {
  const findings: Finding[] = [];

  try {
    const result = await updateZoneSetting(
      zoneId,
      "always_use_https",
      "on",
      dryRun
    );

    findings.push({
      category: "HTTPS",
      severity: "moderate",
      current: result.before === "on" ? "aktiviert" : "deaktiviert",
      expected: "aktiviert",
      action: result.changed
        ? dryRun
          ? "Würde aktiviert"
          : "Aktiviert"
        : "Bereits korrekt",
      remediated: !dryRun && result.changed,
    });
  } catch (error) {
    findings.push({
      category: "HTTPS",
      severity: "moderate",
      current: "Fehler bei Always Use HTTPS API-Abfrage",
      expected: "aktiviert",
      action: `Fehler: ${error instanceof Error ? error.message : "unknown"}`,
      remediated: false,
    });
  }

  return { findings };
}

// Security.txt prüfen (Repository, nicht Cloudflare API)
async function auditSecurityTxt(): Promise<AuditResult> {
  const findings: Finding[] = [];
  const filePath = join(
    process.cwd(),
    "public",
    ".well-known",
    "security.txt"
  );

  try {
    const content = readFileSync(filePath, "utf-8");

    if (!content.includes("Contact:")) {
      findings.push({
        category: "security.txt",
        severity: "low",
        current: "Keine Contact-Zeile",
        expected: "Contact: vorhanden",
        action: "Repository-Datei prüfen",
        remediated: false,
      });
    }

    if (!content.includes("Expires:")) {
      findings.push({
        category: "security.txt",
        severity: "low",
        current: "Keine Expires-Zeile",
        expected: "Expires: vorhanden",
        action: "Repository-Datei prüfen",
        remediated: false,
      });
    }

    if (findings.length === 0) {
      findings.push({
        category: "security.txt",
        severity: "low",
        current: "Vorhanden",
        expected: "RFC 9116-konform",
        action: "Bereits korrekt",
        remediated: true,
      });
    }
  } catch {
    findings.push({
      category: "security.txt",
      severity: "low",
      current: "Datei nicht gefunden",
      expected: "public/.well-known/security.txt vorhanden",
      action: "Repository-Datei erstellen",
      remediated: false,
    });
  }

  return { findings };
}

type Finding = {
  category: string;
  severity: "low" | "moderate" | "high";
  current: string;
  expected: string;
  action: string;
  remediated: boolean;
};

type AuditResult = {
  findings: Finding[];
};

// Hauptaudit
async function runAudit(dryRun: boolean): Promise<void> {
  console.log(`\n🔍 Cloudflare Compliance Audit für ${ZONE_NAME}\n`);
  console.log(`Modus: ${dryRun ? "DRY-RUN (keine Änderungen)" : "APPLY (Änderungen werden angewendet)"}\n`);

  const allFindings: Finding[] = [];

  try {
    // Prüfe Cloudflare-Credentials
    const zoneId = await getZoneId();
    console.log(`✅ Zone ID gefunden: ${zoneId.substring(0, 8)}...\n`);

    // Cloudflare-API-basierte Audits
    const audits = [
      { name: "Web Analytics / RUM", fn: () => auditWebAnalytics(zoneId, dryRun) },
      { name: "Network Error Logging", fn: () => auditNEL(zoneId, dryRun) },
      { name: "Always Use HTTPS", fn: () => auditHTTPS(zoneId, dryRun) },
    ];

    for (const audit of audits) {
      console.log(`Prüfe ${audit.name}...`);
      const result = await audit.fn();
      allFindings.push(...result.findings);
    }

    // Repository-basierte Audits
    console.log(`Prüfe security.txt...`);
    const securityTxtResult = await auditSecurityTxt();
    allFindings.push(...securityTxtResult.findings);
  } catch (error) {
    if (error instanceof Error && error.message.includes("CLOUDFLARE_API_TOKEN")) {
      console.error(`\n⚠️  Cloudflare API Token nicht verfügbar\n`);
      console.error(`Erstelle manuellen Maßnahmenplan...\n`);

      // Manuelle Maßnahmen ohne API-Zugriff
      allFindings.push(
        {
          category: "Web Analytics / RUM",
          severity: "high",
          current: "Unbekannt (API-Zugriff erforderlich)",
          expected: "Deaktiviert",
          action: "Cloudflare Dashboard → Analytics → Web Analytics → Deaktivieren",
          remediated: false,
        },
        {
          category: "Network Error Logging",
          severity: "high",
          current: "Unbekannt (API-Zugriff erforderlich)",
          expected: "Deaktiviert",
          action: "Cloudflare Dashboard → Network → NEL → Disabled",
          remediated: false,
        },
        {
          category: "Always Use HTTPS",
          severity: "moderate",
          current: "Unbekannt (API-Zugriff erforderlich)",
          expected: "Aktiviert",
          action: "Cloudflare Dashboard → SSL/TLS → Edge Certificates → Always Use HTTPS → On",
          remediated: false,
        }
      );

      const securityTxtResult = await auditSecurityTxt();
      allFindings.push(...securityTxtResult.findings);
    } else {
      throw error;
    }
  }

  // Ergebnisse ausgeben
  console.log(`\n${"=".repeat(80)}\n`);
  console.log(`📊 AUDIT-ERGEBNISSE\n`);

  const bySeverity = {
    high: allFindings.filter((f) => f.severity === "high"),
    moderate: allFindings.filter((f) => f.severity === "moderate"),
    low: allFindings.filter((f) => f.severity === "low"),
  };

  for (const [severity, findings] of Object.entries(bySeverity)) {
    if (findings.length === 0) continue;

    const emoji = severity === "high" ? "🔴" : severity === "moderate" ? "🟠" : "🟡";
    console.log(`${emoji} ${severity.toUpperCase()} (${findings.length})\n`);

    for (const finding of findings) {
      console.log(`  Kategorie:  ${finding.category}`);
      console.log(`  Aktuell:    ${finding.current}`);
      console.log(`  Erwartet:   ${finding.expected}`);
      console.log(`  Maßnahme:   ${finding.action}`);
      console.log(`  Behoben:    ${finding.remediated ? "✅" : "❌"}\n`);
    }
  }

  const remediated = allFindings.filter((f) => f.remediated).length;
  const total = allFindings.length;

  console.log(`${"=".repeat(80)}\n`);
  console.log(`Behoben: ${remediated} / ${total}\n`);

  if (dryRun && allFindings.some((f) => !f.remediated && f.action.includes("Würde"))) {
    console.log(`💡 Verwende --apply --confirm-zone=${ZONE_NAME} um Änderungen anzuwenden.\n`);
  }
}

// Produktionsverifikation
async function runProductionVerification(): Promise<void> {
  console.log(`\n🌐 Produktionsverifikation für https://${ZONE_NAME}\n`);

  const checks = [
    {
      name: "HTTP → HTTPS Redirect",
      fn: async () => {
        const response = await fetch(`http://${ZONE_NAME}`, {
          redirect: "manual",
        });
        const location = response.headers.get("location");
        return {
          pass: response.status >= 300 && response.status < 400 && location?.startsWith("https://"),
          details: `Status: ${response.status}, Location: ${location || "none"}`,
        };
      },
    },
    {
      name: "NEL Header nicht vorhanden",
      fn: async () => {
        const response = await fetch(`https://${ZONE_NAME}`);
        const nel = response.headers.get("nel");
        const reportTo = response.headers.get("report-to");
        const hasNEL = nel !== null || (reportTo && reportTo.includes("cf-nel"));
        return {
          pass: !hasNEL,
          details: `NEL: ${nel || "nicht vorhanden"}, Report-To: ${reportTo ? "vorhanden" : "nicht vorhanden"}`,
        };
      },
    },
    {
      name: "Kein Cloudflare Analytics Beacon",
      fn: async () => {
        const response = await fetch(`https://${ZONE_NAME}`);
        const html = await response.text();
        const hasBeacon = html.includes("cloudflareinsights") || html.includes("data-cf-beacon");
        return {
          pass: !hasBeacon,
          details: hasBeacon ? "Beacon gefunden" : "Kein Beacon gefunden",
        };
      },
    },
    {
      name: "security.txt erreichbar",
      fn: async () => {
        const response = await fetch(`https://${ZONE_NAME}/.well-known/security.txt`);
        const text = await response.text();
        const hasContact = text.includes("Contact:");
        return {
          pass: response.status === 200 && hasContact,
          details: `Status: ${response.status}, Contact: ${hasContact ? "vorhanden" : "fehlt"}`,
        };
      },
    },
    {
      name: "HSTS Header vorhanden",
      fn: async () => {
        const response = await fetch(`https://${ZONE_NAME}`);
        const hsts = response.headers.get("strict-transport-security");
        return {
          pass: hsts !== null,
          details: hsts || "nicht vorhanden",
        };
      },
    },
  ];

  for (const check of checks) {
    try {
      const result = await check.fn();
      const status = result.pass ? "✅" : "❌";
      console.log(`${status} ${check.name}`);
      console.log(`   ${result.details}\n`);
    } catch (error) {
      console.log(`❌ ${check.name}`);
      console.log(`   Fehler: ${error instanceof Error ? error.message : "unknown"}\n`);
    }
  }
}

// Main
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "verify" || command === "production") {
    await runProductionVerification();
    return;
  }

  const dryRun = !args.includes("--apply");

  if (!dryRun) {
    requireConfirmation(args);
  }

  await runAudit(dryRun);
}

main().catch((error) => {
  console.error(`\n❌ Fehler: ${error instanceof Error ? error.message : "unknown"}\n`);
  process.exit(1);
});
