import { NextResponse } from "next/server";
import { getAllDishes, getAllIngredients, getAllRegions, getAllSources } from "@/lib/content";

export async function GET() {
  try {
    const dishes = getAllDishes();
    const ingredients = getAllIngredients();
    const regions = getAllRegions();
    const sources = getAllSources();

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      counts: {
        dishes: dishes.length,
        ingredients: ingredients.length,
        regions: regions.length,
        sources: sources.length,
      },
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      { status: "unhealthy", message: "Health check failed" },
      { status: 500 }
    );
  }
}
