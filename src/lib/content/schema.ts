import { z } from "zod";

// AI Act Transparenz-Schema für KI-unterstützte Artikel
// Pflicht für Artikel mit date >= 2026-08-02
const aiTransparencySchema = z
  .object({
    assisted: z.boolean(), // KI-Unterstützung verwendet?
    humanReviewed: z.boolean().optional(), // Redaktionell geprüft?
    reviewedBy: z.string().optional(), // Name des Prüfers
    reviewedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(), // Datum der Prüfung
    disclosure: z.string().optional(), // Optionale zusätzliche Offenlegung
    tools: z.array(z.string()).optional(), // Verwendete Tools
  })
  .refine(
    (data) => {
      // Wenn KI-unterstützt und humanReviewed=true, dann reviewedBy und reviewedAt erforderlich
      if (data.assisted && data.humanReviewed === true) {
        return Boolean(data.reviewedBy && data.reviewedAt);
      }
      return true;
    },
    {
      message:
        "humanReviewed=true erfordert reviewedBy und reviewedAt",
    }
  );

export const frontmatterSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    author: z.string().min(1),
    topics: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    series: z
      .object({
        slug: z.string(),
        title: z.string(),
        order: z.number(),
      })
      .optional(),
    language: z.enum(["de", "en"]).optional(), // Explizite Sprachkennzeichnung
    ai: aiTransparencySchema.optional(), // AI Act Transparenz
  })
  .refine(
    (data) => {
      // Für Artikel ab 2026-08-02: AI-Feld ist erforderlich
      const articleDate = new Date(data.date);
      const aiActDate = new Date("2026-08-02");
      if (articleDate >= aiActDate && !data.ai) {
        return false;
      }
      return true;
    },
    {
      message:
        "Artikel ab 2026-08-02 benötigen ein ai-Feld (assisted: true/false)",
    }
  );

export type RawFrontmatter = z.infer<typeof frontmatterSchema>;
