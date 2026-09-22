import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CTABand, PageHero, SectionHead, Steps } from '../../components/blocks';
import { Button, Container, MonoLabel, Reveal, Section } from '../../components/ui';
import { PROCESS_STEPS, VENDOR_STAGES, VENDOR_TIERS } from '../../content/platform';
import { O360 } from '../../lib/site';

gsap.registerPlugin(ScrollTrigger);

/**
 * Vendor-verification header pins on the left while the ten stages scroll past
 * on the right (desktop only, GSAP ScrollTrigger). The stage counter tracks the
 * row currently in view. Reduced motion / mobile: normal stacked layout.
 */
function VendorJourney() {
  const pinRef = useRef(null);
  const listRef = useRef(null);
  const counterRef = useRef(null);
  // Vertical rail fills as the stages scroll — Linear-style section progress.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 55%'] });
  const railY = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const pin = ScrollTrigger.create({
        trigger: listRef.current,
        start: 'top 140px',
        end: 'bottom bottom-=120',
        pin: pinRef.current,
        pinSpacing: false,
      });
      const rows = listRef.current?.querySelectorAll(':scope > ol > li') || [];
      const triggers = [...rows].map((row, i) =>
        ScrollTrigger.create({
          trigger: row,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive && counterRef.current)
              counterRef.current.textContent = `Stage ${String(i + 1).padStart(2, '0')} / ${String(rows.length).padStart(2, '0')}`;
          },
        }),
      );
      return () => {
        pin.kill();
        triggers.forEach((t) => t.kill());
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
      <div ref={pinRef} className="self-start">
        <SectionHead
          eyebrow="How vendors join"
          headline="Ten stages. No shortcuts, no self-declared trust."
          className="lg:grid-cols-1 lg:gap-6"
        >
          <p className="max-w-prose text-body text-ink-70">
            Verification is the product. A vendor tier on Operon 360 means specific checks were completed by us — and
            it can go down as easily as it went up. Each stage is a discrete check with a recorded outcome; a vendor
            does not advance by paying, waiting, or knowing someone.
          </p>
        </SectionHead>
        <p ref={counterRef} className="mt-8 hidden font-mono text-mono uppercase text-ink-55 lg:block">
          Stage 01 / {String(VENDOR_STAGES.length).padStart(2, '0')}
        </p>
      </div>
      <div ref={listRef} className="relative lg:pl-10">
        <span className="absolute bottom-0 left-0 top-0 hidden w-px bg-ink-14 lg:block" aria-hidden="true" />
        <motion.span
          className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-ink lg:block"
          style={{ scaleY: railY }}
          aria-hidden="true"
        />
        <Steps steps={VENDOR_STAGES} />
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <>
      <PageHero
        surface="ink"
        eyebrow="Operon 360 · Process flow"
        headline="From requirement to delivery."
        lead="How a project moves through Operon 360, step by step."
        actions={
          <>
            <Button to={`${O360}/get-demo`} tone="ink">
              For Clients — Get Started
            </Button>
            <Button to={`${O360}/get-demo`} tone="ink" variant="secondary">
              For Vendors — Join
            </Button>
          </>
        }
      />

      <Section surface="paper">
        <Container>
          <Reveal>
            <Steps steps={PROCESS_STEPS} />
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------- how vendors join */}
      <Section surface="cloud" id="vendor-joins">
        <Container>
          <VendorJourney />

          <Reveal className="mt-16" delay={90}>
            <MonoLabel>What a tier means</MonoLabel>
            <div className="mt-6 grid gap-px overflow-hidden rounded-lg bg-ink-14 md:grid-cols-3">
              {VENDOR_TIERS.map((tier) => (
                <div key={tier.name} className="bg-cloud p-6">
                  <h3 className="font-display text-h4 font-semibold">{tier.name}</h3>
                  <p className="mt-3 text-sm text-ink-70">{tier.copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-prose text-sm text-ink-55">
              Tiers are reviewed continuously against stage 10. Missed dates, quality failures or disputes lower a tier
              without negotiation.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        surface="cloud"
        eyebrow="Next step"
        headline="Start on whichever side you're on."
        actions={
          <>
            <Button to={`${O360}/get-demo`}>For Clients — Get Started</Button>
            <Button to={`${O360}/get-demo`} variant="secondary">
              For Vendors — Join
            </Button>
          </>
        }
      />
    </>
  );
}
