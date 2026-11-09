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
 * Loads the Google Translate script quietly and creates a hidden mount point.
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
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{ display: 'none', position: 'absolute', top: -9999, left: -9999 }}
      aria-hidden="true"
    />
  );
}

/**
 * Utility to set or clear the Google Translate language programmatically
 */
export function applyGoogleTranslation(targetLang: string): void {
  try {
    if (targetLang === 'en' || targetLang === 'original') {
      // Clear google translate cookie
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
      localStorage.removeItem('user_global_lang');
      
      const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (combo) {
        combo.value = 'en';
        combo.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
      return;
    }

    // Set google translate cookie (/source/target)
    const cookieVal = `/en/${targetLang}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; domain=${window.location.hostname}; path=/;`;
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
