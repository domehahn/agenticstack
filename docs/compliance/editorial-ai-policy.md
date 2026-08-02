# Editorial AI Policy

**Status:** Draft  
**Version:** 1.0  
**Effective:** 2026-08-02 (EU AI Act Art. 50 enforcement date)

## 1. Purpose

This policy defines how AgenticStack uses AI tools in content creation and
ensures compliance with the EU AI Act Article 50 transparency requirements for
AI-generated content published on or after August 2, 2026.

## 2. Scope

This policy applies to all editorial content published on agenticstack.eu,
including:

- Blog articles (`content/blog/*.mdx`)
- Technical documentation
- Legal pages (where AI is used for translation or drafting)

## 3. AI Tools Used

Current approved AI tools for content creation:

- **GitHub Copilot** — Code completion, inline suggestions
- **Claude (Anthropic)** — Long-form writing, research, technical explanations
- **ChatGPT (OpenAI)** — Ideation, outlining, drafting
- **Other tools** — Must be documented in the `ai.tools` frontmatter field

## 4. Human Review Requirements

All AI-assisted content **must** undergo human review before publication.

### Review Checklist

- [ ] **Factual accuracy:** All claims, code examples, and technical details verified
- [ ] **Completeness:** Article covers the topic comprehensively
- [ ] **Voice and tone:** Matches AgenticStack editorial style
- [ ] **Code quality:** All code examples tested and working
- [ ] **Links and references:** All external links valid and relevant
- [ ] **Compliance:** Frontmatter includes required `ai` fields
- [ ] **Disclosure:** Transparency disclosure is clear and accurate

### Reviewer Requirements

- Human reviewer must be named in `ai.reviewedBy` field
- Review date must be recorded in `ai.reviewedAt` field (YYYY-MM-DD)
- Reviewer must have subject-matter expertise in the article's topic

## 5. Frontmatter Requirements (Articles ≥ 2026-08-02)

### Required Fields

```yaml
ai:
  assisted: true|false  # REQUIRED: true if any AI tool was used
```

### Required if `assisted: true` and `humanReviewed: true`

```yaml
ai:
  assisted: true
  humanReviewed: true
  reviewedBy: "Full Name"      # REQUIRED
  reviewedAt: "YYYY-MM-DD"     # REQUIRED
```

### Optional Fields

```yaml
ai:
  disclosure: "Custom disclosure text"  # Overrides default
  tools:                                # List of AI tools used
    - "GitHub Copilot"
    - "Claude"
```

## 6. Disclosure Requirements

### Default Disclosures

- **AI-assisted + human-reviewed:**  
  _"Dieser Beitrag wurde mit KI-Unterstützung erstellt und anschließend
  fachlich und redaktionell geprüft."_

- **AI-assisted, not human-reviewed:**  
  _"Dieser Beitrag wurde mit KI-Unterstützung erstellt."_

### Custom Disclosures

Custom disclosure text is allowed via the `ai.disclosure` frontmatter field,
but must:

- Clearly state AI was used
- Not mislead readers about the level of AI involvement
- Not omit required review information if `humanReviewed: true`

## 7. Schema Validation

The `src/lib/content/schema.ts` schema enforces:

1. Articles dated ≥ 2026-08-02 **must** include the `ai` field
2. If `humanReviewed: true`, then `reviewedBy` and `reviewedAt` are **required**
3. `reviewedAt` must be a valid date in YYYY-MM-DD format

Build-time validation fails if frontmatter violates these rules.

## 8. Non-AI Content

If an article is entirely human-written (no AI tools used), set:

```yaml
ai:
  assisted: false
```

No disclosure is shown to readers when `assisted: false`.

## 9. Pre-2026-08-02 Articles

Articles published before August 2, 2026 are **not required** to include the
`ai` field, but adding it is encouraged for transparency.

## 10. Exceptions

None. All articles published on or after 2026-08-02 must comply with the
frontmatter and review requirements above.

## 11. Enforcement

- **Build time:** Schema validation prevents publishing non-compliant articles
- **Manual review:** All AI-assisted articles require named human reviewer
- **Audit:** `ai` frontmatter is included in article JSON-LD structured data

## 12. References

- [EU AI Act Article 50](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689)
  (Transparency obligations for providers of general-purpose AI models)
- [src/lib/content/schema.ts](../src/lib/content/schema.ts) (Validation schema)
- [content/blog/README.md](../content/blog/README.md) (Authoring guide)

## 13. Revision History

| Version | Date       | Author        | Changes                     |
| ------- | ---------- | ------------- | --------------------------- |
| 1.0     | 2026-08-02 | Dominik Hahn  | Initial policy for AI Act compliance |
