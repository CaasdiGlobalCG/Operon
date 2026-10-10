// ============================================================
// FILE: LoadingVariant1.jsx
// PURPOSE: Loading variant 1 — "Ring Sweep". Hairline arc orbits the static mark.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Shared language with variant 2: mark held static inside a hairline device. */
export function RingSweep({ tone, size = 132 }) {
  return (
    <span
      role="status"
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} className="op-anim-spin absolute inset-0" aria-hidden="true">
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMFERENCE * 0.25} ${CIRCUMFERENCE}`}
        />
      </svg>
      <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.38)} />
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant1() {
  return (
    <VariantPage
      current={1}
      page={(tone) => <RingSweep tone={tone} />}
      inline={(tone) => <RingSweep tone={tone} size={44} />}
    />
  );
}
