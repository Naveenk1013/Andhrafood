'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            autoDisplay?: boolean;
            layout?: unknown;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

/**
 * Headless Google Translate Provider.
 * Loads the Google Translate script quietly and creates an offscreen mount point.
 * All UI is handled via our custom GlobalLanguageModal and LanguageDetectionBanner.
 */
export function GoogleTranslateProvider() {
  useEffect(() => {
    // Define the initialization callback on window
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,fr,de,ru,es,it,ja,hi,ar,zh-CN',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      } catch (err) {
        console.warn('Google Translate initialization notice:', err);
      }
    };

    // Check if script is already present
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: 'fixed',
        top: -9999,
        left: -9999,
        width: 1,
        height: 1,
        opacity: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Utility to set or clear the Google Translate language programmatically
 */
export function applyGoogleTranslation(targetLang: string): void {
  try {
    const isDomain = typeof window !== 'undefined' && window.location.hostname.includes('.');

    if (targetLang === 'en' || targetLang === 'original') {
      // Clear google translate cookies on path and domains
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      if (isDomain) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
      }
      localStorage.removeItem('user_global_lang');

      const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (combo) {
        combo.value = 'en';
        combo.dispatchEvent(new Event('change'));
      }
      // Give DOM time to update or reload to restore pristine React markup
      setTimeout(() => {
        window.location.reload();
      }, 150);
      return;
    }

    // Set google translate cookie (/source/target)
    const cookieVal = `/en/${targetLang}`;
    document.cookie = `googtrans=${cookieVal}; path=/; SameSite=Lax;`;
    if (isDomain) {
      document.cookie = `googtrans=${cookieVal}; domain=.${window.location.hostname}; path=/; SameSite=Lax;`;
      document.cookie = `googtrans=${cookieVal}; domain=${window.location.hostname}; path=/; SameSite=Lax;`;
    }
    localStorage.setItem('user_global_lang', targetLang);

    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (combo) {
      combo.value = targetLang;
      combo.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  } catch (err) {
    console.error('Failed to apply translation:', err);
  }
}
