import { z } from "zod";
import { ContentStatusEnum, KebabCaseRegex } from "./common";

export const TechniqueFrontmatterSchema = z.object({
  slug: z.string().regex(KebabCaseRegex, "Slug must be kebab-case"),
  status: ContentStatusEnum.default("draft"),
  names: z.object({
    te: z.string().min(1, "Telugu name is required"),
    transliteration: z.array(z.string()).min(1),
    en: z.string().min(1, "English name is required"),
  }),
  category: z.enum([
    "tempering",
    "grinding",
    "cooking-method",
    "preservation",
    "fermentation",
    "baking-roasting",
    "other",
  ]),
  traditional_cookware: z.array(z.string()).default([]),
  sources: z.array(z.string()).default([]),
});

export type TechniqueFrontmatter = z.infer<typeof TechniqueFrontmatterSchema>;
