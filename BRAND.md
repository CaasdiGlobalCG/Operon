# Operon Brand Guidelines — Web Implementation

Distilled from the codebase (`tailwind.config.js`, `index.css`, `Logo.jsx`).
Tokens are the source of truth — if this doc and the config disagree, the config wins.

---

## 1. Colour

The palette is **closed and monochrome**. No accent colour exists.

| Token | Value | Use |
|---|---|---|
| `ink` | `#000000` | Primary text, dark surfaces |
| `paper` | `#FFFFFF` | Primary surface, text on ink |
| `cloud` | `#F0F0F0` | Secondary surface, alternating sections |
| `ink-70/55/40/30/14/08/04` | black @ opacity | Muted text, hairline rules, hovers |
| `paper-70/55/30/14/08` | white @ opacity | Same roles on ink surfaces |
| `#DC2626` | red | Exception: metro markers on the presence map only |

### Surface ratio — 55 / 25 / 15 / 05

- **55% Paper** — the default canvas
- **25% Cloud** — alternating bands, cards on paper
- **15% Ink** — nav, footer, select heroes. Ink is *rationed*; never dominant
- **05% matte signal** — a single accent moment per page max (e.g. the Search Dog FAB orbit)

### Rules

- Never introduce a hue. Not for CTAs, not for errors, not for links.
- Hierarchy comes from opacity steps, not colour.
- `ink-14` is the default hairline; `ink-30` for quiet borders, `ink` for focus/error.

---

## 2. Typography

Three families, fixed roles:

| Family | Font | Use |
|---|---|---|
| `font-display` | Poppins | Headlines, numeric labels in cards |
| `font-sans` | Inter | Body copy, UI text, buttons |
| `font-mono` | JetBrains Mono | Eyebrows, metadata, chips — always uppercase, tracked |

### Scale

| Token | Size / LH | Use |
|---|---|---|
| `h1` / `h1-lg` | 48/52 → 72/68 | Page heroes only |
| `h2` / `h2-lg` | 44/48 → 64/60 | Section headlines |
| `h3` | 32/40 | Sub-headlines, card titles |
| `h4` | 22/30 | List items, small heads |
| `lead` | 20/32 | Hero/body intro paragraphs |
| `body` | 17/28 | Default copy |
| `sm` / `xs` | 15/24, 13/20 | Secondary text, captions |
| `mono*` | 10–12px | Labels only — never body copy |

Headlines use negative tracking (`-0.025em`+) and `text-wrap: balance`; body uses `text-wrap: pretty`.

---

## 3. Logo

Assets in `src/assets/brand/` — used via `Mark`/`CorporateLogo`/`PlatformLogo`. Never redraw or tint.

- **Black is primary, white is reversed.** No third variant.
- **Clear space** = height of the symbol's small circle (`0.43×` height).
- **The notch** in the symbol stays open — never filled or covered.
- Lockups: `symbol` (mark alone), `wordmark` (Operon Softwares), `platform` (Operon 360).

---

## 4. Layout

- `Container`: `max-w-content` (1200px), `px-6 md:px-10`; `narrow` = 880px
- Sections: `py-20 md:py-30`, alternating Paper/Cloud surfaces
- **Hairlines are the structural device** — `gap-px` grids + `border-ink-14`, not card shadows
- Grids are asymmetric: `0.9fr / 1.1fr`, `1.15fr / 0.85fr` — avoid dead-even splits
- Prose caps: `max-w-prose` 68ch body, `max-w-measure` 58ch, headlines `max-w-[16–20ch]`
- Radius scale: `sm 2 / DEFAULT 4 / md 6 / lg 10` — subtle, never pill-shaped panels

---

## 5. Components

- **Buttons**: `h-11 px-5 rounded-md`, primary = `bg-ink text-paper`, secondary = `border-ink-14`. Press = `scale(0.97)`. One primary action per view.
- **Cards**: surface + hairline siblings, `p-7 md:p-8`. Hover = lift −4px + soft shadow + optional spotlight glow.
- **Pending chips**: unresolved content shows `Input required — …`, never fabricated copy.
- **Nav**: sticky, hides on scroll-down >320px, returns on scroll-up. Active link = underline draw.
- **Search Dog**: FAB bottom-right; the only persistent motion accent allowed.

---

## 6. Motion

Philosophy: motion communicates hierarchy, state, continuity — never decoration alone.

| Token | Value |
|---|---|
| Easing | `ease-signal` = `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Fast | 120–180ms — hovers, presses |
| Base | 220–320ms — menus, dialogs |
| Slow | 360–520ms — entrances, reveals |
| Stagger | 50–90ms per item |

**Vocabulary**: scroll reveals (fade + 14px rise, or ±22px lateral), per-item list staggers, hero mount stagger (eyebrow→headline→lead→CTA), route crossfade, scroll-scrubbed SVG draw, pinned headers with progress rails, cursor spotlight, marquee, float + ground-shadow.

**Rules**: transform & opacity only — no layout-property animation. Every animation must respect `prefers-reduced-motion` (static render). One looping ambient animation per viewport max.

---

## 7. Do / Don't

| Do | Don't |
|---|---|
| Ink on paper, paper on ink | Colour accents, gradients over brand colour |
| `ink-14` hairlines between cells | Borders thicker than 2px for structure |
| `Pending` for unknown content | Invent stats, client names, claims |
| One CTA per section | Button clusters of 3+ |
| Opacity steps for hierarchy | `text-gray-*` or off-system values |
