// Industry content, taken from the Restructured Website Content doc.
// Three-part structure per industry: the gap, why it qualifies, platform fit.
// Nothing beyond what the source supports (see gap `industry-research`).

export const INDUSTRY_CONTENT = {
  construction: {
    name: 'Construction',
    line: 'Multi-vendor, multi-site delivery where coordination is often the hardest part of the job.',
    gap: 'Requirements, vendor communication, and procurement typically live across phone calls, WhatsApp threads, and spreadsheets, with no single record of what was agreed, when, or by whom.',
    why: 'A clear example of an industry running on informal process rather than a dedicated execution layer — exactly the kind of structural gap Operon Softwares looks for.',
    platform:
      'Multi-site workspaces, vendor coordination, and procurement tracking for contractors and site owners running concurrent projects — built around this kind of multi-party, milestone-driven delivery.',
    modules: ['Workspace', 'Procurement by Graviyx', 'Get Operonified', 'The Ledger'],
  },
  retail: {
    name: 'Retail',
    line: 'Sourcing and fit-out work across many small vendors and tight timelines.',
    gap: 'Store rollouts and fit-outs often involve dozens of vendor relationships managed informally, with limited visibility into status until something is late.',
    why: 'Retail operators need the same structured, accountable execution layer that any multi-vendor delivery business needs.',
    platform:
      'Rollout and fit-out coordination across many small vendors, tracked through a single set of project workspaces covering every vendor and milestone.',
    modules: ['Workspace', 'Get Operonified', 'Procurement by Graviyx'],
  },
  manufacturing: {
    name: 'Manufacturing',
    line: 'Supplier onboarding, quality, and delivery coordination across supplier networks.',
    gap: 'Manufacturers frequently manage supplier onboarding, quotations, and delivery tracking through disconnected tools and manual follow-up.',
    why: 'The gap is structural, not incidental — supplier coordination at scale needs a system, not more headcount doing the same manual work.',
    platform:
      'Supplier onboarding, quotation comparison via Bids @ Operon, and delivery tracking through Procurement — designed for ongoing supplier relationship management.',
    modules: ['Get Operonified', 'Bids @ Operon', 'Procurement by Graviyx'],
  },
  procurement: {
    name: 'Procurement',
    line: 'The discipline Operon 360 was built to give a single operating home.',
    gap: 'Procurement decisions are often made across email, spreadsheets, and disconnected quoting tools, with limited audit trail and inconsistent vendor comparison.',
    why: 'Close to the core of the utility Operon 360 owns: workflow execution for operationally complex businesses.',
    platform: 'Tenders, Bids @ Operon, and global sourcing run natively inside the platform, built directly around this need.',
    modules: ['Tenders', 'Bids @ Operon', 'Procurement by Graviyx'],
  },
  'supply-chain': {
    name: 'Supply Chain',
    line: 'Multi-party logistics and delivery coordination across extended vendor networks.',
    gap: 'Supply chain execution frequently depends on informal coordination between multiple parties who have no shared system of record.',
    why: 'A cross-industry function, not a niche one — part of why this is treated as a genuine utility candidate.',
    platform: 'Multi-tier vendor coordination extended across the Workspace and Procurement modules.',
    modules: ['Workspace', 'Procurement by Graviyx'],
  },
  infrastructure: {
    name: 'Infrastructure',
    line: 'Large, long-running projects where accountability across many stakeholders is essential.',
    gap: 'Infrastructure projects typically involve long timelines and many stakeholders, with process fragmentation compounding over the life of the project.',
    why: 'Long-duration, high-stakeholder-count projects are precisely where a structured execution layer earns its place.',
    platform:
      'Long-running, multi-stakeholder projects tracked with full audit trail through Workspace and The Ledger, suited to infrastructure-scale accountability needs.',
    modules: ['Workspace', 'The Ledger'],
  },
  materials: {
    name: 'Materials',
    line: 'Sourcing, verification, and delivery tracking for material suppliers and buyers.',
    gap: 'Buyers and suppliers of materials often lack a shared, verified system for quotations, orders, and delivery status.',
    why: 'Sits close to procurement and supply chain, sharing the same underlying coordination gap.',
    platform:
      'KYC verification and procurement tools apply directly to materials sourcing and vendor vetting via Get Operonified and Procurement.',
    modules: ['Get Operonified', 'Procurement by Graviyx'],
  },
  others: {
    name: 'Others',
    line: 'Additional sectors, added as they are validated.',
    gap: null,
    why: null,
    platform: null,
    modules: [],
    pending: 'industry-others',
  },
};
