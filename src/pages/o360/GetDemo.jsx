import { useState } from 'react';
import { Field, FormNotice, Input, PageHero, Select, Textarea, useFormState } from '../../components/blocks';
import { Button, Container, MonoLabel, Pending, Reveal, Section } from '../../components/ui';
import { INDUSTRIES } from '../../lib/site';

export default function GetDemo() {
  const [values, setValues] = useState({
    role: 'Client',
    name: '',
    company: '',
    email: '',
    phone: '',
    size: '',
    industry: '',
    needs: '',
    slot: '',
  });
  const { errors, state, submit } = useFormState(['name', 'company', 'email', 'phone', 'needs']);
  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  return (
    <>
      <PageHero
        surface="ink"
        eyebrow="Operon 360 · Get demo"
        headline="See Operon 360 in action."
        lead="Tell us a bit about your business and we'll set up a walkthrough tailored to how you'd actually use the platform."
      />

      <Section surface="paper">
        <Container width="narrow">
          <Reveal>
            <form onSubmit={(e) => submit(e, values)} noValidate>
              <fieldset className="border-b border-ink-14 pb-8">
                <legend className="font-mono text-mono uppercase text-ink-55">I am a</legend>
                <div className="mt-4 flex gap-3">
                  {['Client', 'Vendor'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      aria-pressed={values.role === role}
                      onClick={() => setValues({ ...values, role })}
                      className={`h-11 rounded-md border px-5 text-sm font-medium transition-colors duration-180 ${
                        values.role === role ? 'border-ink bg-ink text-paper' : 'border-ink-14 text-ink hover:border-ink'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <Input value={values.name} onChange={set('name')} placeholder="Jane Mehta" error={errors.name} />
                </Field>
                <Field label="Company name" error={errors.company}>
                  <Input value={values.company} onChange={set('company')} placeholder="Company Pvt Ltd" error={errors.company} />
                </Field>
                <Field label="Email address" error={errors.email}>
                  <Input type="email" value={values.email} onChange={set('email')} placeholder="jane@company.com" error={errors.email} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <Input value={values.phone} onChange={set('phone')} placeholder="+91 98 4444 4444" error={errors.phone} />
                </Field>

                <Field label="Company size" hint="Bands pending confirmation">
                  <Select value={values.size} onChange={set('size')}>
                    <option value="">Select one</option>
                    <option disabled>Bands — input required</option>
                  </Select>
                </Field>
                <Field label="Industry">
                  <Select value={values.industry} onChange={set('industry')}>
                    <option value="">Select one</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i.slug}>{i.name}</option>
                    ))}
                  </Select>
                </Field>

                <Field
                  label={`What you need Operon 360 for${values.role === 'Vendor' ? ', and what you supply' : ''}`}
                  className="md:col-span-2"
                  error={errors.needs}
                >
                  <Textarea value={values.needs} onChange={set('needs')} placeholder="In plain language." error={errors.needs} />
                </Field>

                <Field label="Preferred date and time" className="md:col-span-2" hint="Scheduling system pending">
                  <Input type="datetime-local" value={values.slot} onChange={set('slot')} />
                </Field>
              </div>

              <div className="mt-8">
                <Button type="submit" onClick={(e) => submit(e, values)}>
                  Book Demo
                </Button>
              </div>

              <FormNotice
                state={state}
                message={
                  state === 'success'
                    ? `You're booked. We've sent a confirmation to ${values.email} with the details — see you then.`
                    : "We couldn't complete your booking. Please check the highlighted fields and try again."
                }
              />
            </form>
          </Reveal>

          <Reveal className="mt-14 flex flex-wrap items-center gap-3" delay={60}>
            <MonoLabel>Publish checklist</MonoLabel>
            <Pending id="demo-form" label="Size bands, scheduling system, CRM, follow-up workflow" />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
