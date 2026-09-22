import { Link } from 'react-router-dom';
import { PageHero } from '../components/blocks';
import { Container, MonoLabel, Pending, Reveal, Section } from '../components/ui';
import { INDUSTRY_CONTENT } from '../content/industries';
import { INDUSTRIES } from '../lib/site';

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        headline="Built for how real industries actually operate."
        lead="Different sectors, the same underlying pattern — work that depends on coordinating many parties, without a dedicated system to manage it."
      />

      <Section surface="paper">
        <Container>
          <Reveal className="grid gap-px overflow-hidden rounded-lg bg-ink-14 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => {
              const data = INDUSTRY_CONTENT[industry.slug];
              return (
                <Link
                  key={industry.slug}
                  to={`/industries/${industry.slug}`}
                  className="group flex min-h-[13rem] flex-col justify-between gap-6 bg-paper p-7 transition-colors duration-180 hover:bg-cloud md:p-8"
                >
                  <div>
                    <h2 className="font-display text-h4 font-semibold">{data.name}</h2>
                    <p className="mt-3 max-w-measure text-sm text-ink-70">{data.line}</p>
                    {data.pending ? (
                      <div className="mt-4">
                        <Pending id={data.pending} label="Additional sectors" />
                      </div>
                    ) : null}
                  </div>
                  <MonoLabel className="text-ink-40 transition-colors duration-180 group-hover:text-ink">
                    Read the {data.name} deep-dive
                  </MonoLabel>
                </Link>
              );
            })}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
