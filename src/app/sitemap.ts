import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mitulbhatia.dev';

  const primaryRoutes = ['', '/work', '/about', '/skills', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: project.isFlagship ? 0.9 : 0.7,
  }));

  return [...primaryRoutes, ...projectRoutes];
}
