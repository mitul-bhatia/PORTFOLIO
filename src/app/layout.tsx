import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { PaperRoot } from '@/components/shell/PaperRoot';
import { Masthead } from '@/components/shell/Masthead';
import { FooterFolio } from '@/components/shell/FooterFolio';
import { PetDock } from '@/components/pet/PetDock';
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
  keywords: PROFILE.keywords,
  title: {
    default: `${PROFILE.name} — AI & Full-Stack Engineer | Agentic Systems, LangGraph, RAG`,
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    title: `${PROFILE.name} — AI & Full-Stack Engineer | mitulb95.dev`,
    description: PROFILE.openGraphDescription,
    url: SITE_URL,
    siteName: `${PROFILE.name} Portfolio (mitulb95.dev)`,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — AI and Full-Stack Engineer Portfolio (mitulb95.dev)`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — AI & Full-Stack Engineer | mitulb95.dev`,
    description: PROFILE.openGraphDescription,
    images: ['/opengraph-image'],
    creator: '@mitulb05',
    site: '@mitulb05',
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
      alternateName: PROFILE.alternateNames,
      url: SITE_URL,
      image: absoluteUrl('/assets/profile.jpg'),
      jobTitle: [
        'AI Engineer',
        'Full-Stack Engineer',
        'AI Agent Engineer',
        'Backend Engineer',
        'LLM Systems Engineer',
      ],
      description: PROFILE.resumeSummary,
      email: PROFILE.email,
      telephone: PROFILE.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sonipat',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Newton School of Technology',
          url: 'https://newtonschool.co/nst',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Rishihood University',
          url: 'https://rishihood.edu.in',
        },
      ],
      sameAs: [
        PROFILE.github,
        PROFILE.linkedin,
        PROFILE.x,
        PROFILE.leetcode,
        PROFILE.codeforces,
      ],
      knowsAbout: [
        'Artificial Intelligence',
        'Agentic Systems',
        'Multi-Agent Orchestration',
        'LangGraph',
        'LangChain',
        'CrewAI',
        'Retrieval-Augmented Generation (RAG)',
        'Large Language Models (LLMs)',
        'FastAPI',
        'Next.js',
        'React',
        'Python',
        'TypeScript',
        'Vector Databases',
        'FAISS',
        'Qdrant',
        'ChromaDB',
        'LightRAG',
        'Backend Engineering',
        'Full-Stack Web Development',
        'Real-time Systems',
        'Docker',
        'PostgreSQL',
        'Redis',
        'AI Security & Guardrails',
      ],
      mainEntityOfPage: SITE_URL,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${PROFILE.name} — AI & Full-Stack Portfolio`,
      alternateName: ['mitulb95.dev', 'Mitul Bhatia Website', 'Mitul Bhatia Developer Portfolio'],
      description: PROFILE.metaDescription,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${PROFILE.name} — Official Engineering Profile`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
      description: PROFILE.metaDescription,
      inLanguage: 'en',
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[var(--paper)] focus:font-mono focus:text-xs focus:border focus:border-[var(--accent)]"
        >
          Skip to main content
        </a>
        <PaperRoot>
          <Masthead />
          <main id="main-content" className="flex-1 focus:outline-none">
            {children}
          </main>
          <FooterFolio />
          <PetDock />
        </PaperRoot>

      </body>
    </html>
  );
}
