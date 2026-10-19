import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDishBySlug, getDistrictBySlug } from '@/lib/json-db';
import { Link } from '@/i18n/routing';
import {
  ArrowLeft,
  Clock,
  Users,
  Flame,
  MapPin,
  ChefHat,
  Sparkles,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { PageTransition } from '@/components/ui/FluidMotion';
import { SectionVisualBackdrop, CulinaryWatermark } from '@/components/ui/SectionVisuals';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { Metadata } from 'next';
import {
  SITE_URL,
  generateRecipeSchema,
  generateBreadcrumbSchema,
  generateAPGeoSchema,
  generateFAQSchema,
  safeJsonLd,
} from '@/lib/seo-schema';

import { optimizeCloudinaryUrl } from '@/lib/cloudinary';

const REGION_IMAGE_MAP: Record<string, string> = {
  'coastal-andhra': 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341033/APFOOD/region-coastal-andhra.jpg',
  'rayalaseema': 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341035/APFOOD/region-rayalaseema.jpg',
  'uttarandhra': 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341037/APFOOD/region-uttarandhra.jpg',
};

const CLOUDINARY_HERO = 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg';

const getDishImageUrl = (dish: { image?: string; region?: string }): string => {
  const raw = dish.image && dish.image.startsWith('https://')
    ? dish.image
    : (dish.region && REGION_IMAGE_MAP[dish.region]) || CLOUDINARY_HERO;
  return optimizeCloudinaryUrl(raw, 1280);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dish = getDishBySlug(slug);
  if (!dish) return { title: 'Dish Not Found' };

  const isTe = locale === 'te';
  const title = `${dish.nameEn} (${dish.nameTe}) · Authentic Andhra Recipe & Heritage`;
  const description = isTe ? dish.descriptionTe : dish.descriptionEn;
  const imageUrl = getDishImageUrl(dish);

  return {
    title,
    description,
    keywords: [
      dish.nameEn,
      dish.nameTe,
      'Andhra recipe',
      'Telugu cuisine',
      dish.region,
      ...(dish.districts || []),
      dish.category,
      dish.dietary,
      'AP Tourism authentic food',
      'Guntur spices',
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/dishes/${dish.slug}`,
      languages: {
        en: `${SITE_URL}/en/dishes/${dish.slug}`,
        te: `${SITE_URL}/te/dishes/${dish.slug}`,
        'x-default': `${SITE_URL}/en/dishes/${dish.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/dishes/${dish.slug}`,
      siteName: 'Andhra Ruchulu',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${dish.nameEn} - Authentic ${dish.region} delicacy`,
        },
      ],
      type: 'article',
      locale: isTe ? 'te_IN' : 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DishDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dish = getDishBySlug(slug);

  if (!dish) {
    notFound();
  }

  const isTe = locale === 'te';
  const img = getDishImageUrl(dish);
  const totalTime = dish.prepTimeMinutes + dish.cookTimeMinutes;

  // Retrieve primary district details for GEO Schema
  const primaryDistrictSlug = dish.districts?.[0]?.toLowerCase().replace(/\s+/g, '-');
  const primaryDistrict = primaryDistrictSlug ? getDistrictBySlug(primaryDistrictSlug) : null;

  // Build Structured Data for SEO, GEO & AEO
  const recipeSchema = generateRecipeSchema(dish, locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isTe ? 'ముఖ్యాంశాలు' : 'Home', url: `/${locale}` },
    { name: isTe ? 'వంటకాల గ్యాలరీ' : 'Browse Dishes', url: `/${locale}/browse` },
    { name: `${dish.nameEn} (${dish.nameTe})`, url: `/${locale}/dishes/${dish.slug}` },
  ]);
  const geoSchema = generateAPGeoSchema(primaryDistrict || undefined, locale);

  // AEO Natural Language FAQs for Rich Snippets & AI Answer Extraction
  const dishFaqs = [
    {
      question: isTe
        ? `${dish.nameTe} ప్రత్యేకత ఏమిటి?`
        : `What makes authentic ${dish.nameEn} (${dish.nameTe}) unique?`,
      answer: isTe
        ? `${dish.nameTe} అనేది ఆంధ్రప్రదేశ్ ${dish.region} ప్రాంతానికి చెందిన ప్రామాణిక ${dish.category} వంటకం. దీనిలో ${dish.ingredients.slice(0, 4).map((i) => i.name).join(', ')} మరియు సాంప్రదాయ సుగంధ ద్రవ్యాలు మిళితమై ఉంటాయి.`
        : `${dish.nameEn} (${dish.nameTe}) is a classic ${dish.category} from the ${dish.region.replace('-', ' ')} region of Andhra Pradesh. Its hallmark is the precise balance of ${dish.ingredients.slice(0, 4).map((i) => i.name).join(', ')} prepared with traditional cooking fat (${dish.cookingFat || 'Ghee / Sesame oil'}) and a heat rating of ${dish.heatLevel}/5.`,
    },
    {
      question: isTe
        ? `ఆంధ్రప్రదేశ్ లోని ఏ జిల్లాలు ${dish.nameTe}కి ప్రసిద్ధి?`
        : `Which districts in Andhra Pradesh are most famous for ${dish.nameEn}?`,
      answer: isTe
        ? `ఈ వంటకం ముఖ్యంగా ${dish.districts.join(', ')} జిల్లాల్లో పూర్వీకుల నుండి వస్తున్న సంప్రదాయ పద్ధతుల్లో తయారవుతుంది.`
        : `${dish.nameEn} is historically celebrated across ${dish.districts.join(', ')} districts in Andhra Pradesh, where local heirloom ingredients and culinary techniques have been preserved across generations.`,
    },
    {
      question: isTe
        ? `${dish.nameTe}ను ఎలా వడ్డించాలి?`
        : `How is ${dish.nameEn} traditionally served?`,
      answer: dish.servingRituals,
    },
    {
      question: isTe
        ? `${dish.nameTe} ఆహార వర్గీకరణ మరియు ఘాటు స్థాయి ఏమిటి?`
        : `What is the heat level and dietary classification of ${dish.nameEn}?`,
      answer: isTe
        ? `ఇది ${dish.dietary} వర్గానికి చెందినది. గుంటూరు ఘాటు స్థాయి 5 లో ${dish.heatLevel} గా ఉంటుంది.`
        : `${dish.nameEn} is classified as ${dish.dietary} with a Guntur Heat Index of ${dish.heatLevel}/5, providing an authentic fiery yet balanced palate.`,
    },
  ];

  const faqSchema = generateFAQSchema(dishFaqs);

  return (
    <>
      {/* Schema.org JSON-LD Structured Data (Safely Serialized) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(recipeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(geoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />

      <PageTransition className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Breadcrumb Navigation (Semantic & SEO-rich) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-600 dark:text-rice-50/70">
          <Link href="/" className="hover:text-turmeric-600 dark:hover:text-turmeric-400 transition-colors">
            {isTe ? 'ముఖ్యాంశాలు' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-turmeric-600 dark:hover:text-turmeric-400 transition-colors">
            {isTe ? 'వంటకాల గ్యాలరీ' : 'Dishes'}
          </Link>
          <span>/</span>
          <span className="font-semibold text-leaf-900 dark:text-turmeric-400">{dish.nameEn}</span>
        </nav>

        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 dark:text-turmeric-400 hover:text-turmeric-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {isTe ? 'అన్ని వంటకాల గ్యాలరీకి తిరిగి వెళ్లండి' : 'Back to Culinary Gallery'}
          </Link>

          <BookmarkButton slug={dish.slug} locale={locale} />
        </div>

        {/* Hero Header Card with Ambient Region Lighting */}
        <div className="relative rounded-hero overflow-hidden bg-gradient-to-t from-leaf-950 via-leaf-900 to-leaf-950 border border-leaf-800/80 shadow-2xl text-rice-50">
          {/* Top Golden Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-turmeric-400/80 to-transparent pointer-events-none z-10" />

          {/* Ambient Region Light */}
          <div
            className="absolute top-0 right-1/4 w-72 h-72 pointer-events-none opacity-40 blur-3xl z-0"
            style={{
              background: "radial-gradient(circle, rgba(242, 179, 27, 0.35) 0%, rgba(61, 143, 110, 0.2) 60%, transparent 80%)",
            }}
          />

          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={img}
              alt={`${dish.nameEn} (${dish.nameTe}) - Authentic Andhra Cuisine`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-leaf-950 via-leaf-950/60 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 -mt-24 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-chip bg-turmeric-500 text-leaf-950 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                {dish.region.replace('-', ' ')}
              </span>
              <span className="px-3 py-1 rounded-chip bg-leaf-900/90 border border-leaf-800 text-rice-50 text-xs font-semibold">
                {dish.category.replace(/-/g, ' ')}
              </span>
              <span className="px-3 py-1 rounded-chip bg-leaf-900/90 border border-leaf-800 text-rice-50 text-xs font-semibold">
                {dish.dietary}
              </span>
              <span className="px-3 py-1 rounded-chip bg-[#103226] border border-[#2A7356] text-[#FDE8A8] text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5EB08D]" />
                {isTe ? 'సాంప్రదాయ వంటకం' : 'Authentic Andhra Heritage'}
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="font-displayTe text-3xl sm:text-5xl font-extrabold text-white">
                {dish.nameTe}
              </h1>
              <p className="font-display text-xl sm:text-2xl font-bold text-turmeric-400">
                {dish.nameEn}
              </p>
              <p className="text-xs text-rice-50/70 font-medium italic">
                &ldquo;{dish.nameEnMeaning}&rdquo;
              </p>
            </div>

            {/* Key Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-leaf-800/80">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-turmeric-400" />
                <div>
                  <span className="text-[10px] uppercase text-rice-50/60 font-bold block">
                    {isTe ? 'మొత్తం సమయం' : 'Total Time'}
                  </span>
                  <span className="text-sm font-bold text-white">{totalTime} mins</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-turmeric-400" />
                <div>
                  <span className="text-[10px] uppercase text-rice-50/60 font-bold block">
                    {isTe ? 'సర్వింగ్స్' : 'Servings'}
                  </span>
                  <span className="text-sm font-bold text-white">{dish.servings} people</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-guntur-500" />
                <div>
                  <span className="text-[10px] uppercase text-rice-50/60 font-bold block">
                    {isTe ? 'గుంటూరు ఘాటు' : 'Heat Level'}
                  </span>
                  <span className="text-sm font-bold text-turmeric-400">
                    {'🔥'.repeat(Math.min(5, Math.max(1, dish.heatLevel)))} ({dish.heatLevel}/5)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-turmeric-400" />
                <div>
                  <span className="text-[10px] uppercase text-rice-50/60 font-bold block">
                    {isTe ? 'జిల్లాలు' : 'Districts'}
                  </span>
                  <span className="text-sm font-bold text-white uppercase">{dish.districts.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generative Engine Optimization (GEO) Definition Snippet Card */}
        <section
          aria-label="Direct Culinary Definition"
          className="rounded-2xl p-5 bg-[#0D2E20] border-2 border-[#F2B31B]/40 text-[#FAF9F5] shadow-lg space-y-3"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#FDE8A8] uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#5EB08D]" />
            <span>{isTe ? 'సాంప్రదాయ పాకశాస్త్ర వారసత్వం' : 'Heirloom Culinary Heritage · సాంప్రదాయ వారసత్వం'}</span>
          </div>
          <p className="text-sm leading-relaxed text-[#FFFBF0]/95 font-body">
            <strong className="text-[#F2B31B]">{dish.nameEn}</strong> ({dish.nameTe}) is a classic{' '}
            <span className="text-[#FDE8A8]">{dish.category.replace(/-/g, ' ')}</span> from the{' '}
            <strong className="text-white">{dish.region.replace('-', ' ')}</strong> region of Andhra Pradesh, historically native to{' '}
            <span className="text-[#FDE8A8]">{dish.districts.join(', ')}</span> districts. Formulated with authentic{' '}
            {dish.cookingFat || 'traditional unrefined oils'} and rated at{' '}
            <strong className="text-[#F7C545]">{dish.heatLevel}/5</strong> on the Guntur Heat Index, this dish celebrates the rich culinary tradition bringing all the flavours of Andhra together.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#1F5A43] text-xs">
            <div>
              <span className="text-[10px] text-[#FDE8A8]/60 uppercase font-mono block">Geographical Origin</span>
              <span className="font-semibold text-white">{dish.region} (AP, India)</span>
            </div>
            <div>
              <span className="text-[10px] text-[#FDE8A8]/60 uppercase font-mono block">Primary Fat / Medium</span>
              <span className="font-semibold text-white">{dish.cookingFat || 'Ghee / Sesame Oil'}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#FDE8A8]/60 uppercase font-mono block">Dietary Standard</span>
              <span className="font-semibold text-white capitalize">{dish.dietary}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#FDE8A8]/60 uppercase font-mono block">Scoville Status</span>
              <span className="font-semibold text-[#F7C545]">Tier {dish.heatLevel} Authentic Heat</span>
            </div>
          </div>
        </section>

        {/* Description & Cultural Context */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section with Dish Sanctuary Backdrop */}
            <SectionVisualBackdrop variant="dish-sanctuary">
              <div className="space-y-4">
                <h2 className="font-displayTe text-xl font-bold text-ink-900 dark:text-rice-50 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-turmeric-600 dark:text-turmeric-400" />
                  {isTe ? 'వంటకం పరిచయం' : 'Culinary Overview'}
                </h2>
                <p className="text-ink-700 dark:text-rice-50/90 leading-relaxed text-sm">
                  {isTe ? dish.descriptionTe : dish.descriptionEn}
                </p>
              </div>
            </SectionVisualBackdrop>

            {/* Cultural Heritage & Traditional Roots with Emerald Sanctum Backdrop */}
            <SectionVisualBackdrop variant="emerald-sanctum">
              <div className="space-y-4">
                <h2 className="font-displayTe text-xl font-bold text-leaf-950 dark:text-turmeric-400 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-turmeric-600 dark:text-turmeric-400" />
                  {isTe ? 'సాంప్రదాయం & చారిత్రక ప్రాశస్త్యం' : 'Cultural Context & Fieldwork Heritage'}
                </h2>
                <p className="text-ink-700 dark:text-rice-50/90 leading-relaxed text-sm">
                  {dish.culturalContext}
                </p>
                <div className="pt-3 border-t border-leaf-200 dark:border-leaf-800 text-xs text-ink-600 dark:text-rice-50/75">
                  <strong className="text-leaf-900 dark:text-turmeric-400">{isTe ? 'వడ్డించే విధానం: ' : 'Serving Rituals: '}</strong>
                  {dish.servingRituals}
                </div>
              </div>
            </SectionVisualBackdrop>

            {/* Step-by-Step Standard Preparation Instructions with Curated Feast Backdrop */}
            <SectionVisualBackdrop variant="curated-feast">
              <div className="space-y-6">
                <h2 className="font-displayTe text-xl font-bold text-ink-900 dark:text-rice-50 flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-turmeric-600 dark:text-turmeric-400" />
                  {isTe ? 'సాంప్రదాయ తయారీ విధానం' : 'Standard Traditional Instructions'}
                </h2>
                <ol className="space-y-4">
                  {dish.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm text-ink-700 dark:text-rice-50/90">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs mt-0.5 border border-turmeric-500/40">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </SectionVisualBackdrop>

            {/* AEO: Frequently Asked Questions & Voice Search Snippets */}
            <SectionVisualBackdrop variant="dish-sanctuary">
              <div className="space-y-4">
                <h2 className="font-displayTe text-xl font-bold text-ink-900 dark:text-rice-50 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-turmeric-600 dark:text-turmeric-400" />
                  {isTe ? 'తరచుగా అడిగే ప్రశ్నలు (FAQ)' : 'Frequently Asked Questions & Culinary Q&A'}
                </h2>
                <div className="space-y-3 pt-2">
                  {dishFaqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group border border-leaf-200/60 dark:border-leaf-800 rounded-xl p-4 bg-leaf-50/50 dark:bg-leaf-900/40 transition-all [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex items-center justify-between cursor-pointer font-bold text-sm text-leaf-950 dark:text-rice-50 select-none">
                        <span>{faq.question}</span>
                        <span className="ml-2 text-turmeric-600 dark:text-turmeric-400 transition-transform group-open:rotate-180">
                          ▾
                        </span>
                      </summary>
                      <p className="mt-3 text-xs leading-relaxed text-ink-700 dark:text-rice-50/80 border-t border-leaf-200/50 dark:border-leaf-800/50 pt-2.5">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </SectionVisualBackdrop>
          </div>

          {/* Sidebar: Ingredients Breakdown with Harvest Bhojanam Backdrop */}
          <div className="space-y-6">
            <SectionVisualBackdrop variant="harvest-bhojanam" containerClassName="sticky top-6">
              <div className="space-y-4">
                <h3 className="font-displayTe text-lg font-bold text-ink-900 dark:text-rice-50 border-b border-leaf-300/60 pb-3">
                  {isTe ? 'కావలసిన పదార్థాలు' : 'Authentic Ingredients'}
                </h3>
                <ul className="space-y-3">
                  {dish.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-xs space-y-1 pb-2.5 border-b border-leaf-300/40 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${ing.isPrimary ? 'text-leaf-800 dark:text-turmeric-400 font-bold' : 'text-ink-800 dark:text-rice-50'}`}>
                          {ing.name}
                        </span>
                        <span className="text-ink-600 dark:text-rice-50/70 font-mono text-[11px]">
                          {ing.quantity} {ing.unit}
                        </span>
                      </div>
                      {ing.notes && (
                        <p className="text-[11px] text-ink-500 dark:text-rice-50/60 italic leading-snug">
                          {ing.notes}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionVisualBackdrop>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
