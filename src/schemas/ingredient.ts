import { z } from "zod";
import { ContentStatusEnum, KebabCaseRegex } from "./common";

export const IngredientFrontmatterSchema = z.object({
  slug: z.string().regex(KebabCaseRegex, "Slug must be kebab-case"),
  status: ContentStatusEnum.default("draft"),
  names: z.object({
    te: z.string().min(1, "Telugu name is required"),
    transliteration: z.array(z.string().min(1)).min(1, "At least one transliteration is required"),
    en: z.string().min(1, "English name is required"),
    botanical: z.string().optional(),
  }),
  category: z.enum([
    "grain",
    "lentil-pulse",
    "vegetable",
    "greens",
    "spice-condiment",
    "oil-fat",
    "sweetener",
    "meat-seafood",
    "dairy",
    "other",
  ]),
  key_regions: z.array(z.string()).default([]),
  season: z.string().optional(),
  notes: z.string().optional(),
  sources: z.array(z.string()).default([]),
});

export type IngredientFrontmatter = z.infer<typeof IngredientFrontmatterSchema>;
