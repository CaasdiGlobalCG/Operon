// ============================================================
// FILE: report-pdf.js
// PURPOSE: Builds the client-side PDF for a calculator report (jsPDF).
// CONNECTS TO: ReportDialog.jsx (only caller)
// ============================================================
import { jsPDF } from 'jspdf';

const PAGE_W = 595.28; // A4 pt
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const RIGHT = PAGE_W - MARGIN;
const FOOTER_TOP = PAGE_H - 52;
const SAFE_BOTTOM = FOOTER_TOP - 22;

// Ink / Paper / Cloud only — the brand palette is closed, so the PDF is
// monochrome too. jsPDF's core fonts are Helvetica/Times/Courier; embedding
// Poppins or Inter would mean shipping the TTFs, so hierarchy carries the brand
// rather than the typeface.
const INK = [0, 0, 0];
const MUTED = [120, 120, 120];
const RULE = [219, 219, 219];
const RULE_STRONG = [120, 120, 120];

const FONT = 'helvetica';
const BODY = 10;
const SMALL = 8.5;

/**
 * The core PDF fonts are WinAnsi-encoded and have no rupee sign (U+20B9), so a
 * "₹" is dropped or mangled. Amounts are written with an "INR" prefix instead.
 * This is the single place the encoding limitation is handled — callers keep
 * formatting their own strings.
 */
const pdfSafe = (value) => String(value).replace(/\u20B9\s?/g, 'INR ');

const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Writes the report and triggers the browser download.
 *
 * Layout is a ledger: a summary band carrying the headline figure and the
 * client details side by side, then two tight tables (inputs, then the working)
 * with the total set off by a heavier rule.
 *
 * @param {Object} args
 * @param {Object} args.lead   { name, company, workEmail, companyEmail, phone }
 * @param {Object} args.report { title, subtitle, headline, inputs, breakdown, notes }
 * @param {Date}   args.generatedAt
 * @returns {string} the downloaded filename
 *
 * @connects ReportDialog.jsx (the only caller)
 */
export function buildCalculatorReport({ lead, report, generatedAt = new Date() }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const stamp = generatedAt.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  let y = MARGIN;

  const setStyle = (size, color, style = 'normal') => {
    doc.setFont(FONT, style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
  };

  const line = (atY, color = RULE, width = 0.5, x0 = MARGIN, x1 = RIGHT) => {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(width);
    doc.line(x0, atY, x1, atY);
  };

  const newPage = () => {
    doc.addPage();
    y = MARGIN;
  };

  const ensure = (height) => {
    if (y + height > SAFE_BOTTOM) newPage();
  };

  const lines = (str, width) => doc.splitTextToSize(pdfSafe(str), width);

  /** Section heading: small muted label over a rule. */
  const section = (text) => {
    // 52pt keeps a heading together with at least one row beneath it, so a
    // label can never be stranded at the foot of a page.
    ensure(52);
    y += 8;
    setStyle(SMALL, MUTED, 'bold');
    doc.text(pdfSafe(text), MARGIN, y);
    y += 6;
    line(y);
    y += 14;
  };

  /**
   * One table row: label left, value right. Values that would wrap drop onto
   * their own line so nothing wraps raggedly. Rows never split across pages —
   * and a `ruleAbove` rule is ensured together with its row so it can never be
   * orphaned at the foot of a page.
   */
  const row = (label, value, { note, strong = false, rule = true, ruleAbove = false } = {}) => {
    const labelLines = lines(label, CONTENT_W * 0.54);
    const valueLines = lines(value, CONTENT_W * 0.4);
    const stacked = valueLines.length > 1;
    const labelH = labelLines.length * BODY * 1.3;
    const valueH = valueLines.length * BODY * 1.3;
    const height = (stacked ? labelH + valueH : Math.max(labelH, valueH)) + (note ? SMALL * 1.35 + 4 : 0) + 6;
    if (ruleAbove) {
      ensure(height + 14);
      line(y, RULE_STRONG, 0.8);
      y += 12;
    }
    ensure(height);

    setStyle(BODY, strong ? INK : MUTED, 'normal');
    doc.text(labelLines, MARGIN, y);
    if (!stacked) {
      setStyle(BODY, INK, strong ? 'bold' : 'normal');
      doc.text(valueLines, RIGHT, y, { align: 'right' });
      y += labelH;
    } else {
      y += labelH;
      setStyle(BODY, INK, strong ? 'bold' : 'normal');
      doc.text(valueLines, MARGIN, y);
      y += valueH;
    }
    if (note) {
      y += 3;
      setStyle(SMALL, MUTED, 'normal');
      const noteLines = lines(note, CONTENT_W);
      doc.text(noteLines, MARGIN, y);
      y += noteLines.length * SMALL * 1.35;
    }
    y += 5;
    if (rule) line(y);
    y += 9;
  };

  /* --------------------------------------------------------------- masthead */
  setStyle(10.5, INK, 'bold');
  doc.text('OPERON SOFTWARES', MARGIN, y);
  setStyle(SMALL, MUTED, 'normal');
  doc.text(stamp, RIGHT, y, { align: 'right' });
  y += 12;
  line(y, RULE_STRONG, 0.8);
  y += 26;

  /* ------------------------------------------------------------ title block */
  setStyle(19, INK, 'bold');
  const titleLines = lines(report.title, CONTENT_W);
  doc.text(titleLines, MARGIN, y);
  y += titleLines.length * 19 * 1.2 + 6;
  setStyle(BODY, MUTED, 'normal');
  const subLines = lines(report.subtitle, CONTENT_W * 0.72);
  doc.text(subLines, MARGIN, y);
  y += subLines.length * BODY * 1.35 + 20;

  /* ------------------------------------------------------------ summary band */
  // Two columns inside one band: the headline figure on the left, who the
  // report is for on the right. Hairlines above and below carry the structure.
  const bandTop = y;
  const leftW = CONTENT_W * 0.5;
  const rightX = MARGIN + CONTENT_W * 0.54;
  const rightW = CONTENT_W * 0.46;

  let ly = bandTop + 20;
  setStyle(SMALL, MUTED, 'bold');
  const headLabel = lines(report.headline.label, leftW);
  doc.text(headLabel, MARGIN, ly);
  ly += headLabel.length * SMALL * 1.35 + 16;
  setStyle(21, INK, 'bold');
  const headValue = lines(report.headline.value, leftW);
  doc.text(headValue, MARGIN, ly);
  ly += headValue.length * 21 * 1.2;

  let ry = bandTop + 20;
  const clientRows = [
    [lead.name, 10.5, INK, 'bold'],
    [lead.company, BODY, INK, 'normal'],
    [lead.workEmail, SMALL, MUTED, 'normal'],
    [lead.companyEmail, SMALL, MUTED, 'normal'],
    [lead.phone, SMALL, MUTED, 'normal'],
  ].filter(([v]) => String(v || '').trim());
  setStyle(SMALL, MUTED, 'bold');
  doc.text('PREPARED FOR', rightX, ry);
  ry += 15;
  clientRows.forEach(([value, size, color, style]) => {
    setStyle(size, color, style);
    const ls = lines(value, rightW);
    doc.text(ls, rightX, ry);
    ry += ls.length * size * 1.35 + 2;
  });

  const bandBottom = Math.max(ly, ry) + 6;
  line(bandTop, RULE_STRONG, 0.8);
  line(bandBottom, RULE_STRONG, 0.8);
  y = bandBottom;

  /* ---------------------------------------------------------------- inputs */
  section('YOUR INPUTS');
  report.inputs.forEach(([k, v]) => row(k, v));

  /* ------------------------------------------------------------- breakdown */
  section('HOW THIS NUMBER IS MADE UP');
  const last = report.breakdown.length - 1;
  report.breakdown.forEach((b, i) => {
    if (i === last) {
      // The total is set off by a heavier rule rather than a heavier fill.
      row(b.label, b.value, { note: b.note, strong: true, rule: false, ruleAbove: true });
    } else {
      row(b.label, b.value, { note: b.note });
    }
  });

  /* ---------------------------------------------------------------- notes */
  const noteLines = report.notes.map((n) => lines(n, CONTENT_W - 14));
  const notesH = noteLines.reduce((sum, ls) => sum + ls.length * SMALL * 1.4 + 4, 0);
  // Space for the heading AND its notes is reserved before the heading is drawn,
  // so the two can never be separated by a page break.
  ensure(34 + notesH);
  section('NOTES AND METHOD');
  noteLines.forEach((ls) => {
    setStyle(SMALL, MUTED, 'normal');
    doc.text(ls, MARGIN + 14, y);
    doc.text('\u2014', MARGIN, y);
    y += ls.length * SMALL * 1.4 + 4;
  });

  /* --------------------------------------------------------------- footer */
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p += 1) {
    doc.setPage(p);
    line(FOOTER_TOP, RULE, 0.5);
    setStyle(SMALL, MUTED, 'normal');
    doc.text('operonsoftwares.com', MARGIN, FOOTER_TOP + 14);
    doc.text(`Page ${p} of ${pages}`, RIGHT, FOOTER_TOP + 14, { align: 'right' });
  }

  const filename = `operon-${slug(report.title)}.pdf`;
  doc.save(filename);
  return filename;
}
