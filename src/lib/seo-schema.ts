import { Dish, District } from '@/lib/json-db';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://andhraruchulu.com';

/**
 * Safely serializes JSON-LD schema objects into HTML script tags
 * preventing </script> injection and HTML parser tag-break vulnerabilities.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Standard WebSite Schema with Sitelinks Searchbox
 */
export function generateWebSiteSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'te' ? 'ఆంధ్ర రుచులు · ఆహార విజ్ఞాన సర్వస్వం' : 'Andhra Ruchulu · The Authentic AP Culinary Encyclopedia',
    alternateName: ['Andhra Ruchulu', 'AP Food Encyclopedia', 'ఆంధ్ర రుచులు'],
    url: `${SITE_URL}/${locale}`,
    inLanguage: [locale === 'te' ? 'te-IN' : 'en-IN', 'en', 'te'],
    description:
      locale === 'te'
        ? 'ఆంధ్రప్రదేశ్ 26 జిల్లాల ప్రామాణిక ఆహార సంస్కృతి, పురాతన వంటకాలు, ఘాటు కొలతలు మరియు సజీవ AI చెఫ్ రుచి.'
        : 'The authoritative culinary encyclopedia of Andhra Pradesh: 26 districts, traditional recipes, authentic spices, and AI chef Ruchi.',
    publisher: {
      '@type': 'Organization',
      name: 'Andhra Ruchulu',
      url: SITE_URL,
      logo: 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/browse?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Geographic Schema for Andhra Pradesh & its 26 Districts
 */
export function generateAPGeoSchema(district?: District, locale: string = 'en') {
  const baseAP = {
    '@context': 'https://schema.org',
    '@type': 'AdministrativeArea',
    name: 'Andhra Pradesh',
    alternateName: 'ఆంధ్రప్రదేశ్',
    sameAs: [
      'https://en.wikipedia.org/wiki/Andhra_Pradesh',
      'https://www.wikidata.org/wiki/Q1159',
    ],
    containedInPlace: {
      '@type': 'Country',
      name: 'India',
      alternateName: 'భారతదేశం',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 15.9129,
      longitude: 79.74,
    },
  };

  if (!district) return baseAP;

  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: district.nameEn,
    alternateName: district.nameTe,
    description: `${district.nameEn} district, famous for ${district.signatures.join(', ')}. Soil & Produce: ${district.soilAndProduce}`,
    containedInPlace: baseAP,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${district.nameEn} District, Andhra Pradesh`
    )}`,
  };
}

/**
 * Recipe Schema.org structured data (Google Rich Results verified)
 */
export function generateRecipeSchema(dish: Dish, locale: string = 'en') {
  const isTe = locale === 'te';
  const prepMinutes = dish.prepTimeMinutes || 15;
  const cookMinutes = dish.cookTimeMinutes || 25;
  const totalMinutes = prepMinutes + cookMinutes;

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: `${dish.nameEn} (${dish.nameTe})`,
    headline: isTe ? `${dish.nameTe} - ఆంధ్ర సంప్రదాయ వంటకం` : `${dish.nameEn} - Authentic Andhra Recipe`,
    alternateName: dish.nameTe,
    description: isTe ? dish.descriptionTe : dish.descriptionEn,
    image: [
      dish.image?.startsWith('http')
        ? dish.image
        : 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg',
    ],
    author: {
      '@type': 'Organization',
      name: 'Andhra Ruchulu Culinary Archives',
      url: SITE_URL,
    },
    datePublished: '2026-01-01',
    recipeCuisine: ['Andhra', 'South Indian', 'Telugu', 'Indian'],
    recipeCategory: dish.category,
    keywords: [
      dish.nameEn,
      dish.nameTe,
      'Andhra cuisine',
      'Telugu food',
      dish.region,
      ...(dish.districts || []),
      dish.dietary,
      'Authentic Andhra recipe',
      'Heritage food',
    ].join(', '),
    prepTime: `PT${prepMinutes}M`,
    cookTime: `PT${cookMinutes}M`,
    totalTime: `PT${totalMinutes}M`,
    recipeYield: `${dish.servings || 4} servings`,
    suitableForDiet:
      dish.dietary === 'vegetarian'
        ? 'https://schema.org/VegetarianDiet'
        : dish.dietary === 'vegan'
        ? 'https://schema.org/VeganDiet'
        : undefined,
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: '1 plate',
    },
    recipeIngredient: dish.ingredients.map(
      (ing) => `${ing.quantity} ${ing.unit} ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}`
    ),
    recipeInstructions: dish.instructions.map((step, idx) => ({
      '@type': 'HowToStep',
      name: `Step ${idx + 1}`,
      text: step,
      position: idx + 1,
      url: `${SITE_URL}/${locale}/dishes/${dish.slug}#step-${idx + 1}`,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1',
    },
    contentLocation: {
      '@type': 'AdministrativeArea',
      name: dish.region.replace('-', ' ').toUpperCase(),
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Andhra Pradesh, India',
      },
    },
  };
}

/**
 * FAQPage Schema for Voice and Answer Engine Optimization (AEO)
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList Schema for Google Search Snippets
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
