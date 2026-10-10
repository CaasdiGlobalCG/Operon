// ============================================================
// FILE: VariantPage.jsx
// PURPOSE: Shared preview shell for the five loading-animation variants.
// CONNECTS TO: ./loader-primitives.jsx, ../../components/ui
// ============================================================
import { useState } from 'react';
import { Button, MonoLabel } from '../../../components/ui';
import { InlineRow, LoaderStage, VariantBar } from './loader-primitives.jsx';
import { VARIANTS } from './loading-variants.constants.js';

/**
 * Renders one loading-animation direction: a full stage, the same loader at
 * in-page size, a surface toggle (paper/ink) and a replay control.
 *
 * @param {number} current   variant id
 * @param {Function} page    (tone, replayKey) => loader element at stage size
 * @param {Function} inline  (tone) => loader element at inline size
 */
export function VariantPage({ current, page, inline }) {
  const [tone, setTone] = useState('paper');
  const [replay, setReplay] = useState(0);
  const variant = VARIANTS.find((v) => v.id === current);
  const ink = tone === 'ink';

  return (
    <div className={ink ? 'min-h-screen bg-ink text-paper' : 'min-h-screen bg-paper text-ink'}>
      <VariantBar current={current} tone={tone} onTone={setTone} />

      <div className="mx-auto max-w-content px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <MonoLabel tone={ink ? 'paper' : 'ink'}>
              Variant {variant.id} · {variant.language} language
            </MonoLabel>
            <h1 className="mt-3 font-display text-h3 font-semibold">{variant.name}</h1>
            <p className={`mt-2 max-w-measure text-sm ${ink ? 'text-paper-70' : 'text-ink-70'}`}>{variant.note}</p>
          </div>
          <Button tone={ink ? 'ink' : 'paper'} variant="secondary" onClick={() => setReplay((r) => r + 1)}>
            Replay
          </Button>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg">
          <LoaderStage tone={tone} label={`${variant.name} · full stage`}>
            <span key={replay}>{page(tone, replay)}</span>
          </LoaderStage>
          <InlineRow tone={tone}>
            <span key={replay}>{inline(tone)}</span>
          </InlineRow>
        </div>

        <p className={`mt-8 max-w-prose text-xs leading-relaxed ${ink ? 'text-paper-55' : 'text-ink-55'}`}>
          Motion is transform and opacity only, so it never triggers layout. With{' '}
          <span className="font-mono">prefers-reduced-motion</span> the loader is pinned to its resting state — the mark
          stays fully visible and the animation simply stops, which is why the artwork is never the thing that carries
          the loading meaning on its own.
        </p>
      </div>
    </div>
  );
}
