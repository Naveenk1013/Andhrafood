# data-sourcing.md: Research and Scraping Plan

## 1. Purpose
Find reliable information about Andhra Pradesh food, learn from it, and write our own original entries with citations. The Andhra Pradesh tourism website is a starting point for discovering dishes and places, not a copy source.

## 2. Ground rules
1. **Check terms first.** Read each site's terms of use and `robots.txt` before any automated access. If scraping is not permitted, collect information manually or skip the source.
2. **Facts, not expression.** Record facts (dish names, regions, ingredients, GI status). Do not copy sentences, structure, photographs or recipes.
3. **Rewrite in original words** and cite the source in the `sources` field.
4. **Be polite if scraping is allowed:** low request rate, identify the bot, cache responses, no login-wall or paywall bypass.
5. **Images:** never reuse scraped images. Use our own photos, commissioned work, or media with a clear licence recorded in `media`.
6. **Personal data:** do not collect names or contact details of individuals or businesses beyond public citations.
7. **Keep a source log** for every item: URL, date accessed, what was learned.

## 3. Source tiers

| Tier | Examples | Use |
|---|---|---|
| A (authoritative) | GI registry records, government agriculture and tourism departments, university and research publications, published cookbooks by recognised authors | Core facts, GI claims |
| B (reputable) | Established food writers and magazines, museum or heritage sites, recognised chefs | Context, recipes cross-check |
| C (community) | Home-cook blogs and videos, elders and family cooks (interviews) | Variations, technique detail; always cross-check |
| D (avoid as sole source) | Anonymous listicles, social posts, AI summaries | Leads only |

## 4. Research workflow
```
Discover (tourism site, lists, books)
   → Lead sheet (dish, region, possible sources)
   → Research (2+ sources per dish)
   → Draft entry in original words
   → Self-check against content-guide.md
   → Human review (verified)
```

**Lead sheet columns:** dish, Telugu name, region/district, category, source URLs, notes, status.

## 5. Agent tasks for sourcing (Antigravity)
- *Lead collector:* read allowed pages and produce a lead sheet only (no text copying)
- *Fact-checker:* for each draft, list claims and match each to a source; flag unmatched claims
- *Similarity checker:* script comparing drafts to cited sources to catch close paraphrase
- *Terms checker:* summarise the terms and robots rules of each target site before any scraping

## 6. Human knowledge
Interview family cooks, hospitality faculty, local chefs and home cooks across regions. Record consent, name (if they agree) and date. Credit contributors in an "Acknowledgements" page.

## 7. Media plan
Preferred order: (1) own photography, (2) commissioned illustration or photography, (3) openly licensed media with attribution, (4) permissioned images from contributors. Keep licence and credit for each asset.
