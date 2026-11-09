'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X, ArrowRight } from 'lucide-react';
import { applyGoogleTranslation } from './GoogleTranslateProvider';

interface DetectedLangInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  prompt: string;
  btnText: string;
}

const SUPPORTED_DETECTIONS: Record<string, DetectedLangInfo> = {
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    prompt: 'Vous préférez lire en Français ?',
    btnText: 'Traduire en Français',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    prompt: 'Möchten Sie auf Deutsch lesen?',
    btnText: 'Auf Deutsch übersetzen',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    prompt: 'Хотите читать на русском языке?',
    btnText: 'Перевести на русский',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    prompt: '¿Prefieres explorar en Español?',
    btnText: 'Traducir al Español',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    prompt: 'Preferisci leggere in Italiano?',
    btnText: 'Traduci in Italiano',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    prompt: '日本語で読みますか？',
    btnText: '日本語に翻訳する',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    prompt: 'क्या आप हिन्दी में पढ़ना चाहते हैं?',
    btnText: 'हिन्दी में अनुवाद करें',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇦🇪',
    prompt: 'هل تود القراءة باللغة العربية؟',
    btnText: 'ترجمة إلى العربية',
  },
  zh: {
    code: 'zh-CN',
    name: 'Chinese',
    nativeName: '简体中文',
    flag: '🇨🇳',
    prompt: '您想以简体中文浏览本网站吗？',
    btnText: '翻译为中文',
  },
};

export const LanguageDetectionBanner: React.FC = () => {
  const [detected, setDetected] = useState<DetectedLangInfo | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // Don't show if user already dismissed or already picked a custom language
      if (
        localStorage.getItem('ruchi_lang_prompt_dismissed') ||
        localStorage.getItem('user_global_lang')
      ) {
        return;
      }

      // Check browser language
      const navLang = (navigator.language || '').toLowerCase();
      const primaryTag = navLang.split('-')[0];

      // Check if primaryTag matches one of our supported translations
      const match = SUPPORTED_DETECTIONS[primaryTag];
      if (match) {
        setDetected(match);
        // Delay slightly after load
        const timer = setTimeout(() => {
          setVisible(true);
        }, 3500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore client storage restrictions
    }
  }, []);

  const handleAccept = () => {
    if (!detected) return;
    try {
      localStorage.setItem('ruchi_lang_prompt_dismissed', 'true');
    } catch {}
    setVisible(false);
    applyGoogleTranslation(detected.code);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem('ruchi_lang_prompt_dismissed', 'true');
    } catch {}
    setVisible(false);
  };

  if (!visible || !detected) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Language assistance recommendation"
        className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-sm w-[calc(100%-2rem)] bg-white/95 dark:bg-[#0c241b]/95 backdrop-blur-xl border border-turmeric-500/40 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)] text-leaf-950 dark:text-[#FAF9F5]"
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl leading-none flex-shrink-0 mt-0.5">
            {detected.flag}
          </div>

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Globe className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-turmeric-800 dark:text-turmeric-400">
                Language Assistance
              </span>
            </div>

            <p className="text-sm font-semibold text-leaf-950 dark:text-[#FAF9F5] leading-snug">
              {detected.prompt}
            </p>
            <p className="text-xs text-leaf-700 dark:text-[#C3DDCB]/80 mt-0.5">
              Can you read this? We can translate the entire culinary archive for you.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-black/5 dark:border-white/5">
              <button
                onClick={handleAccept}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-turmeric-500 hover:bg-turmeric-600 text-leaf-950 font-semibold text-xs transition-colors shadow-sm active:scale-95"
              >
                <span>{detected.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleDismiss}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-leaf-700 hover:text-leaf-950 dark:text-rice-200/70 dark:hover:text-rice-50 transition-colors"
              >
                Keep English
              </button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss language suggestion"
            className="text-leaf-500 hover:text-leaf-900 dark:text-rice-200/60 dark:hover:text-rice-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
