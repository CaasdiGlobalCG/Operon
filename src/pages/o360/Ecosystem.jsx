import { CTABand, PageHero } from '../../components/blocks';
import { Button, Container, MonoLabel, Reveal, Section } from '../../components/ui';
import { ECOSYSTEM } from '../../content/platform';
import { O360 } from '../../lib/site';

export default function Ecosystem() {
  return (
    <>
      <PageHero
        surface="ink"
        eyebrow="Operon 360 · Ecosystem"
        headline="One ecosystem, seven connected parts."
        lead="Clients, Projects, Vendors, Procurement, Materials, Services, and Technology — all connected inside Operon 360."
      />

      <Section surface="paper">
        <Container>
          <Reveal>
            <ol className="border-t border-ink-14">
              {ECOSYSTEM.map((node, i) => (
                <li
                  key={node.name}
                  className="grid gap-3 border-b border-ink-14 py-8 md:grid-cols-[3rem_0.7fr_1.3fr] md:gap-8"
                >
                  <span className="font-mono text-mono uppercase tabular-nums text-ink-40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-h4 font-semibold">{node.name}</h2>
                  <p className="max-w-prose text-body text-ink-70">{node.copy}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        surface="cloud"
        eyebrow="Next step"
        headline="See the modules behind each part."
        actions={<Button to={`${O360}/features`}>See Features</Button>}
      />
    </>
  );
}
