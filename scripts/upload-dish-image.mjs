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

export async function uploadDishToCloudinary(filePath, slug) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // Also copy to local public/images/dishes
  const localDestDir = path.resolve("public/images/dishes");
  if (!fs.existsSync(localDestDir)) {
    fs.mkdirSync(localDestDir, { recursive: true });
  }
  const localDestFile = path.join(localDestDir, `${slug}.jpg`);
  fs.copyFileSync(filePath, localDestFile);
  console.log(`Saved local copy to ${localDestFile}`);

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "APFOOD";
  const publicId = slug;

  // Signature string must be sorted alphabetically: folder, public_id, timestamp
  const signString = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signString).digest("hex");

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "image/jpeg" });

  const formData = new FormData();
  formData.append("file", blob, `${slug}.jpg`);
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
      await new Promise(r => setTimeout(r, 2000 * attempts));
    }
  }

  if (!res || !res.ok) {
    throw new Error(`Cloudinary upload failed after ${attempts} attempts`);
  }

  const data = await res.json();
  console.log(`Successfully uploaded ${slug} to Cloudinary!`);
  console.log(`URL: ${data.secure_url}`);
  return data.secure_url;
}

// Allow CLI execution: node scripts/upload-dish-image.mjs <filePath> <slug>
if (process.argv[2] && process.argv[3]) {
  uploadDishToCloudinary(process.argv[2], process.argv[3]).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
