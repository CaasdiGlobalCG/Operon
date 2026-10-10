# Loading Variants Context

## What This Feature Does
Five competing loading-animation directions built from the supplied Operon mark, rendered on
unguarded preview routes so one can be chosen and adopted site-wide. Each route shows the loader at
full-stage size, at in-page size, on both paper and ink surfaces, with a replay control.

## How It Connects
- **Depends on:** `../../components/Logo` (`Mark`), `../../components/ui` (`MonoLabel`, `Button`),
  the `op-anim-*` keyframes in `src/index.css`
- **Used by:** `src/App.jsx` — five top-level routes, siblings of the layout routes
- **API base:** none

## Routes
| Route | Variant |
|---|---|
| `/loading-variant-1` | Ring Sweep (shared language) |
| `/loading-variant-2` | Notch Orbit (shared language) |
| `/loading-variant-3` | Wordmark Wipe (independent) |
| `/loading-variant-4` | Signal Bars (independent) |
| `/loading-variant-5` | Bracket Assemble (independent) |
| `/loading-variant-6` | Mark Spin (mark-driven) |
| `/loading-variant-7` | Mark Breathe (mark-driven) |
| `/loading-variant-8` | Quarter Turns (mark-driven) |
| `/loading-variant-9` | Mark Assemble (mark-driven) |
| `/loading-variant-10` | Counter Spin (mark-driven) |

Two families: **1–5** animate hairline devices *around* a static mark; **6–10** make the supplied
mark itself the animated subject (rotate / scale / breathe / step / counter-rotate).

## Mark geometry — measured, not assumed
Measured directly from `src/assets/brand/operon-symbol-black-trim.png` (decoded with `fast-png`):

| Property | Value (px) | Normalised (outer Ø = 100) |
|---|---|---|
| Canvas | 579 × 533 | — |
| Outer diameter | 574 (widest row, y=116) | 100 |
| Vertical diameter | 518 (tallest column, x=158) | 90 |
| Ring thickness | ~215 | 37.5 |
| Slot width — mid | 19 | 3.3 |
| Slot width — top | 167 | 29.1 |
| Enclosed transparent area | **0 pixels** | — |

**The flood-fill result is the important one.** Filling the transparent region inward from the border
leaves **nothing** enclosed, which proves the mark has **no closed hole**: it is a slotted,
asymmetric form, not a ring with a square notch cut into it — its transparent region is connected to
the outside.

That is why variants 6–10 animate the **supplied artwork** rather than a hand-built SVG: a
"circle + square" reconstruction would be a *wrong replica* of a shape that is not a circle plus a
square, and brand rule 03 forbids redrawing the mark anyway. The square motif in variants 2, 8 and 10
echoes the notch as a sibling shape — it is never placed over the artwork.

## Key Files
| File | Purpose |
|------|---------|
| `shared/VariantPage.jsx` | Preview shell: stage, inline row, surface toggle, replay |
| `shared/loader-primitives.jsx` | `VariantBar`, `LoaderStage`, `InlineRow` |
| `shared/loading-variants.constants.js` | The ten directions (id, path, name, language, note) |
| `LoadingVariant1..10.jsx` | One loader each; 1 and 2 share a component language |

## Brand constraints honoured
- **The mark is used as supplied** — never redrawn, recoloured or covered. Loaders animate the mark
  itself or *around* it (`Logo.jsx:11-15`, brand rules 01/03).
- **Black is primary, white is reversed.** The surface toggle exercises both; the loader picks the
  tone-matched asset rather than tinting one file.
- **Monochrome only.** No hue is introduced; hierarchy comes from opacity steps and hairlines.

## Important Notes
- **Motion is transform/opacity only.** No layout property is animated.
- **Reduced motion:** `src/index.css` pins every `[class*='op-anim']` element to its resting state
  (`animation: none; opacity: 1; transform: none`), so the mark stays visible and legible with motion
  off. This is why the artwork never carries the meaning alone.
- Placement transforms live on *children* of `op-anim` elements (e.g. the orbiting square's
  `-translate-x-1/2`), so the reduced-motion override cannot misposition them.
- **Adoption pending:** once a variant is chosen, promote it into `src/components/` as the shared
  loader, delete this directory and its five routes, and apply it to route/async loading.
