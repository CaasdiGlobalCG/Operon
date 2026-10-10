// ============================================================
// FILE: LoadingVariant9.jsx
// PURPOSE: Loading variant 9 — "Mark Assemble". The mark settles into place
//          from a slight scale and tilt, then holds.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

/** An entrance rather than a spinner: the mark lands, rests, and repeats. */
export function MarkAssemble({ tone, size = 132 }) {
  return (
    <span role="status" className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span className="op-anim-mark-assemble inline-flex">
        <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.68)} />
      </span>
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant9() {
  return (
    <VariantPage
      current={9}
      page={(tone) => <MarkAssemble tone={tone} />}
      inline={(tone) => <MarkAssemble tone={tone} size={44} />}
    />
  );
}
