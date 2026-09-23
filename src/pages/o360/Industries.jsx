import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CTABand, PageHero, SectionHead } from '../../components/blocks';
import { Container, MonoLabel, Pending, Reveal, RevealFlat, Section, Button, spotlightMove } from '../../components/ui';
import { INDUSTRY_CONTENT } from '../../content/industries';
import { INDIA_PATH, METRO_CITIES } from '../../content/indiaMap';
import { INDUSTRIES, O360 } from '../../lib/site';

gsap.registerPlugin(ScrollTrigger);

/**
 * Traced India outline (Survey of India geometry) — the border draws itself as
 * the section scrolls into view (GSAP ScrollTrigger scrub), then the metro
 * dots fade in and take over with their blink. Reduced motion: static map.
 */
function PresenceMap() {
  const pathRef = useRef(null);
  const dotsRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const path = pathRef.current;
    const dots = dotsRef.current;
    const wrap = wrapRef.current;
    if (!path || !dots || !wrap) return;

    // pathLength=1 normalises the 600+ subpath outline — no getTotalLength needed.
    gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(dots.children, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top 90%',
        end: 'center 45%',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    tl.to(path, { strokeDashoffset: 0, ease: 'none' }).to(
      dots.children,
      { opacity: 1, stagger: 0.06, duration: 0.4 },
      '>-0.1',
    );
    // Layout settles after fonts/reveals — recalc trigger positions.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <svg
        viewBox="0 0 400 440"
        role="img"
        aria-label="Map of India showing metropolitan cities where the network operates"
        className="mx-auto w-full max-w-[420px]"
      >
        <path
          ref={pathRef}
          pathLength="1"
          d={INDIA_PATH}
          fill="rgba(0,0,0,0.04)"
          stroke="rgba(0,0,0,0.55)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <g ref={dotsRef}>
          {METRO_CITIES.map((city, i) => (
            <g key={city.name}>
              <circle
                className="map-dot"
                cx={city.x}
                cy={city.y}
                r="9"
                fill="none"
                stroke="#DC2626"
                strokeWidth="1.2"
                style={{ animationDelay: `${(i % 9) * 0.24}s` }}
              />
              <circle
                className="map-dot"
                cx={city.x}
                cy={city.y}
                r="4"
                fill="#DC2626"
                style={{ animationDelay: `${(i % 9) * 0.24}s` }}
              />
              <title>{city.name}</title>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default function O360Industries() {
  return (
    <>
      <PageHero
        surface="ink"
        eyebrow="Operon 360 · Industries"
        headline="Who runs on Operon 360."
        lead="The corporate Industries page explains the gap we diagnosed in each sector. This page shows what running on Operon 360 actually looks like — the workspace, the vendors, the modules you'd use most."
      />

      {/* ------------------------------------------------ industry to module map */}
      <Section surface="paper">
        <Container>
          <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-y border-ink-14">
                    <th scope="col" className="w-48 py-4 pr-6 font-mono text-mono uppercase text-ink-55">
                      Industry
                    </th>
                    <th scope="col" className="py-4 pr-6 font-mono text-mono uppercase text-ink-55">
                      What running on Operon 360 looks like
                    </th>
                    {/* <th scope="col" className="w-24 py-4 font-mono text-mono uppercase text-ink-55">
                      Demo
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {INDUSTRIES.map((industry, i) => {
                    const data = INDUSTRY_CONTENT[industry.slug];
                    return (
                      <RevealFlat as="tr" key={industry.slug} delay={i * 60} className="border-b border-ink-14 align-top">
                        <th scope="row" className="py-6 pr-6 font-display text-h4 font-semibold">
                          {data.name}
                        </th>
                        <td className="py-6 pr-6 text-body text-ink-70">
                          {data.platform || <Pending id="industry-others" label="Sector-specific platform framing" />}
                          {data.modules.length ? (
                            <ul className="mt-4 flex flex-wrap gap-2">
                              {data.modules.map((m) => (
                                <li
                                  key={m}
                                  className="rounded-md border border-ink-14 px-2.5 py-1 font-mono text-mono-xs uppercase text-ink-55"
                                >
                                  {m}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </td>
                        {/* <td className="py-6">
                          <Link
                            to={`${O360}/get-demo`}
                            className="border-b border-ink-30 pb-0.5 text-sm font-medium hover:border-ink"
                          >
                            Get Demo
                          </Link>
                        </td> */}
                      </RevealFlat>
                    );
                  })}
                </tbody>
              </table>
            </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- network */}
      <Section surface="ink" ambient>
        <Container>
          <SectionHead eyebrow="Network" headline="The network, in numbers." tone="paper" />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-paper-14 sm:grid-cols-2 lg:grid-cols-4">
            {['Vendors onboarded', 'Clients onboarded', 'PMs onboarded', 'Projects running'].map((stat, i) => (
              <Reveal
                key={stat}
                delay={i * 70}
                onMouseMove={spotlightMove}
                className="spotlight spotlight-paper flex min-h-[9rem] flex-col justify-between gap-6 bg-ink p-6"
              >
                <MonoLabel tone="paper">{stat}</MonoLabel>
                <Pending id="live-counters" tone="paper" label="Live figure" />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8" delay={90}>
            <Pending id="live-counters" tone="paper" label="Section label tone-check before publishing" />
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------------- presence map */}
      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="Presence" headline="Where we operate." />
          <Reveal className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]" delay={60}>
            <PresenceMap />
            <div>
              <p className="text-body text-ink-70">
                The vendor and client network spans India&rsquo;s metropolitan centres. Blinking markers show the cities
                the network is being built across.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3">
                {METRO_CITIES.map((city) => (
                  <li key={city.name} className="font-mono text-mono-xs uppercase text-ink-55">
                    {city.name}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Pending id="presence-map" label="Confirmed active cities within the network" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        surface="paper"
        eyebrow="Next step"
        headline="See it set up for your sector."
        actions={<Button to={`${O360}/get-demo`}>Get Demo</Button>}
      />
    </>
  );
}
