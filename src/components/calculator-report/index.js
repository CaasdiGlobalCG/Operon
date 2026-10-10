// Public API for the calculator report feature.
//
// `report-pdf.js` is deliberately NOT re-exported here: it pulls in jsPDF
// (~500 kB), and ReportDialog loads it with a dynamic import so it stays out
// of the initial bundle. Re-exporting it would make every consumer of this
// barrel ship jsPDF on first paint.
export { ReportDialog } from './ReportDialog.jsx';
