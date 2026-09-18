import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/content/projects';
import { absoluteUrl, CONTENT_UPDATED_AT } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryRoutes = ['', '/work', '/about', '/skills', '/contact'].map((route) => ({
    url: absoluteUrl(route || '/'),
    lastModified: CONTENT_UPDATED_AT,
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : 0.8,
    ...(route === '' ? { images: [absoluteUrl('/assets/profile.jpg')] } : {}),
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: CONTENT_UPDATED_AT,
    changeFrequency: 'monthly' as const,
    priority: project.isFlagship ? 0.9 : 0.7,
    ...(project.image ? { images: [absoluteUrl(project.image)] } : {}),
  }));

  return [...primaryRoutes, ...projectRoutes];
}
