import fs from "fs";
import path from "path";

const dishesData = JSON.parse(fs.readFileSync("src/data/dishes.json", "utf-8"));

// Expert culinary prompt generator tailored to authentic Andhra cuisine
function buildPrompt(dish) {
  const { slug, nameEn, nameTe, category, region, descriptionEn, culturalContext, ingredients } = dish;
  
  const primaryIngredients = ingredients
    .filter(i => i.isPrimary)
    .map(i => i.name)
    .slice(0, 4)
    .join(", ");

  let vesselSetting = "served in a traditional brass bowl on a fresh green banana leaf";
  if (category === "sweets") {
    vesselSetting = "arranged artfully on a vintage brass plate or parchment on dark aged wood";
  } else if (category.includes("pulusu") || slug.includes("chepala") || slug.includes("pulusu")) {
    vesselSetting = "served in a rustic unglazed earthen clay pot (chatty) on a dark wooden table";
  } else if (slug.includes("biryani") || slug.includes("bongu")) {
    vesselSetting = "served in a charred bamboo stalk or traditional heavy handi on fresh banana leaf";
  } else if (slug.includes("sangati")) {
    vesselSetting = "steaming glossy ragi mudda with molten golden cow ghee pooling in a crater, served on a banana leaf alongside fiery curry";
  } else if (category.includes("pickles") || category.includes("chutney")) {
    vesselSetting = "served in a traditional ceramic bharani jar and a small stone katori, glistening with cold-pressed oil";
  }

  return `Award-winning commercial food photography of authentic Andhra ${nameEn} (${nameTe}). ${descriptionEn.slice(0, 150)}. Featuring ${primaryIngredients}. Beautifully ${vesselSetting}. Garnished with fresh curry leaves, whole spices, and glistening pure ghee. Warm cinematic morning lighting, soft natural shadows, rich textures, steam rising, shallow depth of field, 8k resolution, authentic South Indian Telugu culinary heritage.`;
}

const registry = dishesData.map(dish => {
  const isPesarattu = dish.slug === "pesarattu";
  return {
    slug: dish.slug,
    nameEn: dish.nameEn,
    nameTe: dish.nameTe,
    region: dish.region,
    category: dish.category,
    prompt: buildPrompt(dish),
    status: isPesarattu ? "uploaded" : "pending",
    cloudinaryUrl: isPesarattu ? "https://res.cloudinary.com/dro6n6co1/image/upload/v1792309950/APFOOD/pesarattu.jpg" : null,
  };
});

fs.writeFileSync("scripts/dishes-registry.json", JSON.stringify(registry, null, 2));
console.log(`Initialized registry with ${registry.length} dishes.`);
