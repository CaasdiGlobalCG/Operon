// ============================================================
// FILE: LoadingVariant10.jsx
// PURPOSE: Loading variant 10 — "Counter Spin". The mark turns one way while a
//          square orbits the other, so they cross twice per cycle.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

/** Two bodies in opposition: the mark clockwise, the square anticlockwise. */
export function CounterSpin({ tone, size = 132 }) {
  const dot = tone === 'ink' ? 'bg-paper' : 'bg-ink';
  return (
    <span role="status" className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span aria-hidden="true" className="op-anim-mark-spin absolute inset-0">
        <span className={`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 ${dot}`} />
      </span>
      <span className="op-anim-mark-counter inline-flex">
        <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.6)} />
      </span>
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant10() {
  return (
    <VariantPage
      current={10}
      page={(tone) => <CounterSpin tone={tone} />}
      inline={(tone) => <CounterSpin tone={tone} size={44} />}
    />
  );
}
