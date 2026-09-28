import type { Metadata } from 'next';
import { PROFILE } from '@/content/profile';

function normalizeSiteUrl(value: string): string {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return PROFILE.domain;
    return url.origin;
  } catch {
    return PROFILE.domain;
  }
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || PROFILE.domain
);
export const CONTENT_UPDATED_AT = '2026-09-29';

export function absoluteUrl(path = '/'): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function pageMetadata({
  path,
  title,
  description,
  keywords,
  image = '/opengraph-image',
  imageAlt = `${PROFILE.name} portfolio (${PROFILE.domain.replace('https://', '')})`,
  type = 'website',
}: {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
}): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter' | 'keywords'> {
  return {
    alternates: { canonical: path },
    keywords: keywords ?? PROFILE.keywords,
    openGraph: {
      title,
      description,
      url: path,
      siteName: `${PROFILE.name} Portfolio (mitulb95.dev)`,
      locale: 'en_US',
      type,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@mitulb05',
    },
  };
}
