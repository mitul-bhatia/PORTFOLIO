'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RESUME_PDF } from '@/content/lines';
import { ArrowUpRight, Close, Menu } from '@/components/ui/icons';
import { MotionToggle } from '@/components/ui/MotionToggle';

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/news', label: 'Reading' },
  { href: '/contact', label: 'Contact' },
];

export function Masthead() {
  const pathname = usePathname() || '/';
  // The menu belongs to the page it was opened on, so any route change closes it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedOn(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b-2 border-ink bg-paper"
      style={{ viewTransitionName: 'site-header' } as React.CSSProperties}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpenedOn(null)}
          className="group flex min-w-0 flex-none items-center gap-3"
          aria-label="Mitul Bhatia, home"
        >
          <span
            aria-hidden="true"
            className="relative grid h-7 w-7 flex-none place-items-center rounded-full border-[5px] border-ink bg-white transition-colors group-hover:border-red"
          />
          <span className="truncate text-lg font-extrabold tracking-tight [font-stretch:108%]">Mitul Bhatia</span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <nav className="flex items-center" aria-label="Primary">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group flex items-center gap-2 px-3 py-2 text-[0.95rem] font-semibold transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 rounded-full border-[3px] transition-colors ${
                      active ? 'border-ink bg-red' : 'border-rule bg-white group-hover:border-ink'
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <MotionToggle className="ml-1" />
          <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn btn-primary ml-2 !min-h-10 !px-4">
            Resume
            <ArrowUpRight size={16} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpenedOn(menuOpen ? null : pathname)}
          className="btn btn-secondary !min-h-11 !px-3 lg:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <Close size={18} /> : <Menu size={18} />}
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <div className="scroll-line" aria-hidden="true" />

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="animate-fadeIn border-t border-rule bg-panel lg:hidden"
        >
          <div className="wrap grid py-3">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenedOn(null)}
                  aria-current={active ? 'page' : undefined}
                  className="flex min-h-12 items-center gap-3 border-b border-rule text-xl font-bold"
                >
                  <span
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 rounded-full border-[3px] border-ink ${active ? 'bg-red' : 'bg-white'}`}
                  />
                  {item.label}
                </Link>
              );
            })}
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-4 justify-center"
            >
              Open resume PDF
              <ArrowUpRight size={16} />
            </a>
            <MotionToggle withLabel className="my-3 justify-self-start" />
          </div>
        </nav>
      )}
    </header>
  );
}
