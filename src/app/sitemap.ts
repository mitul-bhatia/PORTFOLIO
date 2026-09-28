import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/content/projects';
import { absoluteUrl, CONTENT_UPDATED_AT } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split('T')[0];

  const primaryRoutes = ['', '/work', '/about', '/skills', '/news', '/contact'].map((route) => {
    let priority = 0.8;
    if (route === '') priority = 1.0;
    else if (route === '/work' || route === '/about') priority = 0.9;
    else if (route === '/skills') priority = 0.85;

    return {
      url: absoluteUrl(route || '/'),
      lastModified: currentDate,
      changeFrequency: (route === '/news' ? 'daily' : route === '' ? 'weekly' : 'monthly') as
        | 'daily'
        | 'weekly'
        | 'monthly',
      priority,
      ...(route === '' ? { images: [absoluteUrl('/assets/profile.jpg')] } : {}),
    };
  });

  const projectRoutes = PROJECTS.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: CONTENT_UPDATED_AT,
    changeFrequency: 'monthly' as const,
    priority: project.isFlagship ? 0.85 : 0.75,
    ...(project.image ? { images: [absoluteUrl(project.image)] } : {}),
  }));

  return [...primaryRoutes, ...projectRoutes];
}
