# Andhra Ruchulu: The Andhra Pradesh Food Encyclopedia

> Working title. "Ruchulu" means "tastes" in Telugu. The AI companion is called **Ruchi** (working name). Both can change; see `decisions.md`.

A mobile-first web application that documents the food, recipes and culinary practices of **Andhra Pradesh and nothing else**, with an AI "mini chef" that answers only from our own verified knowledge base.

## What this is

| Part | Description |
|---|---|
| **Encyclopedia** | Dishes, recipes, ingredients, techniques, festivals, regions and cookware of Andhra Pradesh, cross-linked and searchable. |
| **Ruchi (AI mini chef)** | A chat assistant that retrieves from the knowledge base and answers with citations. It does not answer from general internet knowledge. |
| **Experience** | Installable PWA, fast on mid-range Android phones and slow networks, English and Telugu. |

## Scope rule (read this first)

**In scope:** food and culinary practice of present-day Andhra Pradesh (26 districts across Uttarandhra, Coastal Andhra and Rayalaseema).

**Out of scope:** food of other states, including Telangana and Hyderabadi cuisine, unless a dish has a documented Andhra variant. Such dishes appear only as an "Andhra version" entry with a note on shared heritage. Tourism, hotels, travel itineraries and non-food culture are out of scope.

## Documentation map

| File | Purpose |
|---|---|
| `README.md` | This overview |
| `instructions.md` | Rules every human and AI agent must follow while building |
| `mvp.md` | What ships first, what does not, acceptance criteria |
| `progress.md` | Living status tracker and changelog |
| `design.md` | Brand, UI/UX system, screens, motion, accessibility |
| `architecture.md` | Tech stack, folder structure, data flow, deployment |
| `data-model.md` | Content schemas and database tables |
| `content-guide.md` | Taxonomy, writing style, seed dish list, quality bar |
| `data-sourcing.md` | Research and scraping plan, legal and ethical rules |
| `ai-chef.md` | Ruchi's RAG design, prompts, guardrails, evaluation |
| `antigravity-agents.md` | How to split work across Antigravity agents, with ready prompts |
| `roadmap.md` | Phases beyond MVP |
| `decisions.md` | Decision log (ADR style) |

## Proposed stack (summary)

Next.js (App Router, TypeScript) · Tailwind CSS · Supabase (Postgres, pgvector, Storage) · Gemini API for embeddings and chat · PWA with offline caching · Netlify or Vercel. Details in `architecture.md`.

## Quick start (after scaffolding)

```bash
pnpm install
cp .env.example .env.local     # add Supabase + Gemini keys
pnpm content:validate          # validate all content files against schemas
pnpm content:ingest            # push content to DB and build embeddings
pnpm dev
```

## Principles

1. **Accuracy over volume.** A smaller verified encyclopedia beats a large doubtful one.
2. **Our words, cited sources.** We learn from sources and write our own content. We never copy.
3. **Phone first.** Design for a 360px wide screen, then scale up.
4. **Local voice.** Use Telugu names and terms properly, with transliteration and English meaning.
5. **Ruchi never invents.** No source in the knowledge base means no confident answer.
