// ============================================================
// FILE: LoadingVariant6.jsx
// PURPOSE: Loading variant 6 — "Mark Spin". The mark itself rotates.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

/**
 * The simplest possible statement of the brief: the supplied mark, turning.
 * The artwork is used exactly as supplied — rotation is the whole animation.
 */
export function MarkSpin({ tone, size = 132 }) {
  return (
    <span role="status" className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span className="op-anim-mark-spin inline-flex">
        <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.72)} />
      </span>
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant6() {
  return (
    <VariantPage
      current={6}
      page={(tone) => <MarkSpin tone={tone} />}
      inline={(tone) => <MarkSpin tone={tone} size={44} />}
    />
  );
}
