import React from 'react';
import { PageTransition } from '@/components/ui/FluidMotion';
import { Link } from '@/i18n/routing';
import { ShieldCheck, Lock, Eye, Database, Bell, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Andhra Ruchulu · AP Tourism',
  description: 'Official privacy policy and data governance practices of Andhra Ruchulu culinary archives in compliance with the Digital Personal Data Protection Act (DPDP) 2023.',
};

export default async function PrivacyPolicyPage({
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
          <ShieldCheck className="w-3.5 h-3.5 text-leaf-700" />
          <span>DPDP Act 2023 & Global Privacy Standard</span>
        </div>
        <h1 className="font-displayTe text-3xl sm:text-5xl font-extrabold text-leaf-950">
          {isTe ? 'గోప్యతా విధానం (Privacy Policy)' : 'Privacy Policy & Data Governance'}
        </h1>
        <p className="text-sm text-ink-700 max-w-2xl leading-relaxed">
          {isTe
            ? 'ఆంధ్ర రుచులు మీ వ్యక్తిగత సమాచార గోప్యతను గౌరవిస్తుంది. మా ప్లాట్‌ఫారమ్ సురక్షితమైనది మరియు అనవసరపు ట్రాకింగ్ లేనిది.'
            : 'Andhra Ruchulu is committed to safeguarding your privacy. We operate on a strict zero-surveillance, privacy-first model dedicated to celebrating and preserving authentic Andhra food.'}
        </p>
        <div className="text-[11px] text-ink-500 font-mono pt-2 border-t border-leaf-200/60">
          Last Updated: October 2026 · Andhra Ruchulu Initiative
        </div>
      </div>

      {/* Core Privacy Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 shadow-sm space-y-2">
          <Lock className="w-5 h-5 text-turmeric-600 dark:text-turmeric-400" />
          <h3 className="font-bold text-sm">{isTe ? 'జీరో అడ్వర్టైజింగ్ ట్రాకర్లు' : 'Zero Ad Trackers'}</h3>
          <p className="text-xs text-ink-600 dark:text-rice-50/75 leading-relaxed">
            We never sell your browsing history, run third-party advertising cookies, or profile users across sites.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 shadow-sm space-y-2">
          <Database className="w-5 h-5 text-leaf-700 dark:text-[#5EB08D]" />
          <h3 className="font-bold text-sm">{isTe ? 'తాత్కాలిక AI ప్రాసెసింగ్' : 'Ephemeral AI Processing'}</h3>
          <p className="text-xs text-ink-600 dark:text-rice-50/75 leading-relaxed">
            Conversational queries with Ruchi AI are processed ephemerally in session memory without building persistent user dossiers.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 shadow-sm space-y-2">
          <Eye className="w-5 h-5 text-guntur-600 dark:text-[#F7C545]" />
          <h3 className="font-bold text-sm">{isTe ? 'పారదర్శక అనుమతులు' : 'Transparent Consent'}</h3>
          <p className="text-xs text-ink-600 dark:text-rice-50/75 leading-relaxed">
            Hardware access (microphone for voice queries or camera for food upload) requires your explicit, revocable consent.
          </p>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="space-y-8 bg-white/95 dark:bg-leaf-950 border border-leaf-200/90 dark:border-leaf-800 rounded-card p-6 sm:p-10 shadow-sm leading-relaxed text-sm text-ink-700 dark:text-rice-50/90 space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs">
              1
            </span>
            {isTe ? 'మేము సేకరించే సమాచారం' : '1. Information We Collect'}
          </h2>
          <p>
            Andhra Ruchulu is designed to be accessible without mandatory account registration. We collect only what is strictly necessary to deliver an authentic cultural experience:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
            <li><strong>Session & Interface State:</strong> Local browser storage keys (such as language preference <code className="bg-leaf-100 dark:bg-leaf-900 px-1 py-0.5 rounded font-mono">NEXT_LOCALE</code> and intro status <code className="bg-leaf-100 dark:bg-leaf-900 px-1 py-0.5 rounded font-mono">ruchi_intro_seen</code>).</li>
            <li><strong>Audio & Voice Input:</strong> When you activate voice search, your microphone streams audio strictly to transcribe speech into text. Audio streams are not permanently retained or cataloged.</li>
            <li><strong>Uploaded Images:</strong> Ingredient or dish photographs uploaded to Ruchi AI are processed client-side/in-memory solely to detect culinary elements and suggest traditional recipes.</li>
            <li><strong>Technical Diagnostics:</strong> Standard non-identifying server telemetry (HTTP response codes, browser user-agent, error logs) to maintain server health and uptime.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs">
              2
            </span>
            {isTe ? 'సమాచార వినియోగ విధానం' : '2. How We Use Information'}
          </h2>
          <p>
            Any collected inputs are utilized exclusively for:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
            <li>Serving high-accuracy culinary recipes matching your dietary standards and heat tolerances.</li>
            <li>Translating terminology dynamically between English and Telugu.</li>
            <li>Improving the accuracy of Ruchi AI’s heritage recipe archive based on anonymous aggregate trends.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs">
              3
            </span>
            {isTe ? 'వినియోగదారుల హక్కులు (DPDP చట్టం 2023)' : '3. Your Rights under India’s DPDP Act 2023'}
          </h2>
          <p>
            In compliance with the Digital Personal Data Protection Act of India (2023), you hold unconditional rights regarding your data:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
            <li><strong>Right to Access & Rectify:</strong> You may inspect any data related to your interactions.</li>
            <li><strong>Right to Erasure:</strong> You can clear your browser storage at any time to instantly purge local cookies, intro state, and search history.</li>
            <li><strong>Right to Withdraw Consent:</strong> You may revoke microphone or camera permissions at any point directly within your browser settings.</li>
            <li><strong>Right to Grievance Redressal:</strong> Contact our designated nodal officer for any privacy inquiries.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turmeric-500/20 text-turmeric-700 dark:text-turmeric-400 font-bold flex items-center justify-center text-xs">
              4
            </span>
            {isTe ? 'సంప్రదించవలసిన చిరునామా' : '4. Contact & Grievance Redressal'}
          </h2>
          <p>
            For any data governance or privacy inquiries, contact the cultural heritage data desk:
          </p>
          <div className="p-4 rounded-xl bg-leaf-50 dark:bg-leaf-900/60 border border-leaf-200 dark:border-leaf-800 text-xs space-y-1">
            <p><strong>Platform:</strong> Andhra Ruchulu Community Initiative</p>
            <p><strong>Focus:</strong> Non-commercial cultural initiative bringing all Andhra dishes together</p>
            <p><strong>Email:</strong> <span className="font-mono text-leaf-800 dark:text-turmeric-400">contact@andhraruchulu.com</span></p>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
