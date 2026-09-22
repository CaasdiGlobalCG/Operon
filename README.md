# Operon Softwares — marketing website

React + Vite + Tailwind. One codebase, two shells: the corporate site at `/`
and the Operon 360 sub-site at `/360`.

## Run

```bash
npm install
npm run dev          # local dev server
npm run build        # production build -> dist/
npm run build:single # single self-contained HTML preview -> dist-single/
```

## Structure

```
src/
  lib/site.js            Route manifest + nav/footer placement. Single source of truth.
  content/gaps.js        Every open content gap from the content doc, by id.
  components/Logo.jsx    Brand-rule-enforcing logo lockups.
  components/ui.jsx      Design system primitives.
  components/Signal.jsx  Hero motif (four forms, one promoter).
  components/SearchDog.jsx
  layouts/               CorporateLayout (Paper chrome), Operon360Layout (Ink chrome).
  pages/                 One file per page.
```

## Design system

Source of truth is Operon Brand System v1.1. Tokens live in `tailwind.config.js`
and the colour palette is **replaced**, not extended — Ink `#000000`,
Paper `#FFFFFF`, Cloud `#F0F0F0` and opacity steps of those are the only colours
that exist. There is no accent. Surface inversion carries emphasis.

Type: Poppins (display), Inter (body/UI), JetBrains Mono (labels, paths, status).

Logos are used from the supplied alpha-transparent assets, trimmed of their
transparent padding for optical alignment only. `Logo.jsx` picks black or white
by surface and applies clear space equal to the symbol's small-circle height.
Geometry is never redrawn, recoloured, rotated, or notch-filled.

Ambient background: the supplied white-to-black linear gradient is rendered as a
heavily blurred, low-opacity layer behind hero and accent sections
(`AmbientGradient.jsx`) — same construction as the Figma layer, kept faint so
type keeps its contrast. It uses only #FFFFFF and #000000, so the palette stays
closed. It never touches the logo.

Motion: one orchestrated page-load sequence (the hero signal), plus
transform/opacity reveals on section entry and state transitions on interaction.
`prefers-reduced-motion` is honoured globally.

## Content gaps

Nothing is fabricated. Unresolved facts render as an `Input required` chip tied
to an id in `src/content/gaps.js`, and empty sections use the content doc's own
empty-state copy. Search `data-gap` in the DOM, or read `gaps.js`, to get the
full publish checklist.

## Legal documents

`/legal/terms-of-service` and `/legal/privacy-policy` render the full approved text.

```
src/content/legal/terms-of-service.json   verbatim text, extracted from the PDF
src/content/legal/privacy-policy.json     verbatim text, extracted from the PDF
src/components/LegalDocument.jsx          renderer: contents rail, sections, tables, callouts
```

To change wording, edit the JSON (each block is `{ t, runs: [{ t, b }] }`; `b` = bold).
Bracketed placeholders such as `[INSERT DATE]` render as dashed "unfilled" chips
(`data-gap="legal-placeholder"`) — replace the text in the JSON and the chip disappears.

The Privacy Policy PDF also carries internal drafting notes (legal-review warnings and a
pre-publication checklist). Those blocks are tagged `draft: true` and are hidden. Flip
`SHOW_DRAFTING_NOTES` in `LegalDocument.jsx` to show them while reviewing.
`/legal/compliance` still uses the placeholder shell — no source document yet.

## Routing note

The sitemap specifies `360.operonsoftwares.com` as a separate host. No domains
exist yet, so Operon 360 is mounted at `/360`. Moving to a real subdomain means
changing `O360` in `src/lib/site.js` and nothing else.

The single-file preview build uses hash routing because it is served without a
server rewrite. Production uses clean paths and needs a catch-all rewrite to
`index.html`.

## Batches

| Batch | Contents | Status |
|---|---|---|
| 0 | Scaffold, tokens, primitives, both shells, Search Dog, all 29 routes | done |
| 1 | Home, About, Our Approach, Platforms | done |
| 2 | Operon 360: Landing, Process Flow, Why Us, Ecosystem, Features | done |
| 3 | 360 Industries, Get Demo, Login | done |
| 4 | Corporate Industries + 8 deep-dives | done |
| 5 | Insights, Careers, Contact, Legal + 3 docs, Marketing/Growth | done |
| 6 | Responsive + a11y pass, motion polish, link audit | done |

All 29 routes are built. Every route was render-checked before release.
