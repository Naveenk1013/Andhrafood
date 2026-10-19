import React from 'react';
import { PageTransition } from '@/components/ui/FluidMotion';
import { Link } from '@/i18n/routing';
import { FileText, Scale, ShieldAlert, Award, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Andhra Ruchulu · AP Tourism',
  description: 'Official terms of use, cultural heritage archive licensing, and culinary advice disclaimer for Andhra Ruchulu.',
};

export default async function TermsPage({
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
          <Scale className="w-3.5 h-3.5 text-leaf-700" />
          <span>Cultural Heritage Terms & Public Use</span>
        </div>
        <h1 className="font-displayTe text-3xl sm:text-5xl font-extrabold text-leaf-950">
          {isTe ? 'నిబంధనలు & షరతులు (Terms of Service)' : 'Terms of Service & Cultural License'}
        </h1>
        <p className="text-sm text-ink-700 max-w-2xl leading-relaxed">
          {isTe
            ? 'ఆంధ్రప్రదేశ్ సాంస్కృతిక వారసత్వాన్ని పరిరక్షించే ఉద్దేశ్యంతో ఈ వేదికను రూపొందించడం జరిగింది. దీనిని వినియోగించే విధాన నిబంధనలు ఇక్కడ వివరంగా పొందుపరచబడ్డాయి.'
            : 'By accessing the Andhra Ruchulu digital encyclopedia, you agree to these terms governing educational, cultural, and personal non-commercial culinary use.'}
        </p>
        <div className="text-[11px] text-ink-500 font-mono pt-2 border-t border-leaf-200/60">
          Effective Date: October 2026 · Andhra Ruchulu Initiative
        </div>
      </div>

      {/* Terms Sections */}
      <div className="space-y-8 bg-white/95 dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 rounded-card p-6 sm:p-10 shadow-sm leading-relaxed text-sm text-ink-700 dark:text-rice-50/90 space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs">
              1
            </span>
            {isTe ? 'సాంస్కృతిక వినియోగ లైసెన్స్' : '1. Heritage Preservation & Permitted Use'}
          </h2>
          <p>
            All traditional recipes, oral folklore recordings, district produce profiles, and regional photographs are compiled by Andhra Ruchulu to celebrate and bring together the culinary heritage of Andhra Pradesh.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
            <li><strong>Personal & Educational Use:</strong> You are granted a non-exclusive license to view, cook, study, and share recipes for personal home cooking and non-commercial educational purposes.</li>
            <li><strong>Attribution:</strong> When referencing content or recipe ratios from this archive in research, culinary publications, or media, attribution should be given to <em>&ldquo;Andhra Ruchulu&rdquo;</em>.</li>
            <li><strong>Commercial Restrictions:</strong> Bulk automated scraping, commercial republishing, or claiming proprietary ownership over heirloom Telugu public-domain recipes is strictly prohibited.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs">
              2
            </span>
            {isTe ? 'రుచి AI చెఫ్ బాధ్యతారాహిత్య ప్రకటన' : '2. Ruchi AI Chef Advisory & Disclaimer'}
          </h2>
          <p>
            Ruchi AI is an assistive cultural culinary guide trained on traditional home recipes and ethnographic notes.
          </p>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5 text-ink-800 dark:text-rice-50">
            <p className="font-bold flex items-center gap-1.5 text-amber-700 dark:text-turmeric-400">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>Not a Medical or Clinical Dietary Substitute:</span>
            </p>
            <p>
              Culinary advice, spice suggestions, and heat scales provided by Ruchi AI are for gastronomical and cultural guidance only. Users with medical conditions (acid reflux, ulcers, cardiovascular restrictions, or severe ingredient allergies) must exercise independent judgment and consult qualified medical professionals before altering their diet.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs">
              3
            </span>
            {isTe ? 'మేధో సంపత్తి మరియు ట్రేడ్‌మార్కులు' : '3. Intellectual Property Rights'}
          </h2>
          <p>
            The software interface, interactive visual components, brand trademarks, and design tokens belong to the Andhra Ruchulu initiative. Traditional recipes themselves remain part of the public cultural commons of the Telugu people.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs">
              4
            </span>
            {isTe ? 'న్యాయ పరిధి మరియు వివాద పరిష్కారం' : '4. Governing Law & Jurisdiction'}
          </h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. Any legal dispute or proceeding arising out of or related to this platform shall fall under the exclusive jurisdiction of the competent courts in Amaravati / Vijayawada, Andhra Pradesh, India.
          </p>
        </section>
      </div>
    </PageTransition>
  );
}
