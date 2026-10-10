// ============================================================
// FILE: LoadingVariant5.jsx
// PURPOSE: Loading variant 5 — "Bracket Assemble". Four hairline brackets
//          converge inward on the static mark.
// CONNECTS TO: ./shared/VariantPage.jsx, ../../components/Logo
// ============================================================
import { Mark } from '../../components/Logo';
import { VariantPage } from './shared/VariantPage.jsx';

const CORNERS = [
  { frame: 'left-0 top-0 border-l border-t', dx: '-10px', dy: '-10px' },
  { frame: 'right-0 top-0 border-r border-t', dx: '10px', dy: '-10px' },
  { frame: 'left-0 bottom-0 border-l border-b', dx: '-10px', dy: '10px' },
  { frame: 'right-0 bottom-0 border-r border-b', dx: '10px', dy: '10px' },
];

/** Independent direction: structure closing in on the mark. */
export function BracketAssemble({ tone, size = 132 }) {
  const bracket = tone === 'ink' ? 'border-paper-30' : 'border-ink-30';
  return (
    <span
      role="status"
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {CORNERS.map((c, i) => (
        <span
          key={c.frame}
          aria-hidden="true"
          className={`op-anim-assemble absolute h-4 w-4 ${bracket} ${c.frame}`}
          style={{ '--op-dx': c.dx, '--op-dy': c.dy, animationDelay: `${i * 90}ms` }}
        />
      ))}
      <Mark variant="symbol" tone={tone === 'ink' ? 'white' : 'black'} height={Math.round(size * 0.38)} />
      <span className="sr-only">Loading</span>
    </span>
  );
}

export default function LoadingVariant5() {
  return (
    <VariantPage
      current={5}
      page={(tone) => <BracketAssemble tone={tone} />}
      inline={(tone) => <BracketAssemble tone={tone} size={44} />}
    />
  );
}
