import { useState } from 'react';
import { Field, FormNotice, Input, PageHero, Select, Textarea, useFormState } from '../components/blocks';
import { Button, Container, EmptyState, MonoLabel, Pending, Reveal, Section } from '../components/ui';

const CATEGORIES = [
  { id: 'all', label: 'All', copy: null },
  {
    id: 'industry',
    label: 'Industry Insights',
    copy: 'Analysis and commentary on the structural gaps Operon Softwares tracks. Editorial tone, not promotional.',
  },
  {
    id: 'research',
    label: 'Research',
    copy: 'Longer-form papers and reports. The same content pool referenced on Marketing/Growth — published once, surfaced in both places.',
  },
  { id: 'company', label: 'Company Updates', copy: 'Milestones, hires, company-level news.' },
  {
    id: 'platform',
    label: 'Platform Updates',
    copy: 'Release notes and feature announcements from Operon 360 and future platforms.',
  },
];

export default function Insights() {
  const [active, setActive] = useState('all');
  const current = CATEGORIES.find((c) => c.id === active);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        headline="Insights"
        lead="Industry Insights · Research · Company Updates · Platform Updates"
      />

      <Section surface="paper" id="research">
        <Container>
          <Reveal>
            <div role="tablist" className="flex flex-wrap gap-6 border-b border-ink-14">
              {CATEGORIES.map((cat) => {
                const is = cat.id === active;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={is}
                    onClick={() => setActive(cat.id)}
                    className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-180 ${
                      is ? 'border-ink text-ink' : 'border-transparent text-ink-55 hover:text-ink'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="mt-10" delay={60}>
            {current.copy ? <p className="max-w-prose text-body text-ink-70">{current.copy}</p> : null}
            <div className="mt-10">
              <EmptyState message="New content is on the way." />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MonoLabel>Publish checklist</MonoLabel>
              <Pending id="insights-articles" label="Article library" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section surface="cloud" id="feedback">
        <Container width="narrow">
          <Reveal>
            <MonoLabel>Tell us what to fix</MonoLabel>
            <h2 className="mt-6 font-display text-h3 font-semibold">What&rsquo;s missing?</h2>
            <p className="mt-4 max-w-prose text-body text-ink-70">
              Client, vendor, or just passing through — if something on the platform is painful, broken, or simply
              doesn&rsquo;t exist yet, this is where to say it. Pain points, gaps, or what you want us to build next: it
              all lands in the same place.
            </p>
          </Reveal>
          <Reveal className="mt-12" delay={60}>
            <FeedbackForm />
          </Reveal>
          <Reveal className="mt-14 flex flex-wrap items-center gap-3" delay={60}>
            <MonoLabel>Publish checklist</MonoLabel>
            <Pending id="feedback-routing" label="Feedback inbox / routing" />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function FeedbackForm() {
  const [values, setValues] = useState({ role: '', name: '', email: '', pain: '', build: '' });
  const { errors, state, submit } = useFormState(['role', 'pain']);
  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  return (
    <form onSubmit={(e) => submit(e, values)} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Who are you?" error={errors.role}>
          <Select value={values.role} onChange={set('role')} error={errors.role}>
            <option value="">Select one</option>
            <option>Client</option>
            <option>Vendor</option>
            <option>General audience</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Name (optional)">
          <Input value={values.name} onChange={set('name')} placeholder="Jane Mehta" />
        </Field>
        <Field label="Email (optional — only if you want a reply)" className="md:col-span-2">
          <Input type="email" value={values.email} onChange={set('email')} placeholder="jane@company.com" />
        </Field>
        <Field label="Your pain point or issue" className="md:col-span-2" error={errors.pain}>
          <Textarea
            value={values.pain}
            onChange={set('pain')}
            placeholder="What's slow, broken, confusing, or costing you time — in plain language."
            error={errors.pain}
          />
        </Field>
        <Field label="What's missing, or what should we build next? (optional)" className="md:col-span-2">
          <Textarea
            value={values.build}
            onChange={set('build')}
            placeholder="The tool, feature, or workflow you wish existed here."
          />
        </Field>
      </div>
      <div className="mt-8">
        <Button type="submit" onClick={(e) => submit(e, values)}>
          Send Feedback
        </Button>
      </div>
      <FormNotice
        state={state}
        message={
          state === 'success'
            ? 'Thanks — your feedback is in. We read every one.'
            : 'Something went wrong. Please check the highlighted fields and try again.'
        }
      />
    </form>
  );
}
