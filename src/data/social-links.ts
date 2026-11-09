export interface SocialLink {
  id: string;
  platform: 'x' | 'youtube' | 'facebook' | 'instagram' | 'website';
  label: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'iihm-x',
    platform: 'x',
    label: 'IIHM on X (Twitter)',
    url: 'https://x.com/iihmhotelschool',
  },
  {
    id: 'iihm-youtube',
    platform: 'youtube',
    label: 'IIHM on YouTube',
    url: 'https://www.youtube.com/iihmhotelschool',
  },
];

