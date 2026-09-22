import { CTABand, PageHero, SectionHead, Tabs } from '../../components/blocks';
import { Body, Button, Container, MonoLabel, Reveal, Section, Shape, TextLink } from '../../components/ui';
import { ECOSYSTEM, MODULES } from '../../content/platform';
import { O360 } from '../../lib/site';

export default function O360Landing() {
  return (
    <>
      <PageHero
        surface="ink"
        eyebrow="Operon 360 · Execution infrastructure"
        headline="The PM-led workflow operating system for businesses."
        lead="Operon 360 connects verified vendors and clients inside a dedicated workspace for B2B procurement, sourcing, PM-led development, and PM-led execution — with complete visibility, accountability, and streamlined delivery."
        actions={
          <>
            <Button to={`${O360}/get-demo`} tone="ink">
              Get Demo
            </Button>
            {/* <Button to={`${O360}/login`} tone="ink" variant="secondary">
              Login
            </Button> */}
          </>
        }
      />

      {/* -------------------------------------------------------- who it's for */}
      <Section surface="paper" id="clients">
        <Container>
          <SectionHead eyebrow="Who it's for" headline="Built for both sides of every project." />
          <Reveal className="mt-14" delay={60}>
            <Tabs
              tabs={[
                {
                  id: 'clients',
                  label: 'For Clients',
                  content: (
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                      <Body>
                        For a large enterprise: one platform instead of many, faster decisions, shorter turnaround.
                      </Body>
                      <div>
                        <Body>
                          For a growing business without a large team: Operon 360&rsquo;s dedicated project managers take on
                          marketing, finance, vendor, procurement, supply chain, and operations coordination so the
                          business doesn&rsquo;t have to build that function internally.
                        </Body>
                        <div className="mt-6">
                          <TextLink to="/grow#fragmentation-calculator">
                            Fragmentation calculator — put a number on disconnected tools
                          </TextLink>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'vendors',
                  label: 'For Vendors',
                  content: (
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                      <Body>
                        Vendors are verified before they are visible. Multi-level KYC through Get Operonified
                        establishes credibility between clients and vendors before a project ever begins.
                      </Body>
                      <div>
                        <Body>
                          Verified vendors are matched to requirements, respond to tenders and bids in a structured
                          format, and work inside the same project workspace as the client and the PM.
                        </Body>
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                          <Button to={`${O360}/process#vendor-joins`} variant="secondary">
                            See how vendors join
                          </Button>
                          <TextLink to="/grow#chasing-cost-calculator">Chasing-cost calculator</TextLink>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </Reveal>
          <span id="vendors" className="sr-only" />
        </Container>
      </Section>

      {/* -------------------------------------------------------- how it works */}
      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="How it works" headline="Tell us what you need. We take it from there.">
            <Body>
              A client submits a requirement. A dedicated project manager gathers the details needed to understand it
              fully, then Operon 360 identifies and finalises the right service provider or vendor from its verified
              network — and executes the project, procures materials, and manages delivery end to end.
            </Body>
            <div className="mt-8">
              <Button to={`${O360}/process`} variant="secondary">
                See the full process
              </Button>
            </div>
          </SectionHead>

          <Reveal className="mt-16" delay={60}>
            <ol className="grid gap-px overflow-hidden rounded-lg bg-ink-14 md:grid-cols-4">
              {[
                { shape: 'circle', term: 'Requirement', copy: 'The client says what they need.' },
                { shape: 'square', term: 'PM review', copy: 'A dedicated PM gathers the detail.' },
                { shape: 'triangle', term: 'Matched & executed', copy: 'Verified vendors, managed delivery.' },
                { shape: 'small-circle', term: 'Delivered', copy: 'Reviewed, approved, signed off.' },
              ].map((node) => (
                <li key={node.term} className="flex min-h-[11rem] flex-col justify-between gap-6 bg-cloud p-6">
                  <Shape form={node.shape} size={16} />
                  <div>
                    <h3 className="font-display text-h4 font-semibold">{node.term}</h3>
                    <p className="mt-2 text-sm text-ink-70">{node.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- ecosystem */}
      <Section surface="ink" ambient id="ecosystem">
        <Container>
          <SectionHead eyebrow="Ecosystem" headline="Everything a project touches, in one system." tone="paper">
            <Body tone="paper">
              Clients · Projects · Vendors · Procurement · Materials · Services · Technology — all connected inside the
              same workspace.
            </Body>
            <div className="mt-8">
              <Button to={`${O360}/ecosystem`} tone="ink" variant="secondary">
                Explore the ecosystem
              </Button>
            </div>
          </SectionHead>

          <Reveal className="mt-16 grid gap-px overflow-hidden rounded-lg bg-paper-14 sm:grid-cols-2 lg:grid-cols-4" delay={60}>
            {ECOSYSTEM.map((node) => (
              <div key={node.name} className="bg-ink p-6">
                <MonoLabel tone="paper">{node.name}</MonoLabel>
                <p className="mt-4 text-sm text-paper-70">{node.copy}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ features */}
      <Section surface="paper" id="features">
        <Container>
          <SectionHead eyebrow="Features" headline="Eight modules, one connected workspace.">
            <Body>
              Every project runs on the same connected modules — from the shared workspace and the Canvas to verified
              onboarding, tenders, procurement, and the finance layer.
            </Body>
            <div className="mt-8">
              <Button to={`${O360}/features`} variant="secondary">
                See all features
              </Button>
            </div>
          </SectionHead>

          <Reveal className="mt-16 grid gap-px overflow-hidden rounded-lg bg-ink-14 sm:grid-cols-2 lg:grid-cols-4" delay={60}>
            {MODULES.map((module) => (
              <a key={module.id} href={`${O360}/features#${module.id}`} className="group bg-cloud p-6 transition-colors duration-180 hover:bg-paper">
                <MonoLabel>{module.subtitle ? `${module.name} · ${module.subtitle}` : module.name}</MonoLabel>
                <p className="mt-4 text-sm text-ink-70">{module.what}</p>
              </a>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CTABand
        surface="cloud"
        eyebrow="Next step"
        headline="See it running on a real project."
        actions={
          <>
            <Button to={`${O360}/get-demo`}>Get Demo</Button>
            <Button to={`${O360}/why-us`} variant="secondary">
              Why Operon 360
            </Button>
          </>
        }
      />
    </>
  );
}
