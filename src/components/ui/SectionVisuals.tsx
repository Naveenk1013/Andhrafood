"use client";

import React, { ReactNode } from "react";

export type SectionVisualVariant =
  | "emerald-sanctum"
  | "tri-region-kingdoms"
  | "taste-pillars"
  | "harvest-bhojanam"
  | "curated-feast"
  | "gallery-atmospheric"
  | "dish-sanctuary"
  | "ruchi-celestial";

export type AndhraMotif =
  | "star-anise"
  | "cardamom"
  | "guntur-chilli"
  | "curry-leaf"
  | "rolu-mortar"
  | "kolam"
  | "kalamkari"
  | "kondapalli-toy"
  | "kuchipudi"
  | "temple-gopuram"
  | "lepakshi"
  | "amaravati-stupa"
  | "lotus"
  | "ikat"
  | "andhra-map";

interface SectionVisualBackdropProps {
  variant: SectionVisualVariant;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  badge?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  headerAction?: ReactNode;
  overflowHidden?: boolean;
}

/**
 * Authentic Andhra Pradesh Culinary & Cultural Heritage Watermark Silhouettes.
 * Precision-drawn vector motifs with subtle line weights and authentic proportions.
 */
export function CulinaryWatermark({
  motif,
  className = "w-24 h-24 text-turmeric-500/10",
  strokeWidth = 1.8,
}: {
  motif: AndhraMotif;
  className?: string;
  strokeWidth?: number;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (motif) {
    /* 1. Sacred Andhra Kolam (Muggu) Mandala */
    case "kolam":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          {/* Outer Dashed Celestial Ring */}
          <circle cx="50" cy="50" r="42" strokeDasharray="3 4" opacity="0.6" />
          {/* Middle Concentric Orbit */}
          <circle cx="50" cy="50" r="26" opacity="0.8" />
          {/* Center Bindu Circle */}
          <circle cx="50" cy="50" r="7" fill="currentColor" fillOpacity="0.2" />
          {/* Cardinal & Diagonal Spoke Rays */}
          <path d="M50 8 V92 M8 50 H92" opacity="0.45" />
          <path d="M20 20 L80 80 M80 20 L20 80" opacity="0.35" />
          {/* 4 Cardinal Lotus Petals */}
          <path d="M50 24 C58 35, 58 42, 50 50 C42 42, 42 35, 50 24 Z" fill="currentColor" fillOpacity="0.14" />
          <path d="M50 76 C58 65, 58 58, 50 50 C42 58, 42 65, 50 76 Z" fill="currentColor" fillOpacity="0.14" />
          <path d="M24 50 C35 58, 42 58, 50 50 C42 42, 35 42, 24 50 Z" fill="currentColor" fillOpacity="0.14" />
          <path d="M76 50 C65 58, 58 58, 50 50 C58 42, 65 42, 76 50 Z" fill="currentColor" fillOpacity="0.14" />
          {/* 4 Diagonal Satellite Dots */}
          <circle cx="28" cy="28" r="1.5" fill="currentColor" />
          <circle cx="72" cy="28" r="1.5" fill="currentColor" />
          <circle cx="72" cy="72" r="1.5" fill="currentColor" />
          <circle cx="28" cy="72" r="1.5" fill="currentColor" />
        </svg>
      );

    /* 2. Kalamkari Floral Paisley & Tree of Life */
    case "kalamkari":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path d="M50 7 C60 24 81 27 93 50 C81 73 60 76 50 93 C40 76 19 73 7 50 C19 27 40 24 50 7 Z" />
          <path d="M50 19 C59 33 72 39 81 50 C72 61 59 67 50 81 C41 67 28 61 19 50 C28 39 41 33 50 19 Z" />
          <path d="M50 19 C44 34 44 66 50 81 M19 50 C34 44 66 44 81 50" opacity="0.6" />
          <path d="M50 29 C60 39 60 45 50 50 C40 45 40 39 50 29 Z" fill="currentColor" fillOpacity="0.16" />
          <path d="M50 71 C60 61 60 55 50 50 C40 55 40 61 50 71 Z" fill="currentColor" fillOpacity="0.16" />
          <circle cx="50" cy="50" r="3.5" fill="currentColor" />
          <circle cx="50" cy="11" r="2" fill="currentColor" />
          <circle cx="89" cy="50" r="2" fill="currentColor" />
          <circle cx="50" cy="89" r="2" fill="currentColor" />
          <circle cx="11" cy="50" r="2" fill="currentColor" />
        </svg>
      );

    /* 3. Dravidian Temple Gopuram (Tirupati, Simhachalam, Srisailam) */
    case "temple-gopuram":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          {/* Base Plinths */}
          <path d="M10 88 H90 M17 79 H83 M23 68 H77" />
          {/* Tiered Gopuram Stepping */}
          <path d="M28 68 V51 H35 V39 H42 V26 H46 L50 12 L54 26 H58 V39 H65 V51 H72 V68" />
          {/* Tier Niches */}
          <path d="M36 58 H64 M43 46 H57 M47 34 H53" opacity="0.6" />
          {/* Sacred Inner Sanctum Arch */}
          <path d="M43 88 V75 Q50 63 57 75 V88" fill="currentColor" fillOpacity="0.12" />
          {/* Kalasam Spire Peak */}
          <path d="M50 12 V5" />
          <circle cx="50" cy="7" r="2.5" fill="currentColor" />
        </svg>
      );

    /* 4. Sacred Lotus (Padma) */
    case "lotus":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          {/* Left, Right & Center Overlapping Petals */}
          <path d="M50 83 C29 67 18 51 19 36 C36 40 47 57 50 83 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M50 83 C71 67 82 51 81 36 C64 40 53 57 50 83 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M50 83 C32 53 36 25 50 12 C64 25 68 53 50 83 Z" fill="currentColor" fillOpacity="0.18" />
          {/* Base Calyx Waves */}
          <path d="M12 88 Q50 99 88 88 M25 79 Q50 88 75 79" opacity="0.7" />
          <circle cx="50" cy="66" r="3.5" fill="currentColor" />
        </svg>
      );

    /* 5. Guntur Sannam Chilli */
    case "guntur-chilli":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          {/* Calyx & Stem */}
          <path d="M46 12 C51 7, 57 8, 62 6 C63 11, 58 15, 52 18 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M42 18 C48 15, 54 15, 60 19 C56 23, 46 23, 42 18 Z" fill="currentColor" fillOpacity="0.3" />
          {/* Curved Fiery Pod */}
          <path d="M43 21 C50 30, 62 42, 63 56 C65 72, 54 86, 45 95 C44 87, 47 78, 41 68 C35 56, 35 38, 43 21 Z" fill="currentColor" fillOpacity="0.18" />
        </svg>
      );

    /* 6. Traditional Rolu Mortar & Rokali (Grinding Stone) */
    case "rolu-mortar":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          {/* Mortar Body & Lip */}
          <path d="M20 30 Q50 20 80 30 L70 82 H30 Z" fill="currentColor" fillOpacity="0.14" />
          <ellipse cx="50" cy="30" rx="30" ry="8" fill="currentColor" fillOpacity="0.2" />
          {/* Heavy Stone Base */}
          <ellipse cx="50" cy="82" rx="20" ry="4" opacity="0.7" />
          {/* Wooden / Brass Rokali Pestle */}
          <path d="M44 8 L56 12 L52 50 L42 48 Z" fill="currentColor" fillOpacity="0.35" />
        </svg>
      );

    /* 7. Star Anise (Biryani & Masala Spice) */
    case "star-anise":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path
            d="M50 10 C52 25, 60 35, 75 30 C65 42, 68 55, 85 60 C70 65, 65 78, 65 95 C55 82, 45 82, 35 95 C35 78, 30 65, 15 60 C32 55, 35 42, 25 30 C40 35, 48 25, 50 10 Z"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <circle cx="50" cy="50" r="9" fill="currentColor" fillOpacity="0.3" />
          {/* Seed Pockets */}
          <circle cx="50" cy="25" r="3.5" fill="currentColor" opacity="0.6" />
          <circle cx="70" cy="42" r="3.5" fill="currentColor" opacity="0.6" />
          <circle cx="68" cy="72" r="3.5" fill="currentColor" opacity="0.6" />
          <circle cx="32" cy="72" r="3.5" fill="currentColor" opacity="0.6" />
          <circle cx="30" cy="42" r="3.5" fill="currentColor" opacity="0.6" />
        </svg>
      );

    /* 8. Green Cardamom Pod (Yelakulu) */
    case "cardamom":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path d="M50 15 C30 25, 20 50, 30 75 C38 90, 62 90, 70 75 C80 50, 70 25, 50 15 Z" fill="currentColor" fillOpacity="0.14" />
          <path d="M50 15 L50 85" strokeDasharray="3 3" opacity="0.5" />
          <path d="M40 30 C35 50, 40 70, 48 80" opacity="0.7" />
          <path d="M60 30 C65 50, 60 70, 52 80" opacity="0.7" />
          <path d="M50 15 L50 7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    /* 9. Karivepaku (Curry Leaves) */
    case "curry-leaf":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path d="M50 10 V92" opacity="0.7" />
          {/* Paired Pinnate Leaflets */}
          <path d="M50 25 Q22 14 18 35 Q33 46 50 30 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 25 Q78 14 82 35 Q67 46 50 30 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 45 Q22 34 18 55 Q33 66 50 50 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 45 Q78 34 82 55 Q67 66 50 50 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 65 Q22 54 18 75 Q33 86 50 70 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 65 Q78 54 82 75 Q67 86 50 70 Z" fill="currentColor" fillOpacity="0.15" />
        </svg>
      );

    /* 10. Kuchipudi Dance Mudra */
    case "kuchipudi":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <circle cx="51" cy="15" r="7" />
          <path d="M44 25 L58 25 L65 43 L51 52 L36 42 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M44 29 L24 38 L15 30 M59 29 L77 18 L85 24" />
          <path d="M36 44 Q51 58 66 44 L62 54 Q51 61 40 53 Z" />
          <path d="M40 54 L20 72 L42 68 L51 91 L60 68 L82 73 L63 53" />
          <path d="M42 9 Q51 1 60 9 M43 15 H59" opacity="0.6" />
        </svg>
      );

    /* 11. Kondapalli Wooden Toy Artisan Silhouette */
    case "kondapalli-toy":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path d="M44 29 C39 21 43 12 52 10 C62 9 67 18 62 27" />
          <circle cx="53" cy="23" r="10" fill="currentColor" fillOpacity="0.1" />
          <path d="M44 34 L35 44 L28 65 L39 70 L47 53 L48 82 L59 82 L62 54 L72 69 L81 63 L68 41 L62 33 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M45 39 L30 32 L23 39 M64 38 L78 29 L84 35" />
          <circle cx="56" cy="21" r="1.5" fill="currentColor" />
        </svg>
      );

    /* 12. Amaravati Buddhist Stupa & Dharma Chakra */
    case "amaravati-stupa":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path d="M11 84 H89 M18 76 H82" />
          <path d="M25 76 Q25 37 50 29 Q75 37 75 76 Z" fill="currentColor" fillOpacity="0.14" />
          <path d="M38 29 V19 H62 V29 M44 19 V12 H56 V19 M50 12 V5" />
          <path d="M34 51 Q50 39 66 51 M32 63 Q50 50 68 63" opacity="0.6" />
        </svg>
      );

    /* 13. Lepakshi Architectural Silhouette */
    case "lepakshi":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path d="M9 82 H91 M15 75 H85 M23 75 L27 47 H73 L77 75" />
          <path d="M31 47 V35 H69 V47 M38 35 V22 H62 V35 M44 22 V14 H56 V22" />
          <path d="M35 57 V75 M50 47 V75 M65 57 V75" opacity="0.6" />
        </svg>
      );

    /* 14. Pochampally & Dharmavaram Ikat Geometric Diamond */
    case "ikat":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path d="M50 5 L95 50 L50 95 L5 50 Z" />
          <path d="M50 18 L82 50 L50 82 L18 50 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M50 31 L69 50 L50 69 L31 50 Z" />
          <path d="M50 5 V31 M50 69 V95 M5 50 H31 M69 50 H95" opacity="0.5" />
          <circle cx="50" cy="50" r="3.5" fill="currentColor" />
        </svg>
      );

    /* 15. Andhra Coastline & Delta River Map Outline */
    case "andhra-map":
      return (
        <svg viewBox="0 0 100 100" {...common} className={className} aria-hidden="true">
          <path d="M31 7 L47 13 L58 22 L73 29 L69 43 L81 54 L70 67 L65 83 L52 93 L43 78 L33 68 L26 52 L20 37 L28 24 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M31 7 L39 30 L33 48 L43 78 M58 22 L52 44 L70 67" opacity="0.5" />
          <circle cx="49" cy="48" r="3.5" fill="currentColor" />
        </svg>
      );

    default:
      return null;
  }
}

/**
 * Lightweight, non-distracting floating spice dust / warm embers
 */
export function FloatingParticles({
  count = 8,
  color = "turmeric",
  className = "",
}: {
  count?: number;
  color?: "turmeric" | "emerald" | "chilli" | "guntur" | "leaf";
  className?: string;
}) {
  const bgClass =
    color === "guntur" || color === "chilli"
      ? "bg-guntur-500/40 shadow-[0_0_8px_rgba(211,47,47,0.6)]"
      : color === "leaf" || color === "emerald"
      ? "bg-leaf-400/40 shadow-[0_0_8px_rgba(61,143,110,0.6)]"
      : "bg-turmeric-400/40 shadow-[0_0_8px_rgba(242,179,27,0.6)]";

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const size = (i % 3) * 2 + 3; // 3px, 5px, 7px
        const left = (i * 19 + 7) % 94 + 3;
        const top = (i * 23 + 13) % 90 + 5;
        const duration = 5 + (i % 4) * 2;
        const delay = (i % 5) * 0.7;

        return (
          <div
            key={i}
            className={`absolute rounded-full ${bgClass} animate-gentle-float`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: 0.2 + (i % 4) * 0.12,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Sectional Visual Backdrop Component.
 * Preserves the exact, beloved heritage colors:
 * - Emerald Sanctum (white glass / dark deep emerald #081C14)
 * - Tri-Region Kingdoms (Godavari mist, Guntur fire, Araku gold spotlights)
 * - Harvest Bhojanam (Warm honey & herbal radial atmosphere)
 * - Curated Feast & Gallery Atmospheric
 *
 * Enhanced with refined authentic Andhra watermarks and seamless responsive scaling.
 */
export function SectionVisualBackdrop({
  variant,
  children,
  className = "",
  containerClassName = "",
  badge,
  title,
  subtitle,
  headerAction,
  overflowHidden = true,
}: SectionVisualBackdropProps) {
  switch (variant) {
    /* =========================================================================
     * 1. TRI-REGION KINGDOMS (Coastal, Rayalaseema, Uttarandhra)
     * ========================================================================= */
    case "tri-region-kingdoms":
      return (
        <section
          className={`relative ${
            overflowHidden ? "overflow-hidden" : ""
          } rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 transition-all shadow-[0_16px_45px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl ${containerClassName}`}
        >
          {/* Tri-Color Atmospheric Spotlight Columns */}
          {/* Left: Coastal Godavari River Mist Glow */}
          <div
            className="absolute top-0 left-0 w-1/3 h-full pointer-events-none opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 20% 40%, rgba(61, 143, 110, 0.2) 0%, rgba(195, 221, 203, 0.2) 60%, transparent 85%)",
            }}
          />
          {/* Center: Terracotta & Guntur Fire Glow */}
          <div
            className="absolute top-0 left-1/3 w-1/3 h-full pointer-events-none opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(229, 72, 77, 0.15) 0%, rgba(253, 232, 168, 0.2) 60%, transparent 85%)",
            }}
          />
          {/* Right: Araku Highland Emerald & Gold Glow */}
          <div
            className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 80% 40%, rgba(242, 179, 27, 0.2) 0%, rgba(94, 176, 141, 0.18) 60%, transparent 85%)",
            }}
          />

          {/* Top Tri-Color Heritage Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-leaf-500/20 via-turmeric-500/60 to-guntur-500/20 pointer-events-none" />

          {/* Refined Watermarks */}
          {/* Top-Right: Sacred Andhra Kolam */}
          <div className="absolute -top-6 -right-6 pointer-events-none opacity-[0.09] dark:opacity-[0.18] transition-opacity">
            <CulinaryWatermark motif="kolam" className="w-52 h-52 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          {/* Bottom-Left: Curry Leaves */}
          <div className="absolute bottom-2 left-4 pointer-events-none opacity-[0.09] dark:opacity-[0.16] transition-opacity">
            <CulinaryWatermark motif="curry-leaf" className="w-36 h-36 text-leaf-800 dark:text-leaf-400 -rotate-12" />
          </div>
          {/* Center-Right: Guntur Chilli Pod */}
          <div className="absolute bottom-4 right-1/4 pointer-events-none opacity-[0.08] dark:opacity-[0.15] transition-opacity">
            <CulinaryWatermark motif="guntur-chilli" className="w-28 h-28 text-guntur-700 dark:text-guntur-400 rotate-12" />
          </div>

          <FloatingParticles count={8} color="turmeric" />

          {/* Content */}
          <div className={`relative z-10 text-ink-900 dark:text-[#FAF9F5] ${className}`}>{children}</div>
        </section>
      );

    /* =========================================================================
     * 2. HARVEST BHOJANAM (Traditional Courses & Categories Grid)
     * ========================================================================= */
    case "harvest-bhojanam":
      return (
        <section
          className={`relative ${
            overflowHidden ? "overflow-hidden" : ""
          } rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 transition-all shadow-[0_16px_45px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl ${containerClassName}`}
        >
          {/* Ambient Warm Golden & Herbal Radial Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-72 pointer-events-none opacity-35 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(242, 179, 27, 0.2) 0%, rgba(195, 221, 203, 0.25) 60%, transparent 80%)",
            }}
          />

          {/* Refined Watermarks */}
          <div className="absolute top-2 right-4 pointer-events-none opacity-[0.09] dark:opacity-[0.18]">
            <CulinaryWatermark motif="lotus" className="w-36 h-36 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          <div className="absolute -bottom-6 left-6 pointer-events-none opacity-[0.08] dark:opacity-[0.16]">
            <CulinaryWatermark motif="cardamom" className="w-28 h-28 text-leaf-800 dark:text-leaf-400" />
          </div>
          <div className="absolute -top-8 left-1/3 pointer-events-none opacity-[0.06] dark:opacity-[0.12]">
            <CulinaryWatermark motif="star-anise" className="w-28 h-28 text-turmeric-600 dark:text-turmeric-400 rotate-45" />
          </div>

          {/* Top Delicate Golden Border Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-turmeric-500/50 to-transparent pointer-events-none" />

          {/* Optional Section Header */}
          {(badge || title || subtitle || headerAction) && (
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-leaf-200/70 dark:border-[#1F5A43]/60 pb-4 mb-6">
              <div>
                {badge}
                {title && (
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-leaf-950 dark:text-[#FAF9F5] mt-1">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-ink-600 dark:text-[#E8E4D3]/80 font-medium mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
              {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
            </div>
          )}

          {/* Children Content */}
          <div className={`relative z-10 text-ink-900 dark:text-[#FAF9F5] ${className}`}>{children}</div>
        </section>
      );

    /* =========================================================================
     * 3. CURATED FEAST (Featured Masterpieces / Authentic Dishes)
     * ========================================================================= */
    case "curated-feast":
      return (
        <section
          className={`relative ${
            overflowHidden ? "overflow-hidden" : ""
          } rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 transition-all bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl shadow-[0_16px_45px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] ${containerClassName}`}
        >
          {/* Multi-tier Stage Spotlights */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 pointer-events-none opacity-35 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(242, 179, 27, 0.18) 0%, rgba(207, 136, 0, 0.08) 50%, transparent 75%)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-96 h-96 pointer-events-none opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(61, 143, 110, 0.2) 0%, rgba(16, 50, 38, 0.08) 50%, transparent 75%)",
            }}
          />

          {/* Traditional Brass & Rolu Mortar Watermark */}
          <div className="absolute bottom-3 right-6 pointer-events-none opacity-[0.09] dark:opacity-[0.18]">
            <CulinaryWatermark motif="rolu-mortar" className="w-40 h-40 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          <div className="absolute top-4 left-6 pointer-events-none opacity-[0.09] dark:opacity-[0.18]">
            <CulinaryWatermark motif="guntur-chilli" className="w-24 h-24 text-guntur-600 dark:text-guntur-400 -rotate-12" />
          </div>
          <div className="absolute -bottom-6 left-1/3 pointer-events-none opacity-[0.07] dark:opacity-[0.14]">
            <CulinaryWatermark motif="kalamkari" className="w-32 h-32 text-leaf-700 dark:text-leaf-400" />
          </div>

          {/* Top Golden Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-turmeric-500/50 to-transparent pointer-events-none" />

          {/* Optional Section Header */}
          {(badge || title || subtitle || headerAction) && (
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-leaf-200/70 dark:border-[#1F5A43]/60 pb-4 mb-6">
              <div>
                {badge}
                {title && (
                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-leaf-950 dark:text-[#FAF9F5] mt-1">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-ink-600 dark:text-[#E8E4D3]/80 font-medium mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
              {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
            </div>
          )}

          {/* Children Content */}
          <div className={`relative z-10 text-ink-900 dark:text-[#FAF9F5] ${className}`}>{children}</div>
        </section>
      );

    /* =========================================================================
     * 4. TASTE PILLARS (Interactive Magic Bento Grid)
     * ========================================================================= */
    case "taste-pillars":
      return (
        <section
          className={`relative ${
            overflowHidden ? "overflow-hidden" : ""
          } rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 transition-all bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl shadow-[0_16px_45px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] ${containerClassName}`}
        >
          {/* Diagonal Dual-Tone Glow */}
          <div
            className="absolute top-0 left-0 w-80 h-80 pointer-events-none opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(61, 143, 110, 0.22) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(242, 179, 27, 0.2) 0%, transparent 70%)",
            }}
          />

          {/* Watermarks */}
          <div className="absolute -top-6 -right-6 pointer-events-none opacity-[0.09] dark:opacity-[0.16]">
            <CulinaryWatermark motif="kuchipudi" className="w-44 h-44 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          <div className="absolute -bottom-8 -left-8 pointer-events-none opacity-[0.08] dark:opacity-[0.15]">
            <CulinaryWatermark motif="kalamkari" className="w-40 h-40 text-leaf-700 dark:text-leaf-400" />
          </div>

          {/* Top Delicate Golden Border Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B31B]/50 to-transparent pointer-events-none" />

          {/* Optional Header */}
          {(badge || title || subtitle || headerAction) && (
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-leaf-200/70 dark:border-[#1F5A43]/60 pb-4 mb-6">
              <div>
                {badge}
                {title && (
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-leaf-950 dark:text-[#FAF9F5] mt-1">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-ink-600 dark:text-[#E8E4D3]/80 font-medium mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
              {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
            </div>
          )}

          <FloatingParticles count={6} color="emerald" />

          <div className={`relative z-10 text-ink-900 dark:text-[#FAF9F5] ${className}`}>{children}</div>
        </section>
      );

    /* =========================================================================
     * 5. GALLERY ATMOSPHERIC (for /browse 3D DriftWall)
     * ========================================================================= */
    case "gallery-atmospheric":
      return (
        <div
          className={`relative ${
            overflowHidden ? "overflow-hidden" : ""
          } rounded-hero p-4 sm:p-8 transition-all ${containerClassName}`}
          style={{
            background:
              "linear-gradient(160deg, #05140E 0%, #0C261B 35%, #081B13 70%, #05120D 100%)",
          }}
        >
          {/* Gallery Directional Overhead Lighting */}
          <div
            className="absolute top-0 inset-x-0 h-96 pointer-events-none opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(247, 197, 69, 0.3) 0%, rgba(61, 143, 110, 0.2) 50%, transparent 80%)",
            }}
          />

          {/* Kolam & Amaravati Stupa Watermarks */}
          <div className="absolute -top-12 -left-12 pointer-events-none opacity-15">
            <CulinaryWatermark motif="kolam" className="w-56 h-56 text-turmeric-400" />
          </div>
          <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-15">
            <CulinaryWatermark motif="amaravati-stupa" className="w-48 h-48 text-turmeric-500" />
          </div>

          <FloatingParticles count={14} color="turmeric" />

          {/* Top Gold Border Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-turmeric-400/70 to-transparent pointer-events-none" />

          <div className={`relative z-10 text-[#FAF9F5] ${className}`}>{children}</div>
        </div>
      );

    /* =========================================================================
     * 6. DISH SANCTUARY (for /dishes/[slug] sections)
     * ========================================================================= */
    case "dish-sanctuary":
      return (
        <div
          className={`relative ${
            overflowHidden ? "overflow-hidden" : ""
          } rounded-2xl border border-leaf-200/90 dark:border-leaf-800 p-6 sm:p-8 transition-all bg-white/95 dark:bg-[#0A2218] shadow-sm ${containerClassName}`}
        >
          {/* Ambient Warm Corner Glow */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none opacity-30 blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(242, 179, 27, 0.25) 0%, transparent 70%)",
            }}
          />

          <div className="absolute bottom-2 right-4 pointer-events-none opacity-10">
            <CulinaryWatermark motif="cardamom" className="w-24 h-24 text-turmeric-600" />
          </div>
          <div className="absolute -bottom-4 left-4 pointer-events-none opacity-10">
            <CulinaryWatermark motif="lotus" className="w-24 h-24 text-leaf-600" />
          </div>

          <div className={`relative z-10 ${className}`}>{children}</div>
        </div>
      );

    /* =========================================================================
     * 7. RUCHI CELESTIAL (for conversational workspace)
     * ========================================================================= */
    case "ruchi-celestial":
      return (
        <div
          className={`relative ${
            overflowHidden ? "overflow-hidden" : ""
          } rounded-hero p-6 sm:p-10 transition-all border border-[#2A7356]/60 dark:border-[#1F5A43] bg-[#05140E] dark:bg-[#081B13] backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.5)] ${containerClassName}`}
        >
          {/* Celestial Overhead Radial Glow */}
          <div
            className="absolute top-0 inset-x-0 h-80 pointer-events-none opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(242, 179, 27, 0.25) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 80%)",
            }}
          />

          {/* Watermarks */}
          <div className="absolute -top-8 -right-8 pointer-events-none opacity-15">
            <CulinaryWatermark motif="temple-gopuram" className="w-56 h-56 text-turmeric-400" />
          </div>
          <div className="absolute -bottom-8 -left-8 pointer-events-none opacity-15">
            <CulinaryWatermark motif="kolam" className="w-52 h-52 text-leaf-400" />
          </div>

          <FloatingParticles count={10} color="turmeric" />

          {/* Top Gold Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B31B]/60 to-transparent pointer-events-none" />

          <div className={`relative z-10 text-[#FAF9F5] ${className}`}>{children}</div>
        </div>
      );

    /* =========================================================================
     * 8. DEFAULT / EMERALD SANCTUM
     * ========================================================================= */
    case "emerald-sanctum":
    default:
      return (
        <section
          className={`relative ${
            overflowHidden ? "overflow-hidden" : ""
          } rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-12 text-ink-900 dark:text-[#FAF9F5] shadow-[0_20px_50px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] bg-gradient-to-br from-white/90 via-white/80 to-rice-50/90 dark:from-[#081C14]/95 dark:via-[#0D281E]/90 dark:to-[#081C14]/95 backdrop-blur-xl ${containerClassName}`}
        >
          {/* Top Golden Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B31B]/50 to-transparent pointer-events-none" />

          {/* Ambient Warm Golden & Herbal Radial Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-56 pointer-events-none opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(242, 179, 27, 0.16) 0%, rgba(61, 143, 110, 0.12) 50%, transparent 80%)",
            }}
          />

          {/* Refined Watermarks */}
          <div className="absolute -top-10 -right-10 pointer-events-none opacity-[0.09] dark:opacity-[0.18]">
            <CulinaryWatermark motif="kolam" className="w-64 h-64 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          <div className="absolute -bottom-8 -left-8 pointer-events-none opacity-[0.09] dark:opacity-[0.16]">
            <CulinaryWatermark motif="kalamkari" className="w-52 h-52 text-leaf-800 dark:text-leaf-400" />
          </div>

          <FloatingParticles count={8} color="turmeric" />

          <div className={`relative z-10 ${className}`}>{children}</div>
        </section>
      );
  }
}
