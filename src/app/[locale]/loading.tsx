import React from "react";
import {
  SkeletonHero,
  SkeletonFolderCard,
  SkeletonBentoGrid,
  SkeletonDishCard,
  SkeletonCulinaryBeacon,
  Skeleton,
} from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fade-in">
      {/* Living Culinary Preparation Beacon */}
      <SkeletonCulinaryBeacon />

      {/* 1. Immersive Hero Skeleton */}
      <SkeletonHero />

      {/* 2. Interactive Regional Dossiers (3 Glass Folders) Skeleton */}
      <section className="relative rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
          <div className="space-y-2">
            <Skeleton variant="amber" className="h-4 w-40 rounded-full" />
            <Skeleton className="h-8 w-64 sm:w-80 rounded-lg" />
            <Skeleton className="h-3.5 w-72 rounded-full opacity-70" />
          </div>
          <Skeleton variant="warm" className="h-8 w-48 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center py-4">
          <SkeletonFolderCard delay={0} />
          <SkeletonFolderCard delay={150} />
          <SkeletonFolderCard delay={300} />
        </div>
      </section>

      {/* 3. Taste Philosophy (Magic Bento) Skeleton */}
      <section className="relative rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <Skeleton className="h-3 w-32 mx-auto rounded-full" />
          <Skeleton className="h-8 sm:h-10 w-64 sm:w-96 mx-auto rounded-lg" />
          <Skeleton className="h-3.5 w-80 mx-auto rounded-full opacity-70" />
        </div>
        <SkeletonBentoGrid />
      </section>

      {/* 4. Drift Wall & Curated Feast Gallery Skeleton */}
      <section className="relative rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-36 rounded-full" />
            <Skeleton className="h-8 w-64 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonDishCard key={i} delay={i * 120} />
          ))}
        </div>
      </section>
    </div>
  );
}
