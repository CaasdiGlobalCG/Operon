import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CardGrid, CTABand, Field, FormNotice, Input, PageHero, SectionHead, Textarea, useFormState } from '../components/blocks';
import { Body, Button, Container, EmptyState, MonoLabel, Pending, Reveal, Section, TextLink } from '../components/ui';
import { ChasingCostCalculator, FragmentationTaxCalculator } from '../components/Calculators';

const REFERRALS = [
  { kind: 'client', title: 'For Clients', copy: 'Refer another business to Operon 360.', cta: 'Refer a Client' },
  { kind: 'vendor', title: 'For Vendors', copy: 'Refer a vendor into the verified network.', cta: 'Refer a Vendor' },
];

export default function Grow() {
  const [referral, setReferral] = useState(null); // 'client' | 'vendor' | null
  const { hash } = useLocation();
  const formRef = useRef(null);

  // Deep links (/grow#refer-client, /grow#refer-vendor) open the matching form.
  useEffect(() => {
    if (hash === '#refer-client') setReferral('client');
    if (hash === '#refer-vendor') setReferral('vendor');
  }, [hash]);

  useEffect(() => {
    if (referral && formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [referral]);

  return (
    <>
      <PageHero
        eyebrow="Marketing / Growth"
        headline="Grow with Operon."
        lead="Referral programs, case studies, research, and calculators to help you evaluate and grow with Operon 360."
      />

      {/* -------------------------------------------------------- referrals */}
      <Section surface="paper">
        <Container>
          <SectionHead eyebrow="Referral programs" headline="Bring someone in. Get rewarded." />
          <Reveal className="mt-14" delay={60}>
            <CardGrid cols={2}>
              {REFERRALS.map((item) => {
                const is = referral === item.kind;
                return (
                  <article
                    key={item.title}
                    className="relative flex flex-col justify-between gap-8 bg-paper p-7 transition-[transform,box-shadow] duration-200 ease-signal hover:z-10 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,0,0,0.16)] md:p-8"
                  >
                    <div>
                      <MonoLabel>{item.title}</MonoLabel>
                      <p className="mt-4 text-body text-ink-70">{item.copy}</p>
                    </div>
                    <Button
                      variant={is ? 'primary' : 'secondary'}
                      aria-expanded={is}
                      onClick={() => setReferral(is ? null : item.kind)}
                    >
                      {item.cta}
                    </Button>
                  </article>
                );
              })}
            </CardGrid>
            <div className="mt-8">
              <Pending id="referral-terms" label="Program terms and reward structure" />
            </div>
          </Reveal>

          <div
            ref={formRef}
            className={`grid scroll-mt-28 transition-[grid-template-rows] duration-300 ease-signal ${
              referral ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              {referral ? (
                <div id={`refer-${referral}`} className="animate-feature-in mt-14 border-t border-ink-14 pt-12">
                  <Reveal>
                    <MonoLabel>{referral === 'client' ? 'Refer a Client' : 'Refer a Vendor'}</MonoLabel>
                    <h3 className="mt-4 font-display text-h3 font-semibold">
                      {referral === 'client' ? 'Who should we talk to?' : 'Which vendor should we verify?'}
                    </h3>
                    <p className="mt-3 max-w-prose text-body text-ink-70">
                      {referral === 'client'
                        ? 'Tell us about the business you\u2019re referring. We\u2019ll reach out to them and keep you posted.'
                        : 'Tell us about the vendor you\u2019re referring. If they clear verification, they join the network.'}
                    </p>
                    <div className="mt-10">
                      <ReferralForm kind={referral} />
                    </div>
                  </Reveal>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ case studies */}
      <Section surface="cloud" id="case-studies">
        <Container>
          <SectionHead eyebrow="Case studies" headline="How real teams use Operon 360.">
            <Body>
              Organised by industry — Construction, Retail, Manufacturing, Procurement, Supply Chain, Infrastructure,
              Materials.
            </Body>
          </SectionHead>
          <Reveal className="mt-12" delay={60}>
            <EmptyState message="New content is on the way." />
            <div className="mt-8">
              <Pending id="case-studies" label="Do not publish until one real, consented case study exists" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- research */}
      <Section surface="paper">
        <Container>
          <SectionHead eyebrow="Research" headline="Deeper reports on the problems we build for.">
            <div className="mt-2">
              <TextLink to="/insights#research">Read the full research library</TextLink>
            </div>
          </SectionHead>
        </Container>
      </Section>

      {/* ------------------------------------------------------- calculators */}
      <Section surface="cloud">
        <Container>
          <SectionHead eyebrow="Calculators" headline="Put a number on the problem." />

          <div id="fragmentation-calculator">
            <Reveal className="mt-14" delay={60}>
              <FragmentationTaxCalculator />
            </Reveal>
          </div>

          <div id="chasing-cost-calculator">
            <Reveal className="mt-8" delay={90}>
              <ChasingCostCalculator />
            </Reveal>
          </div>

          <Reveal className="mt-10" delay={120}>
            <Button to="/contact#general">Talk to us about reducing this</Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------- more resources */}
      <Section surface="paper">
        <Container>
          <SectionHead eyebrow="More resources" headline="Webinars · Templates · Partner Directory" />
          <Reveal className="mt-12" delay={60}>
            <EmptyState message="New content is on the way." />
            <div className="mt-8">
              <Pending id="more-resources" label="Webinars, templates, partner directory" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABand
        eyebrow="Not sure where to start?"
        headline="Ask Search Dog."
        body="Available on every Operon Softwares page — if you're not sure which page or calculator is right for you, ask."
        actions={
          <Button tone="ink" onClick={() => window.dispatchEvent(new CustomEvent('searchdog:open'))}>
            Talk to Search Dog
          </Button>
        }
      />
    </>
  );
}

function ReferralForm({ kind }) {
  const [values, setValues] = useState({ name: '', email: '', company: '', refName: '', refContact: '', note: '' });
  const { errors, state, submit, reset } = useFormState(['name', 'email', 'refName', 'refContact']);
  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });
  const who = kind === 'client' ? 'business' : 'vendor';

  if (state === 'success') {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
        className="rounded-lg border border-ink bg-ink p-8 text-paper"
      >
        <MonoLabel tone="paper">Referral received</MonoLabel>
        <p className="mt-4 max-w-prose text-body text-paper-70">
          Thanks — the referral is in. We'll reach out to the {who} and keep you posted.
        </p>
        <Button tone="ink" variant="secondary" className="mt-8" onClick={reset}>
          Refer another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={(e) => submit(e, values)} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <Input value={values.name} onChange={set('name')} placeholder="Jane Mehta" error={errors.name} />
        </Field>
        <Field label="Your email" error={errors.email}>
          <Input type="email" value={values.email} onChange={set('email')} placeholder="jane@company.com" error={errors.email} />
        </Field>
        <Field label="Your company" className="md:col-span-2">
          <Input value={values.company} onChange={set('company')} placeholder="Company Pvt Ltd" />
        </Field>
        <Field label={`${kind === 'client' ? 'Referred business' : 'Vendor'} name`} error={errors.refName}>
          <Input value={values.refName} onChange={set('refName')} placeholder={`The ${who} you\u2019re referring`} error={errors.refName} />
        </Field>
        <Field label="Their contact (email or phone)" error={errors.refContact}>
          <Input value={values.refContact} onChange={set('refContact')} placeholder="contact@business.com" error={errors.refContact} />
        </Field>
        <Field label="Anything we should know? (optional)" className="md:col-span-2">
          <Textarea value={values.note} onChange={set('note')} placeholder="Context, what they need, who to ask for." />
        </Field>
      </div>
      <div className="mt-8">
        <Button type="submit" onClick={(e) => submit(e, values)}>
          Send Referral
        </Button>
      </div>
      <FormNotice
        state={state}
        message={
          state === 'success'
            ? `Thanks — the referral is in. We'll reach out to the ${who} and keep you posted.`
            : 'Something went wrong. Please check the highlighted fields and try again.'
        }
      />
    </form>
  );
}
