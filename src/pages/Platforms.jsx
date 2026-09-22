import { CTABand, PageHero, SectionHead } from '../components/blocks';
import { Body, Button, Container, Display, ExternalLink, MonoLabel, Reveal, Section } from '../components/ui';
import Signal from '../components/Signal';
import { O360 } from '../lib/site';

export default function Platforms() {
  return (
    <>
      <PageHero
        eyebrow="Platforms"
        headline="We build platforms, not standalone products."
        lead="Every platform owns one utility, built and operated directly — never bundled, never spun off. Operon 360 is our first."
        actions={<Button to={O360}>Enter Operon 360</Button>}
        aside={<Signal className="w-[200px] md:w-[260px]" />}
      />

      {/* ----------------------------------------------------- philosophy */}
      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="Platform philosophy" headline="Every platform owns one utility. Nothing more.">
            <Body>
              A conventional software company grows one product by expanding its feature surface into a catch-all suite.
              We draw a hard line at the utility boundary: a genuinely new utility gets a new platform, built and owned
              directly. What platforms share is infrastructure, not product surface — identity and access, core data
              platform, AI and automation services, billing, security — which is why each new platform moves faster than
              the one before it.
            </Body>
          </SectionHead>
        </Container>
      </Section>

      {/* ------------------------------------------------------ operon 360 */}
      <Section surface="paper">
        <Container>
          <Reveal className="rounded-lg border border-ink-14 p-8 md:p-12">
            <MonoLabel>Execution infrastructure</MonoLabel>
            <Display level={2} className="mt-6 text-h2">
              Operon 360
            </Display>
            <Body className="mt-6">
              A PM-led workflow operating system connecting verified vendors and clients inside a dedicated workspace —
              covering B2B procurement, sourcing, project management, and execution, with visibility and accountability
              built in from first requirement to final delivery. It&rsquo;s the first platform Operon Softwares has built,
              owns, and operates directly.
            </Body>
            <div className="mt-10">
              <Button to={O360}>Enter Operon 360</Button>
            </div>
          </Reveal>

          {/* ----------------------------------------------------- graviyx */}
          <Reveal className="mt-8 rounded-lg border border-dashed border-ink-30 p-8 md:p-12" delay={60}>
            <MonoLabel>Integrated platform</MonoLabel>
            <Display level={2} className="mt-6 text-h2">
              Graviyx
            </Display>
            <Body className="mt-2 font-display text-h4 font-semibold text-ink">
              Vendor payments, integrated with Operon 360.
            </Body>
            <Body className="mt-6">
              Graviyx is a separate, external platform integrated with Operon 360&rsquo;s vendor and procurement workflows.
              The link below leaves the Operon Softwares site entirely.
            </Body>
            <div className="mt-10">
              <ExternalLink className="inline-flex h-11 items-center rounded-md bg-ink px-5 text-sm font-medium text-paper hover:bg-ink-70">
                Visit Graviyx
              </ExternalLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ what's next */}
      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="What's next" headline="Built the same way, every time.">
            <Body>
              Every future platform will pass through the same five-stage method and be built, owned, and operated
              directly by Operon Softwares. No future platform exists yet beyond Operon 360.
            </Body>
            <div className="mt-8">
              {/* <Button to="/approach" variant="secondary">
                See how we build
              </Button> */}
            </div>
          </SectionHead>
        </Container>
      </Section>

      <CTABand
        eyebrow="Next step"
        headline="Start with the platform that exists today."
        actions={
          <Button to={O360} tone="ink">
            Enter Operon 360
          </Button>
        }
      />
    </>
  );
}
