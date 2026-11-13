import Image from 'next/image';
import Link from 'next/link';
import { PROFILE } from '@/content/profile';
import { RESUME_PDF } from '@/content/lines';
import { ArrowRight, ArrowUpRight } from '@/components/ui/icons';
import { RouteMap } from './RouteMap';

export function Hero() {
  const latest = PROFILE.experience[0];

  return (
    <section data-tour="hero" data-pip-mood="ambient" className="hero border-b-2 border-ink">
      <div className="wrap grid gap-12 pb-12 pt-12 lg:grid-cols-12 lg:items-center lg:gap-6 lg:pb-14 lg:pt-16">
        <div className="lg:col-span-5">
          <h1 className="t-display">
            <span className="hero-word">
              <span>Mitul</span>
            </span>
            <span className="hero-word">
              <span>Bhatia</span>
            </span>
          </h1>
          <p className="hero-in t-h3 mt-7 text-[var(--red-ink)]">{PROFILE.primaryTitle}</p>
          <p className="hero-in t-lead mt-4 max-w-[34ch] text-ink">{PROFILE.positioning}</p>
          <div className="hero-in mt-9 flex flex-wrap gap-3">
            <Link href="/#systems" className="btn btn-primary">
              See the systems
              <ArrowRight />
            </Link>
            <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Resume PDF
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <RouteMap />
        </div>
      </div>

      <div className="wrap">
        <dl className="hero-board grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1.2fr_1fr]">
          <div className="flex items-center gap-4 border-b border-rule py-5 sm:border-r sm:pr-6 lg:border-b-0">
            <Image
              src="/assets/profile.jpg"
              alt="Portrait of Mitul Bhatia"
              width={128}
              height={128}
              priority
              className="h-16 w-16 flex-none rounded-full border-2 border-ink object-cover"
            />
            <div>
              <dt className="t-sign text-muted">Based in</dt>
              <dd className="font-semibold leading-snug">{PROFILE.location}</dd>
            </div>
          </div>
          <div className="border-b border-rule py-5 sm:pl-6 lg:border-b-0 lg:border-r lg:pr-6">
            <dt className="t-sign text-muted">Latest role</dt>
            <dd className="font-semibold leading-snug">
              {latest.role}, {latest.organization}
              <span className="t-data mt-1 block font-normal text-muted">{latest.tenure}</span>
            </dd>
          </div>
          <div className="border-b border-rule py-5 sm:border-b-0 sm:border-r sm:pr-6 lg:pl-6">
            <dt className="t-sign text-muted">Studying</dt>
            <dd className="font-semibold leading-snug">
              {PROFILE.degree}
              <span className="t-data mt-1 block font-normal text-muted">
                CGPA {PROFILE.cgpa} · {PROFILE.years}
              </span>
            </dd>
          </div>
          <div className="py-5 sm:pl-6">
            <dt className="t-sign text-muted">Open to</dt>
            <dd className="font-semibold leading-snug">
              Internships and engineering roles
              <Link href="/contact" className="text-link mt-1 !flex text-sm">
                Get in touch
                <ArrowRight size={15} />
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
