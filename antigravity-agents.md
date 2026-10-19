# antigravity-agents.md: Working with Antigravity Agents

## 1. How to work
- Give each agent **one role and one task** at a time.
- Always start the prompt with: *"Read README.md, instructions.md, mvp.md, progress.md and the file relevant to your task before doing anything."*
- Ask for a **plan first** on anything touching schema, architecture or the AI prompt. Approve before implementation.
- Require **artifacts**: plan, task list, test results and browser screenshots at 360px and 1280px.
- Agents update `progress.md` and `decisions.md` when they finish.

## 2. Agent roles

| Agent | Responsibility | Key files |
|---|---|---|
| Architect | Scaffolding, schemas, CI, environments | architecture.md, data-model.md |
| UI/UX builder | Components, pages, motion, responsive, accessibility | design.md |
| Content researcher | Lead sheets, source collection, fact matching | data-sourcing.md, content-guide.md |
| Content writer | Drafts dish entries in original words | content-guide.md, data-model.md |
| Data engineer | Validation, ingestion, embeddings, search | data-model.md, ai-chef.md |
| AI engineer | Retrieval, prompts, guardrails, evals | ai-chef.md |
| QA agent | Browser tests, Lighthouse, accessibility, Telugu rendering | mvp.md, design.md |

## 3. Starter prompts

**Scaffold (Architect)**
> Read the docs listed in README.md. Propose a plan to scaffold the project per architecture.md: Next.js App Router, TypeScript strict, Tailwind with tokens from design.md, next-intl (en, te), ESLint, Prettier, Vitest, Playwright and GitHub Actions. Do not install anything until I approve the plan. After approval, implement, run all checks and update progress.md.

**Schemas and validation (Data engineer)**
> Using data-model.md, create Zod schemas and a `content:validate` script that checks every rule in section 5. Add three sample dishes as fixtures. Include unit tests. Report failures clearly with file and field names.

**Design system (UI/UX builder)**
> Implement the design tokens, fonts (with Telugu subsets), and components listed in design.md section 6: Dish card, Heat Meter, Source chip, Filter sheet, Servings scaler. Build a /styleguide route showing each at 360px and 1280px in light and dark themes. Provide screenshots.

**Home hero (UI/UX builder)**
> Build the Home screen from design.md including the interactive AP region map with the one-time ignition animation, a keyboard-accessible list alternative, and reduced-motion support. Use placeholder region shapes until final artwork is supplied.

**Dish research (Content researcher)**
> For these 10 dishes [list], produce a lead sheet with at least two Tier A or B sources each. Check each site's terms and robots rules first. Do not copy text or images. Flag anything you cannot verify.

**Dish drafting (Content writer)**
> Draft `/content/dishes/<slug>.md` for [dish] following content-guide.md and data-model.md, using only the facts in the attached lead sheet. Original wording only. Mark status draft. List every claim with its source in a table at the end of your message.

**Ingestion and search (Data engineer)**
> Build `content:ingest` to load validated content into Supabase and `content:embed` to chunk and embed it per ai-chef.md and data-model.md section 6. Then implement hybrid search with tests for "pesarattu", "పెసరట్టు" and "pesarattu dosa".

**Ruchi (AI engineer)**
> Implement POST /api/ruchi per ai-chef.md with retrieval, relevance gate, streaming, citation validation and refusals. Create the eval set and a runner. Do not change the system prompt without showing me a diff and eval results.

**QA**
> Run Lighthouse, axe and Playwright flows (browse, search, dish page, cooking mode, Ruchi, favourites, offline) at 360px and 1280px. Check Telugu rendering. Report issues with screenshots and file a task list.

## 3. Review checklist for every agent result
- [ ] Follows scope and `instructions.md`
- [ ] No copied text, no hardcoded content, no secrets
- [ ] Tests and checks pass
- [ ] Works at 360px and keyboard only
- [ ] `progress.md` updated
