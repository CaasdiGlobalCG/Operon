// ============================================================
// FILE: loader-primitives.jsx
// PURPOSE: Preview chrome shared by the five loading-animation variants —
//          the variant bar, the stage, the inline-size row and the controls.
// CONNECTS TO: ../shared/loading-variants.constants.js, ../../components/ui
// ============================================================
import { Link } from 'react-router-dom';
import { MonoLabel } from '../../../components/ui';
import { VARIANTS } from './loading-variants.constants.js';

/** Jump links between variants plus the paper/ink surface toggle. */
export function VariantBar({ current, tone, onTone }) {
  const ink = tone === 'ink';
  return (
    <div
      className={`sticky top-0 z-40 border-b px-4 py-3 backdrop-blur ${
        ink ? 'border-paper-14 bg-ink-70 text-paper' : 'border-ink-14 bg-paper text-ink'
      }`}
    >
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-5 gap-y-2">
        <MonoLabel tone={ink ? 'paper' : 'ink'}>Loading variants</MonoLabel>
        <nav aria-label="Loading animation variants" className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {VARIANTS.map((v) => {
            const is = v.id === current;
            return (
              <Link
                key={v.id}
                to={v.path}
                aria-current={is ? 'page' : undefined}
                className={`font-mono text-mono uppercase transition-colors duration-180 ${
                  is
                    ? ink
                      ? 'text-paper underline underline-offset-4'
                      : 'text-ink underline underline-offset-4'
                    : ink
                      ? 'text-paper-55 hover:text-paper'
                      : 'text-ink-55 hover:text-ink'
                }`}
              >
                {v.id} · {v.name}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => onTone(ink ? 'paper' : 'ink')}
          className={`ml-auto rounded-md border px-3 py-1.5 font-mono text-mono-xs uppercase transition-colors duration-180 ${
            ink ? 'border-paper-30 text-paper hover:border-paper' : 'border-ink-14 text-ink-55 hover:border-ink hover:text-ink'
          }`}
        >
          Surface: {ink ? 'ink' : 'paper'}
        </button>
      </div>
    </div>
  );
}

/** Full-bleed stage the loader is judged on. */
export function LoaderStage({ tone, label, children }) {
  return (
    <div
      className={`flex min-h-[52vh] flex-col items-center justify-center gap-8 border px-6 py-16 ${
        tone === 'ink' ? 'border-paper-14 bg-ink text-paper' : 'border-ink-14 bg-paper text-ink'
      }`}
    >
      {children}
      <MonoLabel tone={tone === 'ink' ? 'paper' : 'ink'}>{label}</MonoLabel>
    </div>
  );
}

/** The same loader at in-page size, where most loading actually happens. */
export function InlineRow({ tone, children }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-8 border border-t-0 px-6 py-6 ${
        tone === 'ink' ? 'border-paper-14 bg-ink text-paper' : 'border-ink-14 bg-paper text-ink'
      }`}
    >
      <MonoLabel tone={tone === 'ink' ? 'paper' : 'ink'}>Inline size</MonoLabel>
      {children}
    </div>
  );
}
