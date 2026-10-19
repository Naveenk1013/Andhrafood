import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Andhra Ruchulu | ఆంధ్ర రుచులు',
    short_name: 'Andhra Ruchulu',
    description: 'Bringing All Andhra Dishes Together · A comprehensive culinary journey across 26 districts of Andhra Pradesh',
    start_url: '/',
    display: 'standalone',
    background_color: '#081C14',
    theme_color: '#081C14',
    orientation: 'portrait-primary',
    icons: [
      {
        src: 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'maskable',
      },
      {
        src: 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  };
}
