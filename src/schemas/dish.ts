import { z } from "zod";
import {
  CategoryEnum,
  ContentStatusEnum,
  CourseEnum,
  DietEnum,
  HeatLevelEnum,
  KebabCaseRegex,
  RegionEnum,
} from "./common";

export const DishIngredientItemSchema = z.object({
  ref: z.string().regex(KebabCaseRegex, "Ingredient ref must be kebab-case (matching an ingredient slug)"),
  qty: z.number().positive("Quantity must be a positive number"),
  unit: z.string().min(1, "Unit is required (e.g. cup, tbsp, g)"),
  note: z.string().optional(),
});

export const DishFrontmatterSchema = z
  .object({
    slug: z.string().regex(KebabCaseRegex, "Slug must be lowercase kebab-case"),
    status: ContentStatusEnum.default("draft"),
    names: z.object({
      te: z.string().min(1, "Telugu name is required"),
      transliteration: z
        .array(z.string().min(1))
        .min(1, "At least one transliterated name is required"),
      en: z.string().min(1, "English name is required"),
    }),
    aliases: z.array(z.string()).default([]),
    category: CategoryEnum,
    course: CourseEnum,
    diet: DietEnum,
    allergens: z.array(z.string()).default([]),
    regions: z.array(RegionEnum).min(1, "At least one Andhra region is required"),
    districts: z.array(z.string()).default([]),
    heat: HeatLevelEnum,
    time: z.object({
      prep_min: z.number().nonnegative(),
      cook_min: z.number().nonnegative(),
    }),
    servings: z.number().int().positive().default(4),
    occasions: z.array(z.string()).default([]),
    techniques: z.array(z.string()).default([]),
    ingredients: z
      .array(DishIngredientItemSchema)
      .min(1, "Dish must include at least one ingredient"),
    serve_with: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    gi_tag: z.boolean().default(false),
    sources: z.array(z.string()).default([]),
    reviewer: z.string().default(""),
    last_reviewed: z.string().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.status === "published" || data.status === "verified") {
      if (!data.sources || data.sources.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["sources"],
          message: `A ${data.status} dish requires at least one verified source citation`,
        });
      }
      if (data.status === "published" && (!data.reviewer || data.reviewer.trim().length === 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["reviewer"],
          message: "A published dish must have a reviewer name recorded",
        });
      }
    }
  });

export type DishFrontmatter = z.infer<typeof DishFrontmatterSchema>;
export type DishIngredientItem = z.infer<typeof DishIngredientItemSchema>;
