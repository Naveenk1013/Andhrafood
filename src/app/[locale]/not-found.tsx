'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { Search, Compass, UtensilsCrossed, ArrowRight, Sparkles, Home, Flame } from 'lucide-react';
import { RuchiOrb } from '@/components/ui/RuchiOrb';
import { PageTransition } from '@/components/ui/FluidMotion';

const POPULAR_DISHES = [
  { slug: 'pesarattu', nameEn: 'MLA Pesarattu', nameTe: 'ఎమ్మెల్యే పెసరట్టు', region: 'Vijayawada / Coastal', icon: '🥞' },
  { slug: 'gutti-vankaya-kura', nameEn: 'Gutti Vankaya Kura', nameTe: 'గుత్తి వంకాయ కూర', region: 'Godavari Delta', icon: '🍆' },
  { slug: 'ragi-sangati', nameEn: 'Ragi Sangati', nameTe: 'రాగి సంగటి', region: 'Rayalaseema', icon: '🥣' },
  { slug: 'avakaya', nameEn: 'Avakaya Pickle', nameTe: 'ఆవకాయ పచ్చడి', region: 'Andhra Heritage', icon: '🫙' },
  { slug: 'bongu-kodi', nameEn: 'Bongu Kodi', nameTe: 'బొంగు చికెన్', region: 'Araku Valley', icon: '🎋' },
  { slug: 'pootharekulu', nameEn: 'Pootharekulu', nameTe: 'ఆత్రేయపురం పూతరేకులు', region: 'Konaseema', icon: '🍯' },
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
    <PageTransition className="w-full min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-4xl mx-auto space-y-10">
        {/* HERO 404 BANNER CARD */}
        <div
          className="relative overflow-hidden rounded-hero bg-white/80 backdrop-blur-xl border border-white/90 p-8 sm:p-14 text-ink-900 shadow-[0_20px_60px_rgba(31,90,67,0.08)] text-center"
        >
          {/* Top Golden Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B31B]/70 to-transparent pointer-events-none" />

          {/* Ambient Warm Golden & Herbal Radial Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 pointer-events-none opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(242, 179, 27, 0.25) 0%, rgba(61, 143, 110, 0.12) 50%, transparent 80%)',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            {/* Top Amber Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-chip bg-leaf-100/80 border border-leaf-300 text-leaf-900 text-xs font-bold tracking-wider uppercase shadow-xs">
              <Flame className="w-4 h-4 text-chilli-600 fill-chilli-600 animate-pulse" />
              <span>{isTe ? 'రుచి దారి తప్పింది · 404' : '404 · Culinary Misdirection'}</span>
            </div>

            {/* Clay Pot Visual & Numerical 404 Title */}
            <div className="space-y-3">
              <div className="relative inline-block">
                <span className="text-7xl sm:text-9xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-turmeric-600 via-leaf-800 to-turmeric-700 drop-shadow-[0_4px_16px_rgba(242,179,27,0.2)]">
                  404
                </span>
                {/* Steaming clay pot / dish aroma icon */}
                <span className="absolute -top-3 -right-6 text-4xl sm:text-5xl animate-bounce">
                  🍲
                </span>
              </div>

              <h1 className="font-displayTe text-2xl sm:text-4xl font-extrabold text-leaf-950 leading-snug">
                {isTe ? 'ఈ గిన్నె ఖాళీగా ఉంది · వంటకం దారి తప్పింది!' : 'The Flavor Simmered Away · Recipe Not Found'}
              </h1>
              <p className="font-body text-sm sm:text-base text-ink-700 leading-relaxed max-w-lg mx-auto">
                {isTe
                  ? 'మీరు వెతుకుతున్న వంటకం లేదా పేజీ మా 26 జిల్లాల రికార్డులలో లభించలేదు. బహుశా పేరు మార్చబడి ఉండవచ్చు లేదా ఇంకా పొయ్యిపై ఉడకాల్సి ఉంది!'
                  : "The page or authentic recipe you are looking for isn't in our 26-district archives, or may have drifted into a different traditional course."}
              </p>
            </div>

            {/* INSTANT RECIPE SEARCH RECOVERY INPUT */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-md mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-turmeric-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isTe
                      ? 'మరేదైనా వంటకం కోసం వెతకండి (ఉదా: పెసరట్టు, గోంగూర)...'
                      : 'Search dishes (e.g. Pesarattu, Avakaya, Ragi Sangati)...'
                  }
                  className="w-full pl-10 pr-24 py-3 rounded-xl bg-white border border-leaf-200/90 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-turmeric-500 shadow-sm transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  {isTe ? 'వెతుకు' : 'Find'}
                </button>
              </div>
            </form>

            {/* PRIMARY CALL TO ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] font-extrabold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all group"
              >
                <Home className="w-4 h-4" />
                <span>{isTe ? 'ప్రధాన విందు (హోమ్)' : 'Return to Feast (Home)'}</span>
              </Link>

              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-leaf-850 hover:bg-leaf-900 border border-leaf-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                <UtensilsCrossed className="w-4 h-4 text-turmeric-400" />
                <span>{isTe ? 'అన్ని వంటకాలు అన్వేషించండి' : 'Browse All Dishes'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ASK RUCHI AI RESCUE BAR */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-5 shadow-[0_8px_30px_rgba(31,90,67,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <RuchiOrb size="sm" state="thinking" className="flex-shrink-0" />
            <div>
              <h3 className="font-displayTe text-base font-bold text-leaf-950">
                {isTe ? 'రుచి AI చెఫ్‌ను అడగండి' : 'Lost your recipe? Ask Ruchi AI'}
              </h3>
              <p className="text-xs text-ink-600">
                {isTe
                  ? '“ఈ వంటకం తయారీ విధానం లేదా పదార్థాలు చెప్పండి” అని రుచిని అడగవచ్చు.'
                  : 'Ruchi knows secret heirloom recipes and techniques across all 26 districts.'}
              </p>
            </div>
          </div>

          <Link
            href="/ruchi"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-leaf-850 hover:bg-leaf-900 border border-leaf-700 text-white text-xs font-bold transition-all shadow-md group active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-turmeric-400 group-hover:rotate-12 transition-transform" />
            <span>{isTe ? 'రుచితో మాట్లాడండి ▶' : 'Chat with Ruchi ▶'}</span>
          </Link>
        </div>

        {/* POPULAR DISHES SUGGESTIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-leaf-200/80 dark:border-leaf-800 pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-leaf-800 dark:text-[#F7C545] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#CF8800]" />
              <span>{isTe ? 'ప్రముఖ సాంప్రదాయ వంటకాలు' : 'Or Explore These Andhra Masterpieces'}</span>
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
                className="group p-3 bg-white/90 dark:bg-[#103226]/80 border border-leaf-200/80 dark:border-[#2A7356] rounded-xl text-center hover:border-[#F2B31B] hover:bg-leaf-50/70 dark:hover:bg-[#154231] transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center justify-center space-y-1.5 shadow-sm active:scale-95"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
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
