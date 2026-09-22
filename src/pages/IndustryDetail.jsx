import { useParams } from 'react-router-dom';
import { CTABand, PageHero, SectionHead } from '../components/blocks';
import { Body, Button, Container, MonoLabel, Pending, Reveal, Section } from '../components/ui';
import { INDUSTRY_CONTENT } from '../content/industries';
import { INDUSTRY_RESEARCH, RESEARCH_AS_OF } from '../content/industryResearch';
import { MODULES } from '../content/platform';
import { O360 } from '../lib/site';
import NotFound from './NotFound';

/** Independent, Operon-free market research: stats, forces, and what studies say about the gap. */
function ResearchSection({ industryName, research }) {
  if (!research) return null;
  return (
    <Section surface="paper">
      <Container>
        <SectionHead eyebrow="Independent research" headline={`What the data says about ${industryName.toLowerCase()}`}>
          <Body>
            Figures below are from public market research and government sources, not Operon Softwares. They describe
            the industry generally — none of them measure Operon 360 or any Operon product.
          </Body>
        </SectionHead>

        <Reveal className="mt-14 grid gap-px overflow-hidden rounded-lg bg-ink-14 sm:grid-cols-2 lg:grid-cols-4" delay={40}>
          {research.stats.map((s, i) => (
            <div key={i} className="bg-cloud p-6">
              <div className="font-display text-h3 font-semibold">{s.value}</div>
              <p className="mt-3 text-sm text-ink-70">{s.label}</p>
              <a
                href={s.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block border-b border-ink-30 pb-0.5 text-xs uppercase tracking-wide text-ink-55 hover:border-ink hover:text-ink"
              >
                {s.source.name} ↗
              </a>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16" delay={60}>
          <MonoLabel>What's shaping it right now</MonoLabel>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {research.shaping.map((item, i) => (
              <div key={i}>
                <h4 className="font-display text-h4 font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-ink-70">{item.text}</p>
                <a
                  href={item.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block border-b border-ink-30 pb-0.5 text-xs uppercase tracking-wide text-ink-55 hover:border-ink hover:text-ink"
                >
                  {item.source.name} ↗
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={80}>
          <MonoLabel>What independent research says about the coordination gap</MonoLabel>
          <div className="mt-6 space-y-8">
            {research.evidence.map((item, i) => (
              <div key={i} className="border-t border-ink-14 pt-6">
                <h4 className="font-display text-h4 font-semibold">{item.title}</h4>
                <p className="mt-2 max-w-measure text-sm text-ink-70">{item.text}</p>
                <a
                  href={item.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block border-b border-ink-30 pb-0.5 text-xs uppercase tracking-wide text-ink-55 hover:border-ink hover:text-ink"
                >
                  {item.source.name} ↗
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        {research.caveat ? (
          <Reveal className="mt-10 max-w-measure text-xs text-ink-40" delay={100}>
            Note: {research.caveat}
          </Reveal>
        ) : null}

        <Reveal className="mt-6 text-xs text-ink-40" delay={110}>
          Figures retrieved {RESEARCH_AS_OF}. Market-size estimates vary by publisher and methodology; where reports
          disagreed materially, a range is shown rather than a single figure.
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * One page per industry. Three sections — the gap, why it qualifies, what it
 * looks like inside the platform. General market research (sizing, trends) is
 * not in the source material and is tracked as gap `industry-research`.
 */
export default function IndustryDetail() {
  const { slug } = useParams();
  const data = INDUSTRY_CONTENT[slug];
  if (!data) return <NotFound />;

  if (!data.gap) {
    return (
      <>
        <PageHero eyebrow="Industries" headline="Others" lead={data.line} />
        <Section surface="paper">
          <Container>
            <Pending id="industry-others" label="Sector content, added as sectors are validated" />
          </Container>
        </Section>
        <CTABand
          eyebrow="Next step"
          headline="See Operon 360."
          actions={
            <Button to={O360} tone="ink">
              Enter Operon 360
            </Button>
          }
        />
      </>
    );
  }

  const modules = MODULES.filter((m) => data.modules.includes(m.name));
  const research = INDUSTRY_RESEARCH[slug];

  return (
    <>
      <PageHero
        eyebrow={`Industries · ${data.name}`}
        headline={`${data.name} runs on coordination. Most of it is still informal.`}
        lead={data.line}
      />

      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="The structural gap" headline="Where it breaks down">
            <Body>{data.gap}</Body>
          </SectionHead>
        </Container>
      </Section>

      <ResearchSection industryName={data.name} research={research} />

      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="Why it's a genuine utility gap" headline="Why this isn't a one-off problem">
            <Body>{data.why}</Body>
          </SectionHead>
        </Container>
      </Section>

      <Section surface="paper">
        <Container>
          <SectionHead
            eyebrow={`Running ${data.name} on Operon 360`}
            headline="What this looks like inside the platform"
          >
            <Body>{data.platform}</Body>
          </SectionHead>

          <Reveal className="mt-14 grid gap-px overflow-hidden rounded-lg bg-ink-14 md:grid-cols-2" delay={60}>
            {modules.map((module) => (
              <article key={module.id} className="bg-cloud p-7 md:p-8">
                <MonoLabel>Module</MonoLabel>
                <h3 className="mt-4 font-display text-h4 font-semibold">{module.name}</h3>
                <p className="mt-3 max-w-measure text-sm text-ink-70">{module.what}</p>
                <a
                  href={`${O360}/features#${module.id}`}
                  className="mt-5 inline-block border-b border-ink-30 pb-0.5 text-sm font-medium hover:border-ink"
                >
                  Full definition
                </a>
              </article>
            ))}
          </Reveal>
        </Container>
      </Section>

      {!research ? (
        <Section surface="cloud">
          <Container>
            <Pending id="industry-research" label="General industry research (market sizing, trends)" />
          </Container>
        </Section>
      ) : null}

      <CTABand
        eyebrow="Next step"
        headline={`See Operon 360 for ${data.name}.`}
        actions={
          <Button to={`${O360}/industries`} tone="ink">
            See Operon 360 for {data.name}
          </Button>
        }
      />
    </>
  );
}
