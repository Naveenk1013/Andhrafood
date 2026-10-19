import fs from "fs";

// Load .env.local manually if not in process.env
if (fs.existsSync(".env.local")) {
  const content = fs.readFileSync(".env.local", "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

async function checkCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log("=== Checking Cloudinary Credentials & Access ===");
  console.log("Cloud Name :", cloudName);
  console.log("API Key    :", apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : "MISSING");
  console.log("API Secret :", apiSecret ? `Exists (${apiSecret.length} chars)` : "MISSING");

  // 1. Authenticate with Cloudinary Admin API
  const authHeader = "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/usage`, {
      headers: { Authorization: authHeader },
    });
    console.log("\n[1] Cloudinary Admin API (/usage): Status", res.status, res.statusText);
    if (res.ok) {
      const data = await res.json();
      console.log("    Authentication: SUCCESS ✅");
      console.log("    Plan          :", data.plan);
      console.log("    Credits Used  :", `${data.credits?.usage || 0} / ${data.credits?.limit || "unlimited"}`);
      console.log("    Objects Count :", data.objects?.usage || 0, "assets stored");
      console.log("    Bandwidth Used:", data.bandwidth?.usage ? `${(data.bandwidth.usage / (1024 * 1024)).toFixed(2)} MB` : "0 MB");
      console.log("    Storage Used  :", data.storage?.usage ? `${(data.storage.usage / (1024 * 1024)).toFixed(2)} MB` : "0 MB");
    } else {
      const errText = await res.text();
      console.error("    Authentication: FAILED ❌", errText);
    }
  } catch (err) {
    console.error("    Network error testing Admin API:", err.message);
  }

  // 2. Test CDN Asset Delivery
  try {
    const sampleUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1792309950/APFOOD/pesarattu.jpg`;
    const cdnRes = await fetch(sampleUrl, { method: "HEAD" });
    console.log("\n[2] Cloudinary CDN Delivery (APFOOD/pesarattu.jpg): Status", cdnRes.status, cdnRes.statusText);
    if (cdnRes.ok) {
      console.log("    CDN Delivery  : SUCCESS ✅ (HTTP 200 OK)");
      console.log("    Content-Type  :", cdnRes.headers.get("content-type"));
      console.log("    Content-Length:", cdnRes.headers.get("content-length"), "bytes");
    } else {
      console.error("    CDN Delivery: FAILED ❌");
    }
  } catch (err) {
    console.error("    CDN check failed:", err.message);
  }

  // 3. Test Video CDN Delivery
  try {
    const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/v1792308468/APfood_ebb8wq.mp4`;
    const vidRes = await fetch(videoUrl, { method: "HEAD" });
    console.log("\n[3] Cloudinary 4K Hero Video CDN: Status", vidRes.status, vidRes.statusText);
    if (vidRes.ok) {
      console.log("    Video Delivery: SUCCESS ✅ (HTTP 200 OK)");
      console.log("    Content-Type  :", vidRes.headers.get("content-type"));
      console.log("    Content-Length:", vidRes.headers.get("content-length"), "bytes");
    } else {
      console.error("    Video Delivery: FAILED ❌");
    }
  } catch (err) {
    console.error("    Video check failed:", err.message);
  }
}

checkCloudinary();
