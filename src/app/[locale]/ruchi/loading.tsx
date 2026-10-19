import React from "react";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export default function RuchiLoading() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between max-w-4xl mx-auto w-full px-4 pt-6 pb-4 animate-fade-in">
      {/* Central Welcome Intro Skeleton */}
      <div className="text-center py-6 sm:py-10 space-y-4 max-w-lg mx-auto w-full">
        {/* Pulsing Orb Center Placeholder */}
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-turmeric-500/10 border border-turmeric-500/25">
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>

        {/* Titles */}
        <div className="space-y-2 flex flex-col items-center">
          <Skeleton className="h-8 sm:h-9 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-5/6 rounded-full opacity-70" />
          <Skeleton className="h-4 w-2/3 rounded-full opacity-60" />
        </div>

        {/* 4 Curated Topic Cards (2x2 grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-card border border-white/80 dark:border-leaf-800 bg-white/70 dark:bg-leaf-950/80 backdrop-blur-xl space-y-2.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>
              <Skeleton className="h-5 w-4/5 rounded-md" />
              <SkeletonText lines={2} lineHeight="h-3" />
            </div>
          ))}
        </div>
      </div>

      {/* Docked AI Prompt Box Skeleton at Bottom */}
      <div className="pt-4 sticky bottom-4 z-20 w-full">
        <div className="rounded-3xl shadow-sm bg-white/80 dark:bg-[#081C14]/85 backdrop-blur-xl border border-white/90 dark:border-[#1F5A43] p-3 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-3/5 rounded-md opacity-75" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] dark:border-white/[0.05] px-1">
            <div className="flex items-center gap-2">
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="w-9 h-9 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-3 w-64 mx-auto rounded-full opacity-60 mt-2" />
      </div>
    </div>
  );
}
