'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import DriftWall, { DriftWallItem } from '@/components/ui/DriftWall';
import { Dish } from '@/lib/json-db';
import { Search, Compass, Flame, Filter, ArrowRight, X, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { StaggerList, StaggerItem, AnimatedIndicator } from '@/components/ui/FluidMotion';

interface DriftWallGalleryProps {
  dishes: Dish[];
  locale: string;
}

const REGION_IMAGE_MAP: Record<string, string> = {
  'coastal-andhra': 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341033/APFOOD/region-coastal-andhra.jpg',
  'rayalaseema': 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341035/APFOOD/region-rayalaseema.jpg',
  'uttarandhra': 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341037/APFOOD/region-uttarandhra.jpg',
};

const CLOUDINARY_HERO = 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg';

const getDishImage = (dish: Dish): string => {
  if (dish.image && dish.image.startsWith('https://')) return dish.image;
  return REGION_IMAGE_MAP[dish.region] || CLOUDINARY_HERO;
};

export const DriftWallGallery: React.FC<DriftWallGalleryProps> = ({ dishes, locale }) => {
  const isTe = locale === 'te';
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredDish, setHoveredDish] = useState<Dish | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize native fullscreen state with component state & lock body scroll
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNativeFs = !!document.fullscreenElement;
      setIsFullscreen(isNativeFs);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => { });
        }
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);

    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      if (canvasContainerRef.current) {
        if (canvasContainerRef.current.requestFullscreen) {
          try {
            await canvasContainerRef.current.requestFullscreen();
          } catch {
            // Fallback to CSS fullscreen
          }
        }
      }
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        try {
          await document.exitFullscreen();
        } catch {
          // Ignore
        }
      }
      setIsFullscreen(false);
    }
  };

  const categories = [
    { id: 'all', nameEn: 'All Categories', nameTe: 'అన్ని విభాగాలు' },
    { id: 'tiffin', nameEn: 'Tiffins & Attu', nameTe: 'టిఫిన్లు & అట్లు' },
    { id: 'rice-and-meals', nameEn: 'Bhojanam & Rice', nameTe: 'భోజనం & అన్నం' },
    { id: 'curries-and-kuras', nameEn: 'Curries & Iguru', nameTe: 'కూరలు & ఇగురు' },
    { id: 'pappu-and-dals', nameEn: 'Dals & Pappu', nameTe: 'పప్పులు & చారు' },
    { id: 'pulusu-and-charu', nameEn: 'Pulusu & Stews', nameTe: 'పులుసులు & చారు' },
    { id: 'pickles-and-chutneys', nameEn: 'Avakaya & Relishes', nameTe: 'ఆవకాయ & పచ్చళ్ళు' },
    { id: 'sweets', nameEn: 'Heritage Sweets', nameTe: 'మిఠాయిలు' },
    { id: 'snacks-and-street-food', nameEn: 'Street Snacks', nameTe: 'వీధి తినుబండారాలు' },
  ];

  const regions = [
    { id: 'all', nameEn: 'All 26 Districts', nameTe: '26 జిల్లాలు' },
    { id: 'coastal-andhra', nameEn: 'Coastal Andhra', nameTe: 'కోస్తా ఆంధ్ర' },
    { id: 'rayalaseema', nameEn: 'Rayalaseema', nameTe: 'రాయలసీమ' },
    { id: 'uttarandhra', nameEn: 'Uttarandhra', nameTe: 'ఉత్తరాంధ్ర' },
  ];

  const filteredDishes = useMemo(() => {
    return dishes.filter((d) => {
      if (selectedRegion !== 'all' && d.region !== selectedRegion) return false;
      if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = d.nameEn.toLowerCase().includes(q) || d.nameTe.includes(q);
        const matchDesc = d.descriptionEn.toLowerCase().includes(q) || d.descriptionTe.includes(q);
        const matchIngredient = d.ingredients.some((i) => i.name.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchIngredient) return false;
      }
      return true;
    });
  }, [dishes, selectedRegion, selectedCategory, searchQuery]);

  const wallItems: DriftWallItem[] = useMemo(() => {
    const list = filteredDishes.length > 0 ? filteredDishes : dishes;
    return list.map((dish) => {
      const img = getDishImage(dish);
      const heatEmoji = '🔥'.repeat(Math.min(5, Math.max(1, dish.heatLevel)));
      const regionLabel =
        dish.region === 'coastal-andhra'
          ? (isTe ? 'కోస్తా' : 'Coastal')
          : dish.region === 'rayalaseema'
            ? (isTe ? 'సీమ' : 'Seema')
            : (isTe ? 'ఉత్తరాంధ్ర' : 'Uttarandhra');

      return {
        image: img,
        title: isTe ? dish.nameTe : dish.nameEn,
        subtitle: isTe ? dish.nameEn : dish.nameTe,
        badge: `${regionLabel} · ${heatEmoji}`,
        href: `/${locale}/dishes/${dish.slug}`,
      };
    });
  }, [filteredDishes, dishes, locale, isTe]);

  return (
    <div className="w-full space-y-8">
      {/* 3D DRIFT WALL HERO CANVAS (WITH FULLSCREEN CAPABILITY) */}
      <div
        ref={canvasContainerRef}
        className={
          isFullscreen
            ? 'fixed inset-0 z-50 w-screen h-screen bg-[#081C14] flex flex-col overflow-hidden transition-all duration-300'
            : 'relative w-full h-[540px] sm:h-[620px] rounded-hero overflow-hidden bg-gradient-to-b from-leaf-950 via-leaf-900 to-leaf-950 border border-leaf-700/60 shadow-2xl flex flex-col transition-all duration-300'
        }
      >
        {/* Subtle Ambient Backing Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#eeab23_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* FULLSCREEN MODE FLOATING HEADER (SEARCH BAR & CONTROLS) */}
        {isFullscreen ? (
          <header className="relative z-40 w-full px-4 sm:px-8 py-4 bg-gradient-to-b from-[#081C14]/95 via-[#081C14]/85 to-transparent backdrop-blur-md border-b border-[#F2B31B]/20 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl">
            {/* Gallery Title & Live Count */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#F2B31B]/15 border border-[#F2B31B]/40 text-[#F2B31B]">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h2 className="font-displayTe text-base sm:text-lg font-bold text-[#FAF9F5] leading-tight">
                    {isTe ? 'సజీవ ఆంధ్ర వంటల ప్రదర్శన' : 'Living Andhra Culinary Gallery'}
                  </h2>
                  <p className="text-[11px] text-[#F7C545] font-semibold">
                    {isTe ? 'పూర్తి తెర అన్వేషణ' : 'Fullscreen 3D Exploration'} ·{' '}
                    <span className="text-[#E8E4D3] font-medium">
                      {filteredDishes.length} {isTe ? 'వంటకాలు' : 'dishes'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Mobile-only Exit Button */}
              <button
                onClick={toggleFullscreen}
                className="md:hidden p-2 rounded-xl bg-[#154231] text-[#FAF9F5] border border-[#2A7356]"
                title={isTe ? 'నిష్క్రమించు' : 'Exit Fullscreen'}
              >
                <Minimize2 className="w-4 h-4 text-[#F2B31B]" />
              </button>
            </div>

            {/* FULLSCREEN REAL-TIME SEARCH BAR */}
            <div className="relative w-full max-w-xl">
              <Search className="w-4 h-4 text-[#F2B31B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isTe
                    ? '3D గ్యాలరీలో వెతకండి (ఉదా: పెసరట్టు, గోంగూర, రాగి సంగటి)...'
                    : 'Search 3D gallery by dish, spice, district, or ingredient...'
                }
                autoFocus
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#103226]/90 border border-[#F2B31B]/45 text-sm text-[#FAF9F5] placeholder:text-[#E8E4D3]/50 focus:outline-none focus:ring-2 focus:ring-[#F2B31B] focus:border-[#F2B31B] shadow-2xl transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FAF9F5]/60 hover:text-[#FAF9F5] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Region Selector & Exit Button (Desktop) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#103226]/80 p-1 rounded-xl border border-[#2A7356]">
                {regions.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${selectedRegion === reg.id
                      ? 'bg-[#F2B31B] text-[#081C14] font-bold shadow-sm'
                      : 'text-[#FAF9F5]/80 hover:text-[#FAF9F5] hover:bg-[#154231]'
                      }`}
                  >
                    {isTe ? reg.nameTe : reg.nameEn}
                  </button>
                ))}
              </div>

              {/* Exit Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#154231] hover:bg-[#1A4F3B] border border-[#2A7356] hover:border-[#F2B31B]/60 text-[#FAF9F5] text-xs font-bold shadow-lg transition-all active:scale-95 group"
                title="Press ESC to exit"
              >
                <Minimize2 className="w-4 h-4 text-[#F2B31B] group-hover:scale-110 transition-transform" />
                <span>{isTe ? 'నిష్క్రమించు' : 'Exit'}</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-[#081C14] text-[#E8E4D3] border border-[#2A7356] rounded font-mono">
                  ESC
                </kbd>
              </button>
            </div>
          </header>
        ) : (
          /* STANDARD MODE: FULLSCREEN TRIGGER BUTTON */
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#081C14]/90 hover:bg-[#103226] backdrop-blur-md border border-[#F2B31B]/50 hover:border-[#F2B31B] text-[#FAF9F5] text-xs font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 group cursor-pointer"
              title={isTe ? 'పూర్తి తెర మోడ్ (Full Screen)' : 'Expand to Full Screen Mode'}
            >
              <Maximize2 className="w-4 h-4 text-[#F2B31B] group-hover:scale-110 transition-transform animate-pulse" />
              <span className="hidden sm:inline">
                {isTe ? 'పూర్తి తెర (Full Screen)' : 'Full Screen Gallery'}
              </span>
            </button>
          </div>
        )}

        {/* Floating DriftWall Component */}
        <div className="relative w-full h-full flex-1 min-h-0">
          <DriftWall
            items={wallItems}
            columns={isFullscreen ? (isMobile ? 3 : 6) : (isMobile ? 2 : 5)}
            tileWidth={isFullscreen ? (isMobile ? 160 : 250) : (isMobile ? 140 : 230)}
            tileHeight={isFullscreen ? (isMobile ? 110 : 165) : (isMobile ? 95 : 150)}
            gap={isFullscreen ? (isMobile ? 10 : 20) : (isMobile ? 10 : 18)}
            tilt={isMobile ? 0 : 5}
            turn={isMobile ? 0 : -12}
            perspective={isFullscreen ? 1300 : (isMobile ? 800 : 1100)}
            depth={isFullscreen ? 120 : (isMobile ? 40 : 100)}
            speed={isMobile ? 24 : 36}
            direction="up"
            variance={0.4}
            parallax={isMobile ? 0.3 : 0.65}
            lift={isMobile ? 30 : 60}
            fade={0.15}
            dim={0.7}
            overlayColor="#61cc8491"
            className="w-full h-full"
          />

          {/* Empty search results notification inside Fullscreen */}
          {filteredDishes.length === 0 && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 pointer-events-none">
              <div className="p-6 rounded-2xl bg-[#081C14]/95 border border-[#F2B31B]/50 text-center space-y-3 pointer-events-auto shadow-2xl backdrop-blur-md max-w-md mx-auto">
                <p className="text-sm font-semibold text-[#FAF9F5]">
                  {isTe
                    ? `"${searchQuery}" శోధనకు సరిపోలిన వంటకాలు లేవు.`
                    : `No dishes found matching "${searchQuery}".`}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-[#F2B31B] text-[#081C14] text-xs font-bold hover:bg-[#FDE8A8] transition-colors shadow-md"
                >
                  {isTe ? 'శోధనను తొలగించండి (Clear)' : 'Clear Search'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Floating Gradient Rim & Interaction Guide Pill */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-leaf-950 to-transparent pointer-events-none flex items-end justify-center pb-4">
          {isFullscreen && (
            <div className="px-4 py-1.5 rounded-full bg-[#081C14]/85 backdrop-blur-md border border-[#F2B31B]/30 text-[11px] font-semibold text-[#E8E4D3] shadow-2xl flex items-center gap-2">
              <span>
                🖱️{' '}
                {isTe
                  ? 'మౌస్ కదిపి 3D వాల్‌ను పరిశీలించండి · క్లిక్ చేసి వంటకం చూడండి'
                  : 'Move mouse to tilt & pan · Click any tile to explore recipe'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* FILTER & DISCOVERY BAR */}
      <div className="bg-white/95 dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 rounded-card p-6 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Real-Time Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-leaf-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTe
                  ? 'వంటకం, పప్పు, గోంగూర, రొయ్యలు లేదా పదార్థాల పేరుతో వెతకండి...'
                  : 'Search by dish name, gongura, tamarind, ragi, or ingredients...'
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-input bg-rice-50 dark:bg-leaf-900/90 border border-leaf-200/90 dark:border-leaf-700 text-sm text-ink-900 dark:text-rice-50 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-turmeric-500 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-900 dark:hover:text-rice-50"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Tabs with Fluid Sliding Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {regions.map((reg) => {
              const isActive = selectedRegion === reg.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`relative px-3.5 py-1.5 rounded-chip text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${isActive
                    ? 'text-leaf-950 font-bold'
                    : 'bg-rice-100 dark:bg-leaf-900 text-ink-800 dark:text-rice-50 border border-leaf-200/60 dark:border-leaf-800 hover:bg-turmeric-100 hover:text-turmeric-900'
                    }`}
                >
                  {isActive && (
                    <AnimatedIndicator
                      layoutId="driftWallRegionIndicator"
                      className="absolute inset-0 bg-turmeric-500 rounded-chip shadow-md -z-0"
                    />
                  )}
                  <span className="relative z-10">{isTe ? reg.nameTe : reg.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills with Fluid Sliding Indicator */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-rice-50/70 flex items-center gap-1 flex-shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-turmeric-600" />
            {isTe ? 'వర్గాలు:' : 'Courses:'}
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3 py-1 rounded-chip text-xs whitespace-nowrap transition-colors duration-200 ${isActive
                  ? 'text-rice-50 font-bold'
                  : 'bg-rice-50 dark:bg-leaf-950 border border-leaf-200/80 dark:border-leaf-800 text-ink-800 dark:text-rice-50/80 hover:border-turmeric-500 hover:text-leaf-900'
                  }`}
              >
                {isActive && (
                  <AnimatedIndicator
                    layoutId="driftWallCategoryIndicator"
                    className="absolute inset-0 bg-leaf-800 rounded-chip shadow-sm -z-0"
                  />
                )}
                <span className="relative z-10">{isTe ? cat.nameTe : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DISH ENTRIES GRID ARCHIVE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-leaf-200/80 dark:border-leaf-800 pb-3">
          <h3 className="text-lg font-bold text-ink-900 dark:text-rice-50 font-displayTe">
            {isTe
              ? `శోధన ఫలితాలు (${filteredDishes.length} వంటకాలు)`
              : `Catalog Entries (${filteredDishes.length} Dishes)`}
          </h3>
          <span className="text-xs text-ink-600 dark:text-rice-50/70 font-medium">
            {isTe ? '100% సాంప్రదాయ ప్రమాణాలతో నమోదు చేయబడినవి' : '100% Verified Fieldwork & Heritage Standards'}
          </span>
        </div>

        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-leaf-950 rounded-card border border-leaf-200/80 dark:border-leaf-800 space-y-3">
            <p className="text-ink-600 dark:text-rice-50/70 text-sm">
              {isTe
                ? 'ఈ శోధన ప్రమాణాలకు సరిపోలిన వంటకాలు లేవు. దయచేసి శోధన పదాన్ని మార్చి చూడండి.'
                : 'No heritage dishes found matching your filters. Try clearing your search.'}
            </p>
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-turmeric-500 text-leaf-950 font-bold rounded-chip text-xs hover:bg-turmeric-400 transition-colors shadow-sm active:scale-95"
            >
              {isTe ? 'అన్ని ఫిల్టర్లు తొలగించండి' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => {
              const img = getDishImage(dish);
              return (
                <StaggerItem key={dish.slug}>
                  <Link
                    href={`/dishes/${dish.slug}`}
                    className="group flex flex-col bg-white dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 rounded-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-turmeric-500 card-fluid-hover active:scale-[0.985]"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-leaf-950">
                      <Image
                        src={img}
                        alt={dish.nameEn}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/95 via-leaf-950/40 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded-chip bg-leaf-950/85 backdrop-blur-md border border-turmeric-500/40 text-turmeric-400 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {dish.region.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-rice-50">
                        <span className="font-semibold text-turmeric-400">
                          {'🔥'.repeat(Math.min(5, Math.max(1, dish.heatLevel)))}
                        </span>
                        <span className="text-[11px] font-medium text-rice-50/85">
                          {dish.prepTimeMinutes + dish.cookTimeMinutes} mins
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between space-y-3 bg-white dark:bg-leaf-900">
                      <div>
                        <h4 className="font-displayTe text-base font-bold text-ink-900 dark:text-rice-50 group-hover:text-turmeric-600 dark:group-hover:text-turmeric-400 transition-colors">
                          {dish.nameTe}
                        </h4>
                        <p className="font-display text-xs font-semibold text-leaf-800 dark:text-turmeric-400">
                          {dish.nameEn}
                        </p>
                        <p className="text-[11px] text-ink-600 dark:text-rice-50/75 mt-1 line-clamp-2 leading-relaxed">
                          {isTe ? dish.descriptionTe : dish.descriptionEn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-leaf-100 dark:border-leaf-800 flex items-center justify-between text-xs font-semibold text-leaf-800 dark:text-turmeric-400">
                        <span>{isTe ? 'విధానం & చరిత్ర' : 'Recipe & Heritage'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerList>
        )}
      </div>
    </div>
  );
};
