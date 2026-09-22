import { CTABand, PageHero, SectionHead, Steps } from '../components/blocks';
import { Body, Button, Container, EmptyState, MonoLabel, Pending, Reveal, Section } from '../components/ui';

// Suggested default hiring steps from the content doc, explicitly marked as
// pending confirmation (gap `hiring-steps`) rather than presented as fact.
const HIRING_STEPS = [
  { term: 'Application', copy: 'You apply to a specific open role, or tell us where you think the gap is.' },
  { term: 'Initial screen', copy: 'A first conversation about the role and how you work.' },
  { term: 'Role-specific assessment', copy: 'An assessment or interview matched to the work the role actually does.' },
  { term: 'Team interview', copy: 'Time with the team you would join.' },
  { term: 'Offer', copy: 'Terms, start date, and onboarding.' },
];

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        headline="Build the platforms institutions are missing."
        lead="Working at Operon Softwares means working close to the actual diagnosis — understanding why a function is broken before deciding what to build."
        actions={<Button href="#open-roles">See open roles</Button>}
      />

      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="Life at Operon" headline="We hire people who want to build infrastructure, not features.">
            <Body>
              Teams are small, ownership is real, and platforms are built to last, not to be iterated on indefinitely.
            </Body>
            <div className="mt-6">
              <Pending id="careers-culture" label="Culture detail, values, team photos" />
            </div>
          </SectionHead>
        </Container>
      </Section>

      <Section surface="paper" id="open-roles">
        <Container>
          <SectionHead eyebrow="Open roles" headline="Open Roles">
            <Body>
              Roles are grouped by function — Engineering, Product, Operations, PM/Execution, Sales, Finance,
              Compliance.
            </Body>
          </SectionHead>

          <Reveal className="mt-12" delay={60}>
            <EmptyState
              message="There are no open roles right now — check back soon, or tell us why you'd be a fit anyway."
              action={<Button to="/contact#general">Get in touch</Button>}
            />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MonoLabel>Publish checklist</MonoLabel>
              <Pending id="open-roles" label="Actual open roles" />
              <Pending id="ats" label="ATS / apply routing" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="How we hire" headline="A straightforward process, start to finish." />
          <Reveal className="mt-12" delay={60}>
            <Steps steps={HIRING_STEPS} />
            <div className="mt-8">
              <Pending id="hiring-steps" label="Confirm hiring steps before publishing" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        eyebrow="Don't see the right role?"
        headline="We're building a small number of platforms, deliberately."
        body="If you think there's a structural gap in how we work, tell us."
        actions={
          <Button to="/contact#general" tone="ink">
            Get in touch
          </Button>
        }
      />
    </>
  );
}
