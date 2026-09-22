import { useState } from 'react';
import { PageHero } from '../components/blocks';
import { Container, EmptyState, MonoLabel, Pending, Reveal, Section } from '../components/ui';

const CATEGORIES = [
  { id: 'all', label: 'All', copy: null },
  {
    id: 'industry',
    label: 'Industry Insights',
    copy: 'Analysis and commentary on the structural gaps Operon Softwares tracks. Editorial tone, not promotional.',
  },
  {
    id: 'research',
    label: 'Research',
    copy: 'Longer-form papers and reports. The same content pool referenced on Marketing/Growth — published once, surfaced in both places.',
  },
  { id: 'company', label: 'Company Updates', copy: 'Milestones, hires, company-level news.' },
  {
    id: 'platform',
    label: 'Platform Updates',
    copy: 'Release notes and feature announcements from Operon 360 and future platforms.',
  },
];

export default function Insights() {
  const [active, setActive] = useState('all');
  const current = CATEGORIES.find((c) => c.id === active);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        headline="Insights"
        lead="Industry Insights · Research · Company Updates · Platform Updates"
      />

      <Section surface="paper" id="research">
        <Container>
          <Reveal>
            <div role="tablist" className="flex flex-wrap gap-6 border-b border-ink-14">
              {CATEGORIES.map((cat) => {
                const is = cat.id === active;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={is}
                    onClick={() => setActive(cat.id)}
                    className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-180 ${
                      is ? 'border-ink text-ink' : 'border-transparent text-ink-55 hover:text-ink'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="mt-10" delay={60}>
            {current.copy ? <p className="max-w-prose text-body text-ink-70">{current.copy}</p> : null}
            <div className="mt-10">
              <EmptyState message="New content is on the way." />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MonoLabel>Publish checklist</MonoLabel>
              <Pending id="insights-articles" label="Article library" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
