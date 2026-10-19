import { MetadataRoute } from 'next';
import { getDishes } from '@/lib/json-db';
import { SITE_URL } from '@/lib/seo-schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dishes = getDishes();
  const locales = ['en', 'te'];
  const now = new Date();

  // Core static and legal compliance routes
  const staticRoutes = [
    '',
    '/browse',
    '/ruchi',
    '/privacy',
    '/terms',
    '/cookies',
    '/disclaimer',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate static page entries with multi-language alternates
  for (const route of staticRoutes) {
    for (const locale of locales) {
      const url = `${SITE_URL}/${locale}${route}`;
      sitemapEntries.push({
        url,
        lastModified: now,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${route}`,
            te: `${SITE_URL}/te${route}`,
            'x-default': `${SITE_URL}/en${route}`,
          },
        },
      });
    }
  }

  // Generate dish entries
  for (const dish of dishes) {
    for (const locale of locales) {
      const url = `${SITE_URL}/${locale}/dishes/${dish.slug}`;
      sitemapEntries.push({
        url,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {
            en: `${SITE_URL}/en/dishes/${dish.slug}`,
            te: `${SITE_URL}/te/dishes/${dish.slug}`,
            'x-default': `${SITE_URL}/en/dishes/${dish.slug}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
