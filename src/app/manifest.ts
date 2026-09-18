import type { MetadataRoute } from 'next';
import { PROFILE } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${PROFILE.primaryTitle}`,
    short_name: PROFILE.name,
    description: PROFILE.metaDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#F3E9DA',
    theme_color: '#F3E9DA',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
