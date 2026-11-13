import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested portfolio page could not be found.',
};

export default function NotFound() {
  return (
    <section className="wrap section">
      <h1 className="t-display max-w-[12ch]">This stop isn&apos;t on the map.</h1>
      <p className="t-lead mt-7 max-w-[52ch] text-muted">
        Error 404. The link may be outdated, or the project may have moved. The work index is the fastest way back in.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/work" className="btn btn-primary">
          View work
          <ArrowRight />
        </Link>
        <Link href="/" className="btn btn-secondary">
          Go home
        </Link>
      </div>
    </section>
  );
}
