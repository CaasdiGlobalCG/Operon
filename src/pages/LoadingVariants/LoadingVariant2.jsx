// ============================================================
// FILE: LoadingVariant2.jsx
// PURPOSE: Loading variant 2 — "Notch Orbit". A small square echoes the mark's
//          notch and travels the hairline ring around it.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

/** Shared language with variant 1: mark held static inside a hairline device. */
export function NotchOrbit({ tone, size = 132 }) {
  const ring = tone === 'ink' ? 'border-paper-14' : 'border-ink-14';
  const dot = tone === 'ink' ? 'bg-paper' : 'bg-ink';
  return (
    <span
      role="status"
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span aria-hidden="true" className={`absolute inset-0 rounded-full border ${ring}`} />
      <span aria-hidden="true" className="op-anim-spin absolute inset-0">
        <span className={`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 ${dot}`} />
      </span>
      <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.38)} />
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant2() {
  return (
    <VariantPage
      current={2}
      page={(tone) => <NotchOrbit tone={tone} />}
      inline={(tone) => <NotchOrbit tone={tone} size={44} />}
    />
  );
}
