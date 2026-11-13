import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ExperienceBoard } from '@/components/lines/ExperienceBoard';
import { ContactBand } from '@/components/lines/ContactBand';
import { ArrowRight, ArrowUpRight, Download } from '@/components/ui/icons';
import { RESUME_DOCX, RESUME_PDF } from '@/content/lines';
import { PROFILE } from '@/content/profile';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Mitul Bhatia — AI & Full-Stack Engineer',
  description: 'Mitul Bhatia\'s experience, education, engineering methodology, and background in AI and full-stack systems.',
  ...pageMetadata({
    path: '/about',
    title: 'About Mitul Bhatia — AI & Full-Stack Engineer',
    description: 'Mitul Bhatia\'s experience, education, engineering methodology, and background in AI and full-stack systems.',
    keywords: [
      'About Mitul Bhatia',
      'Mitul Bhatia Bio',
      'Mitul Bhatia Resume',
      'Mitul Bhatia Education',
      'Newton School of Technology',
      'Rishihood University',
      'AI Systems Engineer',
      'Mitul Bhatia Experience',
      'Kolably Developer',
      'Raindeer AI Lead',
    ],
    image: '/assets/profile.jpg',
    imageAlt: 'Portrait of Mitul Bhatia',
  }),
};

export default function AboutPage() {
  return (
    <>
      <header data-tour="about" className="border-b-2 border-ink">
        <div className="wrap animate-pageEnter grid gap-10 pb-14 pt-14 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <h1 className="t-h1 max-w-[16ch]">Engineer, student, and careful system builder.</h1>
            <div className="t-lead mt-7 grid max-w-[58ch] gap-5 text-muted">
              {PROFILE.bio.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open resume PDF
                <ArrowUpRight size={16} />
              </a>
              <a href={RESUME_DOCX} download className="btn btn-secondary">
                Download DOCX
                <Download size={16} />
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Contact me
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Image
              src="/assets/profile.jpg"
              alt="Portrait of Mitul Bhatia"
              width={877}
              height={877}
              priority
              sizes="(min-width: 1024px) 420px, 70vw"
              className="mx-auto aspect-square w-full max-w-[420px] rounded-full border-[10px] border-ink object-cover"
            />
          </div>
        </div>
      </header>

      <ExperienceBoard />

      <section className="wrap section" aria-labelledby="method-heading">
        <h2 id="method-heading" className="t-h2">
          How I approach the work
        </h2>
        <div
          className="run run-prose line-red mt-12"
          style={{ '--n': PROFILE.methodology.length, '--i': PROFILE.methodology.length - 1 } as React.CSSProperties}
        >
          <div className="run-track" aria-hidden="true">
            <div className="run-fill" />
          </div>
          <ol className="run-stops sm:gap-x-6">
            {PROFILE.methodology.map((step) => (
              <li key={step.id} className="run-stop" data-state="done">
                <span className="run-dot flex-none" aria-hidden="true" />
                <span>
                  <span className="t-h3 block">{step.title}</span>
                  <span className="mt-2 block text-muted text-pretty">{step.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section grid gap-14 !pt-0 lg:grid-cols-2">
        <div>
          <h2 className="t-h2">Education</h2>
          <div className="mt-8 border-t-2 border-ink pt-6">
            <p className="t-h3">{PROFILE.degree}</p>
            <p className="mt-2 text-muted">
              {PROFILE.school} · {PROFILE.years}
            </p>
            <p className="t-data mt-5 text-ink">
              CGPA {PROFILE.cgpa} · {PROFILE.academicStatus}
            </p>
            <p className="mt-5 max-w-[56ch] text-muted">{PROFILE.aiStudio.description}</p>
          </div>
        </div>

        <div>
          <h2 className="t-h2">Other signals</h2>
          <dl className="mt-8 border-t-2 border-ink">
            <div className="flex items-baseline justify-between gap-5 border-b border-rule py-4">
              <dt className="font-semibold">LeetCode rating</dt>
              <dd className="t-data text-lg">{PROFILE.ratings.leetcode}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-5 border-b border-rule py-4">
              <dt className="font-semibold">Codeforces rating</dt>
              <dd className="t-data text-lg">{PROFILE.ratings.codeforces}</dd>
            </div>
            {PROFILE.honors.map((honor) => (
              <div key={honor.title} className="border-b border-rule py-4">
                <dt className="font-semibold">{honor.title}</dt>
                {honor.detail ? <dd className="mt-1 text-sm text-muted">{honor.detail}</dd> : null}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
