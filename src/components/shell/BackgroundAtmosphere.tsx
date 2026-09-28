'use client';

import { usePathname } from 'next/navigation';
import { PathField } from './PathField';

export function BackgroundAtmosphere() {
  const pathname = usePathname();
  const quietReading = pathname === '/news';

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage: 'url(/assets/plates/paper-texture.png)',
          backgroundRepeat: 'repeat',
        }}
      />

      <PathField quiet={quietReading} />

      <div className="absolute inset-x-6 top-6 hidden border-t border-[var(--border-notebook)] opacity-50 xl:block" />
      <div className="absolute bottom-6 left-6 top-6 hidden border-l border-[var(--border-notebook)] opacity-50 xl:block" />
    </div>
  );
}
