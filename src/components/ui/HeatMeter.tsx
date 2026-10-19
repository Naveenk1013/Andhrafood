"use client";

import React from "react";
import { HeatLevel } from "@/schemas";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface HeatMeterProps {
  level: HeatLevel;
  className?: string;
  showLabel?: boolean;
}

export function HeatMeter({ level, className, showLabel = true }: HeatMeterProps) {
  const t = useTranslations("heat");

  return (
    <div
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label={`Spice heat level ${level} of 5: ${t(String(level) as any)}`}
      title={`Spice level ${level}/5: ${t(String(level) as any)}`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => {
          const isActive = i <= level;
          return (
            <Flame
              key={i}
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                isActive
                  ? "text-guntur-600 fill-guntur-600"
                  : "text-ink-600/20 fill-none"
              )}
            />
          );
        })}
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-ink-600">
          {t(String(level) as any)}
        </span>
      )}
    </div>
  );
}
