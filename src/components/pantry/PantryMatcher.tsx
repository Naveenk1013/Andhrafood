"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import {
  PANTRY_INGREDIENTS,
  PANTRY_CATEGORIES,
  PANTRY_PRESETS,
  PantryIngredient,
} from "@/data/pantry-ingredients";
import { matchDishesWithPantry, DishMatchResult } from "@/lib/pantry-matcher";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import {
  CookingPot,
  Sparkles,
  Check,
  Plus,
  Flame,
  Clock,
  ArrowRight,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  Filter,
} from "lucide-react";
import { RuchiOrb } from "@/components/ui/RuchiOrb";

export function PantryMatcher() {
  const locale = useLocale();
  const isTe = locale === "te";
  const t = useTranslations("pantry");

  // Selected pantry item IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "rice",
    "toor-dal",
    "green-chillies",
    "ginger",
    "ghee",
    "tamarind",
    "onions",
  ]);

  // Active category filter for pantry items
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // Search filter for ingredients
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Result match filter: "all" | "ready"
  const [filterReadyOnly, setFilterReadyOnly] = useState<boolean>(false);
  // Regional filter
  const [regionFilter, setRegionFilter] = useState<string>("all");

  // Toggle single ingredient
  const toggleIngredient = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Apply preset
  const applyPreset = (presetIds: string[]) => {
    setSelectedIds(presetIds);
  };

  // Clear all
  const clearAll = () => {
    setSelectedIds([]);
  };

  // Filtered ingredients to display in selector
  const visibleIngredients = useMemo(() => {
    return PANTRY_INGREDIENTS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.nameEn.toLowerCase().includes(q) ||
        item.nameTe.toLowerCase().includes(q) ||
        item.matchKeywords.some((kw) => kw.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Compute matched dishes
  const matchedDishes = useMemo(() => {
    const results = matchDishesWithPantry(selectedIds, regionFilter, "all");
    if (filterReadyOnly) {
      return results.filter((d) => d.isReadyToCook);
    }
    return results;
  }, [selectedIds, regionFilter, filterReadyOnly]);

  const readyToCookCount = useMemo(() => {
    return matchedDishes.filter((d) => d.isReadyToCook).length;
  }, [matchedDishes]);

  // Construct smart query for Ruchi AI
  const ruchiPromptQuery = useMemo(() => {
    const selectedNames = selectedIds
      .map((id) => {
        const item = PANTRY_INGREDIENTS.find((i) => i.id === id);
        return item ? item.nameEn : id;
      })
      .slice(0, 8)
      .join(", ");
    return encodeURIComponent(
      `I have these ingredients in my kitchen: ${selectedNames}. What authentic Andhra dish can I cook, and what can I substitute if I miss anything?`
    );
  }, [selectedIds]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-[#081C14] via-[#103226] to-[#1F5A43] border border-[#F2B31B]/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F2B31B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1F5A43]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2B31B]/20 border border-[#F2B31B]/40 text-[#F2B31B] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <CookingPot className="w-3.5 h-3.5" />
              <span>{isTe ? "ఆంధ్ర వంటిల్లు" : "Andhra Kitchen Pantry"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#FAF9F5] font-displayTe">
              {t("title")}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-body">
              {t("subtitle")}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 self-start md:self-auto flex-shrink-0">
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-2xl font-black text-[#F2B31B]">
                {selectedIds.length}
              </div>
              <div className="text-[11px] text-gray-400 font-medium">
                {isTe ? "ఎంచుకున్నవి" : "In Pantry"}
              </div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-emerald-400">
                {readyToCookCount}
              </div>
              <div className="text-[11px] text-gray-400 font-medium">
                {isTe ? "వెంటనే చేయొచ్చు" : "Ready to Cook"}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Presets Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
          <div className="text-xs font-semibold text-[#F2B31B] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("presets")}</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {PANTRY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.ingredientIds)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#F2B31B]/50 transition-all text-[#FAF9F5] active:scale-95 shadow-sm"
              >
                <span>{preset.icon}</span>
                <span className="font-semibold">
                  {isTe ? preset.nameTe : preset.nameEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Selector, Right Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Pantry Selection Console (5 cols) */}
        <div className="lg:col-span-5 bg-white/80 dark:bg-[#081C14]/90 backdrop-blur-xl border border-black/[0.08] dark:border-[#1F5A43]/50 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5 sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/10">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-turmeric-600 dark:text-[#F2B31B]" />
              <h2 className="font-bold text-base sm:text-lg text-leaf-950 dark:text-[#FAF9F5]">
                {t("selectItems")}
              </h2>
            </div>
            {selectedIds.length > 0 && (
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t("clearAll")}</span>
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTe ? "పదార్థాన్ని వెతకండి..." : "Search ingredients..."}
              className="w-full pl-10 pr-4 py-2 text-sm bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F2B31B] text-leaf-950 dark:text-[#FAF9F5] placeholder-gray-400 transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PANTRY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#1F5A43] text-[#F2B31B] shadow-md border border-[#F2B31B]/40"
                    : "bg-black/[0.03] dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-transparent"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{isTe ? cat.nameTe : cat.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Ingredients Grid */}
          <div className="max-h-[500px] overflow-y-auto pr-1 space-y-2 scrollbar-thin">
            {visibleIngredients.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs">
                {isTe ? "ఫలితాలు లేవు" : "No ingredients match your search"}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {visibleIngredients.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleIngredient(item.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left group active:scale-[0.98] ${
                        isSelected
                          ? "bg-gradient-to-r from-emerald-500/15 to-emerald-600/10 border-emerald-500/50 dark:border-emerald-500/60 shadow-sm"
                          : "bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.07] border-black/[0.06] dark:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-1">
                        <span className="text-base flex-shrink-0">{item.icon}</span>
                        <div className="truncate">
                          <div
                            className={`text-xs font-bold truncate ${
                              isSelected
                                ? "text-emerald-900 dark:text-emerald-300"
                                : "text-leaf-950 dark:text-[#FAF9F5]"
                            }`}
                          >
                            {isTe ? item.nameTe : item.nameEn}
                          </div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                            {isTe ? item.nameEn : item.nameTe}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? "bg-emerald-600 text-white"
                            : "border border-gray-300 dark:border-gray-600 text-transparent group-hover:border-gray-400"
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : (
                          <Plus className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ruchi AI Assistant CTA */}
          <div className="pt-3 border-t border-black/[0.06] dark:border-white/10">
            <Link
              href={`/ruchi?prompt=${ruchiPromptQuery}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs bg-gradient-to-r from-[#F2B31B] via-[#F7C545] to-[#E5A717] hover:brightness-105 text-[#081C14] shadow-md transition-all active:scale-[0.98]"
            >
              <RuchiOrb size="xs" state="idle" />
              <span>{t("askRuchi")}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Matched Recipes Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Results Control Bar */}
          <div className="bg-white/70 dark:bg-[#081C14]/70 backdrop-blur-xl border border-black/[0.06] dark:border-[#1F5A43]/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-leaf-950 dark:text-[#FAF9F5]">
                {matchedDishes.length} {t("matchingDishes")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Ready to Cook Only toggle */}
              <button
                onClick={() => setFilterReadyOnly((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterReadyOnly
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-black/[0.04] dark:bg-white/[0.06] text-gray-700 dark:text-gray-300 hover:bg-black/[0.08]"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isTe ? "వెంటనే చేసేవి మాత్రమే" : "100% Ready Only"}</span>
              </button>

              {/* Regional Filter */}
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10 text-leaf-950 dark:text-[#FAF9F5] focus:outline-none focus:ring-1 focus:ring-[#F2B31B]"
              >
                <option value="all">{isTe ? "అన్ని ప్రాంతాలు" : "All Regions"}</option>
                <option value="coastal-andhra">
                  {isTe ? "కోస్తా ఆంధ్ర" : "Coastal Andhra"}
                </option>
                <option value="rayalaseema">
                  {isTe ? "రాయలసీమ" : "Rayalaseema"}
                </option>
                <option value="uttarandhra">
                  {isTe ? "ఉత్తరాంధ్ర" : "Uttarandhra"}
                </option>
              </select>
            </div>
          </div>

          {/* Matches List */}
          {matchedDishes.length === 0 ? (
            <div className="bg-white/60 dark:bg-[#081C14]/60 backdrop-blur-md border border-black/[0.06] dark:border-[#1F5A43]/30 rounded-3xl p-10 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-leaf-950 dark:text-[#FAF9F5]">
                {t("noMatchTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {t("noMatchDesc")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {matchedDishes.map((dish) => {
                return (
                  <div
                    key={dish.slug}
                    className="group bg-white/80 dark:bg-[#081C14]/85 backdrop-blur-xl border border-black/[0.08] dark:border-[#1F5A43]/50 hover:border-[#F2B31B]/60 rounded-3xl p-4 sm:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      {/* Image Thumbnail */}
                      <div className="relative w-full sm:w-28 h-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-black/20 shadow-md">
                        <Image
                          src={optimizeCloudinaryUrl(dish.image, 320)}
                          alt={dish.nameEn}
                          fill
                          sizes="(max-width: 640px) 100vw, 112px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Match badge on image for mobile */}
                        <div className="absolute top-2 left-2 sm:hidden">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md ${
                              dish.isReadyToCook
                                ? "bg-emerald-600"
                                : "bg-turmeric-700"
                            }`}
                          >
                            {dish.isReadyToCook
                              ? t("readyToCook")
                              : `${dish.matchScore}% Match`}
                          </span>
                        </div>
                      </div>

                      {/* Dish Details */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-turmeric-500/10 text-turmeric-700 dark:text-[#F2B31B] border border-turmeric-500/20">
                              {dish.region.replace("-", " ")}
                            </span>
                            <span className="text-[10px] font-medium text-gray-500 capitalize">
                              {dish.category}
                            </span>
                          </div>

                          {/* Desktop Match Score Badge */}
                          <div className="hidden sm:block">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-black tracking-wide ${
                                dish.isReadyToCook
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                  : "bg-turmeric-500/15 text-turmeric-700 dark:text-[#F2B31B] border border-turmeric-500/30"
                              }`}
                            >
                              {dish.isReadyToCook
                                ? `✨ ${t("readyToCook")}`
                                : `${dish.matchScore}% Match`}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/dishes/${dish.slug}`}
                          className="block hover:text-turmeric-600 dark:hover:text-[#F2B31B] transition-colors"
                        >
                          <h3 className="font-extrabold text-base sm:text-lg text-leaf-950 dark:text-[#FAF9F5] leading-tight truncate">
                            {isTe ? dish.nameTe : dish.nameEn}
                          </h3>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate font-body">
                            {isTe ? dish.nameEn : dish.nameEnMeaning}
                          </div>
                        </Link>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>{dish.prepTimeMinutes + dish.cookTimeMinutes} mins</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                            <span>Level {dish.heatLevel}/5</span>
                          </div>
                          <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {dish.matchedCount}/{dish.totalCount} {isTe ? "పదార్థాలు ఉన్నాయి" : "ingredients"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Matched & Missing Chips Section */}
                    <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] space-y-2">
                      {/* Have */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                          {isTe ? "ఉన్నవి:" : "In Kitchen:"}
                        </span>
                        {dish.matchedIngredients.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-medium border border-emerald-500/20"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Missing */}
                      {dish.missingIngredients.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                            <Plus className="w-3 h-3" />
                            {isTe ? "కావాల్సినవి:" : "Still Need:"}
                          </span>
                          {dish.missingIngredients.map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/dishes/${dish.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-turmeric-700 dark:text-[#F2B31B] hover:underline"
                      >
                        <span>{isTe ? "రెసిపీ విధానం చూడండి" : "View Recipe & Method"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/ruchi?prompt=${encodeURIComponent(
                          `Can I make ${dish.nameEn} with the ingredients I have, and what can I substitute for the missing ingredients (${dish.missingIngredients.slice(0, 3).join(", ")})?`
                        )}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-leaf-800 dark:hover:text-white"
                      >
                        <RuchiOrb size="xs" state="idle" />
                        <span>{isTe ? "సహాయం అడగండి" : "Ask Ruchi"}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
