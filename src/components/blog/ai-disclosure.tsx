import { Info } from "lucide-react";
import type { AITransparency } from "@/types/content";

export function AIDisclosure({ ai }: { ai: AITransparency }) {
  // Kein Disclosure, wenn nicht KI-unterstützt
  if (!ai.assisted) {
    return null;
  }

  // Standard-Disclosure-Text
  let disclosureText = ai.disclosure;

  if (!disclosureText) {
    if (ai.humanReviewed) {
      disclosureText =
        "Dieser Beitrag wurde mit KI-Unterstützung erstellt und anschließend fachlich und redaktionell geprüft.";
    } else {
      disclosureText =
        "Dieser Beitrag wurde mit KI-Unterstützung erstellt.";
    }
  }

  return (
    <div className="not-prose mt-6 rounded-md border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950">
      <div className="flex items-start gap-3">
        <Info
          className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
          aria-hidden="true"
        />
        <div className="flex-1">
          <p className="font-medium text-blue-900 dark:text-blue-100">
            KI-unterstützte Inhaltserstellung
          </p>
          <p className="mt-1 text-blue-800 dark:text-blue-200">
            {disclosureText}
          </p>
          {ai.humanReviewed && ai.reviewedBy && ai.reviewedAt && (
            <p className="mt-2 text-xs text-blue-700 dark:text-blue-300">
              Geprüft von {ai.reviewedBy} am{" "}
              {new Date(ai.reviewedAt).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          {ai.tools && ai.tools.length > 0 && (
            <p className="mt-2 text-xs text-blue-700 dark:text-blue-300">
              Verwendete Tools: {ai.tools.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
