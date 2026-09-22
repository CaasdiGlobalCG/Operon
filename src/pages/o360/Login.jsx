import { useState } from 'react';
import { Field, FormNotice, Input, Tabs, useFormState } from '../../components/blocks';
import { Button, Container, MonoLabel, Section, Reveal } from '../../components/ui';
import { Mark } from '../../components/Logo';

export default function Login() {
  return (
    <Section surface="cloud" className="min-h-[70vh]" ambient>
      <Container width="narrow">
        <Reveal className="mx-auto max-w-[480px]">
          <div className="rounded-lg border border-ink-14 bg-paper p-8 md:p-10">
            <Mark variant="symbol" height={26} />
            <h1 className="mt-7 font-display text-h3 font-semibold">Log in to Operon 360</h1>
            <p className="mt-3 text-sm text-ink-55">
              Access and dashboard differ by role. Choose the one you were onboarded as.
            </p>

            <div className="mt-8">
              <Tabs
                tabs={[
                  { id: 'client', label: 'Client', content: <LoginForm role="Client" /> },
                  { id: 'vendor', label: 'Vendor', content: <LoginForm role="Vendor" /> },
                  { id: 'pm', label: 'Project Manager', content: <LoginForm role="Project Manager" /> },
                ]}
              />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-ink-55">
            Having trouble logging in? Support is available inside the platform.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function LoginForm({ role }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const { errors, state, submit } = useFormState(['email', 'password']);
  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  if (forgot) {
    return (
      <div>
        <MonoLabel>Reset password</MonoLabel>
        <p className="mt-4 text-sm text-ink-70">
          Enter your email and we&rsquo;ll send you a link to reset your password.
        </p>
        <div className="mt-6">
          <Field label="Email address">
            <Input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="jane@company.com" />
          </Field>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => setResetSent(true)}>Send reset link</Button>
          <Button variant="secondary" onClick={() => { setForgot(false); setResetSent(false); }}>
            Back to login
          </Button>
        </div>
        {resetSent ? (
          <FormNotice state="success" message="If an account exists for that email, a reset link is on its way." />
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={(e) => submit(e, values)} noValidate>
      <MonoLabel>Log in as: {role}</MonoLabel>
      <div className="mt-6 grid gap-5">
        <Field label="Email or username" error={errors.email}>
          <Input value={values.email} onChange={set('email')} placeholder="jane@company.com" error={errors.email} />
        </Field>
        <Field label="Password" error={errors.password}>
          <Input type="password" value={values.password} onChange={set('password')} error={errors.password} />
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2.5 text-sm text-ink-70">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 accent-black"
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={() => setForgot(true)}
          className="border-b border-ink-30 pb-0.5 text-sm font-medium hover:border-ink"
        >
          Forgot your password?
        </button>
      </div>

      <div className="mt-7">
        <Button type="submit" onClick={(e) => submit(e, values)} className="w-full">
          Log In
        </Button>
      </div>

      {/* Never reveals which field was wrong. */}
      <FormNotice
        state={state === 'success' ? 'error' : state}
        message={
          state
            ? "That email and password combination doesn't match our records."
            : ''
        }
      />
    </form>
  );
}
