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

async function testCloudinary() {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "APFOOD";
  const publicId = "connection_test";

  // Signature string must be sorted alphabetically: folder, public_id, timestamp
  const signString = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signString).digest("hex");

  // Tiny 1x1 transparent PNG data URI
  const tinyPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAArows=";

  const formData = new FormData();
  formData.append("file", tinyPng);
  formData.append("folder", folder);
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", apiKey);
  formData.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("Cloudinary response status:", res.status);
  console.log("Secure URL:", data.secure_url);
  console.log("Public ID:", data.public_id);
}

testCloudinary().catch(console.error);
