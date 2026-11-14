'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import {
  Search,
  Compass,
  UtensilsCrossed,
  ArrowRight,
  Sparkles,
  Home,
  Flame,
  ChefHat,
  MapPin,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { RuchiOrb } from '@/components/ui/RuchiOrb';
import { PageTransition } from '@/components/ui/FluidMotion';
import { CulinaryWatermark } from '@/components/ui/SectionVisuals';

const POPULAR_DISHES = [
  { slug: 'pesarattu', nameEn: 'MLA Pesarattu', nameTe: 'ఎమ్మెల్యే పెసరట్టు', region: 'Vijayawada · Coastal', icon: '🥞', heat: '2/5' },
  { slug: 'gutti-vankaya-kura', nameEn: 'Gutti Vankaya Kura', nameTe: 'గుత్తి వంకాయ కూర', region: 'Godavari Delta', icon: '🍆', heat: '3/5' },
  { slug: 'ragi-sangati', nameEn: 'Ragi Sangati & Natu Kodi', nameTe: 'రాగి సంగటి & నాటుకోడి', region: 'Rayalaseema', icon: '🥣', heat: '5/5' },
  { slug: 'avakaya', nameEn: 'Avakaya Pachadi', nameTe: 'సాంప్రదాయ ఆవకాయ', region: 'Andhra Heritage', icon: '🫙', heat: '4/5' },
  { slug: 'bongu-kodi', nameEn: 'Araku Bongu Kodi', nameTe: 'అరకు బొంగు చికెన్', region: 'Alluri · Uttarandhra', icon: '🎋', heat: '3/5' },
  { slug: 'pootharekulu', nameEn: 'Atreyapuram Pootharekulu', nameTe: 'ఆత్రేయపురం పూతరేకులు', region: 'Konaseema', icon: '🍯', heat: '0/5' },
];

const COURSE_PILLS = [
  { id: 'tiffin', nameEn: 'Tiffins & Attu', nameTe: 'టిఫిన్లు & అట్లు', icon: '🥞' },
  { id: 'curries-and-kuras', nameEn: 'Curries & Iguru', nameTe: 'కూరలు & ఇగురు', icon: '🍛' },
  { id: 'pulusu-and-charu', nameEn: 'Pulusu & Stews', nameTe: 'పులుసులు & చారు', icon: '🥘' },
  { id: 'rice-and-meals', nameEn: 'Bhojanam & Biryani', nameTe: 'భోజనం & అన్నం', icon: '🍚' },
  { id: 'pickles-and-chutneys', nameEn: 'Avakaya & Pachadi', nameTe: 'పచ్చళ్ళు & ఊరగాయలు', icon: '🫙' },
  { id: 'sweets', nameEn: 'Heritage Sweets', nameTe: 'మిఠాయిలు', icon: '🍯' },
];

const REGIONS = [
  {
    id: 'coastal-andhra',
    nameEn: 'Coastal Andhra',
    nameTe: 'కోస్తా ఆంధ్ర',
    districtsEn: '12 Districts · Godavari Delta & Marine',
    districtsTe: '12 జిల్లాలు · గోదావరి డెల్టా & సముద్ర తీరం',
    tag: '🌊 Godavari Delta',
  },
  {
    id: 'rayalaseema',
    nameEn: 'Rayalaseema',
    nameTe: 'రాయలసీమ',
    districtsEn: '8 Districts · Arid Heartland & Millets',
    districtsTe: '8 జిల్లాలు · రాగి సంగటి & రాయలసీమ కారం',
    tag: '🌾 Arid Heartland',
  },
  {
    id: 'uttarandhra',
    nameEn: 'Uttarandhra',
    nameTe: 'ఉత్తరాంధ్ర',
    districtsEn: '8 Districts · Eastern Ghats & Tribal Spice',
    districtsTe: '8 జిల్లాలు · తూర్పు కనుమలు & అరకు రుచులు',
    tag: '🌿 Eastern Ghats',
  },
];

export default function NotFound() {
  const locale = useLocale();
  const isTe = locale === 'te';
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <PageTransition className="w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-5xl mx-auto space-y-8 sm:space-y-12">

        {/* =========================================================================
            HERO 404 SANCTUM CARD
           ========================================================================= */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#081C14]/95 dark:bg-[#061710]/95 backdrop-blur-2xl border border-[#1F5A43]/70 p-6 sm:p-14 text-[#FAF9F5] shadow-[0_25px_80px_rgba(8,28,20,0.55)] text-center">

          {/* Top Golden Accent Hairline */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B31B] to-transparent pointer-events-none" />

          {/* Multi-layered Atmospheric Glows */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-72 sm:h-96 pointer-events-none opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(242, 179, 27, 0.3) 0%, rgba(61, 143, 110, 0.18) 50%, transparent 80%)',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(229, 72, 77, 0.25) 0%, transparent 70%)',
            }}
          />

          {/* Authentic Watermark Silhouettes */}
          <div className="absolute -top-6 -right-6 pointer-events-none opacity-10 sm:opacity-15">
            <CulinaryWatermark motif="kolam" className="w-44 h-44 sm:w-56 sm:h-56 text-[#F2B31B]" />
          </div>
          <div className="absolute -bottom-8 -left-8 pointer-events-none opacity-10 sm:opacity-15">
            <CulinaryWatermark motif="rolu-mortar" className="w-40 h-40 sm:w-52 sm:h-52 text-[#F7C545]" />
          </div>
          <div className="absolute top-1/2 -right-10 -translate-y-1/2 pointer-events-none opacity-5 sm:opacity-10 hidden sm:block">
            <CulinaryWatermark motif="curry-leaf" className="w-36 h-36 text-leaf-400 rotate-45" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8">

            {/* Top Heritage Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D2E20]/90 border border-[#F2B31B]/50 text-[#FDE8A8] text-xs font-bold tracking-wider uppercase shadow-inner">
              <Flame className="w-3.5 h-3.5 text-[#E5484D] fill-[#E5484D] animate-pulse" />
              <span>{isTe ? 'రుచి దారి తప్పింది · 404' : '404 · Culinary Misdirection'}</span>
            </div>

            {/* Artisanal Terracotta Handi Illustration + 404 Typography */}
            <div className="space-y-4">
              <div className="relative inline-flex flex-col items-center justify-center">

                {/* Handi Pot with Rising Steam Silhouette */}
                <div className="relative w-32 h-28 sm:w-40 sm:h-32 mb-1 flex items-center justify-center">
                  {/* Subtle Hearth Embers Halo */}
                  <div className="absolute inset-0 bg-radial from-[#F2B31B]/25 via-[#CF8800]/10 to-transparent blur-xl pointer-events-none" />

                  {/* Artisanal Steaming Handi SVG */}
                  <svg
                    viewBox="0 0 160 130"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_8px_20px_rgba(242,179,27,0.35)]"
                    aria-hidden="true"
                  >
                    {/* Animated Steam Plumes */}
                    <path
                      d="M62 30 C58 20, 68 12, 62 4"
                      stroke="#FDE8A8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.8"
                      className="animate-pulse"
                    />
                    <path
                      d="M80 32 C74 18, 86 10, 80 2"
                      stroke="#F2B31B"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.95"
                      className="animate-pulse"
                      style={{ animationDuration: '1.8s' }}
                    />
                    <path
                      d="M98 30 C102 20, 92 12, 98 4"
                      stroke="#FDE8A8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.8"
                      className="animate-pulse"
                      style={{ animationDuration: '2.4s' }}
                    />

                    {/* Handi Pot Lid Lip */}
                    <ellipse cx="80" cy="42" rx="46" ry="7" fill="#CF8800" stroke="#F7C545" strokeWidth="2" />
                    <ellipse cx="80" cy="39" rx="32" ry="4" fill="#9C6300" />
                    <circle cx="80" cy="35" r="4" fill="#F2B31B" />

                    {/* Handi Pot Belly */}
                    <path
                      d="M34 42 C24 64, 22 92, 48 108 C60 115, 100 115, 112 108 C138 92, 136 64, 126 42 Z"
                      fill="url(#handiGradient)"
                      stroke="#F7C545"
                      strokeWidth="2"
                    />

                    {/* Authentic Brass Girdle Band */}
                    <path
                      d="M31 66 C48 74, 112 74, 129 66"
                      stroke="#F2B31B"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />

                    {/* Terracotta Decorative Base Plinth */}
                    <ellipse cx="80" cy="108" rx="30" ry="6" fill="#704700" stroke="#F2B31B" strokeWidth="1.5" />

                    {/* Traditional Brass Handles */}
                    <path
                      d="M28 50 C16 52, 16 64, 29 66"
                      stroke="#F2B31B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M132 50 C144 52, 144 64, 131 66"
                      stroke="#F2B31B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="handiGradient" x1="80" y1="42" x2="80" y2="114" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9C5E43" />
                        <stop offset="0.4" stopColor="#7A4B36" />
                        <stop offset="0.8" stopColor="#4A2B1E" />
                        <stop offset="1" stopColor="#331D14" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* 404 Headline with Luxury Gold Gradient */}
                <span className="text-7xl sm:text-9xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F2B31B] via-[#FFE28A] to-[#CF8800] drop-shadow-[0_4px_28px_rgba(242,179,27,0.35)]">
                  404
                </span>
              </div>

              {/* Bilingual Title */}
              <h1 className="font-displayTe text-2xl sm:text-4xl font-extrabold text-[#FAF9F5] leading-snug">
                {isTe ? 'ఈ గిన్నె ఖాళీగా ఉంది · వంటకం దారి తప్పింది!' : 'The Flavor Simmered Away · Recipe Not Found'}
              </h1>

              {/* Informative Storytelling Copy */}
              <p className="font-body text-sm sm:text-base text-[#E8E4D3]/90 leading-relaxed max-w-lg mx-auto">
                {isTe
                  ? 'మీరు వెతుకుతున్న వంటకం లేదా పేజీ మా 28 జిల్లాల రికార్డులలో లభించలేదు. బహుశా పేరు మార్చబడి ఉండవచ్చు లేదా ఇంకా పొయ్యిపై ఉడకాల్సి ఉంది!'
                  : "The page or heritage dish you are looking for isn't in our 28-district archives, or may have simmered into another traditional course."}
              </p>
            </div>

            {/* =========================================================================
                INSTANT SEARCH RECOVERY INPUT
               ========================================================================= */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-md mx-auto">
              <div className="relative group">
                <Search className="w-4 h-4 text-[#F2B31B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:scale-110 transition-transform" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isTe
                      ? 'మరేదైనా వంటకం వెతకండి (ఉదా: పెసరట్టు, గోంగూర, రాగి సంగటి)...'
                      : 'Search dishes (e.g. Pesarattu, Avakaya, Ragi Sangati)...'
                  }
                  className="w-full pl-10 pr-24 py-3 rounded-xl bg-[#0D2E20]/90 border border-[#2A7356]/80 text-sm text-[#FAF9F5] placeholder:text-[#E8E4D3]/50 focus:outline-none focus:border-[#F2B31B] focus:ring-2 focus:ring-[#F2B31B]/40 shadow-inner transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] text-xs font-black shadow-md hover:brightness-110 hover:scale-105 active:scale-95 transition-all"
                >
                  {isTe ? 'వెతుకు' : 'Find'}
                </button>
              </div>
            </form>

            {/* =========================================================================
                PRIMARY NAVIGATION ACTIONS
               ========================================================================= */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] font-black text-sm shadow-[0_4px_20px_rgba(242,179,27,0.3)] hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-all group"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{isTe ? 'ప్రధాన వేదిక (హోమ్)' : 'Return to Feast (Home)'}</span>
              </Link>

              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#154231] hover:bg-[#1A4F3B] border border-[#2A7356] text-[#FAF9F5] font-bold text-sm shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#F7C545]" />
                <span>{isTe ? '3D వంటకాల గ్యాలరీ' : 'Explore Recipe Gallery'}</span>
              </Link>

              <Link
                href="/pantry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D2E20]/80 hover:bg-[#103226] border border-[#1F5A43] text-[#FDE8A8] font-semibold text-sm shadow-sm active:scale-95 transition-all"
              >
                <Layers className="w-4 h-4 text-[#F2B31B]" />
                <span>{isTe ? 'పదార్థాల గుర్తింపు (Pantry)' : 'Pantry Matcher'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            QUICK TRADITIONAL COURSE RESCUE PILLS
           ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-800 dark:text-[#F7C545] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#CF8800]" />
              <span>{isTe ? 'సంప్రదాయ విభాగాలు (కోర్సులు)' : 'Browse by Traditional Course'}</span>
            </span>
            <Link
              href="/browse"
              className="text-xs font-semibold text-leaf-700 dark:text-[#E8E4D3] hover:text-[#CF8800] dark:hover:text-[#F2B31B] flex items-center gap-1 transition-colors"
            >
              <span>{isTe ? 'మొత్తం చూడండి' : 'View all'}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {COURSE_PILLS.map((pill) => (
              <Link
                key={pill.id}
                href={`/browse?category=${pill.id}`}
                className="group p-3 bg-white/90 dark:bg-[#103226]/85 border border-leaf-200/80 dark:border-[#2A7356]/80 rounded-xl text-center hover:border-[#F2B31B] hover:bg-leaf-50/70 dark:hover:bg-[#154231] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2.5 shadow-sm active:scale-95"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{pill.icon}</span>
                <div className="text-left">
                  <span className="block font-displayTe text-xs font-bold text-ink-900 dark:text-[#FAF9F5] group-hover:text-leaf-800 dark:group-hover:text-[#F7C545] line-clamp-1 transition-colors">
                    {isTe ? pill.nameTe : pill.nameEn}
                  </span>
                  <span className="block text-[10px] text-ink-500 dark:text-[#E8E4D3]/60">
                    {isTe ? 'వంటకాలు' : 'Recipes'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =========================================================================
            ASK RUCHI AI RESCUE CARD
           ========================================================================= */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#081C14] via-[#103226] to-[#081C14] border border-[#2A7356] rounded-2xl p-5 sm:p-7 shadow-[0_12px_40px_rgba(8,28,20,0.35)] flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Golden Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#F2B31B]/15 to-transparent blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 relative z-10">
            <RuchiOrb size="md" state="thinking" className="flex-shrink-0" />
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0D2E20] border border-[#F2B31B]/40 text-[#FDE8A8] text-[10px] font-bold uppercase tracking-wider">
                <ChefHat className="w-3 h-3 text-[#F2B31B]" />
                <span>{isTe ? 'సహాయక చెఫ్' : 'AI Culinary Companion'}</span>
              </div>
              <h2 className="font-displayTe text-lg sm:text-xl font-bold text-[#FAF9F5]">
                {isTe ? 'రుచి AI చెఫ్‌ను అడగండి · దారి తప్పిన వంటకం కనుక్కోండి' : 'Lost in the Feast? Ask Ruchi AI Chef'}
              </h2>
              <p className="text-xs sm:text-sm text-[#E8E4D3]/80 max-w-xl leading-relaxed">
                {isTe
                  ? 'ఆంధ్రప్రదేశ్ 28 జిల్లాల సాంప్రదాయ వంటకాలు, రహస్య మసాలాలు మరియు తయారీ పద్ధతులు రుచికి తెలుసు. మీకు కావాల్సిన పదార్థాలు లేదా రుచిని అడగండి.'
                  : 'Ruchi knows heirloom ingredients, preparation rituals, and forgotten dishes across all 28 districts. Ask for any recipe or flavor profile.'}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 relative z-10">
            <Link
              href="/ruchi"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] text-xs font-black shadow-lg hover:brightness-110 active:scale-95 transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>{isTe ? 'రుచితో మాట్లాడండి ▶' : 'Chat with Ruchi ▶'}</span>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            ANDHRA 3 REGIONS EXPLORER
           ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-800 dark:text-[#F7C545] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#CF8800]" />
              <span>{isTe ? 'ఆంధ్రప్రదేశ్ 3 ఆహార ప్రాంతాలు' : 'Explore by 3 Culinary Regions'}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {REGIONS.map((reg) => (
              <Link
                key={reg.id}
                href={`/browse?region=${reg.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white/90 dark:bg-[#0D2E20]/90 border border-leaf-200/80 dark:border-[#2A7356]/80 p-5 hover:border-[#F2B31B] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-sm active:scale-98"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-leaf-100 dark:bg-[#154231] text-leaf-900 dark:text-[#FDE8A8] border border-leaf-300/50 dark:border-[#2A7356]/60">
                    {reg.tag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-leaf-500 dark:text-[#E8E4D3]/60 group-hover:text-[#F2B31B] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-displayTe text-base font-bold text-ink-900 dark:text-[#FAF9F5] group-hover:text-leaf-800 dark:group-hover:text-[#F7C545] transition-colors">
                  {isTe ? reg.nameTe : reg.nameEn}
                </h3>
                <p className="text-xs text-ink-600 dark:text-[#E8E4D3]/70 mt-1">
                  {isTe ? reg.districtsTe : reg.districtsEn}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* =========================================================================
            FEATURED ANDHRA MASTERPIECES
           ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-leaf-200/80 dark:border-leaf-800/80 pb-2.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-leaf-800 dark:text-[#F7C545] flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#CF8800]" />
              <span>{isTe ? 'ప్రముఖ సాంప్రదాయ వంటకాలు' : 'Curated Andhra Masterpieces'}</span>
            </h2>
            <Link
              href="/browse"
              className="text-xs font-semibold text-leaf-700 dark:text-[#E8E4D3] hover:text-[#CF8800] dark:hover:text-[#F2B31B] flex items-center gap-1 transition-colors"
            >
              <span>{isTe ? 'మొత్తం 30+ చూడండి' : 'View all 30+'}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {POPULAR_DISHES.map((dish) => (
              <Link
                key={dish.slug}
                href={`/dishes/${dish.slug}`}
                className="group p-3.5 bg-white/90 dark:bg-[#103226]/80 border border-leaf-200/80 dark:border-[#2A7356] rounded-xl text-center hover:border-[#F2B31B] hover:bg-leaf-50/70 dark:hover:bg-[#154231] transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center justify-center space-y-1.5 shadow-sm active:scale-95"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {dish.icon}
                </span>
                <span className="font-displayTe text-xs font-bold text-ink-900 dark:text-[#FAF9F5] group-hover:text-leaf-800 dark:group-hover:text-[#F7C545] line-clamp-1 transition-colors">
                  {isTe ? dish.nameTe : dish.nameEn}
                </span>
                <span className="text-[10px] text-ink-500 dark:text-[#E8E4D3]/60 line-clamp-1">
                  {dish.region}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
