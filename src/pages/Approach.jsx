import { CTABand, PageHero, SectionHead } from '../components/blocks';
import { Button, Container, Reveal, Section, Shape } from '../components/ui';
import { METHOD_STAGES } from '../content/platform';
import { O360 } from '../lib/site';

export default function Approach() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        headline="How a structural gap becomes a permanent platform."
        lead="Five stages. One discipline, repeated for every platform we build — including the one we're building next."
        actions={<Button to={O360}>See Operon 360, our first platform</Button>}
      />

      {/* ---------------------------------------------------------- the method */}
      <Section surface="paper">
        <Container>
          <SectionHead eyebrow="Our method" headline="Identify. Understand. Build. Enable. Scale." />

          <Reveal className="mt-16" delay={60}>
            <ol className="border-t border-ink-14">
              {METHOD_STAGES.map((stage, i) => (
                <li
                  key={stage.term}
                  className="grid gap-4 border-b border-ink-14 py-9 md:grid-cols-[4.5rem_0.7fr_1.3fr] md:gap-8"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-mono uppercase tabular-nums text-ink-40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Shape form={stage.shape} size={13} className="mt-1" />
                  </div>
                  <h3 className="font-display text-h4 font-semibold">{stage.term}</h3>
                  <p className="max-w-prose text-body text-ink-70">{stage.copy}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        eyebrow="Next step"
        headline="See Operon 360, our first platform."
        body="The only platform to have completed all five stages."
        actions={
          <Button to={O360} tone="ink">
            Enter Operon 360
          </Button>
        }
      />
    </>
  );
}
