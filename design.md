# design.md: Brand, UI/UX and Design System

Design is a deliverable, not a finish. The aim: a premium, calm, confident reference that feels like Andhra, not like a generic recipe template.

## 1. Subject, audience, job
- **Subject:** the food of Andhra Pradesh, famous for heat, tang (tamarind, gongura), coastal seafood, rice and ragi traditions, pickles and podis, and festival sweets.
- **Audience:** phone users, mostly on Android, many bilingual.
- **Primary job:** help someone find a dish fast, understand it deeply, cook it, or ask a question and trust the answer.

## 2. Design concept: "The Leaf and the Heat"
The banana leaf is where an Andhra meal is served, and heat (karam) is the region's calling card. The interface sits on leaf green and turmeric, and uses **heat** as a recurring, meaningful signal rather than decoration.

**The one memorable element:** an interactive **map of Andhra Pradesh** as the home hero. Three regions (Uttarandhra, Coastal Andhra, Rayalaseema) are tappable shapes. Touching one reveals its signature dishes and its character in a sentence. Everything else on the page stays quiet.

Supporting signature: the **Heat Meter**, a five-step chilli scale used on dish cards and filters (see 6).

## 3. Design tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| `leaf-900` | `#103226` | Dark surfaces, header, hero background |
| `leaf-700` | `#1F5A43` | Primary buttons, links on light |
| `leaf-100` | `#E4EFE7` | Subtle fills, selected chips |
| `turmeric-500` | `#F2B31B` | Primary accent, highlights, focus ring on dark |
| `turmeric-700` | `#8A6200` | Accent text on light (passes contrast) |
| `guntur-600` | `#B3261E` | Heat indicator and warnings only |
| `rice-50` | `#F6F8F4` | Page background (light) |
| `ink-900` | `#1B221E` | Body text (light) |
| `ink-600` | `#4B5750` | Secondary text |
| `tamarind-700` | `#5B3A2C` | Rare earthy accent for tags and illustrations |

Rules: red is **only** for heat and cautions. Turmeric on light backgrounds is never used for small text. Dark theme uses `leaf-900` as background and `rice-50` text, with the same accents. Check every pair for 4.5:1.

### Typography
| Role | Typeface | Notes |
|---|---|---|
| Display (Latin) | **Bricolage Grotesque** | Expressive width and weight, used large and tight |
| Display (Telugu) | **Anek Telugu** | Variable weight and width, pairs well with display Latin |
| Body (Latin + Telugu) | **Hind Guntur** | One family covering both scripts for consistent rhythm |

- Confirm glyph rendering for Telugu conjuncts on real Android and iOS devices early (M0).
- Type scale (mobile): 12 / 14 / 16 (body) / 18 / 22 / 28 / 36 / 48. Increase Telugu line-height by about 10% compared with Latin.
- Body line length under 70 characters. Body line-height 1.6 (Telugu 1.75).
- Headlines are sentence case. Dish names in Telugu and English appear together: Telugu large, transliteration beneath.

### Shape, space, elevation
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 72.
- Radius is purposeful: 6px for inputs and chips, 14px for dish cards, 28px for hero and sheets. Not everything gets the same radius.
- Elevation is rare: sheets and the chat composer only. Prefer fills and spacing.
- Minimum touch target 44 by 44px.

## 4. Layout principles
- Single column on phones, 2 columns on tablets, 12-column grid on desktop with a maximum content width of 1200px.
- **Bottom navigation** on mobile (Home, Browse, Ruchi, Saved), top navigation on desktop.
- Ruchi is reachable from every screen through a persistent control that does not cover content.
- Left-aligned text throughout; centre only the hero map caption.
- Dish cards are image-led with the Telugu name, English name, region and heat meter. No cards for content that is simply a list; use list rows.

## 5. Key screens

### Home
```
┌──────────────────────────┐
│ Andhra Ruchulu     [తె/EN]│
│                          │
│   Where do you want      │
│   to eat from?           │
│                          │
│     ╭── AP MAP ──╮       │
│     │ Uttarandhra│       │
│     │ Coastal    │       │
│     │ Rayalaseema│       │
│     ╰────────────╯       │
│  "Coastal: rice, seafood,│
│   sweets of the Godavari"│
│  [ See 24 dishes ]       │
├──────────────────────────┤
│ Ask Ruchi anything...  ▶ │
├──────────────────────────┤
│ Browse by: Tiffins · Rice│
│ Curries · Pickles · Sweets│
├──────────────────────────┤
│ Now in season / Festival │
└──────────────────────────┘
 [Home][Browse][Ruchi][Saved]
```

### Dish page
```
┌──────────────────────────┐
│ [Hero image]             │
│ పెసరట్టు                  │
│ Pesarattu                │
│ Coastal · Tiffin · Veg   │
│ Heat ●●○○○   40 min      │
├──────────────────────────┤
│ The story (short)        │
│ Ingredients  [servings -+]│
│ Steps  [ Start cooking ] │
│ Technique links          │
│ Serve with / Related     │
│ Sources                  │
└──────────────────────────┘
```
**Cooking mode:** full-screen, one step at a time, large type, screen stays awake, built-in timers where a step names a duration, swipe or tap for next, ingredients one tap away.

### Browse
Sticky search field, filter chips (region, category, diet, heat, time), results as image cards in a two-column grid on phones, with an option to switch to compact list.

### Ruchi chat
- Full-height conversation, composer pinned above the bottom nav
- Suggested questions at the start ("What is a typical Rayalaseema lunch?")
- Answers stream in; each answer ends with **source chips** linking to entries
- Out-of-scope reply is friendly and redirects: "I only know Andhra Pradesh food. Try asking about..."
- A visible way to rate an answer and report an error

## 6. Signature components

### Heat Meter
Five levels, shown as chilli marks with a text label so colour is never the only cue.
| Level | Label (EN) | Label (TE) |
|---|---|---|
| 1 | Mild | తేలిక |
| 2 | Gentle | మధ్యస్థం |
| 3 | Karam | కారం |
| 4 | Fiery | ఘాటు |
| 5 | Guntur-level | గుంటూరు కారం |

(Telugu labels to be reviewed by a native speaker.)

### Other components
Dish card · Ingredient chip · Region map · Servings scaler · Step card · Timer · Source chip · Filter sheet · Language toggle · Chat bubble with citations · Empty state · Skeleton loaders · Install-app prompt (shown once, after engagement).

## 7. Motion
- **One orchestrated moment:** on first Home load the three regions light up in sequence, like a stove being lit, then settle. Plays once per session.
- Responsive motion only elsewhere: sheet open and close, step transitions, servings change, favourite toggle.
- Duration 150 to 250ms, ease-out. Respect `prefers-reduced-motion` by replacing motion with instant state changes.
- No scroll-triggered entrance animations on every section.

## 8. Imagery and iconography
- Photography direction: natural light, real home kitchens and banana leaf service, steel plates and clay pots, visible texture. Avoid generic overhead "thali" stock photos.
- If photography is not available at launch, use a consistent illustrated style with the palette above rather than mixing unrelated stock images.
- Every image has descriptive alt text. Images are lazy-loaded below the fold with blurred placeholders.
- Icon set: one line-icon family at 1.5px stroke (e.g. Lucide), plus custom icons for chilli, banana leaf, tamarind and the map.

## 9. Voice and microcopy
- Plain, warm, specific. Sentence case. Active voice.
- Buttons say what happens: "Start cooking", "Save dish", "Ask Ruchi".
- Same action keeps the same name everywhere ("Save" produces "Saved").
- Errors say what happened and what to do. Empty states invite action.
- Use Telugu food terms as people say them, with a short English gloss on first use.

## 10. Accessibility and inclusion
- WCAG 2.2 AA; visible focus rings (turmeric on dark, leaf-700 on light)
- Semantic landmarks, correct heading order, labelled controls
- Text scales to 200% without breaking layout
- Heat and dietary markers use text plus icon, never colour alone
- Region map has a list alternative for screen readers and keyboard users
- Telugu and English both fully supported in screen-reader labels (`lang` attributes set per element)

## 11. Design QA checklist
- [ ] 360, 390, 768, 1280px verified
- [ ] Light and dark themes verified
- [ ] Telugu rendering verified on Android Chrome and iOS Safari
- [ ] Contrast checked for all token pairs
- [ ] Keyboard and screen reader pass
- [ ] Reduced motion pass
- [ ] Lighthouse accessibility 95+
