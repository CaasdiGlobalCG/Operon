import { Accordion, CTABand, PageHero } from '../../components/blocks';
import { Button, Container, ExternalLink, MonoLabel, Pending, Reveal, Section } from '../../components/ui';
import { MODULES } from '../../content/platform';
import { O360 } from '../../lib/site';

export default function Features() {
  const items = MODULES.map((module) => ({
    id: module.id,
    title: module.subtitle ? `${module.name} — ${module.subtitle}` : module.name,
    content: <ModuleBody module={module} />,
  }));

  return (
    <>
      <PageHero
        surface="ink"
        eyebrow="Operon 360 · Features"
        headline="Everything a project needs, in one workspace."
        lead="Eight modules, one connected system."
        actions={
          <Button to={`${O360}/get-demo`} tone="ink">
            Get Demo
          </Button>
        }
      />

      <Section surface="paper">
        <Container>
          <Reveal>
            <Accordion items={items} defaultOpen="workspace" />
          </Reveal>
        </Container>
      </Section>

      <CTABand
        surface="cloud"
        eyebrow="Next step"
        headline="See the modules running on a real project."
        actions={<Button to={`${O360}/get-demo`}>Get Demo</Button>}
      />
    </>
  );
}

function ModuleBody({ module }) {
  const rows = [
    ['What it is', module.what],
    ['Problem it solves', module.problem],
    ['How it works', module.how],
    ['Who uses it', module.who],
  ].filter(([, value]) => Boolean(value));

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <dl>
        {rows.map(([term, copy]) => (
          <div key={term} className="mb-6 last:mb-0">
            <dt className="font-mono text-mono uppercase text-ink-55">{term}</dt>
            <dd className="mt-2 max-w-prose text-body text-ink-70">{copy}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-lg bg-cloud p-6">
        <MonoLabel>Key capabilities</MonoLabel>
        <ul className="mt-4 flex flex-col gap-2.5">
          {module.capabilities.map((cap) => (
            <li key={cap} className="flex gap-3 text-sm text-ink-70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
              {cap}
            </li>
          ))}
        </ul>

        {module.gap ? (
          <div className="mt-6">
            <Pending id={module.gap} label="Additional mechanics" />
          </div>
        ) : null}

        <div className="mt-7">
          {module.external ? (
            <ExternalLink className="inline-flex h-11 items-center rounded-md border border-ink-14 px-5 text-sm font-medium hover:border-ink">
              Visit Graviyx
            </ExternalLink>
          ) : module.cta ? (
            <Button to={module.cta.to} variant="secondary">
              {module.cta.label}
            </Button>
          ) : (
            <Button to={`${O360}/get-demo`}>Get Demo</Button>
          )}
        </div>
      </div>
    </div>
  );
}
