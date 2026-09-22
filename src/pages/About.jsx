import { CTABand, PageHero, SectionHead } from '../components/blocks';
import { Body, Button, Container, Display, MonoLabel, Pending, Reveal, Section } from '../components/ui';
import { O360 } from '../lib/site';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        headline="A technology venture company."
        lead="Operon Softwares Private Limited identifies structural gaps across governments, enterprises, and industries, and builds the technology platforms required to close them — directly, at scale, starting with Operon 360."
        actions={
          <>
            <Button to="/approach">See our full approach</Button>
            <Button to={O360} variant="secondary">
              Explore Operon 360
            </Button>
          </>
        }
      />

      {/* ------------------------------------------------- company overview */}
      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="Company overview" headline="We identify structural gaps — and build what closes them.">
            <Body>
              We scan governments, enterprises, and industries for critical functions that are fragmented, manual, or
              missing entirely, and build the platforms required to close them at scale. Entire categories of
              operational and informational infrastructure remain undersupplied — held together today by spreadsheets,
              hallway conversations, and informal process rather than dedicated systems. We close these gaps one utility
              at a time, and we build, own, and operate every platform ourselves — the way a single company can run
              several distinct products under one roof, rather than spinning off subsidiaries.
            </Body>
          </SectionHead>
        </Container>
      </Section>

      {/* ------------------------------------------------------ the operon model */}
      <Section surface="paper">
        <Container>
          <SectionHead eyebrow="The Operon model" headline="One company. A repeatable way of building.">
            <Body>
              A standing origination function scans for structural gaps, tests each candidate against a fixed set of
              utility criteria, and incubates the earliest version of a platform before handing it to a dedicated
              platform team — all inside Operon Softwares, never spun off.
            </Body>
            <div className="mt-8">
              <Button to="/approach" variant="secondary">
                See the full approach
              </Button>
            </div>
          </SectionHead>
        </Container>
      </Section>

      {/* ---------------------------------------------------- vision & mission */}
      <Section surface="ink" ambient>
        <Container>
          <Reveal>
            <MonoLabel tone="paper">Vision &amp; mission</MonoLabel>
            <Display level={2} className="mt-6">
              What we&rsquo;re building toward.
            </Display>
          </Reveal>
          <Reveal className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16" delay={60}>
            <div className="border-t border-paper-14 pt-6">
              <MonoLabel tone="paper">Mission</MonoLabel>
              <p className="mt-5 max-w-measure text-lead text-paper">
                To identify the critical utilities missing from how institutions operate, and to build, own, and operate
                the platforms that supply them permanently.
              </p>
            </div>
            <div className="border-t border-paper-14 pt-6">
              <MonoLabel tone="paper">Vision</MonoLabel>
              <p className="mt-5 max-w-measure text-lead text-paper">
                A portfolio of independent, foundational-system platforms, each the utility layer of its domain, built
                directly and compounded by a single disciplined technology venture company.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------------- what's next */}
      <Section surface="paper">
        <Container>
          <SectionHead eyebrow="What's next" headline="Operon 360 is the first proof point, not the ceiling.">
            <Body>
              Operon Softwares is structured to build additional platforms over time, each one built directly around a
              separate, validated utility. No future platform exists yet beyond Operon 360 — when a new gap clears our
              criteria, we build a dedicated platform to own it, staffed and resourced the same way Operon 360 is today.
            </Body>
            <div className="mt-6">
              <Pending id="roadmap" label="Roadmap items, if any are to be named" />
            </div>
          </SectionHead>
        </Container>
      </Section>

      <CTABand
        eyebrow="Next step"
        headline="See the platform the method produced."
        actions={
          <Button to={O360} tone="ink">
            Explore Operon 360
          </Button>
        }
      />
    </>
  );
}
