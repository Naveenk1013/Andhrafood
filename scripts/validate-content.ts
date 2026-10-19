import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import {
  DishFrontmatterSchema,
  IngredientFrontmatterSchema,
  MasterSourcesSchema,
  RegionFrontmatterSchema,
  TechniqueFrontmatterSchema,
} from "../src/schemas";

const CONTENT_DIR = path.resolve(process.cwd(), "content");

interface ValidationError {
  file: string;
  field?: string;
  message: string;
}

const errors: ValidationError[] = [];

function addError(file: string, message: string, field?: string) {
  errors.push({ file, field, message });
}

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function validate() {
  console.log("🔍 Validating Andhra Ruchulu Content Database...\n");

  // 1. Validate sources
  const sourcesFile = path.join(CONTENT_DIR, "sources", "sources.yml");
  const knownSourceIds = new Set<string>();

  if (!fs.existsSync(sourcesFile)) {
    addError(sourcesFile, "Master sources file (sources/sources.yml) not found");
  } else {
    try {
      const content = fs.readFileSync(sourcesFile, "utf-8");
      const parsed = yaml.load(content);
      const res = MasterSourcesSchema.safeParse(parsed);
      if (!res.success) {
        res.error.errors.forEach((err) => {
          addError(sourcesFile, err.message, err.path.join("."));
        });
      } else {
        res.data.sources.forEach((s) => knownSourceIds.add(s.id));
        console.log(`✅ Validated ${res.data.sources.length} master source entries`);
      }
    } catch (e: any) {
      addError(sourcesFile, `Failed to parse YAML: ${e.message}`);
    }
  }

  // 2. Validate ingredients
  const ingredientsDir = path.join(CONTENT_DIR, "ingredients");
  const knownIngredientSlugs = new Set<string>();

  if (fs.existsSync(ingredientsDir)) {
    const files = fs.readdirSync(ingredientsDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const filePath = path.join(ingredientsDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      try {
        const { data } = matter(raw);
        const expectedSlug = file.replace(/\.md$/, "");
        if (data.slug !== expectedSlug) {
          addError(filePath, `Slug '${data.slug}' does not match filename '${expectedSlug}'`, "slug");
        }
        const res = IngredientFrontmatterSchema.safeParse(data);
        if (!res.success) {
          res.error.errors.forEach((err) => {
            addError(filePath, err.message, err.path.join("."));
          });
        } else {
          knownIngredientSlugs.add(res.data.slug);
        }
      } catch (e: any) {
        addError(filePath, `Markdown/Frontmatter error: ${e.message}`);
      }
    }
    console.log(`✅ Validated ${knownIngredientSlugs.size} ingredient entries`);
  }

  // 3. Validate regions
  const regionsDir = path.join(CONTENT_DIR, "regions");
  const knownRegions = new Set<string>();

  if (fs.existsSync(regionsDir)) {
    const files = fs.readdirSync(regionsDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const filePath = path.join(regionsDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      try {
        const { data } = matter(raw);
        const res = RegionFrontmatterSchema.safeParse(data);
        if (!res.success) {
          res.error.errors.forEach((err) => {
            addError(filePath, err.message, err.path.join("."));
          });
        } else {
          knownRegions.add(res.data.slug);
        }
      } catch (e: any) {
        addError(filePath, `Markdown/Frontmatter error: ${e.message}`);
      }
    }
    console.log(`✅ Validated ${knownRegions.size} region entries`);
  }

  // 4. Validate techniques
  const techniquesDir = path.join(CONTENT_DIR, "techniques");
  const knownTechniqueSlugs = new Set<string>();

  if (fs.existsSync(techniquesDir)) {
    const files = fs.readdirSync(techniquesDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const filePath = path.join(techniquesDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      try {
        const { data } = matter(raw);
        const res = TechniqueFrontmatterSchema.safeParse(data);
        if (!res.success) {
          res.error.errors.forEach((err) => {
            addError(filePath, err.message, err.path.join("."));
          });
        } else {
          knownTechniqueSlugs.add(res.data.slug);
        }
      } catch (e: any) {
        addError(filePath, `Markdown/Frontmatter error: ${e.message}`);
      }
    }
    console.log(`✅ Validated ${knownTechniqueSlugs.size} technique entries`);
  }

  // 5. Validate dishes
  const dishesDir = path.join(CONTENT_DIR, "dishes");
  let dishCount = 0;

  if (fs.existsSync(dishesDir)) {
    const files = fs.readdirSync(dishesDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      dishCount++;
      const filePath = path.join(dishesDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      try {
        const { data, content } = matter(raw);
        const expectedSlug = file.replace(/\.md$/, "");
        if (data.slug !== expectedSlug) {
          addError(filePath, `Slug '${data.slug}' does not match filename '${expectedSlug}'`, "slug");
        }

        const res = DishFrontmatterSchema.safeParse(data);
        if (!res.success) {
          res.error.errors.forEach((err) => {
            addError(filePath, err.message, err.path.join("."));
          });
        } else {
          const dish = res.data;

          // Cross-reference ingredient refs
          for (const ing of dish.ingredients) {
            if (!knownIngredientSlugs.has(ing.ref)) {
              addError(
                filePath,
                `Ingredient ref '${ing.ref}' does not exist in /content/ingredients/`,
                "ingredients"
              );
            }
          }

          // Cross-reference source IDs
          for (const src of dish.sources) {
            if (!knownSourceIds.has(src)) {
              addError(
                filePath,
                `Source '${src}' does not exist in /content/sources/sources.yml`,
                "sources"
              );
            }
          }

          // Check required sections in body
          if (!content.includes("## Story")) {
            addError(filePath, "Dish markdown body must contain a '## Story' section");
          }
          if (!content.includes("## Method")) {
            addError(filePath, "Dish markdown body must contain a '## Method' section");
          }
        }
      } catch (e: any) {
        addError(filePath, `Markdown/Frontmatter error: ${e.message}`);
      }
    }
    console.log(`✅ Validated ${dishCount} dish entries`);
  }

  // Summary report
  console.log("\n----------------------------------------");
  if (errors.length > 0) {
    console.error(`❌ Validation failed with ${errors.length} error(s):\n`);
    errors.forEach((err, idx) => {
      const relPath = path.relative(process.cwd(), err.file);
      const fieldStr = err.field ? ` [${err.field}]` : "";
      console.error(`${idx + 1}. ${relPath}${fieldStr}: ${err.message}`);
    });
    console.error("----------------------------------------\n");
    process.exit(1);
  } else {
    console.log("✨ All content files passed strict schema and referential validation!\n");
    process.exit(0);
  }
}

validate().catch((err) => {
  console.error("Fatal validation error:", err);
  process.exit(1);
});
