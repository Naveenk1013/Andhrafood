import React from 'react';
import { PageTransition } from '@/components/ui/FluidMotion';
import { Link } from '@/i18n/routing';
import { Flame, AlertTriangle, ShieldCheck, HeartPulse, ArrowLeft, Info } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Culinary & Allergen Disclaimer | Andhra Ruchulu · AP Tourism',
  description: 'Important health, allergen, Scoville heat, and food preparation advisory for exploring traditional Andhra Pradesh culinary heritage.',
};

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTe = locale === 'te';

  return (
    <PageTransition className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-ink-900 dark:text-rice-50">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 dark:text-turmeric-400 hover:text-turmeric-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {isTe ? 'ముఖ్యాంశాలకు తిరిగి వెళ్లండి' : 'Back to Home'}
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-hero overflow-hidden bg-white/80 backdrop-blur-xl border border-white/90 p-6 sm:p-12 text-ink-900 shadow-[0_16px_45px_rgba(31,90,67,0.06)] space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-leaf-100/80 border border-leaf-300 text-leaf-900 text-xs font-bold tracking-wider uppercase">
          <HeartPulse className="w-3.5 h-3.5 text-chilli-600" />
          <span>Health, Allergen & Heat Safety Advisory</span>
        </div>
        <h1 className="font-displayTe text-3xl sm:text-5xl font-extrabold text-leaf-950">
          {isTe ? 'ఆహార & ఆరోగ్య హెచ్చరికలు (Culinary Disclaimer)' : 'Culinary, Allergen & Scoville Heat Advisory'}
        </h1>
        <p className="text-sm text-ink-700 max-w-2xl leading-relaxed">
          {isTe
            ? 'ఆంధ్ర వంటకాలు ప్రపంచ ప్రసిద్ధి చెందిన ఘాటు మరియు సుగంధ ద్రవ్యాలను కలిగి ఉంటాయి. ఆహార అలర్జీలు మరియు ఆరోగ్య పరిస్థితుల దృష్ట్యా ఈ క్రింది సూచనలను గమనించగలరు.'
            : 'Andhra cuisine is celebrated worldwide for its fiery potency and artisanal spices. Please review our culinary safety guidelines regarding Scoville heat levels, allergens, and traditional preparation.'}
        </p>
      </div>

      {/* Advisory Cards */}
      <div className="space-y-6">
        {/* Scoville Heat Alert */}
        <section className="p-6 rounded-card bg-chilli-50/80 backdrop-blur-md border-2 border-chilli-200 text-chilli-950 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-chilli-700">
            <Flame className="w-5 h-5 text-chilli-600 animate-pulse" />
            <span>Guntur Chilli & Scoville Scale Warning (30,000 – 50,000+ SHU)</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-chilli-900/90">
            Dishes rated <strong>4/5 or 5/5 on our Heat Meter</strong> (e.g., Natu Kodi Pulusu, Guntur Mirchi Bajji, Royyala Iguru) utilize authentic sun-dried Guntur Sannam S4 and Teja red chillies. If you have low tolerance for capsaicin, gastrointestinal sensitivity, or acid reflux, we strongly recommend reducing chilli measurements by 50% and pairing meals with plenty of fresh homemade cultured ghee and curd (perugu).
          </p>
        </section>

        {/* Common Allergens Breakdown */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-card p-6 sm:p-8 space-y-4 shadow-[0_8px_30px_rgba(31,90,67,0.06)] text-sm">
          <h2 className="font-bold text-base text-leaf-950 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-turmeric-600 dark:text-turmeric-400" />
            <span>Key Allergen Information in Telugu Heritage Recipes</span>
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-rice-50/80 leading-relaxed">
            Many traditional Andhra delicacies rely on specific seed and nut pastes for their distinctive rich gravies:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <li className="p-3 rounded-xl bg-leaf-50 dark:bg-leaf-900/40 border border-leaf-200 dark:border-leaf-800 space-y-1">
              <strong className="text-leaf-900 dark:text-turmeric-400 block">Mustard Seeds & Powder (ఆవాలు / ఆవపిండి):</strong>
              Used abundantly in Avakaya pickles, Majjiga Pulusu, and Bellam Pulusu. Can trigger severe reactions in mustard-allergic individuals.
            </li>
            <li className="p-3 rounded-xl bg-leaf-50 dark:bg-leaf-900/40 border border-leaf-200 dark:border-leaf-800 space-y-1">
              <strong className="text-leaf-900 dark:text-turmeric-400 block">Sesame Seeds & Oil (నువ్వులు / నువ్వుల నూనె):</strong>
              Cold-pressed sesame oil is the staple medium for pickles and Rayalaseema gravies. High risk for sesame allergy.
            </li>
            <li className="p-3 rounded-xl bg-leaf-50 dark:bg-leaf-900/40 border border-leaf-200 dark:border-leaf-800 space-y-1">
              <strong className="text-leaf-900 dark:text-turmeric-400 block">Peanuts & Tree Nuts (వేరుశెనగ / జీడిపప్పు):</strong>
              Frequently stone-ground into Gutti Vankaya stuffing and Rayalaseema chutneys.
            </li>
            <li className="p-3 rounded-xl bg-leaf-50 dark:bg-leaf-900/40 border border-leaf-200 dark:border-leaf-800 space-y-1">
              <strong className="text-leaf-900 dark:text-turmeric-400 block">Shellfish & Crustaceans (రొయ్యలు / పీతలు):</strong>
              Coastal Godavari and Krishna delta specialties frequently include crabs, freshwater prawns, and sea fish.
            </li>
          </ul>
        </section>

        {/* Traditional Utensils Safety */}
        <section className="bg-white/95 dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 rounded-card p-6 sm:p-8 space-y-3 shadow-sm text-xs sm:text-sm text-ink-700 dark:text-rice-50/90 leading-relaxed">
          <h2 className="font-bold text-base text-ink-900 dark:text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-turmeric-600 dark:text-turmeric-400" />
            <span>Traditional Vessel & Clay Pot Safety</span>
          </h2>
          <p>
            When utilizing unglazed earthenware pots (matti kundalu) or bronze/brass vessels (kansa/ithadi) as documented in our heritage techniques, ensure that brass and bronze vessels are properly tinned (kalai coated) before cooking sour tamarind or tomato curries to prevent metallic oxidation.
          </p>
        </section>
      </div>
    </PageTransition>
  );
}
