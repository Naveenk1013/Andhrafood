"use client";

import React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LangToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "te" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all",
        "bg-black/[0.03] hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-leaf-950 dark:text-[#FAF9F5] border-black/[0.06] dark:border-[#1F5A43]/60 hover:border-[#F2B31B]/50 dark:hover:border-[#F2B31B] backdrop-blur-md shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-[#F2B31B] min-h-[38px] active:scale-95",
        className
      )}
      aria-label={`Switch language to ${locale === "en" ? "Telugu (తెలుగు)" : "English"}`}
    >
      <Globe className="w-3.5 h-3.5 text-turmeric-700 dark:text-turmeric-400" />
      <span>{locale === "en" ? "తెలుగు" : "EN"}</span>
    </button>
  );
}
