import { Link } from 'react-router-dom';
import Signal from '../components/Signal';
import {
  Body,
  Button,
  Container,
  Display,
  EmptyState,
  ExternalLink,
  Lead,
  MonoLabel,
  Reveal,
  Rule,
  Section,
  TextLink,
} from '../components/ui';
import { INDUSTRIES, O360 } from '../lib/site';

const INFRASTRUCTURE = [
  {
    name: 'Digital Infrastructure',
    copy: 'Identity, access, and data foundations every platform needs to operate at scale.',
  },
  {
    name: 'Industry Infrastructure',
    copy: 'Platforms that become the assumed operating layer of a specific sector.',
  },
  {
    name: 'Execution Infrastructure',
    copy: 'Turns requirements into delivered outcomes, with planning, coordination, and accountability built in. Operon 360 is our first execution infrastructure platform.',
  },
  {
    name: 'Information Infrastructure',
    copy: 'Creates visibility and trust where none existed, through verification and structured data.',
  },
  {
    name: 'Transaction Infrastructure',
    copy: 'The financial and procurement rails that let commercial activity move safely between parties.',
  },
];

const NEXT_STEPS = [
  { label: 'Get Started', note: 'Operon 360 for Clients', to: `${O360}#clients` },
  { label: 'Join as Vendor', note: 'Operon 360 for Vendors', to: `${O360}#vendors` },
  { label: 'Investor Relations', note: 'Contact', to: '/contact#investors' },
  { label: "We're Hiring", note: 'Careers', to: '/careers' },
];

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <Section surface="paper" bleed className="pb-20 pt-16 md:pb-30 md:pt-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <MonoLabel>Operon Softwares · Bengaluru</MonoLabel>
              <h1 className="mt-7 text-h1 md:text-h1-lg">We build the platforms institutions are missing.</h1>
              <Lead className="mt-8">
                Every government, enterprise, and industry depends on utilities — functions so fundamental that nothing
                else works without them. Most of the ones that matter today are still undersupplied. Operon Softwares
                finds those gaps and builds the platform required to close each one, directly, as our own product.
                Operon 360 is the first.
              </Lead>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button to={O360}>Explore Operon 360</Button>
                <Button
                  variant="secondary"
                  onClick={() => window.dispatchEvent(new CustomEvent('searchdog:open'))}
                >
                  Talk to Search Dog
                </Button>
              </div>
            </div>
            <div className="justify-self-center lg:justify-self-end">
              <Signal className="w-[220px] md:w-[300px] lg:w-[340px]" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ what we do */}
      <Section surface="cloud">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <MonoLabel>What we do</MonoLabel>
              <Display level={2} className="mt-6">
                We find what&rsquo;s missing before we decide what to build.
              </Display>
            </div>
            <div className="lg:pt-3">
              <Body>
                We identify critical, structural gaps across governments, enterprises, and industries — then build the
                platform required to close each one at scale. We don&rsquo;t start with a product idea and look for a market.
                We start with a function that&rsquo;s fragmented, manual, or missing entirely, and build its permanent
                operating layer.
              </Body>
              <div className="mt-8">
                <TextLink to="/approach">See how we work</TextLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------- what we build */}
      <Section surface="paper">
        <Container>
          <Reveal>
            <MonoLabel>What we build</MonoLabel>
            <Display level={2} className="mt-6 max-w-[16ch]">
              Five kinds of infrastructure. One discipline.
            </Display>
          </Reveal>

          <div className="mt-16">
            <Rule />
            <dl>
              {INFRASTRUCTURE.map((item, i) => (
                <Reveal
                  key={item.name}
                  delay={i * 55}
                  className="grid gap-3 border-b border-ink-14 py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12"
                >
                  <dt className="font-display text-h4 font-semibold">{item.name}</dt>
                  <dd className="max-w-prose text-body text-ink-70">{item.copy}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- platforms */}
      <Section surface="ink">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <MonoLabel tone="paper">Our platforms</MonoLabel>
              <Display level={2} className="mt-6">
                Operon 360 is our first platform. It won&rsquo;t be our only one.
              </Display>
            </div>
            <div className="lg:pt-3">
              <Body tone="paper">
                We build, own, and operate every platform directly — no spin-offs, no separate cap tables. Operon 360 is
                the proof point; every future platform follows the same model.
              </Body>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-lg bg-paper-14 md:grid-cols-2">
            <Reveal delay={0} className="flex flex-col justify-between gap-10 bg-ink p-8 md:p-10">
              <div>
                <MonoLabel tone="paper">Execution infrastructure</MonoLabel>
                <h3 className="mt-5 text-h3">Operon 360</h3>
                <p className="mt-4 max-w-measure text-body text-paper-70">
                  A PM-led workflow operating system connecting verified vendors and clients inside a dedicated
                  workspace.
                </p>
              </div>
              <Button to={O360} tone="ink">
                Enter Operon 360
              </Button>
            </Reveal>
            <Reveal delay={80} className="flex flex-col justify-between gap-10 bg-ink p-8 md:p-10">
              <div>
                <MonoLabel tone="paper">External platform</MonoLabel>
                <h3 className="mt-5 text-h3">Graviyx</h3>
                <p className="mt-4 max-w-measure text-body text-paper-70">
                  A separate, external platform integrated with Operon 360&rsquo;s vendor and procurement workflows.
                </p>
              </div>
              <div>
                <ExternalLink tone="paper" className="text-sm font-medium">
                  Visit Graviyx
                </ExternalLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- industries */}
      <Section surface="paper">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <MonoLabel>Industries</MonoLabel>
              <Display level={2} className="mt-6">
                Built for how real industries actually operate.
              </Display>
            </div>
            <div className="lg:pt-3">
              <ul className="flex flex-wrap gap-2">
                {INDUSTRIES.filter((i) => i.slug !== 'others').map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      to={`/industries/${industry.slug}`}
                      className="inline-flex rounded-md border border-ink-14 px-3.5 py-2 text-sm text-ink-70 transition-colors duration-180 hover:border-ink hover:text-ink"
                    >
                      {industry.name}
                    </Link>
                  </li>
                ))}
                <li className="inline-flex items-center px-1 py-2 text-sm text-ink-40">and more</li>
              </ul>
              <div className="mt-8">
                <TextLink to="/industries">See all industries</TextLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ search dog */}
      <Section surface="ink">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <MonoLabel tone="paper">Search Dog</MonoLabel>
              <Display level={2} className="mt-6">
                Describe your problem. Search Dog finds the fix.
              </Display>
              <div className="mt-10">
                <Button tone="ink" onClick={() => window.dispatchEvent(new CustomEvent('searchdog:open'))}>
                  Talk to Search Dog
                </Button>
              </div>
            </div>
            <div className="lg:pt-3">
              <Body tone="paper">
                Search Dog isn&rsquo;t a search bar — it&rsquo;s a business consultant that happens to run on AI. Tell it
                what you&rsquo;re dealing with — cash flow, hiring, compliance, whatever it is — in your own words. It
                asks a few sharp questions to understand the real problem, then points you to the exact tool,
                calculator, or service on Operon Softwares built to solve it. If nothing in our toolkit fits, it&rsquo;ll
                say so and tell you what will.
              </Body>
            </div>
          </Reveal>

          <Reveal className="mt-16 grid gap-px overflow-hidden rounded-lg bg-paper-14 md:grid-cols-3" delay={60}>
            {[
              {
                step: '01',
                title: 'Tell it what\u2019s going on',
                copy: 'No forms, no menus — just describe the problem like you would to a person.',
              },
              {
                step: '02',
                title: 'It diagnoses, not just deflects',
                copy: 'Search Dog asks follow-up questions to pin down what you actually need, not just keyword-matches you to a page.',
              },
              {
                step: '03',
                title: 'It hands you the fix',
                copy: 'A direct link to the right calculator, tool, or page in our platform — or a clear next step if it\u2019s something we don\u2019t cover yet.',
              },
            ].map((item) => (
              <article key={item.step} className="bg-ink p-8 md:p-10">
                <MonoLabel tone="paper">{item.step}</MonoLabel>
                <h3 className="mt-5 font-display text-h4 font-semibold">{item.title}</h3>
                <p className="mt-4 text-body text-paper-70">{item.copy}</p>
              </article>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------------- insights */}
      <Section surface="cloud">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <MonoLabel>Insights</MonoLabel>
              <Display level={2} className="mt-6">
                Latest from Operon.
              </Display>
            </div>
            <TextLink to="/insights">View all insights</TextLink>
          </Reveal>
          <Reveal className="mt-12" delay={60}>
            <EmptyState message="New content is on the way." />
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------- get involved */}
      <Section surface="paper">
        <Container>
          <Reveal>
            <MonoLabel>Get involved</MonoLabel>
            <Display level={2} className="mt-6">
              Wherever you fit in, there&rsquo;s a next step.
            </Display>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-ink-14 sm:grid-cols-2 lg:grid-cols-4">
            {NEXT_STEPS.map((step, i) => (
              <Reveal key={step.label} delay={i * 70} className="bg-paper">
                <Link
                  to={step.to}
                  className="group flex h-full min-h-[9.5rem] flex-col justify-between p-6 transition-colors duration-180 hover:bg-cloud"
                >
                  <MonoLabel>{step.note}</MonoLabel>
                  <span className="font-display text-h4 font-semibold">{step.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
