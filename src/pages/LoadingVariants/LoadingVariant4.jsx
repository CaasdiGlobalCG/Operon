// ============================================================
// FILE: LoadingVariant4.jsx
// PURPOSE: Loading variant 4 — "Signal Bars". Three bars pulse beside the mark.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

/** Independent direction: activity read from a small bar cluster. */
export function SignalBars({ tone, size = 132 }) {
  const bar = tone === 'ink' ? 'bg-paper' : 'bg-ink';
  return (
    <span role="status" className="inline-flex items-center" style={{ gap: Math.round(size * 0.18) }}>
      <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.38)} />
      <span aria-hidden="true" className="flex items-end gap-1.5" style={{ height: Math.round(size * 0.34) }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`op-anim-bar block w-1.5 ${bar}`}
            style={{ height: '100%', animationDelay: `${i * 140}ms` }}
          />
        ))}
      </span>
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant4() {
  return (
    <VariantPage
      current={4}
      page={(tone) => <SignalBars tone={tone} />}
      inline={(tone) => <SignalBars tone={tone} size={44} />}
    />
  );
}
