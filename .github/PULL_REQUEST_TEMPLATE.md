## Summary

<!-- Briefly describe what this PR changes and why. -->

## Type of Change

- [ ] Feature / UI enhancement
- [ ] Content / Submodule update (`content/blog`)
- [ ] Security / Compliance / Headers (`public/_headers`, `security.txt`, Cloudflare audit)
- [ ] Bug fix / Refactoring
- [ ] CI/CD / Tooling / Documentation

## Verification Checklist

- [ ] `npm run generate:content` passes (frontmatter schema + EU AI Act Art. 50 validation)
- [ ] `npm run lint` passes with zero warnings/errors
- [ ] `npx tsc --noEmit` passes
- [ ] `npm test` passes (all Vitest unit tests)
- [ ] `npm run build` succeeds and generates static output in `out/`
