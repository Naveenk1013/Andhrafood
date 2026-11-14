"use client";

import React from "react";
import GlassFolder, { FolderFile } from "@/components/ui/glass-folder-cards";
import { Compass, Flame, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export function RegionalGlassFolders() {
  const locale = useLocale();
  const isTe = locale === "te";
  const [folderWidth, setFolderWidth] = React.useState(300);

  React.useEffect(() => {
    const updateWidth = () => {
      if (typeof window !== "undefined") {
        const w = window.innerWidth;
        if (w < 360) {
          setFolderWidth(Math.max(260, w - 32));
        } else if (w < 420) {
          setFolderWidth(Math.min(300, w - 36));
        } else if (w < 640) {
          setFolderWidth(320);
        } else {
          setFolderWidth(340);
        }
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const coastalFiles: FolderFile[] = [
    {
      name: "Pesarattu",
      meta: "Coastal Tiffin · Heat 2/5",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792309950/APFOOD/pesarattu.jpg",
      href: `/${locale}/dishes/pesarattu`,
    },
    {
      name: "Chepala Pulusu",
      meta: "Godavari Fish Curry · Heat 4/5",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310331/APFOOD/chepala-pulusu.jpg",
      href: `/${locale}/dishes/chepala-pulusu`,
    },
    {
      name: "Pootharekulu",
      meta: "Atreyapuram Paper Sweet",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310402/APFOOD/pootharekulu.jpg",
      href: `/${locale}/dishes/pootharekulu`,
    },
    {
      name: "Gongura Mutton",
      meta: "Iconic Sorrel Country Meat",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310789/APFOOD/gongura-mutton.jpg",
      href: `/${locale}/dishes/gongura-mutton`,
    },
  ];

  const rayalaseemaFiles: FolderFile[] = [
    {
      name: "Ragi Sangati",
      meta: "Finger Millet Mudda with Ghee",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310240/APFOOD/ragi-sangati.jpg",
      href: `/${locale}/dishes/ragi-sangati`,
    },
    {
      name: "Gutti Vankaya Kura",
      meta: "Stuffed Eggplant · Heat 3/5",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310053/APFOOD/gutti-vankaya-kura.jpg",
      href: `/${locale}/dishes/gutti-vankaya-kura`,
    },
    {
      name: "Natu Kodi Pulusu",
      meta: "Fiery Country Chicken · Heat 5/5",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792332895/APFOOD/natu-kodi-pulusu.jpg",
      href: `/${locale}/dishes/natu-kodi-pulusu`,
    },
    {
      name: "Uggani",
      meta: "Spiced Puffed Rice & Bajji",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792332982/APFOOD/uggani.jpg",
      href: `/${locale}/dishes/uggani`,
    },
  ];

  const uttarandhraFiles: FolderFile[] = [
    {
      name: "Bongu Kodi",
      meta: "Araku Bamboo Chicken · Woodfire",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310282/APFOOD/bongu-kodi.jpg",
      href: `/${locale}/dishes/bongu-kodi`,
    },
    {
      name: "Bellam Pulusu",
      meta: "Sweet Jaggery & Mustard Stew",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333621/APFOOD/bellam-pulusu.jpg",
      href: `/${locale}/dishes/bellam-pulusu`,
    },
    {
      name: "Madugula Halwa",
      meta: "130-Year Heritage Wheat Halwa",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333703/APFOOD/madugula-halwa.jpg",
      href: `/${locale}/dishes/madugula-halwa`,
    },
    {
      name: "Araku Bamboo Biryani",
      meta: "Tribal Green Bamboo Biryani",
      image: "https://res.cloudinary.com/dro6n6co1/image/upload/v1792334083/APFOOD/araku-bamboo-biryani.jpg",
      href: `/${locale}/dishes/araku-bamboo-biryani`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-leaf-200/70 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-turmeric-700 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-turmeric-600" />
            <span>Interactive Regional Dossiers</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-leaf-950 dark:text-[#FAF9F5] mt-1">
            Archives of 3 Culinary Regions
          </h2>
          <p className="font-displayTe text-base sm:text-lg font-bold text-turmeric-700 dark:text-turmeric-400 mt-1">
            ఆంధ్రప్రదేశ్ మూడు ప్రాంతాల రుచుల భాండాగారం
          </p>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-[#E8E4D3]/80 font-medium mt-0.5">
            Touch any regional glass folder to explore its recipes, signatures, and culinary heritage
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-leaf-800 dark:text-turmeric-400 bg-leaf-100/70 dark:bg-leaf-900/60 border border-leaf-200 dark:border-leaf-700 px-3.5 py-1.5 rounded-chip self-start sm:self-auto shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400" />
          <span>Click folder to open · Tap recipe to cook</span>
        </div>
      </div>

      {/* 3 Glass Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center py-4 w-full max-w-full">
        {/* 1. Coastal Andhra */}
        <div className="flex flex-col items-center space-y-3">
          <GlassFolder
            label="Coastal Andhra · కోస్తా ఆంధ్ర"
            meta="12 Districts · Godavari Delta"
            tone="light"
            image={optimizeCloudinaryUrl("https://res.cloudinary.com/dro6n6co1/image/upload/v1792341033/APFOOD/region-coastal-andhra.jpg", 640)}
            appearDelay={0}
            width={folderWidth}
            files={coastalFiles.map(f => ({ ...f, image: optimizeCloudinaryUrl(f.image, 380) }))}
            action="none"
            labelPlacement="bottom-left"
          />
          <div className="text-center max-w-[320px] flex flex-col items-center space-y-1">
            <span className="text-xs font-bold text-leaf-800 dark:text-leaf-300 uppercase tracking-wider">
              Coastal Andhra
            </span>
            <p className="text-xs text-ink-600 dark:text-[#E8E4D3]/70">
              Tamarind tang, Gongura sourness, Godavari Pulasa fish, and Pootharekulu sweets.
            </p>
            <Link
              href="/browse?region=coastal-andhra"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-turmeric-700 dark:text-turmeric-400 hover:text-turmeric-800 dark:hover:text-turmeric-300 group pt-0.5 transition-colors"
            >
              <span>{isTe ? "కోస్తా ఆంధ్ర వంటకాలు అన్నీ అన్వేషించండి" : "Explore all Coastal Andhra recipes"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 2. Rayalaseema */}
        <div className="flex flex-col items-center space-y-3">
          <GlassFolder
            label="Rayalaseema · రాయలసీమ"
            meta="8 Districts · Arid Plateau"
            tone="dark"
            image={optimizeCloudinaryUrl("https://res.cloudinary.com/dro6n6co1/image/upload/v1792341035/APFOOD/region-rayalaseema.jpg", 640)}
            appearDelay={140}
            width={folderWidth}
            files={rayalaseemaFiles.map(f => ({ ...f, image: optimizeCloudinaryUrl(f.image, 380) }))}
            action="none"
            labelPlacement="bottom-left"
          />
          <div className="text-center max-w-[320px] flex flex-col items-center space-y-1">
            <span className="text-xs font-bold text-turmeric-700 dark:text-turmeric-400 uppercase tracking-wider">
              Rayalaseema
            </span>
            <p className="text-xs text-ink-600 dark:text-[#E8E4D3]/70">
              Robust finger millet (ragi), fiery Natu Kodi pulusu, roasted groundnut and garlic.
            </p>
            <Link
              href="/browse?region=rayalaseema"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-turmeric-700 dark:text-turmeric-400 hover:text-turmeric-800 dark:hover:text-turmeric-300 group pt-0.5 transition-colors"
            >
              <span>{isTe ? "రాయలసీమ వంటకాలు అన్నీ అన్వేషించండి" : "Explore all Rayalaseema recipes"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3. Uttarandhra */}
        <div className="flex flex-col items-center space-y-3">
          <GlassFolder
            label="Uttarandhra · ఉత్తరాంధ్ర"
            meta="6 Districts · Eastern Ghats"
            tone="light"
            image={optimizeCloudinaryUrl("https://res.cloudinary.com/dro6n6co1/image/upload/v1792341037/APFOOD/region-uttarandhra.jpg", 640)}
            appearDelay={280}
            width={folderWidth}
            files={uttarandhraFiles.map(f => ({ ...f, image: optimizeCloudinaryUrl(f.image, 380) }))}
            action="none"
            labelPlacement="bottom-left"
          />
          <div className="text-center max-w-[320px] flex flex-col items-center space-y-1">
            <span className="text-xs font-bold text-leaf-800 dark:text-leaf-300 uppercase tracking-wider">
              Uttarandhra & Araku
            </span>
            <p className="text-xs text-ink-600 dark:text-[#E8E4D3]/70">
              Woodfire Bamboo Chicken (Bongu Kodi), jaggery bellam pulusu, mountain millets.
            </p>
            <Link
              href="/browse?region=uttarandhra"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-turmeric-700 dark:text-turmeric-400 hover:text-turmeric-800 dark:hover:text-turmeric-300 group pt-0.5 transition-colors"
            >
              <span>{isTe ? "ఉత్తరాంధ్ర వంటకాలు అన్నీ అన్వేషించండి" : "Explore all Uttarandhra recipes"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
