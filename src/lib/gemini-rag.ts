import dishesData from "@/data/dishes.json";
import districtsData from "@/data/districts.json";
import regionsData from "@/data/regions.json";
import ingredientsData from "@/data/ingredients.json";
import { queryRuchiKnowledge, Dish } from "@/lib/json-db";

export interface GeminiRAGResponse {
  text: string;
  source: string;
  relatedDish?: Dish;
  isGemini: boolean;
}

/**
 * Searches the local database to find the most relevant dishes, districts, and ingredients
 * to inject as strict grounding context for Google Gemini.
 */
function buildGroundedContext(query: string, isTe: boolean = false): { contextText: string; matchedDish?: Dish; matchedSource: string } {
  const q = query.toLowerCase();
  const matchedDishes: any[] = [];
  const matchedDistricts: any[] = [];
  const matchedIngredients: any[] = [];

  // Find matching dishes (at most 2 most relevant to minimize tokens)
  for (const dish of dishesData) {
    const isDirectMatch =
      q.includes(dish.slug) ||
      q.includes(dish.nameEn.toLowerCase()) ||
      q.includes(dish.nameTe) ||
      dish.districts.some((d) => q.includes(d)) ||
      dish.category.toLowerCase().includes(q) ||
      dish.ingredients.some((ing) => q.includes(ing.name.toLowerCase()));

    if (isDirectMatch) {
      matchedDishes.push(dish);
    }
  }

  // Anchor to 1-2 dishes max
  const contextDishes = matchedDishes.length > 0 ? matchedDishes.slice(0, 2) : dishesData.slice(0, 1);

  // Match only directly referenced district (max 1)
  for (const dist of districtsData) {
    if (q.includes(dist.slug) || q.includes(dist.nameEn.toLowerCase()) || q.includes(dist.nameTe)) {
      matchedDistricts.push(dist);
      break;
    }
  }

  // Match only directly referenced ingredient (max 1)
  for (const ing of ingredientsData) {
    if (q.includes(ing.slug) || q.includes(ing.nameEn.toLowerCase()) || q.includes(ing.nameTe)) {
      matchedIngredients.push(ing);
      break;
    }
  }

  // High-density, low-token snippets
  const dishSnippets = contextDishes.map((d) => `
DISH: ${d.nameEn} ${isTe ? `(${d.nameTe})` : ""} | Region: ${d.region} (${d.districts.join(", ")}) | Heat: ${d.heatLevel}/5
- Profile: ${isTe ? (d.descriptionTe || d.descriptionEn) : d.descriptionEn}
- Key Ingredients: ${d.ingredients.slice(0, 6).map((i: any) => i.name).join(", ")}
- Lore & Secret: ${d.culturalContext.slice(0, 150)}
- Technique: ${d.instructions.slice(0, 2).join(" ")}
`).join("\n");

  const districtSnippet = matchedDistricts[0]
    ? `DISTRICT: ${matchedDistricts[0].nameEn} - Produce: ${matchedDistricts[0].soilAndProduce.slice(0, 120)} | Profile: ${matchedDistricts[0].flavorProfile.slice(0, 100)}\n`
    : "";

  const ingredientSnippet = matchedIngredients[0]
    ? `INGREDIENT: ${matchedIngredients[0].nameEn} - Heat: ${matchedIngredients[0].heatSHU} SHU | Technique: ${matchedIngredients[0].traditionalProcessing.slice(0, 120)}\n`
    : "";

  const contextText = `
[ARCHIVED AP CULINARY RECORDS]
${dishSnippets}
${districtSnippet}${ingredientSnippet}`.trim();

  const primaryDish = matchedDishes[0] as Dish | undefined;
  const matchedSource = primaryDish
    ? `${primaryDish.nameEn} · Verified Recipe Entry (${primaryDish.districts.join(", ")})`
    : `Andhra Pradesh Culinary Archives (26 Districts Verified)`;

  return { contextText, matchedDish: primaryDish, matchedSource };
}

/**
 * Calls OpenRouter with Gemini or GPT-4o-mini as a high-speed fallback
 */
async function queryOpenRouter(
  systemInstruction: string,
  userPrompt: string,
  matchedDish?: Dish,
  isTe: boolean = false
): Promise<GeminiRAGResponse | null> {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (!openRouterKey) return null;

  const models = ["google/gemini-2.5-flash", "openai/gpt-4o-mini", "meta-llama/llama-3.3-70b-instruct"];

  for (const model of models) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "HTTP-Referer": "https://andhraruchulu.vercel.app",
          "X-Title": "Andhra Ruchulu",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          max_tokens: 380, // Tightly budgeted for maximum efficiency and speed
          temperature: 0.35,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content && typeof content === "string") {
          const sourceLabel = matchedDish
            ? `${matchedDish.nameEn} · Andhra Heritage Collection (${matchedDish.districts.join(", ")})`
            : isTe
              ? "ఆంధ్రప్రదేశ్ 26 జిల్లాల సాంప్రదాయ పాకశాస్త్ర సమాహారం"
              : "Andhra Pradesh Traditional Culinary Archive (26 Districts)";

          return {
            text: content.trim(),
            source: sourceLabel,
            relatedDish: matchedDish,
            isGemini: true,
          };
        }
      }
    } catch (e) {
      continue;
    }
  }

  return null;
}

/**
 * Ask Google Gemini (or OpenRouter fallback) with strict closed-domain Grounding on the local Andhra culinary database.
 * Falls back to local queryRuchiKnowledge if external APIs are unreachable.
 */
export async function queryGroundedGemini(
  query: string,
  locale: string = "en"
): Promise<GeminiRAGResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  const qLower = query.toLowerCase();

  // 1. Detect if the user typed in Telugu script
  const hasTeluguScript = /[\u0C00-\u0C7F]/.test(query);

  // 2. Detect if the user explicitly requested Telugu output
  const requestsTelugu =
    /\b(in telugu|in telegu|telugu lo|telugulo|to telugu|speak in telugu|answer in telugu|tell me in telugu|explain in telugu)\b/i.test(query) ||
    qLower.includes("తెలుగులో") ||
    (hasTeluguScript && qLower.includes("తెలుగు"));

  // 3. Detect if the user explicitly requested English output
  const requestsEnglish =
    /\b(in english|in eng|english lo|englishlo|to english|speak in english|answer in english|tell me in english|explain in english)\b/i.test(query);

  // 4. Determine target language:
  const isTe = !requestsEnglish && (hasTeluguScript || requestsTelugu);

  const { contextText, matchedDish } = buildGroundedContext(query, isTe);

  const systemInstruction = `
You are Ruchi (రుచి) — the warm and knowledgeable AI Culinary Guide of Andhra Ruchulu, an initiative created to celebrate and bring all the authentic dishes of Andhra Pradesh together.
You speak like a warm, deeply knowledgeable, culturally passionate culinary mentor, native Andhra grandmother, and master cook combined.

MANDATORY LANGUAGE DIRECTIVE:
${isTe ? `
- CURRENT TARGET LANGUAGE: TELUGU (తెలుగు)
- The user is conversing in TELUGU.
- Write your ENTIRE response in pure, authentic Telugu script (తెలుగు లిపి).
- Greet warmly in Telugu: "నమస్కారం! అబ్బా, ఎంత అద్భుతమైన ప్రశ్న..."
- Use authentic native culinary terminology (పోపు, తిరగమాత, రోలు, మట్టిపాత్ర, పులుసు, పచ్చడి, వేపుడు).
` : `
- CURRENT TARGET LANGUAGE: ENGLISH
- The user is conversing in ENGLISH.
- Write your ENTIRE response strictly in ENGLISH.
- DO NOT output Telugu script (తెలుగు లిపి) anywhere in your response.
- Greet warmly in English: "Namaskaram! What a wonderful question to explore..."
- Traditional terms can be mentioned in English transliteration (e.g. Gongura, Guntur Sannam chilli, Popu / Tadka, Rolu stone mortar).
`}

STRICT MARKDOWN STRUCTURE & TOKEN EFFICIENCY:
- Keep your total response concise, elegant, and between 140 to 200 words.
- Format with clean Markdown:
  * 1 warm, expressive opening sentence.
  * 2 to 3 numbered or bulleted secrets with bold headings (e.g., 1. **Stone Mortar Friction:** ...).
  * 1 short closing culinary wisdom or traditional serving tip.
- Avoid repetitive fluff or wordy generic disclaimers. Every sentence must deliver authentic culinary value.

STRICT KNOWLEDGE BASE GROUNDING:
- Answer STRICTLY using the verified Andhra Ruchulu culinary archives provided below.
- Do NOT fabricate foreign dishes or assert traditions outside Andhra Pradesh's 26 districts (Coastal Andhra / కోస్తా ఆంధ్ర, Rayalaseema / రాయలసీమ, and Uttarandhra / ఉత్తరాంధ్ర).
- If asked about non-Andhra dishes or non-food topics, warmly deflect back to Andhra Pradesh's heirloom food traditions.

${contextText}
`.trim();

  const userPrompt = isTe
    ? `${query}\n\n[సూచన: సమాధానాన్ని చక్కని మార్క్‌డౌన్ (బోల్డ్ **ముఖ్యమైన అంశాలు**, జాబితా) రూపంలో 150 పదాలలోపు రాయండి.]`
    : `${query}\n\n[INSTRUCTION: Format with clean Markdown (bold **highlights**, numbered items) under 180 words strictly in English.]`;

  // 1. Attempt Google Gemini Direct (if key available)
  if (apiKey && !apiKey.includes("your-gemini-api-key")) {
    const candidateModels = ["gemini-pro-latest", "gemini-3.8-flash", "gemini-2.5-flash"];

    for (const model of candidateModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey,
            },
            signal: controller.signal,
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: systemInstruction }],
              },
              contents: [
                {
                  role: "user",
                  parts: [{ text: userPrompt }],
                },
              ],
              generationConfig: {
                temperature: 0.35,
                topP: 0.95,
                maxOutputTokens: 380, // Tight token budget
              },
            }),
          }
        );

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (candidateText && typeof candidateText === "string") {
            const sourceLabel = matchedDish
              ? `${matchedDish.nameEn} · Andhra Heritage Collection (${matchedDish.districts.join(", ")})`
              : isTe
                ? "ఆంధ్రప్రదేశ్ 26 జిల్లాల సాంప్రదాయ పాకశాస్త్ర సమాహారం"
                : "Andhra Pradesh Traditional Culinary Archive (26 Districts)";

            return {
              text: candidateText.trim(),
              source: sourceLabel,
              relatedDish: matchedDish,
              isGemini: true,
            };
          }
        }
      } catch (modelErr) {
        continue;
      }
    }
  }

  // 2. High-speed fallback: OpenRouter API (Gemini / GPT-4o-mini)
  const openRouterResult = await queryOpenRouter(systemInstruction, userPrompt, matchedDish, isTe);
  if (openRouterResult) {
    return openRouterResult;
  }

  // 3. Resilient fallback to local typed database
  const local = queryRuchiKnowledge(query, isTe ? "te" : "en");
  return {
    text: local.text,
    source: local.source,
    relatedDish: local.relatedDish,
    isGemini: false,
  };
}
