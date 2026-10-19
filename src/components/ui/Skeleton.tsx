"use client";

import React from "react";
import { Sparkles, UtensilsCrossed, Flame, Clock, Users, MapPin } from "lucide-react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  shimmer?: boolean;
  variant?: "default" | "warm" | "amber" | "emerald" | "glass";
  breathe?: boolean;
  delay?: number;
}

const VARIANT_MAP = {
  default:
    "bg-leaf-950/[0.04] dark:bg-white/[0.05] border-black/[0.04] dark:border-leaf-700/30",
  warm:
    "bg-amber-950/[0.04] dark:bg-[#0E271D] border-amber-500/15 dark:border-[#2A7356]/40",
  amber:
    "bg-turmeric-500/[0.07] dark:bg-turmeric-950/40 border-turmeric-500/25",
  emerald:
    "bg-leaf-900/[0.06] dark:bg-leaf-900/60 border-leaf-700/35",
  glass:
    "bg-white/60 dark:bg-[#081C14]/75 backdrop-blur-md border-white/80 dark:border-[#1F5A43]/50 shadow-sm",
};

/**
 * Base atomic Skeleton block with living, hardware-accelerated diagonal gold-ivory shimmer wave.
 * Includes subtle harmonic breathing pulse and optional phase delay.
 */
export function Skeleton({
  className = "",
  shimmer = true,
  variant = "default",
  breathe = false,
  delay = 0,
  style,
  ...props
}: SkeletonProps) {
  const variantClasses = VARIANT_MAP[variant] || VARIANT_MAP.default;

  return (
    <div
      className={`relative overflow-hidden rounded-md border ${variantClasses} ${
        breathe ? "animate-skeleton-breathe" : ""
      } ${
        shimmer
          ? "before:absolute before:inset-0 before:w-[200%] before:-translate-x-full before:animate-skeleton-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/70 dark:before:via-[#F2B31B]/15 before:to-transparent will-change-transform"
          : ""
      } ${className}`}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
        ...style,
      }}
      {...props}
    />
  );
}

/**
 * Multi-line paragraph skeleton with organic line length staggering and sequential shimmer wave
 */
export function SkeletonText({
  lines = 3,
  className = "",
  lineHeight = "h-3.5",
  lastLineWidth = "w-3/5",
  staggerDelay = 90,
}: {
  lines?: number;
  className?: string;
  lineHeight?: string;
  lastLineWidth?: string;
  staggerDelay?: number;
}) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          delay={i * staggerDelay}
          className={`${lineHeight} rounded-full ${
            i === lines - 1
              ? lastLineWidth
              : i % 2 === 1
              ? "w-11/12"
              : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Pill badge / chip skeleton with warm amber border accent
 */
export function SkeletonBadge({
  className = "",
  variant = "warm",
}: {
  className?: string;
  variant?: "default" | "warm" | "amber" | "emerald";
}) {
  return (
    <Skeleton
      variant={variant}
      className={`h-6 w-20 rounded-full ${className}`}
    />
  );
}

/**
 * Guntur Heat Meter skeleton — 5 sequential dancing embers representing heat levels 1-5
 */
export function SkeletonHeatMeter({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`} title="Calibrating Heat Scale...">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-turmeric-500/30 dark:bg-turmeric-400/40 border border-turmeric-500/40 animate-ember-pulse"
            style={{ animationDelay: `${i * 180}ms` }}
          />
        ))}
      </div>
      <Skeleton className="h-3 w-10 rounded-full ml-1" />
    </div>
  );
}

/**
 * Living Culinary Beacon — Displays atmospheric preparation message and breathing amber aura
 */
export function SkeletonCulinaryBeacon({
  locale = "en",
  className = "",
}: {
  locale?: string;
  className?: string;
}) {
  const isTe = locale === "te";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-leaf-950/[0.04] via-turmeric-500/[0.06] to-leaf-950/[0.04] dark:from-[#081C14]/90 dark:via-[#103226] dark:to-[#081C14]/90 border border-turmeric-500/30 dark:border-[#2A7356]/60 shadow-sm flex items-center justify-between gap-4 animate-skeleton-breathe ${className}`}
    >
      {/* Ambient background glow ring */}
      <div className="absolute top-1/2 left-8 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-turmeric-500/10 blur-xl pointer-events-none" />

      <div className="flex items-center gap-3.5 relative z-10">
        {/* Animated simmering pot / golden orb beacon */}
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F5A43] to-[#103226] border border-[#F2B31B]/50 flex items-center justify-center text-[#F2B31B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_16px_rgba(242,179,27,0.3)] flex-shrink-0">
          <UtensilsCrossed className="w-5 h-5 text-[#F7C545] animate-pulse" />
          <div className="absolute -inset-1 rounded-xl border border-[#F2B31B]/30 animate-ring-radiate pointer-events-none" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-turmeric-500 animate-ping flex-shrink-0" />
            <h4 className="font-displayTe text-sm sm:text-base font-bold text-leaf-950 dark:text-[#FAF9F5] leading-tight">
              {isTe
                ? "ఆంధ్రప్రదేశ్ 26 జిల్లాల సాంప్రదాయ రుచులు సిద్ధమవుతున్నాయి..."
                : "Warming the hearth across 26 Andhra districts..."}
            </h4>
          </div>
          <p className="text-[11px] sm:text-xs text-ink-600 dark:text-[#E8E4D3]/75 font-medium">
            {isTe
              ? "రాతిరోటి ఘాటు, మట్టికుండ పులుసులు & ప్రామాణిక నిష్పత్తులను సమన్వయం చేస్తోంది"
              : "Calibrating stone-pounded karam, clay-pot pulusus & authentic heritage ratios"}
          </p>
        </div>
      </div>

      {/* Micro-Progress Wave Bar */}
      <div className="hidden md:flex items-center gap-2.5 flex-shrink-0 pr-2">
        <div className="w-28 sm:w-36 bg-black/[0.06] dark:bg-leaf-950 rounded-full h-1.5 overflow-hidden border border-leaf-700/30">
          <div className="bg-gradient-to-r from-turmeric-500 via-[#F7C545] to-[#5EB08D] h-full w-full before:absolute before:inset-0 before:animate-skeleton-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent" />
        </div>
        <span className="text-[10px] font-mono font-bold text-turmeric-700 dark:text-turmeric-400">
          HEATING_UP
        </span>
      </div>
    </div>
  );
}

/**
 * Replicates DishCard.tsx dimensions and layout with living culinary details:
 * watermarked vessel silhouette, sequential heat ember dots, dietary beacon, and tag chips.
 */
export function SkeletonDishCard({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`group relative flex flex-col bg-white/75 dark:bg-[#0C241B]/80 border border-leaf-200/90 dark:border-leaf-800 rounded-card overflow-hidden shadow-sm p-0 animate-skeleton-breathe ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 4:3 Visual Image Window with Vessel Watermark */}
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-leaf-950 via-leaf-900 to-[#102B20]">
        <Skeleton
          variant="emerald"
          className="w-full h-full rounded-none"
          delay={delay}
        />

        {/* Ambient Culinary Watermark (Plate / Leaf silhouette) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <UtensilsCrossed className="w-16 h-16 text-turmeric-400 animate-pulse" />
        </div>

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <Skeleton
            variant="amber"
            className="h-5 w-24 rounded-full bg-leaf-950/80 backdrop-blur-md"
            delay={delay + 50}
          />
          <div className="flex items-center gap-1.5">
            <Skeleton
              variant="warm"
              className="h-5 w-20 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md"
              delay={delay + 100}
            />
            {/* Dietary beacon pulsing dot */}
            <span className="w-3.5 h-3.5 rounded-full border border-white/60 bg-leaf-500/70 shadow-sm animate-pulse" />
          </div>
        </div>

        {/* Bottom Banner Title Inside Image */}
        <div className="absolute bottom-3 left-3 right-3 space-y-1.5 z-10">
          <Skeleton
            className="h-6 w-3/5 rounded-md bg-white/30 dark:bg-white/20 backdrop-blur-sm"
            delay={delay + 120}
          />
          <Skeleton
            className="h-3.5 w-4/5 rounded-md bg-white/20 dark:bg-white/10 backdrop-blur-sm"
            delay={delay + 150}
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-leaf-900/60">
        {/* Ingredient Chips */}
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-4 w-16 rounded-full" delay={delay + 80} />
          <Skeleton className="h-4 w-20 rounded-full" delay={delay + 140} />
          <Skeleton className="h-4 w-14 rounded-full" delay={delay + 200} />
        </div>

        {/* Bottom Metadata & Heat Meter */}
        <div className="pt-3 flex items-center justify-between border-t border-leaf-100 dark:border-leaf-800">
          <SkeletonHeatMeter />

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-turmeric-600/50 dark:text-turmeric-400/50" />
              <Skeleton className="h-3 w-10 rounded-full" delay={delay + 160} />
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-turmeric-600/50 dark:text-turmeric-400/50" />
              <Skeleton className="h-3 w-6 rounded-full" delay={delay + 180} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Replicates RegionalGlassFolders.tsx 340×272 folder tab silhouette with realistic depth and action jewel
 */
export function SkeletonFolderCard({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`flex flex-col items-center space-y-3 animate-skeleton-breathe ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Folder Object Shell */}
      <div className="relative w-[340px] h-[326px] max-w-full">
        {/* Back panel tab */}
        <div className="absolute inset-x-0 top-[54px] h-[272px] rounded-b-[28px] rounded-tl-[28px] overflow-hidden bg-gradient-to-br from-leaf-950/[0.08] to-turmeric-500/[0.05] dark:from-[#0E271D] dark:to-[#081C14] border border-leaf-300/40 dark:border-[#1F5A43]/50 shadow-sm">
          <Skeleton
            variant="warm"
            className="w-full h-full rounded-b-[28px]"
            delay={delay}
          />
        </div>

        {/* Front frosted glass panel */}
        <div className="absolute inset-x-0 bottom-0 h-[198px] rounded-b-[28px] rounded-tr-[28px] bg-white/70 dark:bg-[#081C14]/85 backdrop-blur-xl border border-white/80 dark:border-[#1F5A43]/60 p-6 flex flex-col justify-end shadow-md">
          {/* Specular Edge Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B31B]/40 to-transparent pointer-events-none" />

          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400 animate-pulse" />
              <Skeleton
                variant="amber"
                className="h-4 w-24 rounded-full"
                delay={delay + 50}
              />
            </div>
            <Skeleton
              className="h-7 w-4/5 rounded-md"
              delay={delay + 100}
            />
            <Skeleton
              className="h-3.5 w-1/2 rounded-full opacity-70"
              delay={delay + 150}
            />
          </div>

          {/* Action jewel circle button */}
          <div className="absolute right-5 bottom-5">
            <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-[#1F5A43] to-[#103226] border border-[#F2B31B]/40 flex items-center justify-center text-[#F2B31B] shadow-md">
              <Sparkles className="w-4 h-4 text-[#F7C545] animate-spin [animation-duration:8s]" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle text below folder */}
      <div className="w-[300px] text-center space-y-1.5 pt-2">
        <Skeleton className="h-3.5 w-28 mx-auto rounded-full" delay={delay + 80} />
        <Skeleton className="h-2.5 w-5/6 mx-auto rounded-full opacity-70" delay={delay + 140} />
      </div>
    </div>
  );
}

/**
 * Replicates TastePhilosophyBento.tsx 4-cell layout with live metrics pulse
 */
export function SkeletonBentoGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {/* 1. Large Guntur Karam Tile (2x2) */}
      <div className="sm:col-span-2 sm:row-span-2 min-h-[220px] rounded-[18px] p-5 bg-white/70 dark:bg-[#0C241B]/75 border border-white/80 dark:border-[#1F5A43]/50 flex flex-col justify-between shadow-sm animate-skeleton-breathe">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-guntur-600 fill-guntur-600 animate-pulse" />
              <Skeleton variant="amber" className="h-5 w-28 rounded-full" />
            </div>
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <Skeleton className="h-8 w-3/4 rounded-lg" delay={100} />
          <SkeletonText lines={3} staggerDelay={100} />
        </div>
        <div className="pt-4 flex gap-2">
          <Skeleton variant="warm" className="h-8 w-28 rounded-lg" delay={200} />
          <Skeleton variant="warm" className="h-8 w-28 rounded-lg" delay={260} />
        </div>
      </div>

      {/* 2 & 3. Standard Tiles */}
      <div className="min-h-[170px] rounded-[18px] p-5 bg-white/70 dark:bg-[#0C241B]/75 border border-white/80 dark:border-[#1F5A43]/50 flex flex-col justify-between shadow-sm animate-skeleton-breathe" style={{ animationDelay: "150ms" }}>
        <div className="space-y-2">
          <Skeleton variant="emerald" className="h-4 w-20 rounded-full" />
          <Skeleton className="h-5 w-4/5 rounded-md" delay={80} />
        </div>
        <SkeletonText lines={2} staggerDelay={80} />
      </div>

      <div className="min-h-[170px] rounded-[18px] p-5 bg-white/70 dark:bg-[#0C241B]/75 border border-white/80 dark:border-[#1F5A43]/50 flex flex-col justify-between shadow-sm animate-skeleton-breathe" style={{ animationDelay: "300ms" }}>
        <div className="space-y-2">
          <Skeleton variant="warm" className="h-4 w-24 rounded-full" />
          <Skeleton className="h-5 w-4/5 rounded-md" delay={100} />
        </div>
        <SkeletonText lines={2} staggerDelay={80} />
      </div>

      {/* 4 & 5. Wide Horizontal Tiles */}
      <div className="sm:col-span-2 min-h-[160px] rounded-[18px] p-5 bg-white/70 dark:bg-[#0C241B]/75 border border-white/80 dark:border-[#1F5A43]/50 flex flex-col justify-between shadow-sm animate-skeleton-breathe" style={{ animationDelay: "200ms" }}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton variant="amber" className="h-4 w-28 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/5 rounded-md" delay={100} />
        </div>
        <SkeletonText lines={2} staggerDelay={80} />
      </div>

      <div className="sm:col-span-2 min-h-[160px] rounded-[18px] p-5 bg-white/70 dark:bg-[#0C241B]/75 border border-white/80 dark:border-[#1F5A43]/50 flex flex-col justify-between shadow-sm animate-skeleton-breathe" style={{ animationDelay: "350ms" }}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton variant="emerald" className="h-4 w-28 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/5 rounded-md" delay={100} />
        </div>
        <SkeletonText lines={2} staggerDelay={80} />
      </div>
    </div>
  );
}

/**
 * Replicates the home page expanding hero container skeleton with concentric golden glow rings
 */
export function SkeletonHero({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full rounded-hero overflow-hidden bg-gradient-to-b from-white/80 via-white/60 to-white/80 dark:from-[#081C14]/90 dark:via-[#0C241B]/80 dark:to-[#081C14]/90 border border-white/80 dark:border-[#1F5A43]/60 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center text-center space-y-6 min-h-[460px] shadow-sm animate-skeleton-breathe ${className}`}
    >
      {/* Concentric Golden Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-turmeric-500/15 animate-ring-radiate pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-turmeric-500/10 animate-ring-radiate [animation-delay:1.4s] pointer-events-none" />

      {/* Pill Badge */}
      <div className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-turmeric-600 dark:text-turmeric-400 animate-pulse" />
        <Skeleton variant="amber" className="h-7 w-48 rounded-full" />
      </div>

      {/* Main Hero Headings */}
      <div className="relative z-10 space-y-3 max-w-2xl w-full flex flex-col items-center">
        <Skeleton className="h-10 sm:h-14 w-11/12 rounded-xl" delay={100} />
        <Skeleton variant="amber" className="h-7 sm:h-9 w-4/5 rounded-lg opacity-85" delay={180} />
        <Skeleton className="h-4 w-2/3 rounded-full opacity-65 mt-2" delay={260} />
      </div>

      {/* Search Capsule */}
      <div className="relative z-10 w-full max-w-lg pt-2">
        <Skeleton
          variant="glass"
          className="h-14 w-full rounded-2xl border-turmeric-500/30"
          delay={200}
        />
      </div>

      {/* Action Chips */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 pt-2">
        <Skeleton variant="warm" className="h-8 w-24 rounded-full" delay={150} />
        <Skeleton variant="amber" className="h-8 w-28 rounded-full" delay={220} />
        <Skeleton variant="emerald" className="h-8 w-24 rounded-full" delay={290} />
      </div>
    </div>
  );
}

export default Skeleton;
