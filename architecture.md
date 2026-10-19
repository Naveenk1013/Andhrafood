# architecture.md: Technical Architecture

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | SSR/SSG for SEO, route handlers for the AI API, large ecosystem for agents |
| Styling | Tailwind CSS + CSS variables for tokens | Fast, consistent with `design.md` |
| UI primitives | Radix UI / shadcn components | Accessible foundations |
| Database | Supabase Postgres + **pgvector** | Relational content plus vector search in one place |
| Media | Supabase Storage + image CDN | Optimised images |
| AI | Gemini API (embeddings + a fast chat model) | Fits Antigravity workflow, supports Telugu |
| Search | Postgres full-text + trigram + vector (hybrid) | Typo tolerance, Telugu and transliteration |
| i18n | `next-intl` | English / Telugu routing |
| PWA | Service worker (e.g. Serwist) | Installable and offline |
| Hosting | Netlify or Vercel | Simple deploys and previews |
| CI | GitHub Actions | Lint, types, tests, content validation, Lighthouse |
| Analytics | Privacy-friendly (Plausible or Umami) | No personal data |

Model names and versions are chosen at build time and kept in config, not hardcoded.

## 2. Content as the source of truth
```
/content
  dishes/*.md        (frontmatter + body, per language)
  ingredients/*.md
  techniques/*.md
  festivals/*.md
  regions/*.md
  sources/sources.yml
```
Why files: agents can draft and review changes in pull requests, diffs are readable, history is free, and content is portable. A build script validates files with Zod and loads them into Postgres.

## 3. Data flow
```
Content files → validate (Zod) → ingest script → Postgres tables
                                      │
                                      └→ chunk → embed (Gemini) → pgvector

Browser → Next.js pages (SSG/ISR) ← Postgres (build time and revalidate)

Ruchi:  question → input checks → embed query → hybrid retrieve (top-k)
        → relevance gate → prompt with retrieved chunks → Gemini → 
        → citation check → stream answer + source chips
```

## 4. Proposed folder structure
```
/src
  /app                 routes (en/te), api routes
  /components          shared UI
  /features
    /dishes /search /regions /ruchi /favourites /cooking-mode
  /lib                 db, ai, search, i18n, utils
  /schemas             Zod schemas
/content               markdown content
/scripts               validate, ingest, embed, eval
/tests                 unit, e2e (Playwright)
/evals                 Ruchi question sets
/docs                  these md files (or repo root)
```

## 5. API surface (MVP)
| Endpoint | Purpose |
|---|---|
| `GET /api/search?q=&filters=` | Hybrid search |
| `POST /api/ruchi` | Chat, streaming, rate limited |
| `POST /api/ruchi/feedback` | Rating and error reports |
| `GET /api/health` | Monitoring |

All other data is served through server components and static generation.

## 6. Search design
- Normalise Unicode (NFC) for Telugu
- Index fields: Telugu name, transliterations, English name, aliases, ingredients
- Transliteration variants stored per dish ("pesarattu", "pesara attu", "pesarattu dosa")
- Rank: exact name > alias > ingredient > description text
- Trigram similarity for typos; vector search for natural-language queries

## 7. Security and privacy
- Gemini and Supabase service keys only in server environment
- Row Level Security on every table; public read for published content only
- Rate limiting per IP and per session on `/api/ruchi`; maximum input length
- Prompt-injection defences described in `ai-chef.md`
- No personal data in MVP; favourites stored locally
- Cookie-free analytics

## 8. Performance plan
- Static generation for content pages with incremental revalidation
- `next/image` with AVIF/WebP and fixed dimensions
- Font subsetting for Latin and Telugu, `font-display: swap`
- Route-level code splitting; chat code loaded on demand
- Cache embeddings and frequent Ruchi retrievals

## 9. Environments
| Env | Purpose |
|---|---|
| local | Development |
| preview | Per pull request deploy |
| production | Public site |

`.env.example` must list every variable with a description. Never commit real values.

## 10. Observability
Error tracking, Ruchi logs of question category, retrieval score and refusal reason (no personal data), and a dashboard of unanswered questions to guide new content.
