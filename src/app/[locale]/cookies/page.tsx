import React from 'react';
import { PageTransition } from '@/components/ui/FluidMotion';
import { Link } from '@/i18n/routing';
import { Cookie, ShieldCheck, CheckCircle2, ArrowLeft, Trash2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie & Storage Policy | Andhra Ruchulu · AP Tourism',
  description: 'Learn about the essential cookies and local browser storage used by Andhra Ruchulu to deliver a high-speed, personalized cultural experience.',
};

export default async function CookiePolicyPage({
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
          <Cookie className="w-3.5 h-3.5 text-turmeric-600" />
          <span>Zero Third-Party Advertising Cookies</span>
        </div>
        <h1 className="font-displayTe text-3xl sm:text-5xl font-extrabold text-leaf-950">
          {isTe ? 'కుకీలు & స్థానిక నిల్వ విధానం' : 'Cookie & Browser Storage Disclosure'}
        </h1>
        <p className="text-sm text-ink-700 max-w-2xl leading-relaxed">
          {isTe
            ? 'మా వెబ్‌సైట్ మీ బ్రౌజింగ్ అనుభవాన్ని వేగవంతం చేయడానికి మరియు మీ ప్రాధాన్యతలను గుర్తుంచుకోవడానికి మాత్రమే అవసరమైన కుకీలను ఉపయోగిస్తుంది.'
            : 'We believe in clean, respectful technology. Andhra Ruchulu uses only essential functional cookies and local browser storage to keep the site fast and responsive.'}
        </p>
      </div>

      {/* Cookie Table & Breakdown */}
      <div className="bg-white/95 dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 rounded-card p-6 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-turmeric-600 dark:text-turmeric-400" />
          {isTe ? 'మేము ఉపయోగించే కుకీలు మరియు కీలు' : 'Storage Keys & Purpose Matrix'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-leaf-200 dark:border-leaf-800 bg-leaf-50/60 dark:bg-leaf-900/60 text-leaf-900 dark:text-turmeric-400 font-bold">
                <th className="p-3">Key Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-leaf-100 dark:divide-leaf-800/60">
              <tr>
                <td className="p-3 font-mono text-leaf-800 dark:text-turmeric-400 font-semibold">NEXT_LOCALE</td>
                <td className="p-3">Essential / Preference</td>
                <td className="p-3">1 Year</td>
                <td className="p-3">Remembers your chosen language (English or Telugu).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-leaf-800 dark:text-turmeric-400 font-semibold">ruchi_intro_seen</td>
                <td className="p-3">Session / Functional</td>
                <td className="p-3">Browser Session</td>
                <td className="p-3">Ensures the 5-second Ruchi entrance animation only plays once per session.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-leaf-800 dark:text-turmeric-400 font-semibold">ruchi_cookie_consent</td>
                <td className="p-3">Essential / Compliance</td>
                <td className="p-3">1 Year</td>
                <td className="p-3">Stores your consent acknowledgment for cookies and privacy policies.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-leaf-800 dark:text-turmeric-400 font-semibold">ruchi_mic_permission</td>
                <td className="p-3">Functional</td>
                <td className="p-3">Persistent</td>
                <td className="p-3">Stores whether you have acknowledged the voice microphone explainer.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-leaf-50 dark:bg-leaf-900/60 border border-leaf-200 dark:border-leaf-800 text-xs space-y-2">
          <h3 className="font-bold text-ink-900 dark:text-white flex items-center gap-1.5">
            <Trash2 className="w-4 h-4 text-guntur-600 dark:text-turmeric-400" />
            <span>How to Clear or Reset Your Preferences:</span>
          </h3>
          <p className="text-ink-600 dark:text-rice-50/75">
            You can clear all local data at any time via your browser settings (Chrome, Safari, Edge, Firefox) by selecting <em>&ldquo;Clear Browsing Data &gt; Cookies and Site Data&rdquo;</em> for this domain. This will reset the language selection and re-enable the introductory animation.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
