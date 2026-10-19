import dishesData from "@/data/dishes.json";
import { PANTRY_INGREDIENTS, PantryIngredient } from "@/data/pantry-ingredients";

export interface DishMatchResult {
  slug: string;
  nameEn: string;
  nameTe: string;
  nameEnMeaning: string;
  region: string;
  category: string;
  heatLevel: number;
  dietary: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  image: string;
  matchScore: number; // 0 - 100
  isReadyToCook: boolean; // 100% or only non-crucial missing
  matchedCount: number;
  totalCount: number;
  matchedIngredients: string[];
  missingIngredients: string[];
}

export function matchDishesWithPantry(
  selectedIngredientIds: string[],
  regionFilter: string = "all",
  categoryFilter: string = "all"
): DishMatchResult[] {
  if (selectedIngredientIds.length === 0) {
    return [];
  }

  // Get active pantry ingredient objects
  const selectedPantryItems: PantryIngredient[] = PANTRY_INGREDIENTS.filter((item) =>
    selectedIngredientIds.includes(item.id)
  );

  const results: DishMatchResult[] = [];

  for (const dish of dishesData) {
    // Apply region & category filters if specified
    if (regionFilter !== "all" && dish.region !== regionFilter) continue;
    if (categoryFilter !== "all" && dish.category !== categoryFilter) continue;

    const matchedIngredients: string[] = [];
    const missingIngredients: string[] = [];

    let primaryTotal = 0;
    let primaryMatched = 0;

    for (const ing of dish.ingredients) {
      if (ing.isPrimary) primaryTotal++;

      // Check if this ingredient matches any selected pantry item's keywords
      const ingNameLower = ing.name.toLowerCase();
      const isMatched = selectedPantryItems.some((pantryItem) =>
        pantryItem.matchKeywords.some((kw) => ingNameLower.includes(kw.toLowerCase()))
      );

      if (isMatched) {
        matchedIngredients.push(ing.name);
        if (ing.isPrimary) primaryMatched++;
      } else {
        missingIngredients.push(ing.name);
      }
    }

    const totalCount = dish.ingredients.length;
    const matchedCount = matchedIngredients.length;

    // Weight primary ingredients more heavily
    const safePrimaryTotal = primaryTotal > 0 ? primaryTotal : Math.ceil(totalCount / 2);
    const weightPrimary = 0.7;
    const weightSecondary = 0.3;

    const primaryRatio = safePrimaryTotal > 0 ? primaryMatched / safePrimaryTotal : 0;
    const secondaryTotal = Math.max(1, totalCount - safePrimaryTotal);
    const secondaryMatched = Math.max(0, matchedCount - primaryMatched);
    const secondaryRatio = secondaryMatched / secondaryTotal;

    const compositeScore = primaryRatio * weightPrimary + secondaryRatio * weightSecondary;
    const matchScore = Math.min(100, Math.max(0, Math.round(compositeScore * 100)));

    // Only include if at least 1 ingredient matches
    if (matchedCount > 0) {
      const isReadyToCook = matchScore >= 80 || (primaryTotal > 0 && primaryMatched === primaryTotal);

      results.push({
        slug: dish.slug,
        nameEn: dish.nameEn,
        nameTe: dish.nameTe,
        nameEnMeaning: dish.nameEnMeaning,
        region: dish.region,
        category: dish.category,
        heatLevel: dish.heatLevel,
        dietary: dish.dietary,
        prepTimeMinutes: dish.prepTimeMinutes,
        cookTimeMinutes: dish.cookTimeMinutes,
        image: dish.image,
        matchScore,
        isReadyToCook,
        matchedCount,
        totalCount,
        matchedIngredients,
        missingIngredients,
      });
    }
  }

  // Sort: highest score first, then ready to cook, then matchedCount
  return results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    if (b.isReadyToCook !== a.isReadyToCook) return b.isReadyToCook ? 1 : -1;
    return b.matchedCount - a.matchedCount;
  });
}
