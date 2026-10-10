// ============================================================
// FILE: ReportDialog.jsx
// PURPOSE: Lead-capture dialog shown before a calculator report is generated.
// CONNECTS TO: ../blocks (Field, Input, FormNotice, useFormState),
//             ../ui (Button, MonoLabel), ./report-pdf (buildCalculatorReport)
// ============================================================
import { useEffect, useState } from 'react';
import { Field, FormNotice, Input, useFormState } from '../blocks';
import { Button, MonoLabel } from '../ui';

const REQUIRED = ['name', 'company', 'workEmail', 'companyEmail'];
const EMPTY = { name: '', company: '', workEmail: '', companyEmail: '', phone: '' };

/**
 * Collects who the report is for, then generates it locally.
 *
 * There is no backend on this site, so nothing is transmitted: the report is
 * built in the browser and downloaded. Email delivery is an open gap
 * (`calculator-report-email` in src/content/gaps.js).
 */
export function ReportDialog({ open, onClose, report }) {
  const [values, setValues] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(null);
  const [failed, setFailed] = useState(false);
  const { errors, state, submit, reset } = useFormState(REQUIRED);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  function close() {
    setValues(EMPTY);
    setSaved(null);
    setFailed(false);
    reset();
    onClose();
  }

  async function onSubmit(event) {
    if (!submit(event, values)) return;
    setBusy(true);
    setFailed(false);
    try {
      // jsPDF is ~500 kB and only needed at this moment, so it is fetched on
      // demand rather than shipped in the initial bundle.
      const { buildCalculatorReport } = await import('./report-pdf.js');
      setSaved(buildCalculatorReport({ lead: values, report }));
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-70 p-4 sm:p-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-dialog-title"
        className="animate-pop-in my-auto w-full max-w-lg rounded-lg border border-ink-14 bg-paper p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <MonoLabel>{report.title}</MonoLabel>
            <h3 id="report-dialog-title" className="mt-3 font-display text-h4 font-semibold">
              Who should the report be addressed to?
            </h3>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="mt-1 shrink-0 rounded-md border border-ink-14 px-2 py-1 font-mono text-mono-xs uppercase text-ink-55 transition-colors duration-180 hover:border-ink hover:text-ink"
          >
            Esc
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-70">
          Your inputs stay exactly as you entered them. These details go on the report itself.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.name}>
              <Input autoFocus value={values.name} onChange={set('name')} placeholder="Jane Mehta" error={errors.name} />
            </Field>
            <Field label="Company name" error={errors.company}>
              <Input value={values.company} onChange={set('company')} placeholder="Company Pvt Ltd" error={errors.company} />
            </Field>
            <Field label="Work email" error={errors.workEmail}>
              <Input type="email" value={values.workEmail} onChange={set('workEmail')} placeholder="jane@company.com" error={errors.workEmail} />
            </Field>
            <Field label="Company email" error={errors.companyEmail} hint="Accounts or a shared inbox, if you have one.">
              <Input type="email" value={values.companyEmail} onChange={set('companyEmail')} placeholder="accounts@company.com" error={errors.companyEmail} />
            </Field>
            <Field label="Phone" className="sm:col-span-2" hint="Optional.">
              <Input type="tel" value={values.phone} onChange={set('phone')} placeholder="+91 00000 00000" />
            </Field>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={busy}>
              {busy ? 'Generating…' : 'Generate report'}
            </Button>
            <Button type="button" variant="secondary" onClick={close}>
              Cancel
            </Button>
          </div>

          <FormNotice
            state={failed ? 'error' : state}
            message={
              failed
                ? 'The report could not be generated in this browser. Please try again, or use the contact page.'
                : state === 'success'
                  ? `Report downloaded as ${saved}. Email delivery is not connected yet, so nothing has been sent — your details stay in this browser tab.`
                  : 'Please check the highlighted fields and try again.'
            }
          />

          <p className="mt-5 text-xs leading-relaxed text-ink-55">
            This site has no server, so the report is generated entirely in your browser and nothing is uploaded.
          </p>
        </form>
      </div>
    </div>
  );
}
