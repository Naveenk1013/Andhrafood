import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { HeatMeter } from "./HeatMeter";
import { Clock, Users } from "lucide-react";
import { formatMinutes } from "@/lib/utils";

import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

interface DishCardProps {
  dish: any;
  locale?: string;
}

const REGION_IMAGE_MAP: Record<string, string> = {
  "coastal-andhra": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792341033/APFOOD/region-coastal-andhra.jpg",
  "rayalaseema": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792341035/APFOOD/region-rayalaseema.jpg",
  "uttarandhra": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792341037/APFOOD/region-uttarandhra.jpg",
};

const CLOUDINARY_HERO = "https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg";

export function DishCard({ dish }: DishCardProps) {
  // Support both JSON DB schema and legacy frontmatter schema
  const slug = dish.slug;
  const nameEn = dish.nameEn || dish.names?.en || dish.slug;
  const nameTe = dish.nameTe || dish.names?.te || "";
  const subName = dish.nameEnMeaning || dish.names?.transliteration?.[0] || nameEn;
  const region = dish.region || dish.regions?.[0] || "";
  const category = dish.category || "curries-and-kuras";
  const diet = dish.dietary || dish.diet || "vegetarian";
  const heatLevel = dish.heatLevel ?? dish.heat ?? 3;
  const totalTime =
    dish.prepTimeMinutes !== undefined && dish.cookTimeMinutes !== undefined
      ? dish.prepTimeMinutes + dish.cookTimeMinutes
      : dish.time
      ? dish.time.prep_min + dish.time.cook_min
      : 30;
  const servings = dish.servings || 4;
  const rawImage =
    dish.image && dish.image.startsWith("https://")
      ? dish.image
      : REGION_IMAGE_MAP[region] || CLOUDINARY_HERO;
  const imageSrc = optimizeCloudinaryUrl(rawImage, 640);

  const ingredientTags: string[] = dish.ingredients
    ? dish.ingredients.slice(0, 3).map((i: any) => (typeof i === "string" ? i : i.name || i.ref || ""))
    : [];

  return (
    <Link
      href={`/dishes/${slug}`}
      className="group relative flex flex-col bg-white dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 rounded-card overflow-hidden shadow-sm hover:shadow-xl card-fluid-hover active:scale-[0.985] focus:outline-none focus:ring-2 focus:ring-turmeric-500"
    >
      {/* Visual Image Header */}
      <div className="relative h-52 w-full overflow-hidden bg-leaf-950">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={nameEn}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-leaf-950 via-leaf-800 to-tamarind-700 flex items-center justify-center">
            <span className="text-turmeric-500 font-displayTe text-2xl font-bold">
              {nameTe || nameEn}
            </span>
          </div>
        )}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/95 via-leaf-950/40 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-chip text-[11px] font-bold tracking-wider uppercase bg-leaf-950/85 backdrop-blur-md text-turmeric-400 border border-turmeric-500/40 shadow-sm">
            {region.replace("-", " ")}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-chip text-[11px] font-semibold bg-rice-50/95 backdrop-blur-md text-ink-900 border border-rice-200 capitalize shadow-sm">
              {category.replace("-", " ")}
            </span>
            <span
              className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
              style={{
                backgroundColor: diet === "vegetarian" ? "#1F5A43" : "#B3261E",
              }}
              title={diet}
            />
          </div>
        </div>

        {/* Bottom Banner inside image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-displayTe text-2xl font-extrabold text-white drop-shadow-md group-hover:text-turmeric-400 transition-colors">
            {nameTe}
          </h3>
          <p className="font-display text-sm font-semibold text-rice-50/95 drop-shadow">
            {nameEn} · {subName}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-leaf-900">
        <div className="space-y-2">
          {/* Key ingredients preview */}
          <div className="flex flex-wrap gap-1">
            {ingredientTags.map((ing, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-chip bg-leaf-100/70 dark:bg-leaf-800 text-leaf-800 dark:text-leaf-200 border border-leaf-200/60 dark:border-leaf-700 font-medium capitalize"
              >
                {ing.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Heat Meter & Metadata Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-leaf-100 dark:border-leaf-800">
          <HeatMeter level={heatLevel} showLabel={true} />

          <div className="flex items-center gap-3 text-xs text-ink-600 dark:text-rice-50/80 font-medium">
            <span className="flex items-center gap-1" title="Preparation & Cooking Time">
              <Clock className="w-3.5 h-3.5 text-leaf-700 dark:text-turmeric-400" />
              {formatMinutes(totalTime)}
            </span>
            <span className="flex items-center gap-1" title="Servings">
              <Users className="w-3.5 h-3.5 text-leaf-700 dark:text-turmeric-400" />
              {servings}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
