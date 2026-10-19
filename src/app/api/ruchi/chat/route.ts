import { NextRequest, NextResponse } from "next/server";
import { queryGroundedGemini } from "@/lib/gemini-rag";

export const runtime = "nodejs";

// In-memory sliding window rate limiter: 20 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 20, windowMs = 60000): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 3000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count += 1;
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  // 1. Validate Content-Type
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  // 2. Rate Limiting Check
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please slow down and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter || 60),
        },
      }
    );
  }

  try {
    const body = await req.json();

    // 3. Strict Input Validation & Length Capping (anti-DoS)
    const rawQuery = typeof body?.query === "string" ? body.query.trim() : "";
    // Strip control characters & null bytes
    const query = rawQuery.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Query is required" },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: "Query too long. Please limit questions to 500 characters.",
        },
        { status: 400 }
      );
    }

    // 4. Whitelist Locale
    const locale = body?.locale === "te" ? "te" : "en";

    // 5. Execute Grounded Query
    const result = await queryGroundedGemini(query, locale);

    return NextResponse.json({
      success: true,
      text: result.text,
      source: result.source,
      relatedDish: result.relatedDish,
      isGemini: result.isGemini,
    });
  } catch (error) {
    // 6. Security: Prevent Internal Information Disclosure
    console.error("API /api/ruchi/chat internal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process culinary query. Please try again.",
      },
      { status: 500 }
    );
  }
}
