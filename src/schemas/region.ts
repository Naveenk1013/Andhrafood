import { z } from "zod";
import { RegionEnum } from "./common";

export const RegionFrontmatterSchema = z.object({
  slug: RegionEnum,
  names: z.object({
    te: z.string().min(1, "Telugu name is required"),
    transliteration: z.string().min(1),
    en: z.string().min(1),
  }),
  districts: z.array(z.string()).min(1, "Must list the districts belonging to this region"),
  culinary_identity: z.string().min(10, "Summary of regional culinary character"),
  signature_flavors: z.array(z.string()).default([]),
  staples: z.array(z.string()).default([]),
});

export type RegionFrontmatter = z.infer<typeof RegionFrontmatterSchema>;
