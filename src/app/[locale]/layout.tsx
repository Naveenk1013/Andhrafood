import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Anek_Telugu, Hind_Guntur } from "next/font/google";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F5EE" },
    { media: "(prefers-color-scheme: dark)", color: "#081C14" },
  ],
};
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RuchiEntranceSplash } from "@/components/ui/RuchiEntranceSplash";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const anekTelugu = Anek_Telugu({
  subsets: ["telugu", "latin"],
  variable: "--font-anek",
  display: "swap",
});

const hindGuntur = Hind_Guntur({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["telugu", "latin"],
  variable: "--font-hind",
  display: "swap",
});

import { SITE_URL, generateWebSiteSchema, generateAPGeoSchema, safeJsonLd } from "@/lib/seo-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTe = locale === 'te';

  const title = isTe
    ? 'ఆంధ్ర రుచులు | ఆంధ్రప్రదేశ్ వంటకాల సమాహారం'
    : 'Andhra Ruchulu | Bringing All Andhra Dishes Together';

  const description = isTe
    ? 'ఆంధ్రప్రదేశ్ 26 జిల్లాల సాంప్రదాయ ఆహార సంస్కృతి, రుచులు మరియు సజీవ AI చెఫ్ రుచి.'
    : 'A community platform bringing all the authentic recipes, traditional flavours, and culinary heritage of Andhra Pradesh together.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s | Andhra Ruchulu',
    },
    description,
    keywords: [
      'Andhra food',
      'Andhra cuisine',
      'Telugu recipes',
      'Andhra Ruchulu',
      'ఆంధ్ర వంటకాలు',
      'Guntur mirchi',
      'Rayalaseema Ragi Mudda',
      'Gutti Vankaya',
      'Pesarattu',
      'Ulavacharu',
      'Coastal Andhra seafood',
      'Uttarandhra Bellam Pulusu',
      'Andhra Pradesh food encyclopedia',
      'Ruchi AI Chef',
    ],
    authors: [{ name: 'Andhra Ruchulu Community' }],
    creator: 'Andhra Ruchulu',
    publisher: 'Andhra Ruchulu',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        te: `${SITE_URL}/te`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: 'Andhra Ruchulu',
      images: [
        {
          url: 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg',
          width: 1200,
          height: 630,
          alt: 'Authentic Andhra Bhojanam on Banana Leaf with Traditional Vantalu',
        },
      ],
      locale: isTe ? 'te_IN' : 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg'],
    },
    applicationName: 'Andhra Ruchulu',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Andhra Ruchulu',
    },
    formatDetection: {
      telephone: false,
    },
    manifest: '/manifest.webmanifest',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const websiteSchema = generateWebSiteSchema(locale);
  const geoSchema = generateAPGeoSchema(undefined, locale);

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${anekTelugu.variable} ${hindGuntur.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect and DNS-prefetch to Cloudinary CDN */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Speculation Rules API for instant prerendering on hover/pointerdown */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: {
                    and: [
                      { href_matches: "/*" },
                      { not: { href_matches: "/api/*" } }
                    ]
                  },
                  eagerness: "moderate"
                }
              ]
            })
          }}
        />

        {/* Global SEO & GEO Structured Data (Safely Serialized) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(geoSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                if (!localStorage.getItem('ruchi_intro_seen') && !sessionStorage.getItem('ruchi_intro_seen')) {
                  document.documentElement.classList.add('ruchi-splash-active');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-ambient-light-drift text-ink-900 dark:text-rice-50 antialiased selection:bg-[#F2B31B] selection:text-[#081C14]">
        <NextIntlClientProvider messages={messages}>
          <RuchiEntranceSplash locale={locale} />
          <div id="main-content-wrapper" className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden transition-opacity duration-500">
            <Header />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
          <CookieConsentBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
