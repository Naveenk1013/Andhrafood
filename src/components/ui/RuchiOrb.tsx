"use client";

import React from "react";
import Strands, { StrandsProps } from "@/components/ui/Strands";

export interface RuchiOrbProps {
  size?: "xs" | "sm" | "md" | "lg" | "hero";
  state?: "idle" | "thinking" | "listening" | "speaking" | "generating";
  glass?: boolean;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showHalo?: boolean;
  speed?: number;
  energy?: number;
  variant?: "webgl" | "css";
}

const ANDHRA_ORB_COLORS = [
  "#D92D20", // Guntur Crimson
  "#EA580C", // Chilli Amber
  "#F59E0B", // Turmeric Gold
  "#FFFBEB", // Warm Ghee Core
  "#10B981", // Fresh Coriander
  "#1F5A43", // Banana Leaf Green
  "#064E3B", // Deep Forest Green
];

const SIZE_MAP = {
  xs: { width: "38px", height: "38px", px: 38 },
  sm: { width: "48px", height: "48px", px: 48 },
  md: { width: "72px", height: "72px", px: 72 },
  lg: { width: "140px", height: "140px", px: 140 },
  hero: { width: "100%", height: "100%", px: 400 },
};

/**
 * RuchiOrb — The living visual persona of Ruchi AI.
 * Renders the real WebGL2 Strands glass orb component as a micro or macro component.
 */
export function RuchiOrb({
  size = "md",
  state = "idle",
  glass = true,
  interactive = true,
  className = "",
  style = {},
  showHalo = true,
  speed,
  energy,
  variant,
}: RuchiOrbProps) {
  const isGenerating = state === "thinking" || state === "listening" || state === "generating";
  const isSpeaking = state === "speaking";
  const dim = SIZE_MAP[size];

  // Default size="xs" to ultra-snappy CSS variant to avoid WebGL context limits and GPU overhead
  const effectiveVariant = variant || (size === "xs" ? "css" : "webgl");

  if (effectiveVariant === "css") {
    return (
      <div
        className={`relative rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden shadow-md select-none transition-transform duration-300 ${
          isGenerating ? "scale-105" : "hover:scale-105"
        } ${className}`}
        style={{
          width: dim.width,
          height: dim.height,
          background: "radial-gradient(circle at 35% 35%, #FFFBEB 0%, #F59E0B 35%, #D92D20 70%, #1F5A43 100%)",
          boxShadow: isGenerating
            ? "0 0 16px rgba(245, 158, 11, 0.85), 0 0 28px rgba(217, 45, 32, 0.55)"
            : "0 0 10px rgba(245, 158, 11, 0.45)",
          ...style,
        }}
        aria-label="Ruchi AI Persona Orb"
      >
        <div
          className={`absolute inset-0 rounded-full mix-blend-overlay ${
            isGenerating ? "animate-spin" : "animate-pulse"
          }`}
          style={{
            animationDuration: isGenerating ? "1.8s" : "3.6s",
            background: "conic-gradient(from 0deg, #D92D20, #F59E0B, #FFFBEB, #10B981, #D92D20)",
            opacity: 0.9,
          }}
        />
        <div
          className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
          style={{
            boxShadow: "inset 0 1.5px 3px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          className={`rounded-full bg-white shadow-[0_0_8px_#fff] z-10 ${
            size === "xs" ? "w-1 h-1" : "w-1.5 h-1.5"
          }`}
        />
      </div>
    );
  }

  // Calculate default speed and energy based on active persona state
  const computedSpeed =
    speed !== undefined ? speed : isGenerating ? 2.2 : isSpeaking ? 1.5 : 1.1;
  const computedEnergy =
    energy !== undefined ? energy : isGenerating ? 1.0 : isSpeaking ? 0.9 : 0.75;

  // Render the real WebGL2 Strands glass orb component!
  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 select-none rounded-full ${className}`}
      style={{
        width: dim.width,
        height: dim.height,
        ...style,
      }}
    >
      {/* Ambient Pulsing Aura during generation/thinking */}
      {showHalo && (
        <div
          className={`absolute inset-0 rounded-full pointer-events-none transition-all duration-700 ${
            isGenerating
              ? "bg-gradient-to-r from-amber-500/40 via-guntur-600/40 to-leaf-600/40 blur-md scale-110 animate-pulse"
              : "bg-amber-500/15 blur-sm scale-105"
          }`}
        />
      )}

      {/* The Live WebGL2 Strands Canvas Micro Component */}
      <div className="w-full h-full relative z-10 rounded-full overflow-hidden [isolation:isolate] [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
        <Strands
          colors={ANDHRA_ORB_COLORS}
          count={3}
          speed={computedSpeed}
          energy={computedEnergy}
          listening={isGenerating || isSpeaking}
          glass={glass}
          glassSize={1.12}
          glow={isGenerating ? 1.8 : 1.3}
          amplitude={isGenerating ? 1.3 : 1.1}
          thickness={size === "xs" || size === "sm" ? 1.4 : 1.0}
          spread={1.15}
          interactive={interactive}
          clickPulse={true}
          maxDevicePixelRatio={2.5}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export interface RuchiGeneratingLoaderProps {
  locale?: string;
  stepText?: string;
  variant?: "bubble" | "card" | "inline";
  className?: string;
}

/**
 * RuchiGeneratingLoader — Dedicated thinking/generating loader component.
 * Displays the pulsing Strands orb with live culinary status text.
 */
export function RuchiGeneratingLoader({
  locale = "en",
  stepText,
  variant = "bubble",
  className = "",
}: RuchiGeneratingLoaderProps) {
  const isTe = locale === "te";

  if (variant === "inline") {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-leaf-950/90 text-rice-50 text-xs border border-leaf-700/70 shadow-md ${className}`}
      >
        <RuchiOrb size="xs" state="generating" />
        <span className="font-semibold text-turmeric-400">
          {stepText || (isTe ? "రుచి శోధిస్తోంది..." : "Ruchi is thinking...")}
        </span>
      </div>
    );
  }

  if (variant === "bubble") {
    return (
      <div className={`flex items-start gap-3 animate-fade-in ${className}`}>
        <div className="flex-shrink-0 mt-0.5">
          <RuchiOrb size="sm" state="generating" variant="css" />
        </div>

        <div className="bg-white dark:bg-leaf-950 border border-turmeric-300/80 dark:border-leaf-800 rounded-2xl rounded-tl-none p-4 shadow-md max-w-[85%] space-y-3.5">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 relative flex-shrink-0">
              <RuchiOrb size="md" state="generating" interactive={false} style={{ width: "56px", height: "56px" }} />
            </div>

            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-turmeric-500 animate-ping flex-shrink-0" />
                <span className="font-displayTe text-xs sm:text-sm font-bold text-leaf-950 dark:text-[#FAF9F5]">
                  {isTe ? "రుచి విశ్లేషిస్తోంది..." : "Ruchi is generating..."}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-ink-600 dark:text-[#E8E4D3]/80 font-medium leading-relaxed">
                {stepText ||
                  (isTe
                    ? "26 జిల్లాల రికార్డులను మరియు ప్రామాణిక కారం నిష్పత్తులను సమీక్షిస్తోంది..."
                    : "Retrieving verified recipes, heat ratios & regional wisdom...")}
              </p>
            </div>
          </div>

          {/* Micro-Progress Animation Bar */}
          <div className="w-full bg-rice-200/80 dark:bg-leaf-800 rounded-full h-1 overflow-hidden">
            <div className="bg-gradient-to-r from-turmeric-500 via-guntur-600 to-leaf-700 h-full w-3/4 animate-[pulse_1.2s_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  // Default "card" variant
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-leaf-950 border border-leaf-200/80 dark:border-leaf-800 shadow-md animate-fade-in max-w-lg ${className}`}
    >
      <RuchiOrb size="md" state="generating" interactive={false} />

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping flex-shrink-0" />
          <span className="font-displayTe text-sm font-bold text-leaf-900 dark:text-[#FAF9F5]">
            {isTe ? "రుచి శోధిస్తోంది..." : "Ruchi is generating..."}
          </span>
        </div>
        <p className="text-xs text-ink-600 dark:text-[#E8E4D3]/80 font-medium leading-relaxed">
          {stepText ||
            (isTe
              ? "26 జిల్లాల పాకశాస్త్ర రికార్డులను మరియు ప్రామాణిక నిష్పత్తులను సమీక్షిస్తోంది..."
              : "Retrieving verified recipes, heat ratios & elder wisdom across 26 districts...")}
        </p>
      </div>
    </div>
  );
}

export default RuchiOrb;
