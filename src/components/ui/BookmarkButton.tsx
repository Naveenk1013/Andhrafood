"use client";

import React, { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  slug: string;
  locale?: string;
  className?: string;
}

export function BookmarkButton({ slug, locale = "en", className }: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("andhra_saved_dishes");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.includes(slug)) {
          setIsSaved(true);
        }
      }
    } catch {
      // Ignore
    }
  }, [slug]);

  const toggleSave = () => {
    try {
      const stored = localStorage.getItem("andhra_saved_dishes");
      let list: string[] = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(list)) list = [];

      let nextSaved = false;
      if (list.includes(slug)) {
        list = list.filter((s) => s !== slug);
        nextSaved = false;
      } else {
        list.push(slug);
        nextSaved = true;
      }

      localStorage.setItem("andhra_saved_dishes", JSON.stringify(list));
      setIsSaved(nextSaved);
    } catch {
      // Ignore
    }
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20",
          className
        )}
      />
    );
  }

  const isTe = locale === "te";

  return (
    <button
      type="button"
      onClick={toggleSave}
      aria-label={isSaved ? "Remove from saved recipes" : "Save recipe to favorites"}
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all active:scale-95 shadow-md",
        isSaved
          ? "bg-[#F2B31B] text-[#081C14] border-[#F2B31B] font-bold"
          : "bg-black/50 hover:bg-black/70 text-white border-white/30 hover:border-[#F2B31B]/70",
        className
      )}
    >
      <Bookmark
        className={cn(
          "w-4 h-4 transition-transform",
          isSaved && "fill-[#081C14] scale-110"
        )}
      />
      <span>
        {isSaved
          ? isTe
            ? "సేవ్ చేయబడింది"
            : "Saved"
          : isTe
          ? "సేవ్ చేయండి"
          : "Save Recipe"}
      </span>
    </button>
  );
}
