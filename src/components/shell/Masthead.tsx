'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMagnetic } from '@/lib/motion';

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export function Masthead() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const resumeMagnetic = useMagnetic<HTMLAnchorElement>(36);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-notebook)] bg-[var(--paper)]">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Mitul Bhatia, home">
          <span className="font-serif text-lg font-semibold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--accent)] sm:text-xl">
            Mitul Bhatia
          </span>
          <span className="hidden h-4 border-l border-[var(--border-notebook)] sm:block" />
          <span className="hidden truncate font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] sm:block">
            AI / Full-Stack Engineer
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <nav className="flex items-center gap-7" aria-label="Primary navigation">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-2 font-mono text-[11px] font-medium uppercase tracking-[0.13em] transition-colors after:absolute after:inset-x-0 after:-bottom-[13px] after:h-px after:bg-[var(--accent)] after:transition-transform ${
                    active
                      ? 'text-[var(--ink)] after:scale-x-100'
                      : 'text-[var(--muted)] after:scale-x-0 hover:text-[var(--ink)] hover:after:scale-x-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <span className="h-4 border-l border-[var(--border-notebook)]" />

          <a
            ref={resumeMagnetic.ref}
            style={resumeMagnetic.style}
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--ink)] bg-[var(--paper-soft)] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)] shadow-notebook transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Resume ↗
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="border border-[var(--border-notebook)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink)] md:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[var(--border-notebook)] bg-[var(--paper-soft)] px-5 py-5 md:hidden"
        >
          <div className="mx-auto grid max-w-[1320px] gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[var(--border-notebook)] py-3 font-serif text-xl text-[var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-dark)]"
            >
              Open resume PDF
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
