# data-model.md: Content Schemas and Database

## 1. Entities
Dish · Ingredient · Technique · Festival/Occasion · Region · District · Cookware · Source · Media

## 2. Dish file format (`/content/dishes/<slug>.md`)

```yaml
---
slug: pesarattu
status: draft            # draft | needs-review | verified | published
names:
  te: పెసరట్టు
  transliteration: [Pesarattu, Pesara attu]
  en: Green gram dosa
aliases: [MLA pesarattu]
category: tiffin         # see taxonomy in content-guide.md
course: breakfast        # breakfast | main | side | snack | sweet | drink | condiment
diet: vegetarian         # vegetarian | non-vegetarian | eggetarian | vegan-adaptable
allergens: []            # e.g. [gluten, dairy, nuts]
regions: [coastal-andhra]
districts: []            # district slugs where the dish is strongly tied
heat: 2                  # 1 to 5
time: { prep_min: 480, cook_min: 20 }   # note soaking in prep
servings: 4
occasions: []
techniques: [grinding, tawa-cooking]
ingredients:
  - { ref: green-gram, qty: 1, unit: cup, note: whole, soaked }
  - { ref: rice, qty: 1, unit: tbsp }
serve_with: [allam-pachadi, upma]
related: [attu]
gi_tag: false            # true only if verified
sources: [src-001, src-014]
reviewer: ""             # name once verified
last_reviewed: ""
---
## Story
Original text, 80 to 150 words.

## Method
1. Step...

## Notes and variations
...
## Cultural notes
(Only if sourced)
```
Telugu content sits in a parallel `<slug>.te.md` or in a `te:` block. Missing Telugu falls back to English with a label.

## 3. Database tables (Postgres)

| Table | Key columns |
|---|---|
| `dishes` | id, slug, status, names (jsonb), category, course, diet, allergens[], heat, prep_min, cook_min, servings, gi_tag, body_md_en, body_md_te, updated_at |
| `dish_regions` | dish_id, region_id |
| `dish_districts` | dish_id, district_id |
| `ingredients` | id, slug, names (jsonb), description_en, description_te, season, notes |
| `dish_ingredients` | dish_id, ingredient_id, qty, unit, note, sort |
| `techniques` | id, slug, names, body_md_en, body_md_te |
| `dish_techniques` | dish_id, technique_id |
| `festivals` | id, slug, names, body_md, month_hint |
| `regions` | id, slug, names, summary, body_md |
| `districts` | id, slug, names, region_id |
| `sources` | id, key, title, publisher, url, type, accessed_on, licence_note |
| `entity_sources` | entity_type, entity_id, source_id |
| `media` | id, entity_type, entity_id, url, alt_en, alt_te, credit, licence |
| `chunks` | id, entity_type, entity_id, lang, heading, text, embedding vector, tokens |
| `ruchi_feedback` | id, session_hash, question_category, rating, note, created_at |

Indexes: GIN on tsvector for names and text, `pg_trgm` on names, HNSW or IVFFlat on `chunks.embedding`.

## 4. Region and district reference
- Regions: `uttarandhra`, `coastal-andhra`, `rayalaseema`
- Districts: use the current official list of 26 districts of Andhra Pradesh. Verify the list and region mapping from an official source before seeding, as boundaries were reorganised in 2022.

## 5. Validation rules (enforced by `content:validate`)
- Slug unique, kebab-case
- `status: published` requires 1+ source, a region, an English description and a reviewer
- Every `ref` must resolve to an existing ingredient
- `heat` 1 to 5; `diet` from enum
- Telugu name present for every dish
- No external image URLs; media must be recorded with licence and credit
- Story text length bounds; no text over 90% similar to a cited source (similarity check)

## 6. Chunking for the AI
- One chunk per section (story, ingredients, method, notes), 150 to 400 tokens each
- Every chunk carries: entity type, slug, title, section, language, region
- Chunk text begins with a header line such as `Dish: Pesarattu (Coastal Andhra) | Section: Method` so retrieval keeps context
