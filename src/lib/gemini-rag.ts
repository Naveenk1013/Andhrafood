import dishesData from "@/data/dishes.json";
import districtsData from "@/data/districts.json";
import regionsData from "@/data/regions.json";
import ingredientsData from "@/data/ingredients.json";
import { queryRuchiKnowledge, Dish } from "@/lib/json-db";

export interface ChatHistoryMessage {
  role: "user" | "model" | "assistant";
  text: string;
}

export interface GeminiRAGResponse {
  text: string;
  source: string;
  relatedDish?: Dish;
  isGemini: boolean;
}

/**
 * Detects common conversational pleasantries and acknowledgments
 * to deliver instant, natural, hospitable responses without robotic dish templates.
 */
function detectConversationalIntent(query: string): "thanks" | "ack" | "greeting" | null {
  const q = query.trim().toLowerCase().replace(/[!.,?]/g, "").trim();

  // 1. Gratitude
  const thanksList = [
    "thank you", "thanks", "ok thank you", "okay thank you", "ok thanks", "okay thanks",
    "thank u", "thx", "dhanyavadalu", "dhanyavadamulu", "chala dhanyavadalu", "many thanks",
    "thank you so much", "thanks ruchi", "thank you ruchi", "tq"
  ];
  if (thanksList.includes(q) || /^(ok\s+|okay\s+)?thanks?(\s+you|\s+u|\s+a\s+lot|\s+so\s+much)?$/i.test(q)) {
    return "thanks";
  }

  // 2. Affirmations / Short Acknowledgments
  const ackList = [
    "ok", "okay", "k", "sure", "got it", "alright", "fine", "cool", "great", "nice",
    "awesome", "super", "sare", "avunu", "bagundi", "chala bagundi", "done", "understood"
  ];
  if (ackList.includes(q)) {
    return "ack";
  }

  // 3. Greetings
  const greetingList = [
    "hi", "hello", "hey", "namaste", "namaskaram", "vanakkam", "good morning", "good evening", "good afternoon",
    "hi ruchi", "hello ruchi", "hey ruchi"
  ];
  if (greetingList.includes(q)) {
    return "greeting";
  }

  return null;
}

/**
 * Searches the local database to find the most relevant dishes, districts, and ingredients
 * to inject as strict grounding context for Google Gemini.
 */
function buildGroundedContext(
  query: string,
  history?: ChatHistoryMessage[],
  isTe: boolean = false
): { contextText: string; matchedDish?: Dish; matchedSource: string } {
  const q = query.toLowerCase();
  const matchedDishes: any[] = [];
  const matchedDistricts: any[] = [];
  const matchedIngredients: any[] = [];

  // Find matching dishes directly referenced in the current query
  for (const dish of dishesData) {
    const isDirectMatch =
      q.includes(dish.slug) ||
      q.includes(dish.nameEn.toLowerCase()) ||
      q.includes(dish.nameTe) ||
      dish.districts.some((d) => q.includes(d.toLowerCase())) ||
      dish.category.toLowerCase().includes(q) ||
      dish.ingredients.some((ing) => q.includes(ing.name.toLowerCase()));

    if (isDirectMatch) {
      matchedDishes.push(dish);
    }
  }

  // If no dish matched in the current prompt, check recent conversation history
  if (matchedDishes.length === 0 && history && history.length > 0) {
    const historyText = history.map((h) => h.text).join(" ").toLowerCase();
    for (const dish of dishesData) {
      if (
        historyText.includes(dish.slug) ||
        historyText.includes(dish.nameEn.toLowerCase()) ||
        historyText.includes(dish.nameTe)
      ) {
        matchedDishes.push(dish);
        break;
      }
    }
  }

  // Anchor to 1-2 dishes max if matched, otherwise provide regional broad context
  const contextDishes = matchedDishes.length > 0 ? matchedDishes.slice(0, 2) : [];

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

  let dishSnippets = "";
  if (contextDishes.length > 0) {
    dishSnippets = contextDishes.map((d) => `
DISH: ${d.nameEn} ${isTe ? `(${d.nameTe})` : ""} | Region: ${d.region} (${d.districts.join(", ")}) | Heat: ${d.heatLevel}/5
- Profile: ${isTe ? (d.descriptionTe || d.descriptionEn) : d.descriptionEn}
- Key Ingredients: ${d.ingredients.slice(0, 6).map((i: any) => i.name).join(", ")}
- Lore & Secret: ${d.culturalContext.slice(0, 160)}
- Technique: ${d.instructions.slice(0, 2).join(" ")}
`).join("\n");
  } else {
    // Broad 3-zone context so model does NOT default to any arbitrary single dish
    dishSnippets = `
GENERAL ANDHRA CULINARY KNOWLEDGE:
- Rayalaseema: Ragi Sangati, Natu Kodi Pulusu, Uggani Bajji, wood-fired groundnut & fiery dryland spices.
- Coastal Andhra: Godavari Delta clay-pot pulusus, Royyala Iguru, MLA Pesarattu with Allam Pachadi, Atreyapuram Pootharekulu.
- Uttarandhra: Araku Bamboo Chicken, Bellam Pulusu, Teepi Majjiga Charu, subtle jaggery-tampered gravies.
- Staples: Gongura, Guntur Sannam chillies, cold-pressed sesame oil, stone mortar (Rolu) friction grinding.
`.trim();
  }

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

  const primaryDish = contextDishes[0] as Dish | undefined;
  const matchedSource = primaryDish
    ? `${primaryDish.nameEn} · Verified Recipe Entry (${primaryDish.districts.join(", ")})`
    : isTe
      ? "ఆంధ్రప్రదేశ్ 26 జిల్లాల సాంప్రదాయ పాకశాస్త్ర సమాహారం"
      : "Andhra Pradesh Traditional Culinary Archive (26 Districts)";

  return { contextText, matchedDish: primaryDish, matchedSource };
}

/**
 * Calls OpenRouter with Gemini or GPT-4o-mini as a high-speed fallback
 */
async function queryOpenRouter(
  systemInstruction: string,
  userPrompt: string,
  history?: ChatHistoryMessage[],
  matchedDish?: Dish,
  isTe: boolean = false
): Promise<GeminiRAGResponse | null> {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (!openRouterKey) return null;

  const models = ["google/gemini-2.5-flash", "openai/gpt-4o-mini", "meta-llama/llama-3.3-70b-instruct"];

  const messagesPayload: Array<{ role: string; content: string }> = [
    { role: "system", content: systemInstruction },
  ];

  if (history && history.length > 0) {
    for (const h of history.slice(-4)) {
      messagesPayload.push({
        role: h.role === "user" ? "user" : "assistant",
        content: h.text,
      });
    }
  }

  messagesPayload.push({ role: "user", content: userPrompt });

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
          max_tokens: 380,
          temperature: 0.35,
          messages: messagesPayload,
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
    } catch {
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
  locale: string = "en",
  history?: ChatHistoryMessage[]
): Promise<GeminiRAGResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  const qLower = query.toLowerCase();

  // 1. Check for quick conversational intents (thanks, acknowledgments, greetings)
  const conversationalIntent = detectConversationalIntent(query);
  const hasTeluguScript = /[\u0C00-\u0C7F]/.test(query);
  const requestsTelugu =
    /\b(in telugu|in telegu|telugu lo|telugulo|to telugu|speak in telugu|answer in telugu|tell me in telugu|explain in telugu)\b/i.test(query) ||
    qLower.includes("తెలుగులో") ||
    (hasTeluguScript && qLower.includes("తెలుగు"));
  const requestsEnglish =
    /\b(in english|in eng|english lo|englishlo|to english|speak in english|answer in english|tell me in english|explain in english)\b/i.test(query);

  const isTe = !requestsEnglish && (hasTeluguScript || requestsTelugu || locale === "te");

  if (conversationalIntent === "thanks") {
    return {
      text: isTe
        ? "మీకు నా హృదయపూర్వక ధన్యవాదాలు! ఆంధ్రప్రదేశ్ 26 జిల్లాల సాంప్రదాయ రుచులను, అమ్మమ్మల నాటి పాకశాస్త్ర రహస్యాలను మీతో పంచుకోవడం నాకు ఎంతో ఆనందం. మీకు ఎప్పుడైనా ఏదైనా వంటకం, పోపు నిష్పత్తి లేదా ప్రాంతీయ ప్రత్యేకత గురించి తెలుసుకోవాలనిపిస్తే నిరభ్యంతరంగా అడగండి!"
        : "You are most welcome! It is an absolute pleasure sharing the authentic food culture of Andhra Pradesh with you. Whenever you'd like to explore another recipe, spice secret, or regional classic, I am always right here.",
      source: "Andhra Ruchulu Culinary Archives",
      isGemini: false,
    };
  }

  if (conversationalIntent === "ack") {
    return {
      text: isTe
        ? "చాలా సంతోషం! మనం తదుపరి ఏ రుచులను అన్వేషిద్దాం? రాయలసీమ ఘాటైన సంగటి-నాటుకోడి, కోస్తాంధ్ర చేపల పులుసులు, లేదా ఉత్తరాంధ్ర సంప్రదాయ పిండివంటల గురించి తెలుసుకుందామా?"
        : "Wonderful! What would you like to explore next? We can journey into the spicy drylands of Rayalaseema, savor Godavari delta seafood, or discover authentic heirloom sweets.",
      source: "Andhra Ruchulu Culinary Archives",
      isGemini: false,
    };
  }

  if (conversationalIntent === "greeting") {
    return {
      text: isTe
        ? "నమస్కారం! ఆంధ్ర రుచుల పాకశాస్త్ర విజ్ఞాన భాండాగారానికి స్వాగతం. 26 జిల్లాల అసలైన వంటకాలు, రోలు రుబ్బుడు పద్ధతులు, ప్రామాణిక కారం నిష్పత్తులతో మీకు సహాయం చేయడానికి నేను సిద్ధంగా ఉన్నాను. ఈ రోజు మీరు ఏ వంటకం గురించి అన్వేషించాలనుకుంటున్నారు?"
        : "Namaskaram! Welcome to Andhra Ruchulu. I am Ruchi, your culinary companion across the 26 districts of Andhra Pradesh. What dish, spice balance, or heirloom recipe would you like to explore today?",
      source: "Andhra Ruchulu Culinary Archives",
      isGemini: false,
    };
  }

  // 2. Build contextual grounding from database and previous conversation
  const { contextText, matchedDish, matchedSource } = buildGroundedContext(query, history, isTe);

  const systemInstruction = `
You are Ruchi (రుచి) — the warm, authentic, and culturally grounded AI Culinary Guide of Andhra Ruchulu.
You speak like a knowledgeable Andhra culinary mentor and master cook: welcoming, insightful, passionate, and direct.

CRITICAL CONVERSATIONAL & OPENING RULES:
- NEVER use repetitive, rigid formulas like "What a wonderful question to explore..." or "Namaskaram! What a wonderful question to explore about our beloved...".
- NEVER parrot or repeat the user's prompt back to them.
- Open naturally and directly into the culinary insight, origin, flavor profile, or cooking secret.
- If the user asks a follow-up (e.g., "tell me more", "how to make it", "what spices"), build upon previous discussion seamlessly.

MANDATORY LANGUAGE DIRECTIVE:
${isTe ? `
- TARGET LANGUAGE: TELUGU (తెలుగు లిపి)
- Write your ENTIRE response in pure, authentic Telugu script.
- Use indigenous culinary terms naturally (పోపు, తిరగమాత, రోలు రుబ్బుడు, మట్టిపాత్ర, పులుసు, ఇగురు, పచ్చడి).
` : `
- TARGET LANGUAGE: ENGLISH
- Write your ENTIRE response strictly in ENGLISH.
- DO NOT output Telugu script in your response.
- Use English transliteration for indigenous terms (e.g. Gongura, Guntur Sannam chilli, Popu/Tadka, Rolu stone mortar, Neyyi).
`}

STRICT MARKDOWN STRUCTURE:
- Keep your total response concise, elegant, and between 130 to 190 words.
- Format with clean, readable Markdown:
  * Open directly with 1 engaging, descriptive sentence.
  * 2 to 3 numbered or bulleted items with bold titles (e.g., 1. **Unfermented Batter:** ...).
  * 1 short concluding tip on traditional accompaniments, serving ritual, or heat balance.
- Every sentence must deliver authentic culinary substance.

STRICT KNOWLEDGE BASE GROUNDING:
- Answer STRICTLY using the verified Andhra Pradesh culinary records provided below.
- Focus exclusively on the 3 culinary zones (Coastal Andhra, Rayalaseema, Uttarandhra) across 26 districts.
- If asked about non-Andhra dishes or non-food topics, gracefully guide the conversation back to Andhra Pradesh's heirloom food culture.

${contextText}
`.trim();

  const userPrompt = isTe
    ? `${query}\n\n[సూచన: చక్కని మార్క్‌డౌన్ (బోల్డ్ **ముఖ్యాంశాలు**, జాబితా) రూపంలో 160 పదాలలోపు ప్రత్యక్షంగా సమాధానం రాయండి.]`
    : `${query}\n\n[INSTRUCTION: Answer directly with clean Markdown (bold **highlights**, numbered items) under 180 words strictly in English. Avoid generic opening praise.]`;

  // 1. Attempt Google Gemini Direct (if key available)
  if (apiKey && !apiKey.includes("your-gemini-api-key")) {
    const candidateModels = ["gemini-pro-latest", "gemini-2.5-flash", "gemini-3.8-flash"];

    const contentsPayload: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (history && history.length > 0) {
      for (const h of history.slice(-4)) {
        contentsPayload.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      }
    }

    contentsPayload.push({
      role: "user",
      parts: [{ text: userPrompt }],
    });

    for (const model of candidateModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500);

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
              contents: contentsPayload,
              generationConfig: {
                temperature: 0.35,
                topP: 0.95,
                maxOutputTokens: 380,
              },
            }),
          }
        );

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (candidateText && typeof candidateText === "string") {
            return {
              text: candidateText.trim(),
              source: matchedSource,
              relatedDish: matchedDish,
              isGemini: true,
            };
          }
        }
      } catch {
        continue;
      }
    }
  }

  // 2. High-speed fallback: OpenRouter API (Gemini / GPT-4o-mini)
  const openRouterResult = await queryOpenRouter(systemInstruction, userPrompt, history, matchedDish, isTe);
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