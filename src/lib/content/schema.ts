import { z } from "zod";

export const frontmatterSchema = z.object({
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
});

export type RawFrontmatter = z.infer<typeof frontmatterSchema>;
