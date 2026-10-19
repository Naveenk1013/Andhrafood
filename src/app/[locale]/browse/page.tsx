import React from 'react';
import { getDishes } from '@/lib/json-db';
import { DriftWallGallery } from '@/components/gallery/DriftWallGallery';
import { PageTransition } from '@/components/ui/FluidMotion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Andhra Culinary Gallery & Archive · ఆంధ్ర వంటకాల నిధి',
  description:
    'Explore the interactive 3D DriftWall culinary gallery of 30+ verified traditional and forgotten dishes across Coastal Andhra, Rayalaseema, and Uttarandhra.',
};

import { SectionVisualBackdrop } from '@/components/ui/SectionVisuals';
import { Sparkles } from 'lucide-react';

export default async function BrowsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dishes = getDishes();

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Breadcrumb Header with Theatrical Gallery Backdrop */}
      <SectionVisualBackdrop
        variant="gallery-atmospheric"
        className="space-y-4"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-chip bg-leaf-900/80 border border-turmeric-500/50 text-turmeric-400 text-xs font-bold tracking-wider uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-turmeric-400 animate-pulse" />
            <span>Heritage Culinary Archive · పాకశాస్త్ర భాండాగారం</span>
          </div>
          <h1 className="font-displayTe text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rice-50 via-turmeric-100 to-turmeric-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {locale === 'te' ? 'ఆంధ్ర సంప్రదాయ వంటకాల ప్రదర్శన' : 'The Living Andhra Culinary Gallery'}
          </h1>
          <p className="text-sm text-rice-200/90 max-w-3xl leading-relaxed">
            {locale === 'te'
              ? 'కోస్తా ఆంధ్ర, రాయలసీమ, ఉత్తరాంధ్రల 26 జిల్లాల నుండి సేకరించిన ప్రాచీన, అరుదైన మరియు నిత్య వంటకాల సమగ్ర సమాహారం. పారలాక్స్ డ్రిఫ్ట్ వాల్‌తో ఇంటరాక్టివ్‌గా అన్వేషించండి.'
              : 'An interactive 3D perspective archive chronicling ancient pre-chilli recipes, royal Zamindari curries, clay-pot delta fish pulusus, and drought-resistant millets across 26 districts.'}
          </p>
        </div>
      </SectionVisualBackdrop>

      {/* Interactive 3D DriftWall Gallery & Filter System */}
      <DriftWallGallery dishes={dishes} locale={locale} />
    </PageTransition>
  );
}
