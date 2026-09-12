import type { Metadata } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { PaperRoot } from '@/components/shell/PaperRoot';
import { ScrollProgress } from '@/components/shell/ScrollProgress';
import { CustomCursor } from '@/components/shell/CustomCursor';
import { Masthead } from '@/components/shell/Masthead';
import { FooterFolio } from '@/components/shell/FooterFolio';
import { BotDock } from '@/components/notebook/BotDock';
import { PROFILE } from '@/content/profile';

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
  metadataBase: new URL('https://mitulbhatia.dev'),
  title: {
    default: `${PROFILE.name} — ${PROFILE.primaryTitle}`,
    template: `${PROFILE.name} — %s`,
  },
  description: PROFILE.metaDescription,
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.primaryTitle}`,
    description: PROFILE.openGraphDescription,
    url: 'https://mitulbhatia.dev',
    siteName: `${PROFILE.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — ${PROFILE.primaryTitle}`,
    description: PROFILE.openGraphDescription,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
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
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-700">
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
