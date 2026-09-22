import { useState } from 'react';
import { PageHero, Field, FormNotice, Input, Select, Tabs, Textarea, useFormState } from '../components/blocks';
import { Button, Container, MonoLabel, Pending, Reveal, Section } from '../components/ui';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        headline="Talk to us."
        lead="Questions about Operon Softwares, Operon 360, or anything else — send a note and the right person will follow up."
      />

      <Section surface="paper" id="general">
        <Container width="narrow">
          <Reveal>
            <Tabs
              tabs={[
                { id: 'general', label: 'General', content: <GeneralForm /> },
                { id: 'partnerships', label: 'Partnerships', content: <PartnershipsForm /> },
                { id: 'investors', label: 'Investor Relations', content: <InvestorForm /> },
              ]}
            />
          </Reveal>
          <Reveal className="mt-14 flex flex-wrap items-center gap-3" delay={60}>
            <MonoLabel>Publish checklist</MonoLabel>
            <Pending id="crm-routing" label="Inbox / CRM routing" />
            <Pending id="general-email" label="Fallback email address" />
            <Pending id="investor-relations" label="Investor Relations inclusion + routing" />
          </Reveal>
          <span id="partnerships" className="sr-only" />
          <span id="investors" className="sr-only" />
        </Container>
      </Section>
    </>
  );
}

function GeneralForm() {
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' });
  const { errors, state, submit } = useFormState(['name', 'email', 'message']);
  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  return (
    <form onSubmit={(e) => submit(e, values)} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <Input value={values.name} onChange={set('name')} placeholder="Jane Mehta" error={errors.name} />
        </Field>
        <Field label="Email address" error={errors.email}>
          <Input type="email" value={values.email} onChange={set('email')} placeholder="jane@company.com" error={errors.email} />
        </Field>
        <Field label="Company name" className="md:col-span-2">
          <Input value={values.company} onChange={set('company')} placeholder="Company Pvt Ltd" />
        </Field>
        <Field label="Message" className="md:col-span-2" error={errors.message}>
          <Textarea value={values.message} onChange={set('message')} placeholder="What you need, in plain language." error={errors.message} />
        </Field>
      </div>
      <div className="mt-8">
        <Button type="submit" onClick={(e) => submit(e, values)}>
          Send Message
        </Button>
      </div>
      <FormNotice
        state={state}
        message={
          state === 'success'
            ? "Thanks — we've received your message and will get back to you shortly."
            : 'Something went wrong. Please check the highlighted fields and try again.'
        }
      />
    </form>
  );
}

function PartnershipsForm() {
  const [values, setValues] = useState({ name: '', company: '', email: '', nature: '', message: '' });
  const { errors, state, submit } = useFormState(['name', 'company', 'email', 'message']);
  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  return (
    <form onSubmit={(e) => submit(e, values)} noValidate>
      <p className="mb-8 max-w-prose text-body text-ink-70">
        For vendor networks, integration partners, or organisations exploring a commercial relationship.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <Input value={values.name} onChange={set('name')} placeholder="Jane Mehta" error={errors.name} />
        </Field>
        <Field label="Company name" error={errors.company}>
          <Input value={values.company} onChange={set('company')} placeholder="Company Pvt Ltd" error={errors.company} />
        </Field>
        <Field label="Email address" error={errors.email}>
          <Input type="email" value={values.email} onChange={set('email')} placeholder="jane@company.com" error={errors.email} />
        </Field>
        <Field label="Nature of partnership">
          <Select value={values.nature} onChange={set('nature')}>
            <option value="">Select one</option>
            <option>Vendor network</option>
            <option>Technology integration</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Message" className="md:col-span-2" error={errors.message}>
          <Textarea value={values.message} onChange={set('message')} placeholder="What you have in mind." error={errors.message} />
        </Field>
      </div>
      <div className="mt-8">
        <Button type="submit" onClick={(e) => submit(e, values)}>
          Submit Enquiry
        </Button>
      </div>
      <FormNotice
        state={state}
        message={
          state === 'success'
            ? 'Thanks for reaching out — our partnerships team will be in touch.'
            : 'Something went wrong. Please check the highlighted fields and try again.'
        }
      />
    </form>
  );
}

function InvestorForm() {
  const [values, setValues] = useState({ name: '', firm: '', email: '', message: '' });
  const { errors, state, submit } = useFormState(['name', 'email', 'message']);
  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  return (
    <form onSubmit={(e) => submit(e, values)} noValidate>
      <div className="mb-8">
        <Pending id="investor-relations" label="Include this tab only on explicit confirmation" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <Input value={values.name} onChange={set('name')} placeholder="Jane Mehta" error={errors.name} />
        </Field>
        <Field label="Firm or fund">
          <Input value={values.firm} onChange={set('firm')} placeholder="Fund LLP" />
        </Field>
        <Field label="Email address" className="md:col-span-2" error={errors.email}>
          <Input type="email" value={values.email} onChange={set('email')} placeholder="jane@fund.com" error={errors.email} />
        </Field>
        <Field label="Message" className="md:col-span-2" error={errors.message}>
          <Textarea value={values.message} onChange={set('message')} error={errors.message} />
        </Field>
      </div>
      <div className="mt-8">
        <Button type="submit" onClick={(e) => submit(e, values)}>
          Contact Investor Relations
        </Button>
      </div>
      <FormNotice
        state={state}
        message={
          state === 'success'
            ? 'Thank you — your message has been sent to our investor relations team.'
            : 'Something went wrong. Please check the highlighted fields and try again.'
        }
      />
    </form>
  );
}
