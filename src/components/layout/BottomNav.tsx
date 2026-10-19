"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Bookmark, Compass, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { RuchiOrb } from "@/components/ui/RuchiOrb";

export function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navItems = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/browse", label: t("browse"), icon: Compass },
    { href: "/ruchi", label: t("ruchi"), isRuchi: true, highlight: true },
    { href: "/saved", label: t("saved"), icon: Bookmark },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/85 dark:bg-[#081C14]/90 backdrop-blur-2xl backdrop-saturate-150 border-t border-black/[0.06] dark:border-[#1F5A43]/50 text-ink-700 dark:text-rice-200 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)]"
      aria-label="Mobile navigation"
    >
      {/* Specular Liquid Top Edge */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B31B]/40 to-transparent pointer-events-none" />
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full min-w-[44px] min-h-[44px] gap-1 transition-colors",
                isActive
                  ? "text-turmeric-700 dark:text-turmeric-400 font-bold"
                  : "text-ink-600 dark:text-rice-200/70 hover:text-leaf-950 dark:hover:text-[#FAF9F5]",
                item.highlight && !isActive && "text-turmeric-700 dark:text-turmeric-400"
              )}
            >
              {item.isRuchi ? (
                <RuchiOrb size="xs" state={isActive ? "thinking" : "idle"} className="my-0.5" />
              ) : Icon ? (
                <Icon
                  className={cn(
                    "w-5 h-5",
                    isActive && "stroke-[2.5px]",
                    item.highlight && "animate-pulse"
                  )}
                />
              ) : null}
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
