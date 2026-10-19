import React from "react";
import Image from "next/image";
import { getDishes, getRegions } from "@/lib/json-db";
import { DishCard } from "@/components/ui/DishCard";
import { Link } from "@/i18n/routing";
import {
  Sparkles,
  Flame,
  MapPin,
  ArrowRight,
  UtensilsCrossed,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { RegionalGlassFolders } from "@/components/home/RegionalGlassFolders";
import { CulinaryHeroWrapper } from "@/components/home/CulinaryHeroWrapper";
import { TastePhilosophyBento } from "@/components/home/TastePhilosophyBento";
import { getTranslations } from "next-intl/server";
import { RuchiOrb } from "@/components/ui/RuchiOrb";
import { RevealOnScroll, StaggerList, StaggerItem } from "@/components/ui/FluidMotion";
import { SectionVisualBackdrop } from "@/components/ui/SectionVisuals";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTe = locale === "te";
  const dishes = getDishes();
  const regions = getRegions();
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  const categories = [
    { slug: "tiffin", nameEn: "Tiffins & Attu", nameTe: "టిఫిన్లు & అట్లు", icon: "🥞" },
    { slug: "rice-and-meals", nameEn: "Bhojanam & Rice", nameTe: "భోజనం & అన్నం", icon: "🍚" },
    { slug: "curries-and-kuras", nameEn: "Kuras & Iguru", nameTe: "కూరలు & ఇగురు", icon: "🥘" },
    { slug: "pappu-and-dals", nameEn: "Mudda Pappu & Charu", nameTe: "పప్పు & చారు", icon: "🥣" },
    { slug: "pickles-and-chutneys", nameEn: "Avakaya & Pachallu", nameTe: "ఆవకాయ & పచ్చళ్ళు", icon: "🫙" },
    { slug: "sweets", nameEn: "Heritage Sweets", nameTe: "సాంప్రదాయ మిఠాయిలు", icon: "🍯" },
  ];

  return (
    <CulinaryHeroWrapper locale={locale}>
      {/* 1. CULINARY MISSION & AI RUCHI DISCOVERY BAR */}
      <RevealOnScroll direction="up">
        <SectionVisualBackdrop variant="emerald-sanctum">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            {/* Top Amber-Gold Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-chip bg-leaf-100/80 border border-leaf-300 text-leaf-900 text-xs font-bold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-turmeric-700 animate-pulse" />
              <span>The Authentic Andhra Pradesh Culinary Encyclopedia</span>
            </div>

            {/* High-Contrast Telugu Title & English Subtitle */}
            <div className="space-y-2.5">
              <h2 className="font-displayTe text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-leaf-950 dark:text-[#FAF9F5]">
                ఆంధ్రప్రదేశ్ రుచుల మహా సర్వస్వం
              </h2>
              <p className="font-display text-base sm:text-xl font-bold text-turmeric-700 dark:text-turmeric-400 tracking-wide">
                The Living Soul of Andhra Cuisine across 26 Districts
              </p>
            </div>

            {/* Legible Body Paragraph with Turmeric Highlights */}
            <p className="font-body text-sm sm:text-base text-ink-700 dark:text-[#E8E4D3]/90 leading-relaxed max-w-3xl mx-auto font-normal">
              From the fiery dryland <span className="text-leaf-900 dark:text-turmeric-400 font-semibold underline decoration-turmeric-500/40 underline-offset-4">Ragi Sangati</span> of Rayalaseema to the rich, tangy <span className="text-leaf-900 dark:text-turmeric-400 font-semibold underline decoration-turmeric-500/40 underline-offset-4">Godavari Delta pulusus</span> and the wild bamboo-cooked delicacies of <span className="text-leaf-900 dark:text-turmeric-400 font-semibold underline decoration-turmeric-500/40 underline-offset-4">Araku</span> — explore 26 districts of unadulterated heritage food, grounded in verified traditions and zero internet guesswork.
            </p>

            {/* Quick Hub Badges with High Contrast & Rich Tinting */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs">
              <span className="px-3.5 py-1.5 rounded-chip bg-white/90 dark:bg-leaf-900/60 border border-leaf-200 dark:border-leaf-700 text-leaf-900 dark:text-leaf-100 font-semibold flex items-center gap-2 shadow-sm hover:border-turmeric-500 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400" /> 26 Districts
              </span>
              <span className="px-3.5 py-1.5 rounded-chip bg-white/90 dark:bg-leaf-900/60 border border-leaf-200 dark:border-leaf-700 text-leaf-900 dark:text-leaf-100 font-semibold flex items-center gap-2 shadow-sm hover:border-turmeric-500 transition-colors">
                <Compass className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400" /> 3 Distinct Food Zones
              </span>
              <span className="px-3.5 py-1.5 rounded-chip bg-guntur-50/90 dark:bg-guntur-950/40 border border-guntur-200 dark:border-guntur-800 text-guntur-700 dark:text-guntur-300 font-semibold flex items-center gap-2 shadow-sm hover:border-guntur-500 transition-colors">
                <Flame className="w-3.5 h-3.5 text-guntur-600 fill-guntur-600" /> Guntur Heat Scale
              </span>
              <span className="px-3.5 py-1.5 rounded-chip bg-leaf-50/90 dark:bg-leaf-950/40 border border-leaf-200 dark:border-leaf-800 text-leaf-800 dark:text-leaf-200 font-semibold flex items-center gap-2 shadow-sm hover:border-leaf-500 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-leaf-600 dark:text-leaf-400" /> 100% Sourced & Verified
              </span>
            </div>

            {/* Elevated Ruchi AI Assistant Capsule */}
            <div className="pt-3 max-w-xl mx-auto">
              <div className="bg-white/85 dark:bg-leaf-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-leaf-200/90 dark:border-leaf-700 shadow-sm">
                <Link
                  href="/ruchi"
                  className="flex items-center justify-between w-full bg-leaf-50/80 dark:bg-leaf-950/80 hover:bg-leaf-100/80 dark:hover:bg-leaf-900/80 text-leaf-950 dark:text-[#FAF9F5] border border-leaf-200/80 dark:border-leaf-700 hover:border-turmeric-500/60 rounded-xl p-2.5 pl-4 transition-all duration-300 group active:scale-[0.99] shadow-inner"
                >
                  <div className="flex items-center gap-3 text-sm overflow-hidden">
                    <RuchiOrb size="xs" state="idle" className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate font-medium text-leaf-950 dark:text-[#FAF9F5]">
                      <span className="text-turmeric-700 dark:text-turmeric-400 font-bold mr-1.5">Ask Ruchi:</span>
                      <span className="text-ink-600 dark:text-[#E8E4D3]/75">&ldquo;What makes Rayalaseema lunch unique?&rdquo;</span>
                    </span>
                  </div>
                  <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] text-xs font-black shadow-md group-hover:brightness-105 transition-all flex-shrink-0 ml-2">
                    Ask Ruchi ▶
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </SectionVisualBackdrop>
      </RevealOnScroll>

      {/* 2. THE 3 REGIONAL CUISINE KINGDOMS (GLASS FOLDER ARCHIVES) */}
      <RevealOnScroll direction="up" delay={0.1}>
        <SectionVisualBackdrop variant="tri-region-kingdoms">
          <RegionalGlassFolders />
        </SectionVisualBackdrop>
      </RevealOnScroll>

      {/* 3. THE 4 PILLARS OF ANDHRA FLAVOR - INTERACTIVE MAGIC BENTO */}
      <RevealOnScroll direction="up" delay={0.1}>
        <SectionVisualBackdrop variant="emerald-sanctum" containerClassName="border-white/80 dark:border-[#1F5A43]">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-turmeric-700 dark:text-turmeric-400">
              Taste Philosophy · రుచి సిద్ధాంతం
            </span>
            <h2 className="font-displayTe text-2xl sm:text-4xl font-extrabold text-leaf-950 dark:text-[#FAF9F5]">
              ఆంధ్ర రుచుల ఆరు స్తంభాలు
            </h2>
            <p className="text-sm text-ink-600 dark:text-[#E8E4D3]/80">
              The fundamental pillars of Andhra culinary intelligence — interactive heritage archive with live Scoville heat, heirloom millets, coastal clay pots, and artisanal sweets
            </p>
          </div>

          <TastePhilosophyBento locale={locale} />
        </SectionVisualBackdrop>
      </RevealOnScroll>

      {/* 4. BROWSE BY TRADITIONAL COURSE / CATEGORY */}
      <RevealOnScroll direction="up" delay={0.1}>
        <SectionVisualBackdrop
          variant="harvest-bhojanam"
          badge={
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-turmeric-700 dark:text-turmeric-400 uppercase tracking-wider">
              <UtensilsCrossed className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400" />
              <span>Course by Course Exploration</span>
            </div>
          }
          title="సాంప్రదాయ విభాగాల వారీగా అన్వేషించండి"
          subtitle="Browse by traditional course, tiffins, curries, and festival preparations across 26 districts"
        >
          <StaggerList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`/browse?category=${cat.slug}`}
                  className="group p-4 bg-white/90 dark:bg-leaf-900/60 hover:bg-turmeric-50/50 dark:hover:bg-leaf-800/80 border border-leaf-200/80 dark:border-leaf-700 hover:border-turmeric-500 rounded-card text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center justify-center space-y-2 shadow-sm card-fluid-hover active:scale-[0.97]"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </span>
                  <div>
                    <span className="font-displayTe text-base font-bold text-leaf-950 dark:text-[#FAF9F5] group-hover:text-leaf-800 dark:group-hover:text-turmeric-400 block transition-colors">
                      {cat.nameTe}
                    </span>
                    <span className="text-[11px] text-ink-600 dark:text-[#E8E4D3]/70 font-medium block">
                      {cat.nameEn}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </SectionVisualBackdrop>
      </RevealOnScroll>

      {/* 5. FEATURED AUTHENTIC DISHES */}
      <RevealOnScroll direction="up" delay={0.1}>
        <SectionVisualBackdrop
          variant="curated-feast"
          badge={
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-leaf-800 dark:text-turmeric-400 uppercase tracking-wider">
              <UtensilsCrossed className="w-4 h-4 text-turmeric-600 dark:text-turmeric-400" />
              <span>Curated Masterpieces</span>
            </div>
          }
          title="ప్రముఖ వంటకాలు · Featured Recipes"
          subtitle="Verified recipes documented with historical context, exact measurements, and sensory cues"
          headerAction={
            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-chip bg-leaf-100/90 dark:bg-leaf-900/80 text-leaf-900 dark:text-leaf-100 hover:bg-turmeric-500 hover:text-leaf-950 border border-leaf-200 dark:border-leaf-700 font-bold text-xs transition-all shadow-sm active:scale-95 group"
            >
              <span>View All Entries</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        >
          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {dishes.slice(0, 6).map((dish) => (
              <StaggerItem key={dish.slug}>
                <DishCard dish={dish} locale={locale} />
              </StaggerItem>
            ))}
          </StaggerList>
        </SectionVisualBackdrop>
      </RevealOnScroll>
    </CulinaryHeroWrapper>
  );
}
