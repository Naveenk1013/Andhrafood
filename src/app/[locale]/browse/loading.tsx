import React from "react";
import { Skeleton, SkeletonDishCard } from "@/components/ui/Skeleton";

export default function BrowseLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in pb-16">
      {/* Header Banner Skeleton */}
      <div className="relative rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl shadow-sm space-y-4">
        <Skeleton className="h-6 w-52 rounded-full" />
        <Skeleton className="h-9 sm:h-12 w-3/4 max-w-xl rounded-lg" />
        <Skeleton className="h-4 w-4/5 max-w-2xl rounded-full opacity-70" />
      </div>

      {/* Search & Filter Controls Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar placeholder */}
          <div className="w-full md:max-w-md">
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <Skeleton className="h-8 w-24 rounded-full flex-shrink-0" />
            <Skeleton className="h-8 w-32 rounded-full flex-shrink-0" />
            <Skeleton className="h-8 w-28 rounded-full flex-shrink-0" />
            <Skeleton className="h-8 w-28 rounded-full flex-shrink-0" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Skeleton className="h-4 w-16 rounded-full mr-2" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-full flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Grid of Dish Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonDishCard key={i} delay={i * 90} />
        ))}
      </div>
    </div>
  );
}
