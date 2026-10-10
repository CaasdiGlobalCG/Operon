// ============================================================
// FILE: LoadingVariant3.jsx
// PURPOSE: Loading variant 3 — "Wordmark Wipe". A surface-toned light sweeps
//          across the wordmark above a rule that fills.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

/** Independent direction: the brand wordmark carries the loading state. */
export function WordmarkWipe({ tone, scale = 1 }) {
  const veil =
    tone === 'ink'
      ? 'bg-gradient-to-r from-transparent via-ink to-transparent'
      : 'bg-gradient-to-r from-transparent via-paper to-transparent';
  const rule = tone === 'ink' ? 'bg-paper-30' : 'bg-ink-30';
  return (
    <span role="status" className="inline-flex flex-col items-center" style={{ gap: 14 * scale }}>
      <span className="relative inline-block overflow-hidden">
        <Mark variant="wordmark" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(32 * scale)} />
        <span aria-hidden="true" className={`op-anim-wipe absolute inset-y-0 -left-1/4 w-1/2 ${veil}`} />
      </span>
      <span
        aria-hidden="true"
        className={`op-anim-underline block h-px ${rule}`}
        style={{ width: Math.round(140 * scale) }}
      />
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant3() {
  return (
    <VariantPage
      current={3}
      page={(tone) => <WordmarkWipe tone={tone} />}
      inline={(tone) => <WordmarkWipe tone={tone} scale={0.5} />}
    />
  );
}
