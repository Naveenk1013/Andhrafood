# progress.md: Living Progress Tracker

> Update this file at the end of every working session or agent task.
> Status key: ⬜ not started · 🟦 in progress · ✅ done · ⛔ blocked

**Last updated:** 2026-10-20  
**Current phase:** M0–M9 Complete · Live in Production on Vercel ([https://andhraruchulu.vercel.app/](https://andhraruchulu.vercel.app/)) · Portfolio Attribution Added · Preparing for M10 Mobile Overhaul  
**Next action:** Milestone 10: Comprehensive Mobile Interface Overhaul & Native Touch Experience (scheduled for next session).

---

## Milestone overview

| Milestone | Status | Target | Notes |
|---|---|---|---|
| M0 Foundations | ✅ | Done | Scaffolding, TypeScript, Tailwind, Zod, Vitest |
| M1 Content core | ✅ | Done | 38 dishes across 26 districts + Dish detail recipe pages + Saved Recipe Vault |
| M2 Discovery | ✅ | Done | 3D DriftWall gallery, real-time search, regional & category filters, full desktop lock |
| M3 Ruchi AI Chef | ✅ | Done | Ruchi AI assistant, living Orb persona, futuristic entry sound, grounded local DB search |
| M4 Media & CDN Scale | ✅ | Done | Cloudinary `APFOOD` migration (100% cloud URLs, 38/38 dishes custom photographed, 4K hero video) |
| M5 Polish & Launch | ✅ | Done | Footer cleanup, Non-official Community branding, verified schema |
| M6 Native Mobile App | ✅ | Done | 100% zero horizontal scrolling on mobile portrait; touch-action: pan-y; responsive app bar; adaptive 3D DriftWall; PWA manifest |
| M7 Pantry Matcher | ✅ | Done | "Cook with What I Have" interactive pantry, real-time match scoring, 4 cultural presets, bilingual EN/TE, Ruchi AI prompt handoff |
| M8 Deep Security Hardening | ✅ | Done | Production-grade CSP, HSTS, X-Frame-Options DENY, safeJsonLd tag escaping, sliding window IP rate limiting, input size limits, open redirect protection, sanitized error outputs |
| M9 Hosting & Deployment | ✅ | Done | 100% live on Vercel at `https://andhraruchulu.vercel.app/`; GitHub sync (`Naveenk1013/Andhrafood`), zero credential leaks |
| M10 Mobile Interface Overhaul | 🟦 | Next (Post-Break) | Deep mobile UX overhaul: thumb-zone ergonomics, bottom sheet filters, touch swipe cards, adaptive typography, mobile-first recipe cards, 60fps mobile transitions |

---

## 📸 AI Dish Photography & Cloudinary CDN Links (All 38 Dishes)

All 38 traditional Andhra dishes now possess bespoke, award-winning food photography generated through AI and delivered globally via Cloudinary Edge CDN (`APFOOD` folder). Every image is verified HTTP 200 OK with zero local fallback dependencies.

---

### 1. `allam-pachadi` — Allam Pachadi (అల్లం పచ్చడి)
- **Dish Identity:** Iconic sweet-tangy-spicy ginger relish of Andhra; the sacred soulmate to MLA Pesarattu.
- **Region & Districts:** Coastal Andhra (NTR, Guntur, Krishna, East Godavari).
- **Culinary Profile & Visual Details:** Dense, glossy, dark mahogany-red to warm amber ginger chutney. Visible flecks of crushed fresh ginger fibers, roasted dried Guntur red chillies, and golden mustard seeds. Fresh hot tempering of curry leaves, whole red chillies, and split urad dal glistening with cold-pressed sesame oil.
- **Traditional Vessel & Setting:** Served in a small antique brass katori (*kanchu kinnam*) or a white-and-brown glazed ceramic bharani (*martaban*), placed on a fresh banana leaf right next to the crispy corner of a golden pesarattu.
- **Lighting & Angle:** 45-degree close-up macro shot with warm directional side lighting highlighting the rich, sticky sheen and texture.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792411612/APFOOD/allam-pachadi.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Photorealistic, award-winning food photography of traditional Andhra Allam Pachadi (authentic ginger chutney). Rich, glossy, dark amber-mahogany textured relish served in a small vintage brass bowl (kanchu kinnam) set upon a vibrant green banana leaf. Glistening with a sizzling golden sesame oil tempering of whole black mustard seeds, split urad dal, crisp curry leaves, and a whole dried red chilli. A freshly folded golden-brown crispy pesarattu crepe rests beside it. Warm cinematic side lighting, rustic dark wood table, shallow depth of field, 8k resolution, Michelin-guide culinary aesthetic.`

---

### 2. `avakaya` — Avakaya / King Mango Pickle (ఆవకాయ)
- **Dish Identity:** The undisputed emperor of Telugu cuisine; intense raw green mango pickle cured in stone-ground mustard, fiery red chilli, and cold-pressed sesame oil.
- **Region & Districts:** Coastal Andhra (Guntur, Krishna, East Godavari, West Godavari, NTR).
- **Culinary Profile & Visual Details:** Plump, sharp-cut cubes of hard raw green mango with intact fibrous white inner shell (tenka), thoroughly coated in a deep crimson, coarse stone-ground paste of mustard powder (aavapindi) and vibrant Guntur red chilli powder. A deep pool of aromatic, reddish-gold sesame oil floating over the mango pieces. Whole peeled garlic cloves nestled in the spicy slurry.
- **Traditional Vessel & Setting:** Overflowing from a traditional heavy Andhra ceramic jar (*jaadi / bharani*) with white and mustard-yellow glaze. Beside it, a vintage brass spoon dripping spicy red oil, and a small mound of steaming hot white rice with a golden crater of melted ghee.
- **Lighting & Angle:** Dynamic 3/4 hero shot, studio daylight with rich shadows, highlighting the ruby-red oil refraction and glistening mango skin.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792411657/APFOOD/avakaya.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Ultra-detailed, cinematic culinary photography of authentic Andhra Avakaya (raw green mango pickle). Thick, sharp-cut cubes of raw green mango with inner white shells, bathed in a fiery, deep ruby-red coarse mustard and Guntur chilli paste, submerged under glistening red-tinted cold-pressed sesame oil. Whole garlic cloves embedded within. Displayed inside an authentic traditional South Indian white and ochre glazed ceramic pickle jar (jaadi/bharani). In the background, a small portion of steaming hot white rice with melting golden ghee on a banana leaf. Warm natural lighting, macro food photography, rich textures, 8k.`

---

### 3. `pulagam` — Pulagam / Sacred Peppercorn Rice (పులగం)
- **Dish Identity:** Ancient Vedic pre-chilli temple comfort dish cooked from newly harvested winter paddy, split moong dal, and fragrant peppercorn tempering for Makara Sankranti.
- **Region & Districts:** Coastal Andhra & Rayalaseema (Krishna, Guntur, Tirupati, East Godavari).
- **Culinary Profile & Visual Details:** Moist, soft, steaming pale golden rice and tender yellow split moong dal cooked to a comforting creamy-grainy texture. Generously pooled with molten Bilona cow ghee on top. Studded with whole cracked black peppercorns (miriyalu), toasted cumin seeds (jeelakarra), and fresh crisp curry leaves. Steam rising gently.
- **Traditional Vessel & Setting:** Served hot in a traditional unpolished heavy bell-metal bronze bowl (*kancamu*) or directly on a sacred plantain leaf. Accompanied by a rustic small stone bowl of Kandi Pachadi (roasted toor dal chutney).
- **Lighting & Angle:** Top-down 45-degree angle with soft atmospheric morning backlighting catching the delicate rising curls of steam and the golden ghee pool.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792411704/APFOOD/pulagam.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Professional food photography of Andhra Pulagam (sacred temple rice and moong dal). Soft, comforting, steaming mounds of pale golden rice and yellow split lentils, glistening with a generous pool of melted golden cow ghee in the center. Dotted with whole black peppercorns, roasted cumin seeds, and glossy fresh green curry leaves. Served in an artisanal antique bell-metal bronze bowl (kancamu) resting on a fresh wet banana leaf. A small terracotta bowl of coarse kandi pachadi on the side. Gentle steam rising, soft morning window light, high contrast, rustic Indian temple kitchen atmosphere, 8k.`

---

### 4. `pachi-pulusu` — Pachi Pulusu / Raw Tamarind Elixir (పచ్చి పులుసు)
- **Dish Identity:** Ingenious no-cook cooling summer soup of Rayalaseema; cold-extracted tamarind water infused with fire-roasted green chillies, raw shallots, and peanut powder.
- **Region & Districts:** Rayalaseema (Kurnool, Anantapuramu, YSR Kadapa, Chittoor).
- **Culinary Profile & Visual Details:** Translucent, light golden-brown tangy tamarind broth. Floating with charred, blistered green chilli bits, hand-crushed pink shallots, fresh torn coriander leaves, and fine golden peanut powder. A glistening aromatic surface tempering of spluttered brown mustard seeds and crushed garlic cloves in fragrant groundnut oil.
- **Traditional Vessel & Setting:** Served in an ornate traditional South Indian brass katori or a shallow glazed clay bowl on a dark rustic slate stone slab. A brass ladle resting on the rim.
- **Lighting & Angle:** High-angle top-down shot with crisp natural lighting showcasing the translucent broth, floating char marks, and oil ripples.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792411803/APFOOD/pachi-pulusu.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Gourmet food photography of authentic Rayalaseema Pachi Pulusu (unheated raw tamarind soup). Translucent golden-amber tamarind broth floating with fire-charred crushed green chillies, hand-sliced tender pink shallots, fresh cilantro, and a dusting of roasted peanut powder. Glistening surface with hot tempering of cracked black mustard seeds, dried red chillies, and golden roasted garlic cloves in groundnut oil. Served in a polished vintage brass bowl on a dark stone slab. Crisp reflections, vivid colors, editorial culinary magazine photography, 8k resolution.`

---

### 5. `aratikaya-aava-kura` — Aratikaya Aava Kura (అరటికాయ ఆవ కూర)
- **Dish Identity:** Royal Godavari wedding feast vegetable delicacy; firm green plantain cooked with freshly ground pungent raw mustard paste and ginger.
- **Region & Districts:** Coastal Andhra (East Godavari, West Godavari, Konaseema, Kakinada).
- **Culinary Profile & Visual Details:** Tender, firm, golden-yellow steamed raw banana (plantain) cubes evenly coated in a thick, velvety, pale-yellow stone-ground mustard paste (aavapindi). Finely minced green chillies, ginger slivers, and a vibrant golden ghee tempering of chana dal, mustard seeds, and fresh curry leaves. Zero gravy—a sophisticated dry-medium coating.
- **Traditional Vessel & Setting:** Placed in a shallow South Indian brass serving dish (*thali bowl*) on an authentic banana leaf feast setting.
- **Lighting & Angle:** Side-angle close-up capturing the grain of the mustard coating and the tender texture of the plantain cubes.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792411847/APFOOD/aratikaya-aava-kura.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `High-end culinary photography of traditional Godavari Aratikaya Aava Kura (raw plantain in pungent mustard paste). Perfectly cut firm cubes of pale golden steamed green banana, richly coated in a creamy, stone-ground yellow mustard seed and ginger sauce. Dotted with crunchy golden chana dal, black mustard seeds, slit green chillies, and glossy green curry leaves. Served in an authentic South Indian hammered brass bowl on a fresh banana leaf. Soft warm lighting, tactile food texture, restaurant culinary presentation, 8k.`

---

### 6. `chinta-chiguru-pappu` — Chinta Chiguru Pappu (చింతచిగురు పప్పు)
- **Dish Identity:** Seasonal springtime foragers' dal; tender pinkish-green baby tamarind shoots simmered with toor dal, garlic, and pure cow ghee.
- **Region & Districts:** Coastal Andhra & Palnadu (Guntur, Prakasam, Palnadu, Krishna).
- **Culinary Profile & Visual Details:** Hearty, thick, rustic yellow toor dal with a characteristic delicate herbal olive-green tint from melted baby tamarind leaves. Softly mashed with a wooden dal churner (*pappu gutti*). Crowned with a rich, sizzling pool of golden cow ghee tempering carrying whole garlic pods, mustard seeds, cumin, and fiery dried red chillies.
- **Traditional Vessel & Setting:** Served in a hand-thrown unglazed terracotta clay pot (*kunda*), accompanied by a wooden dal churner resting nearby and crisp sun-dried curd chillies (*majjiga mirapakayalu*).
- **Lighting & Angle:** Warm rustic ambient lighting with gentle steam rising from the hot ghee tempering.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792411901/APFOOD/chinta-chiguru-pappu.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Artisanal food photography of Andhra Chinta Chiguru Pappu (tender spring tamarind leaf dal). Creamy, thick yellow toor dal speckled with delicate, crushed olive-green tender tamarind leaves, topped with a sizzling pool of golden desi cow ghee carrying toasted whole garlic cloves, cracked cumin, black mustard seeds, and whole dried red chillies. Served in an authentic rustic clay handi (terracotta pot) on a wooden table with dried curd chillies (majjiga mirapakayalu) on the side. Gentle steam, warm cozy lighting, deep cultural aesthetic, 8k.`

---

### 7. `alasanda-vada` — Rayalaseema Alasanda Vada (అలసంద వడలు)
- **Dish Identity:** The crispy pride of Rayalaseema; coarsely ground black-eyed pea (lobia) patties seasoned with mint, onions, and chillies, deep-fried to a crackling crunch.
- **Region & Districts:** Rayalaseema (Chittoor, Tirupati, Annamayya, YSR Kadapa).
- **Culinary Profile & Visual Details:** Golden-brown, extremely crispy, irregularly shaped disc fritters. Visible rough texture of coarsely crushed black-eyed peas, flecks of fresh green mint, finely diced purple red onions, green chilli bits, and cumin seeds. Super crunchy blistered exterior with a soft, steaming savory interior.
- **Traditional Vessel & Setting:** Piled high in a rustic hand-woven bamboo basket lined with banana leaf or butter paper. Served with a bowl of fiery red country chicken gravy (Natu Kodi Pulusu) and a coconut-peanut chutney.
- **Lighting & Angle:** Dynamic close-up 45-degree angle with directional side lighting highlighting the ultra-crispy, craggy edges and golden fried crunch.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792411982/APFOOD/alasanda-vada.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Crisp, high-definition food photography of Rayalaseema Alasanda Vada (black-eyed pea fritters). Stack of golden-brown, deeply crunchy, irregularly shaped lentil patties with visible texture of crushed black-eyed peas, chopped red onions, fresh mint leaves, and green chillies. One vada broken in half showing the steaming, soft, savory inside against the blistered crunchy crust. Arranged in a handcrafted bamboo basket lined with fresh green banana leaf. Accompanied by a small earthen bowl of spicy red chicken curry. Warm rustic kitchen lighting, street food mastery, 8k.`

---

### 8. `kandi-pachadi` — Kandi Pachadi (కంది పచ్చడి)
- **Dish Identity:** The ultimate Telugu comfort relish; slow-roasted toor dal, cumin, and dry chillies stone-ground into a thick, nutty, coarse paste.
- **Region & Districts:** Coastal Andhra & Palnadu (Krishna, Guntur, Bapatla, Prakasam).
- **Culinary Profile & Visual Details:** Thick, dense, coarse paste of warm ochre/terracotta-red color. Gritty texture of stone-crushed roasted lentils, flecks of roasted red chillies, and cumin seeds. Tempered with a glossy drizzle of sesame oil, mustard seeds, and a single whole curved dried red chilli on top.
- **Traditional Vessel & Setting:** Shaped into a rustic neat dome in a shallow brass saucer or traditional granite stone mortar (*rolu*), served alongside a steaming plate of hot white rice with a well of molten ghee.
- **Lighting & Angle:** Macro close-up shot emphasizing the gritty, artisanal stone-ground texture and the warm terracotta tones.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792412031/APFOOD/kandi-pachadi.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Macro culinary photography of traditional Andhra Kandi Pachadi (roasted toor dal chutney). A neat, dense mound of coarse, gritty, terracotta-ochre stone-ground dal relish, showing visible specks of roasted lentils, cumin, and cracked red chillies. Glistening with a light tempering of mustard seeds and a whole dried red chilli in sesame oil. Served in an authentic vintage stone or brass bowl beside steaming hot white rice with a swirl of golden melted ghee. Moody warm directional light, tactile food texture, heritage kitchen, 8k.`

---

### 9. `peethala-kura` — Konaseema Peethala Kura (పీతల కూర)
- **Dish Identity:** Iconic delta seafood delicacy; live Godavari mud crabs cooked in an earthen pot with a thick, fiery, caramelized onion, black pepper, and tamarind curry.
- **Region & Districts:** Coastal Andhra (Konaseema, Kakinada, West Godavari, Krishna).
- **Culinary Profile & Visual Details:** Big, succulent Godavari mud crab claws and shells cracked open, coated in a thick, glistening, dark mahogany-red curry. Droplets of red spiced oil floating on the surface (*telu*). Garnished with freshly chopped green coriander leaves, slit green chillies, and cracked black pepper.
- **Traditional Vessel & Setting:** Cooked and presented in a wide, authentic black-seasoned clay pot (*chatti / kunda*), with whole cracked crab claws resting proudly in the rich gravy. Served with white rice on a broad banana leaf.
- **Lighting & Angle:** Low-angle 3/4 hero shot with dramatic spotlighting accentuating the glossy crab shell highlights and rich dark gravy.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792412093/APFOOD/peethala-kura.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Award-winning food photography of authentic Konaseema Peethala Kura (Godavari mud crab curry). Fresh sea crabs and huge cracked claws simmered in a dense, fiery, dark-red spiced tamarind and caramelized onion gravy, with glistening red chili oil floating on top. Garnished with fresh green coriander sprigs and slit green chillies. Served inside a traditional blackened clay pot (matka/chatti) on a rustic wooden boat deck setting. Dramatic seafood feast lighting, high contrast, glistening textures, 8k resolution.`

---

### 10. `beerakaya-badam-paalu-koora` — Beerakaya Badam Paalu Koora (బీరకాయ బాదం పాలు కూర)
- **Dish Identity:** Aristocratic royal court delicacy of Pithapuram & Bobbili; tender ridge gourd gently braised in a velvety blanched almond and dairy milk sauce with cardamom.
- **Region & Districts:** Coastal Andhra (East Godavari, Kakinada, West Godavari).
- **Culinary Profile & Visual Details:** Silky, pale ivory-cream gravy with emerald-green tender cooked ridge gourd cubes. Finished with slivered toasted almonds, green cardamom fragrance, and a light golden ghee tempering of cumin seeds and mild green chillies. Elegant, royal, and refined appearance.
- **Traditional Vessel & Setting:** Served in a fine vintage silverware or ivory ceramic bowl on an ornate royal brass tray, flanked by warm, puffed phulkas.
- **Lighting & Angle:** Soft, bright, elegant high-key lighting showcasing the delicate creamy white sauce and tender green vegetable contrast.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792412177/APFOOD/beerakaya-badam-paalu-koora.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Sophisticated fine-dining food photography of Beerakaya Badam Paalu Koora (ridge gourd in rich almond milk curry). Tender emerald-green cubes of ridge gourd simmered in a luxurious, creamy, ivory-white sauce of stone-ground almonds and milk. Garnished with golden slivered toasted almonds, subtle cumin ghee droplets, and delicate fresh cilantro leaves. Served in an antique silver bowl with delicate motifs on a royal teak table with soft phulkas nearby. Soft airy lighting, royal Andhra palace aesthetic, elegant culinary styling, 8k.`

---

### 11. `bobbili-pulusu` — Bobbili Dappalam (బొబ్బిలి పులుసు / దప్పళం)
- **Dish Identity:** Regal sweet-sour vegetable stew from the Bobbili royal court; drumsticks, yellow pumpkin, sweet potato, and plantain in a silky rice-flour thickened jaggery broth.
- **Region & Districts:** Uttarandhra (Vizianagaram, Srikakulam, Parvathipuram Manyam).
- **Culinary Profile & Visual Details:** Glossy, velvety, translucent golden-amber stew. Chunks of tender drumsticks, bright orange pumpkin, sweet potato, and green plantain visible through the silky broth. A delicate sheen from the traditional rice-flour roux. Tempered with mustard seeds, fenugreek seeds, curry leaves, and whole red chillies.
- **Traditional Vessel & Setting:** Served in an authentic deep bell-metal bronze bowl (*gangalam*) or a traditional Uttarandhra clay pot, with a brass ladle dipping into the stew.
- **Lighting & Angle:** 45-degree angle with warm amber backlighting highlighting the glossy, velvety sheen of the broth and the vibrant vegetable chunks.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792412236/APFOOD/bobbili-pulusu.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `Vibrant food photography of traditional Bobbili Dappalam (royal Uttarandhra sweet-and-sour vegetable stew). Glossy, velvety, amber-golden tamarind and jaggery stew filled with tender drumsticks, sweet potato cubes, and bright orange pumpkin pieces. Glistening with a fragrant tempering of mustard seeds, methi seeds, and whole dried red chillies in sesame oil. Served in an artisanal bronze serving pot (gangalam) on a festive banana leaf. Rich glossy reflections, vibrant colors, royal heritage cooking, 8k.`

---

### 12. `chintakaya-thokku` — Chintakaya Thokku (చింతకాయ తొక్కు పచ్చడి)
- **Dish Identity:** Vanishing winter harvest relish of Rayalaseema; unripe green tamarind pods stone-pounded with crystal salt, turmeric, and fresh green chillies.
- **Region & Districts:** Rayalaseema (Kurnool, Anantapuramu, YSR Kadapa, Prakasam).
- **Culinary Profile & Visual Details:** Bright, rustic olive-green to yellowish-green coarse pounded relish. Visible flecks of green tamarind pod skin, crushed green chillies, cracked garlic cloves, and yellow turmeric. Moist and glistening with cold-pressed sesame oil tempering of black mustard seeds and curry leaves.
- **Traditional Vessel & Setting:** Displayed in a traditional heavy granite stone mortar (*rolu*) with the stone pestle (*rokali*) in the background, or packed into an authentic small earthenware pot. Fresh whole green raw tamarind pods scattered on the wooden surface.
- **Lighting & Angle:** High-texture close-up shot with natural window light emphasizing the coarse hand-pounded texture and fresh green color.
- **Target Cloudinary URL:** `https://res.cloudinary.com/dro6n6co1/image/upload/v1792412329/APFOOD/chintakaya-thokku.jpg` (Status: Live ✅)
- **AI Prompt:**
  > `High-definition culinary photography of authentic Andhra Chintakaya Thokku (freshly pounded raw green tamarind pickle). Coarse, vibrant olive-green stone-pounded relish with visible bits of tender green tamarind skin, crushed green chillies, and smashed garlic cloves, lightly tempered with black mustard seeds and sesame oil. Presented directly inside a traditional hand-carved black granite stone mortar (rolu). Fresh raw green tamarind pods and rock salt crystals scattered on the rustic wooden table surface. Natural daylight, artisanal food styling, organic farm aesthetic, 8k.`

---

## 🛠️ Image Generation & CDN Upload Execution Workflow

When the Gemini image generation quota resets at **00:44 AM IST**:

1. **Generate Image**:
   Use `generate_image` with the prompt specified for each dish above.
   Example:
   ```json
   {
     "Prompt": "...",
     "ImageName": "dish_allam_pachadi",
     "AspectRatio": "1:1"
   }
   ```
2. **Upload to Cloudinary**:
   Execute the automated uploader script:
   ```bash
   node scripts/upload-dish-image.mjs <slug> <generated-artifact-path>
   ```
3. **Verify CDN Delivery**:
   Run the test script to verify HTTP 200:
   ```bash
   node scripts/verify-cloudinary-links.mjs
   ```
4. **Update `src/data/dishes.json`**:
   Replace the fallback regional cover URL with the new live Cloudinary URL:
   `https://res.cloudinary.com/dro6n6co1/image/upload/v.../APFOOD/<slug>.jpg`

---

## M0 Foundations
- [x] Project documentation set created
- [x] Confirm working names (Andhra Ruchulu & Ruchi AI)
- [x] Confirm stack in `architecture.md` (Next.js 15, TypeScript, Tailwind, JSON DB)
- [x] Scaffold Next.js + TypeScript + Tailwind project
- [x] Add design tokens and fonts (Telugu-ready: Anek Telugu & Hind Guntur)
- [x] Define Zod schemas (`data-model.md`)
- [x] Build content validation script
- [x] Unit test suite for schema validation (Vitest)

## M1 Content core
- [x] Research and draft authentic & forgotten Andhra dishes (38 dishes across 26 districts)
- [x] Seed initial ingredient and region entries (7 ingredients, 3 regions, 2 techniques)
- [x] Home screen layout with regional glass folders, scroll-expansion hero, taste philosophy bento
- [x] Browse 3D gallery page (`/browse`) and Dish recipe detail page (`/dishes/[slug]`)
- [x] Personal Saved Recipe Vault (`/saved`) with local storage bookmarking and starter suggestions
- [x] Interactive `BookmarkButton.tsx` on dish pages with instant feedback
- [x] Bilingual support for all dishes and categories (English & Telugu)

## M2 Discovery
- [x] Real-time live search (dish names, Telugu, transliterations, ingredients)
- [x] Regional tabs (Coastal Andhra, Rayalaseema, Uttarandhra) with sliding fluid indicators
- [x] Course/Category filtering pills (Tiffins, Rice, Curries, Dals, Pickles, Sweets)
- [x] React Bits `<DriftWall />` 3D Parallax Canvas with mouse damping & hover lift
- [x] Immersive Fullscreen Mode for 3D DriftWall Gallery with integrated real-time search bar, quick region filters, and ESC keyboard support
- [x] Desktop Layout Lock: 3D DriftWall locked to 5 columns (6 in fullscreen) with 230x150 tile sizing across all devices
- [x] Language toggle (English / Telugu with next-intl)

## M3 Ruchi AI Chef
- [x] Ruchi AI chat workspace (`/ruchi`)
- [x] Living Ruchi Orb persona (idle, thinking, generating states)
- [x] Futuristic audio chime upon prompt entry
- [x] Embedded micro-orb prompt box with Radix Tooltip & Radix Dialog attachments
- [x] Grounded local knowledge retrieval across all 26 districts (with verified source chips)
- [x] Futuristic Ruchi AI Entrance Splash (`RuchiEntranceSplash.tsx`) with dynamic lazy-loaded WebGL2 RuchiOrb, zero-flicker synchronous head script, 3-stage neural initialization sequence, and ESC skip controls
- [x] Ruchi persona updated: warm and knowledgeable AI Culinary Guide celebrating Andhra food (all official government/APTDC references removed)

## M4 Media & CDN Scale (Cloudinary APFOOD)
- [x] Configured master Cloudinary integration (`APFOOD` dedicated folder)
- [x] Integrated 4K Andhra culinary hero video (`APfood_ebb8wq.mp4`) into `scroll-expansion-hero.tsx` with fallback poster and silent autoplay
- [x] Uploaded high-resolution regional covers (`region-coastal-andhra`, `region-rayalaseema`, `region-uttarandhra`) and hero banner (`hero-bhojanam`) to Cloudinary
- [x] Generated high-definition authentic Andhra dish photography using AI generation and uploaded to Cloudinary (100% complete — all 38 dishes)
- [x] Verified all 43 Cloudinary URLs (HTTP 200 OK via `scripts/verify-cloudinary-links.mjs`)
- [x] Completely removed local `/images/` fallbacks across `src/` (100% served via Cloudinary edge CDN)
- [x] Speed benchmarks: images loading in 89–128ms, video streaming in 81–92ms, client bundle 103 kB

## M5 Polish, Desktop Lock & Community Identity
- [x] **Desktop Layout Lock (True Desktop View)**:
  - Viewport locked to fixed 1280px (`width: 1280`) in `src/app/[locale]/layout.tsx`
  - `html` and `body` set to `min-width: 1280px` in `src/app/globals.css`
  - Mobile browsers auto-scale the full desktop website, eliminating narrow single-column collapse
  - Removed mobile bottom navigation (`BottomNav.tsx`) and padding offsets
  - Top Header permanently displays full desktop navigation (`All Dishes`, `Ruchi AI`, `Saved`, Theme toggle, Language toggle)
  - Regional Glass Folders locked to 3 columns side-by-side with 340px width (`RegionalGlassFolders.tsx`)
- [x] **Footer Streamlined**:
  - Removed the 4 links columns (`CULINARY ZONES`, `AI & FIELDWORK`, `LEGAL & PRIVACY`, `GOVERNANCE`)
  - Cleaned top heritage bar with Andhra Ruchulu insignia and `26 Districts United` badge
- [x] **Platform Identity Realigned to Community Initiative**:
  - Removed all official government and APTDC claims across the platform (`Footer.tsx`, `layout.tsx`, `seo-schema.ts`, `gemini-rag.ts`, `privacy/page.tsx`, `terms/page.tsx`, `dishes/[slug]/page.tsx`)
  - Tagline updated: *"Bringing All Andhra Dishes Together · ఆంధ్ర వంటకాల సమగ్ర వేదిక"*
  - Copyright updated: `© 2026 Andhra Ruchulu · Made to bring all the dishes of Andhra together.`
- [x] Custom loading skeleton with shimmer wave animation (`loading.tsx`)
- [x] Custom 404 Experience with clay pot metaphor and Ruchi AI rescue bar
- [x] **Mobile Application Optimization & Auto-Fit Architecture**:
  - Maintained 100% identical desktop layout structure (3 regional folders side-by-side, 3D DriftWall columns, full header navigation, taste bento grid).
  - Implemented synchronous `MobileAppScaler` script in `<head>` that calculates `scale = screen.width / 1280` dynamically, auto-fitting the entire 1280px desktop design into any mobile phone screen (360px–430px) without horizontal scrolling or manual zooming.
  - Added horizontal axis stabilization (`width: 1280px; max-width: 1280px; overflow-x: hidden; touch-action: pan-y pinch-zoom;`) preventing screen wobbling or sideways drifting during vertical thumb scrolling.
  - Prevented disruptive iOS Safari auto-zooming on search/chat focus with minimum 16px input sizing.
  - Enhanced touch responsiveness with `touch-action: manipulation;` across all buttons and links.
  - Integrated Progressive Web App architecture: `src/app/manifest.ts` delivering `/manifest.webmanifest` (HTTP 200 OK in 25ms) with `display: 'standalone'` and Apple mobile web app metadata for home-screen installation.

## M6 Refinement & Zero-Lag Snappiness Engineering
- [x] **Scroll-Jacking & Touch Lock Elimination**:
  - Completely refactored `ScrollExpandMedia` (`scroll-expansion-hero.tsx`) to use passive, non-blocking native scroll tracking (`window.addEventListener('scroll', ..., { passive: true })`) throttled by `requestAnimationFrame`.
  - Removed all `e.preventDefault()`, wheel event interception, and `window.scrollTo(0, 0)` locks, restoring native 120fps inertia scrolling, mouse wheel flicking, trackpad gestures, keyboard navigation (Space/Down/PageDown), and touch panning.
  - Content sections flow seamlessly below the hero banner with zero layout pop-in or blank opacity states.
- [x] **Elimination of Blocking Blur & Filter Jank**:
  - Removed heavy GSAP ScrollTrigger + SVG turbulence noise filters (`FadeContent`) from homepage headline, description, and dish detail pages (`dishes/[slug]/page.tsx`), enabling instantaneous text rendering without flash or delay.
  - Optimized `FluidMotion` animations by removing expensive `filter: blur(4px)` offscreen rasterization and switching to pure hardware-composited `transform` and `opacity` transitions.
  - Shifted scroll reveal viewport margins to pre-trigger rendering 50px before entering viewport (`margin: '0px 0px 50px 0px'`).
- [x] **GPU & WebGL Context Optimization**:
  - Defaulted `RuchiOrb` `size="xs"` to ultra-lightweight CSS variant (`variant="css"`), preventing multiple WebGL2 context initializations for small persistent header icons and search pills across all pages.
  - Replaced duplicate WebGL2 canvas in `RuchiGeneratingLoader` avatar with CSS variant, conserving GPU memory and avoiding browser context-lost errors.
- [x] **Fast Cinematic Splash & Local Storage Persistence**:
  - Replaced 5000ms blocking session intro with a swift 1.7s cinematic sequence in `RuchiEntranceSplash.tsx`.
  - Stored `ruchi_intro_seen` in both `localStorage` and `sessionStorage`, guaranteeing 0ms instant loading for returning visitors.
- [x] **Dev & Build Runtime Cleanliness**:
  - Resolved Next.js SWC `optimizePackageImports` bug with `framer-motion` in `next.config.ts`.
  - Verified clean static compilation and fast warm route response across `/en`, `/te`, `/en/pantry`, `/en/browse`, `/en/ruchi`, `/en/dishes/pesarattu`, and `/manifest.webmanifest`.

---

## Content tracker

| Type | Target | Drafted | Verified |
|---|---|---|---|
| Dishes | 38 | 38 | 38 (100% custom AI food photography live on Cloudinary CDN) |
| Ingredients | 30 | 7 | 7 |
| Techniques | 12 | 2 | 2 |
| Festivals/occasions | 10 | 2 | 2 |
| Regions | 3 | 3 | 3 |
| Media Assets | 43 | 43 | 43 (100% verified on Cloudinary CDN) |

---

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-10-20 | Live Production Launch on Vercel (`https://andhraruchulu.vercel.app/`): Initialized GitHub remote repository (`Naveenk1013/Andhrafood`), completed clean production build verification (103 kB First Load JS), eliminated all secret leaks from utility scripts, updated `Footer.tsx` with "Made with ♥ by Naveen" and portfolio link (`https://naveen-kr.netlify.app/`), and scheduled M10 Mobile Interface Overhaul | Antigravity + Naveen |
| 2026-10-19 | Comprehensive Security Audit & Hardening (M8): Configured strict Content-Security-Policy (CSP) with whitelisted Cloudinary & Google API origins, enforced HTTP Strict-Transport-Security (HSTS), X-Frame-Options (DENY), nosniff, and Permissions-Policy in `next.config.ts`; created `safeJsonLd` utility to prevent script tag injection across all structured data; implemented sliding-window IP rate limiting (20 req/min) and 500-char input validation on `/api/ruchi/chat`; protected `middleware.ts` against protocol-relative open redirects; moved Gemini API keys to secure `x-goog-api-key` HTTP transport headers; sanitized all API error responses against internal stack leaks | Antigravity + Naveen |
| 2026-10-19 | Refinement & Zero-Lag Speed Engineering: eliminated scroll-jacking and touch locks in `ScrollExpandMedia` (passive 120fps native scroll tracking), removed blocking GSAP/SVG blur filters (`FadeContent`), defaulted micro RuchiOrbs to CSS variant (saving WebGL2 contexts), accelerated entrance splash from 5s to 1.7s with localStorage persistence, optimized FluidMotion viewport margins, and fixed Next.js SWC package import config | Antigravity + Naveen |
| 2026-10-19 | Architected and launched "Cook with What I Have" Pantry Mode (`/[locale]/pantry`): intelligent ingredient matcher (`pantry-matcher.ts`), 4 cultural pantry presets, real-time recipe match % scoring with missing-item tags, bilingual EN/TE support, Header integration with `CookingPot` badge, and seamless 1-click Ruchi AI prompt handoff | Antigravity + Naveen |
| 2026-10-19 | Engineered Mobile Application Optimization: dynamic viewport auto-scaler (`scale = screen.width / 1280`), axis lock (`touch-action: pan-y pinch-zoom`), input auto-zoom prevention, and PWA standalone manifest (`manifest.webmanifest`) | Antigravity + Naveen |
| 2026-10-19 | Generated and uploaded custom photography for all 12 remaining dishes to Cloudinary APFOOD; 100% of 38 Andhra dishes now have dedicated bespoke culinary imagery (43/43 Cloudinary assets verified HTTP 200 OK) | Antigravity + Naveen |
| 2026-10-18 | Detailed all 12 pending dish image specifications with authentic prompts, cultural aesthetics, traditional vessels, and Cloudinary upload workflows in `progress.md` | Antigravity + Naveen |
| 2026-10-18 | Rebranded platform identity to non-official community initiative bringing all Andhra dishes together; removed all APTDC/government claims across codebase | Antigravity + Naveen |
| 2026-10-18 | Streamlined Footer: removed 4 links columns (Culinary Zones, AI, Legal, Governance) leaving clean banner and rights bar | Antigravity + Naveen |
| 2026-10-18 | Locked layout to True Desktop View (1280px viewport width, min-width 1280px, no mobile bottom nav, full desktop header, 3-column folders, 5-column DriftWall) | Antigravity + Naveen |
| 2026-10-18 | Built Saved Recipe Vault (`/saved`) and `BookmarkButton` component with localStorage persistence | Antigravity + Naveen |
| 2026-10-18 | Completed 100% Cloudinary CDN migration (43 assets in `APFOOD`, 4K video hero, 0 local image dependencies, verified HTTP 200) | Antigravity + Naveen |
| 2026-10-18 | Integrated 4K video hero with scroll-expansion reveal in `scroll-expansion-hero.tsx` | Antigravity + Naveen |
| 2026-10-18 | Designed and added loading skeleton with fluid shimmer wave animation | Antigravity + Naveen |
| 2026-10-17 | Added top-notch fluid transitions, Framer Motion page entrance, staggered lists, sliding tab indicators, and spring hover effects | Antigravity + Naveen |
| 2026-10-17 | Overhauled global color palette to Deep Heritage & Banana Leaf Warmth across all pages and components | Antigravity + Naveen |
| 2026-10-17 | Integrated React Bits 3D DriftWall parallax canvas, created Browse all-entries gallery and Dish recipe detail page | Antigravity + Naveen |
| 2026-10-16 | Added Ruchi Orb persona to AI Prompt box with futuristic audio chime and multi-step thought loader | Antigravity + Naveen |
| 2026-10-15 | Scaffolded Next.js 15 + TypeScript + Tailwind design tokens, Zod schemas, validation script, and starter seed content | Antigravity + Naveen |

