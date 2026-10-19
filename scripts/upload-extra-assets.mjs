import crypto from "crypto";
import fs from "fs";
import path from "path";

// Auto-load .env.local if not already loaded into process.env
const envLocalPath = path.resolve(".env.local");
if (fs.existsSync(envLocalPath)) {
  for (const line of fs.readFileSync(envLocalPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const k = trimmed.slice(0, idx).trim();
        const v = trimmed.slice(idx + 1).trim();
        if (!process.env[k]) process.env[k] = v;
      }
    }
  }
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Missing Cloudinary credentials. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local");
}

async function uploadAsset(filePath, publicId) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "APFOOD";

  const signString = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signString).digest("hex");

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "image/jpeg" });

  const formData = new FormData();
  formData.append("file", blob, `${publicId}.jpg`);
  formData.append("folder", folder);
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", apiKey);
  formData.append("signature", signature);

  let res;
  let attempts = 0;
  const maxAttempts = 4;
  while (attempts < maxAttempts) {
    try {
      attempts++;
      res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) break;
      const errorText = await res.text();
      console.warn(`Upload attempt ${attempts} failed (${res.status}): ${errorText}. Retrying...`);
    } catch (err) {
      console.warn(`Upload attempt ${attempts} error: ${err.message}. Retrying...`);
      if (attempts >= maxAttempts) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempts));
    }
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Cloudinary upload failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  console.log(`[SUCCESS] Uploaded ${publicId} => ${data.secure_url}`);
  return data.secure_url;
}

async function main() {
  const assets = [
    { path: "public/images/hero-bhojanam.jpg", id: "hero-bhojanam" },
    { path: "public/images/regions/coastal-andhra.jpg", id: "region-coastal-andhra" },
    { path: "public/images/regions/rayalaseema.jpg", id: "region-rayalaseema" },
    { path: "public/images/regions/uttarandhra.jpg", id: "region-uttarandhra" },
  ];

  const results = {};
  for (const asset of assets) {
    console.log(`Uploading ${asset.id}...`);
    const url = await uploadAsset(asset.path, asset.id);
    results[asset.id] = url;
  }

  console.log("\nResults:\n", JSON.stringify(results, null, 2));
}

main().catch(console.error);
