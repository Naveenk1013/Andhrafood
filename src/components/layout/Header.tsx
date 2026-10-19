import React from "react";
import { Link } from "@/i18n/routing";
import { LangToggle } from "@/components/ui/LangToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { UtensilsCrossed, Compass, CookingPot, Bookmark } from "lucide-react";
import { RuchiOrb } from "@/components/ui/RuchiOrb";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-[#081C14]/85 backdrop-blur-2xl backdrop-saturate-150 border-b border-black/[0.06] dark:border-[#1F5A43]/50 shadow-[0_4px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all relative">
      {/* Specular Liquid Edge Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B31B]/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-[#F2B31B] rounded-xl p-1 group transition-all flex-shrink-0"
        >
          {/* Liquid Glass Jewel Badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1F5A43] to-[#103226] border border-[#F2B31B]/40 flex items-center justify-center text-[#F2B31B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_12px_rgba(31,90,67,0.2)] group-hover:scale-105 group-hover:border-[#F2B31B]/70 transition-all flex-shrink-0">
            <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-[#F7C545]" />
          </div>
          <div>
            <span className="font-displayTe text-base sm:text-xl font-bold leading-tight block text-leaf-950 dark:text-[#FAF9F5] group-hover:text-leaf-800 dark:group-hover:text-turmeric-400 transition-colors">
              ఆంధ్ర రుచులు
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-turmeric-700 dark:text-[#F2B31B] block leading-none">
              Andhra Ruchulu
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <Link
            href="/browse"
            aria-label="All Dishes"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-leaf-950 dark:text-[#FAF9F5] bg-black/[0.03] hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-[#1F5A43]/60 hover:border-[#F2B31B]/50 backdrop-blur-md transition-all shadow-sm hover:shadow-[0_0_15px_rgba(242,179,27,0.12)] active:scale-95"
          >
            <Compass className="w-4 h-4 text-turmeric-700 dark:text-turmeric-400 flex-shrink-0" />
            <span className="hidden md:inline">All Dishes</span>
          </Link>

          <Link
            href="/pantry"
            aria-label="Pantry Mode"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-leaf-950 dark:text-[#FAF9F5] bg-black/[0.03] hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-[#1F5A43]/60 hover:border-[#F2B31B]/50 backdrop-blur-md transition-all shadow-sm hover:shadow-[0_0_15px_rgba(242,179,27,0.12)] active:scale-95"
          >
            <CookingPot className="w-4 h-4 text-turmeric-700 dark:text-turmeric-400 flex-shrink-0" />
            <span className="hidden md:inline">Pantry</span>
          </Link>

          <Link
            href="/ruchi"
            aria-label="Ruchi AI"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold text-[#081C14] bg-gradient-to-r from-[#F2B31B] via-[#F7C545] to-[#E5A717] hover:brightness-105 border border-white/60 shadow-[0_2px_12px_rgba(242,179,27,0.25),inset_0_1px_2px_rgba(255,255,255,0.7)] backdrop-blur-md transition-all focus:ring-2 focus:ring-[#FAF9F5] active:scale-95 group flex-shrink-0"
          >
            <RuchiOrb size="xs" state="idle" className="group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">Ruchi<span className="hidden sm:inline"> AI</span></span>
          </Link>

          <Link
            href="/saved"
            aria-label="Saved Recipes"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-leaf-950 dark:text-[#FAF9F5] bg-black/[0.03] hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-[#1F5A43]/60 hover:border-[#F2B31B]/50 backdrop-blur-md transition-all shadow-sm active:scale-95"
          >
            <Bookmark className="w-4 h-4 text-turmeric-700 dark:text-turmeric-400 flex-shrink-0" />
            <span className="hidden md:inline">Saved</span>
          </Link>

          <ThemeToggle />

          <LangToggle />
        </div>
      </div>
    </header>
  );
}
