import type { MetadataRoute } from 'next';
import { PROFILE } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${PROFILE.primaryTitle}`,
    short_name: PROFILE.name,
    description: PROFILE.metaDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#F1F3F4',
    theme_color: '#F1F3F4',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
