'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X, Check, Sparkles, Compass } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { applyGoogleTranslation } from './GoogleTranslateProvider';

export interface GlobalLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  type: 'heritage' | 'international';
  note?: string;
}

const HERITAGE_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English (Primary)',
    flag: '🇬🇧',
    type: 'heritage',
    note: 'Official Master Archive & Global Standard',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు (మూల భాష)',
    flag: '🇮🇳',
    type: 'heritage',
    note: 'Human-curated indigenous Andhra culinary heritage',
  },
];

const INTERNATIONAL_LANGUAGES: LanguageOption[] = [
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    type: 'international',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    type: 'international',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    type: 'international',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    type: 'international',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    type: 'international',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    type: 'international',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    type: 'international',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇦🇪',
    type: 'international',
  },
  {
    code: 'zh-CN',
    name: 'Chinese',
    nativeName: '简体中文',
    flag: '🇨🇳',
    type: 'international',
  },
];

export const GlobalLanguageModal: React.FC<GlobalLanguageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [activeCode, setActiveCode] = useState<string>('en');
  const [mounted, setMounted] = useState<boolean>(false);

  // Client-side mount check for createPortal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Detect current active language from cookie or locale
  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
      if (match && match[1]) {
        setActiveCode(match[1]);
      } else {
        setActiveCode(currentLocale);
      }
    } catch {
      setActiveCode(currentLocale);
    }
  }, [currentLocale, isOpen]);

  const handleSelectLanguage = (option: LanguageOption) => {
    if (option.type === 'heritage') {
      // Clear google translate and use next-intl routing
      applyGoogleTranslation('en');
      router.replace(pathname, { locale: option.code as 'en' | 'te' });
      setActiveCode(option.code);
      onClose();
    } else {
      // If currently on /te, switch to /en first so Google translates from English cleanly
      if (currentLocale !== 'en') {
        router.replace(pathname, { locale: 'en' });
      }
      applyGoogleTranslation(option.code);
      setActiveCode(option.code);
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto isolate">
          {/* Backdrop with high blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-0"
            aria-hidden="true"
          />

          {/* Modal Card - Floating on top of everything */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="global-lang-title"
            className="relative w-full max-w-xl bg-white dark:bg-[#0c2219] border border-black/15 dark:border-[#1F5A43] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden z-10 my-auto text-leaf-950 dark:text-[#FAF9F5]"
          >
            {/* Header Accent Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-turmeric-500 via-leaf-400 to-turmeric-500" />

            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 border-b border-black/5 dark:border-white/5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-turmeric-500/10 dark:bg-turmeric-400/15 border border-turmeric-500/30 flex items-center justify-center text-turmeric-700 dark:text-turmeric-400 shadow-inner">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    id="global-lang-title"
                    className="text-base sm:text-lg font-bold font-serif tracking-tight text-leaf-950 dark:text-[#FAF9F5]"
                  >
                    Language & Region / భాష & ప్రాంతం
                  </h2>
                  <p className="text-xs text-leaf-700 dark:text-[#C3DDCB]/80 mt-0.5">
                    Select your preferred language for the Andhra culinary archives
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full flex items-center justify-center text-leaf-600 hover:text-leaf-950 dark:text-rice-200/70 dark:hover:text-rice-50 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* 1. Official Heritage Editions */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-turmeric-800 dark:text-turmeric-400">
                    Official Heritage Editions
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-turmeric-500/15 text-turmeric-700 dark:text-turmeric-300 font-semibold ml-auto">
                    Curated by Culinary Historians
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {HERITAGE_LANGUAGES.map((lang) => {
                    const isSelected = activeCode === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang)}
                        className={cn(
                          'flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group',
                          isSelected
                            ? 'bg-turmeric-500/15 dark:bg-turmeric-500/20 border-turmeric-500 text-leaf-950 dark:text-[#FAF9F5] shadow-sm'
                            : 'bg-black/[0.02] hover:bg-black/[0.05] dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border-black/5 dark:border-white/5 text-leaf-900 dark:text-rice-100 hover:border-turmeric-500/30'
                        )}
                      >
                        <span className="text-2xl mt-0.5 leading-none flex-shrink-0">
                          {lang.flag}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">
                              {lang.nativeName}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-turmeric-600 dark:text-turmeric-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-leaf-700 dark:text-[#C3DDCB]/70 mt-0.5 leading-tight">
                            {lang.note}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. World Tourism Editions (Google Neural Translation) */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Compass className="w-3.5 h-3.5 text-leaf-600 dark:text-leaf-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-leaf-700 dark:text-leaf-300">
                    World Tourism Editions
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-leaf-500/10 dark:bg-leaf-400/10 text-leaf-800 dark:text-leaf-200 font-semibold ml-auto">
                    Real-Time Translation
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INTERNATIONAL_LANGUAGES.map((lang) => {
                    const isSelected = activeCode === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang)}
                        className={cn(
                          'flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all relative overflow-hidden',
                          isSelected
                            ? 'bg-turmeric-500/15 dark:bg-turmeric-500/20 border-turmeric-500 text-leaf-950 dark:text-[#FAF9F5] shadow-xs'
                            : 'bg-black/[0.02] hover:bg-black/[0.05] dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-black/5 dark:border-white/5 text-leaf-800 dark:text-rice-200 hover:border-turmeric-500/30'
                        )}
                      >
                        <span className="text-xl leading-none flex-shrink-0">
                          {lang.flag}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-xs block truncate">
                            {lang.nativeName}
                          </span>
                          <span className="text-[10px] text-leaf-600 dark:text-[#C3DDCB]/60 block truncate">
                            {lang.name}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400 flex-shrink-0 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with Note */}
            <div className="px-6 py-3.5 bg-black/[0.03] dark:bg-black/20 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-leaf-700 dark:text-rice-200/70">
              <span>Powered by APTDC Tourism & Neural Translation</span>
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-leaf-950 text-white dark:bg-[#FAF9F5] dark:text-[#081C14] font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
