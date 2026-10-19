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
 * Authentic SVG Watermark Silhouettes for Andhra Culinary Heritage
 */
export function CulinaryWatermark({
  motif,
  className = "w-24 h-24 text-turmeric-500/10",
}: {
  motif: "star-anise" | "cardamom" | "guntur-chilli" | "curry-leaf" | "rolu-mortar" | "kolam";
  className?: string;
}) {
  switch (motif) {
    case "star-anise":
      return (
        <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-hidden="true">
          <path d="M50 10 C52 25, 60 35, 75 30 C65 42, 68 55, 85 60 C70 65, 65 78, 65 95 C55 82, 45 82, 35 95 C35 78, 30 65, 15 60 C32 55, 35 42, 25 30 C40 35, 48 25, 50 10 Z" />
          <circle cx="50" cy="50" r="10" />
          <circle cx="50" cy="25" r="4" fill="#FAF9F5" fillOpacity="0.4" />
          <circle cx="70" cy="42" r="4" fill="#FAF9F5" fillOpacity="0.4" />
          <circle cx="68" cy="72" r="4" fill="#FAF9F5" fillOpacity="0.4" />
          <circle cx="32" cy="72" r="4" fill="#FAF9F5" fillOpacity="0.4" />
          <circle cx="30" cy="42" r="4" fill="#FAF9F5" fillOpacity="0.4" />
        </svg>
      );

    case "cardamom":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
          <path d="M50 15 C30 25, 20 50, 30 75 C38 90, 62 90, 70 75 C80 50, 70 25, 50 15 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 15 L50 85" strokeDasharray="3 3" />
          <path d="M40 30 C35 50, 40 70, 48 80" />
          <path d="M60 30 C65 50, 60 70, 52 80" />
          <path d="M50 15 L50 8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "guntur-chilli":
      return (
        <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-hidden="true">
          {/* Chilli Stem */}
          <path d="M45 10 C50 14, 55 12, 60 8 C62 6, 60 14, 55 18 Z" fill="#2A7356" />
          <path d="M40 18 C46 16, 54 16, 60 20 C56 24, 44 24, 40 18 Z" fill="#1F5A43" />
          {/* Curved Fiery Body */}
          <path d="M42 22 C48 30, 60 40, 62 55 C65 72, 55 85, 48 95 C46 88, 48 80, 42 70 C36 58, 35 40, 42 22 Z" />
        </svg>
      );

    case "curry-leaf":
      return (
        <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-hidden="true">
          <path d="M50 10 Q50 90 50 95" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Leaves on branch */}
          <path d="M50 25 C62 20, 75 25, 78 35 C68 40, 56 32, 50 30 Z" />
          <path d="M50 35 C38 30, 25 35, 22 45 C32 50, 44 42, 50 40 Z" />
          <path d="M50 50 C62 45, 75 50, 78 60 C68 65, 56 57, 50 55 Z" />
          <path d="M50 60 C38 55, 25 60, 22 70 C32 75, 44 67, 50 65 Z" />
          <path d="M50 75 C60 72, 70 76, 72 82 C64 85, 54 80, 50 78 Z" />
        </svg>
      );

    case "rolu-mortar":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
          {/* Mortar Body */}
          <path d="M20 30 C20 25, 80 25, 80 30 C80 55, 68 70, 68 85 L32 85 C32 70, 20 55, 20 30 Z" fill="currentColor" fillOpacity="0.15" />
          <ellipse cx="50" cy="30" rx="30" ry="8" fill="currentColor" fillOpacity="0.25" />
          <ellipse cx="50" cy="85" rx="22" ry="5" />
          {/* Pestle / Rokali */}
          <path d="M44 8 L56 12 L52 50 L42 48 Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );

    case "kolam":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="38" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="50" cy="50" r="24" opacity="0.8" />
          <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.2" />
          <path d="M50 12 L50 88 M12 50 L88 50" opacity="0.5" />
          <path d="M23 23 L77 77 M77 23 L23 77" opacity="0.4" />
          {/* Petals */}
          <path d="M50 26 C58 36, 58 42, 50 50 C42 42, 42 36, 50 26 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M50 74 C58 64, 58 58, 50 50 C42 58, 42 64, 50 74 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M26 50 C36 58, 42 58, 50 50 C42 42, 36 42, 26 50 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M74 50 C64 58, 58 58, 50 50 C58 42, 64 42, 74 50 Z" fill="currentColor" fillOpacity="0.15" />
        </svg>
      );

    default:
      return null;
  }
}

/**
 * Lightweight floating spice dust / embers
 */
export function FloatingParticles({
  count = 10,
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
        const left = (i * 17) % 94 + 3;
        const top = (i * 23) % 90 + 5;
        const duration = 4 + (i % 4) * 2; // 4s, 6s, 8s, 10s
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
              opacity: 0.25 + (i % 4) * 0.15,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Sectional Visual Backdrop Component
 * Provides rich, distinct background atmosphere, depth gradients, and watermark visuals sectionwise.
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
          className={`relative ${overflowHidden ? "overflow-hidden" : ""} rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 transition-all shadow-[0_16px_45px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl ${containerClassName}`}
        >
          {/* Tri-Color Atmospheric Spotlight Columns */}
          {/* Left: Coastal Godavari River Mist Glow */}
          <div
            className="absolute top-0 left-0 w-1/3 h-full pointer-events-none opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at 20% 40%, rgba(61, 143, 110, 0.2) 0%, rgba(195, 221, 203, 0.2) 60%, transparent 85%)",
            }}
          />
          {/* Center: Terracotta & Guntur Fire Glow */}
          <div
            className="absolute top-0 left-1/3 w-1/3 h-full pointer-events-none opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(229, 72, 77, 0.15) 0%, rgba(253, 232, 168, 0.2) 60%, transparent 85%)",
            }}
          />
          {/* Right: Araku Highland Emerald & Gold Glow */}
          <div
            className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at 80% 40%, rgba(242, 179, 27, 0.2) 0%, rgba(94, 176, 141, 0.18) 60%, transparent 85%)",
            }}
          />

          {/* Top Gold Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-leaf-500/20 via-turmeric-500/60 to-guntur-500/20 pointer-events-none" />

          {/* Watermark Motifs */}
          <div className="absolute -top-6 -right-6 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="kolam" className="w-48 h-48 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          <div className="absolute bottom-2 left-4 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="curry-leaf" className="w-36 h-36 text-leaf-800 dark:text-leaf-400" />
          </div>
          <div className="absolute bottom-4 right-1/3 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="guntur-chilli" className="w-28 h-28 text-guntur-700 dark:text-guntur-400" />
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
          className={`relative ${overflowHidden ? "overflow-hidden" : ""} rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 transition-all shadow-[0_16px_45px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl ${containerClassName}`}
        >
          {/* Ambient Warm Golden & Herbal Radial Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-72 pointer-events-none opacity-35 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, rgba(242, 179, 27, 0.2) 0%, rgba(195, 221, 203, 0.25) 60%, transparent 80%)",
            }}
          />

          {/* Rice Grain & Star Anise Watermarks */}
          <div className="absolute top-2 right-4 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="star-anise" className="w-32 h-32 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          <div className="absolute -bottom-6 left-6 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="cardamom" className="w-28 h-28 text-leaf-800 dark:text-leaf-400" />
          </div>

          {/* Top Delicate Golden Border Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-turmeric-500/50 to-transparent pointer-events-none" />

          {/* Optional Header */}
          {(badge || title || subtitle || headerAction) && (
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-leaf-200/70 dark:border-[#1F5A43]/60 pb-4 mb-6">
              <div>
                {badge}
                {title && (
                  <h2 className="font-displayTe text-2xl sm:text-3xl font-extrabold text-leaf-950 dark:text-[#FAF9F5] mt-1">
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
          className={`relative ${overflowHidden ? "overflow-hidden" : ""} rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-10 transition-all bg-white/75 dark:bg-[#081C14]/85 backdrop-blur-xl shadow-[0_16px_45px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] ${containerClassName}`}
        >
          {/* Multi-tier Stage Spotlights */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 pointer-events-none opacity-35 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(242, 179, 27, 0.18) 0%, rgba(207, 136, 0, 0.08) 50%, transparent 75%)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-96 h-96 pointer-events-none opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(61, 143, 110, 0.2) 0%, rgba(16, 50, 38, 0.08) 50%, transparent 75%)",
            }}
          />

          {/* Traditional Brass & Rolu Mortar Watermark */}
          <div className="absolute bottom-3 right-6 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="rolu-mortar" className="w-40 h-40 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          <div className="absolute top-4 left-6 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="guntur-chilli" className="w-24 h-24 text-guntur-600 dark:text-guntur-400" />
          </div>

          {/* Top Golden Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-turmeric-500/50 to-transparent pointer-events-none" />

          {/* Optional Header */}
          {(badge || title || subtitle || headerAction) && (
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-leaf-200/70 dark:border-[#1F5A43]/60 pb-4 mb-6">
              <div>
                {badge}
                {title && (
                  <h2 className="font-displayTe text-2xl sm:text-4xl font-extrabold text-leaf-950 dark:text-[#FAF9F5] mt-1">
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
     * 4. GALLERY ATMOSPHERIC (for /browse DriftWall)
     * ========================================================================= */
    case "gallery-atmospheric":
      return (
        <div
          className={`relative ${overflowHidden ? "overflow-hidden" : ""} rounded-hero p-4 sm:p-8 transition-all ${containerClassName}`}
          style={{
            background:
              "linear-gradient(160deg, #05140E 0%, #0C261B 35%, #081B13 70%, #05120D 100%)",
          }}
        >
          {/* Gallery Directional Overhead Lighting */}
          <div
            className="absolute top-0 inset-x-0 h-96 pointer-events-none opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(247, 197, 69, 0.3) 0%, rgba(61, 143, 110, 0.2) 50%, transparent 80%)",
            }}
          />

          {/* Kolam & Star Anise Heritage Watermarks */}
          <div className="absolute -top-12 -left-12 pointer-events-none opacity-15">
            <CulinaryWatermark motif="kolam" className="w-56 h-56 text-turmeric-400" />
          </div>
          <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-15">
            <CulinaryWatermark motif="star-anise" className="w-48 h-48 text-turmeric-500" />
          </div>

          <FloatingParticles count={14} color="turmeric" />

          {/* Top Gold Border Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-turmeric-400/70 to-transparent pointer-events-none" />

          <div className={`relative z-10 text-[#FAF9F5] ${className}`}>{children}</div>
        </div>
      );

    /* =========================================================================
     * 5. DISH SANCTUARY (for /dishes/[slug] sections)
     * ========================================================================= */
    case "dish-sanctuary":
      return (
        <div
          className={`relative ${overflowHidden ? "overflow-hidden" : ""} rounded-2xl border border-leaf-200/90 dark:border-leaf-800 p-6 sm:p-8 transition-all bg-white/95 dark:bg-[#0A2218] shadow-sm ${containerClassName}`}
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

          <div className={`relative z-10 ${className}`}>{children}</div>
        </div>
      );

    /* =========================================================================
     * 6. DEFAULT / EMERALD SANCTUM
     * ========================================================================= */
    case "emerald-sanctum":
    default:
      return (
        <section
          className={`relative ${overflowHidden ? "overflow-hidden" : ""} rounded-hero border border-white/80 dark:border-[#1F5A43] p-6 sm:p-12 text-ink-900 dark:text-[#FAF9F5] shadow-[0_20px_50px_rgba(31,90,67,0.06)] dark:shadow-[0_24px_60px_rgba(8,28,20,0.8)] bg-gradient-to-br from-white/90 via-white/80 to-rice-50/90 dark:from-[#081C14]/95 dark:via-[#0D281E]/90 dark:to-[#081C14]/95 backdrop-blur-xl ${containerClassName}`}
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

          {/* Watermark Kolam in Background */}
          <div className="absolute -top-10 -right-10 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="kolam" className="w-64 h-64 text-turmeric-700 dark:text-turmeric-400" />
          </div>
          <div className="absolute -bottom-8 -left-8 pointer-events-none opacity-10 dark:opacity-20">
            <CulinaryWatermark motif="star-anise" className="w-48 h-48 text-turmeric-700 dark:text-turmeric-400" />
          </div>

          <FloatingParticles count={8} color="turmeric" />

          <div className={`relative z-10 ${className}`}>{children}</div>
        </section>
      );
  }
}

