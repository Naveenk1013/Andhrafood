import fs from "fs";

const dishes = JSON.parse(fs.readFileSync("src/data/dishes.json", "utf-8"));
const regions = JSON.parse(fs.readFileSync("src/data/regions.json", "utf-8"));

const itemsToCheck = [
  ...dishes
    .filter(d => d.image && d.image.startsWith("https://res.cloudinary.com"))
    .map(d => ({ label: `dish: ${d.slug}`, url: d.image })),
  ...regions
    .filter(r => r.image && r.image.startsWith("https://res.cloudinary.com"))
    .map(r => ({ label: `region: ${r.slug}`, url: r.image })),
  {
    label: "hero banner: hero-bhojanam",
    url: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg"
  },
  {
    label: "hero video: APfood",
    url: "https://res.cloudinary.com/dro6n6co1/video/upload/v1792308468/APfood_ebb8wq.mp4"
  }
];

console.log(`Checking ${itemsToCheck.length} Cloudinary assets...\n`);

let passed = 0;
let failed = 0;

for (const item of itemsToCheck) {
  try {
    const res = await fetch(item.url, { method: "HEAD" });
    const contentType = res.headers.get("content-type");
    const contentLength = res.headers.get("content-length");
    if (res.ok) {
      console.log(`[PASS] ${item.label.padEnd(35)} Status: ${res.status} | Type: ${contentType} | Size: ${contentLength} bytes`);
      passed++;
    } else {
      console.error(`[FAIL] ${item.label.padEnd(35)} Status: ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`[ERROR] ${item.label.padEnd(35)} Error: ${err.message}`);
    failed++;
  }
}

console.log(`\nVerification Complete: ${passed} Passed, ${failed} Failed.`);
if (failed > 0) process.exit(1);
