'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Magnetic } from './Magnetic';

const NAV_LINKS = [
  { href: '/work', label: 'WORK' },
  { href: '/about', label: 'ABOUT' },
  { href: '/skills', label: 'SKILLS' },
  { href: '/contact', label: 'CONTACT' },
];

export function Masthead() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--border-notebook)] transition-colors duration-500">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Brand Name */}
        <Link
          href="/"
          className="group flex flex-col focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
            Mitul Bhatia
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[var(--muted)] uppercase -mt-0.5">
            Systems & Agentic Eng.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs tracking-wider transition-colors py-1 border-b ${
                  isActive
                    ? 'text-[var(--ink)] border-[var(--accent)] font-semibold'
                    : 'text-[var(--muted)] border-transparent hover:text-[var(--ink)] hover:border-[var(--border-notebook)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Stamped Resume Button */}
          <Magnetic strength={0.2}>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider px-3.5 py-1.5 border border-[var(--ink)] bg-[var(--elevated)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors shadow-notebook active:translate-x-0.5 active:translate-y-0.5 inline-block"
            >
              RESUME ↗
            </a>
          </Magnetic>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] px-2.5 py-1.5 min-h-[40px] flex items-center border border-[var(--ink)] bg-[var(--elevated)] text-[var(--ink)]"
          >
            RESUME
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] p-2 border border-[var(--border-notebook)] bg-[var(--elevated)] text-[var(--ink)] font-mono text-xs cursor-pointer flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? 'CLOSE [✕]' : 'MENU [≡]'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="md:hidden border-b border-[var(--border-notebook)] bg-[var(--elevated)] px-6 py-4 flex flex-col gap-3"
        >
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-xs tracking-wider py-2.5 px-3 min-h-[44px] flex items-center border border-[var(--border-notebook)] ${
                  isActive ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold' : 'bg-[var(--paper)] text-[var(--ink)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
