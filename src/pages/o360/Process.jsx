import { CTABand, PageHero, SectionHead, Steps } from '../../components/blocks';
import { Button, Container, MonoLabel, Reveal, Section } from '../../components/ui';
import { PROCESS_STEPS, VENDOR_STAGES, VENDOR_TIERS } from '../../content/platform';
import { O360 } from '../../lib/site';

export default function Process() {
  return (
    <>
      <PageHero
        surface="ink"
        eyebrow="Operon 360 · Process flow"
        headline="From requirement to delivery."
        lead="How a project moves through Operon 360, step by step."
        actions={
          <>
            <Button to={`${O360}/get-demo`} tone="ink">
              For Clients — Get Started
            </Button>
            <Button to={`${O360}/get-demo`} tone="ink" variant="secondary">
              For Vendors — Join
            </Button>
          </>
        }
      />

      <Section surface="paper">
        <Container>
          <Reveal>
            <Steps steps={PROCESS_STEPS} />
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------- how vendors join */}
      <Section surface="cloud" id="vendor-joins">
        <Container>
          <SectionHead eyebrow="How vendors join" headline="Ten stages. No shortcuts, no self-declared trust.">
            <p className="max-w-prose text-body text-ink-70">
              Verification is the product. A vendor tier on Operon 360 means specific checks were completed by us — and
              it can go down as easily as it went up. Each stage is a discrete check with a recorded outcome; a vendor
              does not advance by paying, waiting, or knowing someone.
            </p>
          </SectionHead>

          <Reveal className="mt-16" delay={60}>
            <Steps steps={VENDOR_STAGES} />
          </Reveal>

          <Reveal className="mt-16" delay={90}>
            <MonoLabel>What a tier means</MonoLabel>
            <div className="mt-6 grid gap-px overflow-hidden rounded-lg bg-ink-14 md:grid-cols-3">
              {VENDOR_TIERS.map((tier) => (
                <div key={tier.name} className="bg-cloud p-6">
                  <h3 className="font-display text-h4 font-semibold">{tier.name}</h3>
                  <p className="mt-3 text-sm text-ink-70">{tier.copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-prose text-sm text-ink-55">
              Tiers are reviewed continuously against stage 10. Missed dates, quality failures or disputes lower a tier
              without negotiation.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        surface="cloud"
        eyebrow="Next step"
        headline="Start on whichever side you're on."
        actions={
          <>
            <Button to={`${O360}/get-demo`}>For Clients — Get Started</Button>
            <Button to={`${O360}/get-demo`} variant="secondary">
              For Vendors — Join
            </Button>
          </>
        }
      />
    </>
  );
}
