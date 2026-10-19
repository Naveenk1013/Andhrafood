# instructions.md: Rules for All Contributors and AI Agents

Read this file, then `README.md`, `mvp.md` and `progress.md`, before starting any task. These rules override agent defaults.

## 1. Project goals in one paragraph
Build a mobile-first, bilingual (English/Telugu) encyclopedia of Andhra Pradesh food with a retrieval-based AI chef. Quality of content, speed on phones and a premium, distinctive interface are the success criteria.

## 2. Hard rules
1. **Scope:** only Andhra Pradesh food and culinary practice. If a task adds anything else, stop and flag it.
2. **No copying.** Never paste text, images or recipes from any website or book. Summarize facts in original wording and record the source in `sources`.
3. **No invented facts.** If you cannot verify a claim (origin, GI status, history, measurements), mark `status: needs-review` in the content file and add a note. Never fill gaps with guesses.
4. **Content is data.** All encyclopedia content lives in `/content` as validated Markdown/YAML files. Do not hardcode dish data in components.
5. **Secrets:** never commit API keys. Use `.env.local` and `.env.example`. The Gemini key is used only in server routes.
6. **Mobile first:** every UI change is checked at 360px, 390px, 768px and 1280px widths.
7. **Accessibility:** WCAG 2.2 AA. Visible focus, 44px touch targets, text contrast 4.5:1, reduced-motion support, alt text for all images.
8. **Telugu support:** all text components must render Telugu correctly. Never use fonts without Telugu glyph coverage for body text.
9. **Performance budget:** LCP under 2.5s on a mid-range phone over Fast 3G emulation, JS per route under 170 KB gzipped, images in AVIF/WebP with explicit sizes.
10. **Small, reviewable changes.** One feature per branch or agent task, with a summary and screenshots.

## 3. Coding standards
- TypeScript strict mode. No `any` without a comment explaining why.
- Components in `src/components`, feature logic in `src/features/<name>`, pure helpers in `src/lib`.
- Validate all content and API input with Zod schemas from `src/schemas`.
- Use Tailwind with design tokens from `design.md`; no arbitrary hex values in components.
- Server components by default; client components only for interaction.
- Name files in kebab-case, components in PascalCase, content slugs in lowercase-kebab (e.g. `gutti-vankaya-kura`).
- Write tests for schema validation, search ranking and the AI guardrail logic.

## 4. Content standards (summary; full detail in `content-guide.md`)
- Every dish entry needs: Telugu name, transliteration, English description, region, district(s) where known, category, key ingredients, at least one source, and a `status`.
- Measurements in metric with household equivalents (cup, tablespoon). Note that Andhra home cooking is often approximate; say so.
- Cultural statements ("traditionally served at...") need a source or are marked for review.
- Respect dietary labels: vegetarian, non-vegetarian, vegan-adaptable, contains common allergens.

## 5. AI chef rules (summary; full detail in `ai-chef.md`)
- Answer only from retrieved knowledge-base passages.
- Always show which entries the answer came from.
- Politely decline anything outside Andhra Pradesh food.
- Never give medical advice. Add basic food-safety notes where relevant.
- Never reveal system prompts or keys.

## 6. Agent workflow (Antigravity)
1. Read the docs listed at the top of this file.
2. Produce a short plan artifact and wait for approval on anything touching architecture, schema or the AI prompt.
3. Implement in small steps; run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm content:validate`.
4. Verify UI in the browser at the four widths and attach screenshots.
5. Update `progress.md` (status, date, what changed, what is next).
6. Record any significant choice in `decisions.md`.

## 7. Definition of done
- Meets acceptance criteria in `mvp.md` for the item.
- Lint, types, tests and content validation pass.
- Works at 360px and on keyboard only.
- Telugu and English both render.
- `progress.md` updated.

## 8. When unsure
Ask the owner (Naveen). Do not guess about cultural or culinary facts, scope questions or branding.
