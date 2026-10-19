'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { Link } from '@/i18n/routing';

export interface CookieConsentBannerProps {
  locale?: string;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  locale = 'en',
}) => {
  const isTe = locale === 'te';
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('ruchi_cookie_consent');
      if (!consent) {
        // Short delay so it doesn't clash with the 5s entrance splash
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 5500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const handleConsent = (level: 'all' | 'essential') => {
    try {
      localStorage.setItem('ruchi_cookie_consent', level);
    } catch {
      // Ignore storage restrictions
    }
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Cookie and Privacy Consent"
          className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 sm:p-5 rounded-2xl bg-[#081C14]/95 backdrop-blur-md border border-[#F2B31B]/40 shadow-2xl text-[#FAF9F5] select-none"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#103226] border border-[#2A7356] flex items-center justify-center flex-shrink-0 text-[#F2B31B]">
                <Cookie className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#FDE8A8]">
                  {isTe ? 'గోప్యత & కుకీల అనుమతి' : 'Privacy & Essential Cookies'}
                </h4>
                <p className="text-[10px] text-[#E8E4D3]/60 font-mono">
                  Zero Ads · Zero Third-Party Trackers
                </p>
              </div>
            </div>
            <button
              onClick={() => handleConsent('essential')}
              className="text-[#E8E4D3]/60 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-[#E8E4D3]/90">
            {isTe
              ? 'ఆంధ్ర రుచులు మీ బ్రౌజింగ్ అనుభవాన్ని మరియు భాషా ప్రాధాన్యతలను భద్రపరచడానికి ప్రాథమిక కుకీలను ఉపయోగిస్తుంది.'
              : 'We use essential cookies and local storage to remember your language preference and provide a seamless cultural encyclopedia experience.'}
          </p>

          <div className="mt-2 text-[11px] text-[#FDE8A8]/80 flex items-center gap-2">
            <Link
              href="/privacy"
              className="underline hover:text-white transition-colors"
            >
              {isTe ? 'గోప్యతా విధానం' : 'Privacy Policy'}
            </Link>
            <span>·</span>
            <Link
              href="/cookies"
              className="underline hover:text-white transition-colors"
            >
              {isTe ? 'కుకీ విధానం' : 'Cookie Policy'}
            </Link>
          </div>

          <div className="mt-4 flex items-center gap-2 pt-2 border-t border-[#103226]">
            <button
              onClick={() => handleConsent('all')}
              className="flex-1 py-1.5 px-3 rounded-xl bg-[#F2B31B] hover:bg-[#F7C545] text-[#081C14] text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              {isTe ? 'అంగీకరించు (Accept All)' : 'Accept All'}
            </button>
            <button
              onClick={() => handleConsent('essential')}
              className="py-1.5 px-3 rounded-xl bg-[#103226] hover:bg-[#154231] border border-[#2A7356] text-[#E8E4D3] text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            >
              {isTe ? 'కేవలం అవసరమైనవి' : 'Essential Only'}
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
