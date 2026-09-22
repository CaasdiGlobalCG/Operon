import { CardGrid, CTABand, PageHero, SectionHead } from '../components/blocks';
import { Body, Button, Container, EmptyState, MonoLabel, Pending, Reveal, Section, TextLink } from '../components/ui';
import { ChasingCostCalculator, FragmentationTaxCalculator } from '../components/Calculators';

const REFERRALS = [
  { title: 'For Clients', copy: 'Refer another business to Operon 360.', cta: 'Refer a Client', to: '/grow#refer-client' },
  { title: 'For Vendors', copy: 'Refer a vendor into the verified network.', cta: 'Refer a Vendor', to: '/grow#refer-vendor' },
  { title: 'For Employees', copy: 'Referral program for open roles.', cta: 'Refer a Candidate', to: '/careers' },
];

export default function Grow() {
  return (
    <>
      <PageHero
        eyebrow="Marketing / Growth"
        headline="Grow with Operon."
        lead="Referral programs, case studies, research, and calculators to help you evaluate and grow with Operon 360."
      />

      {/* -------------------------------------------------------- referrals */}
      <Section surface="paper" id="refer-client">
        <Container>
          <SectionHead eyebrow="Referral programs" headline="Bring someone in. Get rewarded." />
          <Reveal className="mt-14" delay={60}>
            <CardGrid cols={3}>
              {REFERRALS.map((item) => (
                <article key={item.title} className="flex flex-col justify-between gap-8 bg-paper p-7 md:p-8">
                  <div>
                    <MonoLabel>{item.title}</MonoLabel>
                    <p className="mt-4 text-body text-ink-70">{item.copy}</p>
                  </div>
                  <Button to={item.to} variant="secondary">
                    {item.cta}
                  </Button>
                </article>
              ))}
            </CardGrid>
            <div className="mt-8">
              <Pending id="referral-terms" label="Program terms and reward structure" />
            </div>
          </Reveal>
          <span id="refer-vendor" className="sr-only" />
        </Container>
      </Section>

      {/* ------------------------------------------------------ case studies */}
      <Section surface="cloud" id="case-studies">
        <Container>
          <SectionHead eyebrow="Case studies" headline="How real teams use Operon 360.">
            <Body>
              Organised by industry — Construction, Retail, Manufacturing, Procurement, Supply Chain, Infrastructure,
              Materials.
            </Body>
          </SectionHead>
          <Reveal className="mt-12" delay={60}>
            <EmptyState message="New content is on the way." />
            <div className="mt-8">
              <Pending id="case-studies" label="Do not publish until one real, consented case study exists" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- research */}
      <Section surface="paper">
        <Container>
          <SectionHead eyebrow="Research" headline="Deeper reports on the problems we build for.">
            <div className="mt-2">
              <TextLink to="/insights#research">Read the full research library</TextLink>
            </div>
          </SectionHead>
        </Container>
      </Section>

      {/* ------------------------------------------------------- calculators */}
      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="Calculators" headline="Put a number on the problem." />

          <div id="fragmentation-calculator">
            <Reveal className="mt-14" delay={60}>
              <FragmentationTaxCalculator />
            </Reveal>
          </div>

          <div id="chasing-cost-calculator">
            <Reveal className="mt-8" delay={90}>
              <ChasingCostCalculator />
            </Reveal>
          </div>

          <Reveal className="mt-10" delay={120}>
            <Button to="/contact#general">Talk to us about reducing this</Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------- more resources */}
      <Section surface="paper">
        <Container>
          <SectionHead eyebrow="More resources" headline="Webinars · Templates · Partner Directory" />
          <Reveal className="mt-12" delay={60}>
            <EmptyState message="New content is on the way." />
            <div className="mt-8">
              <Pending id="more-resources" label="Webinars, templates, partner directory" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        eyebrow="Not sure where to start?"
        headline="Ask Search Dog."
        body="Available on every Operon Softwares page — if you're not sure which page or calculator is right for you, ask."
        actions={
          <Button tone="ink" onClick={() => window.dispatchEvent(new CustomEvent('searchdog:open'))}>
            Talk to Search Dog
          </Button>
        }
      />
    </>
  );
}
