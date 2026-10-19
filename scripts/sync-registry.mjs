import fs from "fs";

const registry = JSON.parse(fs.readFileSync("scripts/dishes-registry.json", "utf-8"));
const dishes = JSON.parse(fs.readFileSync("src/data/dishes.json", "utf-8"));

for (const entry of registry) {
  const match = dishes.find(d => d.slug === entry.slug);
  if (match && match.image.startsWith("https://res.cloudinary.com")) {
    entry.status = "uploaded";
    entry.cloudinaryUrl = match.image;
  }
}

fs.writeFileSync("scripts/dishes-registry.json", JSON.stringify(registry, null, 2));
const uploaded = registry.filter(r => r.status === "uploaded").length;
const pending = registry.filter(r => r.status === "pending").length;
console.log(`Registry Status: ${uploaded} Uploaded, ${pending} Pending (Total: ${registry.length})`);
