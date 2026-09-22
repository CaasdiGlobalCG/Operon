import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CTABand, PageHero } from '../../components/blocks';
import { ArrowOut, Button, Container, ExternalLink, MonoLabel, Pending, Reveal, Section } from '../../components/ui';
import { MODULES } from '../../content/platform';
import { O360 } from '../../lib/site';

export default function Features() {
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
            <ModuleIndex />
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

/**
 * Module index — hover/touch list on the left, detail panel on the right.
 * Desktop: the sticky panel cross-fades to whichever row is hovered/focused.
 * Mobile: the active row expands inline with a height animation.
 * Row ids double as anchors (footer links like /360/features#cipher).
 */
function ModuleIndex() {
  const [active, setActive] = useState(MODULES[0].id);
  const { hash } = useLocation();
  const current = MODULES.find((m) => m.id === active) || MODULES[0];

  // Deep links (/360/features#cipher) activate the matching module.
  useEffect(() => {
    const id = hash.replace('#', '');
    if (MODULES.some((m) => m.id === id)) setActive(id);
  }, [hash]);

  return (
    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <ul className="border-t border-ink-14">
        {MODULES.map((m, i) => {
          const is = m.id === active;
          return (
            <Reveal as="li" key={m.id} id={m.id} delay={i * 70} once={false} className="relative scroll-mt-28 border-b border-ink-14">
              {is && (
                <motion.span
                  layoutId="module-marker"
                  className="absolute -left-3 top-0 hidden h-full w-[3px] bg-ink lg:block"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                aria-expanded={is}
                onMouseEnter={() => setActive(m.id)}
                onFocus={() => setActive(m.id)}
                onClick={() => setActive(m.id)}
                className={`group flex w-full items-baseline gap-5 py-6 text-left transition-colors duration-200 ${
                  is ? 'text-ink' : 'text-ink-55 hover:text-ink'
                }`}
              >
                <span
                  className={`font-mono text-mono tabular-nums transition-colors duration-200 ${
                    is ? 'text-ink' : 'text-ink-40'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1">
                  <span className={`font-display font-semibold transition-all duration-200 ${is ? 'text-h3' : 'text-h4'}`}>
                    {m.name}
                  </span>
                  {m.subtitle ? <span className="ml-3 text-sm text-ink-55">{m.subtitle}</span> : null}
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 transition-all duration-200 ${
                    is ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                  }`}
                >
                  <ArrowOut />
                </span>
              </button>

              {/* Inline expanding detail — mobile/tablet only */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-signal lg:hidden ${
                  is ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className={`pb-10 transition-opacity duration-300 ${is ? 'opacity-100' : 'opacity-0'}`}>
                    <ModuleBody module={m} />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>

      {/* Sticky cross-fading detail panel — desktop only */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div key={current.id} className="animate-feature-in">
            <div className="mb-6 flex items-baseline justify-between border-b border-ink-14 pb-5">
              <MonoLabel>
                {String(MODULES.indexOf(current) + 1).padStart(2, '0')} / {String(MODULES.length).padStart(2, '0')}
              </MonoLabel>
              <h3 className="font-display text-h3 font-semibold">{current.name}</h3>
            </div>
            <ModuleBody module={current} />
          </div>
        </div>
      </div>
    </div>
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
    <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:gap-16">
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
