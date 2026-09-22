import { CardGrid, CTABand, PageHero } from '../../components/blocks';
import { Button, Container, MonoLabel, Reveal, Section } from '../../components/ui';
import { O360 } from '../../lib/site';

const PILLARS = [
  {
    name: 'Trust',
    copy: "Every vendor is verified before they're visible. Operon 360's multi-level KYC verification process establishes credibility between clients and vendors before a project ever begins.",
  },
  {
    name: 'Speed',
    copy: 'One platform, fewer handoffs, faster decisions. Rather than coordinating across multiple disconnected tools, clients get one workspace for everything.',
  },
  {
    name: 'Verified Network',
    copy: 'Built on verification, not volume. The vendor network runs on dynamic, multi-level KYC rather than open, unvetted listings.',
  },
];

export default function WhyUs() {
  return (
    <>
      <PageHero
        surface="ink"
        eyebrow="Operon 360"
        headline="Why Operon 360"
        lead="Trust, speed, and a verified vendor network — what Operon 360 is built around."
        actions={
          <Button to={`${O360}/get-demo`} tone="ink">
            Get Demo
          </Button>
        }
      />

      <Section surface="paper">
        <Container>
          <Reveal>
            <CardGrid cols={3}>
              {PILLARS.map((pillar) => (
                <article key={pillar.name} className="flex flex-col gap-4 bg-paper p-7 md:p-8">
                  <MonoLabel>{pillar.name}</MonoLabel>
                  <p className="text-body text-ink-70">{pillar.copy}</p>
                </article>
              ))}
            </CardGrid>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        surface="cloud"
        eyebrow="Next step"
        headline="See how verification works."
        actions={
          <>
            <Button to={`${O360}/features#get-operonified`} variant="secondary">
              See how verification works
            </Button>
            <Button to={`${O360}/get-demo`}>Get Demo</Button>
          </>
        }
      />
    </>
  );
}
