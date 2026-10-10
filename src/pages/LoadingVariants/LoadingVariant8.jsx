// ============================================================
// FILE: LoadingVariant8.jsx
// PURPOSE: Loading variant 8 — "Quarter Turns". The mark steps through four
//          90° turns with a small square marking the resting position.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

/** Mechanical rather than eased: four deliberate quarter-turns, then repeat. */
export function QuarterTurns({ tone, size = 132 }) {
  const dot = tone === 'ink' ? 'bg-paper' : 'bg-ink';
  return (
    <span role="status" className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span className="op-anim-mark-quarter inline-flex">
        <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.66)} />
      </span>
      <span
        aria-hidden="true"
        className={`op-anim-square-fade absolute right-0 top-0 h-1.5 w-1.5 ${dot}`}
      />
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant8() {
  return (
    <VariantPage
      current={8}
      page={(tone) => <QuarterTurns tone={tone} />}
      inline={(tone) => <QuarterTurns tone={tone} size={44} />}
    />
  );
}
