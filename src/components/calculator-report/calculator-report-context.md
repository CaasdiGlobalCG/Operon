# Calculator Report Context

## What This Feature Does
Lets a visitor turn either Growth-page calculator into a PDF report addressed to them. Clicking
"Generate report" opens a lead-capture dialog (name, company, work email, company email, optional
phone); on submit the report is built in the browser with jsPDF and downloaded.

## How It Connects
- **Depends on:** `../blocks` (Field, Input, FormNotice, useFormState), `../ui` (Button, MonoLabel),
  `jspdf@4.2.1`
- **Used by:** `src/components/Calculators.jsx` (both `FragmentationTaxCalculator` and
  `ChasingCostCalculator`)
- **API base:** none — this site has no backend

## Key Files
| File | Purpose |
|------|---------|
| `ReportDialog.jsx` | Modal dialog: lead form → generate → success state |
| `report-pdf.js` | Pure jsPDF builder; takes a `report` payload, returns the filename |
| `index.js` | Public API barrel |

## Data Flow
Calculator state (already computed for the on-screen output) → `report` payload built inline in the
calculator → `ReportDialog` → `buildCalculatorReport()` → `doc.save()` browser download.

Payload contract (`report` prop):
```js
{
  title: 'Fragmentation Tax Report',
  subtitle: '…',
  headline: { label: 'Estimated annual fragmentation tax', value: '₹12.3 L – ₹16.6 L' },
  inputs: [['Active vendors currently engaged', '18'], …],
  breakdown: [{ label: 'Coordination labor', value: '₹16,20,000', note: '1.5 FTE × …' }],
  notes: ['…'],
}
```
Every string is formatted by the calculator itself, so the PDF never re-derives or invents a number.

## Important Notes
- **No email is sent.** The site is a static SPA (GitHub Pages); there is no endpoint. The success
  notice says so explicitly. Open gap: `calculator-report-email` in `src/content/gaps.js`.
- **Font:** jsPDF ships only the core fonts (Helvetica/Times/Courier). Poppins/Inter would require
  embedding TTFs, so the report uses Helvetica and carries the brand through monochrome hierarchy.
- **Rupee sign:** the core fonts are WinAnsi-encoded and have **no `₹` (U+20B9)** — it renders as a
  mangled superscript. `pdfSafe()` in `report-pdf.js` rewrites `₹` to an `INR ` prefix. That is the
  single place the encoding limit is handled; the calculators keep formatting their own strings.
- **Layout rules:** a **summary band** carries the headline figure (left) and the client details
  (right) between two heavier rules; below it, two tight tables — `YOUR INPUTS`, then
  `HOW THIS NUMBER IS MADE UP` with the total set off by a heavier rule. Values that would wrap are
  stacked under their label instead of wrapping right-aligned (right-aligned wrapping reads as
  ragged). Rows never split across pages, a `ruleAbove` rule is ensured with its row so it can never
  be orphaned, a section heading is ensured together with its first row, and the notes block is kept
  whole. Typical reports are 1 page; longer ones spill a second page carrying the method notes.
- **Colour:** Ink/Paper/Cloud only, matching `tailwind.config.js` — the palette is closed.
- **Verified visually:** every layout change was rendered to PNG with `pdftoppm` and inspected —
  headline, section labels, table rows and page breaks must all be checked by eye, because static
  checks cannot see an overlap or an orphaned heading.
- The dialog is not a shared primitive yet; if a second feature needs a modal, promote it.
