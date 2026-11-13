import { PROFILE } from '@/content/profile';
import { Reveal } from '@/components/ui/Reveal';
import { StationClock } from './StationClock';

/** Experience as a departures board: when, what, where. Full-bleed and dark. */
export function ExperienceBoard({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'h1' }) {
  const Heading = headingLevel;
  return (
    <section
      data-tour="experience"
      data-pip-mood="charting"
      data-pip-say="Two startups and a GPU fellowship. I checked the dates."
      className="bg-ink text-paper" aria-labelledby="experience-heading">
      <div className="wrap section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading id="experience-heading" className="t-h2">
            Experience
          </Heading>
          <StationClock />
        </div>

        <Reveal as="ol" kind="stagger" className="mt-10 border-t-2 border-paper">
          {PROFILE.experience.map((item) => (
            <li
              key={`${item.organization}-${item.role}`}
              className="grid gap-x-10 gap-y-4 border-b border-paper/25 py-8 lg:grid-cols-12"
            >
              <p className="t-data text-[0.9rem] text-yellow lg:col-span-3 lg:pt-1.5">{item.tenure}</p>
              <div className="lg:col-span-4">
                <h3 className="t-h3">{item.role}</h3>
                <p className="mt-1 text-lg font-semibold text-paper/90">{item.organization}</p>
                <p className="t-sign mt-2 text-paper/65">{item.context}</p>
              </div>
              <div className="lg:col-span-5">
                <ul className="grid gap-3 text-paper/80">
                  {item.details.map((detail) => (
                    <li key={detail} className="max-w-[60ch] text-pretty">
                      {detail}
                    </li>
                  ))}
                </ul>
                {item.skills ? (
                  <p className="t-data mt-5 leading-relaxed text-paper/60">{item.skills.join('  ·  ')}</p>
                ) : null}
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
