"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Bookmark, Sparkles, Compass, ArrowRight, Heart } from "lucide-react";
import { PageTransition } from "@/components/ui/FluidMotion";
import { SectionVisualBackdrop } from "@/components/ui/SectionVisuals";
import { DishCard } from "@/components/ui/DishCard";
import type { Dish } from "@/lib/json-db";
import rawDishesData from "@/data/dishes.json";

export default function SavedDishesPage() {
  const locale = useLocale();
  const isTe = locale === "te";
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("andhra_saved_dishes");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedSlugs(parsed);
        }
      }
    } catch {
      // Fallback if local storage fails
    }
  }, []);

  const allDishes: Dish[] = (Array.isArray(rawDishesData) ? rawDishesData : []) as unknown as Dish[];
  const savedDishes: Dish[] = allDishes.filter((dish: Dish) => savedSlugs.includes(dish.slug));
  const suggestedDishes: Dish[] = allDishes.slice(0, 4);

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 sm:pb-12">
      {/* Header Banner */}
      <SectionVisualBackdrop variant="emerald-sanctum" className="space-y-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-chip bg-leaf-900/80 border border-turmeric-500/50 text-turmeric-400 text-xs font-bold tracking-wider uppercase shadow-inner">
            <Bookmark className="w-3.5 h-3.5 text-turmeric-400" />
            <span>{isTe ? "మీ అభిరుచులు · సేవ్ చేసిన వంటకాలు" : "Personal Culinary Vault"}</span>
          </div>
          <h1 className="font-displayTe text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rice-50 via-turmeric-100 to-turmeric-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {isTe ? "మీరు భద్రపరిచిన వంటకాలు" : "Your Saved Recipes"}
          </h1>
          <p className="text-sm text-rice-200/90 max-w-2xl leading-relaxed">
            {isTe
              ? "మీరు భద్రపరుచుకున్న సాంప్రదాయ ఆంధ్ర వంటకాలు, పదార్థాల జాబితాలు మరియు తయారీ పద్ధతులు ఇక్కడ సురక్షితంగా ఉంటాయి."
              : "Access your bookmarked traditional recipes, ingredients checklists, and heirloom cooking steps anytime on mobile and desktop."}
          </p>
        </div>
      </SectionVisualBackdrop>

      {/* Content Stream */}
      {!mounted ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-72 rounded-card bg-leaf-100/50 dark:bg-leaf-900/40 animate-pulse border border-leaf-200/50 dark:border-leaf-800"
            />
          ))}
        </div>
      ) : savedDishes.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-leaf-200/80 dark:border-leaf-800 pb-3">
            <h2 className="text-lg font-bold text-ink-900 dark:text-rice-50 font-displayTe">
              {isTe
                ? `భద్రపరచిన వంటకాలు (${savedDishes.length})`
                : `Saved Items (${savedDishes.length})`}
            </h2>
            <button
              onClick={() => {
                localStorage.removeItem("andhra_saved_dishes");
                setSavedSlugs([]);
              }}
              className="text-xs text-guntur-600 dark:text-guntur-400 hover:underline font-semibold"
            >
              {isTe ? "అన్నీ తొలగించు" : "Clear All"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedDishes.map((dish) => (
              <DishCard key={dish.slug} dish={dish} locale={locale} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 sm:py-16 px-4 bg-white/80 dark:bg-leaf-950/80 backdrop-blur-xl rounded-card border border-leaf-200/80 dark:border-leaf-800/80 shadow-md space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-turmeric-500/10 border border-turmeric-500/30 flex items-center justify-center text-turmeric-600 dark:text-turmeric-400">
            <Bookmark className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="font-displayTe text-xl sm:text-2xl font-bold text-leaf-950 dark:text-rice-50">
              {isTe ? "ఇంకా ఏ వంటకాన్నీ సేవ్ చేయలేదు" : "No Saved Recipes Yet"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-rice-200/70 leading-relaxed">
              {isTe
                ? "గ్యాలరీలోని వంటకాలను అన్వేషించండి. మీకు నచ్చిన వంటకాలను భద్రపరచుకుని ఎప్పుడైనా తిరిగి చూడండి."
                : "Explore authentic dishes from Coastal Andhra, Rayalaseema, and Uttarandhra to build your personal cookbook."}
            </p>
          </div>

          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#081C14] bg-gradient-to-r from-[#F2B31B] via-[#F7C545] to-[#E5A717] hover:brightness-105 shadow-md active:scale-95 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>{isTe ? "వంటకాలను అన్వేషించండి" : "Browse Heritage Dishes"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Suggested Starter Dishes */}
          <div className="pt-10 border-t border-leaf-200/60 dark:border-leaf-800 text-left space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-turmeric-600 dark:text-turmeric-400" />
              <h3 className="font-displayTe text-sm font-bold text-leaf-950 dark:text-rice-50">
                {isTe ? "ప్రసిద్ధ సాంప్రదాయ వంటకాలు" : "Popular Heritage Dishes to Explore"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestedDishes.map((dish) => (
                <DishCard key={dish.slug} dish={dish} locale={locale} />
              ))}
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
