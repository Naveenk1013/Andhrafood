"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalLanguageModal } from "./GlobalLanguageModal";

export function LangToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayLabel, setDisplayLabel] = useState<string>("EN");

  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
      if (match && match[1]) {
        setDisplayLabel(match[1].toUpperCase());
      } else {
        setDisplayLabel(locale === "te" ? "తెలుగు" : "EN");
      }
    } catch {
      setDisplayLabel(locale === "te" ? "తెలుగు" : "EN");
    }
  }, [locale, isModalOpen]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all",
          "bg-black/[0.03] hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-leaf-950 dark:text-[#FAF9F5] border-black/[0.06] dark:border-[#1F5A43]/60 hover:border-[#F2B31B]/50 dark:hover:border-[#F2B31B] backdrop-blur-md shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-[#F2B31B] min-h-[38px] active:scale-95 group",
          className
        )}
        aria-label="Open language selection modal"
        title="Change language / భాష మార్చండి"
      >
        <Globe className="w-3.5 h-3.5 text-turmeric-700 dark:text-turmeric-400 group-hover:rotate-45 transition-transform duration-300" />
        <span className="font-semibold">{displayLabel}</span>
        <ChevronDown className="w-3 h-3 text-leaf-600 dark:text-rice-200/60 group-hover:translate-y-0.5 transition-transform" />
      </button>

      <GlobalLanguageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
