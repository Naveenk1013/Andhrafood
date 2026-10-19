import { z } from "zod";

export const ContentStatusEnum = z.enum([
  "draft",
  "needs-review",
  "verified",
  "published",
]);
export type ContentStatus = z.infer<typeof ContentStatusEnum>;

export const RegionEnum = z.enum([
  "uttarandhra",
  "coastal-andhra",
  "rayalaseema",
]);
export type Region = z.infer<typeof RegionEnum>;

export const CategoryEnum = z.enum([
  "tiffin",
  "rice-and-meals",
  "pappu-and-dals",
  "curries-and-kuras",
  "fries-and-vepudu",
  "pulusu-and-charu",
  "pickles-and-chutneys",
  "podis",
  "snacks-and-street-food",
  "sweets",
  "seafood",
  "meat-and-poultry",
  "festival-dishes",
  "tribal-and-forest",
  "beverages",
  "dairy-and-curd",
]);
export type Category = z.infer<typeof CategoryEnum>;

export const CourseEnum = z.enum([
  "breakfast",
  "main",
  "side",
  "snack",
  "sweet",
  "drink",
  "condiment",
]);
export type Course = z.infer<typeof CourseEnum>;

export const DietEnum = z.enum([
  "vegetarian",
  "non-vegetarian",
  "eggetarian",
  "vegan-adaptable",
]);
export type Diet = z.infer<typeof DietEnum>;

export const HeatLevelEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);
export type HeatLevel = z.infer<typeof HeatLevelEnum>;

export const KebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
