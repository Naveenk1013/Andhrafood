import React from "react";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export default function DishDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12 rounded-full" />
          <span className="text-black/20 dark:text-white/20">/</span>
          <Skeleton className="h-4 w-16 rounded-full" />
          <span className="text-black/20 dark:text-white/20">/</span>
          <Skeleton className="h-4 w-28 rounded-full" />
        </div>
        <Skeleton className="h-4 w-32 rounded-full" />
      </div>

      {/* Hero Header Card with Image & Metadata */}
      <div className="relative rounded-hero overflow-hidden bg-white/70 dark:bg-[#081C14]/85 border border-white/80 dark:border-[#1F5A43] shadow-lg">
        {/* Dish Hero Image Banner */}
        <div className="relative h-72 sm:h-96 w-full">
          <Skeleton className="w-full h-full rounded-none" />
        </div>

        {/* Floating Metadata & Titles */}
        <div className="relative z-10 p-6 sm:p-10 -mt-20 space-y-5">
          {/* Badge Chips Row */}
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-36 rounded-full" />
          </div>

          {/* Bilingual Titles */}
          <div className="space-y-2">
            <Skeleton className="h-10 sm:h-12 w-3/5 rounded-lg" />
            <Skeleton className="h-6 sm:h-8 w-2/5 rounded-md opacity-80" />
            <Skeleton className="h-4 w-1/3 rounded-full opacity-60" />
          </div>

          {/* Key Metrics Bar (Time, Heat, Servings, Districts) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-2.5 w-14 rounded-full opacity-60" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Authority & Provenance Definition Card */}
      <div className="rounded-2xl p-5 bg-white/60 dark:bg-[#0C241B]/70 border border-white/80 dark:border-[#1F5A43]/50 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="h-3.5 w-64 rounded-full" />
        </div>
        <SkeletonText lines={3} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-black/[0.05] dark:border-white/[0.05]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-2.5 w-20 rounded-full opacity-60" />
              <Skeleton className="h-3.5 w-28 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Recipe Dossier & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Cultural Overview, Ingredients, Method */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cultural Overview Card */}
          <div className="rounded-card p-6 bg-white/70 dark:bg-[#081C14]/80 border border-white/80 dark:border-[#1F5A43]/60 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-5 w-48 rounded-md" />
            </div>
            <SkeletonText lines={4} />
          </div>

          {/* Ingredients Card */}
          <div className="rounded-card p-6 bg-white/70 dark:bg-[#081C14]/80 border border-white/80 dark:border-[#1F5A43]/60 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-5 w-40 rounded-md" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.04]"
                >
                  <Skeleton className="h-4 w-28 rounded-full" />
                  <Skeleton className="h-3.5 w-14 rounded-full opacity-70" />
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Method */}
          <div className="rounded-card p-6 bg-white/70 dark:bg-[#081C14]/80 border border-white/80 dark:border-[#1F5A43]/60 space-y-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-5 w-48 rounded-md" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03]">
                  <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <SkeletonText lines={2} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Cookware & Regional Heritage */}
        <div className="space-y-6">
          <div className="rounded-card p-5 bg-white/70 dark:bg-[#081C14]/80 border border-white/80 dark:border-[#1F5A43]/60 space-y-4 shadow-sm">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-36 w-full rounded-xl" />
            <SkeletonText lines={2} />
          </div>

          <div className="rounded-card p-5 bg-white/70 dark:bg-[#081C14]/80 border border-white/80 dark:border-[#1F5A43]/60 space-y-3 shadow-sm">
            <Skeleton className="h-4 w-28 rounded-full" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-3.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
