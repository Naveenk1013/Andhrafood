import React from "react";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export default function LegalLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fade-in pb-16">
      {/* Back button skeleton */}
      <Skeleton className="h-4 w-32 rounded-full" />

      {/* Hero Header Card */}
      <div className="relative rounded-hero overflow-hidden bg-white/70 dark:bg-[#081C14]/85 backdrop-blur-xl border border-white/80 dark:border-[#1F5A43] p-6 sm:p-12 shadow-sm space-y-4">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-10 sm:h-12 w-3/4 rounded-lg" />
        <SkeletonText lines={2} />
        <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.05]">
          <Skeleton className="h-3 w-44 rounded-full opacity-60" />
        </div>
      </div>

      {/* 3 Summary Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/60 dark:bg-leaf-950/70 border border-white/80 dark:border-leaf-800 shadow-sm space-y-3"
          >
            <Skeleton className="w-6 h-6 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
            <SkeletonText lines={2} lineHeight="h-3" />
          </div>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-8 pt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-card p-6 bg-white/60 dark:bg-[#081C14]/75 border border-white/80 dark:border-[#1F5A43]/50 space-y-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-5 w-48 rounded-md" />
            </div>
            <SkeletonText lines={3} />
          </div>
        ))}
      </div>
    </div>
  );
}
