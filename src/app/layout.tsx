import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { PaperRoot } from '@/components/shell/PaperRoot';
import { ScrollProgress } from '@/components/shell/ScrollProgress';
import { Masthead } from '@/components/shell/Masthead';
import { FooterFolio } from '@/components/shell/FooterFolio';
import { BotDock } from '@/components/notebook/BotDock';
import { CustomCursor } from '@/components/shell/CustomCursor';
import { PROFILE } from '@/content/profile';
import { absoluteUrl, serializeJsonLd, SITE_URL } from '@/lib/site';


const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: `${PROFILE.name} Portfolio`,
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  category: 'technology',
  title: {
    default: `${PROFILE.name} — ${PROFILE.primaryTitle}`,
    template: `%s — ${PROFILE.name}`,
  },
  description: PROFILE.metaDescription,
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.primaryTitle}`,
    description: PROFILE.openGraphDescription,
    url: SITE_URL,
    siteName: `${PROFILE.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mitul Bhatia — AI and Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — ${PROFILE.primaryTitle}`,
    description: PROFILE.openGraphDescription,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F3E9DA',
};

const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: PROFILE.name,
      url: SITE_URL,
      image: absoluteUrl('/assets/profile.jpg'),
      jobTitle: PROFILE.primaryTitle,
      description: PROFILE.resumeSummary,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sonipat',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: PROFILE.school,
      },
      sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.x, PROFILE.leetcode, PROFILE.codeforces],
      knowsAbout: [
        'Agentic systems',
        'Retrieval-augmented generation',
        'Backend engineering',
        'Full-stack development',
        'Real-time systems',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${PROFILE.name} Portfolio`,
      description: PROFILE.metaDescription,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(portfolioJsonLd) }}
        />
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#2B1D14] focus:text-[#F3E9DA] focus:font-mono focus:text-xs focus:border focus:border-[#A8672E] shadow-notebook"
        >
          Skip to main content
        </a>
        <PaperRoot>
          <CustomCursor />
          <ScrollProgress />
          <Masthead />
          <main id="main-content" className="flex-1 focus:outline-none">
            {children}
          </main>
          <FooterFolio />
          <BotDock />
        </PaperRoot>

      </body>
    </html>
  );
}
