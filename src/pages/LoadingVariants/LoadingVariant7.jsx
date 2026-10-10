// ============================================================
// FILE: LoadingVariant7.jsx
// PURPOSE: Loading variant 7 — "Mark Breathe". The mark scales against a
//          hairline ring that expands in counter-phase.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

/** The mark breathes while a hairline circle echoes its silhouette outward. */
export function MarkBreathe({ tone, size = 132 }) {
  const ring = tone === 'ink' ? 'border-paper-30' : 'border-ink-30';
  return (
    <span role="status" className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span aria-hidden="true" className={`op-anim-ring-expand absolute inset-0 rounded-full border ${ring}`} />
      <span className="op-anim-mark-breathe inline-flex">
        <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.62)} />
      </span>
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant7() {
  return (
    <VariantPage
      current={7}
      page={(tone) => <MarkBreathe tone={tone} />}
      inline={(tone) => <MarkBreathe tone={tone} size={44} />}
    />
  );
}
