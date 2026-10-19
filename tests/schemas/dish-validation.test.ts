import { describe, it, expect } from "vitest";
import { DishFrontmatterSchema } from "@/schemas/dish";

describe("DishFrontmatterSchema", () => {
  it("validates a complete, verified dish frontmatter", () => {
    const validDish = {
      slug: "pesarattu",
      status: "verified",
      names: {
        te: "పెసరట్టు",
        transliteration: ["Pesarattu"],
        en: "Green Gram Crepe",
      },
      aliases: ["MLA Pesarattu"],
      category: "tiffin",
      course: "breakfast",
      diet: "vegetarian",
      allergens: [],
      regions: ["coastal-andhra"],
      districts: ["East Godavari"],
      heat: 2,
      time: { prep_min: 360, cook_min: 15 },
      servings: 4,
      occasions: ["Everyday breakfast"],
      techniques: ["popu-tempering"],
      ingredients: [
        { ref: "green-gram", qty: 1, unit: "cup" },
        { ref: "rice", qty: 2, unit: "tbsp" },
      ],
      serve_with: ["Allam Pachadi"],
      related: [],
      gi_tag: false,
      sources: ["src-001"],
      reviewer: "Reviewer Name",
      last_reviewed: "2026-10-15",
    };

    const result = DishFrontmatterSchema.safeParse(validDish);
    expect(result.success).toBe(true);
  });

  it("fails when a published dish has no sources", () => {
    const invalidDish = {
      slug: "invalid-dish",
      status: "published",
      names: {
        te: "వంటకం",
        transliteration: ["Vantakam"],
        en: "Dish",
      },
      category: "tiffin",
      course: "breakfast",
      diet: "vegetarian",
      regions: ["coastal-andhra"],
      heat: 2,
      time: { prep_min: 10, cook_min: 20 },
      servings: 2,
      ingredients: [{ ref: "rice", qty: 1, unit: "cup" }],
      sources: [],
      reviewer: "Chef",
    };

    const result = DishFrontmatterSchema.safeParse(invalidDish);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes("sources"))).toBe(true);
    }
  });

  it("fails when heat is out of bounds", () => {
    const invalidHeat = {
      slug: "test-dish",
      status: "draft",
      names: {
        te: "వంటకం",
        transliteration: ["Vantakam"],
        en: "Dish",
      },
      category: "tiffin",
      course: "breakfast",
      diet: "vegetarian",
      regions: ["coastal-andhra"],
      heat: 6, // invalid: must be 1 to 5
      time: { prep_min: 10, cook_min: 20 },
      servings: 2,
      ingredients: [{ ref: "rice", qty: 1, unit: "cup" }],
    };

    const result = DishFrontmatterSchema.safeParse(invalidHeat);
    expect(result.success).toBe(false);
  });
});
