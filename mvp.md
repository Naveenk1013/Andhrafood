# mvp.md: Minimum Viable Product

## MVP goal
A public, installable, mobile-first site where a visitor can **browse and search 60 to 80 verified Andhra Pradesh dishes**, read full recipes, explore by region, and **ask Ruchi questions** that are answered from that content with citations.

Target: usable beta in about 6 to 8 weeks of part-time work with Antigravity agents.

## Users
| User | Need |
|---|---|
| Curious food lover | Discover dishes and what makes them Andhra |
| Home cook | Follow a recipe with accurate quantities and steps |
| Student (hospitality, culinary) | Reliable reference with sources, technique and region context |
| Diaspora family | Find a dish from childhood and cook it |
| Traveller | Know what to eat in a region (food only) |

## In scope for MVP

### Content
- 60 to 80 dishes across all three regions and all major categories
- 25 to 30 key ingredients (Guntur chilli, gongura, tamarind, ragi, horse gram, etc.)
- 10 to 12 techniques (tempering/popu, grinding on rolu, pickling, sangati making, etc.)
- 8 to 10 festivals and occasions with their food
- 3 region pages (Uttarandhra, Coastal Andhra, Rayalaseema), with district tags
- Every entry in English; Telugu names for all; full Telugu text for the 20 most important dishes

### Features
1. **Home:** region map hero, featured dishes, category shortcuts, Ruchi entry point
2. **Browse and filter:** by region, category, diet, spice level, time, occasion
3. **Search:** typo-tolerant, works with English and Telugu names and transliteration
4. **Dish page:** story, ingredients, step-by-step recipe, servings scaler, cooking mode, related dishes, sources
5. **Ingredient and technique pages:** with "used in" links
6. **Region pages:** culinary profile, signature dishes, ingredients
7. **Ruchi chat:** retrieval-based answers, citations, suggested questions, refuses out-of-scope
8. **Save favourites:** stored on device (no login in MVP)
9. **Language toggle:** English / Telugu
10. **PWA:** installable, offline access to viewed pages and favourites
11. **Light and dark theme**
12. **Basic SEO and sharing:** clean URLs, structured data (Recipe schema), share cards

### Non-functional
- Performance and accessibility budgets from `instructions.md`
- Privacy-friendly analytics (no personal data)
- Rate limiting and abuse protection on the chat endpoint

## Out of MVP (see `roadmap.md`)
User accounts, user-submitted recipes, comments, voice input, image-based dish recognition, restaurant or eatery directory, meal planner, shopping list sync, native apps, monetisation, multi-state expansion.

## Acceptance criteria

| # | Criterion | Check |
|---|---|---|
| A1 | 60+ dishes pass `content:validate` and at least 90% have `status: verified` | Script report |
| A2 | Every dish has 1+ source and original wording | Manual review |
| A3 | Search finds "Pesarattu", "పెసరట్టు" and "pesarattu dosa" | Automated test |
| A4 | Dish page loads under 2.5s LCP on Fast 3G emulation | Lighthouse |
| A5 | Lighthouse: Performance 90+, Accessibility 95+, SEO 95+, PWA pass | Lighthouse CI |
| A6 | Ruchi answers 90%+ of the 50-question eval set correctly with citations | Eval run |
| A7 | Ruchi refuses 100% of the 20 out-of-scope questions | Eval run |
| A8 | App is fully usable at 360px width with keyboard and screen reader | Manual QA |
| A9 | Telugu text renders correctly on Android Chrome and iOS Safari | Device test |
| A10 | Installable PWA; previously opened dishes work offline | Manual QA |

## MVP milestones

| Milestone | Outcome |
|---|---|
| M0 Foundations | Repo, docs, design tokens, schemas, content pipeline |
| M1 Content core | 25 dishes plus ingredients, regions; browse and dish pages live |
| M2 Discovery | Search, filters, region map, favourites |
| M3 Ruchi | Embeddings, retrieval, chat UI, guardrails, eval set |
| M4 Content scale-up | 60 to 80 dishes, Telugu text, techniques, festivals |
| M5 Polish and launch | PWA, SEO, performance, accessibility, QA, beta launch |

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Inaccurate culinary facts | `status` workflow, sources required, expert reviewer |
| Copyright issues from scraped content | Rewrite in own words, facts only, original photography or licensed media |
| AI hallucination | Strict retrieval, citation check, refusal when evidence is weak, eval set |
| Telugu rendering and search quality | Test early on real devices, normalise Unicode, transliteration index |
| Content bottleneck | Agent-assisted drafting plus human review queue |
| Gemini cost spikes | Caching, rate limits, short contexts, flash-tier model |
