import Link from 'next/link';
import { PROFILE } from '@/content/profile';
import { RESUME_PDF } from '@/content/lines';

const INTERNAL = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/news', label: 'Reading' },
  { href: '/contact', label: 'Contact' },
];

export function FooterFolio() {
  const external = [
    { href: RESUME_PDF, label: 'Resume' },
    { href: PROFILE.github, label: 'GitHub' },
    { href: PROFILE.linkedin, label: 'LinkedIn' },
    { href: PROFILE.x, label: 'X' },
  ];

  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="four-lines" aria-hidden="true" />
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="t-h2">Mitul Bhatia</p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-3 inline-block break-all text-paper/80 underline decoration-paper/40 hover:text-paper hover:decoration-yellow"
          >
            {PROFILE.email}
          </a>
        </div>
        <div className="grid gap-4 text-[0.95rem] font-semibold">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {INTERNAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/80 hover:text-yellow">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {external.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-paper/80 hover:text-yellow">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="t-data text-paper/60">© {new Date().getFullYear()}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
