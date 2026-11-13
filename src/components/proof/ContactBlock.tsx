import { PROFILE } from '@/content/profile';
import { RESUME_DOCX, RESUME_PDF } from '@/content/lines';
import { ArrowUpRight, Download } from '@/components/ui/icons';

const PROFILES = [
  { label: 'GitHub', detail: '@mitul-bhatia', href: PROFILE.github },
  { label: 'LinkedIn', detail: 'Mitul Bhatia', href: PROFILE.linkedin },
  { label: 'X', detail: '@mitulb05', href: PROFILE.x },
  { label: 'LeetCode', detail: `Rating ${PROFILE.ratings.leetcode}`, href: PROFILE.leetcode },
  { label: 'Codeforces', detail: `Rating ${PROFILE.ratings.codeforces}`, href: PROFILE.codeforces },
];

export function ContactBlock() {
  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <section className="line-red border-t-[10px] border-[var(--line)] pt-6">
          <h2 className="t-h2">Email</h2>
          <p className="mt-4 max-w-[46ch] text-muted">
            The best way to reach me about internships, engineering roles, projects, or technical collaboration.
          </p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-6 block break-all text-[clamp(1.05rem,2.1vw,1.4rem)] font-bold underline decoration-red decoration-[3px] underline-offset-[6px] hover:text-[var(--red-ink)]"
          >
            {PROFILE.email}
          </a>
          <a href={`mailto:${PROFILE.email}`} className="btn btn-primary mt-7">
            Write an email
            <ArrowUpRight size={16} />
          </a>
        </section>

        <section className="line-blue border-t-[10px] border-[var(--line)] pt-6">
          <h2 className="t-h2">Resume</h2>
          <p className="mt-4 max-w-[46ch] text-muted">
            One page covering experience at Kolably and Raindeer.social, selected projects, education, skills, and
            achievements.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open PDF
              <ArrowUpRight size={16} />
            </a>
            <a href={RESUME_DOCX} download className="btn btn-secondary">
              Download DOCX
              <Download size={16} />
            </a>
          </div>
        </section>
      </div>

      <section className="mt-20" aria-labelledby="elsewhere-heading">
        <h2 id="elsewhere-heading" className="t-h2">
          Elsewhere
        </h2>
        <ul className="mt-8 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-5">
          {PROFILES.map((profile) => (
            <li key={profile.label} className="border-b border-rule lg:border-b-0 lg:border-r lg:last:border-r-0">
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-24 flex-col justify-center py-5 transition-colors hover:bg-panel lg:px-5 lg:first:pl-0"
              >
                <span className="t-h3 flex items-center gap-2">
                  {profile.label}
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="t-data mt-1 text-muted">{profile.detail}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="t-data mt-12 flex flex-col gap-2 border-t border-rule pt-5 text-muted sm:flex-row sm:justify-between">
        <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="hover:text-ink">
          {PROFILE.phone}
        </a>
        <span>{PROFILE.location}</span>
      </div>
    </div>
  );
}
