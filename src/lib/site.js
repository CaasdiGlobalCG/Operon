// ---------------------------------------------------------------------------
// Site manifest. Mirrors operon-sitemap-v3.html exactly: 29 routes, two shells.
// Nav placement (primary / footer-only / CTA-only) is encoded here and is the
// single source of truth for both navigation bars and both footers.
//
// Domain note: the sitemap specifies 360.operonsoftwares.com as a separate
// host. No domains exist yet, so the Operon 360 sub-site is mounted at /360.
// Switching to a real subdomain later means changing O360 below and nothing else.
// ---------------------------------------------------------------------------

export const O360 = '/360';

export const EXTERNAL = {
  // INPUT REQUIRED — Graviyx official URL (open content gap).
  graviyx: { href: '#graviyx-url-required', label: 'Graviyx', pending: true },
};

export const CORPORATE_NAV = [
  { label: 'About', to: '/about' },
  { label: 'Our Approach', to: '/approach' },
  { label: 'Platforms', to: '/platforms' },
  { label: 'Industries', to: '/industries' },
  { label: 'Insights', to: '/insights' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
  { label: 'Growth', to: '/grow' },
];

export const CORPORATE_NAV_CTA = { label: 'Explore Operon 360', to: O360 };

export const CORPORATE_FOOTER = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Our Approach', to: '/approach' },
      { label: 'Platforms', to: '/platforms' },
      { label: 'Industries', to: '/industries' },
      { label: 'Insights', to: '/insights' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Platforms',
    links: [
      { label: 'Operon 360', to: O360 },
      { label: 'Graviyx', external: 'graviyx' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Insights', to: '/insights' },
      { label: 'Research', to: '/insights#research' },
      { label: 'Case Studies', to: '/grow#case-studies' },
      { label: 'Marketing/Growth', to: '/grow' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Business Enquiries', to: '/contact#general' },
      { label: 'Partnerships', to: '/contact#partnerships' },
      { label: 'Investor Relations', to: '/contact#investors' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/legal/privacy-policy' },
      { label: 'Terms of Service', to: '/legal/terms-of-service' },
    ],
  },
];

export const O360_NAV = [
  { label: 'About', to: O360 },
  { label: 'Clients', to: `${O360}#clients` },
  { label: 'Vendors', to: `${O360}#vendors` },
  { label: 'Features', to: `${O360}/features` },
  { label: 'Industries', to: `${O360}/industries` },
  { label: 'Growth', to: '/grow' },
  { label: 'Operon Softwares', to: '/' },
];

export const O360_NAV_CTA = [
  { label: 'Get Demo', to: `${O360}/get-demo`, primary: true },
  { label: 'Login', to: `${O360}/login` },
];

export const O360_FOOTER = [
  {
    title: 'Platform',
    links: [
      { label: 'About', to: O360 },
      { label: 'Clients', to: `${O360}#clients` },
      { label: 'Vendors', to: `${O360}#vendors` },
      { label: 'Our Process', to: `${O360}/process` },
      { label: 'Why Us', to: `${O360}/why-us` },
      { label: 'Ecosystem', to: `${O360}/ecosystem` },
      { label: 'Get Demo', to: `${O360}/get-demo` },
      { label: 'Login', to: `${O360}/login` },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Workspace', to: `${O360}/features#workspace` },
      { label: 'The Canvas by Operon', to: `${O360}/features#canvas` },
      { label: 'Cipher', to: `${O360}/features#cipher` },
      { label: 'The Ledger', to: `${O360}/features#ledger` },
      { label: 'Get Operonified', to: `${O360}/features#get-operonified` },
      { label: 'Tenders', to: `${O360}/features#tenders` },
      { label: 'Bids @ Operon', to: `${O360}/features#bids` },
      { label: 'Procurement by Graviyx', to: `${O360}/features#procurement` },
    ],
  },
  {
    title: 'Industries',
    links: [{ label: 'All Industries', to: `${O360}/industries` }],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/legal/privacy-policy' },
      { label: 'Terms of Service', to: '/legal/terms-of-service' },
    ],
  },
  {
    title: 'Company',
    links: [{ label: 'Operon Softwares', to: '/' }],
  },
];

export const INDUSTRIES = [
  { slug: 'construction', name: 'Construction' },
  { slug: 'retail', name: 'Retail' },
  { slug: 'manufacturing', name: 'Manufacturing' },
  { slug: 'procurement', name: 'Procurement' },
  { slug: 'supply-chain', name: 'Supply Chain' },
  { slug: 'infrastructure', name: 'Infrastructure' },
  { slug: 'materials', name: 'Materials' },
  { slug: 'others', name: 'Others' },
];

// Full route table — used by App.jsx and by the build-time link audit.
export const ROUTES = [
  { path: '/', title: 'Home', shell: 'corporate', nav: 'primary', batch: 1 },
  { path: '/about', title: 'About', shell: 'corporate', nav: 'primary', batch: 1 },
  { path: '/approach', title: 'Our Approach', shell: 'corporate', nav: 'primary', batch: 1 },
  { path: '/platforms', title: 'Platforms', shell: 'corporate', nav: 'primary', batch: 1 },
  { path: '/industries', title: 'Industries', shell: 'corporate', nav: 'primary', batch: 4 },
  { path: '/insights', title: 'Insights', shell: 'corporate', nav: 'primary', batch: 5 },
  { path: '/careers', title: 'Careers', shell: 'corporate', nav: 'primary', batch: 5 },
  { path: '/contact', title: 'Contact', shell: 'corporate', nav: 'primary', batch: 5 },
  { path: '/legal', title: 'Legal & Compliance', shell: 'corporate', nav: 'footer', batch: 5 },
  { path: '/legal/privacy-policy', title: 'Privacy Policy', shell: 'corporate', nav: 'footer', batch: 5 },
  { path: '/legal/terms-of-service', title: 'Terms of Service', shell: 'corporate', nav: 'footer', batch: 5 },
  { path: '/grow', title: 'Marketing / Growth', shell: 'corporate', nav: 'footer', batch: 5 },
  ...INDUSTRIES.map((i) => ({
    path: `/industries/${i.slug}`,
    title: i.name,
    shell: 'corporate',
    nav: 'cta',
    batch: 4,
  })),
  { path: O360, title: 'Operon 360', shell: 'o360', nav: 'primary', batch: 2 },
  { path: `${O360}/features`, title: 'Features', shell: 'o360', nav: 'primary', batch: 2 },
  { path: `${O360}/industries`, title: 'Industries', shell: 'o360', nav: 'primary', batch: 3 },
  { path: `${O360}/get-demo`, title: 'Get Demo', shell: 'o360', nav: 'primary', batch: 3 },
  { path: `${O360}/login`, title: 'Login', shell: 'o360', nav: 'primary', batch: 3 },
  { path: `${O360}/process`, title: 'Process Flow', shell: 'o360', nav: 'cta', batch: 2 },
  { path: `${O360}/why-us`, title: 'Why Operon 360', shell: 'o360', nav: 'cta', batch: 2 },
  { path: `${O360}/ecosystem`, title: 'Ecosystem', shell: 'o360', nav: 'cta', batch: 2 },
];
