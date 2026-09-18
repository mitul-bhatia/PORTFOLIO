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

export const SITE_URL = normalizeSiteUrl(process.env.SITE_URL || PROFILE.domain);
export const CONTENT_UPDATED_AT = '2026-09-13';

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
  image = '/opengraph-image',
  imageAlt = `${PROFILE.name} portfolio`,
  type = 'website',
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
}): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  return {
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: `${PROFILE.name} Portfolio`,
      locale: 'en_US',
      type,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
