import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Mark } from '../components/Logo';
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
  RotatingWord,
  Rule,
  Section,
  spotlightMove,
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
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  // Logo mark drifts slower than the scroll — parallax inside the hero.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const signalY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <Section surface="paper" bleed className="pb-21 pt-16 md:pb-30 md:pt-14">
        <Container>
          <div ref={heroRef} className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <div className="animate-hero-in">
                <MonoLabel>Operon Softwares · Bengaluru</MonoLabel>
              </div>
              <h1 className="animate-hero-in mt-7 text-h1 md:text-h1-lg" style={{ animationDelay: '90ms' }}>
                We build the{' '}
                <RotatingWord words={['platforms', 'utilities']} /> institutions are missing.
              </h1>
              <div className="animate-hero-in" style={{ animationDelay: '180ms' }}>
                <Lead className="mt-8">
                  Every government, enterprise, and industry depends on utilities — functions so fundamental that nothing
                  else works without them. Most of the ones that matter today are still undersupplied. Operon Softwares
                  finds those gaps and builds the platform required to close each one, directly, as our own product.
                  Operon 360 is the first.
                </Lead>
              </div>
              <div className="animate-hero-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: '260ms' }}>
                <Button to={O360}>Explore Operon 360</Button>
                <Button
                  variant="secondary"
                  onClick={() => window.dispatchEvent(new CustomEvent('searchdog:open'))}
                >
                  Talk to Search Dog
                </Button>
              </div>
            </div>
            <motion.div
              className="animate-hero-in justify-self-center lg:justify-self-end"
              style={{ animationDelay: '180ms', ...(reduce ? {} : { y: signalY }) }}
            >
              <div className="flex flex-col items-center">
                <Mark variant="symbol" height={220} className="animate-float" />
                <span
                  aria-hidden="true"
                  className="animate-float-shadow mt-10 block h-5 w-[58%] rounded-[50%] bg-ink blur-md"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------- sectors marquee */}
      <div className="marquee overflow-hidden border-y border-ink-14 bg-paper py-4" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {INDUSTRIES.map((ind) => (
                <span key={ind.slug} className="flex items-center">
                  <span className="px-8 font-mono text-mono uppercase text-ink-55">{ind.name}</span>
                  <span className="h-1 w-1 rounded-full bg-ink-30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------ what we do */}
      {/* Pinned: everything after this section slides up and over it. */}
      <Section surface="cloud" className="sticky top-0 z-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal from="left">
              <MonoLabel>What we do</MonoLabel>
              <Display level={2} className="mt-6">
                We find what&rsquo;s missing before we decide what to build.
              </Display>
            </Reveal>
            <Reveal from="right" delay={90} className="lg:pt-3">
              <Body>
                We identify critical, structural gaps across governments, enterprises, and industries — then build the
                platform required to close each one at scale. We don&rsquo;t start with a product idea and look for a market.
                We start with a function that&rsquo;s fragmented, manual, or missing entirely, and build its permanent
                operating layer.
              </Body>
              <div className="mt-8">
                <TextLink to="/approach">See how we work</TextLink>
              </div>
            </Reveal>
          </div>
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
                  onMouseMove={spotlightMove}
                  className="spotlight group relative flex h-full min-h-[9.5rem] flex-col justify-between p-6 transition-[color,background-color,box-shadow,transform] duration-180 hover:z-10 hover:-translate-y-1 hover:bg-cloud hover:shadow-[0_28px_80px_rgba(0,0,0,0.15)]"
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
