import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import {
  DishFrontmatter,
  DishFrontmatterSchema,
  IngredientFrontmatter,
  IngredientFrontmatterSchema,
  MasterSourcesSchema,
  RegionFrontmatter,
  RegionFrontmatterSchema,
  SourceItem,
} from "@/schemas";

const CONTENT_DIR = path.resolve(process.cwd(), "content");

export interface LoadedDish {
  frontmatter: DishFrontmatter;
  content: string;
}

export interface LoadedIngredient {
  frontmatter: IngredientFrontmatter;
  content: string;
}

export interface LoadedRegion {
  frontmatter: RegionFrontmatter;
  content: string;
}

export function getAllDishes(): LoadedDish[] {
  const dir = path.join(CONTENT_DIR, "dishes");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const dishes: LoadedDish[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const parsed = DishFrontmatterSchema.safeParse(data);
    if (parsed.success) {
      dishes.push({ frontmatter: parsed.data, content });
    }
  }
  return dishes;
}

export function getDishBySlug(slug: string): LoadedDish | null {
  const filePath = path.join(CONTENT_DIR, "dishes", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const parsed = DishFrontmatterSchema.safeParse(data);
  if (!parsed.success) return null;
  return { frontmatter: parsed.data, content };
}

export function getAllIngredients(): LoadedIngredient[] {
  const dir = path.join(CONTENT_DIR, "ingredients");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const ingredients: LoadedIngredient[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const parsed = IngredientFrontmatterSchema.safeParse(data);
    if (parsed.success) {
      ingredients.push({ frontmatter: parsed.data, content });
    }
  }
  return ingredients;
}

export function getAllRegions(): LoadedRegion[] {
  const dir = path.join(CONTENT_DIR, "regions");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const regions: LoadedRegion[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const parsed = RegionFrontmatterSchema.safeParse(data);
    if (parsed.success) {
      regions.push({ frontmatter: parsed.data, content });
    }
  }
  return regions;
}

export function getAllSources(): SourceItem[] {
  const filePath = path.join(CONTENT_DIR, "sources", "sources.yml");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = yaml.load(raw);
  const res = MasterSourcesSchema.safeParse(parsed);
  return res.success ? res.data.sources : [];
}
