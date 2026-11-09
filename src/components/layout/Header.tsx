"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { LangToggle } from "@/components/ui/LangToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { UtensilsCrossed, Compass, CookingPot, Bookmark, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === "/") return pathname === "/";
    return pathname === route || pathname?.startsWith(route + "/");
  };

  const isRuchiActive = isActive("/ruchi");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-2xl backdrop-saturate-150 border-b border-black/[0.06] dark:border-[#1F5A43]/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.35)] transition-all relative">
      {/* Specular Liquid Edge Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B31B]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between relative z-10">
        {/* Brand Insignia */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-[#F2B31B] rounded-xl p-1 group transition-all flex-shrink-0"
        >
          {/* Liquid Glass Jewel Badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1F5A43] via-[#154231] to-[#0D281E] border border-turmeric-500/35 flex items-center justify-center text-turmeric-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.25)] group-hover:scale-105 group-hover:border-turmeric-500/70 transition-all flex-shrink-0">
            <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-turmeric-400" />
          </div>
          <div>
            <span className="font-display text-[15px] sm:text-base font-bold leading-tight block text-leaf-950 dark:text-[#FAF9F5] group-hover:text-turmeric-600 dark:group-hover:text-turmeric-400 transition-colors">
              Andhra Ruchulu
            </span>
            <span className="font-displayTe text-[10px] sm:text-[11px] font-semibold tracking-wide text-turmeric-700 dark:text-turmeric-400/90 block leading-none mt-0.5">
              ఆంధ్ర రుచులు
            </span>
          </div>
        </Link>

        {/* Right Navigation & Control Items */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 1. All Dishes */}
          <Link
            href="/browse"
            aria-label="All Dishes"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-md active:scale-95",
              isActive("/browse")
                ? "bg-leaf-100/90 dark:bg-[#154231] border border-turmeric-500/60 text-leaf-950 dark:text-[#FAF9F5] shadow-xs"
                : "bg-black/[0.03] hover:bg-black/[0.06] dark:bg-white/[0.05] dark:hover:bg-white/[0.09] text-leaf-900 dark:text-[#E8E4D3] border border-black/[0.06] dark:border-[#1F5A43]/50 hover:border-turmeric-500/40"
            )}
          >
            <Compass className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400 flex-shrink-0" />
            <span className="hidden md:inline">All Dishes</span>
          </Link>

          {/* 2. Pantry */}
          <Link
            href="/pantry"
            aria-label="Pantry Matcher"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-md active:scale-95",
              isActive("/pantry")
                ? "bg-leaf-100/90 dark:bg-[#154231] border border-turmeric-500/60 text-leaf-950 dark:text-[#FAF9F5] shadow-xs"
                : "bg-black/[0.03] hover:bg-black/[0.06] dark:bg-white/[0.05] dark:hover:bg-white/[0.09] text-leaf-900 dark:text-[#E8E4D3] border border-black/[0.06] dark:border-[#1F5A43]/50 hover:border-turmeric-500/40"
            )}
          >
            <CookingPot className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400 flex-shrink-0" />
            <span className="hidden md:inline">Pantry</span>
          </Link>

          {/* 3. Sleek, Executive Ruchi AI Pill */}
          <Link
            href="/ruchi"
            aria-label="Ruchi AI Culinary Assistant"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all backdrop-blur-md active:scale-95 group relative overflow-hidden",
              isRuchiActive
                ? "bg-turmeric-500/20 text-turmeric-800 dark:text-turmeric-300 border border-turmeric-400 shadow-[0_0_14px_rgba(242,179,27,0.22)]"
                : "bg-black/[0.03] hover:bg-turmeric-500/10 dark:bg-white/[0.05] dark:hover:bg-turmeric-500/15 text-leaf-950 dark:text-[#FAF9F5] border border-turmeric-500/35 hover:border-turmeric-400/80 shadow-[0_0_10px_rgba(242,179,27,0.06)]"
            )}
          >
            {/* Subtle animated ambient gold shimmer on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-turmeric-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

            {/* Sleek Golden Sparkle with micro-hover rotation */}
            <Sparkles className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />

            <span className="font-semibold tracking-wide">Ruchi AI</span>
          </Link>

          {/* 4. Saved */}
          <Link
            href="/saved"
            aria-label="Saved Recipes"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-md active:scale-95",
              isActive("/saved")
                ? "bg-leaf-100/90 dark:bg-[#154231] border border-turmeric-500/60 text-leaf-950 dark:text-[#FAF9F5] shadow-xs"
                : "bg-black/[0.03] hover:bg-black/[0.06] dark:bg-white/[0.05] dark:hover:bg-white/[0.09] text-leaf-900 dark:text-[#E8E4D3] border border-black/[0.06] dark:border-[#1F5A43]/50 hover:border-turmeric-500/40"
            )}
          >
            <Bookmark className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400 flex-shrink-0" />
            <span className="hidden md:inline">Saved</span>
          </Link>

          {/* Subtle Vertical Divider */}
          <div className="hidden sm:block w-[1px] h-4 bg-leaf-200/80 dark:bg-leaf-800/80 mx-1" />

          {/* Controls: Theme & Language */}
          <ThemeToggle />
          <LangToggle />
        </div>
      </div>
    </header>
  );
}