// Operon 360 feature modules, from the Restructured Website Content doc.
// Each module: what it is, the problem it solves, how it works, who uses it,
// key capabilities. Unconfirmed mechanics are marked with a gap id.

export const MODULES = [
  {
    id: 'workspace',
    name: 'Workspace',
    what: 'The dedicated environment where a client, vendor(s), and PM collaborate on a single project.',
    problem: 'Project communication and documentation scattered across email, chat, and spreadsheets with no shared source of truth.',
    how: 'Every project gets its own workspace — requirements, communications, documents, status updates, all in one place.',
    who: 'Clients, vendors, and PMs on that project.',
    capabilities: [
      'Shared communication channel',
      'Document and file management',
      'Status and milestone tracking',
      'Role-based visibility',
    ],
  },
  {
    id: 'canvas',
    name: 'The Canvas by Operon',
    what: 'A visual, drag-and-drop building surface for structuring deliverables, data, and reporting.',
    problem: 'Teams reaching for separate design or reporting tools for invoices, quotations, forms, and reports.',
    how: 'Ready-made blocks assembled directly on the Canvas.',
    who: 'PMs and clients building project documentation and reporting.',
    capabilities: [
      'Drag-and-drop blocks',
      'Invoices, quotations, forms, tables, charts',
      'AI-assisted elements that adapt to project context',
    ],
  },
  {
    id: 'cipher',
    name: 'Cipher',
    subtitle: 'AI Engine',
    what: "Operon 360's in-product AI, assisting PMs, clients, and vendors within the platform.",
    problem: null,
    how: 'Operates across Workspace, The Canvas, and the requirement-understanding step of Process Flow — a connective layer, not a standalone module.',
    who: 'PMs, clients, and vendors — inside the product, not the public site.',
    capabilities: [
      'AI-assisted vendor matching',
      'AI-assisted elements on The Canvas',
      'Requirement-understanding support for PMs',
    ],
    gap: 'cipher',
    cta: { label: 'See where Cipher fits', to: '/360/process' },
  },
  {
    id: 'ledger',
    name: 'The Ledger',
    subtitle: 'Finance Layer',
    what: "Operon 360's integrated invoicing and financial management layer.",
    problem: 'Billing and delivery living in separate systems, making financial visibility a constant reconciliation exercise.',
    how: 'Quotes, invoices, orders, subscriptions, and credit notes managed in the same platform as delivery, with real-time revenue and outstanding-payment visibility and connected PO tracking.',
    who: 'Clients managing spend, vendors managing invoicing, finance teams on both sides.',
    capabilities: [
      'Quotes, invoices, orders, subscriptions, credit notes',
      'Real-time visibility',
      'Connected procurement and PO tracking',
    ],
  },
  {
    id: 'get-operonified',
    name: 'Get Operonified',
    subtitle: 'KYC / Trust Layer',
    what: 'Dynamic, multi-level KYC verification for vendors.',
    problem: 'No reliable way to establish vendor credibility before committing to a project relationship.',
    how: 'Vendors go through multi-level verification before being matched to requirements.',
    who: 'Vendors onboarding; clients relying on verified matches.',
    capabilities: ['Multi-level identity and business verification', 'Credibility signalling', 'Ongoing trust layer'],
  },
  {
    id: 'tenders',
    name: 'Tenders',
    what: 'A structured space for clients to open tender requirements to the verified vendor network.',
    problem: 'Tendering run manually via email and documents, with limited comparability.',
    how: 'Clients publish requirements; verified vendors respond in the same structured workspace.',
    who: 'Clients running competitive sourcing; vendors responding.',
    capabilities: ['Structured tender publication', 'Vendor response management'],
    gap: 'tender-mechanics',
  },
  {
    id: 'bids',
    name: 'Bids @ Operon',
    what: 'The bid submission and comparison mechanism for vendors responding to requirements.',
    problem: 'Bid comparison across disconnected documents with no standard format.',
    how: 'Vendors submit bids in a standard structure for side-by-side comparison.',
    who: 'Vendors submitting; clients and PMs comparing.',
    capabilities: ['Standardised submission', 'Side-by-side comparison'],
    gap: 'tender-mechanics',
  },
  {
    id: 'procurement',
    name: 'Procurement by Graviyx',
    what: 'The B2B global procurement engine inside Operon 360, with vendor payments handled through Graviyx.',
    problem: 'Procurement decisions made across disconnected quoting tools and email, with limited audit trail.',
    how: 'Clients source globally through the platform; activity tracked against approved budgets and timelines alongside execution. Vendor payments run through Graviyx — a separate, external platform integrated with the procurement workflow, never rendered as a page inside Operon 360.',
    who: 'Clients sourcing, vendors fulfilling and being paid, PMs managing.',
    capabilities: [
      'Global sourcing',
      'Budget and timeline tracking',
      'Connected to Workspace, The Ledger, and vendor matching',
      'Milestone-based vendor payment via Graviyx',
    ],
    external: 'graviyx',
  },
];

export const ECOSYSTEM = [
  { name: 'Clients', copy: 'Businesses that submit requirements and receive PM-led execution, from a single project to full operational support.' },
  { name: 'Projects', copy: 'The unit of work inside Operon 360: a requirement tracked from submission through delivery inside its own workspace.' },
  { name: 'Vendors', copy: 'Verified service providers and suppliers matched to requirements through KYC and matching.' },
  { name: 'Procurement', copy: 'Global sourcing and purchasing managed inside the same workspace as execution.' },
  { name: 'Materials', copy: 'Material sourcing and tracking connected directly to the projects and vendors that need them.' },
  { name: 'Services', copy: 'The full range of vendor-delivered services coordinated and tracked through the platform.' },
  { name: 'Technology', copy: 'The AI-assisted matching, workflow, and finance infrastructure underneath every workspace.' },
];

export const PROCESS_STEPS = [
  { term: 'Submit a requirement', copy: 'The client types out what they need, in plain language, inside the platform.' },
  { term: 'PM review', copy: 'A dedicated project manager connects with the client and gathers the details required to fully understand the requirement.' },
  { term: 'Vendor matching', copy: 'Operon 360 identifies and finalises the right verified service provider(s) or vendor(s) from its network.' },
  { term: 'Workspace activation', copy: 'Client, vendor(s), and PM are connected inside a dedicated project workspace.' },
  { term: 'Execution & procurement', copy: 'The PM manages execution and procures materials as needed, with progress tracked inside the workspace.' },
  { term: 'Delivery & sign-off', copy: 'The client reviews and approves deliverables and milestones through to project completion.' },
];

// The Standard — ten stages of vendor verification. Each stage is a discrete
// check with a recorded outcome; a vendor does not advance by paying, waiting,
// or knowing someone. Shown on the Process page under "How vendors join".
export const VENDOR_STAGES = [
  { term: 'Identity', copy: 'Promoter or owner verified as an individual — not just a company name on a letterhead.' },
  { term: 'Business credentials', copy: 'Registration, GSTIN, PAN and MSME status checked against source records.' },
  { term: 'Financial & commercial checks', copy: 'Commercial scale matched to the value of work a vendor is put forward for, where relevant.' },
  { term: 'Capability', copy: 'Trade categories, crew, equipment and capacity verified — not self-reported.' },
  { term: 'Portfolio', copy: 'Evidence of past work, cross-checked against what the vendor claims to have delivered.' },
  { term: 'References', copy: 'Contacted independently by us. Not a list the vendor hand-picked.' },
  { term: 'Site verification', copy: 'In-person visit for categories where physical capability decides whether work lands.' },
  { term: 'Certifications & compliance', copy: 'Checked against the requirements of the specific category, not a generic checklist.' },
  { term: 'Trial engagement', copy: 'The first live project runs under close monitoring before wider matching.' },
  { term: 'Ongoing scorecard', copy: 'On-time rate, quality and dispute rate tracked continuously — it can raise or lower a tier.' },
];

export const VENDOR_TIERS = [
  {
    name: 'Tier 1 · Founding',
    copy: 'Cleared all ten stages, including site visit and trial engagement, with a live scorecard.',
  },
  {
    name: 'Tier 2 · Verified',
    copy: 'Cleared identity, credentials, capability, portfolio and references. Site visit where the category requires it.',
  },
  {
    name: 'Tier 3 · Listed',
    copy: 'Documentation checked and capability declared. Not yet matched to high-value work.',
  },
];

export const METHOD_STAGES = [
  {
    term: 'Identify',
    shape: 'circle',
    copy: 'A standing origination function scans governments, enterprises, and industries for functions that are fragmented, manual, absent, or fundamentally broken. Candidates are surfaced systematically, not chosen by trend or founder interest.',
  },
  {
    term: 'Understand',
    shape: 'square',
    copy: 'Every candidate is tested against fixed criteria: structural necessity, current fragmentation, scale of impact, durability, independent viability, founding right-to-win. Validated directly with practitioners in the target domain.',
  },
  {
    term: 'Build',
    shape: 'triangle',
    copy: 'Once validated, a dedicated platform team — people, budget, leadership — builds the product, drawing on shared infrastructure already proven by earlier platforms: identity and access, core data platform, AI and automation services, billing, security.',
  },
  {
    term: 'Enable',
    shape: 'triangle',
    copy: 'The platform reaches the people who live with the gap daily. The dedicated team takes full day-to-day accountability for product, go-to-market, and P&L — a distinct business line inside Operon Softwares, never spun off.',
  },
  {
    term: 'Scale',
    shape: 'small-circle',
    copy: 'The platform becomes the enduring utility layer of its domain. It gains operating autonomy — its own engineering, its own go-to-market — while ownership stays with Operon Softwares throughout.',
  },
];
