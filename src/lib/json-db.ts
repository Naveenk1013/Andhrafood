import dishesData from "@/data/dishes.json";
import districtsData from "@/data/districts.json";
import regionsData from "@/data/regions.json";
import ingredientsData from "@/data/ingredients.json";

export interface DishIngredient {
  name: string;
  quantity: number;
  unit: string;
  isPrimary: boolean;
  notes?: string;
}

export interface Dish {
  slug: string;
  nameEn: string;
  nameTe: string;
  nameEnMeaning: string;
  region: "coastal-andhra" | "rayalaseema" | "uttarandhra";
  districts: string[];
  category:
    | "tiffin"
    | "rice-and-meals"
    | "curries-and-kuras"
    | "pappu-and-dals"
    | "pickles-and-chutneys"
    | "sweets"
    | "street-food"
    | "snacks"
    | "snacks-and-street-food"
    | "pulusu-and-charu"
    | "podis"
    | "seafood"
    | "meat-and-poultry"
    | "beverages"
    | "tribal-and-forest";
  heatLevel: number;
  dietary: "vegetarian" | "non-vegetarian" | "vegan";
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  primaryGrain?: string;
  cookingFat?: string;
  descriptionEn: string;
  descriptionTe: string;
  culturalContext: string;
  servingRituals: string;
  image: string;
  ingredients: DishIngredient[];
  instructions: string[];
}

export interface District {
  slug: string;
  nameEn: string;
  nameTe: string;
  region: "coastal-andhra" | "rayalaseema" | "uttarandhra";
  headquarters: string;
  signatures: string[];
  soilAndProduce: string;
  flavorProfile: string;
}

export interface Region {
  slug: "coastal-andhra" | "rayalaseema" | "uttarandhra";
  nameEn: string;
  nameTe: string;
  districtCount: number;
  districts: string[];
  taglineEn: string;
  taglineTe: string;
  geography: string;
  culinaryHallmarks: string[];
  cookingVessels: string[];
  stapleFats: string[];
  image: string;
}

export interface Ingredient {
  slug: string;
  nameEn: string;
  nameTe: string;
  category: string;
  heatSHU: string;
  geographicalIndication: string;
  description: string;
  culinaryUses: string[];
  traditionalProcessing: string;
}

// In-Memory Typed Collections
const dishes: Dish[] = dishesData as Dish[];
const districts: District[] = districtsData as District[];
const regions: Region[] = regionsData as Region[];
const ingredients: Ingredient[] = ingredientsData as Ingredient[];

export interface DishFilterOptions {
  region?: string;
  district?: string;
  category?: string;
  dietary?: "vegetarian" | "non-vegetarian" | "vegan";
  heatLevel?: number;
}

/**
 * Retrieve all dishes with optional filtering
 */
export function getDishes(options?: DishFilterOptions): Dish[] {
  let result = [...dishes];

  if (options?.region) {
    result = result.filter((d) => d.region === options.region);
  }

  if (options?.district) {
    result = result.filter((d) => d.districts.includes(options.district!));
  }

  if (options?.category) {
    result = result.filter((d) => d.category === options.category);
  }

  if (options?.dietary) {
    result = result.filter((d) => d.dietary === options.dietary);
  }

  if (options?.heatLevel !== undefined) {
    result = result.filter((d) => d.heatLevel === options.heatLevel);
  }

  return result;
}

/**
 * Find a dish by its unique slug
 */
export function getDishBySlug(slug: string): Dish | null {
  return dishes.find((d) => d.slug === slug) || null;
}

/**
 * Multilingual search across English and Telugu titles, descriptions, and ingredients
 */
export function searchDishes(query: string): Dish[] {
  if (!query || !query.trim()) return dishes;
  const q = query.trim().toLowerCase();

  return dishes.filter((d) => {
    return (
      d.nameEn.toLowerCase().includes(q) ||
      d.nameTe.includes(q) ||
      d.slug.toLowerCase().includes(q) ||
      d.descriptionEn.toLowerCase().includes(q) ||
      d.descriptionTe.includes(q) ||
      d.ingredients.some((i) => i.name.toLowerCase().includes(q)) ||
      d.districts.some((dist) => dist.includes(q))
    );
  });
}

/**
 * Retrieve all 26 districts of Andhra Pradesh
 */
export function getDistricts(regionSlug?: string): District[] {
  if (regionSlug) {
    return districts.filter((d) => d.region === regionSlug);
  }
  return districts;
}

/**
 * Find a district by its slug
 */
export function getDistrictBySlug(slug: string): District | null {
  return districts.find((d) => d.slug === slug) || null;
}

/**
 * Retrieve all 3 regions
 */
export function getRegions(): Region[] {
  return regions;
}

/**
 * Find a region by its slug
 */
export function getRegionBySlug(slug: string): Region | null {
  return regions.find((r) => r.slug === slug) || null;
}

/**
 * Retrieve all authentic ingredients
 */
export function getIngredients(): Ingredient[] {
  return ingredients;
}

/**
 * Find an ingredient by its slug
 */
export function getIngredientBySlug(slug: string): Ingredient | null {
  return ingredients.find((i) => i.slug === slug) || null;
}

/**
 * Local semantic retrieval for Ruchi AI queries
 */
export function queryRuchiKnowledge(
  query: string,
  locale: string = "en"
): { text: string; source: string; relatedDish?: Dish } {
  const q = query.toLowerCase();

  // Detect language intent: if user typed Telugu or requested Telugu/telegu, use Telugu
  const wantsTe =
    locale === "te" ||
    q.includes("telugu") ||
    q.includes("telegu") ||
    q.includes("తెలుగు") ||
    /[\u0C00-\u0C7F]/.test(query);
  const isTe = wantsTe;

  // Check matching dishes
  for (const dish of dishes) {
    if (
      q.includes(dish.slug) ||
      q.includes(dish.nameEn.toLowerCase()) ||
      q.includes(dish.nameTe)
    ) {
      return {
        text:
          isTe
            ? `${dish.nameTe} (${dish.nameEn}): ${dish.descriptionTe}\n\nసంప్రదాయ నేపథ్యం: ${dish.culturalContext}`
            : `${dish.nameEn} (${dish.nameTe}): ${dish.descriptionEn}\n\nCultural Lore: ${dish.culturalContext}`,
        source: `${dish.nameEn} · Verified Recipe Entry (${dish.districts.join(", ")})`,
        relatedDish: dish,
      };
    }
  }

  // Check regional signatures
  for (const reg of regions) {
    if (q.includes(reg.slug) || q.includes(reg.nameEn.toLowerCase()) || q.includes(reg.nameTe)) {
      return {
        text:
          isTe
            ? `${reg.nameTe} పాకశాస్త్ర వైభవం: ${reg.taglineTe}\n\nభౌగోళిక విశేషాలు: ${reg.geography}\n\nముఖ్య లక్షణాలు: ${reg.culinaryHallmarks.join(", ")}`
            : `${reg.nameEn} Culinary Heritage: ${reg.taglineEn}\n\nGeography: ${reg.geography}\n\nKey Signatures: ${reg.culinaryHallmarks.join("; ")}`,
        source: `${reg.nameEn} Regional Dossier (${reg.districtCount} Districts)`,
      };
    }
  }

  // Check districts
  for (const dist of districts) {
    if (q.includes(dist.slug) || q.includes(dist.nameEn.toLowerCase()) || q.includes(dist.nameTe)) {
      return {
        text:
          isTe
            ? `${dist.nameTe} జిల్లా ఆహార విశేషాలు: ${dist.flavorProfile}\n\nప్రసిద్ధ వంటకాలు: ${dist.signatures.join(", ")}\n\nనేల, పంటలు: ${dist.soilAndProduce}`
            : `${dist.nameEn} District Culinary Profile: ${dist.flavorProfile}\n\nSignatures: ${dist.signatures.join(", ")}\n\nSoil & Agriculture: ${dist.soilAndProduce}`,
        source: `${dist.nameEn} District Record (${dist.region})`,
      };
    }
  }

  // Fallback to general culinary wisdom
  return {
    text:
      isTe
        ? "ఆంధ్రప్రదేశ్ భోజనం 26 జిల్లాల భిన్నమైన సంస్కృతుల సమ్మేళనం. రాయలసీమలో రాగి సంగటి, నాటుకోడి పులుసు ప్రాధాన్యం కాగా; కోస్తాంధ్రలో గోదావరి చేపల పులుసు, పూతరేకులు ప్రసిద్ధి; ఉత్తరాంధ్రలో అరకు వెదురు బొంగు చికెన్, బెల్లం పులుసులు ప్రత్యేకమైనవి."
        : "Andhra Pradesh cuisine is shaped by 26 distinct districts across 3 culinary zones: Rayalaseema (Ragi Sangati, fiery Natu Kodi and groundnut gravies), Coastal Andhra (Godavari fish pulusus, Atreyapuram Pootharekulu, and green gram tiffins), and Uttarandhra (Araku bamboo woodfire chicken and sweet-tart jaggery pulusus).",
    source: "Andhra Ruchulu Culinary Master Database (26 Districts)",
  };
}
